import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Heading, Flex, Text, SimpleGrid, Button, Avatar, VStack, HStack,
  FormControl, FormLabel, Input, useToast, Divider, Icon, FormHelperText, Badge,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow
} from '@chakra-ui/react';
import { FaUserShield, FaIdBadge, FaBuilding, FaCamera } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminProfile() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  
  const [adminData, setAdminData] = useState({
    fullName: 'Jane Doe',
    adminId: 'ADM-2024-001',
    department: 'Scholarship Division',
    email: 'jane.doe@admin.granttrack.com',
    phone: '+63 919 876 5432',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingEdit, setIsRequestingEdit] = useState(false);

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

      <Heading size="lg" mb={6} color="gray.700">Administrator Profile</Heading>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        
        <VStack w={{ base: 'full', lg: '300px' }} spacing={6}>
          <Box bg="white" w="full" p={8} borderRadius="xl" shadow="sm" textAlign="center" borderTop="4px solid" borderColor="#1a4e6e">
            
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Box position="relative" cursor="pointer" display="inline-block" role="group" mb={4}>
                  <Avatar size="2xl" name={adminData.fullName} src={avatarUrl} bg="#1a4e6e" color="white" />
                  <Flex position="absolute" top={0} left={0} w="full" h="full" bg="blackAlpha.600" borderRadius="full" align="center" justify="center" opacity={0} _groupHover={{ opacity: 1 }} transition="all 0.2s">
                    <Icon as={FaCamera} color="white" boxSize={8} />
                  </Flex>
                </Box>
              </PopoverTrigger>
              <PopoverContent w="auto" p={2} shadow="xl" border="none" borderRadius="lg">
                <PopoverArrow />
                <Button size="sm" leftIcon={<FaCamera />} onClick={() => fileInputRef.current.click()} bg="blue.50" color="blue.900" _hover={{ bg: 'blue.100' }}>
                  Upload New Photo
                </Button>
              </PopoverContent>
            </Popover>

            <Heading size="md" color="gray.800" mb={1}>{adminData.fullName}</Heading>
            <Text color="gray.500" fontSize="sm" mb={4}>System Administrator</Text>
            <Badge colorScheme="purple" px={3} py={1} borderRadius="full">Level 2 Access</Badge>
            
            <Divider my={6} />
            <VStack align="start" spacing={3} w="full">
              <HStack color="gray.600" fontSize="sm"><Icon as={FaIdBadge} color="#1a4e6e" /><Text fontWeight="bold">ID:</Text><Text>{adminData.adminId}</Text></HStack>
              <HStack color="gray.600" fontSize="sm"><Icon as={FaBuilding} color="#1a4e6e" /><Text isTruncated>{adminData.department}</Text></HStack>
            </VStack>
          </Box>
        </VStack>

        <Box flex={1} bg="white" borderRadius="xl" shadow="sm" p={8}>
          <Heading size="md" color="#1a4e6e" mb={6} borderBottom="1px solid" borderColor="gray.100" pb={4}>Official Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Admin ID</FormLabel>
              <Input value={adminData.adminId} isReadOnly bg="gray.100" color="gray.500" cursor="not-allowed" border="none" />
              <FormHelperText fontSize="xs" color="gray.400">System generated ID.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Registered Name & Department</FormLabel>
              <Input value={`${adminData.fullName} - ${adminData.department}`} isReadOnly bg="gray.100" color="gray.500" cursor="not-allowed" border="none" />
              <Button mt={2} size="xs" variant="outline" colorScheme="blue" leftIcon={<FaUserShield />} onClick={handleRequestRoleChange} isLoading={isRequestingEdit}>Request Name/Dept Update</Button>
            </FormControl>
          </SimpleGrid>

          <Heading size="md" color="#1a4e6e" mb={6} borderBottom="1px solid" borderColor="gray.100" pb={4}>Contact Details</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
            <FormControl><FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Work Email Address</FormLabel><Input name="email" value={adminData.email} onChange={handleProfileChange} bg="gray.50" /></FormControl>
            <FormControl><FormLabel fontSize="sm" color="gray.600" fontWeight="bold">Contact Number</FormLabel><Input name="phone" value={adminData.phone} onChange={handleProfileChange} bg="gray.50" /></FormControl>
          </SimpleGrid>

          <Flex justify="flex-end">
            <Button bg="#1a4e6e" color="white" _hover={{ bg: '#0b1d2e' }} size="lg" px={8} onClick={handleSaveChanges} isLoading={isSubmitting}>Save Changes</Button>
          </Flex>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}