import { json2csv } from 'json-2-csv';

const mapSwimming = (s: string) => {
  const map: Record<string,string> = {
    neplavec: "Neplavec",
    plavec: "Plavec",
    pokrocily: "Pokročilý plavec"
  }

  return map[s] ?? s
}

const mapPlace = (p: string) => {
  const map: Record<string,string> = {
    radotin: "Radotín",
    vlastni: "Vlastní doprava"
  }

  return map[p] ?? p
}

export const exportDataToCsv = async (applications: any[]) => {

    const rows = applications.map(a => {
        const app = a.toObject()

        return {
            "Číslo přihlášky": app.applicationNumber + "/" + app.summerCampYear,
            "Jméno dítěte": app.childFirstName,
            "Příjmení dítěte": app.childLastName,
            "Datum narození": app.childBirthDate,
            "Rodič": app.parent1Name,
            "Telefon": app.parent1Phone,
            "Email": app.parentEmail,
            "Plavání": mapSwimming(app.swimming),
            "Nástup": mapPlace(app.boardingPlace),
            "Odjezd": mapPlace(app.leavingPlace),
            "Souhlas s rozchodem": app.tripFreeTimeConsent ? "Ano" : "Ne"
        }
    })

    const csv = await json2csv(rows, {
        delimiter: {
            field: ";"
        }
    })

    return csv;
}