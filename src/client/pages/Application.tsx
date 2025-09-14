import Container from "@client/components/Container";
import Hero from "@client/components/Hero";
import PageTitle from "@client/components/PageTitle";

import config from "../../config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Api, ApiError } from "@client/api";
import { toast } from "react-toastify";

const phoneValidator = yup
  .string()
  .required("Tento údaj je povinný")
  .matches(
    /^(\d{3})(?:\s*)(\d{3})(?:\s*)(\d{3})$/,
    "Zadejte telefon ve správném formátu",
  );

const applicationSchema = yup.object({
  childFirstName: yup.string().required("Vyplňte jméno dítěte"),
  childLastName: yup.string().required("Vyplňte příjmení dítěte"),
  childBirthDate: yup.string().required("Zadejte datum narození"),
  childAddress: yup.string().required("Vyplňte bydliště"),
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
  motherName: yup.string().nullable().optional(),
  motherPhone: phoneValidator,
  fatherName: yup.string().nullable().optional(),
  fatherPhone: phoneValidator,
  parentEmail: yup.string().email("Neplatný e-mail").required("Vyplňte e-mail"),
  swimming: yup.string().oneOf(["plavec", "neplavec"]).required(),
  healthProblems: yup.string().nullable().optional(),
  foodAllergy: yup.string().nullable().optional(),
  childDescription: yup.string().nullable().optional(),
  boardingPlace: yup.string().oneOf(["radotin", "radlice", "vlastni"]).required("Vyberte nástupní místo"),
  leavingPlace: yup.string().oneOf(["radotin", "radlice", "vlastni"]).required("Vyberte výstupní místo"),
});

type ApplicationFormValues = yup.InferType<typeof applicationSchema>;

