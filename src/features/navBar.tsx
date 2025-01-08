import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import CustomIcon from './icon.tsx';
import dalle from './icon/DALLE.png';
import '../pages/design/navbar.css';
import { Box, Button } from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode.tsx';

const Links = [
  { name: 'Home', path: '/homepage' },
  { name: 'Detailierte Ansicht', path: '/detailAnsicht' },
  { name: 'Suche Buch', path: '/' },
  { name: 'Ändere Buch', path: '/ändereBuch' },
  { name: 'Erstelle Buch', path: '/neuesBuch' },
  { name: 'Login', path: '/login' }
];

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const backgroundColor = useColorModeValue('#fff', '#000');
  const textColor = useColorModeValue('#000', '#fff');

  const toggleBackground = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box
      className="navbar"
      bg={backgroundColor}
      color={textColor}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={5}
      py={3}
      boxShadow="lg"
      borderBottom="2px solid #cc9600"
    >
      {/* Logo Section */}
      <Box className="navbar-logo" display="flex" alignItems="center" gap={3}>
        <CustomIcon imageSrc={dalle} altText="DALLE" navigateTo="/" />
        <h1 className="span" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cc9600' }}>
          Book Vault
        </h1>
      </Box>

      {/* Navigation Links */}
      <Box className="nav-links" display="flex" gap={5}>
        {Links.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              isActive
                ? 'active'
                : ''
            }
            style={{
              textDecoration: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              padding: '5px 10px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              color: textColor
            }}
          >
            {name}
          </NavLink>
        ))}
      </Box>

      {/* Background Toggle Button */}
      <Button
        onClick={toggleBackground}
        bg={textColor}
        color={backgroundColor}
        _hover={{ bg: '#cc9600', color: '#000' }}
        size="sm"
        borderRadius="md"
      >
        {isDarkMode ? 'Helles Thema' : 'Dunkles Thema'}
      </Button>
    </Box>
  );
};

export default Navbar;
