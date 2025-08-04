// src/app/orders/[id]/page.js
"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
export default function OrderDetailPage({}) {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden pb-6">
        {/* Header with Back */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold">
            Заказ #{params.id}
          </div>
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-300 text-white rounded-full flex items-center justify-center"
          >
            ←
          </button>
        </div>

        <div className="px-4 pt-4">
          {/* Client Info */}
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Информация о клиенте
            </h4>
            <p className="text-sm text-gray-800">Анна Козн</p>
            <p className="text-sm text-gray-800">+972 52-123-4567</p>
            <p className="text-sm text-gray-800">ул. Герцля 15, кв. 42</p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Детали заказа
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              <li>Квартирный переезд (3 комнаты)</li>
              <li>Нужен подъем на 4-й этаж</li>
              <li>2 шкафа требуют разборки</li>
              <li>Большой холодильник</li>
              <li>Осторожно: хрупкая посуда</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mb-5">
            <Link href={`/orders/${id}/problem`} className="flex-1">
              <button className="w-full bg-red-600 text-white py-2 rounded-md font-bold">
                ПРОБЛЕМА
              </button>
            </Link>
            <Link href={`/orders/${id}/complete`} className="flex-1">
              <button className="w-full bg-green-500 text-white py-2 rounded-md font-bold">
                ЗАВЕРШИТЬ
              </button>
            </Link>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between">
            <Link href={`/orders/${id}/map`}>
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full font-medium">
                Карта
              </button>
            </Link>

            <Link href={`/orders/${id}/photo`}>
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full font-medium">
                Фото
              </button>
            </Link>

            <Link href={`/orders/${id}/sign`}>
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full font-medium">
                Подпись
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
