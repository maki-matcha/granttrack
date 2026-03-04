import React, { useState } from 'react';
import {
  Box, Heading, Flex, Text, SimpleGrid, Badge, Button, Image, VStack, HStack, Icon, Progress,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Checkbox, Textarea, Input, InputGroup, InputLeftElement, useDisclosure
} from '@chakra-ui/react';
import { FaRegCalendarAlt, FaRegCheckSquare, FaUserGraduate, FaFolder, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';

// Scholarship Data
export const scholarshipsData = [
  { 
    id: 1, title: 'PYDO Scholarship', status: 'Ongoing', deadline: 'March 2026', amount: 'Up to 10,000.00', level: 'Undergraduate',
    description: 'A merit-based financial assistance program dedicated to outstanding students residing in the province. This grant aims to support local talents in achieving their academic goals.',
    allowance: '₱10,000.00 / Semester'
  },
  { 
    id: 2, title: 'CHED Scholarship', status: 'Open', deadline: 'May 2026', amount: 'Up to 20,000.00', level: 'Undergraduate',
    description: 'A government-funded scholarship by the Commission on Higher Education for underprivileged but highly deserving college students pursuing priority programs.',
    allowance: '₱20,000.00 / Semester'
  },
  { 
    id: 3, title: 'Aspire Scholarship', status: 'Closed', deadline: 'February 1, 2026', amount: 'Up to 15,000.00', level: 'Undergraduate',
    description: 'A private grant specifically aimed at supporting STEM majors with exceptional academic records and a passion for research and development.',
    allowance: '₱15,000.00 / Semester'
  },
  { 
    id: 4, title: 'TES Scholarship', status: 'Open', deadline: 'April 2026', amount: 'Up to 20,000.00', level: 'Undergraduate',
    description: 'The Tertiary Education Subsidy (TES) provides funding for students enrolled in recognized state universities, colleges, and local universities.',
    allowance: '₱20,000.00 / Semester'
  },
  { 
    id: 5, title: 'StarGrant', status: 'Open', deadline: 'April 2026', amount: 'Up to 12,000.00', level: 'Undergraduate',
    description: 'Corporate sponsorship designed for future leaders who demonstrate strong community involvement and maintain consistent academic excellence.',
    allowance: '₱12,000.00 / Semester'
  },
  { 
    id: 6, title: 'ScholarX', status: 'Closed', deadline: 'February 1, 2026', amount: 'Up to 25,000.00', level: 'Undergraduate',
    description: 'An innovative funding program designed to heavily subsidize tuition and living expenses for students creating impactful tech innovations.',
    allowance: '₱25,000.00 / Semester'
  },
];

const requiredDocsList = ['School ID:', 'Registration Form (RF)', 'Birth Certificate', 'Recent 2x2 Photo'];

export default function StudentDashboard() {
  const getBadgeColor = (status) => {
    if (status === 'Ongoing') return 'yellow';
    if (status === 'Open') return 'green';
    if (status === 'Closed') return 'red';
    return 'gray';
  };

  const currentStatus = 'Under Review'; 
  const statusConfig = {
    'Submitted': { color: 'blue', progress: 33, text: 'Step 1 of 3: Application Received' },
    'Under Review': { color: 'purple', progress: 66, text: 'Step 2 of 3: Admin Evaluation' },
    'Accepted': { color: 'green', progress: 100, text: 'Step 3 of 3: Grant Awarded!' },
  };
  const activeConfig = statusConfig[currentStatus] || statusConfig['Submitted'];

  // Modal State Management
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const [modalStep, setModalStep] = useState(0); 
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- NEW: Step 1 Validations (Student Information) ---
  const [studentInfo, setStudentInfo] = useState({
    fullName: '',
    studentId: '',
    academicYear: ''
  });

  const handleStudentInfoChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  // Checks if all Step 1 fields are filled
  const isStep1Valid = 
    studentInfo.fullName.trim() !== '' && 
    studentInfo.studentId.trim() !== '' && 
    studentInfo.academicYear.trim() !== '';

  // Step 2 Validations
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [isCertified, setIsCertified] = useState(false);

  const isStep2Valid = requiredDocsList.every(doc => uploadedDocs[doc]) && isCertified;

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
      // Reset ALL forms on close
      setStudentInfo({ fullName: '', studentId: '', academicYear: '' });
      setUploadedDocs({});
      setIsCertified(false);
    }, 300);
  };

  return (
    <DashboardLayout role="student" userName="Taylor Swift" userDetail="00000000000">
      <Heading size={{ base: 'md', md: 'lg' }} mb={2} color="gray.700">Welcome back, Taylor!</Heading>
      <Text color="gray.500" mb={8} fontSize={{ base: 'sm', md: 'md' }}>Here is your grant status and available scholarships.</Text>

      <Flex gap={6} direction={{ base: 'column', md: 'row' }} mb={8}>
        <Box flex={1} bg="white" shadow="sm" borderRadius="md" p={6} borderTop="4px solid" borderColor={`${activeConfig.color}.400`}>
          <Text fontWeight="bold" fontSize="lg" mb={4}>My Application Status</Text>
          <Text fontSize="2xl" color={`${activeConfig.color}.500`} fontWeight="900" mb={2}>{currentStatus}</Text>
          <Progress value={activeConfig.progress} colorScheme={activeConfig.color} size="sm" borderRadius="full" mb={2} />
          <Text fontSize="xs" color="gray.500">{activeConfig.text}</Text>
        </Box>

        <Box flex={1} bg="blue.50" shadow="sm" borderRadius="md" p={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2} color="blue.800">Latest Update</Text>
          <Text fontSize="sm" color="blue.600">Please make sure all your required documents are submitted before the November 1st deadline.</Text>
        </Box>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
        {scholarshipsData.map((scholarship) => (
          <Box key={scholarship.id} bg="#1a4e6e" borderRadius="xl" overflow="hidden" color="white" boxShadow="md" display="flex" flexDirection="column">
            <Flex justify="space-between" align="center" p={4} pb={2}>
              <Text fontWeight="bold" fontSize="lg">{scholarship.title}</Text>
              <Badge colorScheme={getBadgeColor(scholarship.status)} borderRadius="full" px={2} textTransform="capitalize">
                {scholarship.status}
              </Badge>
            </Flex>
            <Box px={4} py={2}>
              <Box w="full" h="120px" bg="whiteAlpha.300" borderRadius="md" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
                <Image src="/scholarship.jpg" alt="application" objectFit="cover" fallbackSrc="https://via.placeholder.com/400x150/0b1d2e/ffffff?text=SCHOLARSHIP+APPLICATION" />
              </Box>
            </Box>
            <VStack align="start" px={5} py={3} spacing={2} fontSize="sm" flex={1}>
              <Flex align="center"><Icon as={FaRegCalendarAlt} mr={3} /><Text>Deadline: <Text as="span" fontWeight="bold">{scholarship.deadline}</Text></Text></Flex>
              <Flex align="center"><Icon as={FaRegCheckSquare} mr={3} /><Text>{scholarship.amount}</Text></Flex>
              <Flex align="center"><Icon as={FaUserGraduate} mr={3} /><Text>{scholarship.level}</Text></Flex>
            </VStack>
            <Box p={4} mt="auto">
              <Button 
                w="full" 
                bg="white" 
                color="#1a4e6e" 
                borderRadius="full" 
                _hover={{ bg: 'gray.100' }}
                onClick={() => handleApplyClick(scholarship)}
              >
                View Details
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        isCentered 
        size={modalStep === 3 ? "sm" : "xl"}
        preserveScrollBarGap
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.400" />
        <ModalContent borderRadius="xl" overflow="hidden">
          
          {modalStep !== 3 && (
            <ModalHeader color="blue.900" borderBottom="1px solid" borderColor="gray.100" pb={3}>
              {modalStep === 0 ? "Scholarship Details" : (modalStep === 1 ? "Student Information" : "Upload Requirements")}
            </ModalHeader>
          )}
          {modalStep !== 3 && <ModalCloseButton />}

          <ModalBody py={6}>
            
            {modalStep === 0 && selectedScholarship && (
              <Box>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md" color="blue.900">{selectedScholarship.title}</Heading>
                  <Badge colorScheme={getBadgeColor(selectedScholarship.status)} size="lg" px={3} py={1} borderRadius="md">
                    {selectedScholarship.status}
                  </Badge>
                </Flex>
                
                <Box bg="blue.50" p={4} borderRadius="md" mb={6}>
                  <Flex align="flex-start">
                    <Icon as={FaInfoCircle} color="blue.600" mt={1} mr={3} />
                    <Text fontSize="sm" color="blue.900" lineHeight="1.6">
                      {selectedScholarship.description}
                    </Text>
                  </Flex>
                </Box>

                <SimpleGrid columns={2} spacing={4} bg="gray.50" p={5} borderRadius="md" border="1px solid" borderColor="gray.100" mb={2}>
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" mb={1}>Semesterly Allowance</Text>
                    <Text fontSize="lg" fontWeight="900" color="green.600">{selectedScholarship.allowance}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" mb={1}>Application Deadline</Text>
                    <Text fontSize="md" fontWeight="bold" color="red.500">{selectedScholarship.deadline}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" mb={1}>Eligible Level</Text>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">{selectedScholarship.level}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" mb={1}>Maximum Amount</Text>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">{selectedScholarship.amount}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
            )}

            {/* --- UPDATED STEP 1: Required Student Information --- */}
            {/* --- UPDATED STEP 1: Required Student Information --- */}
            {modalStep === 1 && (
              <Box>
                <Heading size="sm" color="blue.900" mb={4}>Required Details</Heading>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontSize="xs" color="blue.900" mb={1}>Full Name:</FormLabel>
                    <Input 
                      name="fullName"
                      value={studentInfo.fullName}
                      onChange={handleStudentInfoChange}
                      size="sm" borderRadius="md" bg="gray.50" placeholder="e.g., Taylor Swift" 
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="xs" color="blue.900" mb={1}>Student ID:</FormLabel>
                    <Input 
                      name="studentId"
                      value={studentInfo.studentId}
                      onChange={handleStudentInfoChange}
                      size="sm" borderRadius="md" bg="gray.50" placeholder="e.g., 2024-00123" 
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="xs" color="blue.900" mb={1}>Academic Year:</FormLabel>
                    <Input 
                      name="academicYear"
                      value={studentInfo.academicYear}
                      onChange={handleStudentInfoChange}
                      size="sm" borderRadius="md" bg="gray.50" placeholder="e.g., 2024-2025" 
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="xs" color="blue.900" mb={1}>Scholarship Program:</FormLabel>
                    <Input size="sm" borderRadius="md" bg="gray.100" color="gray.600" value={selectedScholarship?.title || ''} isReadOnly />
                  </FormControl>
                </SimpleGrid>
              </Box>
            )}

            {modalStep === 2 && (
              <Box>
                <Heading size="sm" color="blue.900" mb={4}>Required Documents</Heading>
                <SimpleGrid columns={2} spacing={4} mb={4}>
                  {requiredDocsList.map((doc, i) => (
                    <FormControl key={i} isRequired>
                      <FormLabel fontSize="xs" color="blue.900" mb={1}>{doc}</FormLabel>
                      <InputGroup size="sm">
                        <Input 
                          type="file" 
                          opacity={0} position="absolute" w="full" h="full" cursor="pointer" zIndex={2} 
                          onChange={(e) => {
                            if (e.target.files.length > 0) {
                              setUploadedDocs(prev => ({ ...prev, [doc]: e.target.files[0].name }));
                            }
                          }}
                        />
                        <Input 
                          placeholder={uploadedDocs[doc] || "Upload Document"} 
                          bg="gray.100" 
                          borderRadius="md" 
                          readOnly 
                          color={uploadedDocs[doc] ? "blue.700" : "gray.500"}
                          fontWeight={uploadedDocs[doc] ? "bold" : "normal"}
                          _placeholder={{ color: uploadedDocs[doc] ? 'blue.700' : 'gray.400' }} 
                        />
                        <InputLeftElement pointerEvents="none" right={0} left="auto" px={3} zIndex={1}>
                          <Icon as={FaFolder} color={uploadedDocs[doc] ? "green.500" : "blue.700"} />
                        </InputLeftElement>
                      </InputGroup>
                    </FormControl>
                  ))}
                </SimpleGrid>

                <FormControl mb={4}>
                  <FormLabel fontSize="xs" color="blue.900" mb={1}>Remarks (Optional)</FormLabel>
                  <Textarea 
                    placeholder="Any additional notes regarding your submission..." 
                    size="sm" bg="gray.100" borderRadius="md" border="none" rows={4}
                  />
                </FormControl>

                <Checkbox 
                  colorScheme="blue" size="sm" alignItems="flex-start"
                  isChecked={isCertified}
                  onChange={(e) => setIsCertified(e.target.checked)}
                >
                  <Text fontSize="xs" color="gray.600" mt="-1px">
                    I certify that all uploaded documents are true and correct. I understand that submitting false information may lead to disqualification.
                  </Text>
                </Checkbox>
              </Box>
            )}

            {modalStep === 3 && (
              <VStack textAlign="center" spacing={4} py={6}>
                <Icon as={FaCheckCircle} w={16} h={16} color="green.400" />
                <Heading size="md" color="blue.900">Application Submitted Successfully</Heading>
                <Text fontSize="sm" color="gray.500">
                  Your documents have been successfully submitted!
                </Text>
              </VStack>
            )}

          </ModalBody>

          {modalStep !== 3 && (
            <ModalFooter borderTop="1px solid" borderColor="gray.100" pt={4} pb={6}>
              {modalStep === 0 && (
                <Button 
                  bg="blue.700" color="white" _hover={{ bg: 'blue.800' }} 
                  onClick={handleProceedToApply} w="full"
                  isDisabled={selectedScholarship?.status === 'Closed'}
                >
                  {selectedScholarship?.status === 'Closed' ? 'Applications Closed' : 'Proceed to Apply'}
                </Button>
              )}
              {modalStep === 1 && (
                <Button 
                  bg="blue.700" color="white" _hover={{ bg: 'blue.800' }} 
                  onClick={handleNext} w="120px"
                  isDisabled={!isStep1Valid} // --- NEW: Disabled if fields are empty ---
                >
                  Next
                </Button>
              )}
              {modalStep === 2 && (
                <HStack spacing={3} justify="flex-end" w="full">
                  <Button variant="outline" colorScheme="blue" borderRadius="md" w="130px" isDisabled={isSubmitting}>
                    Save as Draft
                  </Button>
                  <Button 
                    bg="blue.700" color="white" _hover={{ bg: 'blue.800' }} 
                    borderRadius="md" w="130px" 
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    loadingText="Submitting..."
                    isDisabled={!isStep2Valid}
                  >
                    Submit
                  </Button>
                </HStack>
              )}
            </ModalFooter>
          )}

          {modalStep === 3 && (
            <ModalFooter pt={0} pb={8} justifyContent="center">
              <Button bg="blue.700" color="white" _hover={{ bg: 'blue.800' }} w="full" maxW="200px" onClick={handleCloseModal}>
                View Status
              </Button>
            </ModalFooter>
          )}
          
        </ModalContent>
      </Modal>

    </DashboardLayout>
  );
}