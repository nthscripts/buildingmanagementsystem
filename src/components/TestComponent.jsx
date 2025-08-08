import { Box, Typography, Paper } from '@mui/material';

const TestComponent = () => {
  console.log('TestComponent rendering');
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Test Component
        </Typography>
        <Typography variant="body1">
          If you can see this message, React is rendering correctly.
        </Typography>
      </Paper>
    </Box>
  );
};

export default TestComponent;