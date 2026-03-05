import React, { useState, useEffect } from 'react';
import {
  Box, Flex, VStack, HStack, Text, Avatar, Button, Divider, Icon,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,
  useDisclosure, IconButton, InputGroup, InputLeftElement, Input,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow
} from '@chakra-ui/react';
import { 
  FaHome, FaFileAlt, FaBullhorn, FaBars, FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

// Inner Sidebar Component
const SidebarContent = ({ role, userName, userDetail, navigate, location, onClose, avatarUrl }) => {
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

      <Box mt="auto" w="full" p={4} borderRadius="xl" bg="whiteAlpha.200" bgGradient="linear(to-br, whiteAlpha.300, transparent)" backdropFilter="blur(12px)" border="1px solid" borderColor="whiteAlpha.400" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
        <HStack align="center" spacing={3} mb={4}>
          <Avatar size="sm" name={userName} src={avatarUrl} bg="white" color="brand.sidebar" fontWeight="bold" />
          <VStack align="start" spacing={0} overflow="hidden">
            <Text fontWeight="bold" color="white" fontSize="sm" isTruncated>{userName}</Text>
            <Text color="whiteAlpha.800" fontSize="xs" isTruncated textTransform="capitalize">
              {role} • {userDetail}
            </Text>
          </VStack>
        </HStack>
        <Button w="full" size="sm" variant="ghost" bg="whiteAlpha.200" border="1px solid" borderColor="whiteAlpha.400" _hover={{ bg: 'whiteAlpha.300' }} color="white" onClick={() => navigate('/')}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default function DashboardLayout({ children, role, userName, userDetail }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Announcement: Scholarship Deadline Extended', source: 'Admin', time: '10 mins ago', isRead: false },
    { id: 2, title: 'New Grant Category Available', source: 'Organization', time: '2 hours ago', isRead: false },
    { id: 3, title: 'Application Update: Under Review', source: 'System', time: '1 day ago', isRead: true },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));

  // --- Avatar Sync Logic ---
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem(`granttrack_${role}_avatar`) || '');

  useEffect(() => {
    const handleStorageChange = () => setAvatarUrl(localStorage.getItem(`granttrack_${role}_avatar`) || '');
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('avatarUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('avatarUpdated', handleStorageChange);
    };
  }, [role]);

  return (
    <Flex h="100vh" bg="gray.50">
      
      {/* 1. DESKTOP SIDEBAR */}
      <Box w="250px" bg="brand.sidebar" p={6} display={{ base: 'none', md: 'block' }} h="100vh" position="sticky" top={0}>
        <SidebarContent role={role} userName={userName} userDetail={userDetail} navigate={navigate} location={location} avatarUrl={avatarUrl} />
      </Box>

      {/* 2. MOBILE SIDEBAR */}
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.sidebar" p={4}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white" borderBottomWidth="1px" borderColor="whiteAlpha.200" mb={4}>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent role={role} userName={userName} userDetail={userDetail} navigate={navigate} location={location} onClose={onSidebarClose} avatarUrl={avatarUrl} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 3. MAIN CONTENT AREA */}
      <Flex flex={1} direction="column" overflowY="auto">
        <Flex bg="white" p={4} px={{ base: 4, md: 8 }} align="center" justify="space-between" shadow="sm" position="sticky" top={0} zIndex={10}>
          <HStack spacing={4}>
            <IconButton display={{ base: 'flex', md: 'none' }} icon={<FaBars />} onClick={onSidebarOpen} variant="ghost" fontSize="xl" aria-label="Open Menu" />
            <InputGroup w={{ md: '400px' }} display={{ base: 'none', md: 'flex' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color="gray.400" /></InputLeftElement>
              <Input placeholder="Search..." borderRadius="full" bg="gray.100" border="none" />
            </InputGroup>
          </HStack>

          <HStack spacing={{ base: 2, md: 4 }} display="flex">
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Box position="relative" cursor="pointer">
                  <IconButton icon={<FaBell />} variant="ghost" borderRadius="full" aria-label="Notifications" />
                  {unreadCount > 0 && (
                    <Flex position="absolute" top="1" right="2" w="4" h="4" bg="red.500" color="white" borderRadius="full" fontSize="9px" align="center" justify="center" fontWeight="bold">{unreadCount}</Flex>
                  )}
                </Box>
              </PopoverTrigger>
              <PopoverContent w={{ base: "300px", md: "350px" }} shadow="xl" borderRadius="xl" border="none">
                <PopoverArrow />
                <PopoverHeader fontWeight="bold" borderBottomWidth="1px" display="flex" justifyContent="space-between" alignItems="center" py={3}>
                  <Text color="gray.700">Notifications</Text>
                  {unreadCount > 0 && <Button size="xs" variant="ghost" colorScheme="blue" onClick={markAllAsRead}>Mark all as read</Button>}
                </PopoverHeader>
                <PopoverBody p={0} maxH="300px" overflowY="auto">
                  {notifications.map(notif => (
                    <Box key={notif.id} p={4} borderBottom="1px solid" borderColor="gray.50" bg={notif.isRead ? 'white' : 'blue.50'} _hover={{ bg: 'gray.50' }} transition="all 0.2s" cursor="pointer">
                      <Flex justify="space-between" align="flex-start">
                        <Box>
                          <Text fontSize="sm" fontWeight="bold" color={notif.isRead ? 'gray.700' : 'blue.700'} lineHeight="1.2" mb={1}>{notif.title}</Text>
                          <Text fontSize="xs" color="gray.500">{notif.source}</Text>
                        </Box>
                        {!notif.isRead && <Box w={2} h={2} bg="blue.500" borderRadius="full" mt={1} />}
                      </Flex>
                      <Text fontSize="xs" color="gray.400" mt={2}>{notif.time}</Text>
                    </Box>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            
            <Menu>
              <MenuButton as={Button} variant="ghost" borderRadius="full" px={2} py={6} _hover={{ bg: 'gray.100' }}>
                <Flex align="center" gap={3}>
                  <Box textAlign="right" display={{ base: 'none', lg: 'block' }}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">{userName}</Text>
                    <Text fontSize="xs" color="gray.500" textTransform="capitalize">{role}</Text>
                  </Box>
                  <Avatar size="sm" name={userName} src={avatarUrl} bg="brand.mediumBlue" color="white" />
                </Flex>
              </MenuButton>
              <MenuList shadow="lg" border="none" borderRadius="xl">
                <Box px={4} py={2} mb={2}>
                  <Text fontWeight="bold" fontSize="sm">{userName}</Text>
                  <Text fontSize="xs" color="gray.500">Logged in as {role}</Text>
                </Box>
                <MenuDivider />
                {/* STRICTLY REDIRECTS TO PROFILE PAGE */}
                <MenuItem icon={<FaUser />} onClick={() => navigate(`/${role}/profile`)}>My Profile</MenuItem>
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
    </Flex>
  );
}