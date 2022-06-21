import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/userThunk";
import {addCasesWithDefaults} from "../utils/addCasesWithDefaults";

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    // extraReducers: {
        // [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
        //     state.isLoading = false;
        //     state.error = ''
        //     state.users = action.payload;
        // },
        // [fetchUsers.pending.type]: (state) => {
        //     state.isLoading = true;
        // },
        // [fetchUsers.rejected.type]: (state,  action: PayloadAction<string>) => {
        //     state.isLoading = false;
        //     state.error = action.payload
        // },
    // },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = ''
            state.users = action.payload;
        });

        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchUsers.rejected, (state,  action) => {
            state.isLoading = false;
            state.error = action.payload as string
        });

        // addCasesWithDefaults(builder, fetchUsers, 'isLoading', (state, { payload }) => {
        //     state.users = payload;
        // });
    }
})

export default userSlice.reducer;
