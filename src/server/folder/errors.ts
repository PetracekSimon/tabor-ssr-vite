const Errors = {
  Create: {
    InvalidBody: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Složka s tímto názvem již existuje (může existovat v jiném adresáři)." },
        error,
      });
    },
    ParentFolderDoesNotExist: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Nadřazená složka neexistuje." },
        error,
      });
    },
  },
  Delete: {
    InvalidBody: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Databáze přestala odpovídat." },
        error,
      });
    },
    FolderIsntEmpty: (res, imageCount) =>{
      return res.status(400).json({
        errMessage: { cs: `Složka není prázdná, složku lze smazat pouze když je prázdná.`}
      })
    }
  },
  List: {
    InvalidBody: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Databáze přestala odpovídat." },
        error,
      });
    },
  },
  Get: {
    InvalidBody: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res, error) => {
      return res.status(400).json({
        errMessage: { cs: "Databáze přestala odpovídat." },
        error,
      });
    },
    FolderDoesNotExists: (res, code) => {
      return res.status(404).json({
        errMessage: { cs: "Složka neexistuje." },
        code,
      });
    },
  },
};

export default Errors;
