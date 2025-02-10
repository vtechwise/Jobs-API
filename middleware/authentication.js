const { UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("authentication invalid");
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userID, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
};


module.exports = auth 