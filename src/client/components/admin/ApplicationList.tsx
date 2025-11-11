import { Api, Application } from "@client/api"
import ApplicationCard from "./ApplicationCard"
import { useAppStore } from "@client/ZustandContext";
import { useEffect, useState } from "react";
import ApplicationFilter from "./ApplicationFilter";
import ApplicationsTable from "./ApplicationTable";
import { toast } from "react-toastify";


const ApplicationList = () => {
    const { token } = useAppStore();

    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIslLoading] = useState<boolean>(true);
    const [viewType, setViewType] = useState<"card" | "table">("card");

    const api = new Api();

    const downloadApplications = async () => {
        await toast.promise(api.downloadApplications({}, token), {
            pending: "Generuji export přihlášek...",
            error: "Něco se pokazilo :(",
            success: "Export byl úspěšně vygenerován!"
        }).then((response: { data: ArrayBuffer }) => {
            const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Prihlasky.csv`);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    }

    const loadApplications = (filters = {}) => {
        setApplications([]);

        setIslLoading(true);

        api.getApplications({ filter: filters }, token).then(res => {
            setApplications(res.data.itemList);
            setIslLoading(false);
        });
    }

    useEffect(() => {
        loadApplications();
    }, []);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                    Přihlášky ({applications.length})
                </h2>
                <div className="flex flex-wrap gap-x-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Čeká na vyřízení: {applications.filter(app => app.state === "pending").length}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Schváleno: {applications.filter(app => app.state === "approved").length}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Zamítnuto: {applications.filter(app => app.state === "rejected").length}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Zaplaceno: {applications.filter(app => app.state === "paid").length}
                    </span>
                </div>
            </div>

            <ApplicationFilter submitHandler={loadApplications} />
            <div className="flex gap-4">
                <button
                    onClick={() => setViewType("card")}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" rx="1" ry="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="14" y="3" width="7" height="7" rx="1" ry="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="3" y="14" width="7" height="7" rx="1" ry="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="14" y="14" width="7" height="7" rx="1" ry="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <button
                    onClick={() => setViewType("table")}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="1" ry="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="3" y1="9" x2="21" y2="9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="3" y1="15" x2="21" y2="15" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="9" y1="3" x2="9" y2="21" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="15" y1="3" x2="15" y2="21" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </button>

                <button
                    onClick={downloadApplications}
                    className="inline-flex items-center ms-auto px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                    Stáhnout přihlášky
                </button>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <svg
                        className="animate-spin h-10 w-10 text-primary-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                </div>
            )}


            {applications.length === 0 && !isLoading &&
                <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-slate-500 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">Žádné přihlášky</h3>
                    <p className="text-slate-600 dark:text-slate-400">Zatím nebyly podány žádné přihlášky.</p>
                </div>
            }

            {viewType === "card" && applications.length !== 0 && !isLoading &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((application) => (
                        <ApplicationCard
                            key={application._id}
                            application={application}
                        />
                    ))}
                </div>
            }

            {viewType === "table"
                && applications.length !== 0 && !isLoading &&
                <ApplicationsTable applications={applications} />
            }
        </div>
    )
}

export default ApplicationList
