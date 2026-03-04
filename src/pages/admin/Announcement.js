import React from 'react';
import { Box, Heading, VStack, Text, Input, Textarea, Button, Flex } from '@chakra-ui/react';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminAnnouncement() {
  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading size="lg" mb={6} color="gray.700">Announcements</Heading>
      
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        {/* Create Announcement Form */}
        <Box flex={1} bg="white" shadow="sm" borderRadius="md" p={6}>
          <Heading size="md" mb={4}>Post New Announcement</Heading>
          <VStack spacing={4}>
            <Input placeholder="Announcement Title" bg="gray.50" />
            <Textarea placeholder="Type your message here..." rows={5} bg="gray.50" />
            <Button colorScheme="blue" w="full">Publish</Button>
          </VStack>
        </Box>

        {/* Recent Announcements List */}
        <Box flex={1}>
          <Heading size="md" mb={4}>Recent Posts</Heading>
          <VStack align="stretch" spacing={4}>
            <Box bg="white" p={5} shadow="sm" borderRadius="md" borderLeft="4px solid" borderColor="blue.500">
              <Text fontWeight="bold" fontSize="lg">Scholarship Deadline Extended</Text>
              <Text fontSize="xs" color="gray.400" mb={2}>Posted on Oct 14, 2023</Text>
              <Text fontSize="sm" color="gray.600">The deadline for the upcoming semester's grant applications has been extended to November 1st.</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}