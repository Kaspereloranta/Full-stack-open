import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> parent state is updated and onSubmit is called', async () => {
  const createBlog = jest.fn()

  const user = userEvent.setup()

  const { component } = render(
    <BlogForm createBlog={createBlog} />
  )

  const authorInput = component.querySelector('input[name=author]')
  const urlInput = component.querySelector('input[name=url]')
  const titleInput = component.querySelector('input[name=title]')
  const sendButton = screen.getByText('save')

  await user.type(authorInput, 'testitekijä')
  await user.type(urlInput, 'testiurli')
  await user.type(titleInput, 'testiblogi')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('testiblogi')
  expect(createBlog.mock.calls[0][1]).toBe('testitekijä')
  expect(createBlog.mock.calls[0][2]).toBe('testiurli')
})