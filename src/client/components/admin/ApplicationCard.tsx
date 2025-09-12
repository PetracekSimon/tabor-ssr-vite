import { Api, Application } from "@client/api";
import { useAppStore } from "@client/ZustandContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import { ApplicationDetail } from "./ApplicationDetail";

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard = (props: ApplicationCardProps) => {

  const api = new Api();
  const { token } = useAppStore();

  const [application, setApplication] = useState<Application>(props.application);
  const [showApplicationModal, setShowApplicationModal] = useState<boolean>(false);

  const getStatusColor = (state: string) => {
    switch (state) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "paid":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (state: string) => {
    switch (state) {
      case "pending":
        return "Čeká na vyřízení";
      case "approved":
        return "Schváleno";
      case "rejected":
        return "Zamítnuto";
      case "paid":
        return "Zaplaceno";
      default:
        return state;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ");
  };


  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      state: props.application.state,
    },
  });

  const onStatusChange = async (data: { state: string }) => {
    const resp = await api.updateApplicationState({ id: application._id, state: data.state }, token);
    setApplication(resp.data);

  };

  const stateValue = watch("state");

  useEffect(() => {
    if (stateValue && stateValue !== props.application.state) {
      handleSubmit(onStatusChange)();
    }
  }, [stateValue])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
      {/* Header with application number and status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            #{application.applicationNumber}/{application.summerCampYear}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {application.childFirstName} {application.childLastName}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.state)}`}>
            {getStatusText(application.state)}
          </span>
        </div>
      </div>

      {/* Key information */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Datum narození:</span>
            <p className="font-medium text-slate-800 dark:text-white">{formatDate(application.childBirthDate)}</p>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Bydliště:</span>
            <p className="font-medium text-slate-800 dark:text-white">{application.childAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">E-mail:</span>
            <p className="font-medium text-slate-800 dark:text-white">{application.parentEmail}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Telefon matka:</span>
            <p className="font-medium text-slate-800 dark:text-white">{application.motherPhone || "Neuveden"}</p>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Telefon otec:</span>
            <p className="font-medium text-slate-800 dark:text-white">{application.fatherPhone || "Neuveden"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Plavání:</span>
            <p className="font-medium text-slate-800 dark:text-white">
              {application.swimming === "plavec" ? "Plavec" : "Neplavec"}
            </p>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Poprvé:</span>
            <p className="font-medium text-slate-800 dark:text-white">{application.firstTime ? "Ano" : "Ne"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">Nástup:</span>
            <p className="font-medium text-slate-800 dark:text-white">
              {application.boardingPlace === "radotin"
                ? "Radotín"
                : application.boardingPlace === "radlice"
                  ? "Radlice"
                  : "Vlastní doprava"}
            </p>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Výstup:</span>
            <p className="font-medium text-slate-800 dark:text-white">
              {application.leavingPlace === "radotin"
                ? "Radotín"
                : application.leavingPlace === "radlice"
                  ? "Radlice"
                  : "Vlastní doprava"}
            </p>
          </div>
        </div>

        {/* Additional info if present */}
        {(application.healthProblems || application.foodAllergy || application.childDescription) && (
          <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dodatečné informace:</h4>
            <div className="space-y-1 text-sm">
              {application.healthProblems && (
                <p>
                  <span className="text-slate-600 dark:text-slate-400">Zdravotní problémy:</span>{" "}
                  <span className="font-medium text-slate-800 dark:text-white">{application.healthProblems}</span>
                </p>
              )}
            </div>
          </div>
        )}
        {/* Action buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-between">
          <button
            onClick={() => setShowApplicationModal(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <form onSubmit={handleSubmit(onStatusChange)}>
            <select
              {...register("state")}
              className="text-xs border border-gray-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="pending">Čeká na vyřízení</option>
              <option value="approved">Schváleno</option>
              <option value="paid">Zaplaceno</option>
              <option value="rejected">Zamítnuto</option>
            </select>
          </form>
        </div>
      </div>

      <Modal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="Detail přihlášky"
      >

        <ApplicationDetail application={application} />
      </Modal>
    </div>
  );
};

export default ApplicationCard;
