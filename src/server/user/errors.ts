export default {
  Register: {
    InvalidBody: (res: any, error: any) => {
      return res.status(400).json({
        errMessage: {
          en: "Register body is not valid.",
          cs: "Data na vstupu nejsou validní.",
        },
        error,
      });
    },
    UserAlreadyExists: (res: any) => {
      return res.status(400).json({
        errMessage: {
          en: "User with this email already exists.",
          cs: "Uživatel s tímto emailem již existuje",
        },
      });
    },
    DatabaseFailed: (res: any, error: any) => {
      return res.status(500).json({
        errMessage: {
          en: "Database doesn't response.",
          cs: "Databáze přestala odpovídat.",
        },
        error,
      });
    },
  },
  Login: {
    InvalidBody: (res: any, error: any) => {
      return res.status(400).json({
        errMessage: {
          cs: "Data na vstupu nejsou validní.",
          en: "Request body is not valid.",
        },
        error,
      });
    },
    DatabaseFailed: (res: any, error: any) => {
      return res.status(500).json({
        errMessage: {
          cs: "Databáze přestala odpovídat.",
          en: "Database doesn't response.",
        },
        error,
      });
    },
    WrongCredentials: (res: any, email: string) => {
      return res.status(400).json({
        errMessage: {
          cs: "Zadal jste neplatné přihlašovací údaje.",
          en: `Email (${email}) or password is wrong.`,
        },
      });
    },
  },
  List: {
    InvalidBody: (res: any, error: any) => {
      return res.status(400).json({
        errMessage: {
          cs: "Data na vstupu nejsou validní.",
          en: "Request body is not valid.",
        },
        error,
      });
    },
    DatabaseFailed: (res: any, error: any) => {
      return res.status(500).json({
        errMessage: {
          cs: "Databáze přestala odpovídat.",
          en: "Database doesn't response.",
        },
        error,
      });
    },
  },
  UpdatePassword: {
    InvalidBody: (res: any, error: any) => {
      return res.status(400).json({
        errMessage: {
          cs: "Data na vstupu nejsou validní.",
          en: "Request body is not valid.",
        },
        error,
      });
    },
    DatabaseFailed: (res: any, error: any) => {
      return res.status(500).json({
        errMessage: {
          cs: "Databáze přestala odpovídat.",
          en: "Database doesn't response.",
        },
        error,
      });
    },
    UserNotFound: (res: any) => {
      return res.status(400).json({
        errMessage: { cs: "Uživatel neexistuje." },
      });
    },
    WrongCredentials: (res: any) => {
      return res.status(400).json({
        errMessage: { cs: "Staré heslo nebylo zadáno správně" },
      });
    },
    PasswordsAreNotSame: (res: any) => {
      return res.status(400).json({
        errMessage: { cs: "Nové heslo a jeho potvrzení se neshodují." },
      });
    },
  },
  Update: {
    InvalidBody: (res: any, error: any) => {
      return res.status(400).json({
        errMessage: {
          cs: "Data na vstupu nejsou validní.",
          en: "Request body is not valid.",
        },
        error,
      });
    },
    UserDoesNotExist: (res: any) => {
      return res.status(400).json({
        errMessage: {
          cs: "Uživatel neexistuje.",
          en: "User does not exist.",
        },
      });
    },
    DatabaseFailed: (res: any, error: any) => {
      return res.status(500).json({
        errMessage: {
          cs: "Databáze přestala odpovídat.",
          en: "Database doesn't response.",
        },
        error,
      });
    },
  },
  Delete: {
    InvalidBody: (res: any, error: any) => {
      return res.status(400).json({
        errMessage: {
          cs: "Data na vstupu nejsou validní.",
          en: "Request body is not valid.",
        },
        error,
      });
    },
    DatabaseFailed: (res: any, error: any) => {
      return res.status(500).json({
        errMessage: {
          cs: "Databáze přestala odpovídat.",
          en: "Database doesn't response.",
        },
        error,
      });
    },
  },
};
