import * as IUserService from "../service/user/IUserService";

export const apiResponse = async (res: any, statusCode: number, message: String, data: any, status: boolean, error: any) => {
    return res.status(statusCode).json(
        {
            statusCode,
            message,
            data: await data,
            status,
            error
        }
    )
}