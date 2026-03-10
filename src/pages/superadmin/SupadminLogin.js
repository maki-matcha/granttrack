import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Text, Input, Button, Link, FormControl, FormLabel, Image, VStack, Icon, Divider, useToast
} from '@chakra-ui/react';
import { FaArrowLeft, FaUserShield } from 'react-icons/fa';

export default function SupadminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const toast = useToast();

  // Superadmin specific theme colors (Deep Purple to distinguish from Admin/Student)
  const themeBg = '#1a0b2e'; 
  const btnBg = '#3b1c61';

  // Validation check: returns true ONLY if both fields have text
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    // MOCK AUTHENTICATION LOGIC
    setTimeout(() => {
      setIsLoading(false);
      
      // Check for hardcoded mock credentials
      if (email === 'admin.root@granttrack.com' && password === 'superadmin123') {
        
        // --- NEW: GRANT THE AUTHENTICATION KEY ---
        localStorage.setItem('isSuperadminAuth', 'true');

        toast({
          title: 'Authentication Successful',
          description: 'Welcome back, System Master.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/superadmin/dashboard');
      } else {
        toast({
          title: 'Access Denied',
          description: 'Invalid superadmin credentials.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    }, 1500);
  };

  return (
    <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
      
      {/* Left Side - Logo / Mobile Header */}
      <Flex 
        w={{ base: '100%', md: '50%' }} 
        minH={{ base: '20vh', md: '100vh' }} 
        bg="white" 
        align="center" 
        justify="center"
        position="relative"
        p={6}
      >
        <Button 
          position="absolute" 
          top={{ base: 4, md: 8 }} 
          left={{ base: 4, md: 8 }}
          variant="ghost" 
          color="gray.600"
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate('/')}
          size="sm"
        >
          Home
        </Button>

        <VStack spacing={4}>
          <Image src="/granttracklogo.png" h={{ base: '50px', md: '70px' }} fallbackSrc="https://via.placeholder.com/70/0b1d2e?text=G" />
          <Text fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight="900" color="gray.800" letterSpacing="tight">
            GrantTrack
          </Text>
        </VStack>
      </Flex>

      {/* Right Side - Login Form */}
      <Flex 
        w={{ base: '100%', md: '50%' }}
        flex={1} 
        bg={themeBg}
        align="center" 
        justify="center" 
        color="white"
        transition="background 0.3s ease"
        p={{ base: 6, md: 8, lg: 12 }}
      >
        <Box w="full" maxW="md">
          
          <Box mb={{ base: 8, md: 10 }} textAlign="center">
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900" letterSpacing="wide" textTransform="uppercase" color="purple.200">
              System Root Access
            </Text>
            <Text fontSize="sm" opacity={0.8} mt={2}>
              Restricted Area. Authorized Personnel Only.
            </Text>
          </Box>

          {/* Dynamic Icon Display */}
          <Flex justify="center" mb={8}>
            <Flex 
              w={20} h={20} 
              bg="whiteAlpha.200" 
              borderRadius="full" 
              align="center" justify="center"
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
              border="2px solid"
              borderColor="purple.400"
              transition="all 0.3s ease"
            >
              <Icon as={FaUserShield} boxSize={8} color="purple.200" />
            </Flex>
          </Flex>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <FormControl mb={5} isRequired>
              <FormLabel fontSize={{ base: 'xs', md: 'sm' }} textTransform="uppercase" letterSpacing="wide" opacity={0.9}>
                Root Email
              </FormLabel>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="white" 
                color="black" 
                borderRadius="md" 
                border="none"
                size="lg"
                _focus={{ boxShadow: '0 0 0 2px #9F7AEA' }}
              />
            </FormControl>

            <FormControl mb={8} isRequired>
              <FormLabel fontSize={{ base: 'xs', md: 'sm' }} textTransform="uppercase" letterSpacing="wide" opacity={0.9}>
                Master Password
              </FormLabel>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="white" 
                color="black" 
                borderRadius="md" 
                border="none"
                size="lg"
                _focus={{ boxShadow: '0 0 0 2px #9F7AEA' }}
              />
            </FormControl>

            <Button 
              type="submit" 
              size="lg"
              w="full" 
              bg={btnBg} 
              color="white" 
              isLoading={isLoading}
              _hover={{ opacity: 0.8, transform: isFormValid ? 'translateY(-2px)' : 'none' }}
              transition="all 0.2s"
              mb={6}
              boxShadow="md"
              isDisabled={!isFormValid}
              _disabled={{ bg: 'whiteAlpha.400', cursor: 'not-allowed', opacity: 0.6 }}
            >
              Authenticate
            </Button>

            <VStack spacing={4} mt={6}>
              <Divider borderColor="whiteAlpha.300" w="50%" />
              <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.7}>
                Not a System Administrator?{' '}
                <Link fontWeight="bold" onClick={() => navigate('/login')} _hover={{ color: 'purple.200' }}>
                  Back to Main Login
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </Flex>
      
    </Flex>
  );
}