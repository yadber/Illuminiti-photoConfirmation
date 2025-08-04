// src/app/orders/[id]/map/page.js
"use client";

import { useRouter, useParams } from "next/navigation";

export default function DeliveryRoutePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden pb-6">
        {/* Header */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold rounded-t-lg">
            Маршрут доставки
          </div>
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-300/30 text-white rounded-full flex items-center justify-center text-lg"
          >
            ←
          </button>
        </div>

        {/* Route Illustration */}
        <div className="bg-[#f1f6f7] h-64 relative ">
          {/* A (Start) */}
          <div className="absolute left-20 top-[50%] -translate-y-1/2 z-10">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow">
              <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                A
              </div>
            </div>
          </div>

          {/* B (Destination) */}
          <div className="absolute right-24 top-[27%] z-10">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                B
              </div>
            </div>
          </div>

          {/* Connecting Dotted Line */}
          <div
            className="absolute left-[100px] z-20 top-[130px] w-[150px] h-0 border-t-4 border-dashed border-blue-400 rotate-[-15deg] "
            style={{ transformOrigin: "left center" }}
          ></div>

          {/* Midpoint (optional decorative) */}
          <div className="absolute left-[155px] top-[99px] z-30">
            <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-white"></div>
          </div>
        </div>

        {/* Route Info + Button */}
        <div className="bg-[#f1f6f7] px-4 pt-4 pb-6 relative">
          <p className="text-sm font-semibold text-gray-800 mb-1">Маршрут:</p>
          <p className="text-sm text-gray-500">От: ул. Герцля 15, Тель-Авив</p>
          <p className="text-sm text-gray-500">
            До: ул. Бен Гуриона 78, Тель-Авив
          </p>

          <button className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm font-semibold px-4 py-1.5 rounded-md shadow-sm">
            НАВИГАЦИЯ
          </button>
        </div>
      </div>
    </div>
  );
}
