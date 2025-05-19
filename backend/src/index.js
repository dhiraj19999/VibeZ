import express from 'express';
import  dotenv from 'dotenv';
import {clerkMiddleware} from '@clerk/express'
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stat.route.js';
import { connectDB } from './lib/db.js';
dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request body
app.use(clerkMiddleware()) // this will add auth to req obj =>req.auth
app.use(fileUpload({useTempFiles:true,tempFileDir:path.join(__dirname,'tmp') // Temporary directory for file uploads
    ,createParentPath:true, // Create parent directory if it doesn't exist
    // Set the maximum file size limit to 10MB
    limits:{fileSize:10 * 1024 * 1024 * 1024  // 10MB limit
     
}})); // Enable file upload
const PORT=process.env.PORT || 5000;


app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/songs",songRoutes)
app.use("/api/albums",albumRoutes)
app.use("/stats",statsRoutes)

// error handling middleware
app.use((err, req, res, next) => {
   
    res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message });
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   
    connectDB();
});