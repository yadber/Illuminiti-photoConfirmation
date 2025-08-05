"use client";

import { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Head from "next/head";

function DropdownHeader({ label, isOpen }) {
  return (
    <div className="p-3 border-r border-gray-300 flex items-center justify-center gap-1">
      {label} {isOpen && <span className="text-xs">▼</span>}
    </div>
  );
}

function TimeDayPeopleStep({
  time,
  setTime,
  day,
  setDay,
  people,
  setPeople,
  toggleDropdown,
  showTimeDropdown,
  showPeopleDropdown,
  timeRef,
  peopleRef,
  dateInputRef,
  handleDayClick,
  times,
  peopleOptions,
  todayStr,
  tomorrowStr,
  handleNext,
}) {
  const getDayLabel = () => {
    if (day === todayStr) return "Сегодня";
    if (day === tomorrowStr) return "Завтра";
    return day;
  };

  return (
    <>
      <div className="grid grid-cols-3 border border-gray-300 text-center font-bold text-gray-700">
        <DropdownHeader label="Время" isOpen={showTimeDropdown} />
        <DropdownHeader label="День" />
        <DropdownHeader label="Люди" isOpen={showPeopleDropdown} />
      </div>

      <div className="grid grid-cols-3 border border-gray-300 border-t-0 text-center text-gray-700 relative text-sm">
        <div
          ref={timeRef}
          className="p-3 border-r border-gray-300 cursor-pointer z-10 relative"
          onClick={() => toggleDropdown("time")}
        >
          <span className="block truncate">{time || "Выбрать"}</span>
          {showTimeDropdown && (
            <div className="absolute top-full mt-1 left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 text-sm rounded-md shadow z-20">
              {times.map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setTime(t);
                    toggleDropdown(null);
                  }}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${
                    time === t ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="p-3 border-r border-gray-300 cursor-pointer relative"
          onClick={handleDayClick}
        >
          <span className="block truncate">{getDayLabel() || "Выбрать"}</span>
          <input
            type="date"
            ref={dateInputRef}
            min={todayStr}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              setDay(e.target.value);
              toggleDropdown(null);
            }}
          />
        </div>

        <div
          ref={peopleRef}
          className="p-3 cursor-pointer z-10 relative"
          onClick={() => toggleDropdown("people")}
        >
          <span className="block truncate">{people || "Выбрать"}</span>
          {showPeopleDropdown && (
            <div className="absolute top-full mt-1 right-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow z-20">
              {peopleOptions.map((num) => (
                <div
                  key={num}
                  onClick={() => {
                    setPeople(String(num));
                    toggleDropdown(null);
                  }}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${
                    people === String(num) ? "bg-gray-100 font-medium" : ""
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
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-md font-semibold hover:opacity-90"
      >
        Далее
      </button>
    </>
  );
}

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
    } else {
      setShowTimeDropdown(false);
      setShowPeopleDropdown(false);
    }
  };

  const handleDayClick = () => {
    toggleDropdown(null);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !timeRef.current?.contains(e.target) &&
        !peopleRef.current?.contains(e.target)
      ) {
        toggleDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="relative w-full max-w-md font-sans">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold">
          Забронировать поездку
        </div>
        <div className="px-6 py-6 bg-white rounded-b-lg shadow-md">
          {step === 1 && (
            <TimeDayPeopleStep
              time={time}
              setTime={setTime}
              day={day}
              setDay={setDay}
              people={people}
              setPeople={setPeople}
              toggleDropdown={toggleDropdown}
              showTimeDropdown={showTimeDropdown}
              showPeopleDropdown={showPeopleDropdown}
              timeRef={timeRef}
              peopleRef={peopleRef}
              dateInputRef={dateInputRef}
              handleDayClick={handleDayClick}
              times={times}
              peopleOptions={peopleOptions}
              todayStr={todayStr}
              tomorrowStr={tomorrowStr}
              handleNext={handleNext}
            />
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ФИО"
                className="mt-4 w-full py-2 px-4 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mt-3 w-full py-2 px-4 rounded border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 w-1/2 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md font-semibold"
                >
                  Назад
                </button>
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-1/2 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md font-semibold hover:opacity-90"
                >
                  Забронировать
                </button>
              </div>
            </>
          )}
        </div>

        {/* ✅ Confirm Booking Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-fit bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold">
                Подтвердите бронирование
              </div>
              <div className="px-6 py-6 text-center">
                <div className="mb-4 text-gray-600 text-sm">
                  <p>
                    <strong>Время:</strong> {time}
                  </p>
                  <p>
                    <strong>День:</strong> {day}
                  </p>
                  <p>
                    <strong>Люди:</strong> {people}
                  </p>
                  <p>
                    <strong>Имя:</strong> {fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setShowConfirmModal(false);
                      setStep(2);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmModal(false);
                      setShowFinalMessage(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Thank You Modal */}
        {showFinalMessage && (
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-fit bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-3 text-lg font-semibold">
                Спасибо!
              </div>
              <div className="px-6 py-6 text-center">
                <h1 className="text-6xl flex justify-center text-green-600 mb-5">
                  <FaCheckCircle />
                </h1>
                <h2 className="text-lg font-medium text-gray-700">
                  Ваше бронирование подтверждено.
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
