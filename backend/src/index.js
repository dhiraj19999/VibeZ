import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import songRoutes from './routes/song.route.js'
import albumRoutes from './routes/album.route.js'
import statRoutes from './routes/stat.route.js'
import { connectDB } from './lib/db.js'
import { clerkMiddleware } from '@clerk/express'
dotenv.config()
const app=express()
const __dirname=path.resolve()
const PORT=process.env.PORT

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())// to parse req.body
app.use(clerkMiddleware()) // this will add auth to req obj ==> req.auth.userid =>whenever any url hit auth get added to req object
app.use(fileUpload({useTempFiles:true,tempFileDir:path.join(__dirname,"tmp"),createParentPath:true,limits:{fileSize:10*1024*1024}}))
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statRoutes);
// error handler
app.use((err, req, res, next) => {
	res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

app.listen(PORT,()=>{
console.log(`PORT RUNNING ON ${PORT}`)
connectDB();
})