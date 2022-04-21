import { LockClosedIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../app/services/authApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import HBChessLogo from '../assets/hblogo.png';

function ForgotPassword() {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [forgotPasswordFormState, setForgotPasswordFormState] = useState({
    email: ''
  });

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) =>
    setForgotPasswordFormState((prev) => ({ ...prev, [name]: value }));

  const handleResetPassword = async () => {
    try {
      const response = await forgotPassword(forgotPasswordFormState).unwrap();
      toast.dismiss();
      toast.success(response.message);
      navigate('/auth/login');
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-full sm:px-6 lg:px-8">
      <div className="p-5 space-y-8 w-full max-w-md bg-gray-50 rounded-lg shadow-2xl">
        <div>
          <img
            className="mx-auto w-auto h-24"
            src={HBChessLogo}
            alt="HBChess"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block relative focus:z-10 py-2 px-3 w-full text-gray-900 placeholder:text-gray-500 rounded-none rounded-b-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 appearance-none sm:text-sm"
                placeholder="E-mail address"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleResetPassword}
              className="group flex relative justify-center py-2 px-4 w-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span className="flex absolute inset-y-0 left-0 items-center pl-3">
                <LockClosedIcon
                  className="w-5 h-5 text-green-500 group-hover:text-green-400"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? <Spinner /> : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
