import userModel from '../user/user.model.js';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import { TUser } from './auth.types.js';

const login = async (body: TUser) => {
    const {login} = body

    let user = await userModel.findOne({login: login})

    if(!user){
        throw createHttpError(httpStatus.NOT_FOUND, 'Такого пользователя не существует!')
    }

    return user
}


const register = async (body: TUser) => {
    const {login, password} = body

    let user = await userModel.findOne({login: login})

    if(user){
        throw createHttpError(httpStatus.BAD_REQUEST, 'Такой пользователь уже зарегистрирован!')
    }

    const newUser = new userModel({
        login: login,
        password: password,
    });

    return newUser.save()

}
export default {
    login,
    register
}