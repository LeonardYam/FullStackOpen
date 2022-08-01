import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('check if blog form works', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    const inputs = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test.url'
    }
    render(<BlogForm createBlog={createBlog} />)
    const createButton = screen.getByRole('button', {name: /create/})
    
    const title = screen.getByRole('textbox', {name: /title/})
    const author = screen.getByRole('textbox', {name: /author/})
    const url = screen.getByRole('textbox', {name: /url/})

    await user.type(title, inputs.title)
    await user.type(author, inputs.author)
    await user.type(url, inputs.url)
    await user.click(createButton)
    
    expect(createBlog.mock.calls[0][0]).toEqual(inputs)
})