const ApplicationPage = () => {
  const api = new Api();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(applicationSchema),
    defaultValues: {
      childFirstName: "David",
      childLastName: "Křivánek",
      childBirthDate: "2025-01-01",
      childAddress: "Test",
      insuranceNumber: "111",
      tetanusDate: "2025-01-01",
      schoolInfo: "ZŠ Jihlava",
      siblingsCount: 2,
      firstTime: false,
      hobbies: "Hra na kytaru",
      motherName: "Jana Křivánková",
      motherPhone: "1234567890",
      fatherName: "David Křivánek",
      fatherPhone: "1234567890",
      parentEmail: "david.krivanek@gmail.com",
      swimming: "plavec",
      healthProblems: "Nemá žádné",
      foodAllergy: "Nemá žádné",
      childDescription: "David je chytrý a hravý",
      boardingPlace: "radotin",
      leavingPlace: "radotin",
    },
  });

  async function onSubmit(data: ApplicationFormValues) {
    await toast
      .promise(api.createApplication(data), {
        pending: "Odesílám přihlášku...",
        success: "Přihláška odeslána 🎉",
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
        <Hero title="Online přihláška" subtitle="2026" background="/assets/hero.jpg" />
        <Container>
          <form
            className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md space-y-6 mb-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Přihláška na letní stanový tábor</h1>

            {/* Info o táboře */}
            <div className="space-y-2">
              <p className="text-sm text-slate-700 dark:text-slate-300">Typ tábora: stanový (stany s podsadou)</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Provozovatel: Stanový tábor Kamenná z.s.</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Místo: Kamenná u Dobronína, okr. Jihlava</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Termín: {config.campYearInfo.dateAsString} {config.campYearInfo.year}
              </p>
            </div>

            {/* Jméno dítěte */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="childFirstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jméno
                </label>
                <input
                  id="childFirstName"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  aria-invalid={!!errors.childFirstName}
                  {...register("childFirstName")}
                />
                {errors.childFirstName && <p className="text-sm text-red-600">{errors.childFirstName.message}</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="childLastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Příjmení
                </label>
                <input
                  id="childLastName"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  aria-invalid={!!errors.childLastName}
                  {...register("childLastName")}
                />
                {errors.childLastName && <p className="text-sm text-red-600">{errors.childLastName.message}</p>}
              </div>
            </div>

            {/* Datum narození */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="childBirthDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Datum narození
              </label>
              <input
                id="childBirthDate"
                type="date"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                aria-invalid={!!errors.childBirthDate}
                {...register("childBirthDate")}
              />
              {errors.childBirthDate && <p className="text-sm text-red-600">{errors.childBirthDate.message}</p>}
            </div>

            {/* Bydliště */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="childAddress" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Bydliště
              </label>
              <input
                id="childAddress"
                type="text"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                aria-invalid={!!errors.childAddress}
                {...register("childAddress")}
              />
              {errors.childAddress && <p className="text-sm text-red-600">{errors.childAddress.message}</p>}
            </div>

            {/* Zdravotní pojišťovna a očkování */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="insuranceNumber" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Číslo zdravotní pojišťovny
                </label>
                <input
                  id="insuranceNumber"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  aria-invalid={!!errors.insuranceNumber}
                  {...register("insuranceNumber")}
                />
                {errors.insuranceNumber && <p className="text-sm text-red-600">{errors.insuranceNumber.message}</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="tetanusDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Datum očkování proti tetanu
                </label>
                <input
                  id="tetanusDate"
                  type="date"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  aria-invalid={!!errors.tetanusDate}
                  {...register("tetanusDate")}
                />
                {errors.tetanusDate && <p className="text-sm text-red-600">{errors.tetanusDate.message}</p>}
              </div>
            </div>

            {/* Chodí do školy, jede poprvé, počet sourozenců */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-2 sm:col-span-2">
                <label htmlFor="schoolInfo" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Chodí do (škola, třída)
                </label>
                <input
                  id="schoolInfo"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  {...register("schoolInfo")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="siblingsCount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Počet sourozenců
                </label>
                <input
                  id="siblingsCount"
                  type="number"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  aria-invalid={!!errors.siblingsCount}
                  {...register("siblingsCount", { valueAsNumber: true })}
                />
                {errors.siblingsCount && (
                  <p className="text-sm text-red-600">{errors.siblingsCount.message as string}</p>
                )}
              </div>
            </div>

            {/* Checkbox Jede poprvé */}
            <div className="flex items-center space-x-2">
              <input
                id="firstTime"
                type="checkbox"
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                {...register("firstTime")}
              />
              <label htmlFor="firstTime" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Jede na tábor poprvé
              </label>
            </div>

            {/* Zájmové kroužky */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="hobbies" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Navštěvuje tyto zájmové kroužky/oddíly
              </label>
              <textarea
                id="hobbies"
                rows={2}
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                {...register("hobbies")}
              />
            </div>

            {/* Matka */}
            <div className="space-y-2">
              <h2 className="text-md font-semibold text-slate-800 dark:text-white">Matka</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="motherName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Jméno a příjmení
                  </label>
                  <input
                    id="motherName"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    {...register("motherName")}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="motherPhone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Telefon
                  </label>
                  <input
                    id="motherPhone"
                    type="tel"
                    aria-invalid={!!errors.motherPhone}
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    {...register("motherPhone")}
                  />
                  {errors.motherPhone && (
                    <p className="text-sm text-red-600">{errors.motherPhone.message as string}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Otec */}
            <div className="space-y-2">
              <h2 className="text-md font-semibold text-slate-800 dark:text-white">Otec</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fatherName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Jméno a příjmení
                  </label>
                  <input
                    id="fatherName"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    {...register("fatherName")}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fatherPhone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Telefon
                  </label>
                  <input
                    id="fatherPhone"
                    type="tel"
                    aria-invalid={!!errors.fatherPhone}
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    {...register("fatherPhone")}
                  />
                  {errors.fatherPhone && (
                    <p className="text-sm text-red-600">{errors.fatherPhone.message as string}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="parentEmail" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Kontaktní e-mail
              </label>
              <input
                id="parentEmail"
                type="email"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                aria-invalid={!!errors.parentEmail}
                {...register("parentEmail")}
              />
              {errors.parentEmail && <p className="text-sm text-red-600">{errors.parentEmail.message}</p>}
              <span className="italic text-sm text-gray-500">
                * Emailovou adresu použijeme pouze pro účely potvrzení přijetí přihlášky, platby a pro zjištění účasti
                na příští rok.
              </span>
            </div>

            {/* Sdělení rodičů */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="swimming" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Plavec / neplavec
              </label>
              <select
                id="swimming"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                {...register("swimming")}
              >
                <option value="plavec">Plavec</option>
                <option value="neplavec">Neplavec</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="healthProblems" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Má tyto zdravotní problémy
              </label>
              <textarea
                id="healthProblems"
                rows={2}
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                {...register("healthProblems")}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="foodAllergy" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Nesnáší tato jídla
              </label>
              <textarea
                id="foodAllergy"
                rows={2}
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                {...register("foodAllergy")}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="childDescription" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Stručná charakteristika dítěte
              </label>
              <textarea
                id="childDescription"
                rows={3}
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                {...register("childDescription")}
              />
            </div>

            {/* Nástupní / výstupní místo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="boardingPlace" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nástupní místo
                </label>
                <select
                  id="boardingPlace"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.boardingPlace}
                  {...register("boardingPlace")}
                >
                  <option value="radotin">Radotín</option>
                  <option value="radlice">Radlice</option>
                  <option value="vlastni">Vlastní doprava</option>
                </select>
                {errors.boardingPlace && <p className="text-sm text-red-600">{errors.boardingPlace.message}</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="leavingPlace" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Výstupní místo
                </label>
                <select
                  id="leavingPlace"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.leavingPlace}
                  {...register("leavingPlace")}
                >
                  <option value="radotin">Radotín</option>
                  <option value="radlice">Radlice</option>
                  <option value="vlastni">Vlastní doprava</option>
                </select>
                {errors.leavingPlace && <p className="text-sm text-red-600">{errors.leavingPlace.message}</p>}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-primary-300"
              disabled={isSubmitting}
            >
              Odeslat přihlášku
            </button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default ApplicationPage;
