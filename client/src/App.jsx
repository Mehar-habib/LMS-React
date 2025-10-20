import Navbar from "./components/component/Navbar";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";

export default function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Login />
    </div>
  );
}
