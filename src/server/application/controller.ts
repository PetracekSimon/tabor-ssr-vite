import express from 'express';
import Errors from './errors.js';
import Types from './types.js';
import ApplicationMongo from './mongo.js';
import verify from '../utiles/auth.js';
import requsetHelper from '../utiles/request-helper.js';
import config from '../../config.js';

const _mongo = new ApplicationMongo();
const router = express.Router();

router.post('/', requsetHelper, async (req, res) => {
  //HDS 1 (body validation)
  const validate = Types.create.validate(req.data);
  if (validate.error?.details) {
    return Errors.Create.InvalidBody(res, validate.error.details);
  }
  //TODO: recaptcha

  //HDS 2 (assign incremental number per year)
  try {
    const nextNum = await _mongo.getNextApplicationNumber(config.campYearInfo.year);
    req.data.applicationNumber = String(nextNum);
  } catch (error) {
    return Errors.Create.DatabaseFailed(res, error);
  }

  //HDS 3 (create)
  let dtoOut;
  try {
    dtoOut = await _mongo.create(req.data);
  } catch (error) {
    return Errors.Create.DatabaseFailed(res, error);
  }

  //HDS 4
  return res.send(dtoOut);
});

router.get('/list', verify, requsetHelper, async (req, res) => {
  //HDS 1 (body validation)
  const validate = Types.list.validate(req.data);
  if (validate.error?.details) {
    return Errors.List.InvalidBody(res, validate.error.details);
  }

  //HDS 2 (list)
  let dtoOut;
  try {
    dtoOut = await _mongo.list(req.data.filter, req.data.pageInfo);
  } catch (error) {
    return Errors.List.DatabaseFailed(res, error);
  }

  //HDS 3
  return res.send(dtoOut);
});

router.patch('/updateState', verify, requsetHelper, async (req, res) => {
  //HDS 1 (body validation)
  const validate = Types.updateState.validate(req.data);
  if (validate.error?.details) {
    return Errors.UpdateState.InvalidBody(res, validate.error.details);
  }

  //HDS 2 (update state)
  let updated;
  try {
    updated = await _mongo.updateState(req.data.id, req.data.state);
    if (!updated) {
      return Errors.UpdateState.NotFound(res, req.data.id);
    }
  } catch (error) {
    return Errors.UpdateState.DatabaseFailed(res, error);
  }

  //HDS 3
  return res.send(updated);
});



export default router; 