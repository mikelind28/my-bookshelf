import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (_req, res) => {
//   res.send('Server is running 🚀');
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__filename:', __filename);
console.log('__dirname:', __dirname);

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, "../../client/dist");
  console.log(`Resolved clientPath: ${clientPath}`);
  app.use(express.static(clientPath));
  app.use('/api', routes);
  app.get("/*path", (_req: Request, res: Response) =>
    res.sendFile(path.join(clientPath, "index.html"))
  );
} else {
  app.use(routes);
}

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});