import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";

dotenv.config();

const app = express();


const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Essential for parsing JSON data from the frontend


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if(process.env.NODE_ENV === "production") {
   

    const frontendPath = path.join(process.cwd(), "frontend", "dist");
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath,"index.html"));
    });

    console.log("Checking path:", frontendPath);
}

// IMPORTANT: Export for Vercel
export default app; 

// Note: app.listen is ignored by Vercel's serverless runtime
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

