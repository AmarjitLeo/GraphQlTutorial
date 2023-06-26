import Joi from "joi";
import UserStore from "./userStore";
import IUSER from "../../utils/interface/IUser";
import STATUS_CODES from "../../utils/enum/statusCodes";
import ErrorMessageEnum from "../../utils/enum/errorMessage";
import responseMessage from "../../utils/enum/responseMessage" ;
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

	public create = async (
		request: IUserService.IRegisterUserRequest,
		res: IUserService.IRegisterUserResponse,
	) => {
		const response: IUserService.IRegisterUserResponse = {
			status: STATUS_CODES.UNKNOWN_CODE,
		};
		const schema = Joi.object().keys({
			firstname: Joi.string().required(),
			lastname: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const params = schema.validate(request.body);
		if (params.error) {
			console.error(params.error);
			return apiResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, ErrorMessageEnum.REQUEST_PARAMS_ERROR, response, true , null );
		}
		const { firstname, lastname, email, password } = params.value;

		// Check if email is already registered
		let existingUser: IUSER;
		try {
			existingUser = await this.userStore.getByEmail(email);
			//Error if email id is already exist
			if (existingUser && existingUser?.email) {
				return apiResponse(res, STATUS_CODES.BAD_REQUEST , ErrorMessageEnum.EMAIL_ALREADY_EXIST,  response , false , toError(ErrorMessageEnum.EMAIL_ALREADY_EXIST));
			}
			
		} catch (e) {
			console.error(e);
			return apiResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR, response ,false , toError(e.message));
		}

		let user: IUSER;
			const attributes: IUSER = {
				firstname,
				lastname,
				email: email.toLowerCase(),
				password
			};

		try {
			user = await this.userStore.createUser(attributes);
		} catch (e) {
			console.error(e);
			return apiResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR,  response , false , toError(e.message));
		}
		return apiResponse(res, STATUS_CODES.OK, responseMessage.USER_CREATED,  response , true , null)
		
	};

	public getUsers = async (
		request: IUserService.IGetAllUserRequest,
		res: IUserService.IGetAllUserResponse,
	) => {
		const response: IUserService.IRegisterUserResponse = {
			status: STATUS_CODES.UNKNOWN_CODE,
		};
		
		try{
			
			const users: IUSER[] = await this.userStore.getAll();
			return users;
			// return apiResponse(res, STATUS_CODES.OK, responseMessage.USERS_FETCHED,  response , true , null)
			
	
		}catch(e){
			console.log(e)

			return apiResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR,  response , false , toError(e.message))
			// return apiResponse(res, STATUS_CODES.OK, responseMessage.USER_CREATED,  response , true , null)
			
			// await apiResponse(res, 500, "internal error in api!", null , false, error)
		}
	}

	/**
	 * User login
	 */
	// public login = async (
	// 	request: IUserService.ILoginUserRequest,
	// 	res: IUserService.ILoginUserResponse,
	// ) => {
	// 	const response: IUserService.ILoginUserResponse = {
	// 		status: STATUS_CODES.UNKNOWN_CODE,
	// 	};
	// 	const schema = Joi.object().keys({
	// 		email: Joi.string().email().required(),
	// 		password: Joi.string().required(),
	// 	});
	// 	const params = schema.validate(request.body);

	// 	if (params.error) {
	// 		console.error(params.error);
	// 		response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
	// 		response.error = toError(params.error.details[0].message);
	// 		return apiResponse(res, response);
	// 	}
	// 	const { email, password } = params.value;
	// 	let user: IUSER;
	// 	try {
	// 		//get user bu email id to check it exist or not
	// 		user = await this.userStore.getByEmail(email);
	// 		//if credentials are incorrect
	// 		if (!user) {
	// 			response.status = STATUS_CODES.UNAUTHORIZED;
	// 			response.error = toError(ErrorMessageEnum.INVALID_CREDENTIALS);
	// 			return apiResponse(res, response);
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 		response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
	// 		response.error = toError(e.message);
	// 		return apiResponse(res, response);
	// 	}

	// 	//comparing password to insure that password is correct
	// 	const isValid = await bcrypt.compare(password, user?.password);

	// 	//if isValid or user.password is null
	// 	if (!isValid || !user?.password) {
	// 		response.status = STATUS_CODES.UNAUTHORIZED;
	// 		response.error = toError(ErrorMessageEnum.INVALID_CREDENTIALS);
	// 		return apiResponse(res, response);
	// 	}
	// 	response.status = STATUS_CODES.OK;
	// 	response.token = this.generateJWT(user);
	// 	response.user = user;
	// 	return apiResponse(res, response);
	// };

	/**
	 * Get user by Id
	 */
	public getUserById = async (
		request: IUserService.IGetUserRequest,
		res: IUserService.IGetUserResponse,
	) => {
		const response: IUserService.IGetUserResponse = {
			status: STATUS_CODES.UNKNOWN_CODE,
		};

		const schema = Joi.object().keys({
			id: Joi.string().required(),
		});

		const params = schema.validate(request.params);

		if (params.error) {
			console.error(params.error);
			response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
			response.error = toError(params.error.details[0].message); 
			return apiResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, ErrorMessageEnum.REQUEST_PARAMS_ERROR,  response , false , toError(params.error.details[0].message))
		}

		const { id } = params.value;

	
		let user: IUSER;
		try {
			user = await this.userStore.getById(id);

			//if user's id is incorrect
			if (!user) {
				response.status = STATUS_CODES.BAD_REQUEST;
				response.error = toError(ErrorMessageEnum.INVALID_USER_ID);
				return apiResponse(res, STATUS_CODES.BAD_REQUEST, responseMessage.RECORD_NOT_FOUND,  response , false , toError(ErrorMessageEnum.INVALID_USER_ID))
				// apiResponse(res, response);
			}
		} catch (e) {
			console.error(e);
			response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
			response.error = toError(e.message);
			return apiResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, ErrorMessageEnum.INTERNAL_ERROR,  response , false , toError(e.message))
			
		}
		response.status = STATUS_CODES.OK;
		response.user = user;
		return apiResponse(res, STATUS_CODES.OK, responseMessage.USERS_FETCHED,  response , true , null)
	};
}
