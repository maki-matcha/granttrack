import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Heading, Flex, Text, SimpleGrid, Button, Avatar, VStack, HStack,
  FormControl, FormLabel, Input, useToast, Divider, Icon, FormHelperText, Badge,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow
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

      <Heading size="lg" mb={6} color="gray.700">Organization Profile</Heading>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        
        <VStack w={{ base: 'full', lg: '300px' }} spacing={6}>
          <Box bg="white" w="full" p={8} borderRadius="xl" shadow="sm" textAlign="center" borderTop="4px solid" borderColor="#5F9598">
            
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Box position="relative" cursor="pointer" display="inline-block" role="group" mb={4}>
                  <Avatar size="2xl" name={orgData.orgName} src={avatarUrl} bg="#5F9598" color="white" />
                  <Flex position="absolute" top={0} left={0} w="full" h="full" bg="blackAlpha.600" borderRadius="full" align="center" justify="center" opacity={0} _groupHover={{ opacity: 1 }} transition="all 0.2s">
                    <Icon as={FaCamera} color="white" boxSize={8} />
                  </Flex>
                </Box>
              </PopoverTrigger>
              <PopoverContent w="auto" p={2} shadow="xl" border="none" borderRadius="lg">
                <PopoverArrow />
                <Button size="sm" leftIcon={<FaCamera />} onClick={() => fileInputRef.current.click()} bg="teal.50" color="teal.800" _hover={{ bg: 'teal.100' }}>
                  Upload New Photo
                </Button>
              </PopoverContent>
            </Popover>

            <Heading size="md" color="gray.800" mb={1}>{orgData.orgName}</Heading>
            <Text color="gray.500" fontSize="sm" mb={4}>Partner Organization</Text>
            <Badge colorScheme="teal" px={3} py={1} borderRadius="full">Verified Partner</Badge>
            
            <Divider my={6} />
            <VStack align="start" spacing={3} w="full">
              <HStack color="gray.600" fontSize="sm"><Icon as={FaIdCard} color="#5F9598" /><Text fontWeight="bold">ORG ID:</Text><Text>{orgData.orgId}</Text></HStack>
              <HStack color="gray.600" fontSize="sm">
                <Icon as={FaUserTie} color="#5F9598" />
                <Text isTruncated>Rep: {savedRepName}</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>

        <Box flex={1} bg="white" borderRadius="xl" shadow="sm" p={8}>
          <Heading size="md" color="#0b253c" mb={6} borderBottom="1px solid" borderColor="gray.100" pb={4}>Official Entity Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Organization ID</FormLabel>
              <Input value={orgData.orgId} isReadOnly bg="gray.100" color="gray.500" cursor="not-allowed" border="none" />
              <FormHelperText fontSize="xs" color="gray.400">System generated verification ID.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Registered Legal Name</FormLabel>
              <Input value={orgData.orgName} isReadOnly bg="gray.100" color="gray.500" cursor="not-allowed" border="none" />
              <Button mt={2} size="xs" variant="outline" colorScheme="teal" leftIcon={<FaShieldAlt />} onClick={handleRequestOrgNameChange} isLoading={isRequestingEdit}>Request Legal Name Update</Button>
            </FormControl>
          </SimpleGrid>

          <Heading size="md" color="#0b253c" mb={6} borderBottom="1px solid" borderColor="gray.100" pb={4}>Representative & Contact Details</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Representative Name</FormLabel>
              <Input name="repName" value={orgData.repName} onChange={handleProfileChange} bg="gray.50" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Contact Email</FormLabel>
              <Input name="email" value={orgData.email} onChange={handleProfileChange} bg="gray.50" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Phone Number</FormLabel>
              <Input name="phone" value={orgData.phone} onChange={handleProfileChange} bg="gray.50" />
            </FormControl>
            <FormControl gridColumn={{ md: "span 2" }}>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Organization Address</FormLabel>
              <Input name="address" value={orgData.address} onChange={handleProfileChange} bg="gray.50" />
            </FormControl>
          </SimpleGrid>

          <Flex justify="flex-end">
            <Button bg="#5F9598" color="white" _hover={{ bg: '#4A7A7D' }} size="lg" px={8} onClick={handleSaveChanges} isLoading={isSubmitting}>Save Changes</Button>
          </Flex>
        </Box>
      </Flex>
    </OrganizationLayout>
  );
}