import express from 'express';
import cors from 'cors';
import routes from './api/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
