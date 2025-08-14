import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {CONFIG} from "../../utils/constants/config";
import userModel, { IUser } from '../user/model';

const login = async (body: IUser) => {
  const {login, password} = body

  let user = await userModel.findOne({login: login})

  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'Такого пользователя не существует!')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw createHttpError(httpStatus.UNAUTHORIZED, 'Неверный пароль!');
  }

  const token = jwt.sign(
    {userId: user._id, login: user.login},
    CONFIG.JWT_SECRET,
    {expiresIn: '7d'}
  )

  return {token, user: user}
}


const register = async (body: IUser) => {
  const {login, password} = body

  let user = await userModel.findOne({login: login})

  if (user) {
    throw createHttpError(httpStatus.BAD_REQUEST, 'Такой пользователь уже зарегистрирован!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new userModel({
    login: login,
    password: hashedPassword,
  });

  await newUser.save()

  const token = jwt.sign(
    {userId: newUser._id, login: newUser.login},
    CONFIG.JWT_SECRET,
    {expiresIn: "7d"}
  );

  return {token, user: newUser}
}

export default {
  login,
  register
}