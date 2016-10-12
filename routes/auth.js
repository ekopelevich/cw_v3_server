'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const passport = require('passport')
// const db = require('../db/api')

router.get('/', (req, res) => {
  if (req.session) {
    res.send({user: req.app.locals.user})
  }
  res.end()
})

router.get('/twitter', passport.authenticate('twitter'), function(req, res){
  // The request will be redirected to Twitter for authentication,
  // so this function will not be called.
  res.send('Error: This function should not run.')
})

router.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: process.env.SERVER_HOST + '/auth/success',
  failureRedirect: process.env.SERVER_HOST + '/auth/fail',
}))

router.get('/success', (req, res) => {
  if (!req.session.passport) req.app.locals.user = null
  else req.app.locals.user = req.session.passport.user
  res.redirect(process.env.CLIENT_HOST)
})

router.get('/fail', (req, res) => {
  res.redirect(process.env.CLIENT_HOST)
})

router.get('/logout', (req, res) => {
  res.redirect('/')
})


module.exports = router