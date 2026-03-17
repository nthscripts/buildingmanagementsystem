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
const BlockViewer = lazy(() => import('./components/BlockViewer'));
const IssueLog = lazy(() => import('./components/IssueLog'));
const Reports = lazy(() => import('./components/Reports'));
const InteriorViewer = lazy(() => import('./components/InteriorViewer'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      dark: '#1E40AF',
      light: '#EFF6FF',
    },
    success: {
      main: '#16A34A',
      light: '#DCFCE7',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
    },
    error: {
      main: '#DC2626',
      light: '#FEE2E2',
    },
    grey: {
      main: '#6B7280',
    },
    divider: '#E5E7EB',
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FAFC',
          color: '#111827',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 160ms ease, box-shadow 160ms ease',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
        sizeSmall: {
          height: 24,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
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
                <Route path="/block-viewer" element={<BlockViewer />} />
                <Route path="/floor-viewer" element={<FloorViewer />} />
                <Route path="/interior-viewer" element={<InteriorViewer />} />
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
