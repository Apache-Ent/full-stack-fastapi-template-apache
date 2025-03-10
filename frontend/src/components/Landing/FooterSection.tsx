import React from "react"
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react"
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from "react-icons/fa"

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <Box bg="gray.900" color="white" py={16}>
      <Container maxW="container.xl">
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
          gap={8}
        >
          {/* Company Info */}
          <Box>
            <Heading as="h4" fontSize="xl" mb={4}>
              PropertyPro
            </Heading>
            <Text color="gray.400" mb={4}>
              Simplifying property management for tenants and agents alike.
            </Text>
            <Flex gap={4}>
              <Box as={FaFacebook} boxSize={5} cursor="pointer" _hover={{ color: "blue.400" }} />
              <Box as={FaTwitter} boxSize={5} cursor="pointer" _hover={{ color: "blue.400" }} />
              <Box as={FaInstagram} boxSize={5} cursor="pointer" _hover={{ color: "blue.400" }} />
              <Box as={FaLinkedin} boxSize={5} cursor="pointer" _hover={{ color: "blue.400" }} />
            </Flex>
          </Box>
          
          {/* Quick Links */}
          <Box>
            <Heading as="h4" fontSize="xl" mb={4}>
              Quick Links
            </Heading>
            <Flex direction="column" gap={2}>
              <Link href="/about" color="gray.400" _hover={{ color: "white" }}>About Us</Link>
              <Link href="/features" color="gray.400" _hover={{ color: "white" }}>Features</Link>
              <Link href="/pricing" color="gray.400" _hover={{ color: "white" }}>Pricing</Link>
              <Link href="/blog" color="gray.400" _hover={{ color: "white" }}>Blog</Link>
              <Link href="/contact" color="gray.400" _hover={{ color: "white" }}>Contact</Link>
            </Flex>
          </Box>
          
          {/* For Tenants & Agents */}
          <Box>
            <Heading as="h4" fontSize="xl" mb={4}>
              For Users
            </Heading>
            <Flex direction="column" gap={2}>
              <Link href="/signup" color="gray.400" _hover={{ color: "white" }}>Tenant Sign Up</Link>
              <Link href="/signup?role=agent" color="gray.400" _hover={{ color: "white" }}>Agent Sign Up</Link>
              <Link href="/login" color="gray.400" _hover={{ color: "white" }}>Login</Link>
              <Link href="/help" color="gray.400" _hover={{ color: "white" }}>Help Center</Link>
              <Link href="/faq" color="gray.400" _hover={{ color: "white" }}>FAQ</Link>
            </Flex>
          </Box>
          
          {/* Contact Info */}
          <Box>
            <Heading as="h4" fontSize="xl" mb={4}>
              Contact Us
            </Heading>
            <Flex direction="column" gap={4}>
              <Flex align="center">
                <Box as={FaMapMarkerAlt} mr={2} color="ui.main" />
                <Text color="gray.400">123 Property Street, Suite 100<br />San Francisco, CA 94107</Text>
              </Flex>
              <Flex align="center">
                <Box as={FaPhone} mr={2} color="ui.main" />
                <Link href="tel:+1-555-123-4567" color="gray.400" _hover={{ color: "white" }}>
                  +1 (555) 123-4567
                </Link>
              </Flex>
              <Flex align="center">
                <Box as={FaEnvelope} mr={2} color="ui.main" />
                <Link href="mailto:info@propertypro.com" color="gray.400" _hover={{ color: "white" }}>
                  info@propertypro.com
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Grid>
        
        <Box my={8} borderTopWidth="1px" borderColor="gray.700" />
        
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align={{ base: "center", md: "flex-start" }}
          gap={4}
        >
          <Text color="gray.500" textAlign={{ base: "center", md: "left" }}>
            &copy; {currentYear} PropertyPro. All rights reserved.
          </Text>
          <Flex gap={4} wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
            <Link href="/terms" color="gray.500" _hover={{ color: "white" }}>Terms of Service</Link>
            <Link href="/privacy" color="gray.500" _hover={{ color: "white" }}>Privacy Policy</Link>
            <Link href="/cookies" color="gray.500" _hover={{ color: "white" }}>Cookie Policy</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default FooterSection 