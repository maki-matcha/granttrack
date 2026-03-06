import React from 'react';
import { 
  Box, Heading, Flex, Text, HStack, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Button, 
  useColorModeValue, useColorMode 
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import OrganizationLayout from '../../components/OrganizationLayout'; 

export default function OrganizationDashboard() {
  const programStatusCards = [
    { label: 'PROGRAMS SUBMITTED', percentage: '0%' },
    { label: 'PENDING APPROVAL', percentage: '0%' },
    { label: 'APPROVED PROGRAMS', percentage: '0%' },
  ];

  // --- DARK MODE HOOKS & COLORS ---
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('#1D546D', 'whiteAlpha.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  
  // Adjusted faint border for top, left, right to match the clean look
  const cardBorderColor = useColorModeValue('gray.100', 'gray.700'); 
  
  // Search Bar Colors
  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const inputTextColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  
  // Category Dropdown Colors (Matches the hollow outline from your image)
  const categoryBorder = useColorModeValue('#1D546D', 'blue.300');
  const categoryColor = useColorModeValue('#1D546D', 'blue.300');

  const tableHeadBg = useColorModeValue('transparent', 'gray.900');
  const textColor = useColorModeValue('gray.400', 'gray.400');
  const btnBg = useColorModeValue('#1D546D', 'blue.500');
  const btnHover = useColorModeValue('#123b4e', 'blue.600');
  const skeletonBg = useColorModeValue('gray.200', 'gray.700');
  
  const rowHoverBg = useColorModeValue('gray.50', 'whiteAlpha.100');

  // Exact Bottom Accent Colors from your image
  const submittedColor = useColorModeValue('#1D546D', '#63b3ed'); 
  const pendingColor = useColorModeValue('#D9A700', 'yellow.300'); // Slightly darker mustard yellow
  const approvedColor = useColorModeValue('green.600', 'green.300');

  const getCardColor = (idx) => {
    if (idx === 0) return submittedColor;
    if (idx === 1) return pendingColor;
    return approvedColor;
  };

  // Helper for dropdown options styling in dark mode
  const optionStyle = {
    color: isDark ? 'white' : 'black',
    background: isDark ? '#2D3748' : 'white'
  };

  return (
    <OrganizationLayout>
      <Box flex={1} bg="transparent" p={6} minH="80vh" transition={smoothTransition}>
        <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>Program Status</Heading>
        
        {/* --- CARDS SECTION --- */}
        <Flex gap={6} mb={8} direction={{ base: 'column', md: 'row' }}>
          {programStatusCards.map((card, idx) => {
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
                  <Text fontSize="xs" fontWeight="bold" color="gray.400" transition={smoothTransition}>{card.label}</Text>
                  <Text fontSize="4xl" fontWeight="900" color={cardColor} transition={smoothTransition}>{card.percentage}</Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>

        {/* --- SEARCH & CATEGORY FILTERS --- */}
        <HStack gap={4} mb={8} direction={{ base: 'column', md: 'row' }}>
          <Box flex={1} w="full">
            <Input 
              placeholder="Search..." 
              bg={inputBg} 
              color={inputTextColor} 
              border="none" 
              borderRadius="full" 
              px={6} 
              _placeholder={{ color: textColor, fontStyle: 'italic' }} 
              transition={smoothTransition} 
            />
          </Box>
          <Select 
            placeholder="Category" 
            maxW={{ base: 'full', md: '200px' }} 
            bg="transparent" 
            color={categoryColor} 
            border="1px solid" 
            borderColor={categoryBorder}
            borderRadius="full" 
            fontWeight="bold"
            transition={smoothTransition}
          >
            <option value="scholarship" style={optionStyle}>Scholarship</option>
            <option value="grant" style={optionStyle}>Grant</option>
            <option value="assistance" style={optionStyle}>Financial Assistance</option>
          </Select>
        </HStack>

        {/* --- SUBMISSIONS HEADER --- */}
        <HStack gap={4} mb={6} justify="space-between" align="center">
          <Heading size="md" color={headingColor} transition={smoothTransition}>My Submissions</Heading>
          <Button leftIcon={<FaPlus />} bg={btnBg} color="white" _hover={{ bg: btnHover }} borderRadius="full" px={6} shadow="md" transition={smoothTransition}>
            New
          </Button>
        </HStack>

        {/* --- TABLE AREA --- */}
        <Box overflowX="auto" bg={cardBg} borderRadius="2xl" p={4} shadow="sm" border="1px solid" borderColor={cardBorderColor} transition={smoothTransition}>
          <Table size="md" variant="simple">
            <Thead bg={tableHeadBg} transition={smoothTransition}>
              <Tr>
                <Th color={headingColor} fontSize="xs" fontWeight="900" borderBottom="none">PROGRAM NAME</Th>
                <Th color={headingColor} fontSize="xs" fontWeight="900" borderBottom="none">SUBMISSION DATE</Th>
                <Th color={headingColor} fontSize="xs" fontWeight="900" borderBottom="none">STATUS</Th>
                <Th color={headingColor} fontSize="xs" fontWeight="900" borderBottom="none">ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[...Array(6)].map((_, i) => (
                <Tr key={i} _hover={{ bg: rowHoverBg }} transition={smoothTransition}>
                  <Td borderBottom="none"><Box h="24px" w="full" bg={skeletonBg} borderRadius="full" transition={smoothTransition} /></Td>
                  <Td borderBottom="none"><Box h="24px" w="full" bg={skeletonBg} borderRadius="full" transition={smoothTransition} /></Td>
                  <Td borderBottom="none"><Box h="24px" w="full" bg={skeletonBg} borderRadius="full" transition={smoothTransition} /></Td>
                  <Td borderBottom="none"><Box h="24px" w="full" bg={skeletonBg} borderRadius="full" transition={smoothTransition} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

      </Box>
    </OrganizationLayout>
  );
}