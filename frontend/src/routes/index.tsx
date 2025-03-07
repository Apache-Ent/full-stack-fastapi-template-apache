// frontend/src/routes/index.tsx or similar
import { createFileRoute } from '@tanstack/react-router'
//import LandingPage from "@/components/Landing/LandingPage"

export const Route = createFileRoute('/')({
  component: LandingPage
})

function LandingPage() {
  return (
    <div>
      <h1>Welcome to the FastAPI Project</h1>
      {/* Landing page content */}
    </div>
  )
}