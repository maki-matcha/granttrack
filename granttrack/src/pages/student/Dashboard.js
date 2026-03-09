import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Image,
  VStack,
  HStack,
  Icon,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  InputGroup,
  useDisclosure,
  useColorModeValue,
  Spinner,
  Center, // Added Spinner for loading state
} from "@chakra-ui/react";
import {
  FaRegCalendarAlt,
  FaRegCheckSquare,
  FaUserGraduate,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import DashboardLayout from "../../components/DashboardLayout";

// Temporarily keeping this so Application.js doesn't crash!
export const scholarshipsData = [
  {
    id: 1,
    title: "PYDO Scholarship",
    status: "Ongoing",
    deadline: "March 2026",
    amount: "Up to 10,000.00",
    level: "Undergraduate",
    description: "A merit-based financial assistance program...",
    allowance: "₱10,000.00 / Semester",
  },
  {
    id: 2,
    title: "CHED Scholarship",
    status: "Open",
    deadline: "May 2026",
    amount: "Up to 20,000.00",
    level: "Undergraduate",
    description: "A government-funded scholarship...",
    allowance: "₱20,000.00 / Semester",
  },
];

const requiredDocsList = [
  "School ID:",
  "Registration Form (RF)",
  "Birth Certificate",
  "Recent 2x2 Photo",
];

export default function StudentDashboard() {
  // --- FIX: Moved inside component & updated keys to match login.js ---
  // This prevents stale data across logins and fetches the correct combined Full Name
  const loggedInName = localStorage.getItem("userFullName") || "Student Guest";
  const loggedInFirstName = localStorage.getItem("userFirstName") || "Student";
  const loggedInId = localStorage.getItem("userId") || "No ID found";

  const smoothTransition = "all 0.3s ease-in-out";

  // --- REAL DATA FETCHING LOGIC ---
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/scholarships");
        const data = await response.json();
        if (response.ok) {
          setScholarships(data);
        }
      } catch (error) {
        console.error("Error fetching from database:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchScholarships();
  }, []);
  // --------------------------------

  // --- DARK MODE COLORS ---
  const headingColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const subtitleColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "gray.700");
  const statBoxBg = useColorModeValue("blue.50", "blue.900");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const imageBoxBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const getBadgeColor = (status) => {
    if (status === "Ongoing") return "yellow";
    if (status === "Open") return "green";
    if (status === "Closed") return "red";
    return "gray";
  };

  const currentStatus = "Under Review";
  const statusConfig = {
    Submitted: {
      color: "blue",
      progress: 33,
      text: "Step 1 of 3: Application Received",
    },
    "Under Review": {
      color: "purple",
      progress: 66,
      text: "Step 2 of 3: Admin Evaluation",
    },
    Accepted: {
      color: "green",
      progress: 100,
      text: "Step 3 of 3: Grant Awarded!",
    },
  };
  const activeConfig = statusConfig[currentStatus] || statusConfig["Submitted"];

  // Modal State Management
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [modalStep, setModalStep] = useState(0);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 Validations
  const [studentInfo, setStudentInfo] = useState({
    fullName: "",
    studentId: "",
    academicYear: "",
  });
  const handleStudentInfoChange = (e) =>
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  const isStep1Valid =
    studentInfo.fullName.trim() !== "" &&
    studentInfo.studentId.trim() !== "" &&
    studentInfo.academicYear.trim() !== "";

  // Step 2 Validations
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [isCertified, setIsCertified] = useState(false);
  const isStep2Valid =
    requiredDocsList.every((doc) => uploadedDocs[doc]) && isCertified;

  const handleApplyClick = (scholarship) => {
    setSelectedScholarship(scholarship);
    setModalStep(0);
    onModalOpen();
  };
  const handleProceedToApply = () => setModalStep(1);
  const handleNext = () => setModalStep(2);
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setModalStep(3);
    }, 1500);
  };

  const handleCloseModal = () => {
    onModalClose();
    setTimeout(() => {
      setModalStep(0);
      setIsSubmitting(false);
      setStudentInfo({ fullName: "", studentId: "", academicYear: "" });
      setUploadedDocs({});
      setIsCertified(false);
    }, 300);
  };

  return (
    <DashboardLayout
      role="student"
      userName={loggedInName}
      userDetail={loggedInId}
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        mb={2}
        color={headingColor}
        transition={smoothTransition}
      >
        Welcome back, {loggedInFirstName}!{" "}
        {/* FIX: Replaced hardcoded 'Taylor' */}
      </Heading>
      <Text
        color={subtitleColor}
        mb={8}
        fontSize={{ base: "sm", md: "md" }}
        transition={smoothTransition}
      >
        Here is your grant status and available scholarships.
      </Text>

      {/* Status & Updates Section */}
      <Flex gap={6} direction={{ base: "column", lg: "row" }} mb={10}>
        <Box
          flex={1}
          bg={cardBg}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
          shadow="sm"
          border="1px solid"
          borderColor={cardBorder}
          transition={smoothTransition}
        >
          <HStack justify="space-between" mb={6}>
            <Heading
              size="md"
              color={headingColor}
              transition={smoothTransition}
            >
              My Application Status
            </Heading>
            <Badge
              colorScheme={activeConfig.color}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
            >
              {currentStatus}
            </Badge>
          </HStack>
          <Progress
            value={activeConfig.progress}
            colorScheme={activeConfig.color}
            borderRadius="full"
            size="sm"
            mb={4}
          />
          <Text
            fontWeight="bold"
            color={`${activeConfig.color}.500`}
            fontSize="sm"
            mb={1}
          >
            {activeConfig.text}
          </Text>
          <Text
            fontSize="sm"
            color={subtitleColor}
            transition={smoothTransition}
          >
            We are currently verifying your documents. Please wait for the
            admin's feedback.
          </Text>
        </Box>

        <Box
          w={{ base: "full", lg: "350px" }}
          bg={cardBg}
          borderRadius="2xl"
          p={{ base: 5, md: 8 }}
          shadow="sm"
          border="1px solid"
          borderColor={cardBorder}
          transition={smoothTransition}
        >
          <Heading
            size="md"
            mb={6}
            color={headingColor}
            transition={smoothTransition}
          >
            Latest Updates
          </Heading>
          <VStack align="stretch" spacing={4}>
            <HStack align="start" spacing={3}>
              <Box
                p={2}
                bg={statBoxBg}
                borderRadius="md"
                color="blue.500"
                transition={smoothTransition}
              >
                <Icon as={FaInfoCircle} />
              </Box>
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={headingColor}
                  transition={smoothTransition}
                >
                  Document Verified
                </Text>
                <Text
                  fontSize="xs"
                  color={subtitleColor}
                  transition={smoothTransition}
                >
                  Your Birth Certificate was accepted.
                </Text>
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Flex>

      <Heading
        size="md"
        mb={6}
        color={headingColor}
        transition={smoothTransition}
      >
        Explore Scholarships
      </Heading>

      {/* Loading State or Scholarship Grid */}
      {isLoading ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : scholarships.length === 0 ? (
        <Text color={subtitleColor}>
          No scholarships available at the moment.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {scholarships.map((scholarship) => (
            <Box
              key={scholarship._id}
              bg={cardBg}
              borderRadius="2xl"
              shadow="sm"
              border="1px solid"
              borderColor={cardBorder}
              transition={smoothTransition}
              _hover={{ transform: "translateY(-4px)", shadow: "md" }}
              display="flex"
              flexDirection="column"
              overflow="hidden"
            >
              {/* Title & Badge */}
              <Flex justify="space-between" align="center" p={4} pb={2}>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  color={headingColor}
                  transition={smoothTransition}
                >
                  {scholarship.title}
                </Text>
                <Badge
                  colorScheme={getBadgeColor(scholarship.status)}
                  borderRadius="full"
                  px={2}
                  textTransform="capitalize"
                >
                  {scholarship.status}
                </Badge>
              </Flex>

              {/* Image Box */}
              <Box px={4} py={2}>
                <Box
                  w="full"
                  h="120px"
                  bg={imageBoxBg}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  transition={smoothTransition}
                >
                  <Image
                    src="/scholarship.jpg"
                    alt="application"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/400x150/0b1d2e/ffffff?text=SCHOLARSHIP+APPLICATION"
                  />
                </Box>
              </Box>

              {/* Info VStack */}
              <VStack
                align="start"
                px={5}
                py={3}
                spacing={2}
                fontSize="sm"
                flex={1}
                color={subtitleColor}
                transition={smoothTransition}
              >
                <Flex align="center">
                  <Icon as={FaRegCalendarAlt} mr={3} />
                  <Text>
                    Deadline:{" "}
                    <Text as="span" fontWeight="bold">
                      {scholarship.deadline}
                    </Text>
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaRegCheckSquare} mr={3} />
                  <Text>₱{scholarship.amount}</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaUserGraduate} mr={3} />
                  <Text>{scholarship.level}</Text>
                </Flex>
              </VStack>

              <Box
                p={4}
                borderTop="1px solid"
                borderColor={cardBorder}
                transition={smoothTransition}
              >
                <Button
                  w="full"
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  onClick={() => handleApplyClick(scholarship)}
                  isDisabled={scholarship.status === "Closed"}
                >
                  {scholarship.status === "Closed"
                    ? "Closed"
                    : "View Details & Apply"}
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent
          borderRadius="xl"
          bg={cardBg}
          transition={smoothTransition}
        >
          {selectedScholarship && (
            <>
              {modalStep === 0 && (
                <>
                  <ModalHeader
                    color={headingColor}
                    borderBottomWidth="1px"
                    borderColor={cardBorder}
                    transition={smoothTransition}
                  >
                    Scholarship Details
                  </ModalHeader>
                  <ModalCloseButton color={headingColor} />
                  <ModalBody py={6}>
                    <Heading size="lg" mb={2} color={headingColor}>
                      {selectedScholarship.title}
                    </Heading>
                    <Badge
                      colorScheme={getBadgeColor(selectedScholarship.status)}
                      mb={6}
                    >
                      {selectedScholarship.status}
                    </Badge>
                    <Text color={subtitleColor} mb={6}>
                      {selectedScholarship.description ||
                        "A fantastic grant opportunity for deserving students."}
                    </Text>
                  </ModalBody>
                  <ModalFooter borderTopWidth="1px" borderColor={cardBorder}>
                    <Button
                      variant="ghost"
                      mr={3}
                      onClick={handleCloseModal}
                      color={headingColor}
                    >
                      Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleProceedToApply}>
                      Proceed to Apply
                    </Button>
                  </ModalFooter>
                </>
              )}

              {modalStep === 1 && (
                <>
                  <ModalHeader
                    color={headingColor}
                    borderBottomWidth="1px"
                    borderColor={cardBorder}
                    transition={smoothTransition}
                  >
                    Step 1: Personal Information
                  </ModalHeader>
                  <ModalCloseButton color={headingColor} />
                  <ModalBody py={6}>
                    <VStack spacing={4}>
                      <FormControl isRequired>
                        <FormLabel color={headingColor}>Full Name</FormLabel>
                        <Input
                          name="fullName"
                          value={studentInfo.fullName}
                          onChange={handleStudentInfoChange}
                          bg={inputBg}
                          borderColor={cardBorder}
                          color={headingColor}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel color={headingColor}>
                          Student ID Number
                        </FormLabel>
                        <Input
                          name="studentId"
                          value={studentInfo.studentId}
                          onChange={handleStudentInfoChange}
                          bg={inputBg}
                          borderColor={cardBorder}
                          color={headingColor}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel color={headingColor}>
                          Academic Year
                        </FormLabel>
                        <Input
                          name="academicYear"
                          value={studentInfo.academicYear}
                          onChange={handleStudentInfoChange}
                          bg={inputBg}
                          borderColor={cardBorder}
                          color={headingColor}
                        />
                      </FormControl>
                    </VStack>
                  </ModalBody>
                  <ModalFooter borderTopWidth="1px" borderColor={cardBorder}>
                    <Button
                      colorScheme="blue"
                      onClick={handleNext}
                      isDisabled={!isStep1Valid}
                      w="120px"
                    >
                      Next
                    </Button>
                  </ModalFooter>
                </>
              )}

              {modalStep === 2 && (
                <>
                  <ModalHeader
                    color={headingColor}
                    borderBottomWidth="1px"
                    borderColor={cardBorder}
                    transition={smoothTransition}
                  >
                    Step 2: Upload Requirements
                  </ModalHeader>
                  <ModalCloseButton color={headingColor} />
                  <ModalBody py={6}>
                    <SimpleGrid columns={2} spacing={4} mb={4}>
                      {requiredDocsList.map((doc, idx) => (
                        <FormControl key={idx} isRequired>
                          <FormLabel fontSize="xs" color={headingColor} mb={1}>
                            {doc}
                          </FormLabel>
                          <InputGroup size="sm">
                            <Input
                              type="file"
                              bg={inputBg}
                              borderColor={cardBorder}
                              color={headingColor}
                              onChange={(e) =>
                                setUploadedDocs({
                                  ...uploadedDocs,
                                  [doc]: e.target.files[0],
                                })
                              }
                              p={1}
                            />
                          </InputGroup>
                        </FormControl>
                      ))}
                    </SimpleGrid>
                    <Checkbox
                      isChecked={isCertified}
                      onChange={(e) => setIsCertified(e.target.checked)}
                      color={headingColor}
                      mt={4}
                    >
                      I certify that the documents provided are true and
                      accurate.
                    </Checkbox>
                  </ModalBody>
                  <ModalFooter borderTopWidth="1px" borderColor={cardBorder}>
                    <HStack spacing={3} justify="flex-end" w="full">
                      <Button
                        variant="outline"
                        colorScheme="blue"
                        w="130px"
                        isDisabled={isSubmitting}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        colorScheme="blue"
                        w="130px"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        loadingText="Submitting..."
                        isDisabled={!isStep2Valid}
                      >
                        Submit
                      </Button>
                    </HStack>
                  </ModalFooter>
                </>
              )}

              {modalStep === 3 && (
                <>
                  <ModalHeader textAlign="center" pt={8} border="none">
                    <Flex justify="center" mb={4}>
                      <Icon
                        as={FaCheckCircle}
                        w={16}
                        h={16}
                        color="green.400"
                      />
                    </Flex>
                  </ModalHeader>
                  <ModalBody textAlign="center" pb={6}>
                    <Heading size="md" mb={2} color={headingColor}>
                      Application Submitted!
                    </Heading>
                    <Text color={subtitleColor}>
                      We have received your application for{" "}
                      {selectedScholarship.title}.
                    </Text>
                  </ModalBody>
                  <ModalFooter
                    borderTopWidth="1px"
                    borderColor={cardBorder}
                    justifyContent="center"
                    pb={8}
                  >
                    <Button
                      colorScheme="blue"
                      w="full"
                      maxW="200px"
                      onClick={handleCloseModal}
                    >
                      View Status
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
