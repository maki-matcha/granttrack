import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Heading, Flex, Text, SimpleGrid, Button, Avatar, VStack, HStack,
  FormControl, FormLabel, Input, useToast, Divider, Icon, FormHelperText, Badge,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, useColorModeValue
} from '@chakra-ui/react';
import { FaIdCard, FaUserTie, FaShieldAlt, FaCamera } from 'react-icons/fa';
import OrganizationLayout from '../../components/OrganizationLayout';

export default function OrganizationProfile() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  
  // --- Initialize name from Local Storage so it remembers! ---
  const initialName = localStorage.getItem('granttrack_org_repName') || 'Mikha Lim';
  const [savedRepName, setSavedRepName] = useState(initialName);

  const [orgData, setOrgData] = useState({
    orgName: 'Tech for Tomorrow Foundation',
    orgId: 'ORG-2026-143',
    repName: initialName, // Start with the saved name
    email: 'mikha.lim@techfoundation.org',
    phone: '+63 912 345 6789',
    address: 'Iloilo City, Philippines'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingEdit, setIsRequestingEdit] = useState(false);

  // --- DARK MODE HOOKS & COLORS ---
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const sectionHeadingColor = useColorModeValue('#0b253c', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('none', '1px solid #2D3748');
  const cardBorderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  
  // Input Colors
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const readOnlyBg = useColorModeValue('gray.100', 'whiteAlpha.100');
  const inputBorder = useColorModeValue('transparent', 'gray.600');
  
  // Theme Accents
  const primaryAccent = useColorModeValue('#1A3263', 'blue.500');
  const btnBg = useColorModeValue('#1A3263', 'blue.500');
  const btnHover = useColorModeValue('#4A7A7D', 'blue.600');

  // --- AVATAR LOGIC ---
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem('granttrack_org_avatar') || '');

  useEffect(() => {
    const handleStorageChange = () => setAvatarUrl(localStorage.getItem('granttrack_org_avatar') || '');
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
        localStorage.setItem('granttrack_org_avatar', reader.result);
        setAvatarUrl(reader.result);
        window.dispatchEvent(new Event('avatarUpdated'));
        toast({ title: 'Profile Picture Updated', status: 'success', duration: 3000, position: 'top-right' });
      } catch (error) {
        toast({ title: 'Storage Error', description: 'Image resolution is too high.', status: 'warning', duration: 4000, position: 'top-right' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileChange = (e) => setOrgData({ ...orgData, [e.target.name]: e.target.value });

  const handleSaveChanges = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      // --- SAVE NEW NAME TO LOCAL STORAGE ---
      localStorage.setItem('granttrack_org_repName', orgData.repName);
      setSavedRepName(orgData.repName);
      
      // Tell the layout to update immediately
      window.dispatchEvent(new Event('repNameUpdated'));
      
      toast({ title: "Profile Updated", status: "success", duration: 3000, position: "top-right" });
    }, 1000);
  };

  const handleRequestOrgNameChange = () => {
    setIsRequestingEdit(true);
    setTimeout(() => {
      setIsRequestingEdit(false);
      toast({ title: "Request Sent to Admin", description: "Your request to update the Legal Name has been forwarded for verification.", status: "info", duration: 5000, position: "top-right" });
    }, 1500);
  };

  return (
    <OrganizationLayout userName={savedRepName} userRole="CEO/Marketing Dir." orgId={orgData.orgId}>
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>Organization Profile</Heading>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        
        {/* --- LEFT SIDEBAR (AVATAR) --- */}
        <VStack w={{ base: 'full', lg: '300px' }} spacing={6}>
          <Box bg={cardBg} w="full" p={8} borderRadius="xl" shadow="sm" border={cardBorder} textAlign="center" borderTop="4px solid" borderColor={primaryAccent} transition={smoothTransition}>
            
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Box position="relative" cursor="pointer" display="inline-block" role="group" mb={4}>
                  <Avatar size="2xl" name={orgData.orgName} src={avatarUrl} bg={primaryAccent} color="white" />
                  <Flex position="absolute" top={0} left={0} w="full" h="full" bg="blackAlpha.600" borderRadius="full" align="center" justify="center" opacity={0} _groupHover={{ opacity: 1 }} transition="all 0.2s">
                    <Icon as={FaCamera} color="white" boxSize={8} />
                  </Flex>
                </Box>
              </PopoverTrigger>
              <PopoverContent w="auto" p={2} shadow="xl" border="1px solid" borderColor={cardBorderColor} borderRadius="lg" bg={cardBg} transition={smoothTransition}>
                <PopoverArrow bg={cardBg} />
                <Button size="sm" leftIcon={<FaCamera />} onClick={() => fileInputRef.current.click()} bg={useColorModeValue('teal.50', 'whiteAlpha.200')} color={useColorModeValue('teal.800', 'teal.200')} _hover={{ bg: useColorModeValue('teal.100', 'whiteAlpha.300') }}>
                  Upload New Photo
                </Button>
              </PopoverContent>
            </Popover>

            <Heading size="md" color={textColor} mb={1} transition={smoothTransition}>{orgData.orgName}</Heading>
            <Text color={mutedText} fontSize="sm" mb={4} transition={smoothTransition}>Partner Organization</Text>
            <Badge colorScheme="teal" px={3} py={1} borderRadius="full">Verified Partner</Badge>
            
            <Divider my={6} borderColor={cardBorderColor} transition={smoothTransition} />
            <VStack align="start" spacing={3} w="full">
              <HStack color={labelColor} fontSize="sm" transition={smoothTransition}><Icon as={FaIdCard} color={primaryAccent} /><Text fontWeight="bold">ORG ID:</Text><Text>{orgData.orgId}</Text></HStack>
              <HStack color={labelColor} fontSize="sm" transition={smoothTransition}>
                <Icon as={FaUserTie} color={primaryAccent} />
                <Text isTruncated>Rep: {savedRepName}</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>

        {/* --- MAIN PROFILE FORM --- */}
        <Box flex={1} bg={cardBg} borderRadius="xl" shadow="sm" border={cardBorder} p={8} transition={smoothTransition}>
          <Heading size="md" color={sectionHeadingColor} mb={6} borderBottom="1px solid" borderColor={cardBorderColor} pb={4} transition={smoothTransition}>Official Entity Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Organization ID</FormLabel>
              <Input value={orgData.orgId} isReadOnly bg={readOnlyBg} color={mutedText} cursor="not-allowed" border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
              <FormHelperText fontSize="xs" color={mutedText} transition={smoothTransition}>System generated verification ID.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Registered Legal Name</FormLabel>
              <Input value={orgData.orgName} isReadOnly bg={readOnlyBg} color={mutedText} cursor="not-allowed" border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
              <Button mt={2} size="xs" variant="outline" colorScheme="teal" leftIcon={<FaShieldAlt />} onClick={handleRequestOrgNameChange} isLoading={isRequestingEdit}>Request Legal Name Update</Button>
            </FormControl>
          </SimpleGrid>

          <Heading size="md" color={sectionHeadingColor} mb={6} borderBottom="1px solid" borderColor={cardBorderColor} pb={4} transition={smoothTransition}>Representative & Contact Details</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Representative Name</FormLabel>
              <Input name="repName" value={orgData.repName} onChange={handleProfileChange} bg={inputBg} color={textColor} border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Contact Email</FormLabel>
              <Input name="email" value={orgData.email} onChange={handleProfileChange} bg={inputBg} color={textColor} border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Phone Number</FormLabel>
              <Input name="phone" value={orgData.phone} onChange={handleProfileChange} bg={inputBg} color={textColor} border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
            </FormControl>
            <FormControl gridColumn={{ md: "span 2" }}>
              <FormLabel fontSize="sm" color={labelColor} fontWeight="bold" transition={smoothTransition}>Organization Address</FormLabel>
              <Input name="address" value={orgData.address} onChange={handleProfileChange} bg={inputBg} color={textColor} border="1px solid" borderColor={inputBorder} transition={smoothTransition} />
            </FormControl>
          </SimpleGrid>

          <Flex justify="flex-end">
            <Button bg={btnBg} color="white" _hover={{ bg: btnHover }} size="lg" px={8} onClick={handleSaveChanges} isLoading={isSubmitting} transition={smoothTransition}>Save Changes</Button>
          </Flex>
        </Box>
      </Flex>
    </OrganizationLayout>
  );
}