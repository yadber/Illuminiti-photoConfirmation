"use client";

import { useRouter, useParams } from "next/navigation";

export default function OrderCompletePage() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden pb-6">
        {/* Header */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold rounded-t-lg">
            Завершение заказа
          </div>
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-300/30 text-white rounded-full flex items-center justify-center text-lg"
          >
            ←
          </button>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mt-6 mb-4">
          <div className="w-28 h-28 bg-green-500 rounded-full"></div>
        </div>

        {/* Confirmation Text */}
        <div className="text-center px-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            Заказ #{id} выполнен
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Все задачи успешно завершены
          </p>
        </div>

        {/* Task Summary */}
        <div className="bg-gray-100 rounded-lg mx-4 p-4 text-sm text-gray-800 space-y-1 mb-6">
          <p>Доставка груза</p>
          <p>Фотофиксация (8 фото)</p>
          <p>Подпись клиента</p>
          <p>Сборка мебели</p>
        </div>

        {/* Return to List Button */}
        <div className="px-4">
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-md"
          >
            ВЕРНУТЬСЯ К СПИСКУ
          </button>
        </div>
      </div>
    </div>
  );
}
