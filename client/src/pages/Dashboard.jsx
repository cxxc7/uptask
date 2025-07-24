import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/slices/taskSlice';
import { setFilter } from '../redux/slices/uiSlice';
import { Link } from 'react-router-dom';

const statusTabs = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
];

const priorityColors = {
  low: 'bg-green-200 text-green-800',
  medium: 'bg-yellow-200 text-yellow-800',
  high: 'bg-red-200 text-red-800',
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { filter } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchTasks(filter === 'all' ? '' : filter));
  }, [dispatch, filter]);

  let content;
  if (loading) {
    content = <div className="text-center">Loading...</div>;
  } else if (error) {
    content = <div className="text-center text-red-500">{error}</div>;
  } else {
    content = (
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks found.</div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold mb-2">{task.title}</h3>
                <p className="mb-1 text-gray-700 dark:text-gray-300">{task.description}</p>
                <div className="flex gap-2 text-sm mb-1">
                  <span className={`px-2 py-1 rounded ${priorityColors[task.priority]}`}>{task.priority}</span>
                  <span className={`px-2 py-1 rounded ${task.status === 'completed' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 dark:bg-gray-700'}`}>{task.status}</span>
                  {task.dueDate && <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                                    <Link
                                      to={`/edit/${task._id}`}
                                      className="px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-900 font-semibold shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-150"
                                      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                                    >
                                      Edit
                                    </Link>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex gap-2 mb-6">
        {statusTabs.map(tab => (
                        <button
                          key={tab.value}
                          className={`px-5 py-2 rounded-md border font-semibold shadow-sm transition-all duration-150
                            ${filter === tab.value
                              ? 'bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100'
                              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700'}
                          `}
                          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                          onClick={() => dispatch(setFilter(tab.value))}
                        >
                          {tab.label}
                        </button>
        ))}
      </div>
      {content}
    </div>
  );
};

export default Dashboard;
