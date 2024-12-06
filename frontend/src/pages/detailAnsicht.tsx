import React from "react";
import { Button, Container} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../features/navbar";

const DetailAnsicht: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <Container maxW="container.lg" centerContent position="relative">
      <Navbar/>
      <Button
        colorScheme="teal"
        onClick={handleNavigation}
        position="absolute"
        top={4}
        left={4}
        zIndex={1}
      >
        Zurück zur Startseite
      </Button>
    </Container>
  );
};

export default DetailAnsicht;
