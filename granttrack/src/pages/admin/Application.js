import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Icon,
  Select,
  useColorModeValue,
  useColorMode,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import DashboardLayout from "../../components/DashboardLayout";

export default function AdminApplication() {
  // --- REAL DATA FROM MONGODB ---
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/applications");
        const data = await response.json();
        if (response.ok) {
          setApplications(data);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Filter applications if search query matches AND category matches
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lrn?.includes(searchQuery);
    const matchesCategory =
      filterCategory === "All" || app.status === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    if (status === "Approved") return "green";
    if (status === "Pending") return "purple";
    if (status === "Rejected") return "red";
    return "gray";
  };

  // --- DARK MODE HOOKS & COLORS ---
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const tableHeadBg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const mutedText = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.900");
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.100");

  const optionStyle = {
    color: isDark ? "white" : "black",
    background: isDark ? "#2D3748" : "white",
  };

  return (
    <DashboardLayout role="admin" userName="Bayagni Agbayani" userDetail="6787">
      <Heading
        size="lg"
        mb={6}
        color={headingColor}
        transition={smoothTransition}
      >
        Manage Applications
      </Heading>

      <Box
        bg={cardBg}
        shadow="sm"
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor={borderColor}
        transition={smoothTransition}
      >
        {/* --- SEARCH BAR & DROPDOWN AREA --- */}
        <Flex
          p={4}
          borderBottom="1px solid"
          borderColor={borderColor}
          justify="space-between"
          align="center"
          gap={4}
          flexWrap="wrap"
          transition={smoothTransition}
        >
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

          <Select
            maxW={{ base: "full", md: "200px" }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            bg={inputBg}
            color={textColor}
            borderColor={borderColor}
            transition={smoothTransition}
          >
            <option value="All" style={optionStyle}>
              All Categories
            </option>
            <option value="Pending" style={optionStyle}>
              Pending
            </option>
            <option value="Approved" style={optionStyle}>
              Approved
            </option>
            <option value="Rejected" style={optionStyle}>
              Rejected
            </option>
          </Select>
        </Flex>

        {/* --- TABLE AREA --- */}
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg={tableHeadBg} transition={smoothTransition}>
              <Tr>
                <Th color={mutedText} borderColor={borderColor}>
                  Student Name
                </Th>
                <Th color={mutedText} borderColor={borderColor}>
                  LRN
                </Th>
                <Th color={mutedText} borderColor={borderColor}>
                  Date Applied
                </Th>
                <Th color={mutedText} borderColor={borderColor}>
                  Status
                </Th>
                <Th color={mutedText} borderColor={borderColor}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={5} borderColor={borderColor}>
                    <Center py={8}>
                      <Spinner color="blue.500" />
                    </Center>
                  </Td>
                </Tr>
              ) : filteredApplications.length > 0 ? (
                filteredApplications.map((app, index) => (
                  <Tr
                    key={app._id || index}
                    _hover={{ bg: hoverBg }}
                    transition={smoothTransition}
                  >
                    <Td
                      fontWeight="bold"
                      color={textColor}
                      borderColor={borderColor}
                    >
                      {app.name}
                    </Td>
                    <Td color={textColor} borderColor={borderColor}>
                      {app.lrn}
                    </Td>
                    <Td color={textColor} borderColor={borderColor}>
                      {app.date}
                    </Td>
                    <Td borderColor={borderColor}>
                      <Badge
                        colorScheme={getStatusColor(app.status)}
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {app.status}
                      </Badge>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        {app.status === "Pending" ? "Review" : "View"}
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td
                    colSpan={5}
                    textAlign="center"
                    py={8}
                    color={mutedText}
                    borderColor={borderColor}
                  >
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
