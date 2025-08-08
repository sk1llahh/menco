import userModel from './user.model.js';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';

const getUserById = async (login: string) => {
    let user = await userModel.findOne({login: login})

    if(!user){
        throw createHttpError(httpStatus.NOT_FOUND, 'Такого пользователя не существует!')
    }

    return user
}


export default {
    getUserById
}
