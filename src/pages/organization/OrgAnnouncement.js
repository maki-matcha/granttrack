import React from 'react';
import { Box, Heading, Flex, Text, VStack, Input, Textarea, Button } from '@chakra-ui/react';
import OrganizationLayout from '../../components/OrganizationLayout'; // Import the layout

export default function OrgAnnouncement() {
  const announcementStatusCards = [
    { label: 'LATEST', count: '0' },
    { label: 'ARCHIVE', count: '0' },
    { label: 'URGENT', count: '0' },
  ];

  return (
    <OrganizationLayout>
      <Box flex={1} bg="white" shadow="sm" borderRadius="xl" p={6} minH="80vh" border="1px solid" borderColor="gray.100">
        <Heading size="lg" mb={6} color="#0b253c">Announcements</Heading>
        
        <Flex gap={6} mb={8} direction={{ base: 'column', md: 'row' }}>
          {announcementStatusCards.map((card, idx) => (
            <Box key={idx} flex={1} bg="white" p={5} borderRadius="lg" shadow="sm" borderTop="4px solid" borderColor={idx === 0 ? 'blue.400' : (idx === 1 ? 'green.400' : 'red.400')}>
              <Flex align="center" justify="space-between">
                <Text fontSize="xs" color="gray.500" fontWeight="bold">{card.label}</Text>
                <Text fontSize="3xl" fontWeight="900" color={idx === 0 ? "blue.500" : (idx === 1 ? 'green.500' : 'red.500')}>{card.count}</Text>
              </Flex>
            </Box>
          ))}
        </Flex>

        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          <VStack align="stretch" spacing={4} flex={1}>
            <Heading size="md" color="#0b253c" mb={2}>Post New Announcement</Heading>
            
            <Input placeholder="Announcement Title" bg="gray.100" border="none" size="md" borderRadius="md" />
            <Textarea placeholder="Add an announcement text here..." bg="gray.100" minH="200px" border="none" resize="none" borderRadius="md" />
            
            <Flex justify="flex-end" mt={2}>
              <Button size="md" bg="#5F9598" color="white" _hover={{ bg: '#4A7A7D' }} px={8} borderRadius="full">
                Publish
              </Button>
            </Flex>
          </VStack>
          
          <VStack align="stretch" spacing={4} flex={1}>
            <Heading size="md" color="#0b253c" mb={2}>Recent Announcement</Heading>
            <Box flex={1} minH="250px" bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={6} shadow="sm">
              <Text color="gray.400" fontSize="sm" fontStyle="italic">
                Published announcements will appear here.
              </Text>
            </Box>
          </VStack>
        </Flex>

      </Box>
    </OrganizationLayout>
  );
}