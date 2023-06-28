import Joi from "joi";
import UserStore from "./userStore";
import { User as IUSER } from "../../utils/interface/IUser";
import STATUS_CODES from "../../utils/enum/statusCodes";
import ErrorMessageEnum from "../../utils/enum/errorMessage";
import responseMessage from "../../utils/enum/responseMessage";
import * as IUserService from "./IUserService";
import { IAppServiceProxy } from "../appServiceProxy";
import { toError } from "../../utils/interface/common";
import { apiResponse } from "../../helper/apiResonse"

export default class UserService implements IUserService.IUserServiceAPI {
	private userStore = new UserStore();
	private proxy: IAppServiceProxy;

	constructor(proxy: IAppServiceProxy) {
		this.proxy = proxy;
	}

	public create = async (payload: IUserService.IRegisterUserPayload) => {
		const response: IUserService.IRegisterUserResponse = {
			statusCode: STATUS_CODES.UNKNOWN_CODE,
			status: false,
			data: null,
			message: ""
		};
		const schema = Joi.object().keys({
			firstname: Joi.string().required(),
			lastname: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			age: Joi.number().required()
		});
		const params = schema.validate(payload);
		if (params.error) {
			console.error(params.error);
			return apiResponse(STATUS_CODES.UNPROCESSABLE_ENTITY, ErrorMessageEnum.REQUEST_PARAMS_ERROR, response, false, params.error);
		}
		const { firstname, lastname, email, password, age } = payload;

		// Check if email is already registered
		let existingUser: IUSER;
		try {
			existingUser = await this.userStore.getByEmail(email);
			//Error if email id is already exist
			if (existingUser && existingUser?.email) {
				return apiResponse(STATUS_CODES.BAD_REQUEST, ErrorMessageEnum.EMAIL_ALREADY_EXIST, response, false, toError(ErrorMessageEnum.EMAIL_ALREADY_EXIST));
			}

		} catch (e) {
			console.error(e);
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, response, false, toError(e.message));
		}

		let user: IUSER;
		const attributes: IUSER = {
			firstname,
			lastname,
			email: email.toLowerCase(),
			password,
			age
		};

		try {
			user = await this.userStore.createUser(attributes);
		} catch (e) {
			console.error(e);
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
		return apiResponse(STATUS_CODES.OK, responseMessage.USER_CREATED, user, true, null)

	};

	public updateUser = async (payload: IUserService.IUpdateUserPayload) => {
		const response: IUserService.IUpdateUserResponse = {
			statusCode: STATUS_CODES.UNKNOWN_CODE,
			message: null,
			data: null,
			status: false
		};
		let schemaPayload: any = {};
		(Object.keys(payload.data) as (keyof typeof payload.data)[]).forEach((key, index) => {
			if (key === 'firstname') {
				schemaPayload[key] = Joi.string().required()
			}
			if (key === 'lastname') {
				schemaPayload[key] = Joi.string().required()
			}
			if (key === 'email') {
				schemaPayload[key] = Joi.string().email().required()
			}
			if (key === 'password') {
				schemaPayload[key] = Joi.string().required()
			}
			if (key === 'age') {
				schemaPayload[key] = Joi.number().required()
			}
		});

		const schema = Joi.object().keys(schemaPayload);
		const params = schema.validate(payload.data);
		if (params.error) {
			console.error(params.error);
			return apiResponse(STATUS_CODES.UNPROCESSABLE_ENTITY, ErrorMessageEnum.REQUEST_PARAMS_ERROR, response, false, params.error);
		}
		let existingUser: IUSER;
		try {
			existingUser = await this.userStore.getById(payload.id);
			if (!existingUser) {
				return apiResponse(STATUS_CODES.BAD_REQUEST, ErrorMessageEnum.USER_NOT_EXIST, null, false, toError(ErrorMessageEnum.USER_NOT_EXIST));
			}
		} catch (e) {
			console.error(e);
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
		try {
			let result = await this.userStore.updateUserById(payload.id, payload.data)
			return apiResponse(STATUS_CODES.OK, responseMessage.USER_UPDATED, result, true, null)
		}
		catch (e) {
			console.error(e);
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
	};

	public deleteUser = async (payload: IUserService.IDeleteUserPayload) => {
		let { id } = payload;
		const response: IUserService.IDeleteUserResponse = {
			statusCode: STATUS_CODES.UNKNOWN_CODE,
			message: null,
			data: null,
			status: false
		};
		let existingUser: IUSER;
		try {
			existingUser = await this.userStore.getById(id);
			if (!existingUser) {
				return apiResponse(STATUS_CODES.BAD_REQUEST, ErrorMessageEnum.USER_NOT_EXIST, null, false, toError(ErrorMessageEnum.USER_NOT_EXIST));
			}
		} catch (e) {
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
		try {
			let result = await this.userStore.deleteUserById(id);
			return apiResponse(STATUS_CODES.OK, responseMessage.USER_DELETED, result, true, null)
		}
		catch (e) {
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
	};

	public getUsers = async () => {
		const response: IUserService.IGetAllUserResponse = {
			statusCode: STATUS_CODES.UNKNOWN_CODE,
			message: null,
			data: null,
			status: false
		};
		let users: IUSER[];
		try {
			users = await this.userStore.getAll();
			return apiResponse(STATUS_CODES.OK, responseMessage.USERS_FETCHED, users, true, null);
		} catch (e) {
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
	};

	public getUser = async (payload: IUserService.IGetUserPayload) => {
		let user: IUSER;
		try {
			user = await this.userStore.getById(payload.id);
			return apiResponse(STATUS_CODES.OK, responseMessage.USER_FETCHED, user, true, null);
		} catch (e) {
			return apiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, null, false, toError(e.message));
		}
	};
}
