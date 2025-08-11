import expressAsyncHandler from 'express-async-handler';

const getUser = expressAsyncHandler(async (req, res, next) => {
  try {
    res.json({ user: req.user }); // отдаём только полезную часть
  } catch (e) {
    next(e);
  }
});


export default {
  getUser,
};

