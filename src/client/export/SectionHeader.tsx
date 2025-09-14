import { Application } from "@client/api";
import config from "../../config.js";

interface SectionHeaderProps{
    application: Application;
}

const SectionHeader = (props: SectionHeaderProps) => {
    const cellStyle = {
        border: "1px solid #000",
        padding: "6px",
        verticalAlign: "top",
        fontSize: "13px",
    };

    const labelStyle = {
        ...cellStyle,
        fontWeight: "bold",
        width: "160px",
        backgroundColor: "#f5f5f5",
    };

    const inputBox = {
        ...cellStyle,
    };
    return (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
            <tbody>
                <tr>
                    <td style={labelStyle}>Typ tábora:</td>
                    <td style={inputBox}>stanový (stany s podsadou)</td>
                </tr>
                <tr>
                    <td style={labelStyle}>Provozovatel:</td>
                    <td style={inputBox}>Stanový tábor Kamenná z.s.</td>
                </tr>
                <tr>
                    <td style={labelStyle}>Místo tábora:</td>
                    <td style={inputBox}>Kamenná u Dobronína, okr. Jihlava</td>
                </tr>
                <tr>
                    <td style={labelStyle}>Termín:</td>
                    <td style={inputBox}>{config.campYearInfo.dateAsString}&nbsp;{config.campYearInfo.year}</td>
                </tr>
                <tr>
                    <td style={labelStyle}>Přihláška číslo:</td>
                    <td style={inputBox}>{props.application.applicationNumber}</td>
                </tr>
                <tr>
                    <td style={labelStyle}>Jméno dítěte:</td>
                    <td style={inputBox}>{props.application.childFirstName}&nbsp;{props.application.childLastName}</td>
                </tr>
            </tbody>
        </table>
    )
}


export default SectionHeader;