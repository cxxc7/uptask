import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (status, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const url = status ? `/api/tasks?status=${status}` : '/api/tasks';
    const res = await api.get(url, {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async (data, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const res = await api.post('/api/tasks', data, {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const res = await api.put(`/api/tasks/${id}`, data, {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    await api.delete(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
