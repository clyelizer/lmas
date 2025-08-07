import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { queueAction } from '../services/syncService';

export const fetchGrades = createAsyncThunk('grades/fetchGrades', async ({ page = 1 }) => {
  const response = await api.get(`/grades?page=${page}`);
  return response.data;
});

export const addGrade = createAsyncThunk('grades/addGrade', async (grade, { rejectWithValue }) => {
  try {
    const response = await api.post('/grades', grade);
    return response.data.grade;
  } catch (error) {
    // Si hors ligne, mettre en file d'attente et faire une mise à jour optimiste
    if (!error.response) {
      const offlineGrade = { ...grade, id: `offline_${Date.now()}`, isPendingSync: true };
      queueAction({ method: 'post', url: '/grades', data: grade });
      return offlineGrade;
    }
    return rejectWithValue(error.response.data);
  }
});

const gradesSlice = createSlice({
  name: 'grades',
  initialState: {
    grades: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.grades = action.payload;
        AsyncStorage.setItem('grades', JSON.stringify(action.payload));
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addGrade.fulfilled, (state, action) => {
        // Si la note a un ID temporaire, la remplacer par la version synchronisée
        const existingIndex = state.grades.findIndex(g => g.id === action.payload.id && g.isPendingSync);
        if (existingIndex !== -1) {
            state.grades[existingIndex] = action.payload;
        } else {
            state.grades.push(action.payload);
        }
        AsyncStorage.setItem('grades', JSON.stringify(state.grades));
      });
  },
});

export default gradesSlice.reducer;
