import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { cart } = useCart(); // Get cart from context

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const token = Cookies.get('token');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/logout', {}, { withCredentials: true });
            if (response.data.success) {
                Cookies.remove('token');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const drawer = (
        <div onClick={handleDrawerToggle}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/product">
                    <ListItemText primary="Product" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={Link} to="/signup">
                    <ListItemText primary="Signup" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', padding: '0 16px' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Logo
                    </Typography>

                    {!isMobile && (
                        <div className="nav-links" style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                            <Link to="/" style={{ margin: '0 20px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>Home</Link>
                            <Link to="/product" style={{ margin: '0 20px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>Product</Link>
                            <Link to="/about" style={{ margin: '0 20px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>About</Link>
                            {token ? (
                                <button onClick={handleLogout} style={{ margin: '0 20px', textDecoration: 'none', color: '#fff', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    LogOut
                                </button>
                            ) : (
                                <Link to="/signup" style={{ margin: '0 20px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>Signup</Link>
                            )}
                        </div>
                    )}

<Link to="/cart" className="relative">
    <IconButton color="inherit">
        <ShoppingCartIcon />
        {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full px-1">
                {cart.length}
            </span>
        )}
    </IconButton>
</Link>


                    {isMobile && (
                        <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
                {drawer}
            </Drawer>
        </div>
    );
};

export default Navbar;
