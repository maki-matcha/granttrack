import React from 'react';
import { Box, Heading, Flex, Text, VStack, Badge } from '@chakra-ui/react';
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

  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading size="lg" mb={6} color="gray.700">Admin Dashboard</Heading>
      
      {/* Top Cards Row */}
      <Flex gap={6} mb={8} direction={{ base: 'column', md: 'row' }}>
        <Box flex={1} bg="white" shadow="sm" borderRadius="md" p={5} borderTop="4px solid" borderColor="blue.400">
          <Text fontSize="sm" color="gray.500">Total Applications</Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.700">1,204</Text>
        </Box>
        <Box flex={1} bg="white" shadow="sm" borderRadius="md" p={5} borderTop="4px solid" borderColor="purple.400">
          <Text fontSize="sm" color="gray.500">Pending Review</Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.700">342</Text>
        </Box>
        
        {/* Graph Matching Your Image */}
        <Box flex={1.5} bg="white" shadow="sm" borderRadius="md" p={5}>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Students with and without scholarship</Text>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">50,000</Text>
          
          <Flex h="12px" w="100%" borderRadius="full" overflow="hidden" mt={3} mb={4}>
            <Box w="50%" bg="#e2e8f0" /> {/* Non-scholars */}
            <Box w="15%" bg="#b794f4" /> {/* Pending */}
            <Box w="35%" bg="#3182ce" /> {/* Scholars */}
          </Flex>

          <VStack align="stretch" spacing={2} fontSize="xs" color="gray.600" fontWeight="500">
            <Flex justify="space-between">
              <Flex align="center"><Box w={2} h={2} borderRadius="full" bg="#e2e8f0" mr={2}/> non-scholars</Flex>
              <Text>50%</Text>
            </Flex>
            <Flex justify="space-between">
              <Flex align="center"><Box w={2} h={2} borderRadius="full" bg="#b794f4" mr={2}/> Pending scholars</Flex>
              <Text>15%</Text>
            </Flex>
            <Flex justify="space-between">
              <Flex align="center"><Box w={2} h={2} borderRadius="full" bg="#3182ce" mr={2}/> Scholars</Flex>
              <Text>35%</Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>

      {/* Main Content Area (Recent Activity) */}
      <Box bg="#f8f9fa" shadow="sm" borderRadius="md" p={6} border="1px solid" borderColor="gray.100" minH="300px">
        <Text fontWeight="bold" fontSize="lg" mb={4} color="gray.700">Recent Applications</Text>
        
        <Flex gap={4} mb={6}>
          <Box px={4} py={1} bg="white" borderRadius="full" shadow="sm" fontSize="sm" fontWeight="bold" color="gray.600" cursor="pointer">All</Box>
          <Box px={4} py={1} bg="white" borderRadius="full" shadow="sm" fontSize="sm" color="gray.500" cursor="pointer">Pending</Box>
          <Box px={4} py={1} bg="white" borderRadius="full" shadow="sm" fontSize="sm" color="gray.500" cursor="pointer">Approved</Box>
        </Flex>
        
        <VStack align="stretch" spacing={3}>
          {recentApplications.map((app, i) => (
             <Flex key={i} p={4} bg="white" borderRadius="md" justify="space-between" align="center" shadow="sm" borderLeft="4px solid" borderColor={`${getStatusColor(app.status)}.400`}>
                <Box>
                  <Text fontWeight="bold" color="gray.700">{app.name}</Text>
                  <Text fontSize="xs" color="gray.500">{app.program} • {app.scholarship}</Text>
                </Box>
                <Flex align="center" gap={4}>
                  <Badge colorScheme={getStatusColor(app.status)} px={2} py={1} borderRadius="md">
                    {app.status}
                  </Badge>
                  <Text color="blue.500" fontSize="sm" cursor="pointer" fontWeight="bold">Review</Text>
                </Flex>
             </Flex>
          ))}
        </VStack>
      </Box>
    </DashboardLayout>
  );
}