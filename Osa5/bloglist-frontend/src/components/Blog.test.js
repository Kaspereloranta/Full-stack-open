import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog compontent tests',() => {
  let blog = {
    title:'Testikäyttöön luotu Blogi',
    author:'Kasper Eloranta',
    url:'https://testiblogi.com/',
    likes:9,
    user: { username:'KasperE' }
  }


  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('title and author are rendered', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(component.container).toHaveTextContent(
      'Testikäyttöön luotu Blogi - Kasper Eloranta'
    )
  })

  test('url, number of likes and username are displayed after clicking view ', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://testiblogi.com/'
    )

    expect(component.container).toHaveTextContent(
      '9'
    )

    expect(component.container).toHaveTextContent(
      'KasperE'
    )
  })
})