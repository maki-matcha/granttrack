import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Heading, Flex, Text, SimpleGrid, Button, Avatar, VStack, HStack,
  FormControl, FormLabel, Input, useToast, Divider, Icon, Badge,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, useColorModeValue,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from '@chakra-ui/react';
import { FaUserShield, FaCamera, FaEnvelope, FaPhone, FaChevronRight } from 'react-icons/fa';
import SuperadminLayout from '../../components/SuperadminLayout';

export default function Supadprofile() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  
  // --- Initialize name from Local Storage ---
  const initialName = localStorage.getItem('granttrack_superadmin_name') || 'System Admin';
  const [savedAdminName, setSavedAdminName] = useState(initialName);

  const [adminData, setAdminData] = useState({
    adminId: 'SA-001-MASTER',
    fullName: initialName, 
    email: 'admin.root@granttrack.com',
    phone: '+63 999 888 7777',
    location: 'Headquarters - Manila, PH'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- DARK MODE HOOKS & COLORS ---
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const sectionHeadingColor = useColorModeValue('#2A2141', 'purple.300'); // God-Mode Purple accent
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('none', '1px solid #2D3748');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  
  const inputBg = useColorModeValue('gray.50', 'gray.900');
  const readOnlyBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBorder = useColorModeValue('gray.200', 'gray.700');
  
  const primaryAccent = '#2A2141'; // Deep Purple
  const btnBg = useColorModeValue('purple.600', 'purple.500');
  const btnHover = useColorModeValue('purple.700', 'purple.600');

  // --- AVATAR LOGIC ---
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem('granttrack_superadmin_avatar') || '');

  useEffect(() => {
    const handleStorageChange = () => setAvatarUrl(localStorage.getItem('granttrack_superadmin_avatar') || '');
    window.addEventListener('avatarUpdated', handleStorageChange);
    return () => window.removeEventListener('avatarUpdated', handleStorageChange);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      return toast({ title: 'File too large', description: 'Please upload an image smaller than 8MB.', status: 'error', duration: 4000, position: 'top-right' });
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        localStorage.setItem('granttrack_superadmin_avatar', reader.result);
        setAvatarUrl(reader.result);
        window.dispatchEvent(new Event('avatarUpdated'));
        toast({ title: 'Profile Picture Updated', status: 'success', duration: 3000, position: 'top-right' });
      } catch (error) {
        toast({ title: 'Storage Error', description: 'Image resolution is too high.', status: 'warning', duration: 4000, position: 'top-right' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileChange = (e) => setAdminData({ ...adminData, [e.target.name]: e.target.value });

  const handleSaveChanges = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Save new name to local storage
      localStorage.setItem('granttrack_superadmin_name', adminData.fullName);
      setSavedAdminName(adminData.fullName);
      
      toast({ title: "Profile Updated", description: "Your Superadmin details have been successfully saved.", status: "success", duration: 3000, position: "top-right" });
    }, 1000);
  };

  return (
    <SuperadminLayout userName={savedAdminName} userDetail="System Master">
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

      <Box maxW="7xl" mx="auto" mb={6}>
        <Breadcrumb spacing="8px" separator={<Icon as={FaChevronRight} color={mutedText} fontSize="xs" />} mb={2}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/superadmin/dashboard" color={mutedText} fontSize="sm">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">My Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading size="lg" color={headingColor} transition={smoothTransition}>Superadmin Profile</Heading>
      </Box>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8} maxW="7xl" mx="auto">
        
        {/* --- LEFT SIDEBAR (AVATAR) --- */}
        <VStack w={{ base: 'full', lg: '300px' }} spacing={6}>
          <Box bg={cardBg} w="full" p={8} borderRadius="xl" shadow="sm" border={cardBorder} textAlign="center" borderTop="4px solid" borderColor={primaryAccent} transition={smoothTransition}>
            
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Box position="relative" cursor="pointer" display="inline-block" role="group" mb={4}>
                  <Avatar size="2xl" name={adminData.fullName} src={avatarUrl} bg={primaryAccent} color="white" />
                  <Flex position="absolute" top={0} left={0} w="full" h="full" bg="blackAlpha.600" borderRadius="full" align="center" justify="center" opacity={0} _groupHover={{ opacity: 1 }} transition="all 0.2s">
                    <Icon as={FaCamera} color="white" boxSize={8} />
                  </Flex>
                </Box>
              </PopoverTrigger>
              <PopoverContent w="auto" p={2} shadow="xl" border="1px solid" borderColor={cardBorderColor} borderRadius="lg" bg={cardBg} transition={smoothTransition}>
                <PopoverArrow bg={cardBg} />
                <Button size="sm" leftIcon={<FaCamera />} onClick={() => fileInputRef.current.click()} bg={useColorModeValue('purple.50', 'whiteAlpha.200')} color={useColorModeValue('purple.800', 'purple.200')} _hover={{ bg: useColorModeValue('purple.100', 'whiteAlpha.300') }}>
                  Upload New Photo
                </Button>
              </PopoverContent>
            </Popover>

            <Heading size="md" color={textColor} mb={1} transition={smoothTransition}>{savedAdminName}</Heading>
            <Text color={mutedText} fontSize="sm" mb={4} transition={smoothTransition}>System Master</Text>
            <Badge colorScheme="purple" px={3} py={1} borderRadius="full">Superadmin Access</Badge>
            
            <Divider my={6} borderColor={cardBorderColor} transition={smoothTransition} />
            <VStack align="start" spacing={4} w="full">
              <HStack color={labelColor} fontSize="sm" transition={smoothTransition}>
                <Icon as={FaUserShield} color={useColorModeValue('purple.500', 'purple.300')} />
                <Text fontWeight="bold">ID:</Text>
                <Text>{adminData.adminId}</Text>
              </HStack>
              <HStack color={labelColor} fontSize="sm" transition={smoothTransition}>
                <Icon as={FaEnvelope} color={useColorModeValue('purple.500', 'purple.300')} />
                <Text isTruncated>{adminData.email}</Text>
              </HStack>
              <HStack color={labelColor} fontSize="sm" transition={smoothTransition}>
                <Icon as={FaPhone} color={useColorModeValue('purple.500', 'purple.300')} />
                <Text isTruncated>{adminData.phone}</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>

        {/* --- MAIN PROFILE FORM --- */}
        <Box flex={1} bg={cardBg} borderRadius="xl" shadow="sm" border={cardBorder} p={8} transition={smoothTransition}>
          <Heading size="md" color={sectionHeadingColor} mb={6} borderBottom="1px solid" borderColor={cardBorderColor} pb={4} transition={smoothTransition}>
            Personal Information
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl gridColumn={{ md: "span 2" }}>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Full Name</FormLabel>
              <Input 
                name="fullName" 
                value={adminData.fullName} 
                onChange={handleProfileChange} 
                bg={inputBg} 
                color={textColor} 
                border="1px solid" 
                borderColor={inputBorder} 
                transition={smoothTransition} 
              />
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Contact Email</FormLabel>
              <Input 
                name="email" 
                value={adminData.email} 
                onChange={handleProfileChange} 
                bg={inputBg} 
                color={textColor} 
                border="1px solid" 
                borderColor={inputBorder} 
                transition={smoothTransition} 
              />
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Phone Number</FormLabel>
              <Input 
                name="phone" 
                value={adminData.phone} 
                onChange={handleProfileChange} 
                bg={inputBg} 
                color={textColor} 
                border="1px solid" 
                borderColor={inputBorder} 
                transition={smoothTransition} 
              />
            </FormControl>

            <FormControl gridColumn={{ md: "span 2" }}>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Location</FormLabel>
              <Input 
                name="location" 
                value={adminData.location} 
                onChange={handleProfileChange} 
                bg={inputBg} 
                color={textColor} 
                border="1px solid" 
                borderColor={inputBorder} 
                transition={smoothTransition} 
              />
            </FormControl>
          </SimpleGrid>

          <Heading size="md" color={sectionHeadingColor} mb={6} borderBottom="1px solid" borderColor={cardBorderColor} pb={4} transition={smoothTransition}>
            System Preferences
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Account ID (Read-Only)</FormLabel>
              <Input 
                value={adminData.adminId} 
                isReadOnly 
                bg={readOnlyBg} 
                color={mutedText} 
                cursor="not-allowed" 
                border="1px solid" 
                borderColor={inputBorder} 
                transition={smoothTransition} 
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Access Level</FormLabel>
              <Input 
                value="Level 5 (Unrestricted)" 
                isReadOnly 
                bg={readOnlyBg} 
                color={mutedText} 
                cursor="not-allowed" 
                border="1px solid" 
                borderColor={inputBorder} 
                transition={smoothTransition} 
              />
            </FormControl>
          </SimpleGrid>

          <Flex justify="flex-end">
            <Button 
              bg={btnBg} 
              color="white" 
              _hover={{ bg: btnHover }} 
              size="lg" 
              px={8} 
              onClick={handleSaveChanges} 
              isLoading={isSubmitting} 
              transition={smoothTransition}
            >
              Save Changes
            </Button>
          </Flex>
        </Box>
      </Flex>
    </SuperadminLayout>
  );
}