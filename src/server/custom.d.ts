interface LooseObject { [k: string]: any }

declare namespace Express {
    export interface Request {
        user?: LooseObject
        data: LooseObject
        apiPath: string
    }
}