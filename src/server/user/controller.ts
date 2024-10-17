import express from "express";
//@ts-ignore
import { default as bcrypt } from 'bcryptjs'
import jwt from "jsonwebtoken";

import Types from "./types.js";
import Error from "./errors.js";
import Mongo from "./mongo.js";
import verify from "../utiles/auth.js";
import requestHelper from "../utiles/request-helper.js";

const router = express.Router();

const _mongo = new Mongo();

router.post('/login', verify, async (req, res) => {
    //HDS 1 (body validation)    
    let validate = Types.login.validate(req.body);

    if (validate.error?.details) {
        //A1
        return Error.Login.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (check if email exists)
    console.log('login');
    let user = await _mongo.getByEmail(req.body.email);
    if (!user) {
        //A2
        return Error.Login.WrongCredentials(res, req.body.email);
    }

    //HDS 3 (password compare);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        //A3
        return Error.Login.WrongCredentials(res, req.body.email);
    }

    //HDS 4 (create token)
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: 28800 });

    //HSD 5
    res.header('auth-token').send({ jwt: token });
});
router.patch('/updatePassword', verify, async (req, res) => {
    //HDS 1 (body validation)
    let validate = Types.updatePassword.validate(req.body);

    if (validate.error?.details) {
        //A1
        return Error.UpdatePassword.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (check password and passwordConfirm)
    if (req.body.newPassword !== req.body.newPasswordConfirm) {
        return Error.UpdatePassword.PasswordsAreNotSame(res);
    }
    //HDS 2 (zkontrolovat, zda uživatel existuje)
    if (!req.user || !req.user.id) {
        return Error.UpdatePassword.UserNotFound(res);
    }
    let user: any = await _mongo.getPassword(req.user.id);
    if (!user) {
        return Error.UpdatePassword.UserNotFound(res);
    }

    //HDS 3 (porovnání hesla);
    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) {
        //A2
        return Error.UpdatePassword.WrongCredentials(res);
    }

    //HDS 4 (hash new password)
    const salt = await bcrypt.genSalt(13);
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    //HDS 5 (update user password)
    let dtoOut: any;
    try {
        dtoOut = await _mongo.update(req.user.id, { password: hashPassword });
    } catch (error) {
        //A4
        return Error.Register.DatabaseFailed(res, error);
    }

    //HSD 6
    res.header('auth-token').send({ id: dtoOut.id });
});
router.post('/register', verify, async (req, res) => {
    //HDS 1 (body validation)
    let validate = Types.register.validate(req.body);
    if (validate.error?.details) {
        //A1
        return Error.Register.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (check email explicity)
    let user = await _mongo.getByEmail(req.body.email);
    if (user) {
        //A2
        return Error.Register.UserAlreadyExists(res);
    }
    //HDS 3 (hash password)
    const salt = await bcrypt.genSalt(13);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //HDS 4 (create user)
    let dtoOut;
    try {
        dtoOut = await _mongo.create({ ...req.body, password: hashPassword });
    } catch (error) {
        //A3
        return Error.Register.DatabaseFailed(res, error);
    }

    //HDS 5
    res.send({ id: dtoOut._id });
});
router.get('/list', verify, requestHelper, async (req, res) => {
    //HDS 1
    let validate = Types.list.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Error.List.InvalidBody(res, validate.error.details);
    }

    //HDS 2
    let dataOut;
    try {
        dataOut = await _mongo.list(req.data.filter, req.data.pageInfo);
    } catch (error) {
        //A2
        return Error.List.DatabaseFailed(res, error);
    }

    //HDS 3
    return res.send(dataOut);
});
router.get('/checkToken', verify, async (req, res) => {
    if (req.user) {
        return res.send({
            verified: true,
            email: req.user.email,
            role: req.user.role,
            blogger_id: req.user.blogger_id,
        });
    } else {
        return res.status(401).send({
            verified: false,
            message: 'Uživatel není ověřen',
        });
    }
});
router.patch('/', verify, requestHelper, async (req, res) => {
    //HDS 1
    let validate = Types.update.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Error.Update.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (hash password)
    let dataIn: any = {
        password: null,
        email: null,
        role: null,
    };
    if (req.data.password) {
        const salt = await bcrypt.genSalt(13);
        dataIn.password = await bcrypt.hash(req.data.password, salt);
    }

    //HDS 3 (get user)
    let user = await _mongo.get(req.data.id);
    if (!user) {
        //A2
        return Error.Update.UserDoesNotExist(res);
    }

    //HDS 4 (prepare dataIn)
    req.data.email ? (dataIn.email = req.data.email) : "";
    req.data.role ? (dataIn.role = req.data.role) : "";

    //HDS 5 (update user)
    let dtoOut: any;
    try {
        dtoOut = await _mongo.update(req.data.id, dataIn);
    } catch (error) {
        //A3
        return Error.Update.DatabaseFailed(res, error);
    }

    //HDS 6
    res.send({ id: dtoOut._id });
});

router.delete('/', verify, requestHelper, async (req, res) => {
    //HDS 1
    let validate = Types.delete.validate(req.data);
    if (validate.error?.details) {
        //A1
        return Error.Delete.InvalidBody(res, validate.error.details);
    }

    //HDS 2 (delete user)
    let dtoOut;
    try {
        dtoOut = await _mongo.delete(req.data.id);
    } catch (error) {
        //A2
        return Error.Register.DatabaseFailed(res, error);
    }

    //HDS 3
    res.send({});
});

export default router;
