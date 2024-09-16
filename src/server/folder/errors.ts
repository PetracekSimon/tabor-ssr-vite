import { Response } from 'express';

interface ErrorResponse {
  errMessage: { cs: string };
  error?: unknown;
  code?: string;
}

const Errors = {
  Create: {
    InvalidBody: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Složka s tímto názvem již existuje (může existovat v jiném adresáři)." },
        error,
      });
    },
    ParentFolderDoesNotExist: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Nadřazená složka neexistuje." },
        error,
      });
    },
  },
  Delete: {
    InvalidBody: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Databáze přestala odpovídat." },
        error,
      });
    },
    FolderIsntEmpty: (res: Response): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: `Složka není prázdná, složku lze smazat pouze když je prázdná.` }
      });
    }
  },
  List: {
    InvalidBody: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Databáze přestala odpovídat." },
        error,
      });
    },
  },
  Get: {
    InvalidBody: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Data na vstupu nejsou validní." },
        error,
      });
    },
    DatabaseFailed: (res: Response, error: unknown): Response<ErrorResponse> => {
      return res.status(400).json({
        errMessage: { cs: "Databáze přestala odpovídat." },
        error,
      });
    },
    FolderDoesNotExists: (res: Response, code: string): Response<ErrorResponse> => {
      return res.status(404).json({
        errMessage: { cs: "Složka neexistuje." },
        code,
      });
    },
  },
};

export default Errors;
