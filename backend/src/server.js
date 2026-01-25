import express from "express";
import {ENV} from "./lib/env.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";    
import "dotenv/config";



const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = ENV.PORT || 3000;

app.use(express.json()); // Essential for parsing JSON data from the frontend


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 1. Define the path to your frontend build folder
const frontendPath = path.resolve(__dirname, "../../frontend/dist");

// 2. Serve static files
app.use(express.static(frontendPath));

// 3. Handle SPA routing: send index.html for any non-api routes
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});



// Note: app.listen is ignored by Vercel's serverless runtime
if (ENV.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
        connectDB();
    });
}

export default app;
