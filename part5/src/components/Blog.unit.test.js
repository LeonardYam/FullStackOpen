import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const userDetails = {
    username: 'Tester',
    id: 'testId'
}

const blog = {
    title: "Test",
    author: "Tester",
    url: "localhost.com",
    likes: 1,
    creator: {
        id: 'testId',
        username: 'Creator'
    }
}

test('check if blog is rendered properly', () => {
    render(<Blog user={userDetails} blog={blog} />)
    expect(screen.getByText(/Test/)).toBeVisible()
    expect(screen.getByText(/Tester/)).toBeVisible()
    expect(screen.getByText(/localhost.com/)).not.toBeVisible()
    expect(screen.getByText(/likes 1/)).not.toBeVisible()
})

test('check if view button works', async () => {
    render(<Blog user={userDetails} blog={blog} />)
    const viewButton = screen.getByRole('button', {name: /view/})
    const user = userEvent.setup()
    await user.click(viewButton)
    expect(screen.getByText(/localhost.com/)).toBeVisible()
    expect(screen.getByText(/likes 1/)).toBeVisible()
})

test('check if likes button works', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<Blog user={userDetails} blog={blog} updateBlog={mockHandler}/>)
    
    const viewButton = screen.getByRole('button', {name: /view/})
    await user.click(viewButton)
    const likeButton = screen.getByRole('button', {name: /like/})
    await user.click(likeButton)
    expect(mockHandler).toHaveBeenCalled()
})

