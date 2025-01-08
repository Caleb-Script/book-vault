import { Box, Container, Flex, HStack, Image, Text } from '@chakra-ui/react';
import '../pages/design/footer.css';
import FooterIcon from './footerIcon';
import dalle from './icon/DALLE.png';
import { facebook, instagram, linkedin, youtube } from './icon/index';

const Footer = () => {
  return (
    <Container className="footer">
      <Box
        as="footer"
        bg="black"
        color="white"
        position="fixed"
        bottom={0}
        left={0}
        w="100%"
        zIndex={10}
        pt={0}
      >
        <Box>
          <Box
            as="a"
            ref="/homepage"
            display="inline-block"
            className="footer"
          >
            <Image
              src={dalle}
              alt="DALLE"
              className="custom-icon"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>

        <Flex
          align="center"
          justify="space-between"
          w="100%"
          px={4}
          className="footer"
        >
          <Text fontSize="sm" flex="1" className="copyright">
            © {new Date().getFullYear()} Book Vault. Alle Rechte vorbehalten.
          </Text>

          <Text className="footer-text">
            Bücher sind der Schlüssel zu neuen Welten. Mit BookVault hast du sie
            alle im Griff.
          </Text>

          <HStack className="footer-icons">
            <FooterIcon
              imageSrc={facebook}
              altText="Facebook"
              redirectTo="https://facebook.de"
            />
            <FooterIcon
              imageSrc={instagram}
              altText="Instagram"
              redirectTo="https://www.instagram.com"
            />
            <FooterIcon
              imageSrc={youtube}
              altText="YouTube"
              redirectTo="https://youtube.com"
            />
            <FooterIcon
              imageSrc={linkedin}
              altText="LinkedIn"
              redirectTo="https://linkedin.com"
            />
          </HStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default Footer;
