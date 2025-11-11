import { ApplicationType } from "../application/model";
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { Buffer } from "node:buffer";
import { getStatusText } from "./utils";
// Vše:
const allProps = [
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
    { header: 'Jídlo co nejí', key: 'foodAllergy', width: 20 },
    { header: 'Popis dítěte', key: 'childDescription', width: 25 },
    { header: 'Stan preference', key: 'tentPreference', width: 15 },

    { header: 'Nástupní místo', key: 'boardingPlace', width: 15 },
    { header: 'Odjezdové místo', key: 'leavingPlace', width: 15 },

    { header: 'Souhlas s rozchodem', key: 'tripFreeTimeConsent', width: 10 },
    { header: 'Souhlas s fotkami', key: 'photoConsent', width: 10 },
    { header: 'Souhlas s ošetřením', key: 'medicalTreatmentConsent', width: 10 },

    { header: 'Vytvořeno', key: 'createdAt', width: 20 },
    { header: 'Upraveno', key: 'updatedAt', width: 20 },
];

const simpleList = [
    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
    { header: 'Datum narození', key: 'childBirthDate', width: 15 },
    { header: 'Věk', key: '{TODO:CALCULATE}', width: 15 },
    { header: 'Pohlaví', key: 'childGender', width: 15 },
    { header: 'Nástupní místo', key: 'boardingPlace', width: 15 },
    { header: 'Odjezdové místo', key: 'leavingPlace', width: 15 },

]

// Seznam co nežerou: 
const foodAllergy = [
    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
    { header: 'Jídlo co nejí', key: 'foodAllergy', width: 20 },
]

// Nesouhlas s rozchodem
const antiConsentTripFreeTime = [
    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
]
// NeSouhlas s fotkami
const antiConsentPhoto = [
    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
]
// Nesouhlas s ošetřením
const antiConsentMedicalTreatment = [
    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
]
const antiSwiminingChilds = [
    { header: 'Jméno dítěte', key: 'childFirstName', width: 15 },
    { header: 'Příjmení dítěte', key: 'childLastName', width: 15 },
]


/**
 * Vytvoří XLSX soubor z pole aplikací
 * @param {Array} applications - pole objektů z MongoDB
 */
export async function exportApplicationsToCsv(applications: ApplicationType[]) {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });


    const myOwnData = applications.map(application => ({
        cislo_prihlasky: application.applicationNumber,
        rok: application.summerCampYear,
        stav: getStatusText(application.state),

        jmeno_ditete: `${application.childFirstName} ${application.childLastName}`,
        datum_narozeni: application.childBirthDate,
        adresa: application.childAddress,
        pohlavi: application.childGender,

        pojistovna: application.insuranceNumber,
        tetanus: application.tetanusDate,

        skola: application.schoolInfo,
        sourozenci: application.siblingsCount,
        poprve: application.firstTime ? "ANO" : "NE",
        konicky: application.hobbies,

        rodic_1: application.parent1Name,
        telefon_1: application.parent1Phone,
        rodic_2: application.parent2Name,
        telefon_2: application.parent2Phone,
        email: application.parentEmail,

        plavani: application.swimming,
        zdravotni_problemy: application.healthProblems,
        potravinove_alergie: application.foodAllergy,
        popis_ditete: application.childDescription,
        pozadavek_na_stan: application.tentPreference,

        misto_odjezdu: application.boardingPlace,
        misto_navratu: application.leavingPlace,

        souhlas_volny_program: application.tripFreeTimeConsent ? "ANO" : "NE",
        souhlas_foceni: application.photoConsent ? "ANO" : "NE",
        souhlas_lecba: application.medicalTreatmentConsent ? "ANO" : "NE",
    }));

    // Converts your Array<Object> to a CsvOutput string based on the configs
    const csv = generateCsv(csvConfig)(myOwnData);
    const filename = `${csvConfig.filename}.csv`;
    const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));
    return csvBuffer;
}