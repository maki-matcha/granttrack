import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Heading, Flex, Text, SimpleGrid, Button, Avatar, VStack, HStack,
  FormControl, FormLabel, Input, useToast, Divider, Icon, FormHelperText, Badge,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, useColorModeValue
} from '@chakra-ui/react';
import { FaUserShield, FaIdBadge, FaBuilding, FaCamera } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminProfile() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  
  // --- FIXED STATE: Matches the name and ID from your Admin Dashboard ---
  const [adminData, setAdminData] = useState({
    fullName: 'Bayagni Agbayani',
    adminId: '6787',
    department: 'Scholarship Division',
    email: 'bayagni.agbayani@admin.granttrack.com',
    phone: '+63 919 876 5432',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingEdit, setIsRequestingEdit] = useState(false);

  // --- DARK MODE HOOKS & COLORS ---
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const sectionHeadingColor = useColorModeValue('#1a4e6e', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('sm', 'none');
  const cardBorder = useColorModeValue('none', '1px solid #2D3748');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorder = useColorModeValue('transparent', 'gray.600');
  const readOnlyBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const btnBg = useColorModeValue('#1a4e6e', 'blue.600');
  const btnHover = useColorModeValue('#0b1d2e', 'blue.700');

  // --- AVATAR LOGIC ---
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem('granttrack_admin_avatar') || '');

  useEffect(() => {
    const handleStorageChange = () => setAvatarUrl(localStorage.getItem('granttrack_admin_avatar') || '');
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
        localStorage.setItem('granttrack_admin_avatar', reader.result);
        setAvatarUrl(reader.result);
        window.dispatchEvent(new Event('avatarUpdated'));
        toast({ title: 'Profile Picture Updated', status: 'success', duration: 3000, position: 'top-right' });
      } catch (error) {
        toast({ title: 'Storage Error', description: 'Image resolution is too high for local browser storage.', status: 'warning', duration: 4000, position: 'top-right' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileChange = (e) => setAdminData({ ...adminData, [e.target.name]: e.target.value });

  const handleSaveChanges = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Profile Updated", status: "success", duration: 3000, position: "top-right" });
    }, 1000);
  };

  const handleRequestRoleChange = () => {
    setIsRequestingEdit(true);
    setTimeout(() => {
      setIsRequestingEdit(false);
      toast({ title: "Request Sent to Superadmin", description: "Your request to update your official name/department has been forwarded.", status: "info", duration: 5000, position: "top-right" });
    }, 1500);
  };

  return (
    <DashboardLayout role="admin" userName={adminData.fullName} userDetail={adminData.adminId}>
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>Administrator Profile</Heading>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        
        <VStack w={{ base: 'full', lg: '300px' }} spacing={6}>
          <Box bg={cardBg} w="full" p={8} borderRadius="xl" shadow={cardShadow} border={cardBorder} textAlign="center" borderTop="4px solid" borderColor="#1a4e6e" transition={smoothTransition}>
            
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Box position="relative" cursor="pointer" display="inline-block" role="group" mb={4}>
                  <Avatar size="2xl" name={adminData.fullName} src={avatarUrl} bg="#1a4e6e" color="white" />
                  <Flex position="absolute" top={0} left={0} w="full" h="full" bg="blackAlpha.600" borderRadius="full" align="center" justify="center" opacity={0} _groupHover={{ opacity: 1 }} transition="all 0.2s">
                    <Icon as={FaCamera} color="white" boxSize={8} />
                  </Flex>
                </Box>
              </PopoverTrigger>
              <PopoverContent w="auto" p={2} shadow="xl" border="1px solid" borderColor={borderColor} borderRadius="lg" bg={cardBg} transition={smoothTransition}>
                <PopoverArrow bg={cardBg} />
                <Button size="sm" leftIcon={<FaCamera />} onClick={() => fileInputRef.current.click()} bg={useColorModeValue('blue.50', 'whiteAlpha.200')} color={useColorModeValue('blue.900', 'blue.200')} _hover={{ bg: useColorModeValue('blue.100', 'whiteAlpha.300') }}>
                  Upload New Photo
                </Button>
              </PopoverContent>
            </Popover>

            <Heading size="md" color={textColor} mb={1} transition={smoothTransition}>{adminData.fullName}</Heading>
            <Text color={mutedText} fontSize="sm" mb={4} transition={smoothTransition}>System Administrator</Text>
            <Badge colorScheme="purple" px={3} py={1} borderRadius="full">Level 2 Access</Badge>
            
            <Divider my={6} borderColor={borderColor} transition={smoothTransition} />
            <VStack align="start" spacing={3} w="full">
              <HStack color={subtitleColor} fontSize="sm" transition={smoothTransition}><Icon as={FaIdBadge} color="#1a4e6e" /><Text fontWeight="bold">ID:</Text><Text>{adminData.adminId}</Text></HStack>
              <HStack color={subtitleColor} fontSize="sm" transition={smoothTransition}><Icon as={FaBuilding} color="#1a4e6e" /><Text isTruncated>{adminData.department}</Text></HStack>
            </VStack>
          </Box>
        </VStack>

        <Box flex={1} bg={cardBg} borderRadius="xl" shadow={cardShadow} border={cardBorder} p={8} transition={smoothTransition}>
          <Heading size="md" color={sectionHeadingColor} mb={6} borderBottom="1px solid" borderColor={borderColor} pb={4} transition={smoothTransition}>Official Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color={subtitleColor} fontWeight="bold" transition={smoothTransition}>Admin ID</FormLabel>
              <Input value={adminData.adminId} isReadOnly bg={readOnlyBg} color={mutedText} cursor="not-allowed" border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
              <FormHelperText fontSize="xs" color={mutedText} transition={smoothTransition}>System generated ID.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={subtitleColor} fontWeight="bold" transition={smoothTransition}>Registered Name & Department</FormLabel>
              <Input value={`${adminData.fullName} - ${adminData.department}`} isReadOnly bg={readOnlyBg} color={mutedText} cursor="not-allowed" border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
              <Button mt={2} size="xs" variant="outline" colorScheme="blue" leftIcon={<FaUserShield />} onClick={handleRequestRoleChange} isLoading={isRequestingEdit}>Request Name/Dept Update</Button>
            </FormControl>
          </SimpleGrid>

          <Heading size="md" color={sectionHeadingColor} mb={6} borderBottom="1px solid" borderColor={borderColor} pb={4} transition={smoothTransition}>Contact Details</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color={subtitleColor} fontWeight="bold" transition={smoothTransition}>Work Email Address</FormLabel>
              <Input name="email" value={adminData.email} onChange={handleProfileChange} bg={inputBg} color={textColor} border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={subtitleColor} fontWeight="bold" transition={smoothTransition}>Contact Number</FormLabel>
              <Input name="phone" value={adminData.phone} onChange={handleProfileChange} bg={inputBg} color={textColor} border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
            </FormControl>
          </SimpleGrid>

          <Flex justify="flex-end">
            <Button bg={btnBg} color="white" _hover={{ bg: btnHover }} size="lg" px={8} onClick={handleSaveChanges} isLoading={isSubmitting}>Save Changes</Button>
          </Flex>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}