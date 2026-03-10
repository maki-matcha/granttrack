import React from 'react';
import {
  Box, Flex, Text, Heading, SimpleGrid, VStack, HStack, Icon, Badge,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, useColorModeValue
} from '@chakra-ui/react';
import { FaUserGraduate, FaBuilding, FaClipboardList, FaAward, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import SuperadminLayout from '../../components/SuperadminLayout';

// --- MOCK DATA ---
const statsData = [
  { title: 'Total Students', value: '2,400', trend: 5, icon: FaUserGraduate, color: 'blue' },
  { title: 'Total Organizations', value: '120', trend: -2, icon: FaBuilding, color: 'purple' },
  { title: 'Pending Organizations', value: '5', trend: null, icon: FaClipboardList, color: 'orange' },
  { title: 'Total Scholarships', value: '350', trend: 12, icon: FaAward, color: 'green' },
];

const studentsOverviewData = [
  { name: 'Active', count: 1800, fill: '#3182CE' },
  { name: 'Graduated', count: 500, fill: '#38A169' },
  { name: 'Dropouts', count: 100, fill: '#E53E3E' },
];

const scholarshipStatusData = [
  { name: 'Active', value: 60, color: '#3182CE' },
  { name: 'Closed', value: 40, color: '#A0AEC0' },
];

const recentActivityData = [
  { id: 1, name: 'John Doe', role: 'Student', action: 'Applied for Scholarship', time: '2 mins ago', status: 'Pending' },
  { id: 2, name: 'Jane Smith', role: 'Organization', action: 'Approved', time: '10 mins ago', status: 'Approved' },
  { id: 3, name: 'Mark Johnson', role: 'Admin', action: 'Updated Settings', time: '1 hr ago', status: 'Completed' },
  { id: 4, name: 'Emily Davis', role: 'Student', action: 'Account Created', time: '2 hrs ago', status: 'Completed' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Pending': return 'orange';
    case 'Approved': return 'green';
    case 'Completed': return 'blue';
    default: return 'gray';
  }
};

export default function Supadmin() {
  // Theme Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const tableHeaderBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  
  // FIX: Moved useColorModeValue hook outside of the map function
  const rowHoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  const adminName = "System Admin";

  return (
    <SuperadminLayout userName={adminName} userDetail="Superadmin">
      <Box maxW="7xl" mx="auto">
        <Box mb={8}>
          <Heading size="lg" color={textColor} mb={2}>Dashboard</Heading>
          <Text color={mutedText} fontSize="md">Welcome Back, {adminName}! Here is what's happening today.</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          {statsData.map((stat, index) => (
            <Box key={index} bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} transition="all 0.3s" _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}>
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Box p={3} bg={`${stat.color}.50`} color={`${stat.color}.500`} borderRadius="lg">
                  <Icon as={stat.icon} boxSize={6} />
                </Box>
                {stat.trend !== null && (
                  <HStack spacing={1} color={stat.trend > 0 ? 'green.500' : 'red.500'} bg={stat.trend > 0 ? 'green.50' : 'red.50'} px={2} py={1} borderRadius="md" fontSize="xs" fontWeight="bold">
                    <Icon as={stat.trend > 0 ? FaArrowUp : FaArrowDown} />
                    <Text>{Math.abs(stat.trend)}%</Text>
                  </HStack>
                )}
              </Flex>
              <Text fontSize="sm" color={mutedText} fontWeight="bold" mb={1}>{stat.title}</Text>
              <Heading size="lg" color={textColor}>{stat.value}</Heading>
            </Box>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
          <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
            <Heading size="md" color={textColor} mb={6}>Students Overview</Heading>
            <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentsOverviewData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={borderColor} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: mutedText, fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: mutedText, fontSize: 12 }} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {studentsOverviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
            <Heading size="md" color={textColor} mb={6}>Active vs Closed Scholarships</Heading>
            <Box h="300px" w="100%" display="flex" alignItems="center" justifyContent="center" position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={scholarshipStatusData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                    {scholarshipStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              <VStack position="absolute" top="42%" left="50%" transform="translate(-50%, -50%)" spacing={0}>
                <Heading size="lg" color={textColor}>100%</Heading>
                <Text fontSize="sm" color={mutedText}>Total</Text>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>

        <Box bg={cardBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} overflow="hidden">
          <Box p={6} borderBottom="1px solid" borderColor={borderColor}>
            <Heading size="md" color={textColor}>Recent Activity</Heading>
          </Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th color={mutedText} fontSize="xs" py={4}>Name</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Role</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Action</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Time</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentActivityData.map((row) => (
                  <Tr key={row.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                    <Td fontWeight="bold" color={textColor}>{row.name}</Td>
                    <Td color={mutedText}>{row.role}</Td>
                    <Td color={textColor}>{row.action}</Td>
                    <Td color={mutedText}>{row.time}</Td>
                    <Td>
                      <Badge colorScheme={getStatusBadge(row.status)} px={2} py={1} borderRadius="full" textTransform="capitalize">
                        {row.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </SuperadminLayout>
  );
}