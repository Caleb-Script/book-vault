import React from 'react';
import { IconButton, Image } from '@chakra-ui/react';

interface CustomIconProps {
  imageSrc: string; // Pfad zum Bild
  altText: string;  // Alternativtext für das Bild
  redirectTo: string; // Ziel-URL für die Weiterleitung
}

const FooterIcon: React.FC<CustomIconProps> = ({ imageSrc, altText, redirectTo }) => {
  const handleRedirect = (url: string) => {
    window.location.href = url; // Weiterleitung zur angegebenen URL
  };

  return (
    <IconButton
      aria-label={altText}
      size="lg"
      variant="outline"
      onClick={() => handleRedirect(redirectTo)}
      _hover={{ 
        
        scale: (1.1),
        bg: 'transparent',
        borderColor: 'transparent',
        outline: 'none'
      }}
      _focus={{ boxShadow: 'none' }} // Fokus ohne Box-Schatten
    >
      <Image src={imageSrc} alt={altText} boxSize="60px" objectFit="contain" />
    </IconButton>
  );
};

export default FooterIcon;
