
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.tasks);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createTask(form));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Task created!');
      navigate('/');
    } else {
      toast.error(res.payload || 'Failed to create task');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto flex flex-col items-center border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-300 tracking-tight flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-lg">📝</span>
          Create Task
        </h2>

        {/* Title */}
        <div className="mb-6 w-full flex flex-col items-start">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-2xl self-center">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-96 px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
          />
        </div>

        {/* Description */}
        <div className="mb-6 w-full flex flex-col items-start">
          <label htmlFor="description" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-2xl self-center">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Optional details..."
            value={form.description}
            onChange={handleChange}
            className="w-80 px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mx-auto"
          ></textarea>
        </div>

        {/* Fields: Priority / Due Date / Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 w-full">
          <div className="flex flex-col items-center">
            <label htmlFor="priority" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-2xl">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-64 px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="dueDate" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-2xl">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className="w-64 px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="status" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-2xl">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-64 px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center w-full mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-56 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-2xl font-bold shadow-lg transition-transform transform hover:scale-105 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

