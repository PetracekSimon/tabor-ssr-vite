import config from "../../config.js";

const GeneralInfo = () => {
    return (
        <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5x" }}>
                Všeobecné podmínky a základní pokyny
            </h2>

            <ol style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "10px" }}>
                    Řádně vyplněnou „Přihlášku na letní stanový tábor“ (Informace o dítěti)
                    zašlete
                    <ol type="a" style={{ paddingLeft: "18px", marginTop: "6px" }}>
                        <li style={{ marginBottom: "6px" }}>
                            Elektronicky na email&nbsp;
                            <a href="mailto:taborkamenna@gmail.com">
                                taborkamenna@gmail.com
                            </a>.
                        </li>
                        <li>
                            Poštou na adresu:<br />
                            Kryštof Kahaj<br />
                            Bělohorská 493/63<br />
                            Praha 6 – Břevnov<br />
                            169 00
                        </li>
                    </ol>
                </li>

                <li style={{ marginBottom: "10px" }}>
                    Peněžní částku za účast na stanovém táboře můžete uhradit bankovním
                    převodem, nebo poštovní poukázkou na účet číslo{" "}
                    <strong>82721329/2010</strong> vedeným u Fio banky. Do adresy majitele
                    účtu napište: Stanový tábor Kamenná z. s., Bělohorská 493/63, Praha 6. U
                    všech typů plateb použijte rodné číslo dítěte jako variabilní symbol.
                </li>

                <li style={{ marginBottom: "10px" }}>
                    Vzhledem k velkému zájmu o tento tábor je nutné, aby Informace o dítěti
                    byly zaslány a poplatek za účast zaplacen nejpozději do{" "}
                    <strong>{config.campYearInfo.paymentDeadline}&nbsp;{config.campYearInfo.year}</strong>, jinak nebude dítě na tábor zařazeno.
                </li>

                <li style={{ marginBottom: "10px" }}>
                    Řádně vyplněné „Prohlášení zákonných zástupců dítěte“, „Souhlas zákonných
                    zástupců dítěte“ a od lékaře potvrzený „Posudek o zdravotní způsobilosti
                    dítěte k účasti na stanovém táboře“ pak odevzdáte při nástupu do autobusu.
                </li>

                <li style={{ marginBottom: "10px" }}>
                    Návštěvy dětí nejsou během tábora povoleny. V případě, že máte zájem
                    vidět prostředí, v jakém budou Vaše děti žít, můžete nám přijet pomoci
                    tábor budovat kdykoliv od 28. 6. do 29. 6., popř. jej 18. 7. likvidovat.
                </li>

                <li style={{ marginBottom: "10px" }}>
                    <strong>
                        Pokud Vaše dítě nebude moci na tábor jet z jakéhokoliv důvodu, prosím
                        podívejte se na{" "}
                        <a href="https://www.stanovytabor.cz/chci-jet/storno-podminky/">
                            Storno podmínky na našich webových stránkách
                        </a>{" "}
                        (v menu Chci jet). Fotografie z minulých táborů naleznete na{" "}
                        <a href="https://www.stanovytabor.cz/galerie">www.stanovytabor.cz</a>.
                    </strong>
                </li>
            </ol>
        </div>
    )
}
export default GeneralInfo;