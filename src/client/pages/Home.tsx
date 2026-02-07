import Hero from "../components/Hero";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import config from "../../config";

interface HomeProps {
  initialData?: any;
}

/**
 * Domovská stránka - v navigaci je jako "Aktuálně" - url "/"
 * @returns 
 */
const Home = (props: HomeProps) => {
  //TODO: SSR
  // useEffect(() => {
  //   console.log(props);
  // }, []);
  return (
    <>
      <PageTitle />
      <div className="flex bg-white-100 font-sans items-center flex-col">
        <Hero title="Stanový tábor Kamenná" subtitle={config.campYearInfo.dateAsString + "" + config.campYearInfo.year} background="/assets/hero.jpg" />
        <Container>

          <section className="mt-8 mb-16">

            <h2 className="text-center text-3xl font-bold text-butter-cup mb-4">Tábor, na který se nezapomíná</h2>
            <p className="text-center">
              Hledáte <strong>stanový tábor</strong>, kde si vaše dítě užije přírodu, pohyb a
              kamarády?
              <br />
              <br />
              Nabízíme 17 dní plných zážitků a srandy, letos s velkolepou hrou <em>Pravěk – King Kong</em>. Včetně vyváženého programu, stravy 5x denně a
              bezpečného zázemí uprostřed Vysočiny.
            </p>
            <br />
            <div className="flex justify-center">
              <Link to="/prihlaska" className="bg-primary-500 text-white font-medium py-3 px-5 rounded-lg hover:bg-primary-600 transition-colors ">Vyplnit přihlášku</Link>
            </div>
          </section>

          <section id="game-2026" className="mb-16 border-2 border-orange-100 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8">

              <h2 className="text-left text-2xl font-bold text-butter-cup mb-4">Celotáborová hra 2026: Pravěk – King Kong</h2>
              <p>
                Během 17 dní se děti přenesou do <strong>dob prastarých kmenů</strong>, kde se budou učit spolupráci,
                strategii a odvaze.
                Celotáborová hra propojí zábavu se strategickým myšlením a rozvojem dovedností.
              </p>
            </div>
          </section>

          <section id="why-choose" className="mb-16">
            <h2 className="text-center text-3xl font-bold text-butter-cup mb-4">Proč právě náš stanový tábor</h2>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <li className="border-2 rounded-xl hover:border-orange-100 transition-all hover:shadow-lg p-8">
                <strong className="text-xl mb-4 block">Bezpečné zázemí</strong>
                <p className="text-gray-600 text-sm">Ubytování ve stanech s podsadou, zdravotník na místě 24/7.</p>
              </li>
              <li className="border-2 rounded-xl hover:border-orange-100 transition-all hover:shadow-lg p-8">
                <strong className="text-xl mb-4 block">Dohled</strong>
                <p className="text-gray-600 text-sm">Zkušený tým vedoucích s dlouholetou praxí a zapálením pro táborové aktivity.</p>
              </li>
              <li className="border-2 rounded-xl hover:border-orange-100 transition-all hover:shadow-lg p-8">
                <strong className="text-xl mb-4 block">Vyvážená strava</strong>
                <p className="text-gray-600 text-sm">5–6 jídel denně, pitný režim po celý den.</p>
              </li>
              <li className="border-2 rounded-xl hover:border-orange-100 transition-all hover:shadow-lg p-8">
                <strong className="text-xl mb-4 block">Bohatý program</strong>
                <p className="text-gray-600 text-sm">Hry, výlety, sport, večerní táboráky a tematické akce.</p>
              </li>
              <li className="border-2 rounded-xl hover:border-orange-100 transition-all hover:shadow-lg p-8">
                <strong className="text-xl mb-4 block">17 dní v přírodě</strong>
                <p className="text-gray-600 text-sm">Žádná elektronika, maximum pohybu a pobytu venku.</p>
              </li>
              <li className="border-2 rounded-xl hover:border-orange-100 transition-all hover:shadow-lg p-8">
                <strong className="text-xl mb-4 block">Dlouholetá tradice</strong>
                <p className="text-gray-600 text-sm">Pořádáme tábory od roku 1987.</p>
              </li>
            </ul>
          </section>

          <section id="faq" className="mb-8">
            <h2 className="text-center text-3xl font-bold text-butter-cup mb-4">Časté dotazy</h2>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Pro jak staré děti je tábor určen a kolik dětí se obvykle účastní?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <p>Tábor je určen pro děti ve věku <strong>6–15 let</strong>. Každý rok se účastní přibližně <strong>60 dětí</strong>, které rozdělujeme do oddílů po <strong>8–12 dětech</strong> podle věku.</p>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Jaká je cena, jak se platí a jaké jsou storno podmínky?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <ul className="list-disc ms-5 space-y-2">
                  <li><strong>Cena</strong>: 7&nbsp;100&nbsp;Kč / 17&nbsp;dní (viz aktuální ročník).</li>
                  <li><strong>Platba</strong>: převodem nebo složenkou na účet <strong>82721329/2010 (Fio)</strong>. Variabilní symbol = <strong>rodné číslo dítěte</strong>.</li>
                  <li><strong>Storno</strong>:
                    <ul className="list-disc ms-5 mt-1 space-y-1">
                      <li>do 31.&nbsp;5. vracíme <strong>100 %</strong>,</li>
                      <li>po 31.&nbsp;5. do 24.&nbsp;6. vracíme <strong>75 %</strong>,</li>
                      <li>po 24.&nbsp;6. do dne odjezdu vracíme <strong>20 %</strong>,</li>
                      <li>v den odjezdu <strong>0 %</strong>.</li>
                    </ul>
                    Pokud sami seženete náhradníka, vracíme <strong>100 %</strong> po obdržení jeho platby (bez ohledu na termín).</li>
                </ul>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Kde a kdy je odjezd a návrat (Radotín, Radlice, časy)?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <ul className="list-disc ms-5 space-y-1">
                  <li><strong>Odjezd</strong>: v <strong>9:00</strong> z <strong>Radotína – Sportovní hala Radotín</strong> a v <strong>9:30</strong> z <strong>parku naproti ZŠ Radlická</strong>.</li>
                  <li><strong>Návrat</strong>: obvykle v pátek kolem <strong>18:30</strong> (čas je orientační, záleží na odjezdu z louky, snažíme se o době návratu informovat).</li>
                </ul>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Jak je zajištěno stravování (kolikrát denně, kdo vaří, „služby“ dětí)?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <ul className="list-disc ms-5 space-y-1">
                  <li>Strava je zajištěna <strong>5–6x denně</strong> (snídaně, svačiny, oběd, večeře, často i druhá večeře).</li>
                  <li>Vaří náši <strong>zkušený kuchaři s dlouholetou praxí</strong>.</li>
                  <li>Děti se pod dohledem v rámci <strong>služeb</strong> podílejí na drobných přípravách v kuchyni.</li>
                </ul>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Jak je řešena hygiena?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <ul className="list-disc ms-5 space-y-1">
                  <li><strong>Sprcha</strong> s teplou vodou, ohřev v lázeňských kamínkách.</li>
                  <li>K dispozici jsou <strong>chemické toalety</strong></li>
                </ul>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Jak vypadá program a celotáborová hra?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <ul className="list-disc ms-5 space-y-1 mt-2">
                  <li>Denní <strong>etapové hry</strong> v lese i na louce (kombinujeme sportovní a kreativní aktivity).</li>
                  <li>Při parném dni pořádáme <strong>vodní bitvy</strong> v tábořišti.</li>
                  <li><strong>Výlety</strong> - tradičně jezdíme do Jihlavy (Zoo) a jednoho z okolních měst</li>
                  <li><strong>Večerní program</strong>: 3× diskotéka, letní kino pod širým nebem a táboráky.</li>
                  <li>Táborová olympiáda, pouť, karneval.</li>
                </ul>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Co určitě zabalit s sebou?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <ul className="list-disc ms-5 space-y-1 mt-2 mb-4">
                  <li><strong>Dostatečně teplý spacák</strong> (na Vysočině bývají noční teploty i 5–10 °C).</li>
                  <li><strong>Pláštěnka</strong> (dlouhá, pevná, tenký igelit je nevhodný).</li>
                  <li>Více druhů obuvi (<strong>holínky</strong>, pevné boty/pohorky, sandály, sportovní obuv).</li>
                  <li><strong>Kompletní ešusová sada</strong> - tři díly + hrnek (např. <a className="text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noreferrer" href="https://www.decathlon.cz/p/mp/yate/esus-nezer-3-dily/_/R-p-b50c5339-0138-48c9-a6ec-bc8c4debc830?mc=b50c5339-0138-48c9-a6ec-bc8c4debc830_c249&c=%C5%A0ED%C3%81">toto</a>)</li>
                  <li>Láhev na pití, příbor, <strong>čepice</strong>, hygienické potřeby, opalovací krém, repelent.</li>
                  <li>Věci <strong>jasně podepište jménem</strong> – usnadní to hledání ztrát.</li>
                </ul>
                <Link className=" bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-primary-300" to={"/chci-jet/seznam-veci"}>Kompletní seznam věcí</Link>
              </div>
            </details>

            <details className="group p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-300 mb-4">
              <summary className="flex list-none cursor-pointer items-center justify-between">
                <h3 className="text-sm md:text-base font-semibold">Co dětem na tábor nedávat?</h3>
                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-700">
                <p>Nedoporučujeme dávat s sebou cennosti a elektroniku (mobily, chytré hodinky apod.):</p>
                <ul className="list-disc ms-5 space-y-1 mt-2">
                  <li>stany nelze zabezpečit jako chatku/domek a hrozí riziko ztráty</li>
                  <li>vlhko a chlad elektronice nesvědčí</li>
                  <li>v táboře <strong>není běžně dostupná elektřina</strong> (pouze agregát pro potřeby provozu, nemáme kapacitu nabíjet desítky elektornických zařízení)</li>
                </ul>
              </div>
            </details>
          </section>




          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8 text-center md:text-left">
            <h2 className="text-2xl font-bold">Do tábora zbývá už jen!</h2>
            <h1 className="text-4xl font-bold text-center"><Countdown targetDate={targetDate} /></h1>
          </div> */}

        </Container>
      </div>
    </>
  );
};

export default Home;
