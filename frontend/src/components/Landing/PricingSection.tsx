import React from "react"
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { Button } from "../../components/ui/button"

interface PricingPlanProps {
  title: string
  price: string
  description: string
  features: Array<{ text: string; included: boolean }>
  isPopular?: boolean
  userType: "tenant" | "agent"
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular, 
  userType 
}) => {
  return (
    <Box 
      p={8} 
      borderRadius="lg" 
      boxShadow={isPopular ? "xl" : "md"} 
      bg="white" 
      border="1px solid"
      borderColor={isPopular ? (userType === "tenant" ? "blue.400" : "teal.400") : "gray.200"}
      position="relative"
      transform={isPopular ? { md: "scale(1.05)" } : "none"}
      zIndex={isPopular ? 1 : 0}
      height="100%"
    >
      {isPopular && (
        <Box 
          position="absolute" 
          top="-4" 
          right="50%" 
          transform="translateX(50%)"
          bg={userType === "tenant" ? "blue.500" : "teal.500"}
          color="white"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="sm"
          fontWeight="bold"
        >
          Most Popular
        </Box>
      )}
      
      <Heading as="h3" fontSize="xl" mb={2} textAlign="center">
        {title}
      </Heading>
      
      <Text fontSize="sm" color="gray.500" mb={6} textAlign="center">
        {description}
      </Text>
      
      <Flex justify="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">
          {price}
        </Text>
        {price !== "Free" && (
          <Text alignSelf="flex-end" mb={1} ml={1} color="gray.500">
            /month
          </Text>
        )}
      </Flex>
      
      <Flex direction="column" gap={3} mb={8}>
        {features.map((feature, index) => (
          <Flex key={index} align="center">
            <Box 
              as={feature.included ? FaCheck : FaTimes} 
              color={feature.included 
                ? (userType === "tenant" ? "blue.500" : "teal.500") 
                : "gray.400"} 
              mr={2} 
            />
            <Text 
              color={feature.included ? "gray.700" : "gray.400"}
              fontSize="sm"
            >
              {feature.text}
            </Text>
          </Flex>
        ))}
      </Flex>
      
      <Button
        onClick={() => window.location.href = `/signup${userType === "agent" ? "?role=agent" : ""}`}
        width="100%"
        colorScheme={userType === "tenant" ? "blue" : "teal"}
        variant={isPopular ? "solid" : "outline"}
        size="lg"
      >
        Get Started
      </Button>
    </Box>
  )
}

const PricingSection: React.FC = () => {
  const tenantPlans = [
    {
      title: "Basic",
      price: "Free",
      description: "For individual tenants",
      features: [
        { text: "Property browsing", included: true },
        { text: "Maintenance requests", included: true },
        { text: "Online rent payments", included: true },
        { text: "Document storage", included: false },
        { text: "Tenant portal", included: false },
      ],
      userType: "tenant" as const
    },
    {
      title: "Premium",
      price: "$9.99",
      description: "For tenants who want more",
      features: [
        { text: "Property browsing", included: true },
        { text: "Maintenance requests", included: true },
        { text: "Online rent payments", included: true },
        { text: "Document storage", included: true },
        { text: "Tenant portal", included: true },
      ],
      isPopular: true,
      userType: "tenant" as const
    }
  ]

  const agentPlans = [
    {
      title: "Starter",
      price: "$29.99",
      description: "For small property managers",
      features: [
        { text: "Up to 10 properties", included: true },
        { text: "Maintenance management", included: true },
        { text: "Tenant communication", included: true },
        { text: "Financial reporting", included: false },
        { text: "Owner portal", included: false },
      ],
      userType: "agent" as const
    },
    {
      title: "Professional",
      price: "$59.99",
      description: "For growing property managers",
      features: [
        { text: "Up to 50 properties", included: true },
        { text: "Maintenance management", included: true },
        { text: "Tenant communication", included: true },
        { text: "Financial reporting", included: true },
        { text: "Owner portal", included: true },
      ],
      isPopular: true,
      userType: "agent" as const
    },
    {
      title: "Enterprise",
      price: "$99.99",
      description: "For large property managers",
      features: [
        { text: "Unlimited properties", included: true },
        { text: "Maintenance management", included: true },
        { text: "Tenant communication", included: true },
        { text: "Financial reporting", included: true },
        { text: "Owner portal", included: true },
      ],
      userType: "agent" as const
    }
  ]

  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <Flex direction="column" align="center" mb={16}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }} 
            textAlign="center"
            mb={4}
          >
            Simple, Transparent Pricing
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            textAlign="center" 
            maxW="800px" 
            color="gray.600"
          >
            Choose the plan that works best for you
          </Text>
        </Flex>

        <Box mb={20}>
          <Heading 
            as="h3" 
            fontSize={{ base: "xl", md: "2xl" }} 
            mb={8} 
            color="blue.600"
            textAlign={{ base: "center", md: "left" }}
          >
            For Tenants
          </Heading>
          <Flex 
            direction={{ base: "column", md: "row" }} 
            gap={8} 
            justify="center"
            mx="auto"
            maxW={{ base: "100%", md: "800px" }}
          >
            {tenantPlans.map((plan, index) => (
              <Box key={index} flex="1" width={{ base: "100%", md: "50%" }}>
                <PricingPlan {...plan} />
              </Box>
            ))}
          </Flex>
        </Box>

        <Box>
          <Heading 
            as="h3" 
            fontSize={{ base: "xl", md: "2xl" }} 
            mb={8} 
            color="teal.600"
            textAlign={{ base: "center", md: "left" }}
          >
            For Property Managers
          </Heading>
          <Flex 
            direction={{ base: "column", lg: "row" }} 
            gap={8} 
            justify="center"
          >
            {agentPlans.map((plan, index) => (
              <Box key={index} flex="1">
                <PricingPlan {...plan} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

export default PricingSection 