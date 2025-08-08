import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Components
import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import Layout from './components/Layout';

// Lazy loaded components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Buildings = lazy(() => import('./components/Buildings'));
const FloorViewer = lazy(() => import('./components/FloorViewer'));
const IssueLog = lazy(() => import('./components/IssueLog'));
const Reports = lazy(() => import('./components/Reports'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for plumbing
    },
    secondary: {
      main: '#dc004e', // Red for electrical
    },
    success: {
      main: '#2e7d32', // Green for HVAC
    },
    grey: {
      main: '#9e9e9e', // Gray for structural
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

console.log('Theme configuration:', theme);

function App() {
  console.log('App component rendering');
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Suspense fallback={<LoadingIndicator />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/buildings" element={<Buildings />} />
                <Route path="/floor-viewer" element={<FloorViewer />} />
                <Route path="/issues" element={<IssueLog />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;