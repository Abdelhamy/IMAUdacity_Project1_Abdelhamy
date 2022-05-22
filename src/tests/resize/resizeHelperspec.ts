import path from 'path';
import imageh from '../../resizeImage';


const fPResizedImage = path.resolve(__dirname, '../../../assets/ResizedF/fjord.jpg');

    it('rejects promise if something went wrong', async (): Promise<void> => {
        await expectAsync(
            imageh.resizeImageFunction({
                h: 100,
                w: 150,
                fPFullImage: '',
                fPResizedImage,
            }),
        ).toBeRejected();
    });
