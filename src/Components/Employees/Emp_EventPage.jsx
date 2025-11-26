
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import EmployeeNavbar from './Emp_Navbar';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const festivals = [
  {
    id: 'f1',
    title: "New Year's Day",
    date: '2025-01-01',
    description: 'Start of the new year - compulsory holiday.',
  },
  {
    id: 'f2',
    title: 'Republic Day',
    date: '2025-01-26',
    description: 'National holiday - Republic Day celebrations.',
  },
  {
    id: 'f3',
    title: 'Independence Day',
    date: '2025-08-15',
    description: 'National holiday - Independence Day.',
  },
  {
    id: 'f4',
    title: 'Christmas Day',
    date: '2025-12-25',
    description: 'Christmas celebration - compulsory holiday.',
  },
];

function Emp_EventPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sample Event",
      date: "2025-07-12",
      time: "10:00 AM",
      description: "Event description for July 12, 2025",
    },
    {
      id: 2,
      title: "Sample Event",
      date: "2025-08-20",
      time: "2:00 PM",
      description: "Event description for August 20, 2025",
    },
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0));
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
    setSelectedDate(null);
  };

  const monthYear = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      ...formData,
    };
    setEvents((prev) => [...prev, newEvent]);
    setFormData({ title: '', date: '', time: '', description: '' });
    setShowFormModal(false);
  };

  const formatDate = (day) => {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const today = new Date().toISOString().split('T')[0];

  const eventDates = events.map((e) => e.date);
  const festivalDates = festivals.map((f) => f.date);

  const selectedDateStr = selectedDate ? formatDate(selectedDate) : null;
  const eventsOnSelectedDate = events.filter((e) => e.date === selectedDateStr);
  const festivalsOnSelectedDate = festivals.filter((f) => f.date === selectedDateStr);

  return (
    <>
      <EmployeeNavbar
        user={{ name: "Mini Shrivstava", email: "m.shri@example.com" }}
        notifications={["Meeting at 3PM", "System maintenance on Friday"]}
      />

      <div className="min-h-screen bg-[#f3f7fc] flex justify-center items-start p-8 relative">
     
        {/* <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-24 left-6 p-2 rounded-full hover:bg-gray-200 transition z-10"
        >
          <FaArrowLeft className="text-gray-700" size={20} />
        </button> */}

        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl p-6 flex flex-col md:flex-row gap-6 mt-16">
       
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-700">Events</h2>
              <button
                onClick={() => setShowFormModal(true)}
                className="bg-[#318CE7] text-white px-4 py-1 rounded shadow hover:bg-blue-600 transition"
              >
                Add Event
              </button>
            </div>

            {events.map((event) => (
              <div key={event.id} className="rounded-xl overflow-hidden bg-white shadow border">
                <div className="bg-[#318CE7] text-white px-4 py-2 text-lg font-semibold">
                  {event.title}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

         
          <div className="w-full md:w-80 bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <FaChevronLeft
                className="text-gray-600 cursor-pointer hover:text-[#318CE7]"
                onClick={goToPrevMonth}
              />
              <h2 className="text-lg font-bold text-gray-800">{monthYear}</h2>
              <FaChevronRight
                className="text-gray-600 cursor-pointer hover:text-[#318CE7]"
                onClick={goToNextMonth}
              />
            </div>

            <div className="grid grid-cols-7 text-center text-gray-500 font-semibold text-sm mb-2">
              {days.map((d, idx) => (
                <div key={idx}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center text-gray-700 text-sm gap-y-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}
              {daysArray.map((day) => {
                const dateStr = formatDate(day);
                const isToday = dateStr === today;
                const hasEvent = eventDates.includes(dateStr);
                const isFestival = festivalDates.includes(dateStr);

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`relative transition-all duration-150 py-1 w-10 h-10 mx-auto flex items-center justify-center rounded-full cursor-pointer
                      ${selectedDate === day
                        ? 'bg-[#318CE7] text-white font-bold scale-105 shadow-md'
                        : isToday
                        ? 'border border-[#318CE7] font-semibold text-[#318CE7]'
                        : 'hover:bg-gray-200'}
                    `}
                  >
                    {day}
                    {hasEvent && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    {isFestival && (
                      <span className="absolute top-0 left-0 w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                );
              })}
            </div>

          
            {selectedDate && (
              <div className="mt-6 text-sm text-gray-700">
                <p className="font-semibold mb-1">Details for {monthYear} {selectedDate}</p>

                {festivalsOnSelectedDate.length > 0 && (
                  <div className="mb-3">
                    <p className="font-semibold text-green-700">Festivals / Holidays:</p>
                    {festivalsOnSelectedDate.map((fest) => (
                      <div key={fest.id} className="border-l-4 border-green-500 pl-2 my-1">
                        <p className="font-semibold">{fest.title}</p>
                        <p className="text-sm">{fest.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {eventsOnSelectedDate.length > 0 && (
                  <div>
                    <p className="font-semibold text-red-700">Events:</p>
                    {eventsOnSelectedDate.map((ev) => (
                      <div key={ev.id} className="border-l-4 border-red-500 pl-2 my-1">
                        <p className="font-semibold">{ev.title} ({ev.time})</p>
                        <p className="text-sm">{ev.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {festivalsOnSelectedDate.length === 0 && eventsOnSelectedDate.length === 0 && (
                  <p>No events or festivals on this date.</p>
                )}
              </div>
            )}
          </div>
        </div>

 
        {showFormModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-[#318CE7] mb-4">Add New Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Event Name</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    min="2025-01-01"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-[#318CE7] text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Emp_EventPage;
