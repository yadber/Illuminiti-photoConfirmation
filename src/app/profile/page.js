"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden pb-6">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold rounded-t-2xl">
          Мой профиль
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/20 text-white rounded-full flex items-center justify-center text-lg"
          >
            ←
          </button>
        </div>

        {/* Profile Circle + Name */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 flex flex-col items-center pb-6 pt-3 -mt-[1px] rounded-b-2xl mb-4">
          <div className="w-28 h-28 bg-white rounded-full border-4 border-white "></div>
          <h2 className="text-xl font-semibold text-white">Иван Петров</h2>
        </div>

        {/* Statistics */}
        <div className="bg-gray-100 mx-4 mb-6 p-4 rounded-xl text-sm text-gray-800">
          <p className="font-semibold mb-2">Статистика</p>
          <p>Выполнено заказов: 458</p>
          <p>Рейтинг: 4.92/5</p>
          <p>Стаж работы: 3 года 2 месяца</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 px-4">
          <button className="w-full py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-800">
            Настройки приложения
          </button>
          <button className="w-full py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-800">
            Тех. поддержка
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-2 border border-red-500 text-red-600 font-bold text-sm rounded-md hover:bg-red-50"
          >
            Выйти из системы
          </button>
        </div>
      </div>
    </div>
  );
}
