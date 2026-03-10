import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, HStack, Badge, Input, InputGroup, InputLeftElement, 
  Select, Button, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon
} from '@chakra-ui/react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaDownload, FaChevronRight } from 'react-icons/fa';
import SuperadminLayout from '../../components/SuperadminLayout';

const mockApplications = [
  { id: 1, applicantName: 'Maria Santos', organization: 'Tech for Tomorrow', program: 'STEM Excellence', status: 'Approved', dateApplied: '2026-03-01' },
  { id: 2, applicantName: 'Juan Dela Cruz', organization: 'EduCare Initiatives', program: 'Future Educators', status: 'Pending', dateApplied: '2026-02-28' },
  { id: 3, applicantName: 'Anna Reyes', organization: 'Future Leaders', program: 'Leadership Grant', status: 'Rejected', dateApplied: '2026-02-25' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Approved': return 'green';
    case 'Pending': return 'orange';
    case 'Rejected': return 'red';
    default: return 'gray';
  }
};

export default function Supadappli() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');

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
              <BreadcrumbLink color={textColor} fontWeight="bold" fontSize="sm">Applications</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading size="lg" color={textColor}>Applications</Heading>
        </Box>

        <Flex justify="space-between" align="center" mb={6} direction={{ base: 'column', md: 'row' }} gap={4}>
          <HStack w={{ base: 'full', md: 'auto' }} spacing={4} flexWrap="wrap">
            <InputGroup w={{ base: 'full', md: '250px' }}>
              <InputLeftElement pointerEvents="none"><Icon as={FaSearch} color={mutedText} /></InputLeftElement>
              <Input placeholder="Search applicants..." bg={searchBg} borderColor={borderColor} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
            <Select w={{ base: 'full', md: '150px' }} bg={searchBg} borderColor={borderColor} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <Select w={{ base: 'full', md: '180px' }} bg={searchBg} borderColor={borderColor} value={programFilter} onChange={(e) => setProgramFilter(e.target.value)}>
              <option value="">All Programs</option>
              <option value="STEM Excellence">STEM Excellence</option>
              <option value="Future Educators">Future Educators</option>
              <option value="Leadership Grant">Leadership Grant</option>
            </Select>
          </HStack>
          <Button leftIcon={<FaDownload />} colorScheme="purple" variant="outline" w={{ base: 'full', md: 'auto' }}>Export Data</Button>
        </Flex>

        <Box bg={cardBg} borderRadius="xl" shadow="sm" border="1px solid" borderColor={borderColor} overflow="hidden">
          <TableContainer>
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th color={mutedText} fontSize="xs" py={4}>Applicant Name</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Organization</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Program</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Status</Th>
                  <Th color={mutedText} fontSize="xs" py={4}>Date Applied</Th>
                  <Th color={mutedText} fontSize="xs" py={4} textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockApplications.map((app) => (
                  <Tr key={app.id} _hover={{ bg: rowHoverBg }} transition="background 0.2s">
                    <Td fontWeight="bold" color={textColor}>{app.applicantName}</Td>
                    <Td color={textColor}>{app.organization}</Td>
                    <Td color={mutedText}>{app.program}</Td>
                    <Td><Badge colorScheme={getStatusBadge(app.status)} px={2} py={1} borderRadius="full">{app.status}</Badge></Td>
                    <Td color={mutedText}>{app.dateApplied}</Td>
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
            <Text fontSize="sm" color={mutedText}>Showing 1 to 3 of 850 entries</Text>
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