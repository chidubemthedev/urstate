import Banner from "@/components/landing/banner";
import Cta from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Nav from "@/components/landing/nav";
import Spark from "@/components/landing/spark";
import SparkMobile from "@/components/landing/spark-mobile";
import Trio from "@/components/landing/trio";
import TrioMobile from "@/components/landing/trio-mobile";

export default function Home() {
  return (
    <div className="px-[25px] md:px-16">
      <Nav />
      <Hero />
      <Trio />
      <TrioMobile />
      <Banner />
      <Spark />
      <SparkMobile />
      <Cta />
      <Footer />
    </div>
  );
}
