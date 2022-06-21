import {IUser} from "../../models/IUser";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk<IUser[]>(
    'user/fetchAll',
    // async (_, thunkAPI) => {
    () => {
       return  fUsers()
        // try {
        //     const response = await fetch('https://jsonplaceholder.typicode.com/users')
        //     console.log('response',response)
        //     return await response.json();
        // } catch (e) {
        //     return thunkAPI.rejectWithValue("Fail to download users")
        // }
    }
)

async function fUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        console.log('response',response)
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

export { fUsers };