import { LockClosedIcon } from '@heroicons/react/solid';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../app/services/authApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import HBChessLogo from '../assets/hblogo.png';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get('emailToken');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [resetPasswordFormState, setResetPasswordFormState] = useState({
    password: ''
  });

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) =>
    setResetPasswordFormState((prev) => ({ ...prev, [name]: value }));

  const handleResetPassword = async () => {
    if (emailToken !== null) {
      try {
        const response = await resetPassword({
          emailToken,
          password: resetPasswordFormState['password']
        }).unwrap();
        toast.dismiss();
        toast.success(response.message);
        navigate('/auth/login');
      } catch (err) {
        toast.error(err.data.message);
      }
    } else {
      try {
        const response = await resetPassword({
          emailToken: '',
          password: resetPasswordFormState['password']
        }).unwrap();
        toast.dismiss();
        toast.success(response.message);
        navigate('/auth/login');
      } catch (err) {
        toast.error(err.data.message);
      }
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
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block relative focus:z-10 py-2 px-3 w-full text-gray-900 placeholder:text-gray-500 rounded-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 appearance-none sm:text-sm"
                placeholder="New Password"
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

export default ResetPassword;
