import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import config from "../../../config";
import { Api } from "@client/api"
import { useAppStore } from "@client/ZustandContext";
import { useState } from "react";

const schema = yup.object().shape({
    state: yup.array(yup.string()).optional(), // ← pole stringů místo jednoho stringu
    summerCampYear: yup.string().optional(),
    childName: yup.string().optional(),
});

type FilterFormValues = yup.InferType<typeof schema>;

interface ApplicationFilterProps {
    submitHandler: (filters: FilterFormValues) => void;
}

const ApplicationFilter = (props: ApplicationFilterProps) => {
    const [open, setOpen] = useState(true);


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            state: [
                "pending",
                "approved",
                "rejected",
                "paid",
            ],
            summerCampYear: config.campYearInfo.year.toString(),
            childName: "",
        },
    });

    function onSubmit(data: FilterFormValues) {
        const cleaned = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => {
                if (Array.isArray(v)) return v.length > 0;
                return v !== "";
            })
        );

        props.submitHandler(cleaned);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-4 mb-6"
        >
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4"
            >
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Filtrování přihlášek
                </h3>

                <svg
                    className={`w-5 h-5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {/* Collapsible content */}
            {open && (
                <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Stav */}
                        <div>
                            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Stav
                            </span>

                            <div className="space-y-1">
                                {["pending", "approved", "rejected", "paid"].map((value) => (
                                    <label key={value} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={value}
                                            {...register("state")}
                                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        />

                                        <span className="text-slate-700 dark:text-slate-300 text-sm">
                                            {value === "pending" && "Čeká na vyřízení"}
                                            {value === "approved" && "Schváleno"}
                                            {value === "rejected" && "Zamítnuto"}
                                            {value === "paid" && "Zaplaceno"}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                            )}
                        </div>

                        {/* Rok */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Rok tábora
                            </label>

                            <select
                                {...register("summerCampYear")}
                                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-slate-700 dark:text-white"
                            >
                                <option value="">Všechny</option>
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                            </select>

                            {errors.summerCampYear && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.summerCampYear.message}
                                </p>
                            )}
                        </div>

                        {/* Jméno */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Jméno dítěte
                            </label>

                            <input
                                type="text"
                                {...register("childName")}
                                placeholder="Zadejte jméno..."
                                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-slate-700 dark:text-white"
                            />

                            {errors.childName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.childName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                props.submitHandler({});
                            }}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                        >
                            Filtrovat
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default ApplicationFilter;
