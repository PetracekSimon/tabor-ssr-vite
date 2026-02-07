import { Application } from "@client/api.js";
import SectionHeader from "./SectionHeader.js";
import { formtaDate } from "../utils.js";
import config from "../../config.js";

interface ParentsDeclarationProps {
    application: Application;
}

const ParentsDeclaration = (props: ParentsDeclarationProps) => {

    return (
        <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5x" }}>
                PROHLÁŠENÍ ZÁKONNÝCH ZÁSTUPCŮ DÍTĚTE
            </h2>
            <SectionHeader application={props.application} />

            <p style={{ fontSize: "14px" }}>Prohlašuji, že ošetřující lékař nenařídil dítěti</p>
            <table style={{ marginBottom: "20px", marginTop: "20px", width: "100%" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "50%", fontSize: "14px" }}><b>Jméno dítěte:</b> {props.application.childFirstName}&nbsp;{props.application.childLastName}</td>
                        <td style={{ width: "50%", fontSize: "14px" }}><b>Datum narození:</b> {formtaDate(props.application.childBirthDate)}</td>
                    </tr>
                </tbody>
            </table>
            <p style={{ fontSize: "14px" }}>
                změnu režimu, dítě nejeví známky akutního onemocnění (průjem, teplota apod.) a okresní hygienik ani
                ošetřující lékař nenařídil karanténní opatření. Prohlašuji, že v posledních třech týdnech nepřišlo dítě do
                styku s osobami, které onemocněly přenosnou nemocí.
                <br />
                Dítě je schopno zúčastnit se uvedeného typu tábora ve stanoveném termínu. Jsem si vědom(a) právních
                následků, které by mne postihly, kdyby toto mé prohlášení bylo nepravdivé. Dále prohlašuji, že dítě nemá
                vši ani hnidy. Pokud by u dítěte po příjezdu na tábor byly objeveny vši nebo hnidy, může být dítě z tábora
                vyloučeno bez nároku na vrácení poplatků, nebo mohou být rodičům naúčtovány veškeré náklady na
                odvšivení dítěte, oblečení a lůžkovin.
            </p>
            <p style={{ fontSize: "14px" }}>
                <b>{props.application.tripFreeTimeConsent ? "Souhlasím" : "Nesouhlasím"}</b> s tím, aby můj syn/dcera dostal/a na výletech rozchod.
                <br />
                Rozchod bude vyhlášen po omezenou a jasně stanovenou dobu v průběhu výletu. Děti budou náležitě
                poučeny o chování a dodržování bezpečnostních pravidel a budou se smět pohybovat pouze ve skupinkách.
                Tábor se takovým rozchodem nezříká dohledové povinnosti. Dohledová povinnost bude vykonávána tak, že
                vedoucí se budou pohybovat v prostoru, který bude pro rozchod vymezen (např. náměstí, areál zoo apod.),
                a děti budou znát místo, na kterém bude možné vedoucí kdykoliv zastihnout. V případě Vašeho nesouhlasu
                se dítě bude pohybovat po celou dobu s některým z vedoucích.
            </p>
            <p style={{ fontSize: "14px" }}>
                Se všemi vyplněnými částmi tohoto formuláře jsem byl/a seznámen/a, všechny údaje jsou přesné
                a pravdivé a jsou poskytovány dobrovolně.
            </p>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                Podpis zákonného zástupce dítěte ze dne, kdy dítě odjíždí na tábor.
                <br />
                <br />

                <table>
                    <tbody>
                        <tr>
                            <td>V</td>
                            <td style={{ width: "150px", borderBottom: "1px solid black" }}></td>
                            <td>&nbsp;dne 30. 6. {config.campYearInfo.year}</td>
                            <td style={{ width: "30px" }}>&nbsp;</td>
                            <td style={{ width: "200px", padding: "0 5px", borderBottom: "1px solid black" }}>Podpis:</td>
                        </tr>
                    </tbody>
                </table>
            </p>

            <div style={{ border: "1px solid black", width: "100%", height: "170px"}}>
                <p style={{padding: "10px"}}>
                    Adresa a telefon zákonného zástupce dosažitelného v době konání tábora a jeho vztah k
                    dítěti:
                    <br />
                    {props.application.parent1Name} - tel: {props.application.parent1Phone}
                    <br />
                    Kontaktní adresa zákonného zástupce: {props.application.parentAddress}
                </p>
            </div>
        </div>

    )
};

export default ParentsDeclaration;