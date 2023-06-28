import { User as IUSER, UpdateUser as IUPDATEUSER } from "../../utils/interface/IUser";
import { IResponse } from "../../utils/interface/common";
import { Request } from "express";

export interface IUserServiceAPI {
	create(payload: IRegisterUserPayload): any;
	getUsers(): any;
	getUser(payload: IGetUserPayload): any;
	deleteUser(request: IDeleteUserPayload): any;
	updateUser(payload: IUpdateUserPayload): any;
	loginUser(payload: ILoginPayload): any;
}

/********************************************************************************
 *  Create user
 ********************************************************************************/
export interface IRegisterUserPayload {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	age: number;
}


export interface IUpdateUserPayload {
	id: string,
	data: {
		firstname?: string;
		lastname?: string;
		email?: string;
		password?: string;
		age?: number;
	}
}


export interface IRegisterUserResponse extends IResponse {
	user?: IUSER;
}

export interface IUpdateUserResponse extends IResponse {
	user?: IUPDATEUSER;
}

/********************************************************************************
 * Login
 ********************************************************************************/
// export interface ILoginUserRequest extends Request {
// 	body: {
// 		email: string;
// 		password: string;
// 	}
// }
// export interface ILoginUserResponse extends IResponse {
// 	user?: IUSER;
// }

/********************************************************************************
 *  Get user
 ********************************************************************************/

export interface IGetUserRequest extends Request {
	params: {
		id: string;
	}
}
export interface IGetUserResponse extends IResponse {
	user?: IUSER;
}


/********************************************************************************
 *  Get all user
 ********************************************************************************/

export interface IGetAllUserRequest extends Request {

}
export interface IGetAllUserResponse extends IResponse {
	users?: IUSER[];
}
export interface IGetUserPayload {
	id: string;
}
export interface IGetUserResponse extends IResponse {
	users?: IUSER;
}


export interface IDeleteUserPayload extends Request {
	id: string
}
export interface IDeleteUserResponse extends IResponse {
	user?: IUSER;
}

export interface ILoginPayload {
	email: string,
	password: string
}
export interface ILoginResponse extends IResponse {
	token?: string;
	user?: IUSER;
}
