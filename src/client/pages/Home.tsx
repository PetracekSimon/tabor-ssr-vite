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
            {/* Expedice do Egypta začala!
            <br />
            <br />
            Slunce nad táborem Kamenná už svítí naplno a naši mladí dobrodruzi se vydali na cestu do dávného Egypta! Všechno je v plném proudu - stany stojí, výpravy vyrážejí a v písku už se objevují první stopy tajemných hieroglyfů.
            <br />
            Děti se proměnily v badatele, kteří zkoumají pyramidy, odhalují skryté chodby a řeší záhady starověkých svitků. Už jsme se potkali se Sfingou, rozluštili pár zapeklitých šifer a začíná být jasné, že faraon bude potřebovat opravdu schopné pomocníky!
            <br />
            <br />
            Vaše faraonova družina z Kamenné */}

            <b>Tajemství Egypta se blíží... a my máme nový web!</b>
            <br />
            <br />
            Slunce pomalu stoupá nad obzor a&nbsp;karavana se chystá vyrazit. Letní tábor Kamenná 2025 se nezadržitelně blíží - a&nbsp;s&nbsp;ním i&nbsp;naše velká výprava do země pyramid a&nbsp;záhadných bohů.
            <br />
            A protože i faraon drží krok s dobou, spouštíme pro vás nové webové stránky! Najdete tam všechny informace, novinky i&nbsp;připravované úkoly, které čekají na odvážné dobrodruhy.
            <br />
            <br />
            Vaše faraonova družina

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Do tábora zbývá už jen!</h2>
            <h1 className="text-4xl font-bold text-center"><Countdown targetDate={new Date("2025-06-30T09:00:00")} /></h1>
          </div>

          <ImageGallery folder="2025" />

        </Container>
      </div>
    </>
  );
};

export default Home;
