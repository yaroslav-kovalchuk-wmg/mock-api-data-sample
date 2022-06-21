import { render, screen } from '@testing-library/react';

import App from './App';
import {Provider} from "react-redux";
import React from "react";
import {setupStore} from "./store/store";

const store = setupStore();

// @ts-ignore
global.fetch = jest.fn(() => {
    console.log('global.fetch');
    return Promise.resolve({
        json: () => Promise.resolve({id: 0, name: "John"}),
    });
});

// beforeEach(() => {
//     fetch.mockClear();
// });

// beforeAll(() => {
//     global.fetch = () => {
//         Promise.resolve({
//             json: () => Promise.resolve({id: 0, name: "John"}),
//         })
//     }
// })



it('should contain John', async () => {
    // fetch.mockResponseOnce(JSON.stringify({id: 0, name: "John"}));


    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const usersList = await screen.findByTestId('users-list');

    expect(usersList).toHaveAttribute('title', 'Users');
    expect(usersList).toContain('John');
    screen.debug()
});
