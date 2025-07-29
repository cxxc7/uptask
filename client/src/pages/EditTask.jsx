import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask, fetchTasks } from '../redux/slices/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
  });

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks(''));
    }
    const task = tasks.find((t) => t._id === id);
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        status: task.status,
        priority: task.priority,
      });
    }
  }, [id, tasks, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateTask({ id, data: form }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Task updated!');
      navigate('/');
    } else {
      toast.error(res.payload || 'Failed to update task');
    }
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteTask(id));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Task deleted!');
      navigate('/');
    } else {
      toast.error(res.payload || 'Failed to delete task');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center"
      >
        <h2 className="text-3xl font-extrabold mb-4 text-center text-indigo-700 dark:text-indigo-300 tracking-tight">
          ✏️ Edit Task
        </h2>

        {/* Title */}
        <div className="mb-5 w-full flex flex-col items-center">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />
        </div>

        {/* Description */}
        <div className="mb-5 w-full flex flex-col items-center">
          <label htmlFor="description" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Optional details..."
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center resize-none"
          ></textarea>
        </div>

        {/* Fields: Priority / Due Date / Status */}
        <div className="flex gap-2 mb-6 w-full justify-between">
          <div className="flex flex-col w-1/3 items-center">
            <label htmlFor="priority" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col w-1/3 items-center">
            <label htmlFor="dueDate" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
          </div>

          <div className="flex flex-col w-1/3 items-center">
            <label htmlFor="status" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold shadow-lg transition-transform transform hover:scale-105 disabled:opacity-60"
          >
            {loading ? 'Updating...' : 'Update Task'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-full px-6 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold shadow-lg transition-transform transform hover:scale-105 disabled:opacity-60"
          >
            Delete Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
