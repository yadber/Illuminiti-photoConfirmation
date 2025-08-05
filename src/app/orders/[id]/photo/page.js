"use client";

import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PhotoCapture() {
  const [selectedOption, setSelectedOption] = useState("before");
  const [photos, setPhotos] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  const [streaming, setStreaming] = useState(false);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const beforeCount = photos.filter((p) => p.tag === "before").length;
  const afterCount = photos.filter((p) => p.tag === "after").length;
  const totalLimitReached = beforeCount >= 2 && afterCount >= 2;

  useEffect(() => {
    if (beforeCount === 2 && afterCount < 2) {
      setSelectedOption("after");
    }
  }, [beforeCount, afterCount]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleSubmitPhotos = async () => {
    try {
      for (const photo of photos) {
        const response = await fetch("/api/save-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: photo.src,
            tag: photo.tag,
          }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Upload failed");

        console.log("Saved:", result.fileUrl);
      }

      alert("Все фото успешно сохранены!");
      setPhotos([]);
    } catch (error) {
      console.error("Error saving photos:", error);
      alert("Ошибка при сохранении фото.");
    }
  };

  const startCamera = async () => {
    if (!streaming && typeof window !== "undefined") {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        document.getElementById("fallback-upload").click();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setStreaming(true);
          setCameraReady(true);
        }
      } catch (err) {
        console.error("Camera access error:", err);
        alert(`Failed to access camera: ${err.message}`);
        document.getElementById("fallback-upload").click();
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setStreaming(false);
    setCameraReady(false);
  };

  const handleTakePhoto = async () => {
    if (!cameraReady) {
      await startCamera();
      return;
    }
    if (!canvasRef.current || !videoRef.current || !selectedOption) return;
    if (
      (selectedOption === "before" && beforeCount >= 2) ||
      (selectedOption === "after" && afterCount >= 2)
    )
      return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const photoData = canvasRef.current.toDataURL("image/png");
    setPhotos((prev) => [...prev, { src: photoData, tag: selectedOption }]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedOption) {
      if (
        (selectedOption === "before" && beforeCount >= 2) ||
        (selectedOption === "after" && afterCount >= 2)
      )
        return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [
          ...prev,
          { src: reader.result, tag: selectedOption },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    stopCamera();
    router.back();
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min-h-fit  max-w-md w-full mx-auto bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
        {/* Top Circles + Parent Header just because i see it in the screenshot */}
        <div className="w-full flex flex-col items-center">
          {/* <div className="flex justify-center gap-4 pt-4">
          <div className="w-4 h-4 rounded-full bg-blue-600" />
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <div className="w-4 h-4 rounded-full bg-gray-300" />
        </div> */}

          <div className="w-full flex items-center bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white px-4 py-3 rounded-b-xl mt-2">
            <button
              className="w-10 h-10 flex items-center justify-center text-xl bg-blue-300 rounded-full mr-8"
              onClick={() => handleBack()}
            >
              ⬅
            </button>

            <h1 className="text-lg font-semibold">Фотофиксация</h1>
          </div>
        </div>

        {/* Video Area */}
        <div className="w-full px-4 mt-4 relative">
          <div className="w-full h-[300px] rounded-xl overflow-hidden flex justify-center items-center bg-gray-200 relative">
            <div className="aspect-video w-full">
              <video
                ref={videoRef}
                className="w-full h-auto rounded-md"
                autoPlay
                playsInline
                muted
              />
            </div>
          </div>

          <canvas ref={canvasRef} width="320" height="240" className="hidden" />
        </div>

        <input
          id="fallback-upload"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="text-center px-4 mt-4 w-full">
          <h2 className="text-md font-bold dark:text-white">
            Сделайте фото груза
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Зафиксируйте состояние вещей перед погрузкой
          </p>
        </div>

        <div className="flex gap-4 mt-4 px-4 w-full justify-center">
          <button
            className={`flex-1 py-2 rounded-md border text-sm ${
              selectedOption === "before"
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
            }`}
            onClick={() => handleOptionSelect("before")}
          >
            ДО ПОГРУЗКИ
          </button>
          <button
            className={`flex-1 py-2 rounded-md border text-sm ${
              selectedOption === "after"
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
            }`}
            onClick={() => handleOptionSelect("after")}
          >
            ПОСЛЕ ВЫГРУЗКИ
          </button>
        </div>

        {!totalLimitReached && (
          <div className="w-full px-4 mt-6">
            <button
              onClick={handleTakePhoto}
              className="w-full py-3 bg-blue-500 text-white rounded-lg text-sm font-bold shadow-md transition-all"
            >
              СДЕЛАТЬ ФОТО
            </button>
          </div>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
          Сделано {photos.length} из 4 обязательных фото
        </p>

        {totalLimitReached && (
          <div className="w-full px-4 mt-4">
            <button
              onClick={handleSubmitPhotos}
              className="w-full py-3 bg-green-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-green-700 transition-all"
            >
              ОТПРАВИТЬ ФОТО
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4 px-4 w-full justify-center">
          {photos.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <button
                onClick={() =>
                  setPhotos((prev) => prev.filter((_, i) => i !== idx))
                }
                className="mb-1 text-red-500 hover:text-red-700"
                title="Удалить фото"
              >
                <MdDelete size={18} />
              </button>
              <Image
                src={item.src}
                alt={`Фото ${idx + 1}`}
                width={80}
                height={80}
                className="rounded-md border dark:border-gray-600 object-cover"
              />
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-300">
                {item.tag === "before" ? "До" : "После"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
