import createHttpError from 'http-errors';
import httpStatus from 'http-status';

import userModel from './model';

const getUser = async (res) => {
  const user = await userModel.findById(res.userId).select('-password');

  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'Пользователь не найден!');
  }

  return user;
};

export default {
  getUser,
};
