/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";
import { UserRole } from "./ZustandContext";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export interface ApiError {
    errMessage: {
        cs: string;
        en?: string
    }
}
export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {})
            }
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body);
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {})
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path
        });
    };
}


export type ListResponse<T> = {
    itemList: T[];
    pageInfo: {
        total?: number;
        pageIndex?: number;
        itemsAmount?: number;
    };
}

export interface Image {
    _id: string;
    thumbnailPath?: string;
    filename: string;
    description: string;
    width: string,
    height: string
}

export interface Folder {
    _id: string;
    name: string;
    code: string;
    order: number;
    isVisible: boolean;
}

export class Api<SecurityDataType> extends HttpClient<SecurityDataType> {

    private apiUrl = "/api";

    public userList(token: string) {
        return this.request<ListResponse<any>>({
            path: `${this.apiUrl}/user/list`,
            method: HttpMethods.GET,
            type: ContentType.Json,
            headers: {
                "auth-token": `${token}`
            }
        })
    }

    public createUser(email: string, password: string, role: UserRole, token: string) {
        return this.request<ListResponse<any>>({
            path: `${this.apiUrl}/user/register`,
            method: HttpMethods.POST,
            type: ContentType.Json,
            body: {
                email,
                password,
                role
            },
            headers: {
                "auth-token": `${token}`
            }
        })
    }

    public updatePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string, token: string) {
        return this.request<ListResponse<any>>({
            path: `${this.apiUrl}/user/updatePassword`,
            method: HttpMethods.PATCH,
            type: ContentType.Json,
            body: {
                oldPassword,
                newPassword,
                newPasswordConfirm
            },
            headers: {
                "auth-token": `${token}`
            }
        })
    }

    public deleteUser(id: string, token: string) {
        return this.request<ListResponse<any>>({
            path: `${this.apiUrl}/user/`,
            method: HttpMethods.DELETE,
            type: ContentType.Json,
            body: {
                id
            },
            headers: {
                "auth-token": `${token}`
            }
        })
    }

    public updateUser(id: string, email: string, role: string, password: string, token: string) {
        const body: { [key: string]: string } = { id: id };
        if (password.length > 0) {
            body['password'] = password;
        }
        if (email.length > 0) {
            body['email'] = email;
        }
        if (role.length > 0) {
            body['role'] = role;
        }

        return this.request<ListResponse<any>>({
            path: `${this.apiUrl}/user/`,
            method: HttpMethods.PATCH,
            type: ContentType.Json,
            body,
            headers: {
                "auth-token": `${token}`
            }
        })
    }

    public imageList = (data: any) => {
        return this.request<any>({
            path: `${this.apiUrl}/image/list`,
            method: HttpMethods.GET,
            type: ContentType.Json,
            query: data
        })
    }

    public uploadImages = (files: File[], folderCode: string, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/image`,
            method: "POST",
            type: ContentType.FormData,
            body: {
                files,
                folderCode
            },
            headers: {
                "auth-token": `${token}`
            }
        });
    }

    public deleteImage = (id: string, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/image/`,
            method: HttpMethods.DELETE,
            type: ContentType.Json,
            body: { id },
            headers: {
                "auth-token": `${token}`
            }
        });
    }

    public setFolderVisibility = (code: string, isVisible: boolean, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/folder/setVisibility`,
            method: HttpMethods.PATCH,
            type: ContentType.Json,
            body: { code, isVisible },
            headers: {
                "auth-token": `${token}`
            }
        });
    }

    public updateFolder = (code: string, name: string, order: number, token: string) => {

        return this.request<any>({
            path: `${this.apiUrl}/folder/`,
            method: HttpMethods.PATCH,
            type: ContentType.Json,
            body: { code, name, order },
            headers: {
                "auth-token": `${token}`
            }
        });
    }
    public updateImageDescription = (description: string, id: string, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/image/updateDescription`,
            method: HttpMethods.PATCH,
            type: ContentType.Json,
            body: { description, id },
            headers: {
                "auth-token": `${token}`
            }
        });
    }
    public getFolderList = (data: any, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/folder/list`,
            method: HttpMethods.GET,
            type: ContentType.UrlEncoded,
            query: data,
            headers: {
                "auth-token": `${token}`
            }
        });
    }
    public getImagesForGalleryPage = (data: any, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/folder/getImagesForGalleryPage`,
            method: HttpMethods.GET,
            type: ContentType.UrlEncoded,
            query: data,
            headers: {
                "auth-token": `${token}`
            }
        });
    }
    /**
     * Funkce pro vytvoření nové složky
     * @param name Název vytvářené složky 
     * @param parentFolderCode Nadřezená složka
     * @param token 
     * @returns 
     */
    public createFolder = (name: string, order: number, parentFolderCode: string, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/folder`,
            method: HttpMethods.POST,
            type: ContentType.Json,
            body: {
                name,
                order,
                parentFolderCode
            },
            headers: {
                "auth-token": `${token}`
            }
        });
    }

    public login = (email: string, password: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/user/login`,
            method: HttpMethods.POST,
            type: ContentType.UrlEncoded,
            body: { email, password }
        });
    }
    public checkToken = (token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/user/checkToken`,
            method: HttpMethods.GET,
            type: ContentType.UrlEncoded,
            headers: {
                "auth-token": `${token}`
            }
        });
    }

    public createApplication = (data: any) => {
        return this.request<any>({
            path: `${this.apiUrl}/application`,
            method: HttpMethods.POST,
            type: ContentType.Json,
            body: data
        });
    }
    public updateApplicationState = (data: any, token: string) => {
        return this.request<Application>({
            path: `${this.apiUrl}/application/updateState`,
            method: HttpMethods.PATCH,
            type: ContentType.Json,
            body: data,
            headers: {
                "auth-token": `${token}`
            }
        });
    }

    public getApplications = (data: any, token: string) => {
        return this.request<ListResponse<Application>>({
            path: `${this.apiUrl}/application/list`,
            method: HttpMethods.GET,
            type: ContentType.UrlEncoded,
            query: data,
            headers: {
                "auth-token": `${token}`
            }
        });
    }
    public getApplicationAsPDF = (id: string, token: string) => {
        return this.request<any>({
            path: `${this.apiUrl}/application/${id}/pdf`,
            method: HttpMethods.GET,
            type: ContentType.UrlEncoded,
            headers: {
                "auth-token": `${token}`
            },
            format: "blob"
        });
    }
}


export type TransportPlace = "radotin" | "radlice" | "vlastni";

export interface Application {
    _id: string;
    summerCampYear: number;
    applicationNumber: string;
    state: string;
    childFirstName: string;
    childLastName: string;
    childBirthDate: string;
    childAddress: string;
    childGender: string;
    insuranceNumber: string;
    tetanusDate: string;
    schoolInfo: string;
    siblingsCount: number;
    firstTime: boolean;
    hobbies: string;
    parent1Name: string;
    parent1Phone: string;
    parent2Name: string;
    parent2Phone: string;
    parentEmail: string;
    swimming: string;
    healthProblems: string;
    foodAllergy: string;
    childDescription: string;
    tentPreference: string;
    boardingPlace: TransportPlace;
    leavingPlace: TransportPlace;
    tripFreeTimeConsent: boolean;
}