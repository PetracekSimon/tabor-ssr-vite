import { Application } from "@client/api";

interface ApplicationDetailProps {
    application: Application;
}

export const ApplicationDetail = (props: ApplicationDetailProps) => {
    const app = props.application;

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 mb-10 w-[500px]">
            <div className="space-y-2">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Jméno dítěte:</strong> {app.childFirstName} {app.childLastName}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Datum narození:</strong> {app.childBirthDate}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Bydliště:</strong> {app.childAddress}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Číslo zdravotní pojišťovny:</strong> {app.insuranceNumber}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Datum očkování proti tetanu:</strong> {app.tetanusDate}
                </p>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Chodí do školy:</strong> {app.schoolInfo || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Počet sourozenců:</strong> {app.siblingsCount ?? "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Jede na tábor poprvé:</strong> {app.firstTime ? "Ano" : "Ne"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Zájmové kroužky:</strong> {app.hobbies || "Neuvedeno"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-md font-semibold text-slate-800 dark:text-white">Matka</h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Jméno a příjmení:</strong> {app.motherName || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Telefon:</strong> {app.motherPhone || "Neuvedeno"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-md font-semibold text-slate-800 dark:text-white">Otec</h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Jméno a příjmení:</strong> {app.fatherName || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Telefon:</strong> {app.fatherPhone || "Neuvedeno"}
                </p>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Kontaktní e-mail:</strong> {app.parentEmail || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Plavec / neplavec:</strong> {app.swimming || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Zdravotní problémy:</strong> {app.healthProblems || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Nesnáší tato jídla:</strong> {app.foodAllergy || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Charakteristika dítěte:</strong> {app.childDescription || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Nástupní místo:</strong> {app.boardingPlace || "Neuvedeno"}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Výstupní místo:</strong> {app.leavingPlace || "Neuvedeno"}
                </p>
            </div>
        </div>
    );
};