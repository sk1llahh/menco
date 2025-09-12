import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import manWorkingImg2 from '@/shared/assets/images/man_working_2.png';
import { ROUTES } from '@/shared/model/routes';
import { RegisterBody, RegisterSchema } from '@repo/types';
import useAuth from '@/entities/auth/model/useAuth';

const Page = () => {
  const { register: handleHegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBody>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterBody) => {
    handleHegister.mutate(data);
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
        <div className="relative flex-1 bg-orange-100 flex items-center justify-center">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-4/5 h-full rounded-r-[50%] bg-orange-50"
            style={{ zIndex: 0 }}
          />
          <img
            src={manWorkingImg2}
            alt="Person working on a laptop"
            className="absolute h-full object-contain z-10 p-7"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        <div className="flex-1 p-16 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-10 text-gray-800 self-start">
            Create Account
          </h1>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input"
              {...register('login')}
              type="text"
              placeholder="login"
            />
            <input
              className="input"
              {...register('email')}
              type="text"
              placeholder="email"
            />

            <input
              className="input"
              {...register('password')}
              type="password"
              placeholder="password"
            />

            <button
              type="submit"
              className="
                w-full py-3 mt-4 rounded-xl
                bg-orange-200 text-orange-900 font-semibold
                hover:bg-orange-300 transition-colors duration-200
                shadow-md
              "
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center my-8">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">- or -</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to={ROUTES.LOGIN}
              className="text-orange-500 font-semibold ml-1 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Component = Page;
