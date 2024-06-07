import React from 'react';
import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <VStack spacing={6} textAlign="center" mt="50px">
      <Heading as="h1" size="2xl">
        404
      </Heading>
      <Heading as="h2" size="lg">
        Page Not Found
      </Heading>
      <Text fontSize="lg">
        The page you are looking for does not exist.
      </Text>
      <Button colorScheme="blue" as={NavLink} to="/login">
        Go to Home Page
      </Button>
    </VStack>
  );
}

export default NotFound;
