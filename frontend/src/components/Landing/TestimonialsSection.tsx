import React from "react"
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  Image,
} from "@chakra-ui/react"
import { FaQuoteLeft } from "react-icons/fa"

interface TestimonialProps {
  quote: string
  name: string
  role: string
  avatarUrl: string
  userType: "tenant" | "agent"
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, avatarUrl, userType }) => {
  return (
    <Box 
      p={8} 
      borderRadius="lg" 
      boxShadow="md" 
      bg="white" 
      position="relative"
      height="100%"
      borderTop="4px solid"
      borderColor={userType === "tenant" ? "blue.400" : "teal.400"}
    >
      <Icon 
        as={FaQuoteLeft} 
        position="absolute" 
        top={4} 
        left={4} 
        color={userType === "tenant" ? "blue.100" : "teal.100"} 
        boxSize={8} 
      />
      <Flex direction="column" pt={8}>
        <Text fontSize="md" mb={6} color="gray.600" fontStyle="italic">
          "{quote}"
        </Text>
        <Flex align="center" mt="auto">
          <Box 
            width="50px" 
            height="50px" 
            borderRadius="full" 
            overflow="hidden" 
            mr={4}
          >
            <Image 
              src={avatarUrl} 
              alt={name} 
              width="100%" 
              height="100%" 
              objectFit="cover" 
            />
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md">{name}</Text>
            <Text fontSize="sm" color="gray.500">{role}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "This platform has made renting so much easier. I can pay rent online, submit maintenance requests, and communicate with my property manager all in one place.",
      name: "Sarah Johnson",
      role: "Tenant",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      userType: "tenant" as const
    },
    {
      quote: "As a property manager, this system has streamlined our operations significantly. The financial reporting tools are particularly valuable for our business.",
      name: "Michael Rodriguez",
      role: "Property Manager",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      userType: "agent" as const
    },
    {
      quote: "I love how easy it is to schedule maintenance requests. The response time has improved dramatically since my building started using this platform.",
      name: "Emily Chen",
      role: "Tenant",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      userType: "tenant" as const
    }
  ]

  return (
    <Box py={20} bg="gray.100">
      <Container maxW="container.xl">
        <Flex direction="column" align="center" mb={16}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }} 
            textAlign="center"
            mb={4}
          >
            What Our Users Say
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            textAlign="center" 
            maxW="800px" 
            color="gray.600"
          >
            Hear from tenants and property managers who use our platform every day
          </Text>
        </Flex>

        <Flex 
          direction={{ base: "column", lg: "row" }} 
          gap={8} 
          justify="center"
        >
          {testimonials.map((testimonial, index) => (
            <Box key={index} flex="1" maxW={{ base: "100%", lg: "33%" }}>
              <Testimonial {...testimonial} />
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

export default TestimonialsSection 