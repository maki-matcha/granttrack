import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, HStack, Badge, Input, InputGroup, InputLeftElement, 
  Select, Button, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon
} from '@chakra-ui/react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaDownload, FaChevronRight } from 'react-icons/fa';
import SuperadminLayout from '../../components/SuperadminLayout';

const mockOrganizations = [
  { id: 1, orgName: 'Tech for Tomorrow Foundation', repName: 'Mikha Lim', email: 'mikha.lim@techfoundation.org', status: 'Active', dateJoined: '2026-02-15' },
  { id: 2, orgName: 'EduCare Initiatives', repName: 'John Doe', email: 'john@educare.org', status: 'Pending', dateJoined: '2026-02-10' },
  { id: 3, orgName: 'Future Leaders Network', repName: 'Jane Smith', email: 'jane@fln.org', status: 'Suspended', dateJoined: '2026-01-20' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Active': return 'green';
    case 'Pending': return 'orange';
    case 'Suspended': return 'red';
    default: return 'gray';
  }
};

export default function Supadorg() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
            <BreadcrumbItem>
              <BreadcrumbLink href="/superadmin/dashboard" color={mutedText} fontSize="sm">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">Organizations</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading size="lg" color={textColor}>Organizations</Heading>
        </Box>

        <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }} gap={4}>
          <HStack w={{ base: 'full', md: 'auto' }} spacing={4}>
            <InputGroup w={{ base: 'full', md: '300px' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color={mutedText} /></InputLeftElement>
              <Input placeholder="Search organizations..." bg={searchBg} borderColor={borderColor} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
            <Select w={{ base: 'full', md: '150px' }} bg={searchBg} borderColor={borderColor} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </Select>
          </HStack>
          <Button leftIcon={<FaDownload />} colorScheme="purple" variant="outline" w={{ base: 'full', md: 'auto' }}>Export Data</Button>
        </Flex>

        <Box bg={cardBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} overflow="hidden">
          <TableContainer>
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th color={mutedText} fontSize="xs" py={4}>Organization Name</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Rep Name</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Email</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Status</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Date Joined</Th>
                  <Th color={mutedText} fontSize="xs" py={4} textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockOrganizations.map((org) => (
                  <Tr key={org.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                    <Td fontWeight="bold" color={textColor}>{org.orgName}</Td>
                    <Td color={textColor}>{org.repName}</Td>
                    <Td color={mutedText}>{org.email}</Td>
                    <Td><Badge colorScheme={getStatusBadge(org.status)} px={2} py={1} borderRadius="full">{org.status}</Badge></Td>
                    <Td color={mutedText}>{org.dateJoined}</Td>
                    <Td textAlign="center">
                      <HStack spacing={2} justify="center">
                        <IconButton aria-label="View" icon={<FaEye />} size="sm" variant="ghost" colorScheme="blue" />
                        <IconButton aria-label="Edit" icon={<FaEdit />} size="sm" variant="ghost" colorScheme="green" />
                        <IconButton aria-label="Delete" icon={<FaTrash />} size="sm" variant="ghost" colorScheme="red" />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justify="space-between" align="center" p={4} borderTop="1px solid" borderColor={borderColor} bg={cardBg}>
            <Text fontSize="sm" color={mutedText}>Showing 1 to 3 of 120 entries</Text>
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