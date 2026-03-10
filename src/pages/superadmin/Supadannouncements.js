import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, VStack, HStack, Input, Textarea, Select, Button, 
  Badge, useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Divider
} from '@chakra-ui/react';
import { FaChevronRight, FaBullhorn } from 'react-icons/fa';
import SuperadminLayout from '../../components/SuperadminLayout'; // Adjust path if needed

// --- MOCK DATA BASED ON PROTOTYPE ---
const mockAnnouncements = [
  {
    id: 1,
    title: 'System Maintenance Notice',
    date: 'Mar 15, 2026',
    audience: 'All Users',
    content: 'Please be advised that the system will undergo scheduled maintenance on Sunday, March 20th from 12:00 AM to 4:00 AM PST. During this time, the platform will be temporarily unavailable.',
  },
  {
    id: 2,
    title: 'New Scholarship Program Added',
    date: 'Mar 10, 2026',
    audience: 'Students',
    content: 'We are excited to announce a new STEM Excellence scholarship program provided by the Tech for Tomorrow Foundation. Applications are now open!',
  },
  {
    id: 3,
    title: 'Updated Verification Guidelines',
    date: 'Mar 05, 2026',
    audience: 'Organizations',
    content: 'Please review the updated organization verification guidelines. All newly registered organizations must submit their SEC registration documents within 30 days.',
  },
];

const getAudienceBadge = (audience) => {
  switch (audience) {
    case 'All Users': return 'blue';
    case 'Students': return 'green';
    case 'Organizations': return 'purple';
    case 'Admins': return 'red';
    default: return 'gray';
  }
};

export default function Supadannouncements() {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [message, setMessage] = useState('');

  // Theme Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.900');

  const handlePublish = () => {
    // Logic to handle publishing goes here
    console.log({ title, audience, message });
    setTitle('');
    setAudience('');
    setMessage('');
  };

  return (
    <SuperadminLayout userName="System Admin" userDetail="Superadmin">
      <Box maxW="7xl" mx="auto">
        
        {/* --- HEADER & BREADCRUMBS --- */}
        <Box mb={8}>
          <Breadcrumb spacing="8px" separator={<Icon as={FaChevronRight} color={mutedText} fontSize="xs" />} mb={2}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/superadmin/dashboard" color={mutedText} fontSize="sm">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">Announcements</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading size="lg" color={textColor}>Announcements</Heading>
        </Box>

        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          
          {/* --- LEFT COLUMN: POST NEW ANNOUNCEMENT --- */}
          <Box flex={1} bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
            <VStack align="stretch" spacing={5}>
              <HStack spacing={3} mb={2}>
                <Box p={2} bg="purple.50" color="purple.500" borderRadius="md">
                  <Icon as={FaBullhorn} boxSize={5} />
                </Box>
                <Heading size="md" color={textColor}>Post New Announcement</Heading>
              </HStack>
              
              <Box>
                <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>Announcement Title</Text>
                <Input 
                  placeholder="Enter title here..." 
                  bg={inputBg} 
                  borderColor={borderColor}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>Target Audience</Text>
                <Select 
                  placeholder="Select audience" 
                  bg={inputBg} 
                  borderColor={borderColor}
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option value="All Users">All Users</option>
                  <option value="Students">Students Only</option>
                  <option value="Organizations">Organizations Only</option>
                  <option value="Admins">Admins Only</option>
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="bold" color={textColor} mb={2}>Message Content</Text>
                <Textarea 
                  placeholder="Add announcement text here..." 
                  bg={inputBg} 
                  minH="200px" 
                  borderColor={borderColor} 
                  resize="vertical" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
              
              <Flex justify="flex-end" mt={4}>
                <Button 
                  size="md" 
                  colorScheme="purple" 
                  px={8} 
                  onClick={handlePublish}
                  isDisabled={!title || !audience || !message}
                >
                  Publish
                </Button>
              </Flex>
            </VStack>
          </Box>
          
          {/* --- RIGHT COLUMN: RECENT ANNOUNCEMENTS --- */}
          <Box flex={1} bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} display="flex" flexDirection="column">
            <Heading size="md" color={textColor} mb={6}>Recent Announcements</Heading>
            
            <VStack align="stretch" spacing={4} flex={1} overflowY="auto" pr={2} css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: borderColor, borderRadius: '4px' },
            }}>
              {mockAnnouncements.map((announcement, index) => (
                <Box key={announcement.id}>
                  <Box p={4} bg={inputBg} borderRadius="lg" border="1px solid" borderColor={borderColor} _hover={{ borderColor: 'purple.300' }} transition="all 0.2s">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                      <Heading size="sm" color={textColor} mb={1}>{announcement.title}</Heading>
                      <Text fontSize="xs" color={mutedText} whiteSpace="nowrap" ml={3}>{announcement.date}</Text>
                    </Flex>
                    <HStack mb={3}>
                      <Text fontSize="xs" color={mutedText} fontWeight="bold">To:</Text>
                      <Badge colorScheme={getAudienceBadge(announcement.audience)} px={2} py={0.5} borderRadius="md" fontSize="2xs">
                        {announcement.audience}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color={mutedText} noOfLines={3}>
                      {announcement.content}
                    </Text>
                  </Box>
                  {index < mockAnnouncements.length - 1 && <Divider my={4} borderColor={borderColor} />}
                </Box>
              ))}
            </VStack>
          </Box>

        </Flex>
      </Box>
    </SuperadminLayout>
  );
}