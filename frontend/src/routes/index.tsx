import React from "react"
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { FaChalkboardTeacher, FaComments, FaCreditCard, FaHistory } from "react-icons/fa"
import { MdFeedback, MdMedicalServices, MdSecurity } from "react-icons/md"

import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: LandingPage,
})

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
}

interface WorksCardProps {
  number: string
  title: string
  description: string
}

interface TestimonialCardProps {
  name: string
  role: string
  content: string
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  isPopular?: boolean
}

function LandingPage() {
  const highlightColor = "ui.main"

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="white" color="gray.800" py={20}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={10} alignItems="center">
            <GridItem>
              <Box display="flex" flexDirection="column" gap={6}>
                <Heading as="h1" size="2xl" fontWeight="bold">
                  Practice Makes Perfect: <Text as="span" color={highlightColor}>AI-Powered</Text> Patient Consultations
                </Heading>
                <Text fontSize="xl" color="gray.600">
                  Enhance your dietetic consultation skills with realistic AI patients. Get immediate feedback and improve your clinical practice.
                </Text>
                <Flex gap={4} pt={4}>
                  <Link to="/signup">
                    <Button
                      size="lg"
                      colorScheme="teal"
                      bg={highlightColor}
                      _hover={{ bg: "teal.600" }}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      borderColor={highlightColor}
                      color={highlightColor}
                    >
                      Log in
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </GridItem>
            <GridItem display={{ base: "none", lg: "block" }}>
              <Image
                src="/assets/images/hero-dietitian.jpg"
                alt="Dietitian consulting with patient"
                borderRadius="lg"
                boxShadow="xl"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <Box display="flex" flexDirection="column" gap={12}>
            <Box display="flex" flexDirection="column" gap={4} textAlign="center">
              <Heading as="h2" size="xl">
                Features That Make Learning Effective
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="container.md" mx="auto">
                Our platform provides student dietitians with all the tools they need to practice and perfect their consultation skills.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={10} w="full">
              <FeatureCard
                icon={FaChalkboardTeacher}
                title="Realistic Training"
                description="Practice with AI patients that have detailed medical backgrounds and realistic responses."
              />
              <FeatureCard
                icon={MdFeedback}
                title="Live Feedback"
                description="Receive immediate guidance and feedback during your consultations from our AI coach."
              />
              <FeatureCard
                icon={FaHistory}
                title="Session History"
                description="Review your past consultations and track your improvement over time."
              />
              <FeatureCard
                icon={MdSecurity}
                title="Secure Platform"
                description="Your data is protected with state-of-the-art security and privacy controls."
              />
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box py={20} bg="white">
        <Container maxW="container.xl">
          <Box display="flex" flexDirection="column" gap={12}>
            <Box display="flex" flexDirection="column" gap={4} textAlign="center">
              <Heading as="h2" size="xl">
                How It Works
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="container.md" mx="auto">
                Our streamlined process makes it easy to start practicing and improving your skills.
              </Text>
            </Box>

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              <WorksCard
                number="1"
                title="Create an Account"
                description="Sign up and get access to our platform's features and patient catalog."
              />
              <WorksCard
                number="2"
                title="Select a Patient"
                description="Choose from various patient profiles with different medical backgrounds."
              />
              <WorksCard
                number="3"
                title="Practice Consultation"
                description="Conduct your consultation with real-time feedback and guidance."
              />
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <Box display="flex" flexDirection="column" gap={12}>
            <Box display="flex" flexDirection="column" gap={4} textAlign="center">
              <Heading as="h2" size="xl">
                What Our Users Say
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="container.md" mx="auto">
                Hear from students who have improved their skills using our platform.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
              <TestimonialCard
                name="Emily Johnson"
                role="Dietetics Student, University of Melbourne"
                content="This platform has been invaluable for my clinical skills development. The AI patients respond just like real ones, and the feedback helped me identify areas I needed to improve."
              />
              <TestimonialCard
                name="Michael Chen"
                role="Nutrition Graduate Student, University of Sydney"
                content="Having access to this platform before my clinical placements made a huge difference. I felt much more confident in my first real consultations."
              />
              <TestimonialCard
                name="Sarah Williams"
                role="Dietetics Program Director, University of Queensland"
                content="We've incorporated this platform into our curriculum, and the results have been outstanding. Students are better prepared for their internships and clinical work."
              />
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      {/* Pricing */}
      <Box py={20} bg="white">
        <Container maxW="container.xl">
          <Box display="flex" flexDirection="column" gap={12}>
            <Box display="flex" flexDirection="column" gap={4} textAlign="center">
              <Heading as="h2" size="xl">
                Simple, Transparent Pricing
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="container.md" mx="auto">
                Choose the plan that works best for your learning journey.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
              <PricingCard
                title="Basic"
                price="$19"
                description="Perfect for getting started"
                features={[
                  "5 consultation credits",
                  "Basic patient profiles",
                  "Session history (30 days)",
                  "Standard feedback"
                ]}
                buttonText="Get Started"
              />
              <PricingCard
                title="Professional"
                price="$49"
                description="Ideal for regular practice"
                features={[
                  "15 consultation credits",
                  "Advanced patient profiles",
                  "Session history (90 days)",
                  "Enhanced feedback with metrics",
                  "Priority support"
                ]}
                buttonText="Best Value"
                isPopular
              />
              <PricingCard
                title="Educational"
                price="Custom"
                description="For universities and programs"
                features={[
                  "Bulk consultation credits",
                  "All patient profiles",
                  "Unlimited session history",
                  "Advanced analytics dashboard",
                  "Custom patient creation",
                  "Dedicated account manager"
                ]}
                buttonText="Contact Us"
              />
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="teal.500" color="white">
        <Container maxW="container.xl">
          <Box display="flex" flexDirection="column" gap={6} textAlign="center">
            <Heading as="h2" size="xl">
              Ready to Enhance Your Dietetic Skills?
            </Heading>
            <Text fontSize="lg" maxW="container.md" mx="auto">
              Join our platform today and start practicing with AI-powered patients designed to help you become a better dietitian.
            </Text>
            <Link to="/signup">
              <Button
                size="lg"
                colorScheme="white"
                variant="outline"
                _hover={{ bg: "whiteAlpha.200" }}
                mt={4}
                alignSelf="center"
                mx="auto"
                display="block"
              >
                Get Started Now
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={10} bg="gray.800" color="white">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }} gap={8}>
            <GridItem>
              <Box display="flex" flexDirection="column" gap={4} alignItems="flex-start">
                <Heading as="h3" size="md">
                  Dietitian Practice Platform
                </Heading>
                <Text>
                  Helping student dietitians practice and perfect their consultation skills with AI-powered patients.
                </Text>
                <Flex gap={4}>
                  <Box as={FaComments} boxSize={6} />
                  <Box as={FaCreditCard} boxSize={6} />
                  <Box as={MdMedicalServices} boxSize={6} />
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start">
                <Heading as="h3" size="sm">
                  Platform
                </Heading>
                <Link to="/">Home</Link>
                <Link to="/features">Features</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/testimonials">Testimonials</Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start">
                <Heading as="h3" size="sm">
                  Resources
                </Heading>
                <Link to="/blog">Blog</Link>
                <Link to="/support">Support</Link>
                <Link to="/faq">FAQ</Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start">
                <Heading as="h3" size="sm">
                  Company
                </Heading>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
              </Box>
            </GridItem>
          </Grid>
          <Box borderTop="1px solid" borderColor="gray.700" pt={8} mt={8}>
            <Text textAlign="center">
              © {new Date().getFullYear()} Dietitian Practice Platform. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Box bg="white" shadow="md" borderRadius="lg" border="1px solid" borderColor="gray.200" p={5}>
      <Box display="flex" flexDirection="column" gap={4} alignItems="flex-start">
        <Box as={icon} boxSize={10} color="ui.main" />
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text color="gray.600">{description}</Text>
      </Box>
    </Box>
  )
}

