import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
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
    <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto flex flex-col items-center border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-300 tracking-tight flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-lg">✏️</span>
          Edit Task
        </h2>

        {/* Title */}
        <div className="mb-6 w-full flex flex-col items-start">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg self-center">
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
            className="w-180 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
          />
        </div>

        {/* Description */}
        <div className="mb-6 w-full flex flex-col items-start">
          <label htmlFor="description" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg self-center">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Optional details..."
            value={form.description}
            onChange={handleChange}
            className="w-80 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mx-auto"
          ></textarea>
        </div>

        {/* Fields: Priority / Due Date / Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 w-full">
          <div className="flex flex-col items-center">
            <label htmlFor="priority" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-64 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="dueDate" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              className="w-64 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="status" className="mb-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-64 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4 w-full mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xl font-bold shadow-lg transition-transform transform hover:scale-105 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? 'Updating...' : 'Update Task'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-1/2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xl font-bold shadow-lg transition-transform transform hover:scale-105 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Trash2 className="h-6 w-6 text-red-400" />
            <span>Delete</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
