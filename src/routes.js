import React from 'react'
import { Switch, Route } from 'react-router-dom'
import auth from './Components/Auth'
import dash from './Components/Dash'
import form from './Components/Form'
import nav from './Components/Nav'
import post from './Components/Post'

export default (
    <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/dash" component={Dash} />
    <Route exact path="/post/:id" component={Post} />
    <Route exact path="/form" component={Form} />

    </Switch>
  )