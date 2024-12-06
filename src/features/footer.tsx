import React from 'react';
import { Box, Text, HStack, Flex, Image, Container } from '@chakra-ui/react';
import { facebook, youtube, linkedin, instagram } from './icon/index';
import FooterIcon from './footerIcon';
import dalle from './icon/DALLE.png';
import '../pages/design/footer.css';

const Footer = () => {
  return (
  <Container className = "footer">
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      position="fixed"
      bottom={0}
      left={0}
      w="100%"
      zIndex={10}
      py={4}
    >
      <Box>
        <Box
          as="a"
          href="/"
          display="inline-block"
          p={2}
          className = "footer"
        >
          <Image src={dalle} alt="DALLE" className='custom-icon'/>
        </Box>
      </Box>

      <Flex align="center" justify="space-between" w="100%" px={4} className="footer">
        <Text fontSize="sm" flex="1" className='copyright'>
          © {new Date().getFullYear()} Book Vault. Alle Rechte vorbehalten.
        </Text>

        <Text className="footer-text">
          Bücher sind der Schlüssel zu neuen Welten. Mit BookVault hast du sie alle im Griff.
        </Text>

        <HStack className='footer-icons'>
          <FooterIcon imageSrc={facebook} altText="Facebook" redirectTo="https://facebook.de"/>
          <FooterIcon imageSrc={instagram} altText="Instagram" redirectTo="https://www.instagram.com" />
          <FooterIcon imageSrc={youtube} altText="YouTube" redirectTo="https://youtube.com" />
          <FooterIcon imageSrc={linkedin} altText="LinkedIn" redirectTo="https://linkedin.com" />
        </HStack>
      </Flex>
    </Box>
    </Container>
  );
};

export default Footer;
