import Hero from "../components/Hero";
import PageTitle from "../components/PageTitle";
import config from "../../config";

/**
 * Chci jet - v navigaci je jako "Chci jet" - url "/chci-jet"
 * @returns 
 */
const IWantToGo = () => {
    return (
        <>
            <PageTitle title={"Chci jet"} />
            <div>
                <Hero title="Chci jet" subtitle={config.heroSubtitle} background="/assets/dummy.jpg" />
                <section id="Vseobecne-informace" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Všeobecné informace</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div>
                            <div className="grid md:grid-cols-12 gap-y-2 md:gap-y-4 pt-4 text-justify">
                                <div className="md:col-span-2">
                                    <p className="font-bold">Odjezd:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>
                                        Odjezd dětí z Radotína je v pondělí &nbsp;1. 7. 2024 v 9 hodin od Sportovní haly Radotín (<a className="text-blue-600 dark:text-blue-500 hover:underline" href="http://maps.google.com/maps?q=U+star%C3%A9ho+stadi%C3%B3nu+9&amp;hl=cs&amp;ie=UTF8&amp;sll=49.98204,14.35739&amp;sspn=0.008389,0.017467&amp;t=h&amp;z=16" target="_blank" rel="noopener noreferrer">zde</a>)
                                        a v 9.30 z parku naproti ZŠ Radlická (v blízkosti hlavního vjezdu do plaveckého areálu <a className="text-blue-600 dark:text-blue-500 hover:underline" href="https://www.google.com/maps/place/50%C2%B003'30.8%22N+14%C2%B023'35.3%22E/@50.058557,14.3920507,259m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d50.058557!4d14.393145?hl=cs">zde</a>).
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Příjezd:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>Příjezd dětí k ZŠ Radlická a do Radotína je v pátek 19. 7. kolem 18:30.</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Vedoucí tábora:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>Kryštof Kahaj</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Ubytování:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>Všechny děti, stejně jako vedoucí, jsou ubytovány ve stanech (áčko s podsadou).</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Zdravotní péče:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>Na táboře je přítomna kvalifikovaná zdravotnice. Lékařský dozor bude zajištěn Zdravotním střediskem v Dobroníně.</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Stravování:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>Bude 5 x denně. Děti se budou podílet na přípravě jídel pod dohledem kuchaře.</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Program:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p> V letošním roce bude probíhat celotáborová etapová hra na téma „Muž se železnou maskou“.</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Cena:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>7 100,- Kč  / 19 dní</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="font-bold">Adresa tábora:</p>
                                </div>
                                <div className="md:col-span-10 mb-4 md:mb-0">
                                    <p>
                                        Letní stanový tábor Kamenná <br />
                                        Dobronín <br />
                                        588 12 <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="Seznam-veci" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Seznam věcí</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div>
                            <p className="text-justify">
                                Přestože je červenec, může být na Vysočině v noci chladno a mokro, nepodceňte tedy výbavu vašich dětí.
                            </p>

                            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
                                <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="text-gray-700 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">Obuv</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="text-red-500 font-bold px-6 py-3">gumové holinky</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="px-6 py-3">pevné boty/pohorky</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="px-6 py-3">sandály</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="px-6 py-3">sportovní obuv</td>
                                    </tr>

                                    <tr className="text-gray-700 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">Osobní prádlo a oblečení</th>
                                    </tr>

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="text-red-500 font-bold px-6 py-3">pláštěnka do deště</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="px-6 py-3">sportovní nepromokavá bunda</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">3</th>
                                        <td className="px-6 py-3">tepláková souprava + jedna teplá na spaní</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">2</th>
                                        <td className="px-6 py-3">teplý svetr</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">2</th>
                                        <td className="px-6 py-3">kraťasy nebo sukně</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="px-6 py-3">plavky</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">2</th>
                                        <td className="px-6 py-3">nepromokavé kalhoty (šusťáky)</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">dostatečné množství osobního prádla</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">dostatečné množství ponožek a podkolenek</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">trička, košile</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="text-red-500 font-bold px-6 py-3">čepice (kšiltovka)</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="text-red-500 font-bold px-6 py-3">teplný spacák</td>
                                    </tr>

                                    <tr className="text-gray-700 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">Hygienické potřeby a věci pro stolování</th>
                                    </tr>

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="text-red-500 font-bold px-6 py-3">kompletní sada jídelních misek (ešusů - jsou potřeba minimálně dvě nádoby), lahev na pití</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3">1</th>
                                        <td className="px-6 py-3">příbor + lžíce, škrabka na brambory</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">baterka</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">kapesníky, ručníky, utěrka a houbička na nádobí</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">kartáček na zuby, pasta, mýdlo, šampon</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="text-red-500 font-bold px-6 py-3">opalovací krém s ochranným faktorem</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="text-red-500 font-bold px-6 py-3">prostředek proti hmyzu a klíšťatům</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">hřeben</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-3"></th>
                                        <td className="px-6 py-3">toaletní papír</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="mt-5">
                                <span className="text-gray-700 font-bold">
                                    Ostatní doporučené potřeby:
                                </span>
                                <br />
                                <i>malý batoh na výlety, kapesní nůž, psací potřeby, dopisní papír, pálka na stolní tenis, rukávky nebo kruh, sluneční brýle</i>
                            </p>
                        </div>
                    </div>
                </section>

                <section id="Prihlaska" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Přihláška</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div>
                            <p className="mb-3">
                                Pro získání přihlášky nás kontaktujete na <a href="mailto:taborkamenna@gmail.com" className="text-blue-600 dark:text-blue-500 hover:underline">taborkamenna@gmail.com</a>
                            </p>
                            <ol className="list-decimal pl-6 space-y-4">
                                <li className="mb-4">
                                    Řádně vyplněnou stranu 3 přihlášky (Informace o dítěti a Adresy zákonných zástupců dosažitelných v době konání tábora) zašlete:
                                    <ol type="a" className="list-lower-alpha pl-6 mt-2 space-y-2">
                                        <li>
                                            Elektronicky na email <a href="mailto:taborkamenna@gmail.com" className="text-blue-600 dark:text-blue-500 hover:underline">taborkamenna@gmail.com</a>.
                                        </li>
                                        <li>
                                            Poštou na adresu:
                                            <ul className="pl-6 mt-2 space-y-1">
                                                <li>Kryštof Kahaj</li>
                                                <li>Bělohorská 493/63</li>
                                                <li>Praha 6 - Břevnov</li>
                                                <li>169 00</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </li>
                                <li className="mb-4">
                                    Peněžní částku za účast na stanovém táboře můžete uhradit bankovním převodem, nebo poštovní poukázkou na účet číslo 82721329/2010 vedeným u Fio banky. Do adresy majitele účtu napište Stanový tábor Kamenná z. s., Bělohorská 493/63, Praha 6. U všech typů plateb použijte rodné číslo dítěte jako variabilní symbol.
                                </li>
                                <li className="mb-4">
                                    Vzhledem k velkému zájmu o tento tábor je nutné, aby Informace o dítěti byly zaslány a poplatek za účast zaplacen nejpozději do 31. 5., jinak nebude dítě na tábor zařazeno.
                                </li>
                                <li className="mb-4">
                                    Řádně vyplněné “Prohlášení zákonných zástupců dítěte” a od lékaře potvrzený “Posudek o zdravotní způsobilosti dítěte k účasti na stanovém táboře” pak odevzdáte při nástupu do autobusu.
                                </li>
                                <li className="mb-4">
                                    Návštěvy dětí nejsou během tábora povoleny. V případě, že máte zájem vidět prostředí, v jakém budou Vaše děti žít, můžete nám přijet pomoci tábor budovat kdykoliv od 29.&nbsp;6. do 30.&nbsp;6., popř. jej 19.&nbsp;7. likvidovat.
                                </li>
                                <li className="font-bold">
                                    Zaslání přihlášky a zaplacení poplatku je&nbsp;za závazné.<br />
                                    Nakupujeme a kalkulujeme s potravinami, proto prosím pochopte, že není možné zaplacený poplatek vracet.
                                </li>
                            </ol>

                        </div>
                    </div>
                </section>

                <section id="Stormo-podminky" className="section-anchor">
                    <div className="container mx-auto">
                        <h2 className="text-left text-2xl font-bold text-butter-cup">Storno podmínky</h2>
                        <hr className="border-t border-gray-300 my-4" />
                        <div className="text-justify">
                            <p className="mb-3">
                                Milí rodiče, snažíme se vám vyjít maximálně vstříc a chápeme, že někdy se do cesty postaví jakákoliv překážka,
                                kvůli které dítě nemůže na tábor odjet. <strong>V&nbsp;tom případě nám prosím dejte co nejdříve vědět</strong>.
                                S blížícím se termínem tábora začínáme totiž nakupovat zásoby, a tedy máme vydaní ještě před samotným začátkem.
                                Je tedy důležité, abychom o změně věděli co nejdříve a mohli případně sehnat náhradníka.
                                Pokud ho neseženeme, budeme uplatňovat storno podmínky, které najdete podrobně popsané níže.
                            </p>
                            <p className="mb-3">
                                <strong>Pokud sami seženete náhradníka</strong> za Vaše dítě které nemůže jet, tak vám vrátíme celý uhrazený poplatek
                                (po tom, co obdržíme platbu za náhradníka), nehledě na to jak blízko začátku tábora to je.
                            </p>
                            <p className="mb-2"><strong>Pokud sami náhradníka neseženete:</strong></p>
                            <ul className="list-disc ms-5">
                                <li>dáte nám vědět do 31.5., vrátíme Vám 100% poplatku</li>
                                <li>dáte nám vědět po 31.5. do 24.6., vrátíme Vám 75% poplatku</li>
                                <li>dáte nám vědět po 24.6. do dne odjezdu, vrátíme Vám 20% poplatku</li>
                                <li>dáte nám vědět v den odjezdu, vrátíme Vám 0% poplatku, protože v den odjezdu už náhradníka sehnat neumíme 🙁</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
export default IWantToGo;