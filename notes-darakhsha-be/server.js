import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { dirname , join} from "path";
import connectDB from "./config/db.js";
import corsOptions from "./config/corsOptions.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

connectDB();

const app = express();

app.use(helmet());


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the frontend build
const frontendPath = join(__dirname, '../notes-darakhsha-fe/dist');
app.use(express.static(frontendPath));

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/admin", adminRoutes);

app.get('*', (req, res) => {
  res.sendFile(join(frontendPath, 'index.html'));
});
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
