import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Form, List } from './pages'
import store from './store'
import { Notification, Spinner } from './components'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<List/>} />
            <Route exact path='/create' element={<Form/>} />
            <Route exact path='/edit/:id' element={<Form/>} />
          </Routes>
        </Fragment>
      </Router>
      <Notification />
      <Spinner />
    </Provider>
  )
}

export default App
