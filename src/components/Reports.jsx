import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  GetApp as DownloadIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const reportsData = [
  {
    id: 1,
    title: 'Monthly Maintenance Summary',
    type: 'Maintenance',
    generatedDate: '2023-11-01',
    status: 'Completed',
    insights: [
      '85% issues resolved within SLA',
      '15% reduction in emergency repairs',
      'Top issue category: HVAC',
    ],
  },
  {
    id: 2,
    title: 'Building Performance Analysis',
    type: 'Performance',
    generatedDate: '2023-11-02',
    status: 'In Progress',
    insights: [
      'Energy efficiency improved by 12%',
      'Peak usage hours: 9 AM - 5 PM',
      'Recommended: HVAC optimization',
    ],
  },
  {
    id: 3,
    title: 'Cost Analysis Report',
    type: 'Financial',
    generatedDate: '2023-11-03',
    status: 'Scheduled',
    insights: [
      'Maintenance costs reduced by 8%',
      'ROI on preventive maintenance: 150%',
      'Areas for cost optimization identified',
    ],
  },
];

const Reports = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleMenuClick = (event, report) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportsData.map((report) => (
          <Grid item xs={12} md={4} key={report.id}>
            <Card>
              <CardHeader
                action={
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, report)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={report.title}
                subheader={`Generated: ${report.generatedDate}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Type: {report.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Status: {report.status}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Key Insights:
                </Typography>
                {report.insights.map((insight, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    • {insight}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Reports
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Generated Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportsData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <DownloadIcon fontSize="small" sx={{ mr: 1 }} /> Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ShareIcon fontSize="small" sx={{ mr: 1 }} /> Share
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Reports;