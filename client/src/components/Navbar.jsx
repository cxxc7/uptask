import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/uiSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">Uptask</Link>
      <div className="flex items-center gap-4">
        <button
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <>
            {location.pathname !== '/create' && (
              <Link to="/create" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold shadow-xl hover:bg-blue-700 hover:scale-105 transform transition disabled:opacity-50">+ New Task</Link>
            )}
            <button onClick={() => dispatch(logout())} className="px-6 py-3 rounded-lg bg-red-500 text-white text-lg font-semibold shadow-xl hover:bg-red-600 hover:scale-105 transform transition disabled:opacity-50">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold shadow-xl hover:bg-blue-700 hover:scale-105 transform transition disabled:opacity-50">Login</Link>
            <Link to="/register" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold shadow-xl hover:bg-blue-700 hover:scale-105 transform transition disabled:opacity-50">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
