// redux/profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Profile {
  uid: string;            // add uid so we can update doc later
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
  phone: string;
}

interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (uid: string) => {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return { uid, ...(snap.data() as Omit<Profile, 'uid'>) };
    }
    throw new Error('Profile not found');
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileLocally(state, action) {
      state.data = { ...state.data, ...action.payload } as Profile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch profile';
      });
  },
});

export const { updateProfileLocally } = profileSlice.actions;

export default profileSlice.reducer;
