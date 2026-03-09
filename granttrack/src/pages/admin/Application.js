import React, { useState } from 'react';
import { 
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, Button, 
  Input, InputGroup, InputLeftElement, Flex, Icon, Select, 
  useColorModeValue, useColorMode 
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminApplication() {
  // --- EXTENDED MOCK DATA ---
  const initialApplications = [
    { name: 'Taylor Swift', lrn: '10293847561', date: 'Oct 12, 2026', status: 'Pending' },
    { name: 'Ed Sheeran', lrn: '10293847562', date: 'Oct 10, 2026', status: 'Approved' },
    { name: 'Ariana Grande', lrn: '10293847563', date: 'Oct 14, 2026', status: 'Rejected' },
    { name: 'Bruno Mars', lrn: '10293847564', date: 'Oct 15, 2026', status: 'Pending' },
    { name: 'Lady Gaga', lrn: '10293847565', date: 'Oct 16, 2026', status: 'Approved' },
    { name: 'The Weeknd', lrn: '10293847566', date: 'Oct 17, 2026', status: 'Pending' },
    { name: 'Dua Lipa', lrn: '10293847567', date: 'Oct 18, 2026', status: 'Approved' },
    { name: 'Shawn Mendes', lrn: '10293847568', date: 'Oct 19, 2026', status: 'Pending' },
  ];

  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Filter students if search query matches AND category matches
  const filteredApplications = initialApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.lrn.includes(searchQuery);
    const matchesCategory = filterCategory === 'All' || app.status === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'green';
    if (status === 'Pending') return 'purple';
    if (status === 'Rejected') return 'red';
    return 'gray';
  };

  // --- DARK MODE HOOKS & COLORS ---
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const tableHeadBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const mutedText = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.900');
  const hoverBg = useColorModeValue('gray.50', 'whiteAlpha.100');

  // Helper for dropdown options coloring in dark mode
  const optionStyle = {
    color: isDark ? 'white' : 'black',
    background: isDark ? '#2D3748' : 'white'
  };

  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>Manage Applications</Heading>
      
      <Box bg={cardBg} shadow="sm" borderRadius="md" overflow="hidden" border="1px solid" borderColor={borderColor} transition={smoothTransition}>
        
        {/* --- SEARCH BAR & DROPDOWN AREA --- */}
        <Flex p={4} borderBottom="1px solid" borderColor={borderColor} justify="space-between" align="center" gap={4} flexWrap="wrap" transition={smoothTransition}>
          
          {/* Search Input */}
          <InputGroup maxW="400px" flex={1}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color={mutedText} />
            </InputLeftElement>
            <Input 
              placeholder="Search by Student Name or LRN..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={inputBg}
              color={textColor}
              borderColor={borderColor}
              _placeholder={{ color: mutedText }}
              transition={smoothTransition}
            />
          </InputGroup>

          {/* Category Filter Dropdown */}
          <Select 
            maxW={{ base: 'full', md: '200px' }} 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            bg={inputBg}
            color={textColor}
            borderColor={borderColor}
            transition={smoothTransition}
          >
            <option value="All" style={optionStyle}>All Categories</option>
            <option value="Pending" style={optionStyle}>Pending</option>
            <option value="Approved" style={optionStyle}>Approved</option>
            <option value="Rejected" style={optionStyle}>Rejected</option>
          </Select>
        </Flex>

        {/* --- TABLE AREA --- */}
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg={tableHeadBg} transition={smoothTransition}>
              <Tr>
                <Th color={mutedText} borderColor={borderColor}>Student Name</Th>
                <Th color={mutedText} borderColor={borderColor}>LRN</Th>
                <Th color={mutedText} borderColor={borderColor}>Date Applied</Th>
                <Th color={mutedText} borderColor={borderColor}>Status</Th>
                <Th color={mutedText} borderColor={borderColor}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app, index) => (
                  <Tr key={index} _hover={{ bg: hoverBg }} transition={smoothTransition}>
                    <Td fontWeight="bold" color={textColor} borderColor={borderColor}>{app.name}</Td>
                    <Td color={textColor} borderColor={borderColor}>{app.lrn}</Td>
                    <Td color={textColor} borderColor={borderColor}>{app.date}</Td>
                    <Td borderColor={borderColor}>
                      <Badge colorScheme={getStatusColor(app.status)} px={2} py={1} borderRadius="md">
                        {app.status}
                      </Badge>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        {app.status === 'Pending' ? 'Review' : 'View'}
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center" py={8} color={mutedText} borderColor={borderColor}>
                    No applications found matching your criteria.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

      </Box>
    </DashboardLayout>
  );
}