import React from "react"
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  Flex as VStack,
  Flex as HStack,
} from "@chakra-ui/react"
import { Button } from "../../components/ui/button"

const HeroSection: React.FC = () => {
  const imageHeight = useBreakpointValue({ base: "200px", md: "400px", lg: "500px" })
  
  return (
    <Box 
      bg="ui.main" 
      color="white" 
      py={{ base: 10, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <Flex 
          direction={{ base: "column", lg: "row" }} 
          align="center" 
          justify="space-between"
          gap={{ base: 8, lg: 12 }}
        >
          <VStack 
            direction="column" 
            gap={6} 
            maxW={{ base: "100%", lg: "50%" }} 
            zIndex={1} 
            align="flex-start"
          >
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Simplify Your Property Management Experience
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} opacity={0.9}>
              A comprehensive solution for property owners, agents, and tenants. 
              Streamline operations, improve communication, and enhance tenant satisfaction.
            </Text>
            <HStack 
              direction={{ base: "column", sm: "row" }} 
              gap={4} 
              pt={4} 
              flexWrap={{ base: "wrap", sm: "nowrap" }}
            >
              <Button 
                onClick={() => window.location.href = "/signup"}
                size="lg" 
                colorScheme="teal"
                bg="white" 
                color="ui.main"
                _hover={{ bg: "gray.100" }}
                fontWeight="bold"
              >
                Sign Up
              </Button>
              <Button 
                //onClick={() => window.location.href = "/signup?role=agent"}
                onClick={() => window.location.href = "/login"}
                size="lg" 
                variant="outline"
                borderColor="white"
                _hover={{ bg: "whiteAlpha.200" }}
                fontWeight="bold"
              >
                Login
              </Button>
            </HStack>
          </VStack>
          
          <Box 
            maxW={{ base: "100%", lg: "50%" }}
            h={imageHeight}
            position="relative"
            zIndex={1}
          >
            <Image
              src="/hero-property.jpg"
              alt="Modern property management"
              objectFit="cover"
              borderRadius="lg"
              boxShadow="xl"
              h="100%"
              w="100%"
            />
            <Box
              h="100%"
              w="100%"
              bg="gray.200"
              borderRadius="lg"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
            >
              {/* Placeholder gradient background */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bgGradient="linear(to-br, teal.400, blue.500)"
                opacity="0.8"
              />
              
              {/* Placeholder content */}
              <Flex
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                align="center"
                justify="center"
                direction="column"
                p={6}
                textAlign="center"
                color="white"
              >
                <Heading size="md" mb={2}>Modern Property Management</Heading>
                <Text fontSize="sm">Beautiful properties, happy tenants</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Container>
      
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="300px"
        h="300px"
        bg="whiteAlpha.100"
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-15%"
        left="-10%"
        w="400px"
        h="400px"
        bg="whiteAlpha.100"
        borderRadius="full"
        zIndex={0}
      />
    </Box>
  )
}

export default HeroSection 