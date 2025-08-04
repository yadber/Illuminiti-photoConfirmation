"use client";

import { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Reservation() {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [people, setPeople] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [step, setStep] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const timeRef = useRef();
  const peopleRef = useRef();
  const dateInputRef = useRef();

  const times = ["15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
  const peopleOptions = Array.from({ length: 9 }, (_, i) => i + 1);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const toggleDropdown = (type) => {
    if (type === "time") {
      setShowTimeDropdown(!showTimeDropdown);
      setShowPeopleDropdown(false);
    } else if (type === "people") {
      setShowPeopleDropdown(!showPeopleDropdown);
      setShowTimeDropdown(false);
    }
  };

  const handleDayClick = () => {
    setShowTimeDropdown(false);
    setShowPeopleDropdown(false);
    dateInputRef.current?.showPicker();
  };

  const handleNext = () => {
    if (time && day && people) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (fullName && email) {
      setShowConfirmModal(true);
    }
  };

  const getDayLabel = () => {
    if (day === todayStr) return "Today";
    if (day === tomorrowStr) return "Tomorrow";
    return day;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !timeRef.current?.contains(e.target) &&
        !peopleRef.current?.contains(e.target)
      ) {
        setShowTimeDropdown(false);
        setShowPeopleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="relative w-full max-w-md font-sans">
        {step === 1 && (
          <>
            <div className="grid grid-cols-3 border border-black text-center font-bold text-black dark:text-white">
              <div className="p-3 border-r border-black flex items-center justify-center gap-1">
                Time {showTimeDropdown && <span className="text-xs">▼</span>}
              </div>
              <div className="p-3 border-r border-black">Day</div>
              <div className="p-3 flex items-center justify-center gap-1">
                People{" "}
                {showPeopleDropdown && <span className="text-xs">▼</span>}
              </div>
            </div>

            <div className="grid grid-cols-3 border border-black border-t-0 text-center text-sm text-black dark:text-white relative text-xs">
              <div
                ref={timeRef}
                className="p-3 border-r border-black cursor-pointer z-10"
                onClick={() => toggleDropdown("time")}
              >
                {time || "Select"}
                {showTimeDropdown && (
                  <div className="absolute top-[-100%] left-0 w-1/3 bg-white dark:bg-gray-800 border border-black dark:border-white text-xs rounded-md shadow z-20">
                    {times.map((t) => (
                      <div
                        key={t}
                        onClick={() => {
                          setTime(t);
                          setShowTimeDropdown(false);
                        }}
                        className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          time === t
                            ? "bg-gray-100 dark:bg-gray-700 font-medium"
                            : ""
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="p-3 border-r border-black cursor-pointer relative"
                onClick={handleDayClick}
              >
                {getDayLabel() || "Select"}
                <input
                  type="date"
                  ref={dateInputRef}
                  min={todayStr}
                  className="absolute opacity-0 pointer-events-none"
                  onChange={(e) => setDay(e.target.value)}
                />
              </div>

              <div
                ref={peopleRef}
                className="p-3 cursor-pointer z-10"
                onClick={() => toggleDropdown("people")}
              >
                {people || "Select"}
                {showPeopleDropdown && (
                  <div className="absolute top-[-100%] right-0 w-1/3 bg-white dark:bg-gray-800 border border-black dark:border-white rounded-md shadow z-20">
                    {peopleOptions.map((num) => (
                      <div
                        key={num}
                        onClick={() => {
                          setPeople(String(num));
                          setShowPeopleDropdown(false);
                        }}
                        className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                          people === String(num)
                            ? "bg-gray-100 dark:bg-gray-700 font-medium"
                            : ""
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="mt-4 w-full py-3 font-bold text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-md"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="mt-4 w-full py-2 px-4 rounded border dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-2 w-full py-2 px-4 rounded border dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setStep(1)}
                className="mt-4 w-1/2 py-3 font-bold text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-300 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="mt-4 w-1/2 py-3 font-bold text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-md"
              >
                Reserve
              </button>
            </div>
          </>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 bg-gray-200 dark:bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center border-black dark:border-white border-2">
              <h2 className="text-xl font-bold text-black dark:text-white mb-5">
                Confirm your reservation
              </h2>
              <div className="mb-4 text-gray-800 dark:text-gray-300 text-sm">
                <p>
                  <strong>Time:</strong> {time}
                </p>
                <p>
                  <strong>Day:</strong> {getDayLabel()}
                </p>
                <p>
                  <strong>People:</strong> {people}
                </p>
                <p>
                  <strong>Name:</strong> {fullName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setStep(1);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setShowFinalMessage(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {showFinalMessage && (
          <div className="fixed inset-0 bg-gray-200 dark:bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center border-black dark:border-white border-2">
              <h1 className="text-6xl flex justify-center text-green-600 mb-5">
                <FaCheckCircle />
              </h1>
              <h2 className="text-xl font-bold text-black dark:text-white">
                Thank you!
              </h2>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                Your reservation is confirmed.
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
