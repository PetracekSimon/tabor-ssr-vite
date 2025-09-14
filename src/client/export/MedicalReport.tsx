import { Application } from "@client/api.js";
import { formtaDate } from "@client/utils.js";

interface MedicalReportProps {
    application: Application;
}

const MedicalReport = (props: MedicalReportProps) => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", flexGrow: "1", paddingBottom: "5px" }}>
                    Posudek o zdravotní způsobilosti dítěte k účasti na stanoveném táboře
                </h2>
                <div style={{ fontSize: "12px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <p>Číslo přihlášky: 51.</p>
                </div>
            </div>

            {/* 1. Identifikační údaje */}
            <div style={{ marginBottom: "10px" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "0px" }}>1. Identifikační údaje</h3>
                <p style={{ fontSize: "12px", marginBottom: "5px", marginTop: "0px" }}>
                    <b>Název poskytovatele zdravotnických služeb vydávajícího posudek:</b>
                </p>
                <p style={{ fontSize: "12px", marginBottom: "5px", marginTop: "0px" }}>
                    <b>Adresa sídla nebo místa podnikání poskytovatele:</b>
                </p>
                <p style={{ fontSize: "12px", marginBottom: "5px", marginTop: "0px" }}>
                    <b>IČO:</b>
                </p>
                <p style={{ fontSize: "12px", marginBottom: "5px", marginTop: "0px" }}>
                    <b>Jméno, popřípadě jména a příjmení posuzovaného dítěte:</b> {props.application.childFirstName} {props.application.childLastName}
                </p>
                <p style={{ fontSize: "12px", marginBottom: "5px", marginTop: "0px" }}>
                    <b>Datum narození posuzovaného dítěte:</b> {formtaDate(props.application.childBirthDate)}
                </p>
                <p style={{ fontSize: "12px", marginBottom: "5px", marginTop: "0px" }}>
                    <b>Adresa místa trvalého pobytu nebo jiného bydliště na území České republiky posuzovaného dítěte:</b> {props.application.childAddress}
                </p>
            </div>

            {/* 2. Účel vydání posudku */}
            <div style={{ marginBottom: "10px" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "0px" }}>2. Účel vydání posudku</h3>
                <p style={{ fontSize: "12px", marginTop: "0" }}>
                    Účast na stanoveném táboře v termínu 30. 6. - 18. 7. 2025
                </p>
            </div>

            {/* 3. Posudkový závěr */}
            <div style={{ marginBottom: "5px" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "0px" }}>3. Posudkový závěr</h3>
                <div style={{ marginLeft: "20px", fontSize: "12px" }}>
                    <p style={{ marginBottom: "5px", marginTop: "0px" }}>A. Posuzované dítě k účasti na stanoveném táboře:</p>
                    <ul style={{ listStyleType: "none", paddingLeft: "20px", margin: "0" }}>
                        <li style={{ marginBottom: "5px" }}>a. je zdravotně způsobilé*):</li>
                        <li style={{ marginBottom: "5px" }}>b. není zdravotně způsobilé*)</li>
                        <li style={{ marginBottom: "5px" }}>c. je zdravotně způsobilé za podmínky (s omezením)**)......................</li>
                    </ul>
                </div>

                <div style={{ marginLeft: "20px", fontSize: "12px", marginTop: "5px" }}>
                    <p style={{ marginBottom: "5px" }}>B. Posuzované dítě:</p>
                    <ul style={{ listStyleType: "none", paddingLeft: "20px", margin: "0" }}>
                        <li style={{ marginBottom: "5px" }}>a. se podrobilo stanoveným pravidelným očkováním: ANO - NE</li>
                        <li style={{ marginBottom: "5px" }}>b. je proti nákaze imunní (typ/druh):......................................................</li>
                        <li style={{ marginBottom: "5px" }}>c. má trvalou kontraindikaci proti očkování (typ/druh):.......................</li>
                        <li style={{ marginBottom: "5px" }}>d. je alergické na:...............................................................................</li>
                        <li style={{ marginBottom: "5px" }}>e. dlouhodobě užívá léky (typ/druh, dávka):.......................................</li>
                    </ul>
                </div>
            </div>

            {/* Poznámka */}
            <div>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "0px" }}>Poznámka:</h3>
                <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                    *) Nehodící se škrtněte
                    <br />
                    **) Bylo-li zjištěno, že posuzované dítě je zdravotně způsobilé s omezením, uvede se omezení podmiňující zdravotní stav způsobilosti k účasti na zotavovací akci a škole v přírodě.
                </p>
            </div>

            {/* 4. Poučení */}
            <div>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "0px" }}>4. Poučení</h3>
                <p style={{ fontSize: "12px", marginTop: "0px" }}>
                    Proti bodu 3. části A) tohoto posudku lze podle § 46 odst. 1 zákona č. 373/2011 Sb., o specifických zdravotních službách, ve znění pozdějších předpisů, podat návrh na jeho přezkoumání do 10 pracovních dnů ode dne jeho prokazatelného předání poskytovatelem zdravotnických služeb, který posudek vydal. Návrh na přezkoumání lékařského posudku nemá odkladný účinek, jestliže z jeho obsahu vyplývá, že posuzovaná osoba je pro účel, pro nějž byla posuzována, zdravotně nezpůsobilá nebo zdravotně způsobilá s podmínkou.
                </p>
            </div>

            {/* 5. Oprávněná osoba */}
            <div>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "0px" }}>5. Oprávněná osoba</h3>
                <p style={{ fontSize: "12px", marginBottom: "0px" }}>
                    <b>Jméno, popřípadě jména a příjmení oprávněné osoby:</b>
                    <br />
                    <b>Vztah k posuzovanému dítěti (zákonný zástupce, opatrovník, pěstoun, popř. další příbuzný dítěte):</b>
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "20px" }}>
                    <div style={{ flex: "1", fontSize: "12px" }}>
                        <p>Oprávněná osoba převzala posudek do vlastních rukou dne:</p>
                        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "100px", height: "1px" }}></span>
                    </div>
                    <div style={{ flex: "1", fontSize: "12px", textAlign: "right" }}>
                        <p>Podpis oprávněné osoby</p>
                        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "100px", height: "1px" }}></span>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "10px" }}>
                    <div style={{ flex: "1", fontSize: "12px" }}>
                        <p>Datum vydání posudku:</p>
                        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "100px", height: "1px" }}></span>
                    </div>
                    <div style={{ flex: "1", fontSize: "12px", textAlign: "right" }}>
                        <p>Jméno, příjmení a podpis lékaře razítko poskytovatele zdravotnických služeb</p>
                        <span style={{ borderBottom: "1px solid black", display: "inline-block", width: "100px", height: "1px" }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalReport;
