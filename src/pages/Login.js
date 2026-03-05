import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Text, Input, Button, Link, FormControl, FormLabel, Image, VStack, Icon, Divider
} from '@chakra-ui/react';
import { FaArrowLeft, FaUserGraduate, FaUserShield, FaBuilding } from 'react-icons/fa';

export default function Login() {
  const [role, setRole] = useState('student'); // 'student', 'admin', 'organization'
  
  // Track input values for validation
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  // Configuration for dynamic styling and labels based on the selected role
  const roleConfig = {
    student: {
      bg: 'brand.studentBg', 
      btnBg: '#0b1d2e',
      inputLabel: 'LRN (Learner Reference Number)',
      inputType: 'text',
      icon: FaUserGraduate
    },
    admin: {
      bg: 'brand.adminBg', 
      btnBg: '#1a4e6e',
      inputLabel: 'Admin Username', 
      inputType: 'text',
      icon: FaUserShield
    },
    organization: {
      bg: '#5F9598',         
      btnBg: '#42686a',      
      inputLabel: 'Organization Email Address',
      inputType: 'email',
      icon: FaBuilding
    }
  };

  const currentTheme = roleConfig[role];

  // Validation check: returns true ONLY if both fields have text
  const isFormValid = identifier.trim() !== '' && password.trim() !== '';

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    // Clear the form when switching roles for security/UX
    setIdentifier('');
    setPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Extra safety check to prevent empty submissions
    if (!isFormValid) return;

    // Route dynamically based on role
    if (role === 'organization') {
      navigate('/organization/dashboard'); 
    } else {
      navigate(`/${role}/dashboard`);
    }
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

        {/* Your preserved Logo and Title Layout */}
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
        bg={currentTheme.bg}
        align="center" 
        justify="center" 
        color="white"
        transition="background 0.3s ease"
        p={{ base: 6, md: 8, lg: 12 }}
      >
        <Box w="full" maxW="md">
          
          {/* --- CONDITIONAL UI: User Toggle vs. Admin Title --- */}
          {role !== 'admin' ? (
            <Box mb={{ base: 8, md: 10 }}>
              <Text mb={3} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" textTransform="uppercase" letterSpacing="wide" textAlign="center">
                Login as
              </Text>
              {/* Only Student and Organization shown here now */}
              <Flex bg="whiteAlpha.200" p={1} borderRadius="md" justify="space-between">
                {['student', 'organization'].map((r) => (
                  <Button
                    key={r}
                    flex={1}
                    size={{ base: 'sm', md: 'md' }}
                    variant="ghost"
                    bg={role === r ? 'white' : 'transparent'}
                    color={role === r ? 'black' : 'white'}
                    _hover={{ bg: role === r ? 'white' : 'whiteAlpha.300' }}
                    onClick={() => handleRoleChange(r)}
                    textTransform="capitalize"
                    fontWeight={role === r ? 'bold' : 'medium'}
                    transition="all 0.2s"
                  >
                    {r}
                  </Button>
                ))}
              </Flex>
            </Box>
          ) : (
            <Box mb={{ base: 8, md: 10 }} textAlign="center">
              <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900" letterSpacing="wide" textTransform="uppercase">
                Administrator Portal
              </Text>
              <Text fontSize="sm" opacity={0.8} mt={2}>
                Please enter your authorized admin credentials
              </Text>
            </Box>
          )}

          {/* Dynamic Icon Display */}
          <Flex justify="center" mb={8}>
            <Flex 
              w={20} h={20} 
              bg="whiteAlpha.200" 
              borderRadius="full" 
              align="center" justify="center"
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
              border="2px solid"
              borderColor="whiteAlpha.400"
              transition="all 0.3s ease"
            >
              <Icon as={currentTheme.icon} boxSize={8} color="white" />
            </Flex>
          </Flex>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <FormControl mb={5} isRequired>
              <FormLabel fontSize={{ base: 'xs', md: 'sm' }} textTransform="uppercase" letterSpacing="wide" opacity={0.9}>
                {currentTheme.inputLabel}
              </FormLabel>
              <Input 
                type={currentTheme.inputType} 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                bg="white" 
                color="black" 
                borderRadius="md" 
                border="none"
                size="lg"
                _focus={{ boxShadow: 'outline' }}
              />
            </FormControl>

            <FormControl mb={8} isRequired>
              <FormLabel fontSize={{ base: 'xs', md: 'sm' }} textTransform="uppercase" letterSpacing="wide" opacity={0.9}>
                Password
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
                _focus={{ boxShadow: 'outline' }}
              />
            </FormControl>

            <Button 
              type="submit" 
              size="lg"
              w="full" 
              bg={currentTheme.btnBg} 
              color="white" 
              _hover={{ opacity: 0.8, transform: isFormValid ? 'translateY(-2px)' : 'none' }}
              transition="all 0.2s"
              mb={6}
              boxShadow="md"
              isDisabled={!isFormValid}
              _disabled={{ bg: 'whiteAlpha.400', cursor: 'not-allowed', opacity: 0.6 }}
            >
              Sign In
            </Button>

            <VStack spacing={4} mt={6}>
              <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.9}>
                Forgot password? <Link fontWeight="bold" textDecoration="underline" _hover={{ color: 'blue.200' }}>Reset Here</Link>
              </Text>
              
              <Divider borderColor="whiteAlpha.300" w="50%" />

              {/* --- NEW: Dynamic Footer Links based on Role --- */}
              {role !== 'admin' ? (
                <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.7}>
                  Authorized personnel only?{' '}
                  <Link fontWeight="bold" onClick={() => handleRoleChange('admin')} _hover={{ color: 'blue.200' }}>
                    Admin Login
                  </Link>
                </Text>
              ) : (
                <Text fontSize={{ base: 'xs', md: 'sm' }} opacity={0.7}>
                  Not an administrator?{' '}
                  <Link fontWeight="bold" onClick={() => handleRoleChange('student')} _hover={{ color: 'blue.200' }}>
                    Back to User Login
                  </Link>
                </Text>
              )}
            </VStack>
          </form>
        </Box>
      </Flex>
      
    </Flex>
  );
}