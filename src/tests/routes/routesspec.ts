import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';
import app from '../../index';
import { Stats } from 'fs';

describe('GET /api_resize/image', () => {
    it('responds with 400 if called without parameters', (done): void => {
        request(app).get('/api_resize/image').expect(400, done);
    });

    it('responds with 400 if called with a missing parameter', (done): void => {
        request(app).get('/api_resize/image?imagename=test&h=100').expect(400, done);
    });

    it('responds with 404 if called correctly but image does not exist', (done): void => {
        request(app).get('/api_resize/image?imagename=test&h=100&w=100').expect(404, done);
    });

    it('responds with 200 if called correctly and image exist', (done): void => {
        request(app).get('/api_resize/image?imagename=fjord&h=100&w=100').expect(200, done);
    });

    it('created a ResizedF version of the image', (done): void => {
        request(app)
            .get('/api_resize/image?imagename=fjord&h=100&w=100')
            .then(() => {
                fs.stat(path.resolve(__dirname, '../../../assets/ResizeF/fjord-100x100.jpg')).then((fileStat: Stats) =>
                    expect(fileStat).not.toBeNull(),
                );
                done();
            });
    });

    it('created a ResizedF version of the image with the correct height and width', (done): void => {
        request(app)
            .get('/api_resize/image?imagename=fjord&h=100&w=150')
            .then(() => {
                const dimensions = sizeOf(path.resolve(__dirname, '../../../assets/ResizedF/fjord-100x150.jpg'));
                expect(dimensions.height).toEqual(100);
                expect(dimensions.width).toEqual(150);
                done();
            });
    });
});