// src/pages/Login.js (or wherever your main login/register logic lives)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Link,
  FormControl,
  FormLabel,
  Image,
  VStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaUserGraduate,
  FaUserShield,
  FaBuilding,
} from "react-icons/fa";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
  const [role, setRole] = useState("student"); // 'student', 'admin', 'organization'

  // NEW DYNAMIC INPUT TRACKING
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Unified dynamic inputs for login vs register
  const loginLabel =
    role === "organization"
      ? "Organization Email"
      : "GrantTrack Email/Username";

  // Configuration for dynamic styling based on the selected role
  const roleConfig = {
    student: {
      bg: "brand.studentBg", // Ensure this exists in your Chakra theme, or fallback to a hex if needed
      btnBg: "#0b1d2e",
      icon: FaUserGraduate,
    },
    admin: {
      bg: "brand.adminBg",
      btnBg: "#1a4e6e",
      icon: FaUserShield,
    },
    organization: {
      bg: "#1A3263",
      btnBg: "#42686a",
      icon: FaBuilding,
    },
  };

  const currentTheme = roleConfig[role];

  // Modified validation check for migration
  const isFormValid = isRegistering
    ? firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    : email.trim() !== "" && password.trim() !== "";

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear old errors

    if (!isFormValid) return;

    const endpoint = isRegistering ? "/api/register" : "/api/login";
    const payload = isRegistering
      ? { firstName, lastName, email, password, role } // Send new structure during registration
      : { email, password, role }; // Standard login structure

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          // Success Registration - toggle back to login
          console.log("Registration Success:", data);
          setIsRegistering(false);
          setErrorMessage("Registration successful! Please login.");
        } else {
          // ==========================================================
          // --- Success Login - HANDLE NEW STRUCTURE & STORAGE ---
          // ==========================================================
          console.log("Login Success:", data);

          // EXTRACT AND SAVE SEPARATE DATA STRUCTURE TO LOCALSTORAGE
          const userFirstName = data.user.firstName || "";
          const userLastName = data.user.lastName || "";
          const userFullName = `${userFirstName} ${userLastName}`.trim();
          const userEmail = data.user.email || "";
          const userRole = data.user.role || "";

          // Storing dynamic name fields (preserved your existing logic)
          localStorage.setItem("userFirstName", userFirstName);
          localStorage.setItem("userLastName", userLastName);
          localStorage.setItem("userFullName", userFullName); // Combine for easy sidebar display
          localStorage.setItem("userId", userEmail); // Using email as display ID in image 1

          // Save role for Sidebar routing
          localStorage.setItem("userRole", userRole);

          // ✅ THIS IS THE NEW CRUCIAL LINE ✅
          // Saves the full user object (including the database _id) so StudentProfile.js can fetch it!
          localStorage.setItem("granttrack_user", JSON.stringify(data.user));

          // Route dynamically based on role (preserving organizational dashboard tweak)
          if (userRole === "organization") {
            navigate("/organization/dashboard");
          } else {
            navigate(`/${userRole}/dashboard`);
          }
        }
      } else {
        // Show error message from backend
        setErrorMessage(data.message || "Authentication failed. Try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Could not connect to the server.");
    }
  };

  return (
    <Flex minH="100vh" direction={{ base: "column", md: "row" }}>
      {/* Left Side - Logo / Mobile Header */}
      <Flex
        w={{ base: "100%", md: "50%" }}
        minH={{ base: "20vh", md: "100vh" }}
        bg="white"
        align="center"
        justify="center"
        position="relative"
        p={6}
      >
        <Button
          position="absolute"
          top={{ base: 4, md: 8 }}
          left={{ base: 4, md: 8 }}
          variant="ghost"
          color="gray.600"
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate("/")}
          size="sm"
        >
          Home
        </Button>

        {/* Brand Logo Layout (preserved) */}
        <VStack spacing={4}>
          <Image
            src="/granttracklogo.png"
            h={{ base: "50px", md: "70px" }}
            fallbackSrc="https://via.placeholder.com/70/0b1d2e?text=G"
          />
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="900"
            color="gray.800"
            letterSpacing="tight"
          >
            GrantTrack
          </Text>
        </VStack>
      </Flex>

      {/* Right Side - Login/Register Form */}
      <Flex
        w={{ base: "100%", md: "50%" }}
        flex={1}
        bg={currentTheme.bg}
        align="center"
        justify="center"
        color="white"
        transition="background 0.3s ease"
        p={{ base: 6, md: 8, lg: 12 }}
      >
        <Box w="full" maxW="md">
          {/* USER TOGGLE (Login Portal Selection) */}
          {role !== "admin" ? (
            <Box mb={{ base: 8, md: 10 }}>
              <Text
                mb={3}
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wide"
                textAlign="center"
              >
                Portal: {role}
              </Text>
              <Flex
                bg="whiteAlpha.200"
                p={1}
                borderRadius="md"
                justify="space-between"
              >
                {["student", "organization"].map((r) => (
                  <Button
                    key={r}
                    flex={1}
                    size="sm"
                    variant="ghost"
                    bg={role === r ? "white" : "transparent"}
                    color={role === r ? "black" : "white"}
                    _hover={{ bg: role === r ? "white" : "whiteAlpha.300" }}
                    onClick={() => handleRoleChange(r)}
                    textTransform="capitalize"
                  >
                    {r}
                  </Button>
                ))}
              </Flex>
            </Box>
          ) : (
            <Box mb={{ base: 8, md: 10 }} textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="900"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                Administrator Portal
              </Text>
              <Text fontSize="sm" opacity={0.8} mt={2}>
                Authorized admin credentials required
              </Text>
            </Box>
          )}

          {/* Dynamic Icon Display */}
          <Flex justify="center" mb={8}>
            <Flex
              w={20}
              h={20}
              bg="whiteAlpha.200"
              borderRadius="full"
              align="center"
              justify="center"
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
              border="2px solid"
              borderColor="whiteAlpha.400"
              transition="all 0.3s ease"
            >
              <Icon as={currentTheme.icon} boxSize={8} color="white" />
            </Flex>
          </Flex>

          {/* Error Message Display */}
          {errorMessage && (
            <Box
              mb={4}
              p={3}
              bg="red.500"
              color="white"
              borderRadius="md"
              textAlign="center"
              fontSize="sm"
              fontWeight="bold"
            >
              {errorMessage}
            </Box>
          )}

          {/* Form */}
          <form onSubmit={handleAuth}>
            {/* NEW CONDITIONAL INPUTS FOR REGISTRATION PORTAL */}
            {isRegistering && (
              <Flex gap={4} mb={5}>
                <FormControl isRequired>
                  <FormLabel
                    fontSize="sm"
                    textTransform="uppercase"
                    opacity={0.9}
                  >
                    First Name
                  </FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    bg="white"
                    color="black"
                    borderRadius="md"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel
                    fontSize="sm"
                    textTransform="uppercase"
                    opacity={0.9}
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    bg="white"
                    color="black"
                    borderRadius="md"
                  />
                </FormControl>
              </Flex>
            )}

            <FormControl mb={5} isRequired>
              <FormLabel fontSize="sm" textTransform="uppercase" opacity={0.9}>
                {loginLabel}
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="white"
                color="black"
                borderRadius="md"
                size="lg"
              />
            </FormControl>

            <FormControl mb={8} isRequired>
              <FormLabel fontSize="sm" textTransform="uppercase" opacity={0.9}>
                Password
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="white"
                color="black"
                borderRadius="md"
                size="lg"
              />
            </FormControl>

            <Button
              type="submit"
              size="lg"
              w="full"
              bg={currentTheme.btnBg}
              color="white"
              transition="all 0.2s"
              mb={6}
              boxShadow="md"
              isDisabled={!isFormValid}
              _disabled={{ bg: "whiteAlpha.400", cursor: "not-allowed" }}
            >
              {isRegistering ? "Register Account" : "Sign In"}
            </Button>

            <VStack spacing={4} mt={6}>
              {/* Toggler between Login/Register */}
              <Text fontSize="sm" opacity={0.9}>
                {isRegistering ? "Already have an account?" : "No account yet?"}{" "}
                <Link
                  fontWeight="bold"
                  textDecoration="underline"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setErrorMessage("");
                  }}
                  _hover={{ color: "blue.200" }}
                >
                  {isRegistering ? "Sign In Here" : "Register Here"}
                </Link>
              </Text>

              <Divider borderColor="whiteAlpha.300" w="50%" />

              {/* Dynamic Footer admin portal logic preserved from turn 2 */}
              {role !== "admin" ? (
                <Text fontSize="sm" opacity={0.7}>
                  {" "}
                  Are you an admin? Click{" "}
                  <Link
                    fontWeight="bold"
                    onClick={() => handleRoleChange("admin")}
                    _hover={{ color: "blue.200" }}
                  >
                    here
                  </Link>
                </Text>
              ) : (
                <Text fontSize="sm" opacity={0.7}>
                  {" "}
                  Not an administrator?{" "}
                  <Link
                    fontWeight="bold"
                    onClick={() => handleRoleChange("student")}
                    _hover={{ color: "blue.200" }}
                  >
                    Back to User Login
                  </Link>
                </Text>
              )}
            </VStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}
