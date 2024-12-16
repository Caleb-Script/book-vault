import React from 'react';
import { IconButton, Image } from '@chakra-ui/react';

interface CustomIconProps {
  imageSrc: string; 
  altText: string;  
  redirectTo: string; 
}

const FooterIcon: React.FC<CustomIconProps> = ({ imageSrc, altText, redirectTo }) => {
  const handleRedirect = (url: string) => {
    window.location.href = url; 
  };

  return (
    <IconButton
      aria-label={altText}
      size="lg"
      variant="ghost"
      onClick={() => handleRedirect(redirectTo)}
      _hover={{ 
        
        scale: (1.1),
        bg: 'transparent',
        outline: 'none'
      }}
      _focus={{ boxShadow: 'none' }} 
    >
      <Image src={imageSrc} alt={altText} boxSize="60px" objectFit="contain" />
    </IconButton>
  );
};

export default FooterIcon;
