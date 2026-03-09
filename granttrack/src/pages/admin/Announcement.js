import React from 'react';
import { 
  Box, Heading, VStack, Text, Input, Textarea, Button, Flex, useColorModeValue 
} from '@chakra-ui/react';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminAnnouncement() {
  // --- DARK MODE HOOKS & COLORS ---
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('gray.50', 'gray.900');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const cardBorder = useColorModeValue('transparent', 'gray.700');
  const cardShadow = useColorModeValue('sm', 'none');

  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>
        Announcements
      </Heading>
      
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        
        {/* --- Create Announcement Form --- */}
        <Box flex={1} bg={cardBg} shadow={cardShadow} borderRadius="md" p={6} border="1px solid" borderColor={cardBorder} transition={smoothTransition}>
          <Heading size="md" mb={4} color={headingColor} transition={smoothTransition}>
            Post New Announcement
          </Heading>
          <VStack spacing={4}>
            <Input 
              placeholder="Announcement Title" 
              bg={inputBg} 
              color={headingColor} 
              borderColor={inputBorder} 
              _placeholder={{ color: mutedText }}
              transition={smoothTransition} 
            />
            <Textarea 
              placeholder="Type your message here..." 
              rows={5} 
              bg={inputBg} 
              color={headingColor} 
              borderColor={inputBorder} 
              _placeholder={{ color: mutedText }}
              transition={smoothTransition} 
            />
            <Button colorScheme="blue" w="full">Publish</Button>
          </VStack>
        </Box>

        {/* --- Recent Announcements List --- */}
        <Box flex={1}>
          <Heading size="md" mb={4} color={headingColor} transition={smoothTransition}>
            Recent Posts
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Box 
              bg={cardBg} 
              p={5} 
              shadow={cardShadow} 
              borderRadius="md" 
              borderTop="1px solid" 
              borderRight="1px solid" 
              borderBottom="1px solid" 
              borderColor={cardBorder}
              borderLeft="4px solid" 
              borderLeftColor="blue.500" 
              transition={smoothTransition}
            >
              <Text fontWeight="bold" fontSize="lg" color={headingColor} transition={smoothTransition}>
                Scholarship Deadline Extended
              </Text>
              <Text fontSize="xs" color={mutedText} mb={2} transition={smoothTransition}>
                Posted on Oct 14, 2023
              </Text>
              <Text fontSize="sm" color={textColor} transition={smoothTransition}>
                The deadline for the upcoming semester's grant applications has been extended to November 1st.
              </Text>
            </Box>
          </VStack>
        </Box>
        
      </Flex>
    </DashboardLayout>
  );
}