import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import '../pages/design/navbar.css';
import CustomIcon from './icon.tsx';
import dalle from './icon/DALLE.png';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Suche Buch', path: '/buecher' },
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();

  const adminLinks = [{ name: 'Erstelle Buch', path: '/neuesBuch' }];
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Weiterleitung zur Startseite nach Logout
  };

  return (
    <Box
      className="navbar"
      bg={isDarkMode ? '#000' : '#fff'}
      color={isDarkMode ? '#fff' : '#000'}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={5}
      py={3}
      boxShadow="lg"
      borderBottom="2px solid #cc9600"
    >
      {/* Logo Section */}
      <Box className="navbar-logo" display="flex" alignItems="center" gap={3} data-cy="logo">
        <CustomIcon imageSrc={dalle} altText="DALLE" navigateTo="/" data-cy="logo"/>
        <h1
          className="span"
          style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cc9600' }}
        >
          Book Vault
        </h1>
      </Box>

      {/* Navigation Links */}
      <Box className="nav-links" display="flex" gap={5}>
        {[
          ...Links,
          ...(isAuthenticated && user?.role === 'admin' ? adminLinks : []),
        ].map(({ name, path }) => (
          <NavLink
            data-cy='Neues Buch'
            key={name}
            to={path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              padding: '5px 10px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              backgroundColor: isActive ? '#cc9600' : 'transparent',
              color: isActive ? '#000' : isDarkMode ? '#fff' : '#000',
            })}
          >
            {name}
          </NavLink>
        ))}
        {isAuthenticated && (
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              padding: '5px 10px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              backgroundColor: isActive ? '#cc9600' : 'transparent',
              color: isActive ? '#000' : isDarkMode ? '#fff' : '#000',
            })}
          >
            {user?.username}
          </NavLink>
        )}
      </Box>

      {/* User and Theme Toggle Section */}
      <HStack gap={4} alignItems="center">
        {isAuthenticated && (
          <IconButton
            aria-label="Theme Toggle"
            onClick={toggleTheme}
            bg="transparent"
            color={isDarkMode ? '#fff' : '#000'}
            _hover={{ color: '#cc9600' }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
        )}

        {!isAuthenticated ? (
          <NavLink
            to="/login"
            data-cy="login-link"
            style={{
              textDecoration: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              padding: '5px 10px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent',
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            Login
          </NavLink>
        ) : (
          <Button
            data-cy="logout-button"
            onClick={handleLogout}
            size="sm"
            bg="#cc9600"
            color="#000"
            _hover={{ bg: 'orange.400' }}
          >
            Logout
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
