import Hero from "../components/Hero";
import Container from "../components/Container";
import Countdown from "../components/Countdown";
import PageTitle from "../components/PageTitle";
import ImageGallery from "../components/ImageGallery";

/**
 * Domovská stránka - v navigaci je jako "Aktuálně" - url "/"
 * @returns 
 */
const Home = () => {
  return (
    <>
      <PageTitle title="" />
      <div className="flex bg-white-100 font-sans items-center flex-col">
        <Hero title="Stanový tábor Kamenná" subtitle="2025" background="/assets/hero.jpg" />
        <Container>
          <div className="py-12">
            Máváme Káhiře, všichni malý egyptologové jsou již na cestě domů.
            <br /> 
            Expedice byla zdařilá, špinavý jsou až za ušima připravte koupelny a pračky. 
            <br />
            Nejdřve zastavujeme v Radotíně a poté v Radlicích.
          </div>

          {/*
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Do tábora zbývá už jen!</h2>
            <h1 className="text-4xl font-bold text-center"><Countdown targetDate={new Date("2025-06-30T09:00:00")} /></h1>
          </div>
          */}

          <ImageGallery folder="2025" />

        </Container>
      </div>
    </>
  );
};

export default Home;
