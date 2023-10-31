import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import * as fs from 'fs';

var destinationPath =  '/tmp'; //'./uploads'
const storage = diskStorage({
  destination: destinationPath, // Répertoire de stockage des fichiers  /tmp 
  filename: (req, file, callback) => {
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    return callback(null, `${randomName}${extname(file.originalname)}`);
  },
});

@Controller()
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('excelFile', { storage })) //, {storage} à remettre à
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('requestText') requestText: string,
  ): Promise<string> {
    try {
      if (!file) {
        return 'Aucun fichier Excel téléchargé.';
      }

      const uploadedFile = file;
      
      console.log(uploadedFile);

      // Lire le contenu du fichier depuis l'emplacement de stockage
      const filePath1 = `/tmp/${uploadedFile.filename}`; //'./uploads/'
      var data = fs.readFileSync(filePath1);

      // , async (err, data) => {
      //   if (err) {
      //     // Gérer les erreurs de lecture du fichier
      //     return 'Erreur lors de la lecture du fichier.';
      //   }

       

      // });

       // Ajouter l'attribut buffer et sa valeur correspondante aux informations du fichier
       uploadedFile.buffer = data;
       // console.log( uploadedFile.buffer );
       const fileBlob = new Blob([uploadedFile.buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

       const formData = new FormData();
       // formData.append('file', fileBlob, file.originalname);
       formData.append('file', fileBlob, uploadedFile.originalname);
       formData.append('query', 'Je souhaite avoir une colonne appelée "Montant HT" qui calcule le produit de la colonne "PU" et "Qte" au niveau de la feuil1');
       formData.append('username', 'testuser');
       formData.append('password', 'Ox50KH5cIsApiAMa5Dmz');
 
       const response: AxiosResponse = await axios.post('http://51.195.62.156:28000/handle_excel_file', formData, {
         headers: {
           'Content-Type': 'multipart/form-data',
         }
       });

       console.log(response.data.url);
     
       const filePath = `http://51.195.62.156:28000/${response.data.url}`;
       const responseTwo = await axios.get(filePath, { responseType: 'arraybuffer' });
 
      // Obtenez le contenu du fichier sous forme de tableau d'octets (buffer)
      const fileContent = responseTwo.data;
 
      // Définissez le chemin de destination local pour le fichier
      let randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      randomName = `${randomName}${extname(response.data.url)}`;
      const destinationPath = `/tmp/${randomName}`; //'uploads/'
       // Écrivez le contenu du fichier dans le dossier "uploads"
       fs.writeFileSync(destinationPath, Buffer.from(fileContent));
 
       console.log("Fichier Excel transféré avec succès vers l'API de destination. Réponse de l'API de destination :", randomName);
       // return response.data;
       return randomName;


     
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier Excel vers l'API de destination :", error);
      // console.log(file);
      // return file.filename;
      return error;
      // return "Erreur lors de l'envoi du fichier Excel vers l'API de destination.";
    }
  }

  @Get('download/:fileName')
  async downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = path.join('/tmp/', fileName);
    //  const filePath = path.join(__dirname, '../uploads/', fileName);
    // const filePath = path.join(__dirname, `../uploads/${fileName}`);
    console.log(fileName);

    // Réglez les en-têtes de la réponse pour indiquer qu'il s'agit d'un fichier à télécharger.
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    // Envoyez le fichier en réponse.
    res.sendFile(filePath);
  }

}

