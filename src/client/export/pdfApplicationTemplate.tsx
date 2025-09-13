// src/components/ApplicationDetail.tsx
import { Application } from "@client/api";
import config from "../../config";

export interface PdfApplicationTemplateProps {
  application: Application;
}

export default function PdfApplicationTemplate(props: PdfApplicationTemplateProps) {
  const a = props.application;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", padding: "20px" }}>
      <h1 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
        PŘIHLÁŠKA NA LETNÍ STANOVÝ TÁBOR
      </h1>

      <table border={1} cellPadding={5} style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
        <tbody>
          <tr><td>Typ tábora:</td><td>stanový (stany s podsadou)</td></tr>
          <tr><td>Provozovatel:</td><td>Stanový tábor Kamenná z.s.</td></tr>
          <tr><td>Místo tábora:</td><td>Kamenná u Dobronína, okr. Jihlava</td></tr>
          <tr><td>Termín:</td><td>{config.campYearInfo.dateAsString} {config.campYearInfo.year}</td></tr>
          <tr><td>Přihláška číslo:</td><td>{a.applicationNumber}</td></tr>
          <tr><td>Jméno dítěte:</td><td>{a.childFirstName} {a.childLastName}</td></tr>
        </tbody>
      </table>

      <h2 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>Informace o dítěti:</h2>
      <p><b>Datum narození:</b> {a.childBirthDate}</p>
      <p><b>Bydliště:</b> {a.childAddress}</p>
      <p><b>Číslo zdravotní pojišťovny:</b> {a.insuranceNumber}</p>
      <p><b>Datum očkování proti tetanu:</b> {a.tetanusDate}</p>
      <p><b>Chodí do školy:</b> {a.schoolInfo}</p>
      <p><b>Počet sourozenců:</b> {a.siblingsCount}</p>
      <p><b>Jede poprvé:</b> {a.firstTime ? "Ano" : "Ne"}</p>
      <p><b>Kroužky:</b> {a.hobbies}</p>

      <h3>Rodiče:</h3>
      <p><b>Matka:</b> {a.motherName}, tel: {a.motherPhone}</p>
      <p><b>Otec:</b> {a.fatherName}, tel: {a.fatherPhone}</p>
      <p><b>Email:</b> {a.parentEmail}</p>

      <h3>Sdělení rodičů:</h3>
      <p><b>Plavec / Neplavec:</b> {a.swimming}</p>
      <p><b>Zdravotní problémy:</b> {a.healthProblems}</p>
      <p><b>Nesnáší tato jídla:</b> {a.foodAllergy}</p>
      <p><b>Charakteristika dítěte:</b> {a.childDescription}</p>

      <h3>Doprava:</h3>
      <p><b>Nástupní místo:</b> {a.boardingPlace}</p>
      <p><b>Výstupní místo:</b> {a.leavingPlace}</p>
    </div>
  );
}
