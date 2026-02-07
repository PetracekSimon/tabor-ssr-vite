import { Application } from "@client/api"

interface ApplicationsTableProps {
    applications: Application[];
}


export default function ApplicationsTable(props: ApplicationsTableProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                Přehled přihlášek
            </h3>

            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                    <table className="table-fixed w-full text-sm text-left text-slate-700 dark:text-slate-300 border-collapse min-w-[]">

                        <thead className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white text-xs uppercase">
                            <tr>
                                <th className="w-[90px] px-4 py-3 border-b border-slate-200 dark:border-slate-600">#</th>
                                <th className="w-[160px] px-4 py-3 border-b border-slate-200 dark:border-slate-600">Jméno dítěte</th>
                                <th className="w-[160px] px-4 py-3 border-b border-slate-200 dark:border-slate-600">Rodič 1</th>
                                <th className="w-[160px] px-4 py-3 border-b border-slate-200 dark:border-slate-600">Rodič 2</th>
                                <th className="w-[90px] px-4 py-3 border-b border-slate-200 dark:border-slate-600">Focením</th>
                                <th className="w-[160px] px-4 py-3 border-b border-slate-200 dark:border-slate-600">Status</th>
                                {/* TODO: další property */}
                            </tr>
                        </thead>
                        <tbody>
                            {props.applications.map((application) => (
                                <tr
                                    key={application._id}
                                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">
                                        #{application.applicationNumber}/{application.summerCampYear}
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.childFirstName} {application.childLastName}
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.parent1Name}
                                        <br />
                                        <a className="text-blue-600 dark:text-blue-500 hover:underline" href={"tel:" + application.parent1Phone}>{application.parent1Phone}</a>
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.parent2Name}
                                        <br />
                                        <a className="text-blue-600 dark:text-blue-500 hover:underline" href={"tel:" + application.parent2Phone}>{application.parent2Phone}</a>
                                    </td>
                                    <td className="px-4 py-3">
                                        {application.tripFreeTimeConsent ? (
                                            <span className="text-green-600 dark:text-green-400 font-medium">Ano</span>
                                        ) : (
                                            <span className="text-red-600 dark:text-red-400 font-medium">Ne</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium border 
                    ${application.state === "approved"
                                                    ? "border-green-400 text-green-600 dark:text-green-400"
                                                    : application.state === "paid"
                                                        ? "border-blue-400 text-blue-600 dark:text-blue-400"
                                                        : application.state === "rejected"
                                                            ? "border-red-400 text-red-600 dark:text-red-400"
                                                            : "border-yellow-400 text-yellow-600 dark:text-yellow-400"
                                                }`}
                                        >
                                            {application.state === "pending"
                                                ? "Čeká na vyřízení"
                                                : application.state === "approved"
                                                    ? "Schváleno"
                                                    : application.state === "paid"
                                                        ? "Zaplaceno"
                                                        : "Zamítnuto"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
