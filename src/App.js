import {Switch, Route} from 'react-router-dom'

import './App.css'

import LoginRoute from './components/LoginRoute'
import JobsRoute from './components/JobsRoute'

import JobDetailsRoute from './components/JobDetailsRoute'

import HomeRoute from './components/HomeRoute'

import ProtectedRoute from './components/ProtectedRoute'

import NotFoundRoute from './components/NotFoundRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailsRoute} />
    <NotFoundRoute />
  </Switch>
)

export default App
