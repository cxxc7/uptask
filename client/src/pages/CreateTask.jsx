import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTask = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.tasks);

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
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900 mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center"
        aria-label="Create New Task Form"
      >
        <h2 className="text-3xl font-extrabold mb-4 text-center text-indigo-700 dark:text-indigo-300 tracking-tight">
          📝 Create a New Task
        </h2>

        {/* Title */}
        <div className="mb-5 w-full max-w-xl mx-auto flex flex-col items-center">
          <label htmlFor="title" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">
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
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            style={{ height: '2.4rem', maxWidth: '500px' }}
          />
        </div>

        {/* Description */}
        <div className="mb-5 w-full max-w-xl mx-auto flex flex-col items-center">
          <label htmlFor="description" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Optional details..."
            value={form.description}
            onChange={handleChange}
            className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            style={{ height: '4rem', resize: 'vertical', maxWidth: '500px' }}
          ></textarea>
        </div>

        {/* Priority, Due Date & Status (inline) */}
        <div className="flex gap-1 mb-8 w-full max-w-xl mx-auto justify-center items-end">
          <div className="flex flex-col items-center w-1/3">
            <label htmlFor="priority" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              style={{ height: '2.4rem', maxWidth: '200px' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <label htmlFor="dueDate" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              style={{ height: '2.4rem', maxWidth: '200px' }}
            />
          </div>
          <div className="flex flex-col items-center w-1/3">
            <label htmlFor="status" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              style={{ height: '2.4rem', maxWidth: '200px' }}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-100 px-10 py-7 mt-8 rounded-full border-1 border-white bg-green-600 text-white text-2xl font-extrabold shadow-2xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-transform transform hover:scale-[1.05] disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
