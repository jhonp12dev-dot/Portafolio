import { getDictionary, Locale } from "../dictionaries";
import ScrollObserver from "@/components/ScrollObserver";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <ScrollObserver />
      <CustomCursor />
      <Navbar dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <About dict={dict.about} />
        <Experience dict={dict.experience} />
        <Projects dict={dict.projects} />
        <Skills dict={dict.skills} />
        <Education dict={dict.education} />
        <Contact dict={dict.contact} />
      </main>
      <Footer />
    </>
  );
}
