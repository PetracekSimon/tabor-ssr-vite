interface LooseObject { [k: string]: any }

declare namespace Express {
    export interface Request {
        role: ["SuperAdmin", "Admin", "User", "Public"];
        email: string,
        user: any
        data: any
        apiPath: string
    }
}