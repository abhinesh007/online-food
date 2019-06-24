export interface IUser {
    userEmail: string;
    userName: string;
    password: string;
    passwordConf: string;
    isAdmin: boolean;
}

export interface IUserSignupRequest {
    userEmail: string;
    userName: string;
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
    userName: string;
    isAdmin: boolean;
    accessLevel: string;
    uuid: string;
    token: string;
}

