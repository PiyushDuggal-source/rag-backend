import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { router } from './routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3030;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚀 server is running on: PORT ${PORT}\n`);
});
