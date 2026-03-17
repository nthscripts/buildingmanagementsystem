import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Business as BuildingsIcon,
  Layers as FloorViewerIcon,
  BugReport as IssuesIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ViewInAr as BlockViewerIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Buildings', icon: <BuildingsIcon />, path: '/buildings' },
  { text: 'Block Viewer', icon: <BlockViewerIcon />, path: '/block-viewer' },
  { text: 'Floor Viewer', icon: <FloorViewerIcon />, path: '/floor-viewer' },
  { text: 'Issues Log', icon: <IssuesIcon />, path: '/issues' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List sx={{ px: 1.5 }}>
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={selected}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  color: '#E5E7EB',
                  '& .MuiListItemIcon-root': { color: selected ? '#EFF6FF' : '#9CA3AF', minWidth: 40 },
                  '& .MuiListItemText-primary': { fontWeight: selected ? 700 : 600 },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(37, 99, 235, 0.25)',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.32)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(90deg, #0a1024ff, #1E40AF)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Pipeline & Electrical Mapping
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#111827',
              color: '#E5E7EB',
              borderRight: '1px solid rgba(229, 231, 235, 0.12)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#111827',
              color: '#E5E7EB',
              borderRight: '1px solid rgba(229, 231, 235, 0.12)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
