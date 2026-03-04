import React, { useState } from 'react';
import {
  Box, Flex, VStack, HStack, Text, Avatar, Button, Divider, Icon,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,
  useDisclosure, IconButton, InputGroup, InputLeftElement, Input,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, SimpleGrid, useToast,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow
} from '@chakra-ui/react';
import { 
  FaHome, FaFileAlt, FaBullhorn, FaBars, FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

// Inner Sidebar Component
const SidebarContent = ({ role, userName, userDetail, navigate, location, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', icon: FaHome, path: `/${role}/dashboard` },
    { name: 'Applications', icon: FaFileAlt, path: `/${role}/application` },
    { name: 'Announcement', icon: FaBullhorn, path: `/${role}/announcement` },
  ];

  const handleNav = (path) => {
    if (onClose) {
      onClose();
      setTimeout(() => navigate(path), 250); 
    } else {
      navigate(path); 
    }
  };

  return (
    <Flex direction="column" h="100%" w="full">
      <Flex align="center" mb={6} px={2}>
        <Box w={8} h={8} borderRadius="md" bg="white" mr={3} display="flex" alignItems="center" justifyContent="center">
          <Text color="brand.sidebar" fontWeight="bold" fontSize="sm">GT</Text>
        </Box>
        <Text fontSize="xl" fontWeight="900" color="white" letterSpacing="tighter">GrantTrack</Text>
      </Flex>

      <Divider borderColor="whiteAlpha.300" mb={6} />
      
      <VStack align="start" spacing={2} w="full" flex={1}>
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Button
              key={item.name} w="full" justifyContent="flex-start" variant="ghost"
              bg={isActive ? 'whiteAlpha.300' : 'transparent'}
              color={isActive ? 'white' : 'whiteAlpha.800'}
              _hover={{ bg: 'whiteAlpha.400', color: 'white' }}
              leftIcon={<Icon as={item.icon} />}
              onClick={() => handleNav(item.path)}
            >
              {item.name}
            </Button>
          );
        })}
      </VStack>

      <Box 
        mt="auto" w="full" p={4} borderRadius="xl" bg="whiteAlpha.200" 
        bgGradient="linear(to-br, whiteAlpha.300, transparent)" backdropFilter="blur(12px)" 
        border="1px solid" borderColor="whiteAlpha.400" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <HStack align="center" spacing={3} mb={4}>
          <Avatar size="sm" name={userName} bg="white" color="brand.sidebar" fontWeight="bold" />
          <VStack align="start" spacing={0} overflow="hidden">
            <Text fontWeight="bold" color="white" fontSize="sm" isTruncated>{userName}</Text>
            <Text color="whiteAlpha.800" fontSize="xs" isTruncated textTransform="capitalize">
              {role} • {userDetail}
            </Text>
          </VStack>
        </HStack>
        <Button 
          w="full" size="sm" variant="ghost" bg="whiteAlpha.200" border="1px solid" 
          borderColor="whiteAlpha.400" _hover={{ bg: 'whiteAlpha.300' }} color="white" 
          onClick={() => navigate('/')}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default function DashboardLayout({ children, role, userName, userDetail }) {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();

  const [profileData, setProfileData] = useState({
    fullName: userName,
    email: 'student@example.com',
    phone: '0912 345 6789',
    address: 'Iloilo City, Philippines'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Announcement: Scholarship Deadline Extended', source: 'Admin', time: '10 mins ago', isRead: false },
    { id: 2, title: 'New Grant Category Available', source: 'Organization', time: '2 hours ago', isRead: false },
    { id: 3, title: 'Application Update: Under Review', source: 'System', time: '1 day ago', isRead: true },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right"
    });
    onProfileClose();
  };

  return (
    <Flex h="100vh" bg="gray.50">
      
      {/* 1. DESKTOP SIDEBAR */}
      <Box w="250px" bg="brand.sidebar" p={6} display={{ base: 'none', md: 'block' }} h="100vh" position="sticky" top={0}>
        <SidebarContent role={role} userName={userName} userDetail={userDetail} navigate={navigate} location={location} />
      </Box>

      {/* 2. MOBILE SIDEBAR (DRAWER) */}
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.sidebar" p={4}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white" borderBottomWidth="1px" borderColor="whiteAlpha.200" mb={4}>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent role={role} userName={userName} userDetail={userDetail} navigate={navigate} location={location} onClose={onSidebarClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 3. MAIN CONTENT AREA */}
      <Flex flex={1} direction="column" overflowY="auto">
        
        {/* Top Navigation Bar */}
        <Flex bg="white" p={4} px={{ base: 4, md: 8 }} align="center" justify="space-between" shadow="sm" position="sticky" top={0} zIndex={10}>
          
          {/* LEFT SIDE: Hamburger Menu & Search Bar */}
          <HStack spacing={4}>
            <IconButton display={{ base: 'flex', md: 'none' }} icon={<FaBars />} onClick={onSidebarOpen} variant="ghost" fontSize="xl" aria-label="Open Menu" />
            
            {/* Search Bar: Hidden on mobile to save space, visible on desktop */}
            <InputGroup w={{ md: '400px' }} display={{ base: 'none', md: 'flex' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color="gray.400" /></InputLeftElement>
              <Input placeholder="Search..." borderRadius="full" bg="gray.100" border="none" />
            </InputGroup>
          </HStack>

          {/* RIGHT SIDE: Notifications & Avatar (ALWAYS DISPLAYED) */}
          <HStack spacing={{ base: 2, md: 4 }} display="flex">
            
            {/* Interactive Notification Bell Popover */}
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Box position="relative" cursor="pointer">
                  <IconButton icon={<FaBell />} variant="ghost" borderRadius="full" aria-label="Notifications" />
                  {unreadCount > 0 && (
                    <Flex
                      position="absolute" top="1" right="2" w="4" h="4" bg="red.500" color="white"
                      borderRadius="full" fontSize="9px" align="center" justify="center" fontWeight="bold"
                    >
                      {unreadCount}
                    </Flex>
                  )}
                </Box>
              </PopoverTrigger>
              <PopoverContent w={{ base: "300px", md: "350px" }} shadow="xl" borderRadius="xl" border="none">
                <PopoverArrow />
                <PopoverHeader fontWeight="bold" borderBottomWidth="1px" display="flex" justifyContent="space-between" alignItems="center" py={3}>
                  <Text color="gray.700">Notifications</Text>
                  {unreadCount > 0 && (
                    <Button size="xs" variant="ghost" colorScheme="blue" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </PopoverHeader>
                <PopoverBody p={0} maxH="300px" overflowY="auto">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <Box 
                        key={notif.id} p={4} borderBottom="1px solid" borderColor="gray.50" 
                        bg={notif.isRead ? 'white' : 'blue.50'} _hover={{ bg: 'gray.50' }} 
                        transition="all 0.2s" cursor="pointer"
                      >
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text fontSize="sm" fontWeight="bold" color={notif.isRead ? 'gray.700' : 'blue.700'} lineHeight="1.2" mb={1}>
                              {notif.title}
                            </Text>
                            <Text fontSize="xs" color="gray.500">{notif.source}</Text>
                          </Box>
                          {!notif.isRead && <Box w={2} h={2} bg="blue.500" borderRadius="full" mt={1} />}
                        </Flex>
                        <Text fontSize="xs" color="gray.400" mt={2}>{notif.time}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text p={6} textAlign="center" fontSize="sm" color="gray.500">No new notifications.</Text>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            
            {/* Profile Dropdown */}
            <Menu>
              <MenuButton as={Button} variant="ghost" borderRadius="full" px={2} py={6} _hover={{ bg: 'gray.100' }}>
                <Flex align="center" gap={3}>
                  <Box textAlign="right" display={{ base: 'none', lg: 'block' }}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">{userName}</Text>
                    <Text fontSize="xs" color="gray.500" textTransform="capitalize">{role}</Text>
                  </Box>
                  <Avatar size="sm" name={userName} bg="brand.mediumBlue" color="white" />
                </Flex>
              </MenuButton>
              
              <MenuList shadow="lg" border="none" borderRadius="xl">
                <Box px={4} py={2} mb={2}>
                  <Text fontWeight="bold" fontSize="sm">{userName}</Text>
                  <Text fontSize="xs" color="gray.500">Logged in as {role}</Text>
                </Box>
                <MenuDivider />
                <MenuItem icon={<FaUser />} onClick={onProfileOpen}>My Profile</MenuItem>
                <MenuItem icon={<FaCog />}>Account Settings</MenuItem>
                <MenuDivider />
                <MenuItem icon={<FaSignOutAlt />} color="red.500" onClick={() => navigate('/')}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        <Box p={{ base: 4, md: 8 }}>
          {children}
        </Box>
      </Flex>

      {/* PROFILE MODAL */}
      <Modal isOpen={isProfileOpen} onClose={onProfileClose} size="lg" isCentered>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader color="brand.darkBlue">Personal Information</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6}>
            <Flex align="center" gap={4} mb={6}>
              <Avatar size="xl" name={userName} bg="brand.mediumBlue" color="white" />
              <Button size="sm" variant="outline" colorScheme="blue">Change Photo</Button>
            </Flex>

            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" color="gray.600">{role === 'student' ? 'LRN' : 'ID Number'}</FormLabel>
                <Input value={userDetail} isReadOnly bg="gray.100" color="gray.500" cursor="not-allowed" border="none" />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color="gray.600">Full Name</FormLabel>
                <Input name="fullName" value={profileData.fullName} onChange={handleProfileChange} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color="gray.600">Email Address</FormLabel>
                <Input name="email" type="email" value={profileData.email} onChange={handleProfileChange} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color="gray.600">Phone Number</FormLabel>
                <Input name="phone" value={profileData.phone} onChange={handleProfileChange} />
              </FormControl>

              <FormControl gridColumn="span 2">
                <FormLabel fontSize="sm" color="gray.600">Home Address</FormLabel>
                <Input name="address" value={profileData.address} onChange={handleProfileChange} />
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter borderTop="1px solid" borderColor="gray.100" pt={4}>
            <Button variant="ghost" mr={3} onClick={onProfileClose}>Cancel</Button>
            <Button bg="brand.mediumBlue" color="white" _hover={{ bg: 'brand.darkBlue' }} onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  );
}