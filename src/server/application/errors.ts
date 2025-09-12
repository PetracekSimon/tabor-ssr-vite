import type { Response } from "express";

const Errors = {
  Create: {
    InvalidBody(res: Response, details: any) {
      return res.status(400).send({
        code: "application/create/invalidBody",
        message: "Požadavek má neplatná nebo chybějící data.",
        details,
      });
    },
    DatabaseFailed(res: Response, error: any) {
      return res.status(500).send({
        code: "application/create/databaseFailed",
        message: "Nepodařilo se uložit přihlášku.",
        error,
      });
    },
  },
  List: {
    InvalidBody(res: Response, details: any) {
      return res.status(400).send({
        code: "application/list/invalidBody",
        message: "Požadavek má neplatná data.",
        details,
      });
    },
    DatabaseFailed(res: Response, error: any) {
      return res.status(500).send({
        code: "application/list/databaseFailed",
        message: "Nepodařilo se načíst přihlášky.",
        error,
      });
    },
  },
  Delete: {
    InvalidBody(res: Response, details: any) {
      return res.status(400).send({
        code: "application/delete/invalidBody",
        message: "Požadavek má neplatná data.",
        details,
      });
    },
    NotFound(res: Response, id: string) {
      return res.status(404).send({
        code: "application/delete/notFound",
        message: `Přihláška s id ${id} neexistuje`,
      });
    },
    DatabaseFailed(res: Response, error: any) {
      return res.status(500).send({
        code: "application/delete/databaseFailed",
        message: "Nepodařilo se smazat přihlášku.",
        error,
      });
    },
  },
  UpdateState: {
    InvalidBody(res: Response, details: any) {
      return res.status(400).send({
        code: "application/updateState/invalidBody",
        message: "Požadavek má neplatná data.",
        details,
      });
    },
    NotFound(res: Response, id: string) {
      return res.status(404).send({
        code: "application/updateState/notFound",
        message: `Přihláška s id ${id} neexistuje`,
      });
    },
    DatabaseFailed(res: Response, error: any) {
      return res.status(500).send({
        code: "application/updateState/databaseFailed",
        message: "Nepodařilo se aktualizovat stav přihlášky.",
        error,
      });
    },
  },
};

export default Errors;
