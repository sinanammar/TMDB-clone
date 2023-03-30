const userService = require('../services/userService')

module.exports.signup = async (req, res) => {
  try {
    const response = await userService.signup(req.body)
    const lastIssuedToken = response.tokens[response.tokens.length - 1]
    res
      .cookie('jwt', lastIssuedToken.token, {
        maxAge: 90000000,
      })
      .send(response)

    // res.status(200).send(response)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.login = async (req, res) => {
  try {
    const response = await userService.login(req.body)
    const userData = {
      id: response._id,
      username: response.username,
      email: response.email,
    }

    const lastIssuedToken = response.tokens[response.tokens.length - 1]

    res
      .cookie('jwt', lastIssuedToken.token, {
        maxAge: 90000000,
      })
      .send(response)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.checkEmailAvailability = async (req, res) => {
  try {
    const response = await userService.checkEmailAvailability(req.body)
    res.status(200).send(response)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.addToWatchlist = async (req, res) => {
  try {
    const response = await userService.addToWatchList(req.body, req.user._id)
    res.status(200).send(response)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.fetchWatchlist = async (req, res) => {
  try {
    const response = await userService.fetchWatchlist(req.user._id)
    res.status(200).send(response)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.logout = async (req, res) => {
  try {
    res
      .cookie('jwt', '', {
        maxAge: 900000,
      })
      .send('Success')
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.clearWatchlist = async (req, res) => {
  try {
    const response = await userService.clearWatchlist(req.user._id)
    res.status(200).send(response)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}
