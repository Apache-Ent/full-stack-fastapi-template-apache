import React from "react"
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"
import { 
  FaHome, 
  FaCalendarAlt, 
  FaFileInvoiceDollar, 
  FaTools, 
  FaComments, 
  FaChartLine 
} from "react-icons/fa"

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  userType: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, userType }) => {
  return (
    <Box 
      p={6} 
      borderRadius="lg" 
      boxShadow="md" 
      bg="white" 
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
      height="100%"
    >
      <Flex direction="column" align="flex-start" height="100%">
        <Flex 
          w="60px" 
          h="60px" 
          bg={userType === "tenant" ? "blue.50" : "teal.50"} 
          color={userType === "tenant" ? "blue.500" : "teal.500"}
          borderRadius="full" 
          justify="center" 
          align="center" 
          mb={4}
        >
          <Icon as={icon} boxSize={6} />
        </Flex>
        <Heading as="h3" fontSize="xl" mb={3} fontWeight="bold">
          {title}
        </Heading>
        <Text color="gray.600" fontSize="md">
          {description}
        </Text>
      </Flex>
    </Box>
  )
}

const FeaturesSection: React.FC = () => {
  const tenantFeatures = [
    {
      icon: FaHome,
      title: "Property Browsing",
      description: "Browse available properties with detailed information, photos, and virtual tours.",
      userType: "tenant"
    },
    {
      icon: FaCalendarAlt,
      title: "Maintenance Scheduling",
      description: "Schedule maintenance requests and track their status in real-time.",
      userType: "tenant"
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Online Rent Payments",
      description: "Pay rent securely online and access payment history anytime.",
      userType: "tenant"
    }
  ]

  const agentFeatures = [
    {
      icon: FaTools,
      title: "Maintenance Management",
      description: "Track and manage maintenance requests efficiently with automated workflows.",
      userType: "agent"
    },
    {
      icon: FaComments,
      title: "Tenant Communication",
      description: "Communicate with tenants through a centralized messaging system.",
      userType: "agent"
    },
    {
      icon: FaChartLine,
      title: "Financial Reporting",
      description: "Generate comprehensive financial reports and track property performance.",
      userType: "agent"
    }
  ]

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <Flex direction="column" align="center" mb={16}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }} 
            textAlign="center"
            mb={4}
          >
            Features for Everyone
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            textAlign="center" 
            maxW="800px" 
            color="gray.600"
          >
            Our platform offers powerful tools for both tenants and property managers
          </Text>
        </Flex>

        <Box mb={16}>
          <Heading 
            as="h3" 
            fontSize={{ base: "xl", md: "2xl" }} 
            mb={8} 
            color="blue.600"
            textAlign={{ base: "center", md: "left" }}
          >
            For Tenants
          </Heading>
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
            gap={8}
          >
            {tenantFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </Grid>
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
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
            gap={8}
          >
            {agentFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default FeaturesSection 