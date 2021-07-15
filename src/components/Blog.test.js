import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'juhlat',
    author: 'bile-ukko',
    url: 'www.partyb.com',
    likes: 3
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    'juhlat'
  )

  expect(component.container).toHaveTextContent(
    'bile-ukko'
  )

})



test('renders all content', async () => {
  const blog = {
    title: 'juhlat',
    author: 'bile-ukko',
    url: 'www.partyb.com',
    likes: 3,
    user: { name: 'seppoo' }
  }


  const component = render(
    <Blog blog={blog} usersName={'seppoo'}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)


  expect(component.container).toHaveTextContent(
    'juhlat',
    'bile-ukko',
    'www.partyb.com',
    '3'
  )

})