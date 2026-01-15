import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";    

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Essential for parsing JSON data from the frontend


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if(process.env.NODE_ENV === "production") {
   

    const frontendPath = path.resolve(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath,"index.html"));
    });

    console.log("Checking path:", frontendPath);
}




// Note: app.listen is ignored by Vercel's serverless runtime
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
