import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const TaskForm = ({ tableChange, taskIdCounter, setTaskIdCounter }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    status: 'Todo',
    employeeEmail: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const newTask = {
        id: taskIdCounter,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        assignedTo: formData.employeeEmail.split('@')[0], 
        status: formData.status,
      };

      
      tableChange(newTask);
      setTaskIdCounter(taskIdCounter + 1);

      
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: 'Medium',
        status: 'Todo',
        employeeEmail: '',
      });

      close();
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end items-center px-4 py-4">
      <Popup
        trigger={
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-150">
            + Create Task
          </button>
        }
        modal
        nested
      >
        {close => (
          <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[500px] max-h-[90vh] overflow-auto shadow-xl relative">
              <button
                onClick={close}
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>

              <h3 className="text-xl font-semibold mb-4 text-center">Create New Task</h3>

              <form className="space-y-4" onSubmit={(e) => handleSubmit(e, close)}>
                <div>
                  <label className="block font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    rows="3"
                    required
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <div className="w-1/2">
                    <label className="block font-medium">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  >
                    <option>Todo</option>
                    <option>In Progress</option>
                    <option>In Review</option>
                    <option>Complete</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Employee Email</label>
                  <input
                    type="email"
                    name="employeeEmail"
                    value={formData.employeeEmail}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default TaskForm;
