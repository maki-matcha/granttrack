import React from 'react';
import { 
  Box, Heading, Flex, Text, VStack, Input, Textarea, Button, 
  useColorModeValue, useColorMode 
} from '@chakra-ui/react';
import OrganizationLayout from '../../components/OrganizationLayout'; 

export default function OrgAnnouncement() {
  const announcementStatusCards = [
    { label: 'LATEST', count: '0' },
    { label: 'ARCHIVE', count: '0' },
    { label: 'URGENT', count: '0' },
  ];

  // --- DARK MODE HOOKS & COLORS ---
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('#1D546D', 'whiteAlpha.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.100', 'gray.700');
  
  // Input Colors
  const inputBg = useColorModeValue('white', 'gray.700'); // Made white for light mode to pop against background
  const inputBorder = useColorModeValue('gray.200', 'transparent');
  const inputTextColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const textColor = useColorModeValue('gray.500', 'gray.400');
  
  // Button Colors
  const btnBg = useColorModeValue('#1D546D', 'blue.500');
  const btnHover = useColorModeValue('#123b4e', 'blue.600');

  // Bottom Accent Colors for Cards
  const latestColor = useColorModeValue('blue.500', 'blue.300'); 
  const archiveColor = useColorModeValue('green.500', 'green.300');
  const urgentColor = useColorModeValue('red.500', 'red.300');

  const getCardColor = (idx) => {
    if (idx === 0) return latestColor;
    if (idx === 1) return archiveColor;
    return urgentColor;
  };

  return (
    <OrganizationLayout>
      <Box flex={1} bg="transparent" p={6} minH="80vh" transition={smoothTransition}>
        <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>Announcements</Heading>
        
        {/* --- CARDS SECTION --- */}
        <Flex gap={6} mb={8} direction={{ base: 'column', md: 'row' }}>
          {announcementStatusCards.map((card, idx) => {
            const cardColor = getCardColor(idx);

            return (
              <Box 
                key={idx} 
                flex={1} 
                bg={cardBg} 
                p={6} 
                borderRadius="2xl" 
                shadow="md" 
                border="1px solid" 
                borderColor={cardBorderColor}
                borderBottomWidth="6px" 
                borderBottomColor={cardColor} 
                transition={smoothTransition}
              >
                <Flex align="center" justify="space-between" mb={1}>
                  <Text fontSize="xs" color="gray.400" fontWeight="bold" transition={smoothTransition}>{card.label}</Text>
                  <Text fontSize="4xl" fontWeight="900" color={cardColor} transition={smoothTransition}>{card.count}</Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>

        {/* --- MAIN CONTENT AREA --- */}
        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          
          {/* Post New Announcement Form */}
          <VStack align="stretch" spacing={4} flex={1}>
            <Heading size="md" color={headingColor} mb={2} transition={smoothTransition}>Post New Announcement</Heading>
            
            <Input 
              placeholder="Announcement Title" 
              bg={inputBg} 
              color={inputTextColor}
              border="1px solid" 
              borderColor={inputBorder}
              size="md" 
              borderRadius="md" 
              _placeholder={{ color: textColor, fontStyle: 'italic' }}
              transition={smoothTransition}
            />
            <Textarea 
              placeholder="Add an announcement text here..." 
              bg={inputBg} 
              color={inputTextColor}
              border="1px solid" 
              borderColor={inputBorder}
              minH="200px" 
              resize="none" 
              borderRadius="md" 
              _placeholder={{ color: textColor, fontStyle: 'italic' }}
              transition={smoothTransition}
            />
            
            <Flex justify="flex-end" mt={2}>
              <Button size="md" bg={btnBg} color="white" _hover={{ bg: btnHover }} px={8} borderRadius="full" shadow="md" transition={smoothTransition}>
                Publish
              </Button>
            </Flex>
          </VStack>
          
          {/* Recent Announcement Preview Box */}
          <VStack align="stretch" spacing={4} flex={1}>
            <Heading size="md" color={headingColor} mb={2} transition={smoothTransition}>Recent Announcement</Heading>
            <Box 
              flex={1} 
              minH="250px" 
              bg={cardBg} 
              border="1px solid" 
              borderColor={cardBorderColor} 
              borderRadius="2xl" 
              p={6} 
              shadow="sm"
              transition={smoothTransition}
            >
              <Text color={textColor} fontSize="sm" fontStyle="italic" transition={smoothTransition}>
                Published announcements will appear here.
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </OrganizationLayout>
  );
}