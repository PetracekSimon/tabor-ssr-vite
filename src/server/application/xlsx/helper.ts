import ExcelJS from 'exceljs';
import path from 'path';
import { ApplicationType } from '../model';

/**
 * Vytvoří XLSX soubor z pole aplikací
 * @param {Array} applications - pole objektů z MongoDB
 */
export async function exportApplicationsToExcel(applications: ApplicationType[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Přihlášky');

  // Definuj sloupce (z headeru + key podle schema)
  sheet.columns = [
    { header: 'Rok tábora', key: 'summerCampYear', width: 12 },
    { header: 'Číslo přihlášky', key: 'applicationNumber', width: 20 },
    { header: 'Stav', key: 'state', width: 12 },

    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
    { header: 'Datum narození', key: 'childBirthDate', width: 15 },
    { header: 'Adresa', key: 'childAddress', width: 30 },
    { header: 'Pohlaví', key: 'childGender', width: 10 },

    { header: 'Číslo pojišťovny', key: 'insuranceNumber', width: 15 },
    { header: 'Datum očkování proti tetanu', key: 'tetanusDate', width: 15 },
    { header: 'Škola', key: 'schoolInfo', width: 25 },
    { header: 'Sourozenci', key: 'siblingsCount', width: 10 },
    { header: 'Poprvé?', key: 'firstTime', width: 10 }, 
    { header: 'Koníčky', key: 'hobbies', width: 20 },

    { header: 'Rodič 1', key: 'parent1Name', width: 20 },
    { header: 'Telefon 1', key: 'parent1Phone', width: 15 },
    { header: 'Rodič 2', key: 'parent2Name', width: 20 },
    { header: 'Telefon 2', key: 'parent2Phone', width: 15 },
    { header: 'Email', key: 'parentEmail', width: 25 },

    { header: 'Plavec?', key: 'swimming', width: 10 },
    { header: 'Zdravotní problémy', key: 'healthProblems', width: 25 },
    { header: 'Alergie', key: 'foodAllergy', width: 20 },
    { header: 'Popis dítěte', key: 'childDescription', width: 25 },
    { header: 'Stan preference', key: 'tentPreference', width: 15 },

    { header: 'Nástupní místo', key: 'boardingPlace', width: 15 },
    { header: 'Odjezdové místo', key: 'leavingPlace', width: 15 },

    { header: 'Souhlas s výletem', key: 'tripFreeTimeConsent', width: 10 },
    { header: 'Souhlas s fotkami', key: 'photoConsent', width: 10 },
    { header: 'Souhlas s ošetřením', key: 'medicalTreatmentConsent', width: 10 },

    { header: 'Vytvořeno', key: 'createdAt', width: 20 },
    { header: 'Upraveno', key: 'updatedAt', width: 20 },
  ];

  // Přidej data
  const formatted = applications.map(app => ({
    ...app,
    firstTime: app.firstTime ? 'Ano' : 'Ne',
    tripFreeTimeConsent: app.tripFreeTimeConsent ? 'Ano' : 'Ne',
    photoConsent: app.photoConsent ? 'Ano' : 'Ne',
    medicalTreatmentConsent: app.medicalTreatmentConsent ? 'Ano' : 'Ne',
    createdAt: new Date(app.createdAt).toLocaleString(),
    updatedAt: new Date(app.updatedAt).toLocaleString(),
  }));

  console.log(formatted);
  
  sheet.addRows(formatted);

  // Trocha stylu – první řádek tučně
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Uložení
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
