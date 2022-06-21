import { render, screen } from '@testing-library/react';
import { fUsers } from './store/thunks/userThunk';

import App from './App';
import {Provider} from "react-redux";
import React from "react";
import {setupStore} from "./store/store";

const store = setupStore();

// @ts-ignore
// global.fetch = jest.fn(() => {
//     console.log('global.fetch');
//     return Promise.resolve({
//         json: () => Promise.resolve({id: 0, name: "John"}),
//     });
// });

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

// jest.mock('./store/thunks/userThunk')

beforeAll(() => jest.spyOn(window, 'fetch'))

it('should contain John', async () => {
    // fetch.mockResponseOnce(JSON.stringify({id: 0, name: "John"}));
    // fUsers.mockResolvedValueOnce(() => ({id: 0, name: "John"}))

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([{id: 0, name: "John"}]),
    })

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
