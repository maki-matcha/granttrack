import React, { useState } from 'react';
import {
  Box, Heading, Flex, FormControl, FormLabel, Input, Select, Button, SimpleGrid, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Icon
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import { scholarshipsData } from './Dashboard';

export default function StudentApplication() {
  // Hook to manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // --- NEW: Hook to manage loading state for submission ---
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <Heading size="lg" mb={6} color="gray.700">My Application</Heading>

      {/* Progress Tracker with Dynamic Colors */}
      <Box bg="white" shadow="sm" borderRadius="md" p={6} mb={8} borderTop="4px solid" borderColor={`${activeStepColor}.400`}>
        <Text fontWeight="bold" mb={4} color="gray.600">Application Status Tracker</Text>
        <Flex align="center" justify="space-between" position="relative">
          
          {/* Default Gray Background Line */}
          <Box position="absolute" top="50%" left="0" right="0" h="4px" bg="gray.200" zIndex={0} transform="translateY(-50%)" />
          
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
            let nodeBg = 'gray.200';
            let nodeColor = 'gray.500';
            
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
                  borderColor={`${step.color}.100`}
                  boxShadow={isActive ? 'lg' : 'none'}
                  transition="all 0.3s ease"
                >
                  {stepNumber}
                </Flex>
                <Text 
                  mt={2} 
                  fontSize="sm" 
                  fontWeight={isActive ? 'bold' : 'normal'} 
                  color={isActive ? `${step.color}.600` : (isCompleted ? `${step.color}.400` : 'gray.400')}
                >
                  {step.label}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
      
      {/* Application Form */}
      <Box bg="white" shadow="sm" borderRadius="md" p={8}>
        <Heading size="md" mb={6} color="gray.700">Submit New Application</Heading>

        <FormControl mb={6}>
          <FormLabel fontWeight="bold">Select Scholarship to Apply For</FormLabel>
          <Select placeholder="-- Choose an available scholarship --" bg="gray.50" size="lg" borderColor="blue.200">
            {availableScholarships.map(scholarship => (
              <option key={scholarship.id} value={scholarship.title}>
                {scholarship.title} ({scholarship.status})
              </option>
            ))}
          </Select>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="Taylor" bg="gray.50" />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Swift" bg="gray.50" />
          </FormControl>
          <FormControl>
            <FormLabel>Course / Program</FormLabel>
            <Select placeholder="Select course" bg="gray.50">
              <option>BS Computer Science</option>
              <option>BS Information Technology</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Year Level</FormLabel>
            <Select placeholder="Select year" bg="gray.50">
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <FormControl mb={8}>
          <FormLabel>Upload Requirements (PDF)</FormLabel>
          <Input type="file" p={1} bg="gray.50" />
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
        <ModalOverlay />
        <ModalContent textAlign="center" p={8} borderRadius="xl">
          <ModalHeader p={0} mb={4}>
            <Flex justify="center">
              <Icon as={FaCheckCircle} w={20} h={20} color="green.400" />
            </Flex>
          </ModalHeader>
          <ModalBody p={0} mb={6}>
            <Heading size="md" mb={2}>Application Submitted Successfully</Heading>
            <Text color="gray.500">Your documents have been successfully submitted!</Text>
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