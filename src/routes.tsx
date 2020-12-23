import * as React from 'react'
import Index from './views/index'

export const router = [
  {
    path: '/',
    main: () => <Index/>
  }, {
    path: '/login',
    main: () => <h1>login</h1>
  }
]
