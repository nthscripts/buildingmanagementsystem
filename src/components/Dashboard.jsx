import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box sx={{ mr: 2, color }}>{icon}</Box>
      <Box>
        <Typography variant="h6" component="div">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Buildings',
      value: '12',
      icon: <TrendingUpIcon />,
      color: 'primary.main',
    },
    {
      title: 'Active Issues',
      value: '5',
      icon: <WarningIcon />,
      color: 'error.main',
    },
    {
      title: 'Pending Maintenance',
      value: '8',
      icon: <BuildIcon />,
      color: 'warning.main',
    },
    {
      title: 'Systems Online',
      value: '95%',
      icon: <CheckCircleIcon />,
      color: 'success.main',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Activity timeline will be displayed here
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              System health metrics will be displayed here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;