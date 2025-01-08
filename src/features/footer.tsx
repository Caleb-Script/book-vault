import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import FooterIcon from './footerIcon';
import dalle from './icon/DALLE.png';
import { facebook, instagram, linkedin, youtube } from './icon/index';

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="black"
      color="white"
      position="fixed"
      bottom={0}
      left={0}
      w="100%"
      zIndex={10}
      py={4}
      px={8}
      boxShadow="0 -2px 5px rgba(0, 0, 0, 0.1)"
    >
      <Container maxW="container.lg">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
        >
          {/* Logo Section */}
          <Link
            href="/homepage"
            display="flex"
            alignItems="center"
            mb={{ base: 4, md: 0 }}
          >
            <Image src={dalle} alt="DALLE Logo" boxSize="50px" />
            <Text ml={2} fontWeight="bold" fontSize="lg" color="#CC9600">
              Book Vault
            </Text>
          </Link>

          {/* Center Text */}
          <Text
            textAlign="center"
            fontSize="sm"
            maxW="400px"
            mb={{ base: 4, md: 0 }}
            color="gray.400"
          >
            Bücher sind der Schlüssel zu neuen Welten. Mit BookVault hast du sie
            alle im Griff.
          </Text>

          {/* Social Media Icons */}
          <HStack spacing={4}>
            <FooterIcon
              imageSrc={facebook}
              altText="Facebook"
              redirectTo="https://facebook.com"
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
        <Text textAlign="center" fontSize="xs" mt={4} color="gray.500">
          © {new Date().getFullYear()} Book Vault. Alle Rechte vorbehalten.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
