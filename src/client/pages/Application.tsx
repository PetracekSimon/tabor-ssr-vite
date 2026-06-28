import Container from "@client/components/Container";
import Hero from "@client/components/Hero";
import PageTitle from "@client/components/PageTitle";

import config from "../../config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Api, ApiError } from "@client/api";
import { toast } from "react-toastify";
import ReCAPTCHA from 'react-google-recaptcha'
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const phoneValidator = yup
  .string()
  .matches(
    /^$|^(\d{3})(?:\s*)(\d{3})(?:\s*)(\d{3})$/,
    "Zadejte telefon ve správném formátu",
  );

const applicationSchema = yup.object({
  childFirstName: yup.string().required("Vyplňte jméno dítěte"),
  childLastName: yup.string().required("Vyplňte příjmení dítěte"),
  childBirthDate: yup.string().required("Zadejte datum narození"),
  childAddress: yup.string().required("Vyplňte bydliště"),
  childGender: yup.string().oneOf(["kluk", "holka"]).required("Tento údaj je povinný"),
  insuranceNumber: yup
    .string()
    .required("Vyplňte číslo zdravotní pojišťovny")
    .oneOf(
      ["111", "201", "205", "207", "209", "211", "213"],
      "Zadejte jednu z platných hodnot: 111, 201, 205, 207, 209, 211, 213",
    ),
  tetanusDate: yup.string().required("Zadejte datum očkování"),
  schoolInfo: yup.string().nullable().optional(),
  siblingsCount: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" || originalValue === null ? undefined : value))
    .typeError("Zadejte číslo")
    .min(0, "Nemůže být záporné")
    .integer("Zadejte celé číslo")
    .nullable()
    .optional(),
  firstTime: yup.boolean().default(false),
  hobbies: yup.string().nullable().optional(),
  parent1Name: yup.string().required("Toto pole je povinné"),
  parent1Phone: phoneValidator.required("Toto pole je povinné"),
  parent2Name: yup.string().nullable().optional(),
  parent2Phone: phoneValidator.notRequired().nullable().optional(),
  parentEmail: yup.string().email("Neplatný e-mail").required("Vyplňte e-mail"),
  parentAddress: yup.string().required("Vyplňte adresu"),
  swimming: yup.string().oneOf(["plavec", "neplavec"]).required(),
  healthProblems: yup.string().nullable().optional(),
  foodAllergy: yup.string().nullable().optional(),
  childDescription: yup.string().nullable().optional(),
  tentPreference: yup.string().nullable().optional(),
  boardingPlace: yup.string().oneOf(["radotin", "radlice", "vlastni"]).required("Vyberte nástupní místo"),
  leavingPlace: yup.string().oneOf(["radotin", "radlice", "vlastni"]).required("Vyberte výstupní místo"),
  tripFreeTimeConsent: yup.boolean().default(false),
});

type ApplicationFormValues = yup.InferType<typeof applicationSchema>;
const ApplicationPage = () => {
  const recaptcha = useRef<ReCAPTCHA>(null);

  const api = new Api();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: yupResolver(applicationSchema),
    defaultValues: {
      childFirstName: "",
      childLastName: "",
      childBirthDate: "",
      childAddress: "",
      insuranceNumber: "",
      tetanusDate: "",
      schoolInfo: "",
      siblingsCount: undefined,
      firstTime: false,
      hobbies: "",
      childGender: "kluk",
      parent1Name: "",
      parent1Phone: "",
      parent2Name: "",
      parent2Phone: "",
      parentEmail: "",
      parentAddress: "",
      swimming: "plavec",
      healthProblems: "",
      foodAllergy: "",
      childDescription: "",
      boardingPlace: "radotin",
      leavingPlace: "radotin",
      tripFreeTimeConsent: true,
    },
  });

  const [isCompleted, setIsComleted] = useState<boolean>(false);

  const childAdrressWachtedValue = watch("childAddress");
  const parentEmailWachtedValue = watch("parentEmail");

  useEffect(() => {
    if (!touchedFields.parentAddress) {
      setValue("parentAddress", childAdrressWachtedValue);
    }
  }, [childAdrressWachtedValue, touchedFields.parentAddress, setValue]);

  async function onSubmit(data: ApplicationFormValues) {

    const captchaResponse = recaptcha.current?.getValue()
    if (!captchaResponse) {
      return toast('Formulář nelze odeslat bez ověření reCAPTCHA', { type: "error" });
    }

    await toast
      .promise(api.createApplication({ ...data, captchaResponse }), {
        pending: "Odesílám přihlášku...",
        success: {
          render(response) {
            setIsComleted(true);
            return "Přihláška odeslána 🎉";
          }
        },
        error: {
          render(response) {
            const axiosError = response as { data: { response: { data: ApiError } } };
            const error = axiosError.data.response.data;
            return error?.errMessage?.cs || "Něco se pokazilo 😢";
          },
        },
      })
      .then(data => {
        console.log("Přihláška odeslána", data);
      });
  }

  return (
    <>
      <PageTitle />

      <div className="flex bg-white-100 font-sans items-center flex-col">
        <Hero title="Online přihláška" subtitle={config.campYearInfo.dateAsString + "" + config.campYearInfo.year} background="/assets/hero.jpg" />
        <Container>
          <div className="text-center mt-8 text-xl">
            Aktuálně není možné se přihlásit.
          </div>
        </Container>
      </div>
    </>
  );
};

