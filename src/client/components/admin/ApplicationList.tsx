import { Api, Application } from "@client/api"
import ApplicationCard from "./ApplicationCard"
import { useAppStore } from "@client/ZustandContext";
import { useEffect, useState } from "react";


const ApplicationList = () => {
    const { token } = useAppStore();

    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIslLoading] = useState<boolean>(true);

    const api = new Api();

    useEffect(() => {
        api.getApplications({}, token).then(res => {
          setApplications(res.data.itemList);
          setIslLoading(false);
        });
      }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6 animate-pulse">
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-300 dark:bg-slate-600 rounded w-24"></div>
                                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-32"></div>
                            </div>
                            <div className="h-6 bg-gray-300 dark:bg-slate-600 rounded w-20"></div>
                        </div>
                        <div className="space-y-3">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-16"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-24"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-16"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-24"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 dark:text-slate-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">Žádné přihlášky</h3>
                <p className="text-slate-600 dark:text-slate-400">Zatím nebyly podány žádné přihlášky.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                    Přihlášky ({applications.length})
                </h2>
                <div className="flex space-x-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Čeká: {applications.filter(app => app.state === "pending").length}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((application) => (
                    <ApplicationCard
                        key={application._id}
                        application={application}
                    />
                ))}
            </div>
        </div>
    )
}

export default ApplicationList
