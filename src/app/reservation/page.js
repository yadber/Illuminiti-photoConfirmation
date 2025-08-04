"use client";

import { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Reservation() {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [people, setPeople] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleNext = () => {
    if (time && day && people) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    if (fullName && email) {
      setConfirmed(true);
    } else {
      alert("Please fill in your full name and email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="relative w-full max-w-md font-sans">
        {step === 1 && (
          <>
            {/* Static Header Row */}
            <div className="grid grid-cols-3 border border-black text-center font-bold text-black dark:text-white">
              <div className="p-3 border-r border-black flex items-center justify-center gap-1">
                Time {showTimeDropdown && <span className="text-xs">▼</span>}
              </div>
              <div className="p-3 border-r border-black flex items-center justify-center gap-1">
                Day
              </div>
              <div className="p-3 flex items-center justify-center gap-1">
                People{" "}
                {showPeopleDropdown && <span className="text-xs">▼</span>}
              </div>
            </div>

            {/* Interactive Box Row */}
            <div className="grid grid-cols-3 border border-black border-t-0 text-center text-sm text-black dark:text-white relative text-xs">
              {/* Time Box */}
              <div
                ref={timeRef}
                className="p-3 border-r border-black cursor-pointer relative z-10"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              >
                {time || "Select"}
                {showTimeDropdown && (
                  <div className="absolute -top-[calc(100% - 5 px)] left-0 w-full bg-white dark:bg-gray-800 border border-black dark:border-white text-xs rounded-md shadow z-20">
                    {times.map((t) => (
                      <div
                        key={t}
                        onClick={(e) => {
                          e.stopPropagation();
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

              {/* Day Box */}
              <div
                className="p-3 border-r border-black cursor-pointer relative text-xs"
                onClick={() => dateInputRef.current?.showPicker()}
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

              {/* People Box */}
              <div
                ref={peopleRef}
                className="p-3 cursor-pointer relative z-10"
                onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
              >
                {people || "Select"}
                {showPeopleDropdown && (
                  <div className="absolute -top-[calc(100%)px] right-0 w-full bg-white dark:bg-gray-800 border border-black dark:border-white rounded-md shadow z-20">
                    {peopleOptions.map((num) => (
                      <div
                        key={num}
                        onClick={(e) => {
                          e.stopPropagation();
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

            {/* Next Button */}
            <button
              className="mt-4 w-full py-3 font-bold text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="bg-white dark:bg-gray-800 border border-black dark:border-white rounded-lg p-6">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
                Your Info
              </h2>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mb-3 p-2 border border-gray-400 rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-400 rounded dark:bg-gray-700 dark:text-white"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}

        {/* Confirmation Modal */}
        {confirmed && (
          <div className="fixed inset-0 bg-gray-200 dark:bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center border-black dark:border-white border-2">
              <h1 className="text-6xl flex justify-center text-green-600 mb-5">
                <FaCheckCircle />
              </h1>
              <h2 className="text-xl font-bold text-black dark:text-white">
                Your reservation is
              </h2>
              <h2 className="text-xl font-bold text-black dark:text-white mb-5">
                confirmed!
              </h2>
              <div className="mb-4 flex flex-col gap-2">
                <p className="border-b border-b-gray-400 dark:border-b-gray-600"></p>
                <p className="text-gray-800 dark:text-gray-300">
                  <strong>{time}</strong> | {getDayLabel()} | {people}{" "}
                  {people === "1" ? "Person" : "People"}
                </p>
                <p className="text-gray-800 dark:text-gray-300">
                  {fullName} — {email}
                </p>
                <p className="border-t border-t-gray-400 dark:border-t-gray-600"></p>
              </div>
              <button
                onClick={() => {
                  setConfirmed(false);
                  setStep(1);
                  setTime("");
                  setPeople("");
                  setDay("");
                  setFullName("");
                  setEmail("");
                }}
                className="mt-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:bg-gray-900 dark:hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
