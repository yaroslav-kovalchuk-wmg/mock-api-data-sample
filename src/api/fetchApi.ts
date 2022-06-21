import {IUser} from "../models/IUser";

// export const fetchUsers = async (thunkAPI) => {
//     try {
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         return response.data;
//     } catch (e) {
//         return thunkAPI.rejectWithValue("Fail to download users")
//     }
// }