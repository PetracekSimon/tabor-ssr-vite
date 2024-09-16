interface LooseObject { [k: string]: any }

declare namespace Express {
    export interface Request {
        user: any
        data: any
        apiPath: string
    }
}