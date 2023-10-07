var express = require('express');
var router = express.Router();
const multer = require('multer');
const axios = require('axios');


const storage = multer.memoryStorage();
const upload = multer({ storage });


/* POST files . */
router.post("/upload", upload.single('excelFile'), async function(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send('Aucun fichier Excel téléchargé.');
    }

    console.log(req.body.requestText);
    const fileData = req.file.buffer;
    const response = await axios.post('URL_de_l_API_de_destination', fileData, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
    console.log("Réponse de l'API de destination :", response.data);
    return res.status(200).send("Fichier Excel transféré avec succès vers l'API de destination.");
  } catch (error) {
    console.error("Erreur lors de l'envoi du fichier Excel vers l'API de destination :", error.message);
    return res.status(500).send("Erreur lors de l'envoi du fichier Excel vers l'API de destination.");
  }});



module.exports = router;
