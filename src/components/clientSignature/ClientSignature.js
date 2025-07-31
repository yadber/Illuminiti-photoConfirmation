"use client";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import { BsArrowLeft } from "react-icons/bs";

export default function ClientSignature() {
  const sigCanvas = useRef(null);
  const [savedSignature, setSavedSignature] = useState(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSavedSignature(null);
  };
  // I will change this code
  // const saveSignature = () => {
  //   if (!sigCanvas.current.isEmpty()) {
  //     const dataUrl = sigCanvas.current
  //       .getTrimmedCanvas()
  //       .toDataURL("image/png");
  //     setSavedSignature(dataUrl);
  //     alert("Подпись сохранена!");
  //   } else {
  //     alert("Пожалуйста, подпишитесь сначала.");
  //   }
  // };
  const saveSignature = async () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      try {
        const response = await fetch("../../api/save-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            signature: dataUrl,
            timestamp: new Date().toISOString(),
          }),
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Upload failed");

        setSavedSignature(dataUrl);
        alert("Подпись сохранена!");

        console.log("Saved to:", result.fileUrl);
      } catch (err) {
        console.error(err);
        alert("Ошибка при сохранении подписи.");
      }
    } else {
      alert("Пожалуйста, подпишитесь сначала.");
    }
  };

  return (
    <div className="min-h-screen mt-20 w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-4 px-6 transition-colors duration-300">
      <div className="w-full flex items-center bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white px-4 py-3 rounded-b-xl mb-4">
        <button className="w-10 h-10 flex items-center justify-center text-xl bg-blue-300 rounded-full mr-8">
          ⬅
        </button>
        <h1 className="text-lg font-semibold">Подпись клиента</h1>
      </div>

      {/* Signature Canvas */}
      <div
        className="w-full bg-white dark:bg-gray-700 rounded-xl overflow-hidden mb-4"
        style={{ height: 250 }}
      >
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{ className: "w-full h-full" }}
          backgroundColor="transparent"
          penColor="#000"
        />
      </div>

      {/* Instructions */}
      <div className="text-center mb-4">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white">
          Получите подпись клиента
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Попросите клиента расписаться в получении груза
        </p>
      </div>

      {/* Confirm Text */}
      <div className="mb-4 w-full">
        <button
          disabled
          className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-700 rounded-lg text-sm font-medium shadow-inner"
        >
          Я подтверждаю получение груза
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full">
        <button
          onClick={clearSignature}
          className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold"
        >
          ОЧИСТИТЬ
        </button>
        <button
          onClick={saveSignature}
          className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          СОХРАНИТЬ
        </button>
      </div>

      {/* Preview Saved Signature (optional) I can use Image of the next.js*/}
      {savedSignature && (
        <div className="mt-4 w-full">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Предпросмотр подписи:
          </p>
          <img
            src={savedSignature}
            alt="Saved signature"
            className="w-full border rounded"
          />
        </div>
      )}
    </div>
  );
}
