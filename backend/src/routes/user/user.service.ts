import userModel from './user.model.js';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import { TUser } from '../auth/auth.types.js';

const getUserById = async (login: string) => {
    let user = await userModel.findOne({login: login})

    if(!user){
        throw createHttpError(httpStatus.NOT_FOUND, 'Такого пользователя не существует!')
    }

    return user
}

const setUser = async (body: TUser) => {
    const {login, password} = body

    let user = await userModel.findOne({login: login})

    if(!user){
        const newUser = new userModel({
            login: login,
            password: password,
        });

        return newUser.save()
    } else {
        return user
    }
}

export default {
    setUser,
    getUserById
}
