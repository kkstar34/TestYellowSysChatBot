import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import * as fs from 'fs';



var destinationPath =  './uploads'; // /tmp
const storage = diskStorage({
  destination: destinationPath, // Répertoire de stockage des fichiers  /tmp 
  filename: (req, file, callback) => {
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    return callback(null, `${randomName}${extname(file.originalname)}`);
  },
});


@Controller()
export class FileController {
  maxDuration = 45; // This function can run for a maximum of 45 seconds
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
      const filePath1 = `./uploads/${uploadedFile.filename}`; //'/tmp'
      var data = fs.readFileSync(filePath1);   

      // , async (err, data) => {
      //   if (err) {
      //     // Gérer les erreurs de lecture du fichier
      //     return 'Erreur lors de la lecture du fichier.';
      //   }

         // Ajouter l'attribut buffer et sa valeur correspondante aux informations du fichier
       uploadedFile.buffer = data;
       // console.log( uploadedFile.buffer );
       const fileBlob = new Blob([uploadedFile.buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

       const formData = new FormData();
       // formData.append('file', fileBlob, file.originalname);
       formData.append('file', fileBlob, uploadedFile.originalname);
       formData.append('query', requestText);
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
 
      function removeChar(str){
        const res = str.substr(5, str.length);
        return res
      }
      // Définissez le chemin de destination local pour le fichier
      let randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      randomName = `${randomName}${extname(response.data.url)}`;
      const destinationPath2 = `./uploads/${randomName}`; //'uploads/'  removeChar(response.data.url)
       // Écrivez le contenu du fichier dans le dossier "uploads"
       fs.writeFileSync(destinationPath2, Buffer.from(fileContent));
 
       console.log("Fichier Excel transféré avec succès vers l'API de destination. Réponse de l'API de destination :", randomName);
       // return response.data;
      //  return removeChar(response.data.url);
       return randomName;
        
      // });

      function replaceFileExtension(filename) {
        // Recherche la dernière occurrence du point (.) pour identifier l'extension.
        const lastDotIndex = filename.lastIndexOf(".");
        
        if (lastDotIndex === -1) {
          // Si aucun point n'est trouvé, retourne le nom de fichier tel quel.
          return filename;
        } else {
          // Extrait la partie du nom de fichier avant le dernier point et ajoute ".xlsm".
          const newFilename = filename.substring(0, lastDotIndex) + ".xlsm";
          return newFilename;
        }
      }

      // return replaceFileExtension(uploadedFile.originalname);
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
    // const filePath = path.join('/tmp/', fileName);
    //  const filePath = path.join(__dirname, '../uploads/', fileName);
    const filePath = path.join(__dirname, `../uploads/${fileName}`);
    const newPath = filePath.replace("/dist/", "/");
    console.log(fileName);

    // Réglez les en-têtes de la réponse pour indiquer qu'il s'agit d'un fichier à télécharger.
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    // Envoyez le fichier en réponse.
    res.sendFile(newPath);
  }

}

