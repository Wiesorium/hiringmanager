"""
Backend additions for Stripe access code system.

Add these routes and helpers to your existing hiring_simulator blueprint file.
They use Neo4j (same as your existing code) to store and manage access codes.

ALSO: You need to `pip install stripe` on your server and set the
STRIPE_SECRET_KEY environment variable.
"""

import string
import random
import stripe

# Set Stripe secret key from environment
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


# ---------------------------------------------------------------------------
# Helper: generate a unique 8-character alphanumeric code
# ---------------------------------------------------------------------------
def generate_unique_code() -> str:
    """Generate an 8-char uppercase alphanumeric code."""
    chars = string.ascii_uppercase + string.digits
    # Remove confusable characters: 0/O, 1/I/L
    chars = chars.replace('O', '').replace('0', '').replace('I', '').replace('1', '').replace('L', '')
    return ''.join(random.choices(chars, k=8))


# ---------------------------------------------------------------------------
# POST /create_code  — called after Stripe payment redirect
# ---------------------------------------------------------------------------
@hiring_simulator.route("/create_code", methods=["POST"])
def create_code():
    """
    After Stripe redirect, the frontend sends { stripe_session_id: "cs_..." }.
    This endpoint:
    1. Verifies the Stripe Checkout Session is paid
    2. Checks if a code was already created for this session (idempotent)
    3. Generates a unique 8-char access code with 10 uses
    4. Stores it in Neo4j and returns it
    """
    params = request.get_json(silent=True) or {}
    session_id = params.get("stripe_session_id", "").strip()

    if not session_id:
        return jsonify({
            "result_state": "error",
            "result": "Missing required field: stripe_session_id"
        }), 400

    # --- Verify Stripe payment ---
    try:
        checkout_session = stripe.checkout.Session.retrieve(session_id)
        if checkout_session.payment_status != "paid":
            return jsonify({
                "result_state": "error",
                "result": "Payment not completed."
            }), 402
    except stripe.error.InvalidRequestError:
        return jsonify({
            "result_state": "error",
            "result": "Invalid Stripe session."
        }), 400
    except Exception as e:
        logging.error(f"[hiring_simulator] Stripe verification failed: {e}")
        return jsonify({
            "result_state": "error",
            "result": "Could not verify payment."
        }), 500

    # --- Check if code already exists for this session (idempotent) ---
    try:
        with Neo4j_Service.get_driver().session() as db_session:
            existing = db_session.run(
                "MATCH (c:AccessCode {stripeSessionId: $sid}) RETURN c.code AS code, c.remainingUses AS remaining",
                sid=session_id
            ).single()
            if existing:
                return jsonify({
                    "result_state": "success",
                    "code": existing["code"],
                    "remaining": existing["remaining"],
                }), 200
    except Exception as e:
        logging.error(f"[hiring_simulator] Neo4j read failed: {e}")

    # --- Generate new code ---
    code = generate_unique_code()
    try:
        with Neo4j_Service.get_driver().session() as db_session:
            db_session.run(
                """
                CREATE (c:AccessCode {
                    code:             $code,
                    remainingUses:    10,
                    stripeSessionId:  $sid,
                    createdAt:        $ts
                })
                """,
                code=code,
                sid=session_id,
                ts=str(datetime.datetime.utcnow()),
            )
    except Exception as e:
        logging.error(f"[hiring_simulator] Neo4j write failed: {e}")
        return jsonify({
            "result_state": "error",
            "result": "Could not create access code."
        }), 500

    return jsonify({
        "result_state": "success",
        "code": code,
        "remaining": 10,
    }), 200


# ---------------------------------------------------------------------------
# POST /validate_code  — check if a code is valid and has remaining uses
# ---------------------------------------------------------------------------
@hiring_simulator.route("/validate_code", methods=["POST"])
def validate_code():
    """
    Validate an access code.
    Body: { "code": "ABC123XY" }
    Response: { "result_state": "success", "valid": true/false, "remaining": N }
    """
    params = request.get_json(silent=True) or {}
    code = params.get("code", "").strip().upper()

    if not code:
        return jsonify({
            "result_state": "error",
            "result": "Missing required field: code"
        }), 400

    try:
        with Neo4j_Service.get_driver().session() as db_session:
            result = db_session.run(
                "MATCH (c:AccessCode {code: $code}) RETURN c.remainingUses AS remaining",
                code=code
            ).single()

            if not result:
                return jsonify({
                    "result_state": "success",
                    "valid": False,
                    "remaining": 0,
                }), 200

            remaining = result["remaining"]
            return jsonify({
                "result_state": "success",
                "valid": remaining > 0,
                "remaining": remaining,
            }), 200

    except Exception as e:
        logging.error(f"[hiring_simulator] validate_code DB error: {e}")
        return jsonify({
            "result_state": "error",
            "result": "Database error."
        }), 500


# ---------------------------------------------------------------------------
# MODIFICATION to existing generate_sim_from_jobdescription
# ---------------------------------------------------------------------------
# Add the following lines INSIDE your existing generate_sim_from_jobdescription
# function, BEFORE the GPT call, to enforce the access code requirement:
#
#     access_code = params.get("access_code", "").strip().upper()
#     if not access_code:
#         return jsonify({
#             "result_state": "error",
#             "result": "Access code required for AI generation."
#         }), 403
#
#     # Validate and decrement
#     try:
#         with Neo4j_Service.get_driver().session() as db_session:
#             code_record = db_session.run(
#                 "MATCH (c:AccessCode {code: $code}) WHERE c.remainingUses > 0 "
#                 "SET c.remainingUses = c.remainingUses - 1 "
#                 "RETURN c.remainingUses AS remaining",
#                 code=access_code
#             ).single()
#             if not code_record:
#                 return jsonify({
#                     "result_state": "error",
#                     "result": "Invalid or exhausted access code."
#                 }), 403
#             remaining_uses = code_record["remaining"]
#     except Exception as e:
#         logging.error(f"[hiring_simulator] Access code check failed: {e}")
#         return jsonify({
#             "result_state": "error",
#             "result": "Could not validate access code."
#         }), 500
#
# Then, in the success response at the end, add:
#     "remaining": remaining_uses,
