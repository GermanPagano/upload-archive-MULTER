import express from "express";
import { fileURLToPath } from "url";
import { dirname, resolve, extname } from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Crear carpeta "descargas"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resolve(__dirname, "./descargas"));
    },
    filename: (req, file, cb) => {
        const timeStamp = Date.now();
        const originalName = file.originalname;
        const ext = extname(originalName);
        cb(null, `${timeStamp}-${originalName}`);
    }
});

// Guardar el storage
const upload = multer({ storage });

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(resolve(__dirname, "./public")));

// Middleware para subir archivos
app.post("/uploads", upload.single("archivo"), (req, res) => {
    res.json({ msg: "Archivo subido correctamente" });
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});
