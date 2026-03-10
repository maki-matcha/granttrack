import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, SimpleGrid, HStack, Select, Button, 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge, IconButton,
  useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon
} from '@chakra-ui/react';
import { FaDownload, FaChevronRight, FaUsers, FaAward, FaMoneyBillWave, FaChartLine, FaArrowUp } from 'react-icons/fa';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import SuperadminLayout from '../../components/SuperadminLayout';

const statsData = [
  { title: 'Total Platform Users', value: '2,520', trend: 5, icon: FaUsers, color: 'blue' },
  { title: 'Active Scholarships', value: '350', trend: 12, icon: FaAward, color: 'green' },
  { title: 'Total Funds Disbursed', value: '₱4.2M', trend: 8, icon: FaMoneyBillWave, color: 'purple' },
  { title: 'Application Success Rate', value: '45%', trend: 2, icon: FaChartLine, color: 'orange' },
];

const demographicsData = [
  { name: 'Students', value: 2400, color: '#3182CE' },
  { name: 'Organizations', value: 120, color: '#805AD5' },
  { name: 'Admins', value: 10, color: '#38A169' },
];

const platformGrowthData = [
  { month: 'Jan', users: 1200, applications: 400 },
  { month: 'Feb', users: 1500, applications: 600 },
  { month: 'Mar', users: 1800, applications: 850 },
  { month: 'Apr', users: 2100, applications: 1100 },
  { month: 'May', users: 2350, applications: 1300 },
  { month: 'Jun', users: 2520, applications: 1450 },
];

const reportsData = [
  { id: 1, name: 'Monthly User Growth', date: 'Mar 01, 2026', type: 'Analytics', status: 'Ready' },
  { id: 2, name: 'Q1 Scholarship Distribution', date: 'Feb 28, 2026', type: 'Financial', status: 'Ready' },
  { id: 3, name: 'Platform Engagement Metrics', date: 'Feb 15, 2026', type: 'Engagement', status: 'Ready' },
];

export default function Supadreportsanal() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const tableHeaderBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  const inputBg = useColorModeValue('white', 'gray.900');
  
  // FIX: Moved to top level
  const rowHoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  return (
    <SuperadminLayout userName="System Admin" userDetail="Superadmin">
      <Box maxW="7xl" mx="auto">
        <Box mb={6}>
          <Breadcrumb spacing="8px" separator={<Icon as={FaChevronRight} color={mutedText} fontSize="xs" />} mb={2}>
            <BreadcrumbItem><BreadcrumbLink href="/superadmin/dashboard" color={mutedText} fontSize="sm">Dashboard</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbItem isCurrentPage><BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">Reports & Analytics</BreadcrumbLink></BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
            <Heading size="lg" color={textColor}>Reports & Analytics</Heading>
            <HStack spacing={4} w={{ base: 'full', md: 'auto' }}>
              <Select w="180px" bg={inputBg} borderColor={borderColor} value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </Select>
              <Button leftIcon={<FaDownload />} colorScheme="purple" px={6} w={{ base: 'full', md: 'auto' }}>Export Report</Button>
            </HStack>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          {statsData.map((stat, index) => (
            <Box key={index} bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Box p={3} bg={`${stat.color}.50`} color={`${stat.color}.500`} borderRadius="lg"><Icon as={stat.icon} boxSize={6} /></Box>
                <HStack spacing={1} color="green.500" bg="green.50" px={2} py={1} borderRadius="md" fontSize="xs" fontWeight="bold">
                  <Icon as={FaArrowUp} /><Text>{stat.trend}%</Text>
                </HStack>
              </Flex>
              <Text fontSize="sm" color={mutedText} fontWeight="bold" mb={1}>{stat.title}</Text>
              <Heading size="lg" color={textColor}>{stat.value}</Heading>
            </Box>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
          <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
            <Heading size="md" color={textColor} mb={6}>User Demographics</Heading>
            <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={demographicsData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {demographicsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box bg={cardBg} p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor}>
            <Heading size="md" color={textColor} mb={6}>Platform Growth</Heading>
            <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={platformGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={borderColor} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: mutedText, fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: mutedText, fontSize: 12 }} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Line type="monotone" dataKey="users" name="Total Users" stroke="#805AD5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="applications" name="Applications" stroke="#3182CE" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </SimpleGrid>

        <Box bg={cardBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} overflow="hidden">
          <Box p={6} borderBottom="1px solid" borderColor={borderColor}><Heading size="md" color={textColor}>Detailed Reports</Heading></Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th color={mutedText} fontSize="xs" py={4}>Report Name</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Date Generated</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Type</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Status</Th>
                  <Th color={mutedText} fontSize="xs" py={4} textAlign="center">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reportsData.map((report) => (
                  <Tr key={report.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                    <Td fontWeight="bold" color={textColor}>{report.name}</Td>
                    <Td color={mutedText}>{report.date}</Td>
                    <Td color={mutedText}>{report.type}</Td>
                    <Td><Badge colorScheme="green" px={2} py={1} borderRadius="full">{report.status}</Badge></Td>
                    <Td textAlign="center"><IconButton aria-label="Download" icon={<FaDownload />} size="sm" variant="ghost" colorScheme="purple" /></Td>
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