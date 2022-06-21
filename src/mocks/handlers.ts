import { rest } from 'msw'

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        // console.log('req', req)
        return res(
            ctx.status(200),
            ctx.json([{
                id: 2,
                name: 'John',
            }]),
        )
    }),
]