import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Text, Heading, Button, Image, Container, SimpleGrid, VStack, HStack, Icon, Link as ChakraLink, Badge, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt, FaRegCheckSquare, FaUserGraduate, FaFileAlt, FaRocket, FaChartLine, FaEye, FaDatabase, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Re-using data from student dashboard for consistency
import { scholarshipsData } from './student/Dashboard';
import scholarshipImg from './scholarship.jpg';
import students1Img from './students1.png';
import students2Img from './students2.png';
import students4Img from './students4.png';

const getBadgeColor = (status) => {
    if (status === 'Ongoing') return 'yellow';
    if (status === 'Open') return 'green';
    if (status === 'Closed') return 'red';
    return 'gray';
};

// --- Buttery Smooth Transition Settings ---
const smoothEase = [0.16, 1, 0.3, 1]; 
const defaultDuration = 1; 

const slideUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: defaultDuration, ease: smoothEase }
};

const slideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: defaultDuration, ease: smoothEase }
};

const slideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: defaultDuration, ease: smoothEase }
};

const smoothTransition = "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease";

// --- COMPONENTS FOR SECTIONS ---

// 1. Navigation Bar 
const Navbar = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  
  // Dark Mode Hook
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue('brand.darkBlue', 'gray.900');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'scholarships', 'about', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section;
          }
        }
      }

      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const rect = contactElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 50) {
          currentSection = 'contact';
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <Flex as={motion.nav} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: smoothEase }} align="center" justify="space-between" wrap="wrap" padding="1rem 2rem" bg={navBg} color="white" position="fixed" w="100%" zIndex={100} shadow="md" css={{ transition: smoothTransition }}>
      <Flex align="center" mr={5} cursor="pointer" onClick={() => scrollToSection('home')}>
        <Image src="/granttracklogo.png" h="30px" mr={3} fallbackSrc="https://via.placeholder.com/30/ffffff?text=G" />
        <Heading as="h1" size="md" letterSpacing={'tighter'}>GrantTrack</Heading>
      </Flex>

      <HStack spacing={8} display={{ base: 'none', md: 'flex' }} fontSize="sm" fontWeight="500">
        {navLinks.map((link) => (
          <ChakraLink 
            key={link.id} href={`#${link.id}`} color={activeSection === link.id ? 'blue.300' : 'white'}
            fontWeight={activeSection === link.id ? 'bold' : '500'}
            pb={1} transition="all 0.2s ease-in-out" _hover={{ textDecoration: 'none', color: 'blue.300' }}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} 
          >
            {link.label}
          </ChakraLink>
        ))}
      </HStack>

      <Flex align="center" gap={2}>
        {/* --- DARK MODE TOGGLE (SINGLE ICON) --- */}
        <IconButton 
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} 
          onClick={toggleColorMode} 
          variant="ghost" 
          color={colorMode === 'light' ? 'white' : 'orange.300'} 
          _hover={{ bg: 'whiteAlpha.200' }} 
          aria-label="Toggle Dark Mode"
          mr={2}
          fontSize="lg"
          transition="all 0.3s"
        />

        <Button bg="brand.mediumBlue" color="white" size="sm" px={{ base: 4, md: 6 }} _hover={{ bg: 'blue.600' }} onClick={() => navigate('/login')}>
          Login
        </Button>
        <IconButton display={{ base: 'flex', md: 'none' }} icon={<Icon as={FaBars} />} onClick={onOpen} variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200' }} aria-label="Open Menu" />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={navBg} color="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.200">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="start" mt={6}>
              {navLinks.map((link) => (
                <ChakraLink key={link.id} href={`#${link.id}`} fontSize="lg" fontWeight={activeSection === link.id ? 'bold' : '500'} color={activeSection === link.id ? 'blue.300' : 'white'}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); onClose(); }}
                >
                  {link.label}
                </ChakraLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

