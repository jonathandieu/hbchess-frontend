import LoggedOutTemplate from '../components/LoggedOutTemplate';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../app/features/auth/authSlice';
import { useLoginMutation } from '../app/services/authApi';
import type { LoginRequest } from '../app/services/authApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [loginFormState, setLoginFormState] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) =>
    setLoginFormState((prev) => ({ ...prev, [name]: value }));

  const handleLoginRequest = async () => {
    try {
      const user = await login(loginFormState).unwrap();
      dispatch(setCredentials(user));
      toast.dismiss();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <LoggedOutTemplate>
      <div className="flex justify-center items-center py-12 px-4 min-h-full sm:px-6 lg:px-8">
        <div className="p-5 space-y-8 w-full max-w-md bg-gray-50 rounded-lg shadow-2xl">
          <div>
            <img
              className="mx-auto w-auto h-12"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block relative focus:z-10 py-2 px-3 w-full text-gray-900 placeholder:text-gray-500 rounded-none rounded-t-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 appearance-none sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block relative focus:z-10 py-2 px-3 w-full text-gray-900 placeholder:text-gray-500 rounded-none rounded-b-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 appearance-none sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleLoginRequest}
                className="group flex relative justify-center py-2 px-4 w-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="flex absolute inset-y-0 left-0 items-center pl-3">
                  <LockClosedIcon
                    className="w-5 h-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? <Spinner /> : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoggedOutTemplate>
  );
}

export default Login;
