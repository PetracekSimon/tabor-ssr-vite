import { Api, Application } from "@client/api";
import { useAppStore } from "@client/ZustandContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import { ApplicationDetail } from "./ApplicationDetail";
import { toast } from "react-toastify";
import config from "../../../config";

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
    if (stateValue && stateValue !== props.application.state) { // TODO tohle je blbý, protože to nejde při změně pak změnit zpátky na co to bylo
      handleSubmit(onStatusChange)();
    }
  }, [stateValue])

  const generatePdf = async () => {

    await toast.promise(api.getApplicationAsPDF(application._id, token), {
      pending: "Generuji PDF přihlášku",
      error: "Něco se pokazilo",
      success: "Přihláška byla úspěšně vygenerována"
    }).then((response: { data: Blob }) => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Prihlaska${config.campYearInfo.year}_${application.applicationNumber}_${application.childFirstName}_${application.childLastName}.pdf`);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
  }

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
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
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
          <button
            onClick={() => generatePdf()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="-4 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z"
                  fill="currentColor"></path>
              </g>
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
