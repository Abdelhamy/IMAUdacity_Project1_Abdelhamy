import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { Stats } from 'fs';
import imagehelper from '../../resizeImage';

const imageResize = express.Router();

imageResize.get('/', async (req: Request, res: Response): Promise<void> => {
    const imageName = req.query['imagename'];
    const h = req.query['h'] ? parseInt(req.query['h'] as string, 10) : null;
    const w = req.query['w'] ? parseInt(req.query['w'] as string, 10) : null;
    if (!imageName || !h || !w) {
        res.status(400).send('Please make sure url contains correct imagename, H => height and w => width params');
        return;
    }
    const fPFullImage = `${path.resolve(__dirname, `../../../assets/full/${imageName}.jpg`)}`;
    const fPResizedImage = `${path.resolve(__dirname, `../../../assets/ResizedF/${imageName}-${h}x${w}.jpg`)}`;
    const fImage: Stats | null = await fs.stat(fPFullImage).catch(() => {
        res.status(404).send('Image does not exist Select from <br> fjord ,encenadaport , icelandwaterfall ,palmtunnel,santamonica ');
        return null;
    });
    if (!fImage) {
        return;
    }
        const existingImageResized: Stats | null = await fs.stat(fPResizedImage).catch(() => {
        return null;
    });
    if (existingImageResized) {
        fs.readFile(fPResizedImage)
            .then((ResizedData: Buffer) => {
                res.status(200).contentType('jpg').send(ResizedData);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    } else {
        imagehelper
            .resizeImageFunction({
                fPFullImage,
                fPResizedImage,
                h,
                w,
            })
            .then((resizedImage: Buffer) => {
                res.status(200).contentType('jpg').send(resizedImage);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    }
});
export default imageResize;
