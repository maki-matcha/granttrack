import React from 'react';
import { Box, Heading, VStack, Text, Badge } from '@chakra-ui/react';
import DashboardLayout from '../../components/DashboardLayout';

export default function StudentAnnouncement() {
  return (
    <DashboardLayout role="student" userName="Taylor Swift" userDetail="00000000000">
      <Heading size="lg" mb={6} color="gray.700">School Announcements</Heading>
      
      <VStack align="stretch" spacing={4} maxW="4xl">
        <Box bg="white" shadow="sm" borderRadius="md" p={6}>
          <Badge colorScheme="red" mb={2}>Important</Badge>
          <Heading size="md" mb={2}>Scholarship Deadline Extended</Heading>
          <Text fontSize="sm" color="gray.500" mb={4}>Posted by Admin • Oct 14, 2023</Text>
          <Text color="gray.700">The deadline for the upcoming semester's grant applications has been extended to November 1st. Please ensure all forms are filled out properly.</Text>
        </Box>

        <Box bg="white" shadow="sm" borderRadius="md" p={6}>
          <Badge colorScheme="green" mb={2}>General</Badge>
          <Heading size="md" mb={2}>New Grant Categories Available</Heading>
          <Text fontSize="sm" color="gray.500" mb={4}>Posted by Admin • Oct 10, 2023</Text>
          <Text color="gray.700">We have added two new grant categories for IT students. Check the application portal for more details.</Text>
        </Box>
      </VStack>
    </DashboardLayout>
  );
}