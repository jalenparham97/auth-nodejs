const express = require('express')
const Joi = require('joi')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../db/connection')

const users = db.get('users')
users.createIndex('username', { unique: true })

const router = express.Router()

const schema = Joi.object().keys({
  username: Joi.string().trim().alphanum().min(2).max(30).required(),
  password: Joi.string().trim().min(6).required()
})

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema)
  if (result.error === null) {
    users.findOne({ username: req.body.username }).then(user => {
      if (user) {
        // Already a user in db, respond with error!
        const error = new Error('That username already exists.')
        res.status(409)
        next(error)
      } else {
        // Hash password
        bcrpyt.hash(req.body.password.trim(), 12).then(hashedPassword => {
          const newUser = {
            username: req.body.username,
            password: hashedPassword
          } 
          // Insert user into db
          users.insert(newUser).then(user => {
            delete user.password
            res.json(user)
          })
        }).catch(err => {
          res.json(err);
        });
      }
    }).catch(err => {
      res.json(err)
    });
  } else {
    res.status(422)
    console.log(result.error.message)
    next(result.error)
  }
})

const error422 = (res, next) => {
  res.status(422)
  const error = new Error('Username or password was incorrect.')
  next(error)
}

router.post('/login', (req, res, next) => {
  const result = Joi.validate(req.body, schema)
  if (result.error === null) {
    users.findOne({ username: req.body.username }).then(user => {
      if (user) {
        bcrpyt.compare(req.body.password, user.password).then(result => {
          if (result) {
            const payload = {
              _id: user._id,
              username: user.username
            }

            jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
              if (err) {
                error422(res, next)
              } else {
                res.json({ token })
              }
            })
          } else {
            error422(res, next)
          }
        })
      } else {
        error422(res, next)
      }
    })
  } else {
    error422(res, next)
  }
})

module.exports = router

