import React from 'react';
import { IconButton, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface CustomIconProps {
  imageSrc: string; // Pfad zum Bild
  altText: string;  // Alternativtext für das Bild
  navigateTo: string; // Zielroute für die Navigation
}

const CustomIcon: React.FC<CustomIconProps> = ({ imageSrc, altText, navigateTo }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <IconButton
      aria-label={altText}
      size="lg"
      variant="ghost"
      onClick={() => handleNavigation(navigateTo)}
      _hover={{ transform: 'scale(1.1)' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Image src={imageSrc} alt={altText} boxSize="65px" objectFit="contain" />
    </IconButton>
  );
};

export default CustomIcon;
