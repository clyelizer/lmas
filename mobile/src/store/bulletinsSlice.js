import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import * as FileSystem from 'expo-file-system';

export const generateBulletin = createAsyncThunk(
  'bulletins/generateBulletin',
  async ({ studentId, period }) => {
    const response = await api.get(`/bulletins/${studentId}/${period}`, {
      responseType: 'arraybuffer',
    });
    const fileUri = `${FileSystem.documentDirectory}bulletin_${studentId}_${period}.pdf`;
    await FileSystem.writeAsStringAsync(fileUri, Buffer.from(response.data, 'binary').toString('base64'), {
      encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri;
  }
);

const bulletinsSlice = createSlice({
  name: 'bulletins',
  initialState: {
    bulletins: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateBulletin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateBulletin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bulletins.push(action.payload);
        AsyncStorage.setItem('bulletins', JSON.stringify(state.bulletins));
      })
      .addCase(generateBulletin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bulletinsSlice.reducer;
