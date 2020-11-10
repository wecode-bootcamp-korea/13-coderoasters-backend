const {OAuth2Client} = require('google-auth-library')
const { GOOGLE_CLIENT_ID } = process.env
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const validateGoogleToken = async (req, res, next) => {
  try {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    
    req.payload = payload
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = validateGoogleToken