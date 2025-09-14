import config from "../../config.js";

const ParticipantInfo = () => {
    const defaultCell = {
        padding: "0 5px",
        border: "1px solid #000",
    }
    const itemsTH = {
        ...defaultCell,
        fontWeight: "bold",
    }
    const itemsCountTD = {
        ...defaultCell,
        width: "15px",
        verticalAlign: "top",
    }
    const itemTD = {
        ...defaultCell,
    }

    return (
        <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5x" }}>
                Informace pro účastníky stanového tábora Kamenná {config.campYearInfo.dateAsString}&nbsp;{config.campYearInfo.year}
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", fontSize: "13px", lineHeight: "1.5", marginBottom: "20px" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "150px", verticalAlign: "top", fontWeight: "bold" }}>Odjezd:</td>
                        <td>
                            Odjezd dětí z Prahy je ve pondělí 30. 6. v 9 hodin od Sportovní haly Radotín a v 9:30 z parku naproti ZŠ Radlická (v blízkosti hlavního vjezdu do plaveckého areálu).
                        </td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Příjezd:</td>
                        <td>
                            Příjezd dětí k ZŠ Radlická a následně do Radotína je v pátek 18. 7. kolem 18:30.
                        </td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Vedoucí tábora:</td>
                        <td>Kryštof Kahaj, tel.: 776 648 406</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Cena:</td>
                        <td>7 100,- Kč / 19 dní</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Stravování:</td>
                        <td>Je 5 x denně. Děti se podílejí na přípravě jídel pod dohledem kuchaře.</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Program:</td>
                        <td>Celotáborová etapová hra na téma „Egypt“.</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Ubytování:</td>
                        <td>Všechny děti, stejně jako vedoucí, jsou ubytovány ve stanech s podsadou.</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Zdravotní péče:</td>
                        <td>Na táboře je přítomna kvalifikovaná zdravotnice. V případě potřeby lékařského vyšetření vozíme děti do nemocnice v Jihlavě.</td>
                    </tr>

                    <tr>
                        <td style={{ fontWeight: "bold", verticalAlign: "top" }}>Adresa tábora:</td>
                        <td>Letní stanový tábor Kamenná Dobronín 588 12, neposílejte prosím nic přes dopravní společnosti (PPL, DPD apod).</td>
                    </tr>
                </tbody>
            </table>

            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
                Orientační seznam věcí pro stanový tábor Kamenná:
            </h3>

            {/* Seznam doporučených věcí */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: "20px",
                }}
            >
                <tbody>
                    <tr>
                        {/* levá tabulka */}
                        <td style={{ width: "50%", verticalAlign: "top" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <tbody>
                                    <tr>
                                        <td colSpan={2} style={itemsTH}>
                                            Osobní prádlo a oblečení
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            sportovní nepromokavá bunda
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            pláštěnka do deště !!!
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            3
                                        </td>
                                        <td style={itemTD}>
                                            tepláková souprava
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            teplá tepláková souprava na spaní
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            2
                                        </td>
                                        <td style={itemTD}>
                                            teplý svetr
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            2
                                        </td>
                                        <td style={itemTD}>
                                            krátké kalhoty nebo sukně
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            plavky
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            2
                                        </td>
                                        <td style={itemTD}>
                                            nepromokavé kalhoty (šusťáky)
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            dostatečné množství osobního prádla
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            dostatečné množství ponožek a podkolenek
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            trička, košile
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            čepice (kšiltovka)
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            <strong>teplý spacák !!!</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} style={itemTD}>
                                            &nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                        {/* pravá tabulka */}
                        <td style={{ width: "50%", verticalAlign: "top" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <tbody>
                                    <tr>
                                        <td colSpan={2} style={itemsTH}>
                                            Obuv
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            pevné boty/pohorky
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            gumové holínky !!!
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            sandály
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            sportovní obuv
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2} style={itemsTH}>
                                            Hygienické potřeby a věci pro stolování
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            kompletní sada jídelních misek (ešusů), lahev na pití
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>
                                            1
                                        </td>
                                        <td style={itemTD}>
                                            příbor + lžíce, škrabka na brambory
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            baterka
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            kapesníky, ručníky, utěrka a houbička na nádobí
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            kartáček na zuby, pasta, mýdlo s pouzdrem, šampón
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            opalovací krém s ochranným faktorem
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            prostředek proti hmyzu a klíšťatům
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            hřeben, nůžky na nehty, šitíčko apod.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={itemsCountTD}>

                                        </td>
                                        <td style={itemTD}>
                                            toaletní papír
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
                Ostatní doporučené potřeby
            </h3>
            <p style={{ marginBottom: "5px" }}>
                malý batoh, kapesní nůž, psací potřeby, dopisní papír, pálka na stolní tenis, rukávky nebo kruh, sluneční
                brýle. Pokud můžete darovat větší panenku, která se může zničit (k vytvoření mumie), budeme rádi.
            </p>
            <p style={{ marginBottom: "5px" }}>
                <strong>
                    U menších dětí doporučujeme oblečení opatřit jmenovkou, aby vám přivezly zpět většinu
                    vlastního oblečení. Důrazně nedoporučujeme brát si s sebou drahé předměty.
                </strong>
            </p>
            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
                Ostatní doporučení a informace
            </h3>
            <ol>
                <li>
                    Podrobnější informace o táboře lze najít na www.stanovytabor.cz, kde budeme také průběžně
                    doplňovat fotodeník, mapující běžný táborový život i vzrušující dobrodružství při plnění etapových her
                </li>
                <li>
                    Kapesné dle možnosti rodičů cca 600,- až 900,- Kč
                </li>
                <li>
                    Pro menší děti doporučujeme předepsat zpáteční adresy na několik obálek nebo korespondenčních
                    lístků
                </li>
                <li>
                    Jakékoliv další informace je možno získat na telefonu 776 648 406 u K. Kahaje, stejně tak prosíme o
                    nahlášení jakýchkoliv změn na stejné tel. číslo.
                </li>
            </ol>
        </div>
    )
}
export default ParticipantInfo;