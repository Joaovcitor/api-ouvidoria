import express from "express";
import session from "express-session";
import FileStoreFactory from "session-file-store";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// importação de rotas;
import userRoute from "./src/routes/userRoutes.js";
import reclamacoesRotas from "./src/routes/reclamacoesRouter.js";
import authRoute from "./src/routes/authRoutes.js";
import homeRoute from "./src/routes/homeRoute.js";
import duvidasRoutes from "./src/routes/duvidasRouter.js";
import fotoRoute from "./src/routes/fotoRoute.js";

dotenv.config();

const FileStore = FileStoreFactory(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// helmet({
//   crossOriginResourcePolicy: false
// });

class Server {
  constructor() {
    this.app = express();
    this.whiteList = [
      "http://localhost:3000",
      "https://apiouvidoria.logicmasters.com.br",
      "https://ouvidoriaquixada.netlify.app"
    ]; // Lista de sites permitidos pelo CORS

    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  configureMiddlewares() {
    const corsOptions = {
      origin: (origin, callback) => {
        if (this.whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true
    };

    this.app.use(cors(corsOptions));
    this.app.use(helmet());

    this.app.use(
      express.urlencoded({
        extended: true
      })
    );

    this.app.use(
      session({
        name: "session",
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
          logFn: () => {},
          path: path.join(os.tmpdir(), "sessions")
        }),
        cookie: {
          secure: true,
          maxAge: 28800000,
          httpOnly: true
        }
      })
    );
    this.app.use("/uploads", express.static(join(__dirname, "uploads")));
    // this.app.use(express.static("uploads"));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  configureRoutes() {
    this.app.use("/", homeRoute);
    this.app.use("/usuario", userRoute);
    this.app.use("/reclamacoes", reclamacoesRotas);
    this.app.use("/duvidas", duvidasRoutes);
    this.app.use("/login", authRoute);
    this.app.use("/fotos", fotoRoute);
  }

  startServer() {
    const PORT = process.env.PORT || 3004;
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

export default Server;
