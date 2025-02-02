import multer from "multer";
import multerConfig from "../config/multerConfig.js";
import Fotos from "../db/models/Fotos.js";
const upload = multer(multerConfig).single("foto");
class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code]
        });
      }

      console.log("Arquivo recebido:", req.file);
      console.log("Dados recebidos:", req.body);

      try {
        const { originalname, filename } = req.file;
        const { reclamacao_id } = req.body;
        console.log(reclamacao_id);
        const foto = await Fotos.create({
          originalname,
          filename,
          reclamacao_id
        });

        return res.json(foto);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ["Reclamação não existe"]
        });
      }
    });
  }
}

export default new FotoController();
