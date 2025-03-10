import React from "react"
import { Box } from "@chakra-ui/react"
import HeroSection from "./HeroSection"
import FeaturesSection from "./FeaturesSection"
import TestimonialsSection from "./TestimonialsSection"
import PricingSection from "./PricingSection"
import FooterSection from "./FooterSection"

const LandingPage: React.FC = () => {
  return (
    <Box as="main">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </Box>
  )
}

export default LandingPage 