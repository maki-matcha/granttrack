import React, { useState, useEffect } from 'react';
import {
  Box, Flex, VStack, HStack, Text, Avatar, Button, Divider, Icon,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,
  useDisclosure, IconButton, InputGroup, InputLeftElement, Input,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider, useColorMode, useColorModeValue,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, Switch
} from '@chakra-ui/react';
import { 
  FaHome, FaBullhorn, FaBars, FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt, FaMoon, FaSun 
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarContent = ({ userName, userRole, navigate, location, onClose, avatarUrl }) => {
  const menuItems = [
    { name: 'Dashboard', icon: FaHome, path: '/organization/dashboard' },
    { name: 'Announcement', icon: FaBullhorn, path: '/organization/announcement' },
  ];

  const handleNav = (path) => {
    if (onClose) { onClose(); setTimeout(() => navigate(path), 250); } 
    else { navigate(path); }
  };

  return (
    <Flex direction="column" h="100%" w="full">
      <Flex align="center" mb={6} px={2}>
        <Box w={8} h={8} borderRadius="md" bg="white" mr={3} display="flex" alignItems="center" justifyContent="center">
          <Text color="#1A3263" fontWeight="bold" fontSize="sm">GT</Text>
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
      <Box mt="auto" w="full" p={4} borderRadius="xl" bg="whiteAlpha.200" bgGradient="linear(to-br, whiteAlpha.300, transparent)" backdropFilter="blur(12px)" border="1px solid" borderColor="whiteAlpha.400">
        <HStack align="center" spacing={3} mb={4}>
          <Avatar size="sm" name={userName} src={avatarUrl} bg="#0b253c" color="white" fontWeight="bold" />
          <VStack align="start" spacing={0} overflow="hidden">
            <Text fontWeight="bold" color="white" fontSize="sm" isTruncated>{userName}</Text>
            <Text color="whiteAlpha.800" fontSize="xs" isTruncated>{userRole}</Text>
          </VStack>
        </HStack>
        <Button w="full" size="sm" variant="ghost" bg="whiteAlpha.200" border="1px solid" borderColor="whiteAlpha.400" _hover={{ bg: 'whiteAlpha.300' }} color="white" onClick={() => navigate('/')}>
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default function OrganizationLayout({ children, userName = "Mikha Lim", userRole = "CEO/Marketing Dir." }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();

  // --- DARK MODE HOOKS & DYNAMIC COLORS ---
  const { colorMode, toggleColorMode } = useColorMode();
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const searchBg = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.200');
  const unreadBg = useColorModeValue('teal.50', 'teal.900');
  const unreadTextColor = useColorModeValue('teal.700', 'teal.200');

  const [displayUserName, setDisplayUserName] = useState(() => localStorage.getItem('granttrack_org_repName') || userName);

  useEffect(() => {
    const handleNameChange = () => setDisplayUserName(localStorage.getItem('granttrack_org_repName') || userName);
    window.addEventListener('storage', handleNameChange);
    window.addEventListener('repNameUpdated', handleNameChange);
    return () => {
      window.removeEventListener('storage', handleNameChange);
      window.removeEventListener('repNameUpdated', handleNameChange);
    };
  }, [userName]);

  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem('granttrack_org_avatar') || '');

  useEffect(() => {
    const handleStorageChange = () => setAvatarUrl(localStorage.getItem('granttrack_org_avatar') || '');
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('avatarUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('avatarUpdated', handleStorageChange);
    };
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Application Submitted', source: 'System', time: '10 mins ago', isRead: false },
    { id: 2, title: 'Admin Approved Grant Funding', source: 'Admin', time: '2 hours ago', isRead: false },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));

  return (
    // Animation applied to the root container
    <Flex h="100vh" bg={pageBg} transition="background-color 0.3s ease-in-out, color 0.3s ease-in-out">
      <Box w="250px" bg="#1A3263" p={6} display={{ base: 'none', md: 'block' }} h="100vh" position="sticky" top={0}>
        <SidebarContent userName={displayUserName} userRole={userRole} navigate={navigate} location={location} avatarUrl={avatarUrl} />
      </Box>

      <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
        <DrawerOverlay />
        <DrawerContent bg="#1A3263" p={4}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white" borderBottomWidth="1px" borderColor="whiteAlpha.200" mb={4}>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent userName={displayUserName} userRole={userRole} navigate={navigate} location={location} onClose={onSidebarClose} avatarUrl={avatarUrl} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex flex={1} direction="column" overflowY="auto">
        {/* Animated Navigation Bar */}
        <Flex bg={navBg} p={4} px={{ base: 4, md: 8 }} align="center" justify="space-between" shadow="sm" position="sticky" top={0} zIndex={10} transition="background-color 0.3s ease-in-out, border-color 0.3s ease-in-out">
          <HStack spacing={4}>
            <IconButton display={{ base: 'flex', md: 'none' }} icon={<FaBars />} onClick={onSidebarOpen} variant="ghost" fontSize="xl" aria-label="Open Menu" color={textColor} />
            <InputGroup w={{ md: '400px' }} display={{ base: 'none', md: 'flex' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color={mutedText} /></InputLeftElement>
              <Input placeholder="Search..." borderRadius="full" bg={searchBg} border="none" color={textColor} _placeholder={{ color: mutedText }} transition="all 0.3s ease-in-out" />
            </InputGroup>
          </HStack>

          <HStack spacing={{ base: 2, md: 4 }} display="flex">
            
            {/* --- NEW: THEME SWITCH UI --- */}
            <HStack bg={searchBg} px={3} py={1.5} borderRadius="full" spacing={2} transition="all 0.3s ease-in-out">
              <Icon as={FaSun} color={colorMode === 'light' ? 'yellow.500' : 'gray.500'} transition="color 0.3s" />
              <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} colorScheme="teal" size="sm" />
              <Icon as={FaMoon} color={colorMode === 'dark' ? 'teal.300' : 'gray.400'} transition="color 0.3s" />
            </HStack>

            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Box position="relative" cursor="pointer">
                  <IconButton icon={<FaBell />} variant="ghost" borderRadius="full" aria-label="Notifications" color={textColor} _hover={{ bg: hoverBg }} />
                  {unreadCount > 0 && (
                    <Flex position="absolute" top="1" right="2" w="4" h="4" bg="red.500" color="white" borderRadius="full" fontSize="9px" align="center" justify="center" fontWeight="bold">{unreadCount}</Flex>
                  )}
                </Box>
              </PopoverTrigger>
              <PopoverContent w={{ base: "300px", md: "350px" }} shadow="xl" borderRadius="xl" border="none" bg={navBg} transition="background-color 0.3s ease-in-out">
                <PopoverArrow bg={navBg} />
                <PopoverHeader fontWeight="bold" borderBottomWidth="1px" borderColor={borderColor} display="flex" justifyContent="space-between" alignItems="center" py={3}>
                  <Text color={textColor}>Notifications</Text>
                  {unreadCount > 0 && <Button size="xs" variant="ghost" colorScheme="teal" onClick={markAllAsRead}>Mark all as read</Button>}
                </PopoverHeader>
                <PopoverBody p={0} maxH="300px" overflowY="auto">
                  {notifications.map(notif => (
                    <Box key={notif.id} p={4} borderBottom="1px solid" borderColor={borderColor} bg={notif.isRead ? navBg : unreadBg} _hover={{ bg: hoverBg }} transition="all 0.3s ease" cursor="pointer">
                      <Flex justify="space-between" align="flex-start">
                        <Box>
                          <Text fontSize="sm" fontWeight="bold" color={notif.isRead ? textColor : unreadTextColor} lineHeight="1.2" mb={1}>{notif.title}</Text>
                          <Text fontSize="xs" color={mutedText}>{notif.source}</Text>
                        </Box>
                        {!notif.isRead && <Box w={2} h={2} bg="teal.500" borderRadius="full" mt={1} />}
                      </Flex>
                      <Text fontSize="xs" color={mutedText} mt={2}>{notif.time}</Text>
                    </Box>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Menu>
              <MenuButton as={Button} variant="ghost" borderRadius="full" px={2} py={6} _hover={{ bg: hoverBg }} transition="background-color 0.3s ease">
                <Flex align="center" gap={3}>
                  <Box textAlign="right" display={{ base: 'none', lg: 'block' }}>
                    <Text fontSize="sm" fontWeight="bold" color={textColor} transition="color 0.3s">{displayUserName}</Text>
                    <Text fontSize="xs" color={mutedText}>Organization</Text>
                  </Box>
                  <Avatar size="sm" name={displayUserName} src={avatarUrl} bg="#1A3263" color="white" />
                </Flex>
              </MenuButton>
              <MenuList shadow="lg" border="none" borderRadius="xl" bg={navBg} borderColor={borderColor} transition="background-color 0.3s ease">
                <Box px={4} py={2} mb={2}>
                  <Text fontWeight="bold" fontSize="sm" color={textColor}>{displayUserName}</Text>
                  <Text fontSize="xs" color={mutedText}>Logged in as Organization</Text>
                </Box>
                <MenuDivider borderColor={borderColor} />
                <MenuItem icon={<FaUser />} onClick={() => navigate('/organization/profile')} bg={navBg} _hover={{ bg: hoverBg }} transition="all 0.2s">My Profile</MenuItem>
                <MenuItem icon={<FaCog />} bg={navBg} _hover={{ bg: hoverBg }} transition="all 0.2s">Account Settings</MenuItem>
                <MenuDivider borderColor={borderColor} />
                <MenuItem icon={<FaSignOutAlt />} color="red.500" onClick={() => navigate('/')} bg={navBg} _hover={{ bg: hoverBg }} transition="all 0.2s">Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        <Box p={{ base: 4, md: 8 }} transition="all 0.3s ease-in-out">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}