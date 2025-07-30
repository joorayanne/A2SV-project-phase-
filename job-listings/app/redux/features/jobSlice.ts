import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await fetch('https://akil-backend.onrender.com/opportunities/search');
  const { data } = await response.json();
  return data;
});

interface JobState {
  jobs: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; 
}

const initialState: JobState = {
  jobs: [],
  status: 'idle',
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default jobSlice.reducer;
