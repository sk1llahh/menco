import expressAsyncHandler from 'express-async-handler';

const getUser = expressAsyncHandler(async (req, res, next) => {
  try {
    res.json(req)
  } catch (e) {
    next(e);
  }
});


export default {
  getUser,
};

