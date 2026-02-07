import { Application } from "@client/api";
import SectionHeader from "./SectionHeader.js";
import { formtaDate } from "../utils.js";
import config from "../../config.js";

interface ParentsConsentProps {
    application: Application
}

const ParentsConsent = (props: ParentsConsentProps) => {
    return (
        <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5x" }}>
                SOUHLAS ZÁKONNÝCH ZÁSTUPCŮ DÍTĚTE
            </h2>
            <SectionHeader application={props.application} />

            <table style={{ marginBottom: "20px", marginTop: "20px", width: "100%" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "50%", fontSize: "14px" }}><b>Jméno dítěte:</b> {props.application.childFirstName}&nbsp;{props.application.childLastName}</td>
                        <td style={{ width: "50%", fontSize: "14px" }}><b>Datum narození:</b> {formtaDate(props.application.childBirthDate)}</td>
                    </tr>
                </tbody>
            </table>

            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                <u>
                    <b>
                        Souhlas vztahující se k aktualizaci našeho webového fotodeníku.
                    </b>
                </u>
                <br />
                Souhlasím s možností publikovat v elektronických médiích fotografie a videonahrávky pořízené během
                konání tábora, které zachycují mé dítě. Byl/a jsem poučen/a o právech podle zákona č. 101/2000 Sb., o
                ochraně osobních údajů v platném znění, zejména o svém právu tento souhlas kdykoliv odvolat a to i bez
                udání důvodu.
            </p>

            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                <u>
                    <b>
                        Souhlas vztahující se k naší zákonné povinnosti uchovávat a nakládat s informacemi.
                    </b>
                </u>
                <br />
                Souhlasím se shromažďováním, uchováním a zpracováním všech osobních údajů obsažených v tomto
                formuláři pro potřeby spolku Stanový tábor Kamenná, z.s. Získané údaje slouží k zajištění všech zákonných
                náležitostí a pro případné poskytnutí zdravotnické péče během konání letního tábora. S takto získanými
                údaji bude nakládat pouze hlavní vedoucí a zdravotník. Veškeré údaje budou uchovávány po dobu a
                způsobem stanoveným platným právním předpisem. Se všemi poskytnutými údaji bude zacházeno dle
                zákona č. 101/2000 Sb., o ochraně osobních údajů v platném znění a podle nařízení Evropského
                parlamentu a Rady EU 2016/679 ze dne 27. dubna 2016 o ochraně fyzických osob v souvislosti se
                zpracováním osobních údajů a o volném pohybu těchto údajů (obecné nařízení o ochraně osobních údajů).
            </p>

            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                <u>
                    <b>
                        V případě nutnosti ošetření dítěte ve zdravotnickém zařízení:
                    </b>
                </u>
                <br />
                Na táboře je přítomna kvalifikovaná zdravotnice, nicméně v případě potřeby lékařského vyšetření vozíme
                děti do nemocnice v Jihlavě. V takovém případě <b>vždy</b> informujeme rodiče, bez zbytečného prodlení,
                nejčastěji však po vyšetření lékařem, neboť pak víme přesně, jaký je zdravotní stav dítěte. Abychom byli
                schopni zajistit včas potřebnou péči, prosíme o podpis následujícího zplnomocnění.
            </p>

            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                <u>
                    <b>

                        Souhlasím - nesouhlasím
                    </b>
                </u>&nbsp;se zplnomocněním zdravotnice či vedoucího Stanového tábora Kamenná:
                <ol type="a">
                    <li>k doprovodu nezletilého k ošetření do lékařského zařízení mimo tábor;</li>
                    <li>k možnosti získat informace o zdravotním stavu a o navržených zdravotních službách;</li>
                    <li>k udělení souhlasu k poskytování zdravotnických služeb.</li>
                </ol>

                Se všemi vyplněnými částmi tohoto formuláře jsem byl/a seznámen/a, všechny údaje jsou přesné
                a pravdivé a jsou poskytovány dobrovolně.
            </p>

            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                Podpis zákonného zástupce dítěte ze dne, kdy dítě odjíždí na tábor.
                <br />
                <br />
                <br />
                <br />
                
                <table>
                    <tbody>
                        <tr>
                            <td>V</td>
                            <td style={{width: "150px", borderBottom: "1px solid black"}}></td>
                            <td>&nbsp;dne 1. 7. {config.campYearInfo.year}</td>
                            <td style={{width: "30px"}}>&nbsp;</td>
                            <td style={{width: "200px", padding: "0 5px", borderBottom: "1px solid black"}}>Podpis:</td>
                        </tr>
                    </tbody>
                </table>
            </p>
        </div>
    )
}

export default ParentsConsent;