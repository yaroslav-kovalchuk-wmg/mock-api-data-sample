import { render, screen } from '@testing-library/react';
import { fUsers } from './store/thunks/userThunk';

import App from './App';
import {Provider} from "react-redux";
import React from "react";
import {setupStore} from "./store/store";

const store = setupStore();

it('should contain John', async () => {

    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const usersList = await screen.findByTestId('users-list');
    const element = await screen.findByText('John');

    expect(usersList).toHaveAttribute('title', 'Users');
    expect(element).toBeInTheDocument();
    screen.debug()
});
