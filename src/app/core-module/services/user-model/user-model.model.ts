export interface IUser {
    userEmail: string;
    name: string;
    password: string;
    passwordConf: string;
    isAdmin: boolean;
}

export interface IUserSignupRequest {
    userEmail: string;
    name: string;
    password: string;
    passwordConf: string;
    isAdmin: boolean;
}

export interface IUserLoginResponse {
    status: number;
    userData: IUserLoginTransportData;
}

export interface IUserLoginTransportData {
    userEmail: string;
    name: string;
    isAdmin: boolean;
    accessLevel: string;
    uuid: string;
    token: string;
}

