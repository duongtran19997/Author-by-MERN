import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from "./authService";

const token = JSON.parse(localStorage.getItem('token'))
const initialState = {
    user: null,
    isPending: true,
    isError: false,
    isAuthenticated: false,
    isLoading: false,
    message: '',
    token: token ? token : null
}
//register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (err) {
        const message = err.message;
        return thunkAPI.rejectWithValue(message)
    }
})
//login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)

    } catch (err) {
        const message = err.message;
        return thunkAPI.rejectWithValue(message)
    }
})

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
    return await authService.loadUser()
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})


const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            reset: (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isError = false;
                state.message = '';
            }
        },
        extraReducers: (builder) => {
            builder.addCase(register.pending, (state) => {
                state.isLoading = true;
            })
                .addCase(register.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload
                })
                .addCase(register.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null
                })
                .addCase(login.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload;
                    state.token = action.payload.token;
                    state.isPending = false;
                })
                .addCase(login.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null;
                    state.isPending = false;
                })
                .addCase(logout.fulfilled, (state, action) => {
                    state.user = null;
                    state.token = null;
                })
                .addCase(loadUser.fulfilled, (state, action) => {
                    state.isAuthenticated = true;
                    state.isPending = false;
                    state.user = action.payload;
                })
                .addCase(loadUser.rejected, (state, action) => {
                    state.isAuthenticated = false;
                    state.isError = true;
                    state.isPending = false;
                    state.user = null;
                    state.token = null;
                })
        }
    }
)

export const {reset} = authSlice.actions
export default authSlice.reducer