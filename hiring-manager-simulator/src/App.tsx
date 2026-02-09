import { GameProvider, useGame } from './context/GameContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { JobPosting } from './components/JobPosting';
import { PhaseScreening } from './components/PhaseScreening';
import { PhaseInterviews } from './components/PhaseInterviews';
import { PhaseDecision } from './components/PhaseDecision';
import { PhaseReveal } from './components/PhaseReveal';
import { motion, AnimatePresence } from 'framer-motion';

function GameContent() {
  const { phase, gameState } = useGame();

  if (gameState === 'landing') {
    return <LandingPage />;
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
    </GameProvider>
  );
}

export default App;
