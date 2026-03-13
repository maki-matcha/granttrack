import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
  useColorModeValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import DashboardLayout from "../../components/DashboardLayout"; // Adjust path if needed

export default function StudentApplication() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- DATABASE STATE ---
  const [availableScholarships, setAvailableScholarships] = useState([]);
  const [userData, setUserData] = useState({
    fullName: "Loading...",
    studentId: "Loading...",
  });
  const [formData, setFormData] = useState({
    scholarshipTitle: "",
    firstName: "",
    lastName: "",
    course: "",
    yearLevel: "",
  });

  // --- DARK MODE HOOKS ---
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const subtitleColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const lineBg = useColorModeValue("gray.200", "gray.700");

  // MOCK STATUS for visual tracker
  const currentStep = 1;

  const steps = [
    { label: "Submitted", color: "blue" },
    { label: "Under Review", color: "purple" },
    { label: "Accepted", color: "green" },
  ];

  const activeStepColor = steps[currentStep - 1]?.color || "gray";

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    // 1. Get Logged-in User Data
    const storedUser = JSON.parse(localStorage.getItem("granttrack_user"));
    if (storedUser) {
      setUserData({
        fullName: `${storedUser.firstName} ${storedUser.lastName}`,
        studentId: storedUser.studentId || "Not Assigned",
      });
      setFormData((prev) => ({
        ...prev,
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
      }));
    }

    // 2. Fetch Active Scholarships from Database
    const fetchScholarships = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/scholarships");
        if (response.ok) {
          const data = await response.json();
          // Filter out 'Closed' scholarships
          setAvailableScholarships(data.filter((s) => s.status !== "Closed"));
        }
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HANDLE SUBMISSION ---
  const handleSubmit = async () => {
    if (!formData.scholarshipTitle) {
      return toast({
        title: "Validation Error",
        description: "Please select a scholarship.",
        status: "warning",
        position: "top-right",
      });
    }

    setIsSubmitting(true);

    try {
      // Connect to the Application Schema in your Database
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          lrn: userData.studentId, // Pulls the ID from their profile
          date: new Date().toLocaleDateString("en-US"), // Formats to MM/DD/YYYY
          status: "Pending",
        }),
      });

      if (response.ok) {
        onOpen(); // Open success modal
      } else {
        toast({
          title: "Submission Failed",
          description: "Could not send application.",
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error submitting:", error);
      toast({
        title: "Network Error",
        description: "Could not connect to server.",
        status: "error",
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      role="student"
      userName={userData.fullName}
      userDetail={userData.studentId}
    >
      <Heading
        size="lg"
        mb={6}
        color={headingColor}
        transition={smoothTransition}
      >
        My Application
      </Heading>

      {/* Progress Tracker with Dynamic Colors */}
      <Box
        bg={cardBg}
        shadow="sm"
        borderRadius="md"
        p={6}
        mb={8}
        borderTop="4px solid"
        borderColor={`${activeStepColor}.400`}
        transition={smoothTransition}
      >
        <Text
          fontWeight="bold"
          mb={4}
          color={subtitleColor}
          transition={smoothTransition}
        >
          Application Status Tracker
        </Text>
        <Flex align="center" justify="space-between" position="relative">
          <Box
            position="absolute"
            top="50%"
            left="0"
            right="0"
            h="4px"
            bg={lineBg}
            zIndex={0}
            transform="translateY(-50%)"
            transition={smoothTransition}
          />

          <Box
            position="absolute"
            top="50%"
            left="0"
            w={`${(currentStep - 1) * 50}%`}
            h="4px"
            bg={`${activeStepColor}.400`}
            zIndex={0}
            transform="translateY(-50%)"
            transition="all 0.4s ease"
          />

          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isActive = currentStep === stepNumber;

            let nodeBg = lineBg;
            let nodeColor = subtitleColor;

            if (isActive) {
              nodeBg = `${step.color}.500`;
              nodeColor = "white";
            } else if (isCompleted) {
              nodeBg = `${step.color}.300`;
              nodeColor = "white";
            }

            return (
              <Flex
                key={step.label}
                direction="column"
                align="center"
                zIndex={1}
              >
                <Flex
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  fontWeight="bold"
                  bg={nodeBg}
                  color={nodeColor}
                  border={isActive ? "4px solid" : "none"}
                  borderColor={
                    isActive
                      ? isDark
                        ? `${step.color}.900`
                        : `${step.color}.100`
                      : "transparent"
                  }
                  boxShadow={isActive ? "lg" : "none"}
                  transition="all 0.3s ease"
                >
                  {stepNumber}
                </Flex>
                <Text
                  mt={2}
                  fontSize="sm"
                  fontWeight={isActive ? "bold" : "normal"}
                  color={
                    isActive
                      ? `${step.color}.500`
                      : isCompleted
                        ? `${step.color}.400`
                        : subtitleColor
                  }
                  transition={smoothTransition}
                >
                  {step.label}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>

      {/* Application Form */}
      <Box
        bg={cardBg}
        shadow="sm"
        borderRadius="md"
        p={8}
        transition={smoothTransition}
      >
        <Heading
          size="md"
          mb={6}
          color={headingColor}
          transition={smoothTransition}
        >
          Submit New Application
        </Heading>

        <FormControl mb={6} isRequired>
          <FormLabel
            fontWeight="bold"
            color={headingColor}
            transition={smoothTransition}
          >
            Select Scholarship to Apply For
          </FormLabel>
          <Select
            name="scholarshipTitle"
            value={formData.scholarshipTitle}
            onChange={handleInputChange}
            placeholder="-- Choose an available scholarship --"
            bg={inputBg}
            color={headingColor}
            size="lg"
            borderColor={isDark ? "blue.700" : "blue.200"}
            transition={smoothTransition}
          >
            {availableScholarships.map((scholarship) => (
              <option
                key={scholarship._id}
                value={scholarship.title}
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                {scholarship.title} ({scholarship.status})
              </option>
            ))}
          </Select>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <FormControl isRequired>
            <FormLabel color={headingColor} transition={smoothTransition}>
              First Name
            </FormLabel>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Taylor"
              bg={inputBg}
              color={headingColor}
              borderColor={cardBorder}
              transition={smoothTransition}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color={headingColor} transition={smoothTransition}>
              Last Name
            </FormLabel>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Swift"
              bg={inputBg}
              color={headingColor}
              borderColor={cardBorder}
              transition={smoothTransition}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color={headingColor} transition={smoothTransition}>
              Course / Program
            </FormLabel>
            <Select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              placeholder="Select course"
              bg={inputBg}
              color={headingColor}
              borderColor={cardBorder}
              transition={smoothTransition}
            >
              <option
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                BS Computer Science
              </option>
              <option
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                BS Information Technology
              </option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel color={headingColor} transition={smoothTransition}>
              Year Level
            </FormLabel>
            <Select
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleInputChange}
              placeholder="Select year"
              bg={inputBg}
              color={headingColor}
              borderColor={cardBorder}
              transition={smoothTransition}
            >
              <option
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                1st Year
              </option>
              <option
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                2nd Year
              </option>
              <option
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                3rd Year
              </option>
              <option
                style={{
                  color: isDark ? "white" : "black",
                  background: isDark ? "#2D3748" : "white",
                }}
              >
                4th Year
              </option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <FormControl mb={8}>
          <FormLabel color={headingColor} transition={smoothTransition}>
            Upload Requirements (PDF)
          </FormLabel>
          <Input
            type="file"
            accept=".pdf"
            p={1}
            bg={inputBg}
            color={headingColor}
            borderColor={cardBorder}
            transition={smoothTransition}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          size="lg"
          w={{ base: "full", md: "auto" }}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          Submit Application
        </Button>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent
          textAlign="center"
          p={8}
          borderRadius="xl"
          bg={cardBg}
          transition={smoothTransition}
        >
          <ModalHeader p={0} mb={4}>
            <Flex justify="center">
              <Icon as={FaCheckCircle} w={20} h={20} color="green.400" />
            </Flex>
          </ModalHeader>
          <ModalBody p={0} mb={6}>
            <Heading
              size="md"
              mb={2}
              color={headingColor}
              transition={smoothTransition}
            >
              Application Submitted Successfully
            </Heading>
            <Text color={subtitleColor} transition={smoothTransition}>
              Your documents have been successfully submitted!
            </Text>
          </ModalBody>
          <ModalFooter p={0} justify="center">
            <Button
              colorScheme="blue"
              w="full"
              onClick={() => {
                onClose(); /* Optional: navigate to status page here */
              }}
            >
              View Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
