import expressAsyncHandler from 'express-async-handler';
import userService from './user.service.js';

const getUserById = expressAsyncHandler(async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.params.id)
    res.json(result)
  } catch (e) {
    next(e);
  }
});


export default {
  getUserById,
};

