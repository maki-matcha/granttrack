import React from 'react';
import { Box, Heading, VStack, Text, Badge, useColorModeValue } from '@chakra-ui/react';
import DashboardLayout from '../../components/DashboardLayout';

export default function StudentAnnouncement() {
  const smoothTransition = "all 0.3s ease-in-out";
  
  // --- DARK MODE COLORS ---
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.800');
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');
  const cardShadow = useColorModeValue('sm', 'none');
  const cardBorder = useColorModeValue('none', '1px solid #2D3748');

  return (
    <DashboardLayout role="student" userName="Taylor Swift" userDetail="00000000000">
      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>
        School Announcements
      </Heading>
      
      <VStack align="stretch" spacing={4} maxW="4xl">
        <Box bg={cardBg} shadow={cardShadow} border={cardBorder} borderRadius="md" p={6} transition={smoothTransition}>
          <Badge colorScheme="red" mb={2}>Important</Badge>
          <Heading size="md" mb={2} color={headingColor} transition={smoothTransition}>Scholarship Deadline Extended</Heading>
          <Text fontSize="sm" color={subtitleColor} mb={4} transition={smoothTransition}>Posted by Admin • Oct 14, 2026</Text>
          <Text color={textColor} transition={smoothTransition}>The deadline for the upcoming semester's grant applications has been extended to November 1st. Please ensure all forms are filled out properly.</Text>
        </Box>

        <Box bg={cardBg} shadow={cardShadow} border={cardBorder} borderRadius="md" p={6} transition={smoothTransition}>
          <Badge colorScheme="green" mb={2}>General</Badge>
          <Heading size="md" mb={2} color={headingColor} transition={smoothTransition}>New Grant Categories Available</Heading>
          <Text fontSize="sm" color={subtitleColor} mb={4} transition={smoothTransition}>Posted by Admin • Oct 10, 2026</Text>
          <Text color={textColor} transition={smoothTransition}>We are excited to announce three new grant categories available for the College of Engineering. Check the application portal for more details.</Text>
        </Box>
      </VStack>
    </DashboardLayout>
  );
}