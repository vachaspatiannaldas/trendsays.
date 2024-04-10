import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material'; 
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const drawerWidth = 240;

const LinkS = styled(Link)`
    color: #908d96;
    text-decoration: none;
`;

const LogoImage = styled('img')`
    width: 120px;
    margin-top:10px;
    @media (max-width: 600px) {
        width: 100px;
    }
`;


function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: '#282828', height: '100%' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to='/'><img src={logo} alt="logo" srcset="" style={{width:'100px'}} /></Link>
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText><LinkS to='/'>Home</LinkS></ListItemText> 
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText><LinkS to='/contact'>Contact</LinkS></ListItemText> 
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText><LinkS to='/account'>Logout</LinkS></ListItemText> 
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ background: '#282828' }}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/'><LogoImage src={logo} alt="logo" srcset="" /></Link>
          </Typography>
           <Box sx={{ display: { sm: 'none' } }}>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end" // Aligns the MenuIcon to the right
                onClick={handleDrawerToggle}
                >
                <MenuIcon style={{color:"#7a5af5"}} />
                </IconButton>
          </Box>          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button>
              <LinkS to='/'>Home</LinkS>
            </Button>
            <Button>
              <LinkS to='/contact'>Contact</LinkS>
            </Button>
            <Button>
              <LinkS to='/account'>Logout</LinkS>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
