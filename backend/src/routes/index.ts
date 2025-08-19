import { Router } from 'express';

import authentication from '../middlewares/auth.middleware';
import authRoute from './auth/route';
import userRoute from './user/route';
// import challengeRoute from './challenge/route';
// import chatRoute from './chat/route';
// import mentorRoute from './mentor/route';
// import notificationsRoute from './notifications/route';
// import paymentRoute from './payment/route';
// import plansRoute from './plans/route';
// import qnaRoute from './qna/route';
// import subscriptionsRoute from './subscriptions/route';

const api: Router = Router();

api.use('/auth', authRoute);
api.use('/user', authentication, userRoute);
// api.use('/challenge', authentication, challengeRoute);
// api.use('/chat', authentication, chatRoute);
// api.use('/mentor', authentication, mentorRoute);
// api.use('/notification', authentication, notificationsRoute);
// api.use('/payment', authentication, paymentRoute);
// api.use('/plan', authentication, plansRoute);
// api.use('/qna', authentication, qnaRoute);
// api.use('/subscription', authentication, subscriptionsRoute);

export default api;
