import {IUser} from "../../models/IUser";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk<IUser[]>(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            return await response.json();
        } catch (e) {
            return thunkAPI.rejectWithValue("Fail to download users")
        }
    }
)
