import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('api/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})