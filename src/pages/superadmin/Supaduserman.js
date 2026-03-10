import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, HStack, Badge, Input, InputGroup, InputLeftElement, 
  Select, Button, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon
} from '@chakra-ui/react';
import { FaSearch, FaUserPlus, FaEye, FaEdit, FaTrash, FaChevronRight } from 'react-icons/fa';
import SuperadminLayout from '../../components/SuperadminLayout';

const mockUsers = [
  { id: 1, name: 'Alex Johnson', role: 'Admin', email: 'alex@admin.com', status: 'Active', lastLogin: 'Mar 15, 2026' },
  { id: 2, name: 'Maria Santos', role: 'Student', email: 'maria@student.edu', status: 'Active', lastLogin: 'Mar 14, 2026' },
  { id: 3, name: 'Tech Foundation', role: 'Organization', email: 'contact@tech.org', status: 'Pending', lastLogin: 'Never' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Active': return 'green';
    case 'Pending': return 'orange';
    case 'Inactive': return 'red';
    default: return 'gray';
  }
};

export default function Supaduserman() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
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
            <BreadcrumbItem><BreadcrumbLink href="/superadmin/dashboard" color={mutedText} fontSize="sm">Dashboard</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbItem isCurrentPage><BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">User Management</BreadcrumbLink></BreadcrumbItem>
          </Breadcrumb>
          <Heading size="lg" color={textColor}>User Management</Heading>
        </Box>

        <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }} gap={4}>
          <HStack w={{ base: 'full', md: 'auto' }} spacing={4} flexWrap="wrap">
            <InputGroup w={{ base: 'full', md: '250px' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color={mutedText} /></InputLeftElement>
              <Input placeholder="Search users..." bg={searchBg} borderColor={borderColor} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
            <Select w={{ base: 'full', md: '150px' }} bg={searchBg} borderColor={borderColor} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Organization">Organization</option>
            </Select>
            <Select w={{ base: 'full', md: '150px' }} bg={searchBg} borderColor={borderColor} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </HStack>
          <Button leftIcon={<FaUserPlus />} colorScheme="purple" w={{ base: 'full', md: 'auto' }}>Add New User</Button>
        </Flex>

        <Box bg={cardBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} overflow="hidden">
          <TableContainer>
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th color={mutedText} fontSize="xs" py={4}>Name</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Role</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Email</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Status</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Last Login</Th>
                  <Th color={mutedText} fontSize="xs" py={4} textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockUsers.map((user) => (
                  <Tr key={user.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                    <Td fontWeight="bold" color={textColor}>{user.name}</Td>
                    <Td color={textColor}>{user.role}</Td>
                    <Td color={mutedText}>{user.email}</Td>
                    <Td><Badge colorScheme={getStatusBadge(user.status)} px={2} py={1} borderRadius="full">{user.status}</Badge></Td>
                    <Td color={mutedText}>{user.lastLogin}</Td>
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
          <Flex justify="space-between" align="center" p={4} borderTop="1px solid" borderColor={borderColor} bg={cardBg} direction={{ base: "column", sm: "row" }} gap={4}>
            <Text fontSize="sm" color={mutedText}>Showing 1 to 3 of 2,450 entries</Text>
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