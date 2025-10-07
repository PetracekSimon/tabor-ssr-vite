// src/components/ApplicationDetail.tsx
import { Application, TransportPlace } from "@client/api";
import { formatPhoneNumber, formtaDate } from "../utils.js";
import SectionHeader from "./SectionHeader.js";

export interface ChildDescriptionProps {
  application: Application;
}

export default function ChildDescription(props: ChildDescriptionProps) {
  const a = props.application;

  /**
   * Returns string value for transport place
   * @param transportPlace 
   * @returns 
   */
  const getTransportPlace = (transportPlace: TransportPlace) => {
    switch (transportPlace) {
      case "radlice":
        return "Radlice";
      case "radotin":
        return "Radotín";
      default:
        "Valstní doprava"
    }
  }

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
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5x" }}>
        PŘIHLÁŠKA NA LETNÍ STANOVÝ TÁBOR
      </h2>

      <SectionHeader application={props.application} />

      <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        Informace o dítěti
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
        <tbody>
          <tr>
            <td style={labelStyle}>Jméno:</td>
            <td style={inputBox}>{a.childFirstName}</td>
            <td style={labelStyle}>Příjmení:</td>
            <td style={inputBox}>{a.childLastName}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Datum narození:</td>
            <td style={inputBox}>{formtaDate(a.childBirthDate)}</td>
            <td style={labelStyle}>Bydliště:</td>
            <td style={inputBox}>{a.childAddress}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Číslo pojišťovny:</td>
            <td style={inputBox}>{a.insuranceNumber}</td>
            <td style={labelStyle}>Očkování proti tetanu:</td>
            <td style={inputBox}>{formtaDate(a.tetanusDate)}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Škola, třída:</td>
            <td style={inputBox}>{a.schoolInfo}</td>
            <td style={labelStyle}>Sourozenci:</td>
            <td style={inputBox}>{a.siblingsCount}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Poprvé na táboře:</td>
            <td style={inputBox}>{a.firstTime ? "Ano" : "Ne"}</td>
            <td style={labelStyle}>Kroužky/oddíly:</td>
            <td style={inputBox}>{a.hobbies}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        Kontakty na rodiče
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
        <tbody>
          <tr>
            <td style={labelStyle}>Zákonný zástupce 1:</td>
            <td style={inputBox}>{a.parent1Name}</td>
            <td style={labelStyle}>Telefon:</td>
            <td style={inputBox}>{formatPhoneNumber(a.parent1Phone)}</td>
          </tr>
          {a.parent2Name &&
            <tr>
              <td style={labelStyle}>Zákonný zástupce 2:</td>
              <td style={inputBox}>{a.parent2Name}</td>
              <td style={labelStyle}>Telefon:</td>
              <td style={inputBox}>{formatPhoneNumber(a.parent2Phone)}</td>
            </tr>
          }
          <tr>
            <td style={labelStyle}>Email:</td>
            <td style={inputBox} colSpan={3}>{a.parentEmail}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        Sdělění rodičů
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <tbody>
          <tr>
            <td style={labelStyle}>Plavec / Neplavec:</td>
            <td style={inputBox}>{a.swimming}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Zdravotní problémy:</td>
            <td style={{ ...cellStyle, height: "60px" }}>{a.healthProblems}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Nesnáší tato jídla:</td>
            <td style={{ ...cellStyle, height: "60px" }}>{a.foodAllergy}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Charakteristika dítěte:</td>
            <td style={{ ...cellStyle, height: "60px" }}>{a.childDescription}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>
        Doprava
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <tbody>
          <tr>
            <td style={labelStyle}>Nástupní místo:</td>
            <td style={inputBox}>{getTransportPlace(a.boardingPlace)}</td>
          </tr>
          <tr>
            <td style={labelStyle}>Výstupní místo:</td>
            <td style={inputBox}>{getTransportPlace(a.leavingPlace)}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", marginTop: "15px", fontSize: "20px" }}>
        Přiložte prosím kopii kartičky pojištěnce!
      </p>
    </div>
  );
}
