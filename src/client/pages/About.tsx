import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PageTitle from "../components/PageTitle";

/**
 * O táboře - v navigaci je jako "O táboře" - url "/o-taboru"
 * @returns 
 */
const About = () => {
  return (
    <>
      <PageTitle title={"O táboře"} />
      <div>
        <Hero title="O táboře" subtitle="Stanový tábor Kamenná 2025" background="/assets/dummy.jpg" />

        <section id="MetaInfo" className="section-anchor">
          <div className="container mx-auto">

            <h2 className="text-left text-2xl font-bold text-butter-cup">Úvod</h2>
            <hr className="border-t border-gray-300 my-4" />
            <div className="text-justify">
              <p className="mb-3">
                Letní stanový tábor Kamenná, nazvaný podle nedaleké vísky, pořádáme v překrásném prostředí Vysočiny již od roku 1987
                zpočátku pod záštitou radotínské cementárny a poslední desetiletí jako nezávislý spolek. Tábor začíná obvykle
                na začátku července a trvá 19 dní. Během těchto 19 dní budou Vaše děti žít v čistém prostředí a v těsném sepětí s okolní přírodou,
                zažijí mnohá dobrodružství a seznámí se s řadou nových kamarádů.
              </p>
              <p className="mb-3">
                Na táboře je většinou okolo 60 dětí ve věku 6-15 let. Děti jsou rozděleny podle věku do oddílů po 8-12 dětech.
                Převážná většina dětí jezdí na tábor opakovaně, a přestože v průběhu roku žádné společné akce s dětmi nepořádáme,
                vzniklé kamarádské vztahy přetrvávají a děti, které nejedou poprvé, se na táboře vždy shledávají se „starými známými“.
                Děti, které na tábor jezdí opakovaně, a velmi stabilní kolektiv vedoucích vytváří rodinnou atmosféru,
                která je podle vyjádření účastníků jednou z velkých devíz našeho tábora. Nejsme ale nijak uzavřenou partou a děti, které
                přijedou poprvé, velmi snadno do našeho kolektivu zapadnou. Některé děti po překročení 15 let věku u nás zůstávají jako
                praktikanti a také naprostá většina dospělého osazenstva (včetně kuchaře či zásobovače) zažila tábor v dětském věku.
              </p>
              <p>
                Děti i vedoucí spí ve stanech s podsadami. Stany a veškeré vybavení a zařízení tábora se připravuje, staví, buduje a
                vylepšuje během víkendu před příjezdem dětí za pomoci většiny vedoucích, ostatního personálu, známých, kamarádů i některých
                rodičů. První den po příjezdu se pak zejména starší děti podílejí na stavbě svých stanů a dalších zařízení potřebných pro
                chod tábora. Poslední den tábora pak všichni pomáhají s bouráním, neboť po zbytek roku zůstává na táborové louce jen torzo
                kuchyně a zabezpečená vrtaná studna.
              </p>
            </div>
          </div>
        </section>
        <section id="Celotaborova-hra" className="section-anchor">
          <div className="container mx-auto">

            <h2 className="text-left text-2xl font-bold text-butter-cup">Celotáborová hra a program</h2>
            <hr className="border-t border-gray-300 my-4" />
            <div className="text-justify">
              <p className="mb-3">
                V průběhu tábora se hraje celotáborová hra inspirovaná různými historickými, filmovými, sci-fi či jinými tématy,
                obdobími, legendami či postavami. Od daného tématu se odvíjí jednotlivé etapové hry, které děti denně hrají v lese,
                na louce nebo u rybníka. Každý rok se snažíme přinášet alespoň pár nových (i když po tolika letech je to takřka nadlidský úkol),
                či dlouho nehraných her, ale na programu zůstávají i stálice, jejichž opomenutí by nám pravidelní účastníci nikdy neodpustili,
                např. bitva o vlajky, azimuťák, šipkáč nebo „čísla“. Hry mají různorodý charakter (akční, relaxační, tvořivé, intelektuální aj.),
                tak aby si každý našel něco, co ho bude bavit a v čem se mu bude dařit. Při zahajovacím večeru se děti u táboráku rozlosují do družstev,
                kde jsou rovnoměrně zastoupeny všechny věkové skupiny. Družstva pak po celý tábor mezi sebou soupeří o sladký poklad.
              </p>
              <p className="mb-3">
                V horkých dnech pořádáme vodní bitvy, rácháme se v nafukovacím bazénu, nebo vyrážíme k nedalekému rybníku, nazývanému místními
                zřejmě pro svou malebnost „Gréta“. Na jedné straně rybníka se nachází poměrně rozsáhlá mělčina pro neplavce, na další straně je
                možnost skočit si z nevysokého skokanského můstku.
              </p>
              <p className="mb-3">
                Během tábora podnikáme s dětmi 2-3 celodenní nebo půldenní výlety. Letitou tradicí je návštěva Jihlavy a především místní
                překrásné zoologické zahrady. Cíle dalších výletů pak závisí na počasí a dalších okolnostech. V posledních letech jsme navštívili
                např. Stvořidla na Sázavě, Telč, zříceninu hradu Rokštejn, zámek Pernštejn, Havlíčkův Brod nebo blízké městečko Polná se stejnojmenným zámkem.
              </p>
              <p className="mb-3">
                Třikrát během tábora si děti zatančí na diskotéce a velice populární je také letní kino pod širým nebem. Na vstupenky do kina si d
                ěti vydělávají drobnými pracemi (poklizení táborové louky, přinesení dřeva do kamen atd.). Ve volných chvílích pak po táboře
                probíhají dramatické zápasy ve stolním tenisu, fotbalu, lacrossu, vybíjené, stolním fotbálku, karetních hrách a řadě dalších sportů a aktivit.
              </p>
              <p className="mb-3">
                Ke konci tábora pořádáme táborovou olympiádu, ve které děti, rozděleny podle věku do několika kategorií, bojují o medaile v obvykle groteskních
                disciplínách. Předposlední den tábora následuje táborová pouť se zábavnými hrami a atrakcemi. A nechybí samozřejmě ani oblíbený rej masek na karnevalu.
              </p>
            </div>
          </div>
        </section>
        <section id="Historie-vedouci" className="section-anchor">
          <div className="container mx-auto">
            <h2 className="text-left text-2xl font-bold text-butter-cup">Historie a vedoucí</h2>
            <hr className="border-t border-gray-300 my-4" />
            <div className="text-justify">
              <p className="mb-7">
                Náš tábor má již více než třicetiletou tradici. V průběhu let se zde vytvořil stabilní kolektiv vedoucích - mnoho z nás si
                táborem prošlo od nejmenšího oddílu až k vedoucování. Rádi se vracíme a znovu se vrháme do organizování her a zajišťování tábora,
                protože nás to naplňuje. Celým táborem vládne rodinná atmosféra, která pomáhá k tomu, aby si všichni děti i vedoucí tábor užili a
                odpočinuli si od rušného každodenního života.
              </p>
              <p>1987 Hrabě Chamaré<br />
                1988 Hrabě Chamaré<br />
                1989 Barbar Conan<br />
                1990 Hernando Cortéz<br />
                1991 Piráti<br />
                1992 Pravěk<br />
                1993 Trifidi<br />
                1994 Rytíři kruhového stolu<br />
                1995 Egypt<br />
                1996 Shaolin - Japonsko Samurajové<br />
                1997 Vikingové<br />
                1998 Indiáni<br />
                1999 Pohádky tisíce a jedné noci<br />
                2000 Staré řecké báje a pověsti<br />
                2001 Ostrov pokladů<br />
                2002 Lovci mamutů<br />
                2003 Rytíři<br />
                2004 Po stopách Yettiho<br />
                2005 Egypt<br />
                2006 Pán prstenů<br />
                2007 Robinson<br />
                2008 Keltové<br />
                2009 Vinnetou<br />
                2010 Théseus a Minotaurus<br />
                2011 Piráti z Karibiku<br />
                2012 Mayové - konec světa<br />
                2013 Vikingové<br />
                2014 Robin Hood<br />
                2015 Egypt<br />
                2016 Ztracený svět<br />
                2017 Tři mušketýři<br />
                2018 Starověké Řecko<br />
                <Link to="/galerie/2019/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  2019 Indiáni
                </Link>
                <br />
                <Link to="/galerie/2020/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  2020 Piráti z Karibiku
                </Link>
                <br />
                <Link to="/galerie/2021/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  2021 Rytíři kruhového stolu
                </Link>
                <br />
                <Link to="/galerie/2022/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  2022 Mayové
                </Link>
                <br />
                <Link to="/galerie/2023/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  2023 Vikingové
                </Link>
                <br />
                <Link to="/galerie/2024/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  2024 Muž se železnou maskou
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
