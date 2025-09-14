// src/components/ApplicationDetail.tsx
import { Application } from "@client/api";
import GeneralInfo from "./GeneralInfo.js";
import ParticipantInfo from "./ParticipantInfo.js";
import ChildDescription from "./ChildDescription.js";
import ParentsDeclaration from "./ParentsDeclaration.js";
import ParentsConsent from "./ParentsConsent.js";
import MedicalReport from "./MedicalReport.js";

export interface PdfApplicationTemplateProps {
  application: Application;
}

export default function PdfApplicationTemplate(props: PdfApplicationTemplateProps) {

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >

      <GeneralInfo />

      <div style={{ pageBreakBefore: "always" }}></div>

      <ParticipantInfo />

      <div style={{ pageBreakBefore: "always" }}></div>

      <ChildDescription application={props.application} />

      <div style={{ pageBreakBefore: "always" }}></div>

      <ParentsDeclaration application={props.application} />

      <div style={{ pageBreakBefore: "always" }}></div>

      <ParentsConsent application={props.application} />

      <div style={{ pageBreakBefore: "always" }}></div>

      <MedicalReport application={props.application} />
    </div>

  );
}
