import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import FloorViewer from './FloorViewer';

export const buildingsData = [
  {
    id: 1,
    name: 'Main Office Building',
    location: 'Downtown',
    status: 'Operational',
    activeIssues: 2,
    pendingMaintenance: 1,
  },
  {
    id: 2,
    name: 'Research Facility',
    location: 'Industrial Park',
    status: 'Under Maintenance',
    activeIssues: 0,
    pendingMaintenance: 3,
  },
  {
    id: 3,
    name: 'Storage Warehouse',
    location: 'Port Area',
    status: 'Operational',
    activeIssues: 1,
    pendingMaintenance: 0,
  },
  {
    id: 4,
    name: 'Luxury Residential Tower',
    location: 'Riverside District',
    status: 'Operational',
    activeIssues: 1,
    pendingMaintenance: 2,
    floors: 10,
    unitsPerFloor: 8,
  },
];

const Buildings = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floorViewerOpen, setFloorViewerOpen] = useState(false);

  const handleFloorPlanClick = (building) => {
    setSelectedBuilding(building);
    setFloorViewerOpen(true);
  };

  const handleCloseFloorViewer = () => {
    setFloorViewerOpen(false);
    setSelectedBuilding(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'success';
      case 'Under Maintenance':
        return 'warning';
      case 'Critical':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Buildings
        </Typography>
        <Button variant="contained" color="primary">
          Add Building
        </Button>
      </Box>

      <Grid container spacing={3}>
        {buildingsData.map((building) => (
          <Grid item xs={12} md={6} lg={4} key={building.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {building.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {building.location}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Chip
                    label={building.status}
                    color={getStatusColor(building.status)}
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {building.activeIssues > 0 && (
                    <Tooltip title="Active Issues">
                      <Chip
                        icon={<WarningIcon />}
                        label={building.activeIssues}
                        color="error"
                        size="small"
                        variant="outlined"
                      />
                    </Tooltip>
                  )}
                  {building.pendingMaintenance > 0 && (
                    <Tooltip title="Pending Maintenance">
                      <Chip
                        icon={<BuildIcon />}
                        label={building.pendingMaintenance}
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                    </Tooltip>
                  )}
                </Box>
              </CardContent>

              <CardActions>
                <Button size="small">View Details</Button>
                <Button size="small" onClick={() => handleFloorPlanClick(building)}>Floor Plans</Button>
                <IconButton size="small" sx={{ ml: 'auto' }}>
                  <InfoIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={floorViewerOpen}
        onClose={handleCloseFloorViewer}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {selectedBuilding?.name} - Floor Plans
            </Typography>
            <Button onClick={handleCloseFloorViewer}>Close</Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FloorViewer buildingId={selectedBuilding?.id} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Buildings;