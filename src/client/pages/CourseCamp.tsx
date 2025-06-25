import Hero from "../components/Hero";
import PageTitle from "../components/PageTitle";
import { HashLink } from 'react-router-hash-link';
import config from "../../config";

/**
 * Průběh tábora - v navigaci je jako "Průběh tábora" - url "/prubeh-tabora"
 * @returns 
 */
const CourseCamp = () => {
    return (
        <>
            <PageTitle title={" | Průběh tábora"} />
            <div>
                <Hero title="Průběh tábora" subtitle={config.heroSubtitle} background="/assets/hero.jpg" />

                <section id="Stravovani" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Stravování</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div className="text-justify">
                            <p className="mb-3">
                                Děti se stravují 5-6x denně, a to snídaní, svačinou (většinou nějaké ovoce), obědem, svačinou (jogurt,
                                pacholík,
                                přesnídávka aj.),
                                večeří a často ještě druhou večeří. Vynikající kuchyni připravuje náš dlouholetý a zkušený kuchař, přičemž
                                družstva dětí se ve dnech,
                                kdy na ně vyjde &quot;služba&quot; (3-4x za tábor), podílí na některých přípravách.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="Hygiena-a-zdravi" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Hygiena a zdraví</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div className="text-justify">
                            <p className="mb-3">
                                Pitná voda je na táboře zajišťována z vrtané studny. Voda má mírně vyšší obsah železa, a proto i trochu
                                železitější chuť.
                                Ve všech ostatních parametrech ale splňuje požadavky kladené na vodu kojeneckou.
                            </p>
                            <p className="mb-3">
                                Tábor je vybaven sprchou s teplou vodou, kterou je nutno ohřát v lázeňských kamínkách. V posledních dvou
                                letech
                                jsme dříve užívané
                                &quot;kadibudky&quot; nahradili podstatně hygieničtějším chemickým WC
                            </p>
                            <p className="mb-3">
                                Na táboře je přítomna kvalifikovaná zdravotnice &quot;Karel&quot;, kterou jen tak něco nerozhodí. Ostatně jezdí s námi
                                od
                                vzniku tábora,
                                takže zkušeností má nepočítaně. Zdravotní dohled zajišťuje lékařské středisko Dobronín a v případě vážnějších
                                zdravotních komplikací v
                                ozíme děti do krajské nemocnice v Jihlavě. Zdravotnice také dohlíží na to, aby děti braly pravidelně léky,
                                které
                                mají předepsané.
                            </p>
                            <p className="mb-3">
                                Prosíme rodiče, aby před odjezdem na tábor zkontrolovali, zda dítě nemá vši. V posledních letech jsme totiž
                                pokaždé u některého
                                z dětí vši našli. Prohlídku naštěstí provádíme hned první den a nedáváme tak vším šanci rozšířit se. Jejich
                                likvidace je ale
                                časově náročná a velmi nám přidělává práci.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="S-sebou" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Co s sebou</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div className="text-justify">
                            <p className="mb-3 font-bold">
                                Prosíme o pečlivé pročtení následujících řádek, neboť jsme již zažili leccos, a proto bychom chtěli
                                upozornit na nezbytnosti ve výbavě dětí, jejichž absence může zásadně narušit program nebo pokazit dítěti zážitek z tábora.
                            </p>

                            <p className="mb-3">
                                <span className="font-bold text-red-500">Dostatečně teplý spacák: </span>
                                <br />
                                Ačkoliv je náš tábor pořádán v letním období, je situován v oblasti Vysočiny, kde bývají i v létě chladné noci spíše pravidlem než výjimkou.
                                Teploty v noci často klesají na 10 °C, někdy i na 5 °C. Proto vybavte děti dostatečně teplým spacákem.
                            </p>
                            <p className="mb-3">
                                <span className="font-bold text-red-500">Holinky a pláštěnka: </span>
                                <br />
                                Vzhledem k tomu, že náš tábor je stanový, máme jen omezené (byť za normálních okolností dostatečné) kapacity,
                                kde lze sušit promáčené boty a oblečení v případě vícedenního deštivého počasí. Sebelepší goretexové boty či dokonale
                                naimpregnované pohorky ale nenahradí holiny při delším brouzdání mokrou trávou či vlhkým lesem. Stejně tak i
                                kvalitní „nepromokavá“ bunda není dokonalou náhradou pláštěnky. Na pláštěnce nešetřete. Měla by být dostatečně dlouhá,
                                tzn. až pod holínky a z pevného materiálu. Pláštěnky z tenkého igelitu přežijí sotva jednu cestu do lesa a pro použití
                                na táboře jsou zcela nevhodné.
                            </p>
                            <p className="mb-3">
                                Celkový seznam je <HashLink smooth to={"/chci-jet#Seznam-veci"} className="text-blue-600 dark:text-blue-500 hover:underline">zde</HashLink>.
                            </p>
                            <p className="mb-3">
                                Všechny věci dětí doporučujeme označit výrazně jejich jménem (což především platí u menších dětí).
                                Během tábora se ztratí a opět nalezne velké množství zejména oblečení, příborů, ešusů aj. Menší
                                děti dobře poznají svou hračku nebo nožík, ale jen málokdy příbor, bundu či tepláky. Překvapivě
                                mnoho věcí nám tak každý rok zůstává k rozdělení u autobusu při návratu domů.
                            </p>
                        </div>
                    </div >
                </section >
                <section id="Co-nebra" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Co nebrat</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div className="text-justify">
                            <p className="mb-3">
                                Na táboře bydlí děti ve stanech, které samozřejmě nelze zabezpečit tak jako zděný domek či chatku.
                                Ačkoliv jsme zatím závažnější problém krádeží na táboře řešit nemuseli, nedoporučujeme vozit s sebou cenné
                                věci (MP3 přehrávače, mobily apod.). Zároveň studené a vlhké prostředí, které na táboře panuje, elektroniku
                                poškozuje. Přístroje navíc není během tábora kde nabít, protože do tábora není přivedena elektřina.
                                Pouze v případě diskotéky či letního kina používáme benzínový agregát, kapacitu nabíjet desítky mobilů však nemáme.
                            </p>
                            <p className="mb-3">
                                U fenoménu mobilních telefonů nám dovolte se ještě pozastavit. Mobilní telefony během několika let zcela proměnily
                                způsob našeho života. Ačkoliv jsou to ve většině případů velmi užiteční pomocníci, přináší jejich využívání také pár
                                záporných aspektů a s jedním z nich se potýkáme i my (a stejně tak i další tábory). Každé dítě prožívá tři týdny
                                odloučení od rodičů a táborový život jiným způsobem, některé jednodušeji a jiné si zvyká velmi pomalu. A každému se
                                samozřejmě občas po rodičích stýská. To je zcela normální. Když jsme jezdili na tábor jako děti my, mohli jsme si ve
                                chvílích splínu rodičům postesknout jedině dopisem. A napsat takový dopis vyžaduje trochu času, během kterého zase přišla
                                nějaká zajímavá hra nebo kamarád a bylo po smutku. Dnes stačí zmáčknout jedno tlačítko, úkon, který zabere okamžik. Dítě
                                přitom rodičům zavolá pouze ve chvílích, kdy je smutné, a ačkoliv taková chvíle může být jen zanedbatelným zlomkem celého tábora,
                                rodiče tak dostávají neobjektivní obrázek. Stejně tak je pro rodiče velmi lákavá možnost zkontrolovat, jak se jejich
                                potomkovi daří. I to často nadělá více škody než užitku, neboť takový telefonát od rodičů může v dítěti, které si konečně
                                zvyklo na odloučení z domova, vyvolat opět stesk. Velmi důrazně proto nedoporučujeme dítěti na tábor telefon dávat.
                                Pokud chcete vidět prostředí, ve kterém vaše dítě prožije tři týdny, velmi rádi Vás přivítáme na stavění tábora. V případě
                                potřeby se pak během tábora můžete telefonicky obrátit na hlavního vedoucího.
                            </p>
                            <p className="mb-3">
                                Také návštěvy rodičů na táboře jsou z pedagogických důvodů zakázány. Jak již bylo zmíněno výše, každý kontakt nebo návštěva
                                dítě rozhodí a způsobí mu (po odjezdu návštěvy) stesk po domově. Kromě toho má také výrazný negativní vliv i na ostatní děti,
                                jejichž rodiče zákaz návštěv respektují. Pokud si chcete prohlédnout prostředí, ve kterém budou vaše děti trávit čas, nebo se seznámit s
                                vedoucími, rádi Vás uvítáme o víkendu před příjezdem dětí při budování tábora, kdy se každý pomocník, který přiloží ruku k dílu, náramně hodí.
                                Stejně tak můžete přijet pomoci poslední den při bourání tábora, kdy je nutné během několika hodin celou táborovou louku vyklidit.
                            </p>
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}

export default CourseCamp;
