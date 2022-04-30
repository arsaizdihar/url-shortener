import { ApiError, Provider, Session, User } from "@supabase/supabase-js";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../src/utils/supabaseClient";

function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-72px)]">
      <form
        className="p-6 rounded-md bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl duration-300 w-full max-w-xs"
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (loading) return;
          if (emailRef.current?.validationMessage) {
            emailRef.current.focus();
            return setError(true);
          }
          setLoading(true);
          setError(false);
          const promise = new Promise<{
            session: Session | null;
            user: User | null;
            provider?: Provider | undefined;
            url?: string | null | undefined;
            error: ApiError | null;
          }>(async (resolve, reject) => {
            const data = await supabase.auth.signIn({
              email: emailRef.current!.value,
            });
            if (data.error) {
              reject(data.error);
            } else {
              resolve(data);
            }
          });
          toast.promise(promise, {
            loading: "Sending magic link...",
            success: "Check your email for the login link!",
            error: (error) => {
              setLoading(false);
              return error.error_description || error.message;
            },
          });
          await promise;
        }}
      >
        <h1 className="text-2xl font-medium mb-4">LOGIN</h1>
        <div>
          <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparentfocus:border-gray-500 focus:bg-white focus:ring-0 border-none text-black"
            placeholder="Email"
          />
          {error && (
            <p className="text-red-400 text-sm pl-1 mt-0.5">Invalid Email</p>
          )}
        </div>
        <button
          className="w-full py-3 px-4 bg-violet-500 hover:bg-violet-400 text-white dark:bg-violet-800 dark:hover:bg-violet-700 font-medium rounded-md mt-2 disabled:bg-violet-400"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
