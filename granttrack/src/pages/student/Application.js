import React, { useState } from 'react';
import {
  Box, Heading, Flex, FormControl, FormLabel, Input, Select, Button, SimpleGrid, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Icon,
  useColorModeValue, useColorMode
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import { scholarshipsData } from './Dashboard';

export default function StudentApplication() {
  // Hook to manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // --- NEW: Hook to manage loading state for submission ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- DARK MODE HOOKS ---
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  const smoothTransition = "all 0.3s ease-in-out";
  const headingColor = useColorModeValue('gray.700', 'whiteAlpha.900');
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.100', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const lineBg = useColorModeValue('gray.200', 'gray.700');

  // Filter out 'Closed' scholarships for the dropdown
  const availableScholarships = scholarshipsData.filter(s => s.status !== 'Closed');

  // MOCK STATUS: Change this to 1 (Submitted), 2 (Under Review), or 3 (Accepted) to see the colors change!
  const currentStep = 2;

  // Define the steps and their corresponding dynamic colors
  const steps = [
    { label: 'Submitted', color: 'blue' },
    { label: 'Under Review', color: 'purple' },
    { label: 'Accepted', color: 'green' }
  ];

  // Get the color of the current active step to theme the progress bar
  const activeStepColor = steps[currentStep - 1]?.color || 'gray';

  // --- NEW: Handle Submit with Animation ---
  const handleSubmit = () => {
    setIsSubmitting(true); // Start the loading spinner
    
    // Simulate a 1.5-second network request delay
    setTimeout(() => {
      setIsSubmitting(false); // Stop the spinner
      onOpen(); // Open the success modal
    }, 1500);
  };

  return (
    <DashboardLayout role="student" userName="Taylor Swift" userDetail="00000000000">
      <Heading size="lg" mb={6} color={headingColor} transition={smoothTransition}>My Application</Heading>

      {/* Progress Tracker with Dynamic Colors */}
      <Box bg={cardBg} shadow="sm" borderRadius="md" p={6} mb={8} borderTop="4px solid" borderColor={`${activeStepColor}.400`} transition={smoothTransition}>
        <Text fontWeight="bold" mb={4} color={subtitleColor} transition={smoothTransition}>Application Status Tracker</Text>
        <Flex align="center" justify="space-between" position="relative">
          
          {/* Default Gray Background Line */}
          <Box position="absolute" top="50%" left="0" right="0" h="4px" bg={lineBg} zIndex={0} transform="translateY(-50%)" transition={smoothTransition} />
          
          {/* Colored Progress Line (Matches current step color) */}
          <Box 
            position="absolute" 
            top="50%" left="0" 
            w={`${(currentStep - 1) * 50}%`} 
            h="4px" 
            bg={`${activeStepColor}.400`} 
            zIndex={0} 
            transform="translateY(-50%)" 
            transition="all 0.4s ease" 
          />

          {/* Step Nodes */}
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isActive = currentStep === stepNumber;

            // Determine colors based on state
            let nodeBg = lineBg;
            let nodeColor = subtitleColor;
            
            if (isActive) {
              nodeBg = `${step.color}.500`;
              nodeColor = 'white';
            } else if (isCompleted) {
              nodeBg = `${step.color}.300`; // Slightly lighter color for past completed steps
              nodeColor = 'white';
            }

            return (
              <Flex key={step.label} direction="column" align="center" zIndex={1}>
                <Flex 
                  w="40px" h="40px" borderRadius="full" align="center" justify="center" fontWeight="bold"
                  bg={nodeBg} 
                  color={nodeColor}
                  border={isActive ? '4px solid' : 'none'}
                  borderColor={isActive ? (isDark ? `${step.color}.900` : `${step.color}.100`) : 'transparent'}
                  boxShadow={isActive ? 'lg' : 'none'}
                  transition="all 0.3s ease"
                >
                  {stepNumber}
                </Flex>
                <Text 
                  mt={2} 
                  fontSize="sm" 
                  fontWeight={isActive ? 'bold' : 'normal'} 
                  color={isActive ? `${step.color}.500` : (isCompleted ? `${step.color}.400` : subtitleColor)}
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
      <Box bg={cardBg} shadow="sm" borderRadius="md" p={8} transition={smoothTransition}>
        <Heading size="md" mb={6} color={headingColor} transition={smoothTransition}>Submit New Application</Heading>

        <FormControl mb={6}>
          <FormLabel fontWeight="bold" color={headingColor} transition={smoothTransition}>Select Scholarship to Apply For</FormLabel>
          <Select placeholder="-- Choose an available scholarship --" bg={inputBg} color={headingColor} size="lg" borderColor={isDark ? 'blue.700' : 'blue.200'} transition={smoothTransition}>
            {availableScholarships.map(scholarship => (
              <option key={scholarship.id} value={scholarship.title} style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>
                {scholarship.title} ({scholarship.status})
              </option>
            ))}
          </Select>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <FormControl>
            <FormLabel color={headingColor} transition={smoothTransition}>First Name</FormLabel>
            <Input placeholder="Taylor" bg={inputBg} color={headingColor} borderColor={cardBorder} transition={smoothTransition} />
          </FormControl>
          <FormControl>
            <FormLabel color={headingColor} transition={smoothTransition}>Last Name</FormLabel>
            <Input placeholder="Swift" bg={inputBg} color={headingColor} borderColor={cardBorder} transition={smoothTransition} />
          </FormControl>
          <FormControl>
            <FormLabel color={headingColor} transition={smoothTransition}>Course / Program</FormLabel>
            <Select placeholder="Select course" bg={inputBg} color={headingColor} borderColor={cardBorder} transition={smoothTransition}>
              <option style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>BS Computer Science</option>
              <option style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>BS Information Technology</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={headingColor} transition={smoothTransition}>Year Level</FormLabel>
            <Select placeholder="Select year" bg={inputBg} color={headingColor} borderColor={cardBorder} transition={smoothTransition}>
              <option style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>1st Year</option>
              <option style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>2nd Year</option>
              <option style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>3rd Year</option>
              <option style={{ color: isDark ? 'white' : 'black', background: isDark ? '#2D3748' : 'white' }}>4th Year</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <FormControl mb={8}>
          <FormLabel color={headingColor} transition={smoothTransition}>Upload Requirements (PDF)</FormLabel>
          <Input type="file" p={1} bg={inputBg} color={headingColor} borderColor={cardBorder} transition={smoothTransition} />
        </FormControl>

        <Button 
          colorScheme="blue" 
          size="lg" 
          w={{ base: 'full', md: 'auto' }} 
          onClick={handleSubmit}
          isLoading={isSubmitting} // --- NEW: Automatically shows spinner ---
          loadingText="Submitting..." // --- NEW: Text to show while spinning ---
        >
          Submit Application
        </Button>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent textAlign="center" p={8} borderRadius="xl" bg={cardBg} transition={smoothTransition}>
          <ModalHeader p={0} mb={4}>
            <Flex justify="center">
              <Icon as={FaCheckCircle} w={20} h={20} color="green.400" />
            </Flex>
          </ModalHeader>
          <ModalBody p={0} mb={6}>
            <Heading size="md" mb={2} color={headingColor} transition={smoothTransition}>Application Submitted Successfully</Heading>
            <Text color={subtitleColor} transition={smoothTransition}>Your documents have been successfully submitted!</Text>
          </ModalBody>
          <ModalFooter p={0} justify="center">
            <Button colorScheme="blue" w="full" onClick={onClose}>
              View Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}