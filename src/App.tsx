import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchUsers} from "./store/thunks/userThunk";

function App() {
    const dispatch = useAppDispatch()
    const {users, isLoading, error} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [ ])

    return (
    <div className="App">
        {isLoading ? <h1>Loading...</h1> :
        <>
            {error && <h1>{error}</h1>}
            <ul data-testid="users-list" title="Users" >
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

          </>
        }

    </div>
  );
}

export default App;
