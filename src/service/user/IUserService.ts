import IUSER from "../../utils/interface/IUser";
import { IResponse } from "../../utils/interface/common";
import { Request } from "express";

export interface IUserServiceAPI {
	create(request: IRegisterUserRequest, response: IRegisterUserResponse):any;
	getUsers(request: IGetAllUserRequest, response: IGetAllUserResponse): any;
	getUserById(request: IGetUserRequest, response: IGetUserResponse):any;
	// deleteUser(request: IRegisterUserRequest, response: IRegisterUserResponse);
	// updateUser(request: ILoginUserRequest, response: ILoginUserResponse);
}

/********************************************************************************
 *  Create user
 ********************************************************************************/
export interface IRegisterUserRequest extends Request {
	body: {
		name: string;
		age: number;
		email: string;
		password: string;
	}
}

export interface IRegisterUserResponse extends IResponse {
	user?: IUSER;
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
