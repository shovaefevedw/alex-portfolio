import { AboutPreview } from "@/components/AboutPreview";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";

export default function HomePage() {
  return (
    <main id="content" className="home">
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <Contact />
    </main>
  );
}
