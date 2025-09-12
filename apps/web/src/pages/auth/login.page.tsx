import { zodResolver } from '@hookform/resolvers/zod';
import {LoginSchema, LoginBody} from '@repo/types'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import manWorkingImg1 from '@/shared/assets/images/man_working_1.png';
import { ROUTES } from '@/shared/model/routes';
import useAuth from '@/entities/auth/model/useAuth';

const Page = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginBody) => {
    login.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-50">
      <div
        className="
          flex bg-white rounded-[40px] shadow-2xl overflow-hidden
          max-w-5xl w-full
        "
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Left side (Form) */}
        <div className="flex-1 p-16 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-10 text-gray-800">
            Welcome Back!!
          </h1>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input w-100"
              {...register('login')}
            />
            <input
              className="input w-100"
              {...register('password')}
            />

            <a
              href="#"
              className="text-sm text-gray-500 hover:text-orange-500 self-end transition-colors duration-200"
            >
              Forgot Password?
            </a>

            <button
              type="submit"
              className="
                w-full py-3 mt-4 rounded-xl
                bg-orange-200 text-orange-900 font-semibold
                hover:bg-orange-300 transition-colors duration-200
                shadow-md
              "
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-8">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">- or -</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <div className="flex justify-center gap-6">
            <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
              <img src="/google-icon.svg" alt="Google" className="h-6 w-6" />
            </button>
            <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
              <img
                src="/facebook-icon.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </button>
            <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
              <img src="/apple-icon.svg" alt="Apple" className="h-6 w-6" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-10">
            <Link
              to={ROUTES.REGISTER}
              className="text-orange-500 font-semibold ml-1 hover:underline"
            >
              Don't have an account?
            </Link>
          </p>
        </div>

        <div className="relative flex-1 bg-orange-100 flex items-center justify-center">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4/5 h-full rounded-l-[50%] bg-orange-50"
            style={{ zIndex: 0 }}
          />
          <img
            src={manWorkingImg1}
            alt="Person working on a laptop"
            className="absolute h-full object-contain z-10"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Component = Page;
