import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


const Leave_form = ({ leaveFormData, setLeaveFormData, tableUpdate }) => {
  const handleChange = e => {
    const { name, value } = e.target;
    setLeaveFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center mt-10">
      <Popup
        trigger={
          <button  className="m-[75px] px-4 py-2 bg-blue-600 text-white static rounded-lg hover:bg-blue-700">
            Apply for Leave
          </button>
        }
        modal
        nesteds
        className="my-popup"
        contentStyle={{ padding: 0 }}
      >
        {close => (
          <div className="max-w-md w-full rounded-2xl shadow-md relative bg-white overflow-hidden">
            <button
              onClick={close}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✖
            </button>

            <form
              onSubmit={e => {
                e.preventDefault();
                tableUpdate(leaveFormData);
                close();
              }}
              className="flex flex-col h-full p-6"
            >
              <div className="space-y-5 grow">
                <h2 className="text-xl font-semibold text-gray-800 text-center m-0">
                  Apply for Leave
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    placeholder="Your Name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select
                    name="leaveType"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Sick</option>
                    <option>Casual</option>
                    <option>Maternity</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      name="fromDate"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      name="toDate"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    placeholder="Reason for leave"
                    rows="3"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                  Apply Leave
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Leave_form;
