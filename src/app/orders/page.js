// pages/orders.js
import Head from "next/head";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <>
      <Head>
        <title>Muver - My Orders</title>
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-[360px] bg-white rounded-lg shadow-md overflow-hidden pb-6">
          {/* Top Tab */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold rounded-t-lg">
            Мои заказы
          </div>

          <div className="px-4 pt-4">
            {/* Сегодня */}
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Сегодня
            </h3>

            {/* 🔗 Link this card to /orders/32845 */}
            <Link href="/orders/32845" className="block mb-4">
              <div className="p-3 border border-red-300 rounded-lg bg-gradient-to-r from-red-100 to-white hover:bg-red-50 transition">
                <h4 className="text-red-600 font-semibold text-sm">
                  В работе - #32845
                </h4>
                <p className="text-sm text-red-600 mt-1">
                  ул. Герцля 15 → ул. Бен Гуриона 78
                </p>
                <p className="text-sm text-red-500 mt-1">14:00 - 16:30</p>
              </div>
            </Link>

            {/* Non-linked orders (for now) */}
            <div className="mb-4 p-3 border border-gray-300 rounded-lg bg-white">
              <h4 className="text-gray-800 font-semibold text-sm">
                Заказ #32846
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                ул. Яффо 42 → ул. Жаботинского 128
              </p>
              <p className="text-sm text-gray-500 mt-1">17:00 - 19:30</p>
            </div>

            {/* Completed */}
            <h3 className="text-sm font-semibold text-gray-600 mt-6 mb-3">
              Завершенные
            </h3>
            <div className="mb-4 p-3 border border-green-300 rounded-lg bg-gradient-to-r from-green-100 to-white">
              <h4 className="text-green-600 font-semibold text-sm">
                Выполнен - #32844
              </h4>
              <p className="text-sm text-green-600 mt-1">
                ул. Дизенгоф 112 → ул. Дизенгоф 242
              </p>
              <p className="text-sm text-green-500 mt-1">09:30 - 12:15</p>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-4">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </>
  );
}
