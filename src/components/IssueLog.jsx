import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const issuesData = [
  {
    id: 1,
    title: 'Water Leak in Server Room',
    building: 'Main Office Building',
    location: 'Floor 3, Room 302',
    priority: 'High',
    status: 'Open',
    type: 'Plumbing',
    reportedDate: '2023-11-05',
  },
  {
    id: 2,
    title: 'Faulty Electrical Socket',
    building: 'Research Facility',
    location: 'Floor 2, Lab 5',
    priority: 'Medium',
    status: 'In Progress',
    type: 'Electrical',
    reportedDate: '2023-11-04',
  },
  {
    id: 3,
    title: 'HVAC System Maintenance',
    building: 'Storage Warehouse',
    location: 'Ground Floor',
    priority: 'Low',
    status: 'Scheduled',
    type: 'HVAC',
    reportedDate: '2023-11-03',
  },
];

const IssueLog = () => {
  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <ErrorIcon fontSize="small" color="error" />;
      case 'medium':
        return <WarningIcon fontSize="small" color="warning" />;
      case 'low':
        return <InfoIcon fontSize="small" color="info" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'error';
      case 'in progress':
        return 'warning';
      case 'scheduled':
        return 'info';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'plumbing':
        return <BuildIcon fontSize="small" sx={{ color: 'primary.main' }} />;
      case 'electrical':
        return <BuildIcon fontSize="small" sx={{ color: 'secondary.main' }} />;
      case 'hvac':
        return <BuildIcon fontSize="small" sx={{ color: 'success.main' }} />;
      default:
        return <BuildIcon fontSize="small" />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Issue Log
        </Typography>
        <Button variant="contained" color="primary">
          Report Issue
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search issues..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reported Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuesData.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  {getPriorityIcon(issue.priority)}
                </TableCell>
                <TableCell>{issue.title}</TableCell>
                <TableCell>{issue.building}</TableCell>
                <TableCell>{issue.location}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getTypeIcon(issue.type)}
                    {issue.type}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={issue.status}
                    size="small"
                    color={getStatusColor(issue.status)}
                  />
                </TableCell>
                <TableCell>{issue.reportedDate}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IssueLog;