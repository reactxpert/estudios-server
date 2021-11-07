import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

// defining the Express app
const app = express()

// defining port
const PORT = process.env.PORT || 3000

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

// adding Helmet to enhance your API's security
app.use(helmet())

app.use(express.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// defining an endpoint to return all ads
app.get('/check', (req, res) => {
  res.send('Server is online!')
})

// This route needs authentication
app.post('/authenticate', jwtCheck, function (req, res) {
  res.send('You are successfully authenticated!')
})

// starting the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
