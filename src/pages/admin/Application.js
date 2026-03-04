import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, Button } from '@chakra-ui/react';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminApplication() {
  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading size="lg" mb={6} color="gray.700">Manage Applications</Heading>
      <Box bg="white" shadow="sm" borderRadius="md" overflow="hidden">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Student Name</Th>
              <Th>LRN</Th>
              <Th>Date Applied</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Taylor Swift</Td>
              <Td>10293847561</Td>
              <Td>Oct 12, 2023</Td>
              <Td><Badge colorScheme="purple">Pending</Badge></Td>
              <Td><Button size="sm" colorScheme="blue" variant="outline">Review</Button></Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Ed Sheeran</Td>
              <Td>10293847562</Td>
              <Td>Oct 10, 2023</Td>
              <Td><Badge colorScheme="green">Approved</Badge></Td>
              <Td><Button size="sm" colorScheme="blue" variant="outline">View</Button></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </DashboardLayout>
  );
}