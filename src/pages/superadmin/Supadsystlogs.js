import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, HStack, Badge, Input, InputGroup, InputLeftElement, 
  Select, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon
} from '@chakra-ui/react';
import { FaSearch, FaDownload, FaChevronRight } from 'react-icons/fa';
import SuperadminLayout from '../../components/SuperadminLayout';

const mockLogs = [
  { id: 1, timestamp: 'Mar 15, 2026 08:45 AM', userSystem: 'System', action: 'Scheduled Backup Completed', module: 'Database', severity: 'Info' },
  { id: 2, timestamp: 'Mar 15, 2026 09:12 AM', userSystem: 'Mikha Lim (Org)', action: 'Failed Login Attempt', module: 'Authentication', severity: 'Warning' },
  { id: 3, timestamp: 'Mar 15, 2026 10:30 AM', userSystem: 'Jane Doe (Admin)', action: 'Deleted User Record', module: 'User Management', severity: 'Error' },
  { id: 4, timestamp: 'Mar 15, 2026 11:05 AM', userSystem: 'System Admin', action: 'Changed System Settings', module: 'Configuration', severity: 'Info' },
];

const getSeverityBadge = (severity) => {
  switch (severity) {
    case 'Info': return 'blue';
    case 'Warning': return 'orange';
    case 'Error': return 'red';
    default: return 'gray';
  }
};

export default function Supadsystlogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 7 Days');

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const tableHeaderBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  const searchBg = useColorModeValue('white', 'gray.900');
  
  // FIX: Moved to top level
  const rowHoverBg = useColorModeValue('gray.50', 'whiteAlpha.50');

  return (
    <SuperadminLayout userName="System Admin" userDetail="Superadmin">
      <Box maxW="7xl" mx="auto">
        <Box mb={6}>
          <Breadcrumb spacing="8px" separator={<Icon as={FaChevronRight} color={mutedText} fontSize="xs" />} mb={2}>
            <BreadcrumbItem><BreadcrumbLink href="/superadmin/dashboard" color={mutedText} fontSize="sm">Dashboard</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbItem isCurrentPage><BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">System Logs</BreadcrumbLink></BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="space-between" align="center" direction={{ base: 'column', sm: 'row' }} gap={4}>
            <Heading size="lg" color={textColor}>System Logs</Heading>
            <Button leftIcon={<FaDownload />} colorScheme="purple" variant="solid" w={{ base: 'full', sm: 'auto' }}>Export Logs</Button>
          </Flex>
        </Box>

        <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }} gap={4}>
          <HStack w={{ base: 'full', md: 'auto' }} spacing={4} flexWrap="wrap">
            <InputGroup w={{ base: 'full', md: '300px' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color={mutedText} /></InputLeftElement>
              <Input placeholder="Search logs..." bg={searchBg} borderColor={borderColor} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
            <Select w={{ base: 'full', md: '160px' }} bg={searchBg} borderColor={borderColor} value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
              <option value="">All Severities</option>
              <option value="Info">Info</option>
              <option value="Warning">Warning</option>
              <option value="Error">Error</option>
            </Select>
            <Select w={{ base: 'full', md: '160px' }} bg={searchBg} borderColor={borderColor} value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </Select>
          </HStack>
        </Flex>

        <Box bg={cardBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} overflow="hidden">
          <TableContainer>
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th color={mutedText} fontSize="xs" py={4}>Timestamp</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>User / System</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Action</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Module</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Severity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockLogs.map((log) => (
                  <Tr key={log.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                    <Td color={mutedText} fontSize="sm">{log.timestamp}</Td>
                    <Td fontWeight="bold" color={textColor}>{log.userSystem}</Td>
                    <Td color={textColor}>{log.action}</Td>
                    <Td color={mutedText}>{log.module}</Td>
                    <Td><Badge colorScheme={getSeverityBadge(log.severity)} px={2} py={1} borderRadius="full">{log.severity}</Badge></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justify="space-between" align="center" p={4} borderTop="1px solid" borderColor={borderColor} bg={cardBg} direction={{ base: "column", sm: "row" }} gap={4}>
            <Text fontSize="sm" color={mutedText}>Showing 1 to 4 of 1,250 entries</Text>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" isDisabled>Previous</Button>
              <Button size="sm" colorScheme="purple">1</Button>
              <Button size="sm" variant="outline">2</Button>
              <Button size="sm" variant="outline">3</Button>
              <Button size="sm" variant="outline">Next</Button>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </SuperadminLayout>
  );
}