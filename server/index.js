const express = require('express')
const cors = require('cors')
require('./db/mongoose')
require('./middleware/passport')

const passport = require('passport')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Routers
const moviesRouter = require('./routers/moviesRouter')
const userRouter = require('./routers/userRouter')

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(passport.initialize())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/api', userRouter)
app.use('/api/movies', moviesRouter)

app.get(
  '/secure',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    res.send(req.user)
  }
)

app.listen(5000, () => console.log('Server is up on 5000'))

// successRedirect: '/',
// failureRedirect: '/login',
