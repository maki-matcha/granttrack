import React from 'react';
import { Box, Heading, Flex, Text, VStack, Badge, useColorModeValue } from '@chakra-ui/react';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminDashboard() {
  // Mock Data for Recent Applications
  const recentApplications = [
    { name: 'Taylor Swift', program: 'BS Computer Science', scholarship: 'PYDO Scholarship', status: 'Pending Review' },
    { name: 'Ed Sheeran', program: 'BS Information Technology', scholarship: 'CHED Scholarship', status: 'Approved' },
    { name: 'Ariana Grande', program: 'BS Nursing', scholarship: 'TES Scholarship', status: 'Rejected' },
    { name: 'Bruno Mars', program: 'BS Engineering', scholarship: 'Aspire Scholarship', status: 'Pending Review' },
  ];

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'green';
    if (status === 'Pending Review') return 'purple';
    if (status === 'Rejected') return 'red';
    return 'gray';
  };

  // --- DARK MODE COLORS ---
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.800');
  const sectionBg = useColorModeValue('#f8f9fa', 'gray.900');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  
  // Custom Graph Colors mapped for Light and Dark modes
  const nonScholarsColor = useColorModeValue('#e2e8f0', '#4A5568'); // gray.200 -> gray.600
  const pendingColor = useColorModeValue('#b794f4', '#9F7AEA'); // purple.400 -> purple.500
  const scholarsColor = useColorModeValue('#3182ce', '#63B3ED'); // blue.500 -> blue.300
  
  // Custom Filter Pill Colors
  const activePillBg = useColorModeValue('white', 'gray.700');
  const activePillText = useColorModeValue('gray.600', 'whiteAlpha.900');
  const inactivePillBg = useColorModeValue('white', 'gray.800');
  const inactivePillText = useColorModeValue('gray.500', 'gray.400');

  // --- FIX: Extract the Review text color hook outside the map callback ---
  const reviewTextColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>Admin Dashboard</Heading>
      
      {/* Top Cards Row */}
      <Flex gap={6} mb={8} direction={{ base: 'column', md: 'row' }}>
        <Box flex={1} bg={cardBg} shadow="sm" borderRadius="md" p={5} borderTop="4px solid" borderColor="blue.400" transition={smoothTransition}>
          <Text fontSize="sm" color={subtitleColor} transition={smoothTransition}>Total Applications</Text>
          <Text fontSize="3xl" fontWeight="bold" color={textColor} transition={smoothTransition}>1,204</Text>
        </Box>
        <Box flex={1} bg={cardBg} shadow="sm" borderRadius="md" p={5} borderTop="4px solid" borderColor="purple.400" transition={smoothTransition}>
          <Text fontSize="sm" color={subtitleColor} transition={smoothTransition}>Pending Review</Text>
          <Text fontSize="3xl" fontWeight="bold" color={textColor} transition={smoothTransition}>342</Text>
        </Box>
        
        {/* Graph Matching Your Image */}
        <Box flex={1.5} bg={cardBg} shadow="sm" borderRadius="md" p={5} transition={smoothTransition}>
          <Text fontSize="xs" fontWeight="bold" color={subtitleColor} mb={1} transition={smoothTransition}>Students with and without scholarship</Text>
          <Text fontSize="2xl" fontWeight="bold" color={textColor} transition={smoothTransition}>50,000</Text>
          
          <Flex h="12px" w="100%" borderRadius="full" overflow="hidden" mt={3} mb={4}>
            <Box w="50%" bg={nonScholarsColor} transition={smoothTransition} /> {/* Non-scholars */}
            <Box w="15%" bg={pendingColor} transition={smoothTransition} /> {/* Pending */}
            <Box w="35%" bg={scholarsColor} transition={smoothTransition} /> {/* Scholars */}
          </Flex>

          <VStack align="stretch" spacing={2} fontSize="xs" color={subtitleColor} fontWeight="500">
            <Flex justify="space-between">
              <Flex align="center"><Box w={2} h={2} borderRadius="full" bg={nonScholarsColor} mr={2} transition={smoothTransition}/> non-scholars</Flex>
              <Text transition={smoothTransition}>50%</Text>
            </Flex>
            <Flex justify="space-between">
              <Flex align="center"><Box w={2} h={2} borderRadius="full" bg={pendingColor} mr={2} transition={smoothTransition}/> Pending scholars</Flex>
              <Text transition={smoothTransition}>15%</Text>
            </Flex>
            <Flex justify="space-between">
              <Flex align="center"><Box w={2} h={2} borderRadius="full" bg={scholarsColor} mr={2} transition={smoothTransition}/> Scholars</Flex>
              <Text transition={smoothTransition}>35%</Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>

      {/* Main Content Area (Recent Activity) */}
      <Box bg={sectionBg} shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor={borderColor} minH="300px" transition={smoothTransition}>
        <Text fontWeight="bold" fontSize="lg" mb={4} color={textColor} transition={smoothTransition}>Recent Applications</Text>
        
        <Flex gap={4} mb={6}>
          <Box px={4} py={1} bg={activePillBg} borderRadius="full" shadow="sm" fontSize="sm" fontWeight="bold" color={activePillText} cursor="pointer" transition={smoothTransition}>All</Box>
          <Box px={4} py={1} bg={inactivePillBg} borderRadius="full" shadow="sm" fontSize="sm" color={inactivePillText} cursor="pointer" transition={smoothTransition}>Pending</Box>
          <Box px={4} py={1} bg={inactivePillBg} borderRadius="full" shadow="sm" fontSize="sm" color={inactivePillText} cursor="pointer" transition={smoothTransition}>Approved</Box>
        </Flex>
        
        <VStack align="stretch" spacing={3}>
          {recentApplications.map((app, i) => (
             <Flex key={i} p={4} bg={cardBg} borderRadius="md" justify="space-between" align="center" shadow="sm" borderLeft="4px solid" borderColor={`${getStatusColor(app.status)}.400`} transition={smoothTransition}>
                <Box>
                  <Text fontWeight="bold" color={textColor} transition={smoothTransition}>{app.name}</Text>
                  <Text fontSize="xs" color={subtitleColor} transition={smoothTransition}>{app.program} • {app.scholarship}</Text>
                </Box>
                <Flex align="center" gap={4}>
                  <Badge colorScheme={getStatusColor(app.status)} px={2} py={1} borderRadius="md">
                    {app.status}
                  </Badge>
                  {/* Applied the extracted variable here */}
                  <Text color={reviewTextColor} fontSize="sm" cursor="pointer" fontWeight="bold" transition={smoothTransition}>Review</Text>
                </Flex>
             </Flex>
          ))}
        </VStack>
      </Box>
    </DashboardLayout>
  );
}