export default ApplicationPage;

        // <Container>
        //   {isCompleted ?
        //     <div className="border-2 border-green-200 bg-green-50/50 mt-8 max-w-2xl mx-auto">
        //       <div className="p-8 text-center">
        //         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-12 h-12 text-green-600" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
        //         </div>
        //         <p className="text-gray-700 text-lg leading-relaxed">
        //           Přihláška byla úspěšně odeslána, její kopii a další instrukce najdete na své e-mailové adrese{" "}
        //           <strong className="text-gray-900">{parentEmailWachtedValue}</strong>.
        //         </p>
        //         <p className="text-gray-700 text-lg mt-4">
        //           Nyní si můžete prostudovat informace o odjezdu a co dětem zabalit{" "}
        //           <Link to="/chci-jet" className="text-blue-600 dark:text-blue-500 hover:underline" >zde</Link>.
        //         </p>
        //       </div>
        //     </div>
        //     :
        //     <form
        //       className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md space-y-6 my-10"
        //       onSubmit={handleSubmit(onSubmit)}
        //     >
        //       <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Přihláška na letní stanový tábor</h1>

        //       {/* Info o táboře */}
        //       <div className="space-y-2">
        //         <p className="text-sm text-slate-700 dark:text-slate-300">Typ tábora: stanový (stany s podsadou)</p>
        //         <p className="text-sm text-slate-700 dark:text-slate-300">Provozovatel: Stanový tábor Kamenná z.s.</p>
        //         <p className="text-sm text-slate-700 dark:text-slate-300">Místo: Kamenná u Dobronína, okr. Jihlava</p>
        //         <p className="text-sm text-slate-700 dark:text-slate-300">
        //           Termín: {config.campYearInfo.dateAsString} {config.campYearInfo.year}
        //         </p>
        //       </div>

        //       {/* Jméno dítěte */}
        //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="childFirstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Jméno
        //           </label>
        //           <input
        //             id="childFirstName"
        //             type="text"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //         focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             aria-invalid={!!errors.childFirstName}
        //             {...register("childFirstName")}
        //           />
        //           {errors.childFirstName && <p className="text-sm text-red-600">{errors.childFirstName.message}</p>}
        //         </div>
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="childLastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Příjmení
        //           </label>
        //           <input
        //             id="childLastName"
        //             type="text"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //         focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             aria-invalid={!!errors.childLastName}
        //             {...register("childLastName")}
        //           />
        //           {errors.childLastName && <p className="text-sm text-red-600">{errors.childLastName.message}</p>}
        //         </div>
        //       </div>

        //       {/* Datum narození */}
        //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="childBirthDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Datum narození
        //           </label>
        //           <input
        //             id="childBirthDate"
        //             type="date"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //     focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             aria-invalid={!!errors.childBirthDate}
        //             {...register("childBirthDate")}
        //           />
        //           {errors.childBirthDate && <p className="text-sm text-red-600">{errors.childBirthDate.message}</p>}
        //         </div>
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="childGender" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Pohlaví dítěte
        //           </label>
        //           <select
        //             id="childGender"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        //             {...register("childGender")}
        //           >
        //             <option value="kluk">Kluk</option>
        //             <option value="holka">Holka</option>
        //           </select>
        //         </div>
        //       </div>

        //       {/* Bydliště */}
        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="childAddress" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Bydliště
        //         </label>
        //         <input
        //           id="childAddress"
        //           type="text"
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //     focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           aria-invalid={!!errors.childAddress}
        //           {...register("childAddress")}
        //           onBlur={(e) => console.log(e.target.value)}
        //         />
        //         {errors.childAddress && <p className="text-sm text-red-600">{errors.childAddress.message}</p>}
        //       </div>

        //       {/* Zdravotní pojišťovna a očkování */}
        //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="insuranceNumber" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Číslo zdravotní pojišťovny
        //           </label>
        //           <input
        //             id="insuranceNumber"
        //             type="text"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //         focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             aria-invalid={!!errors.insuranceNumber}
        //             {...register("insuranceNumber")}
        //           />
        //           {errors.insuranceNumber && <p className="text-sm text-red-600">{errors.insuranceNumber.message}</p>}
        //         </div>
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="tetanusDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Datum očkování proti tetanu
        //           </label>
        //           <input
        //             id="tetanusDate"
        //             type="date"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //         focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             aria-invalid={!!errors.tetanusDate}
        //             {...register("tetanusDate")}
        //           />
        //           {errors.tetanusDate && <p className="text-sm text-red-600">{errors.tetanusDate.message}</p>}
        //         </div>
        //       </div>

        //       {/* Chodí do školy, jede poprvé, počet sourozenců */}
        //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        //         <div className="flex flex-col space-y-2 sm:col-span-2">
        //           <label htmlFor="schoolInfo" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Chodí do (škola, třída)
        //           </label>
        //           <input
        //             id="schoolInfo"
        //             type="text"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //         focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             {...register("schoolInfo")}
        //           />
        //         </div>
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="siblingsCount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Počet sourozenců
        //           </label>
        //           <input
        //             id="siblingsCount"
        //             type="number"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //         focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //             aria-invalid={!!errors.siblingsCount}
        //             {...register("siblingsCount", { valueAsNumber: true })}
        //           />
        //           {errors.siblingsCount && (
        //             <p className="text-sm text-red-600">{errors.siblingsCount.message as string}</p>
        //           )}
        //         </div>
        //       </div>

        //       {/* Checkbox Jede poprvé */}
        //       <div className="flex items-center space-x-2">
        //         <input
        //           id="firstTime"
        //           type="checkbox"
        //           className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
        //           {...register("firstTime")}
        //         />
        //         <label htmlFor="firstTime" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Jede na tábor poprvé
        //         </label>
        //       </div>

        //       {/* Zájmové kroužky */}
        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="hobbies" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Navštěvuje tyto zájmové kroužky/oddíly
        //         </label>
        //         <textarea
        //           id="hobbies"
        //           rows={2}
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
        //     focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           {...register("hobbies")}
        //         />
        //       </div>

        //       {/* Zákonný zástupce 1 */}
        //       <div className="space-y-2">
        //         <h2 className="text-md font-semibold text-slate-800 dark:text-white">Zákonný zástupce 1</h2>
        //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //           <div className="flex flex-col space-y-2">
        //             <label htmlFor="parent1Name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //               Jméno a příjmení
        //             </label>
        //             <input
        //               id="parent1Name"
        //               type="text"
        //               className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //               {...register("parent1Name")}
        //             />
        //             {errors.parent1Name && (
        //               <p className="text-sm text-red-600">{errors.parent1Name.message as string}</p>
        //             )}
        //           </div>
        //           <div className="flex flex-col space-y-2">
        //             <label htmlFor="parent1Phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //               Telefon
        //             </label>
        //             <input
        //               id="parent1Phone"
        //               type="tel"
        //               aria-invalid={!!errors.parent1Phone}
        //               className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //               {...register("parent1Phone")}
        //             />
        //             {errors.parent1Phone && (
        //               <p className="text-sm text-red-600">{errors.parent1Phone.message as string}</p>
        //             )}
        //           </div>
        //         </div>
        //       </div>

        //       {/* Zákonný zástupce 2 */}
        //       <div className="space-y-2">
        //         <h2 className="text-md font-semibold text-slate-800 dark:text-white">Zákonný zástupce 2</h2>
        //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //           <div className="flex flex-col space-y-2">
        //             <label htmlFor="parent2Name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //               Jméno a příjmení
        //             </label>
        //             <input
        //               id="parent2Name"
        //               type="text"
        //               className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //               {...register("parent2Name")}
        //             />
        //           </div>
        //           <div className="flex flex-col space-y-2">
        //             <label htmlFor="parent2Phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //               Telefon
        //             </label>
        //             <input
        //               id="parent2Phone"
        //               type="tel"
        //               aria-invalid={!!errors.parent2Phone}
        //               className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //               {...register("parent2Phone")}
        //             />
        //             {errors.parent2Phone && (
        //               <p className="text-sm text-red-600">{errors.parent2Phone.message as string}</p>
        //             )}
        //           </div>
        //         </div>
        //       </div>

        //       {/* Email */}
        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="parentEmail" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Kontaktní e-mail
        //         </label>
        //         <input
        //           id="parentEmail"
        //           type="email"
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           aria-invalid={!!errors.parentEmail}
        //           {...register("parentEmail")}
        //         />
        //         {errors.parentEmail && <p className="text-sm text-red-600">{errors.parentEmail.message}</p>}
        //         <span className="italic text-sm text-gray-500">
        //           * Emailovou adresu použijeme pouze pro účely potvrzení přijetí přihlášky, platby a pro zjištění účasti
        //           na příští rok.
        //         </span>
        //       </div>

        //       {/* Kontaktní adresa */}
        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="parentAddress" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Kontaktní adresa zákonného zástupce dostižitelného v době konání tábora a tel. číslo
        //         </label>
        //         <input
        //           id="parentAddress"
        //           type="text"
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           aria-invalid={!!errors.parentAddress}
        //           {...register("parentAddress")}
        //         />
        //         {errors.parentAddress && <p className="text-sm text-red-600">{errors.parentAddress.message}</p>}
        //       </div>

        //       {/* Sdělení rodičů */}
        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="swimming" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Plavec / neplavec
        //         </label>
        //         <select
        //           id="swimming"
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        //           {...register("swimming")}
        //         >
        //           <option value="plavec">Plavec</option>
        //           <option value="neplavec">Neplavec</option>
        //         </select>
        //       </div>

        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="healthProblems" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Má tyto zdravotní problémy
        //         </label>
        //         <textarea
        //           id="healthProblems"
        //           rows={2}
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           {...register("healthProblems")}
        //         />
        //         <span className="italic text-sm text-gray-500">
        //           * Jiné zdravotní skutečnosti o kterých bychom měli vědět
        //         </span>
        //       </div>

        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="foodAllergy" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Nesnáší tato jídla
        //         </label>
        //         <textarea
        //           id="foodAllergy"
        //           rows={2}
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           {...register("foodAllergy")}
        //         />
        //       </div>

        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="childDescription" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           Stručná charakteristika dítěte
        //         </label>
        //         <textarea
        //           id="childDescription"
        //           rows={3}
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           {...register("childDescription")}
        //         />
        //       </div>

        //       <div className="flex flex-col space-y-2">
        //         <label htmlFor="tentPreference" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //           S kým chci být ve stanu
        //         </label>
        //         <textarea
        //           id="tentPreference"
        //           rows={3}
        //           className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        //           {...register("tentPreference")}
        //         />
        //       </div>

        //       {/* Nástupní / výstupní místo */}
        //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="boardingPlace" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Nástupní místo
        //           </label>
        //           <select
        //             id="boardingPlace"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        //             aria-invalid={!!errors.boardingPlace}
        //             {...register("boardingPlace")}
        //           >
        //             <option value="radotin">Radotín</option>
        //             <option value="radlice">Radlice</option>
        //             <option value="vlastni">Vlastní doprava</option>
        //           </select>
        //           {errors.boardingPlace && <p className="text-sm text-red-600">{errors.boardingPlace.message}</p>}
        //         </div>
        //         <div className="flex flex-col space-y-2">
        //           <label htmlFor="leavingPlace" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Výstupní místo
        //           </label>
        //           <select
        //             id="leavingPlace"
        //             className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        //             aria-invalid={!!errors.leavingPlace}
        //             {...register("leavingPlace")}
        //           >
        //             <option value="radotin">Radotín</option>
        //             <option value="radlice">Radlice</option>
        //             <option value="vlastni">Vlastní doprava</option>
        //           </select>
        //           {errors.leavingPlace && <p className="text-sm text-red-600">{errors.leavingPlace.message}</p>}
        //         </div>
        //       </div>




        //       {/* Checkbox souhlasím s rozchodem */}
        //       <div className="flex flex-col">
        //         <div className="flex items-center space-x-2">
        //           <input
        //             id="tripFreeTimeConsent"
        //             type="checkbox"
        //             className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
        //             {...register("tripFreeTimeConsent")}
        //           />
        //           <label htmlFor="tripFreeTimeConsent" className="text-sm font-medium text-slate-700 dark:text-slate-300">
        //             Souhlasím s tím, aby můj syn/dcera dostal/a na výletech rozchod
        //           </label>
        //         </div>
        //         <small className="text-slate-700 dark:text-slate-300 pl-6 text-[10px]">
        //           Rozchod bude vyhlášen po omezenou a jasně stanovenou dobu v průběhu výletu. Děti budou náležitě poučeny o
        //           chování a dodržování bezpečnostních pravidel a budou se smět pohybovat pouze ve skupinkách. Tábor se
        //           takovým rozchodem nezříká dohledové povinnosti. Dohledová povinnost bude vykonávána tak, že vedoucí se
        //           budou pohybovat v prostoru, který bude pro rozchod vymezen (např. náměstí, areál zoo apod.), a děti budou znát
        //           místo, na kterém bude možné vedoucí kdykoliv zastihnout. V případě Vašeho nesouhlasu se dítě bude pohybovat
        //           po celou dobu s některým z vedoucích.
        //         </small>
        //       </div>

        //       <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY as string} />
        //       {/* Submit */}
        //       <button
        //         type="submit"
        //         className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-primary-300"
        //         disabled={isSubmitting}
        //       >
        //         Odeslat přihlášku
        //       </button>
        //     </form>
        //   }
        // </Container> 
