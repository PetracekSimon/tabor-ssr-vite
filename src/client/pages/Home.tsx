import Hero from "../components/Hero";
import Container from "../components/Container";
import Countdown from "../components/Countdown";
import PageTitle from "../components/PageTitle";

/**
 * Domovská stránka - v navigaci je jako "Aktuálně" - url "/"
 * @returns 
 */
const Main = () => {
  return (
    <>
     <PageTitle title="" />
      <div className="flex bg-white-100 font-sans items-center flex-col">
        <Hero title="Stanový tábor Kamenná" subtitle="2025" background="/assets/dummy.jpg" />
        <Container>
          <div className="py-12">
            Milí mušketýři,
            <br />
            <br />
            děkujeme za udatný boj, ve kterém jste ubránili slabé a zachovali čest krále i královny.
            Pořádně si užijte zbytek prázdnin, budeme se na vás těšit zase za rok. To se společně vypravíme do Egypta a budeme zkoumat staré hrobky a prchat před mumiemi.
            <br />
            <br />
            Louce a táboru nazdar!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Do tábora zbývá už jen!</h2>
            <h1 className="text-4xl font-bold text-center"><Countdown targetDate={new Date("2025-07-01T00:00:00")} /></h1>
          </div>


        </Container>
      </div>
    </>
  );
};

export default Main;
