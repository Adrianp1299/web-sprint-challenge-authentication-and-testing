const Auth = require('../models/model')

const checkNameExists = async (req, res, next) => {
    try{
        const [user] = await Auth.findBy({ username: req.body.username})
        if (user) {
          next ({status: 403, message: 'Name already Exists'})
        }else {
          next()
        }
       } catch(err) {
        next(err)
       }
}

module.exports = {
    checkNameExists,
}