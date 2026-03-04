import React from 'react';
import { Box, Heading, Flex, Text, HStack, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import OrganizationLayout from '../../components/OrganizationLayout'; // Import the layout

export default function OrganizationDashboard() {
  const programStatusCards = [
    { label: 'PROGRAMS SUBMITTED', percentage: '0%' },
    { label: 'PENDING APPROVAL', percentage: '0%' },
    { label: 'APPROVED PROGRAMS', percentage: '0%' },
  ];

  return (
    <OrganizationLayout>
      <Box flex={1} bg="white" shadow="sm" borderRadius="xl" p={6} minH="80vh" border="1px solid" borderColor="gray.100">
        <Heading size="lg" mb={6} color="#0b253c">Program Status</Heading>
        
        <Flex gap={6} mb={8} direction={{ base: 'column', md: 'row' }}>
          {programStatusCards.map((card, idx) => (
            <Box key={idx} flex={1} bg="white" p={5} borderRadius="lg" shadow="sm" borderTop="4px solid" borderColor={idx === 1 ? 'yellow.400' : (idx === 2 ? 'green.400' : 'gray.400')}>
              <Flex align="center" justify="space-between">
                <Text fontSize="xs" fontWeight="bold" color="gray.500">{card.label}</Text>
                <Text fontSize="3xl" fontWeight="900" color={idx === 0 ? "gray.400" : (idx === 1 ? 'yellow.400' : 'green.400')}>{card.percentage}</Text>
              </Flex>
            </Box>
          ))}
        </Flex>

        <HStack gap={4} mb={8} direction={{ base: 'column', md: 'row' }}>
          <Box flex={1}>
            <Input placeholder="Search" bg="gray.100" border="none" borderRadius="full" px={6} />
          </Box>
          <Select placeholder="Category" maxW={{ base: 'full', md: '200px' }} bg="gray.100" border="none" borderRadius="full" />
        </HStack>

        <HStack gap={4} mb={6} justify="space-between" align="center">
          <Heading size="md" color="#0b253c">My Submissions</Heading>
          <Button leftIcon={<FaPlus />} bg="#0b253c" color="white" _hover={{ bg: "#163a57" }} borderRadius="full" px={6}>
            New
          </Button>
        </HStack>

        <Box overflowX="auto">
          <Table size="md" variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th color="gray.500" fontSize="xs">PROGRAM NAME</Th>
                <Th color="gray.500" fontSize="xs">SUBMISSION DATE</Th>
                <Th color="gray.500" fontSize="xs">STATUS</Th>
                <Th color="gray.500" fontSize="xs">ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[...Array(5)].map((_, i) => (
                <Tr key={i}>
                  <Td><Box h="12px" w="full" bg="gray.100" borderRadius="full" /></Td>
                  <Td><Box h="12px" w="full" bg="gray.100" borderRadius="full" /></Td>
                  <Td><Box h="12px" w="full" bg="gray.100" borderRadius="full" /></Td>
                  <Td><Box h="12px" w="full" bg="gray.100" borderRadius="full" /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </OrganizationLayout>
  );
}