import { GameProvider, useGame } from './context/GameContext';
import { Layout } from './components/Layout';
import { CompanyPage } from './components/CompanyPage';
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

import { B2CLandingPage } from './components/B2CLandingPage';

function GameContent() {
  const { phase, gameState } = useGame();

  // Stripe redirect: show success page when ?session_id= is in the URL
  const hasSessionId = new URLSearchParams(window.location.search).has('session_id');
  if (hasSessionId) {
    return <StripeSuccess />;
  }

  if (gameState === 'company_home') {
    return <CompanyPage />;
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
