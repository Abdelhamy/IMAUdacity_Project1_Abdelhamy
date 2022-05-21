import express, { Application, Request, Response } from 'express'
import path from 'path';
import routes from './routes/index';
import fs from 'fs';


const PORT = 3000;
// create an instance server
const app: Application = express();

app.use(routes);

app.get('/', (_, res: Response): void => {
  res.status(200).send('Image resize make sure url like /api_resize/image?imagename=fjord&w=500&h=500');
});
app.listen(PORT, (): void => {
  const ResizedFPath = path.resolve(__dirname, '../assets/ResizedF');

  if (!fs.existsSync(ResizedFPath)) {
      fs.mkdirSync(ResizedFPath);
  }
});

export default app;
