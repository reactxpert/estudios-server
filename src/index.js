import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

// defining the Express app
const app = express()

// defining port
const PORT = process.env.PORT || 3000;

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

// starting the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
