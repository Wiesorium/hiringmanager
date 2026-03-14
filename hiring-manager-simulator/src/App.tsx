import { GameProvider, useGame } from './context/GameContext';
import { Layout } from './components/Layout';
import { ApplicantLandingPage } from './components/ApplicantLandingPage';
import { JobPosting } from './components/JobPosting';
import { PhaseScreening } from './components/PhaseScreening';
import { PhaseInterviews } from './components/PhaseInterviews';
import { PhaseDecision } from './components/PhaseDecision';
import { PhaseReveal } from './components/PhaseReveal';
import { StripeSuccess } from './components/StripeSuccess';
import { ImpressumPage } from './components/ImpressumPage';
import { DatenschutzPage } from './components/DatenschutzPage';
import { CookieBanner } from './components/CookieBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import { B2CLandingPage } from './components/B2CLandingPage';

function GameContent() {
  const { phase, gameState, availableJobs, simulationsLoading, selectJob } = useGame();

  // ── Deep link: /simulation/<job_id> ────────────────────────────────────────
  // The email sends users to https://hiringsimulator.com/simulation/<job_id>.
  // Detect this URL structure and auto-navigate to the correct job posting.
  useEffect(() => {
    const match = window.location.pathname.match(/^\/simulation\/(.+)/);
    if (!match) return;
    const deepJobId = decodeURIComponent(match[1]);

    // Wait until simulations have loaded before trying to select the job
    if (simulationsLoading) return;

    const found = availableJobs.find(j => j.id === deepJobId);
    if (found) {
      // Clear the path so navigating back / refreshing doesn't re-trigger
      window.history.replaceState({}, '', '/');
      selectJob(deepJobId);
    }
  }, [simulationsLoading, availableJobs]);

  // Stripe redirect: show success page when ?session_id= is in the URL
  const hasSessionId = new URLSearchParams(window.location.search).has('session_id');
  if (hasSessionId) {
    return <StripeSuccess />;
  }

  if (gameState === 'b2c_home') {
    return <B2CLandingPage />;
  }

  if (gameState === 'impressum') {
    return <ImpressumPage />;
  }

  if (gameState === 'datenschutz') {
    return <DatenschutzPage />;
  }

  if (gameState === 'applicant_intro') {
    return <ApplicantLandingPage />;
  }

  if (gameState === 'job_posting') {
    return <JobPosting />;
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {phase === 'screening' && <PhaseScreening />}
          {phase === 'interviews' && <PhaseInterviews />}
          {phase === 'decision' && <PhaseDecision />}
          {phase === 'reveal' && <PhaseReveal />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
      <CookieBanner />
    </GameProvider>
  );
}

export default App;