// 2. Hero Section
const Hero = () => {
  const headingColor = useColorModeValue('brand.darkBlue', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const btnBg = useColorModeValue('brand.darkBlue', 'blue.500');
  const btnHover = useColorModeValue('brand.mediumBlue', 'blue.600');

  return (
    <Container maxW="7xl" pt={{ base: 28, md: 40 }} pb={{ base: 12, md: 20 }} id="home">
      <Flex align="center" direction={{ base: 'column-reverse', md: 'row' }} textAlign={{ base: 'center', md: 'left' }}>
        
        <Box as={motion.div} {...slideLeft} flex={1} pr={{ md: 10 }}>
          <Heading as="h1" size={{ base: 'xl', md: '2xl' }} fontWeight="900" lineHeight="1.2" mb={6} color={headingColor} transition={smoothTransition}>
            Empowering Students Through Scholarship Opportunities
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} mb={8} transition={smoothTransition}>
            Access verified scholarship programs, submit your application online, and track your progress in real time — all in one secure platform.
          </Text>
          <HStack spacing={4} justify={{ base: 'center', md: 'flex-start' }}>
            <Button size="lg" bg={btnBg} color="white" px={{ base: 6, md: 8 }} _hover={{ bg: btnHover }}>Apply Now</Button>
            <Button size="lg" variant="outline" colorScheme="blue" px={{ base: 6, md: 8 }}>More</Button>
          </HStack>
        </Box>

        <Box as={motion.div} {...slideRight} flex={1} mb={{ base: 10, md: 0 }}>
          <Image src={students1Img} alt="Students studying" fallbackSrc="https://via.placeholder.com/600x400?text=Illustration+of+Students+and+Books" w="full" maxW={{ base: '400px', md: 'full' }} mx="auto" />
        </Box>

      </Flex>
    </Container>
  );
};

