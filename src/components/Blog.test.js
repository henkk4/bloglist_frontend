import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'cars',
    author: 'John',
    url: 'www.cars.com',
    likes: 3
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    'cars',
    'John'
  )
})



test('renders all content', async () => {
  const blog = {
    title: 'cars',
    author: 'John',
    url: 'www.cars.com',
    likes: 3,
    user: { name: 'Matt' }
  }


  const component = render(
    <Blog blog={blog} usersName={'Matt'}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)


  expect(component.container).toHaveTextContent(
    'cars',
    'John',
    'www.cars.com',
    '3'
  )

})