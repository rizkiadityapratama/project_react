import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School'; 
import PeopleIcon from '@mui/icons-material/People'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// Sidebar width
const drawerWidth = 240;

// Navbar items with icons
const navItems = [
  { label: 'Home', path: '/Home', icon: <PeopleIcon fontSize="large" /> },
  { label: 'DataGuru', path: '/Dataguru', icon: <SchoolIcon fontSize="large" /> },
  { label: 'DataSiswa', path: '/Datasiswa', icon: <PeopleIcon fontSize="large" /> },
];

// Styled component for the Drawer (Sidebar)
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#FF5733', // Orange red
    color: theme.palette.common.white,
    width: drawerWidth,
    border: 'none',
    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)', // Shadow effect
  },
}));

// Styled component for the AppBar (Navbar)
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FF7043', // Orange red
  zIndex: theme.zIndex.drawer + 1, // Ensure AppBar is above the Drawer
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Toggle drawer for mobile view
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ my: 2, fontWeight: 'bold' }}>
        <span style={{ color: '#fff' }}>Navbar</span>
      </Typography>
      <Divider sx={{ borderColor: '#fff' }} />
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#fff' }}>
        Data
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                color: '#fff',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#FF7043', // Hover effect
                },
              }}
            >
              <IconButton sx={{ color: '#fff', marginRight: '10px' }}>
                {item.icon}
              </IconButton>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar (Navbar) */}
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* New title here */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Data Tabel Sederhana Guru Dan Siswa
          </Typography>
        </Toolbar>
      </StyledAppBar>

      {/* Sidebar */}
      <nav>
        <StyledDrawer
          container={container}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </StyledDrawer>
      </nav>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: { sm: `${drawerWidth}px` },
          marginTop: '64px', // Margin to ensure AppBar does not overlap content
        }}
      >
        {/* Main content goes here */}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