// 3. Discover Scholarships Section
const Discover = () => {
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('brand.darkBlue', 'white');
  
  // --- ATTENTION GRABBING DARK MODE COLORS ---
  const cardBg = useColorModeValue('brand.mediumBlue', '#1a4e6e'); // Rich navy blue in dark mode
  const cardBorder = useColorModeValue('transparent', '#2c7aab'); // Subtle glowing border in dark mode
  const cardShadow = useColorModeValue('lg', 'dark-lg');
  
  const btnBg = useColorModeValue('white', 'blue.300'); // Popping light blue button in dark mode
  const btnColor = useColorModeValue('brand.mediumBlue', '#1a4e6e'); // Dark text on light blue button
  const btnHoverBg = useColorModeValue('gray.100', 'blue.200');

  return (
    <Box bg={sectionBg} py={20} id="scholarships" overflow="hidden" transition={smoothTransition}>
      <Container maxW="7xl">
        <Heading as={motion.h2} {...slideUp} size={{ base: 'lg', md: 'xl' }} mb={12} color={headingColor} textAlign={{ base: 'center', md: 'left' }} transition={smoothTransition}>
          Discover Scholarship Program
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {scholarshipsData.map((scholarship, index) => (
             <Box 
               as={motion.div} 
               key={scholarship.id}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.8, ease: smoothEase, delay: index * 0.15 }}
               bg={cardBg} 
               borderRadius="xl" 
               overflow="hidden" 
               color="white" 
               boxShadow={cardShadow} 
               border="1px solid"
               borderColor={cardBorder}
               display="flex" 
               flexDirection="column"
               _hover={{ transform: 'translateY(-5px)', shadow: '2xl', borderColor: 'blue.300' }}
               css={{ transition: smoothTransition }}
             >
               <Flex justify="space-between" align="center" p={4} pb={2}>
                 <Text fontWeight="bold" fontSize="lg">{scholarship.title}</Text>
                 <Badge colorScheme={getBadgeColor(scholarship.status)} borderRadius="full" px={2} textTransform="capitalize">{scholarship.status}</Badge>
               </Flex>
                <Box px={4} py={2}>
                 <Box w="full" h="140px" bg="whiteAlpha.300" borderRadius="md" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
                   <Image src={scholarshipImg} alt="application" objectFit="cover" fallbackSrc="https://via.placeholder.com/400x150/0b1d2e/ffffff?text=SCHOLARSHIP+APPLICATION" />
                 </Box>
               </Box>
               <VStack align="start" px={5} py={3} spacing={2} fontSize="sm" flex={1}>
                 <Flex align="center"><Icon as={FaRegCalendarAlt} mr={3} /><Text>Deadline: <Text as="span" fontWeight="bold">{scholarship.deadline}</Text></Text></Flex>
                 <Flex align="center"><Icon as={FaRegCheckSquare} mr={3} /><Text>{scholarship.amount}</Text></Flex>
                 <Flex align="center"><Icon as={FaUserGraduate} mr={3} /><Text>{scholarship.level}</Text></Flex>
               </VStack>
               <Box p={4} mt="auto">
                 <Button w="full" bg={btnBg} color={btnColor} fontWeight="bold" borderRadius="full" _hover={{ bg: btnHoverBg }} transition={smoothTransition}>Read More</Button>
               </Box>
             </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Feature Component
const Feature = ({ icon, title, text, delay = 0 }) => (
  <VStack 
    as={motion.div} 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, ease: smoothEase, delay: delay }}
    align={{ base: 'center', md: 'start' }} 
    spacing={3} 
    textAlign={{ base: 'center', md: 'left' }}
  >
    <Heading as="h4" size="md">{title}</Heading>
    <Text fontSize="sm" color="gray.200" lineHeight="1.6">{text}</Text>
  </VStack>
);

// 4. About Us & Features Section
const AboutAndFeatures = () => {
  const outerBg = useColorModeValue('brand.mediumBlue', 'gray.900');
  const innerBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('brand.darkBlue', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box id="about" bg={outerBg} overflow="hidden" transition={smoothTransition}>
      <Box 
        as={motion.div} {...slideUp}
        bg={innerBg} pt={{ base: 16, md: 20 }} pb={{ base: 24, md: 32 }} textAlign="center" position="relative" zIndex={2} borderBottomRadius={{ base: '50% 40px', md: '50% 120px' }} 
        transition={smoothTransition}
      >
        <Container maxW="4xl">
          <Heading as="h2" size={{ base: 'xl', md: '2xl' }} mb={4} color={headingColor} transition={smoothTransition}>About Us</Heading>
          <Text color={textColor} fontSize={{ base: 'md', md: 'lg' }} transition={smoothTransition}>
            Helps students easily discover scholarships, apply online, and track their application status, while providing administrators a simple way to manage and organize programs efficiently.
          </Text>
        </Container>
      </Box>

      <Box position="relative" color="white" pt={{ base: 16, md: 24 }} pb={{ base: 32, md: 48 }} zIndex={1}>
        <Container maxW="6xl">
          <Heading as={motion.h3} {...slideUp} size={{ base: 'xl', md: '2xl' }} mb={{ base: 12, md: 20 }} textAlign="center" fontStyle="italic">What You Can Enjoy</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacingY={12} spacingX={16} mb={16}>
            <Feature delay={0} title="Reduced Paperwork" text="Minimizes manual forms by moving the process online." />
            <Feature delay={0.15} title="Faster Application Processing" text="Speeds up submission and review to reduce waiting time." />
            <Feature delay={0.3} title="Real-Time Status Tracking" text="Lets users monitor application progress instantly." />
          </SimpleGrid>
          <Flex justify="center" gap={{ base: 12, md: 32 }} direction={{ base: 'column', md: 'row' }}>
            <Box maxW={{ base: '100%', md: '280px' }}>
              <Feature delay={0.45} title="Improved Transparency" text="Provides clear visibility of application updates and decisions." />
            </Box>
            <Box maxW={{ base: '100%', md: '280px' }}>
              <Feature delay={0.6} title="Better Data Organization" text="Keeps records structured and easy to manage." />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

// 5. Mission & Vision Section
const MissionVision = () => {
  const sectionBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('brand.darkBlue', 'white');
  const cardBg = useColorModeValue('#1B4965', 'gray.700');

  return (
    <Box 
      bg={sectionBg} pt={{ base: 24, md: 40 }} pb={20} mt={{ base: "-80px", md: "-150px" }} borderTopRadius={{ base: '50% 40px', md: '50% 150px' }} position="relative" zIndex={2} overflow="hidden"
      transition={smoothTransition}
    >
      <Container maxW="5xl">
        <Heading as={motion.h2} {...slideUp} size={{ base: 'xl', md: '2xl' }} mb={20} textAlign="center" color={headingColor} transition={smoothTransition}>Mission & Vision</Heading>
        
        <VStack spacing={24}>
          {/* Mission (Text Left, Image Right) */}
          <Flex direction={{ base: 'column', md: 'row' }} align="center" position="relative" w="full">
            <Box 
              as={motion.div} {...slideLeft} 
              bg={cardBg} 
              color="white" p={{ base: 8, md: 12 }} 
              pr={{ base: 8, md: 24 }} 
              borderRadius="2xl" 
              position="relative" w={{ base: 'full', md: '60%' }} 
              zIndex={1} boxShadow="lg"
              mr={{ md: '-10%' }} 
              transition={smoothTransition}
            >
               <Icon as={FaRocket} boxSize={10} color="blue.300" mb={4} />
               <Heading size="lg" mb={4}>Our Mission</Heading>
               <Text fontSize={{ base: 'sm', md: 'lg' }} lineHeight="1.8">
                 To provide a seamless, efficient, and transparent platform that empowers students to access scholarship opportunities while enabling administrators to manage programs effectively.
               </Text>
            </Box>
            <Box as={motion.div} {...slideRight} w={{ base: 'full', md: '55%' }} zIndex={2} mt={{ base: 8, md: 0 }}>
               <Image src={students2Img} alt="Mission Illustration" fallbackSrc="https://via.placeholder.com/600x400?text=Mission+Illustration" w="full" dropShadow="2xl" />
            </Box>
          </Flex>

          {/* Vision (Image Left, Text Right) */}
          <Flex direction={{ base: 'column-reverse', md: 'row' }} align="center" position="relative" w="full">
            <Box as={motion.div} {...slideLeft} w={{ base: 'full', md: '55%' }} zIndex={2} mt={{ base: 8, md: 0 }}>
               <Image src={students4Img} alt="Vision Illustration" fallbackSrc="https://via.placeholder.com/600x400?text=Vision+Illustration" w="full" dropShadow="2xl" />
            </Box>
            <Box 
              as={motion.div} {...slideRight} 
              bg={cardBg} 
              color="white" p={{ base: 8, md: 12 }} 
              pl={{ base: 8, md: 24 }} 
              borderRadius="2xl" 
              position="relative" w={{ base: 'full', md: '60%' }} 
              zIndex={1} boxShadow="lg"
              ml={{ md: '-10%' }} 
              transition={smoothTransition}
            >
               <Icon as={FaEye} boxSize={10} color="blue.300" mb={4} />
               <Heading size="lg" mb={4}>Our Vision</Heading>
               <Text fontSize={{ base: 'sm', md: 'lg' }} lineHeight="1.8">
                 To become the leading digital solution for scholarship management, ensuring that every deserving student has equal access to educational opportunities.
               </Text>
            </Box>
          </Flex>
        </VStack>

      </Container>
    </Box>
  );
};

// 6. Footer Section
const Footer = () => {
  const footerBg = useColorModeValue('brand.darkBlue', 'gray.900');
  return (
    <Box bg={footerBg} color="gray.300" pt={16} pb={8} id="contact" as={motion.footer} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut" }}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10} textAlign={{ base: 'center', md: 'left' }}>
          <VStack align={{ base: 'center', md: 'start' }} spacing={4}>
            <Flex align="center">
              <Image src="/granttracklogo.png" h="24px" mr={3} fallbackSrc="https://via.placeholder.com/24/ffffff?text=G" />
              <Heading as="h4" size="md" color="white">GrantTrack</Heading>
            </Flex>
            <Text fontSize="sm">
              Streamlining scholarships to save time, reduce paperwork, and support student success. Empowering students and institutions with a faster, smarter, and more transparent application experience.
            </Text>
            <HStack spacing={4}>
              <Icon as={FaFacebook} w={5} h={5} cursor="pointer" _hover={{ color: 'white', transform: 'scale(1.2)' }} transition="all 0.2s" />
              <Icon as={FaInstagram} w={5} h={5} cursor="pointer" _hover={{ color: 'white', transform: 'scale(1.2)' }} transition="all 0.2s" />
              <Icon as={FaTwitter} w={5} h={5} cursor="pointer" _hover={{ color: 'white', transform: 'scale(1.2)' }} transition="all 0.2s" />
              <Icon as={FaLinkedin} w={5} h={5} cursor="pointer" _hover={{ color: 'white', transform: 'scale(1.2)' }} transition="all 0.2s" />
            </HStack>
          </VStack>

          <VStack align={{ base: 'center', md: 'start' }} spacing={4} pl={{ md: 10 }}>
            <Heading as="h5" size="sm" color="white">Support</Heading>
            <VStack align={{ base: 'center', md: 'start' }} spacing={2} fontSize="sm">
              <Text>Email: info@granttrack.com</Text>
              <Text>Phone: +63 XXX XXX XXXX</Text>
              <Text>Location: Philippines</Text>
            </VStack>
          </VStack>

          <VStack align={{ base: 'center', md: 'start' }} spacing={4}>
            <Heading as="h5" size="sm" color="white">Legal</Heading>
            <VStack align={{ base: 'center', md: 'start' }} spacing={2} fontSize="sm">
              <ChakraLink _hover={{ color: 'white' }}>Privacy Policy</ChakraLink>
              <ChakraLink _hover={{ color: 'white' }}>Terms of Services</ChakraLink>
              <ChakraLink _hover={{ color: 'white' }}>Cookie Policy</ChakraLink>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Box borderTop="1px solid" borderColor="whiteAlpha.200" pt={8} textAlign="center">
          <Text fontSize="xs">© 2026 GrantTrack. All right reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default function LandingPage() {
  const pageBg = useColorModeValue('white', 'gray.800');
  return (
    <Box bg={pageBg} minH="100vh" scrollBehavior="smooth" transition={smoothTransition}>
      <Navbar />
      <Hero />
      <Discover />
      <AboutAndFeatures />
      <MissionVision />
      <Footer />
    </Box>
  );
}