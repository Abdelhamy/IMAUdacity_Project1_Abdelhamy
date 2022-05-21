import fs from 'fs/promises';
import sharp from 'sharp';

interface ResizeImageProps {
    w: number;
    h: number;
    fPFullImage: string;
    fPResizedImage: string;
}
const resizeImageFunction = async ({
    w,
    h,
    fPFullImage,
    fPResizedImage,
}: ResizeImageProps): Promise<Buffer> => {
    const data: Buffer | null = await fs.readFile(fPFullImage).catch(() => null);

    if (!data) {
        return Promise.reject();
    }

    const imageBuffer: Buffer | null = await sharp(data)
        .resize(w, h)
        .toBuffer()
        .catch(() => null);

    if (!imageBuffer) {
        return Promise.reject();
    }

    return fs
        .writeFile(fPResizedImage, imageBuffer)
        .then(() => {
            return imageBuffer;
        })
        .catch(() => {
            return Promise.reject();
        });
};

export default { resizeImageFunction };
