"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("ivan.petrov");
  const [password, setPassword] = useState("********");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      router.push("/orders");
    }
  };
  return (
    <>
      <Head>
        <title>Muver - Login</title>
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold">
            Вход в систему
          </div>
          <div className="px-6 py-8">
            <h2 className="text-center text-blue-600 text-xl font-bold mb-1">
              Мyвер
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Приложение для водителей
            </p>
            <form onSubmit={handleLogin}>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="username"
                  defaultValue="ivan.petrov"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
                >
                  Имя пользователя
                </label>
              </div>

              <div className="relative mb-6">
                <input
                  type="password"
                  id="password"
                  defaultValue="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
                >
                  Пароль
                </label>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-md font-semibold hover:opacity-90"
                type="submit"
              >
                Войти
              </button>
            </form>
          </div>
          <div className="text-center text-gray-400 text-sm pb-4">
            Версия 2.5.1
          </div>
        </div>
      </div>
    </>
  );
}
