const Auth = require('../models/model')

const checkNameExists = async (req, res, next) => {
    try{
        const [user] = await Auth.findBy({ username: req.body.username})
        if (user) {
          next ({status: 403, message: 'username taken'})
        }else {
          next()
        }
       } catch(err) {
        next(err)
       }
}

const checkUsernameExists = async (req, res, next) => {
   try{
    const [user] = await Auth.findBy({ username: req.body.username})
    if (!user) {
      next ({status: 401, message: 'invalid credentials'})
    }else {
      req.user = user
      next()
    }
   } catch(err) {
    next(err)
   }
  }

const checkUserPayload = (req, res, next ) => {
    const error = { status: 400 }
    const { username, password} = req.body
    if (username === undefined || password === undefined) {
      error.message = 'username and password required'
    }
    if(error.message) {
      next(error)
    }else{
      next()
    }
  }

module.exports = {
    checkNameExists,
    checkUsernameExists,
    checkUserPayload,
}