// How It Works Card Component
function WorksCard({ number, title, description }: WorksCardProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4} alignItems="center">
      <Flex
        align="center"
        justify="center"
        w={16}
        h={16}
        rounded="full"
        bg="ui.main"
        color="white"
        fontSize="2xl"
        fontWeight="bold"
      >
        {number}
      </Flex>
      <Heading as="h3" size="md" textAlign="center">
        {title}
      </Heading>
      <Text textAlign="center" color="gray.600">
        {description}
      </Text>
    </Box>
  )
}

// Testimonial Card Component
function TestimonialCard({ name, role, content }: TestimonialCardProps) {
  return (
    <Box bg="white" shadow="md" borderRadius="lg" border="1px solid" borderColor="gray.200" p={5}>
      <Box display="flex" flexDirection="column" gap={4} alignItems="flex-start">
        <Text color="gray.600" fontStyle="italic">
          "{content}"
        </Text>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color="gray.500">
            {role}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

// Pricing Card Component
function PricingCard({ title, price, description, features, buttonText, isPopular = false }: PricingCardProps) {
  return (
    <Box
      bg="white"
      shadow="md"
      borderRadius="lg"
      border="1px solid"
      borderColor={isPopular ? "ui.main" : "gray.200"}
      position="relative"
      transform={isPopular ? { lg: "scale(1.05)" } : "none"}
      zIndex={isPopular ? 1 : 0}
      p={5}
    >
      {isPopular && (
        <Box
          position="absolute"
          top="-4"
          insetX="0"
          mx="auto"
          w="fit-content"
          px={4}
          py={1}
          bg="ui.main"
          color="white"
          borderRadius="full"
          fontSize="sm"
          fontWeight="bold"
        >
          Most Popular
        </Box>
      )}
      <Box display="flex" flexDirection="column" gap={6} alignItems="flex-start">
        <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start" w="full">
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <Flex align="baseline">
            <Heading as="h2" size="xl">
              {price}
            </Heading>
            {price !== "Custom" && (
              <Text ml={1} color="gray.500">
                /month
              </Text>
            )}
          </Flex>
          <Text color="gray.600">{description}</Text>
        </Box>

        <Box display="flex" flexDirection="column" gap={3} alignItems="flex-start" w="full">
          {features.map((feature, index) => (
            <Flex key={index}>
              <Box color="ui.main" mr={2}>✓</Box>
              <Text>{feature}</Text>
            </Flex>
          ))}
        </Box>

        <Button
          w="full"
          colorScheme="teal"
          bg={isPopular ? "ui.main" : undefined}
          variant={isPopular ? "solid" : "outline"}
          _hover={{ bg: isPopular ? "teal.600" : "teal.50" }}
          mt={4}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default LandingPage 