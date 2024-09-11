const Error = {
    Create: {
      InvalidBody: (res: any, error: any) => {

        return res.status(400).json({
          errMessage: { cs: "Data na vstupu nejsou validní." },
          error,
        });
      },
      DatabaseFailed: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Databáze přestala odpovídat." },
          error,
        });
      },
      ImageUploadFailed: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Nahrání obrázku selhalo kvůli 'multer'." },
          error,
        });
      },
    },
    Delete: {
      InvalidBody: (res: any, error: any) => {
        return res.status(400).json({
          errMessage: { cs: "Data na vstupu nejsou validní." },
          error,
        });
      },
      ImageDoesNotExists: (res: any) => {
        return res.status(404).json({
          errMessage: { cs: "Obrázek neexistuje." },
        });
      },
      ImagePathDoesNotExists: (res: any) => {
        return res.status(200).json({
          errMessage: { cs: "Cesta k obrázku je neplatná." },
        });
      },
      DeleteImageFailedByFs: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Smazání obrázku selhalo kvůli 'fs'." },
          error,
        });
      },
      DatabaseFailed: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Databáze přestala odpovídat." },
          error,
        });
      },
    },
    List: {
      InvalidBody: (res: any, error: any) => {
        return res.status(400).json({
          errMessage: { cs: "Data na vstupu nejsou validní." },
          error,
        });
      },
      DatabaseFailed: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Databáze přestala odpovídat." },
          error,
        });
      },
    },
    Get: {
      InvalidBody: (res: any, error: any) => {
        return res.status(400).json({
          errMessage: { cs: "Data na vstupu nejsou validní." },
          error,
        });
      },
      DatabaseFailed: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Databáze přestala odpovídat." },
          error,
        });
      },
      ImageDoesNotExists: (res: any, code: any) => {
        return res.status(404).json({
          errMessage: { cs: "Obrázek neexistuje." },
          code,
        });
      },
    },
    ChangeFolder: {
      InvalidBody: (res: any, error: any) => {
        return res.status(400).json({
          errMessage: { cs: "Data na vstupu nejsou validní." },
          error,
        });
      },
      DatabaseFailed: (res: any, error: any) => {
        return res.status(500).json({
          errMessage: { cs: "Databáze přestala odpovídat." },
          error,
        });
      },
      ImageDoesNotExists: (res: any, id: any) => {
        return res.status(404).json({
          errMessage: { cs: "Obrázek neexistuje." },
          id,
        });
      },
      FolderDoesNotExists: (res: any, code: any) => {
        return res.status(404).json({
          errMessage: { cs: "Složka neexistuje." },
          code,
        });
      },
    },
  };
  
  export default Error;
  