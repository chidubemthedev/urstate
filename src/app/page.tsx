import Banner from "@/components/landing/banner";
import Cta from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Nav from "@/components/landing/nav";
import Spark from "@/components/landing/spark";
import Trio from "@/components/landing/trio";

export default function Home() {
  return (
    <div className="px-4 md:px-16">
      <Nav />
      <Hero />
      <Trio />
      <Banner />
      <Spark />
      <Cta />
      <Footer />
    </div>
  );
}
