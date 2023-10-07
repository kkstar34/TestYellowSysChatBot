import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AxiosResponse } from 'axios';
import axios from 'axios';

const storage = diskStorage({
  destination: './uploads', // Répertoire de stockage des fichiers
  filename: (req, file, callback) => {
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    return callback(null, `${randomName}${extname(file.originalname)}`);
  },
});

@Controller('files')
export class UploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('excelFile', { storage }))
  async uploadFile( 
    @UploadedFile() file: Express.Multer.File,
    @Body('requestText') requestText: string,
  ): Promise<string> {
    try {
      if (!file) {
        return 'Aucun fichier Excel téléchargé.';
      }

    //   console.log(requestText);
      const fileData = file.buffer;
      const response: AxiosResponse = await axios.post('URL_de_l_API_de_destination', fileData, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      console.log("Réponse de l'API de destination :", response.data);
      return "Fichier Excel transféré avec succès vers l'API de destination.";
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier Excel vers l'API de destination :", error.message);
      return "Erreur lors de l'envoi du fichier Excel vers l'API de destination.";
    }
  }
}
