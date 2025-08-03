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

  const timeRef = useRef();
  const peopleRef = useRef();
  const dateInputRef = useRef();

  const times = ["15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
  const peopleOptions = Array.from({ length: 9 }, (_, i) => i + 1);
  const todayDateObj = new Date();
  const tomorrowDateObj = new Date();
  tomorrowDateObj.setDate(todayDateObj.getDate() + 1);
  const todayStr = todayDateObj.toISOString().split("T")[0];
  const tomorrowStr = tomorrowDateObj.toISOString().split("T")[0];

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

  const confirmReservation = () => {
    if (time && day && people) {
      setConfirmed(true);
    }
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

  const getDayLabel = () => {
    if (day === todayStr) return "Today";
    if (day === tomorrowStr) return "Tomorrow";
    return day;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="relative w-full max-w-md font-sans">
        <div className="grid grid-cols-3 border border-black rounded-t-lg text-center font-bold">
          <div
            ref={timeRef}
            className="p-3 border-r border-black cursor-pointer relative"
            onClick={() => toggleDropdown("time")}
          >
            Time
            {showTimeDropdown && (
              <div className="absolute z-20 top-full left-0 w-full bg-white border border-black rounded-b-md shadow">
                {times.map((t) => (
                  <div
                    key={t}
                    onClick={() => {
                      setTime(t);
                      setShowTimeDropdown(false);
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
            className="p-3 border-r border-black cursor-pointer relative"
            onClick={handleDayClick}
          >
            Day
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
            className="p-3 cursor-pointer relative"
            onClick={() => toggleDropdown("people")}
          >
            People
            {showPeopleDropdown && (
              <div className="absolute z-20 top-full right-0 w-full bg-white border border-black rounded-b-md shadow">
                {peopleOptions.map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setPeople(String(num));
                      setShowPeopleDropdown(false);
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

        {(time || day || people) && (
          <div className="grid grid-cols-3 border border-t-0 border-black text-center text-lg font-medium">
            <div className="p-3 border-r border-black">{time}</div>
            <div className="p-3 border-r border-black">{getDayLabel()}</div>
            <div className="p-3">{people}</div>
          </div>
        )}

        {
          <button
            className="mt-4 w-full py-3 font-bold text-white bg-black hover:bg-gray-900 rounded-md"
            onClick={confirmReservation}
          >
            Reserve
          </button>
        }
        {confirmed && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center border-black border-2 ">
              <h1 className="text-6xl flex justify-center text-green-500 mb-5">
                <FaCheckCircle />
              </h1>
              <h2 className="text-xl font-bold text-black ">
                Your reservation is
              </h2>
              <h2 className="text-xl font-bold text-black mb-5">confirmed!</h2>
              <p className="text-gray-800 mb-4">
                {time} | {getDayLabel()} | {people}{" "}
                {people === "1" ? "Person" : "People"}
              </p>
              <button
                onClick={() => setConfirmed(false)}
                className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
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
