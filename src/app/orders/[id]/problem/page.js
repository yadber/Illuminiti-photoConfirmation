// src/app/orders/[id]/problem/page.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ProblemReportPage() {
  const router = useRouter();
  const { id } = useParams();

  const [selected, setSelected] = useState(null);

  const problems = [
    "Клиент не доступен",
    "Повреждение при перевозке",
    "Проблема с доступом",
    "Другая проблема",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden pb-6">
        {/* Header */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold rounded-t-lg">
            Сообщить о проблеме
          </div>
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-300/30 text-white rounded-full flex items-center justify-center text-lg"
          >
            ←
          </button>
        </div>

        {/* Red Alert Icon */}
        <div className="flex justify-center mt-6 mb-4">
          <div className="w-28 h-28 bg-red-500 rounded-full"></div>
        </div>

        {/* Title */}
        <div className="text-center px-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Заказ #{id}</h2>
          <p className="text-sm text-gray-500">Выберите тип проблемы</p>
        </div>

        {/* Problem Buttons */}
        <div className="flex flex-col gap-3 px-6 mb-6">
          {problems.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(item)}
              className={`w-full py-2 rounded-md text-sm font-medium ${
                selected === item
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="px-6">
          <button
            onClick={() => {
              if (selected) {
                alert(`Проблема "${selected}" отправлена`);
                router.push("/orders");
              }
            }}
            disabled={!selected}
            className={`w-full text-white font-bold text-sm py-2 rounded-md ${
              selected
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            ОТПРАВИТЬ И СВЯЗАТЬСЯ
          </button>
        </div>
      </div>
    </div>
  );
}
