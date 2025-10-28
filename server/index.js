import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const app = express();
app.use(cors());
app.use(express.json());

const csvPath = path.join(process.cwd(), 'server', 'data.csv');
const configPath = path.join(process.cwd(), 'server', 'config.json');

app.get('/api/horas', (req, res) => {
  if (!fs.existsSync(csvPath)) return res.json([]);

  const rows = [];
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', () => res.json(rows));
});

app.post('/api/horas', (req, res) => {
  const data = req.body;
  const headers = ['id','date','startTime','endTime','workedHours','overtime'];
  const csvContent = [headers.join(','), ...data.map((r) => headers.map((h) => r[h]).join(','))].join('\n');
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  res.sendStatus(200);
});


app.delete('/api/horas/:id', (req, res) => {
  const id = req.params.id;
  const rows = [];
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', () => {
      const filtered = rows.filter((r) => r.id !== id);
      const headers = Object.keys(rows[0] || {});
      const csvContent = [headers.join(','), ...filtered.map((r) => headers.map((h) => r[h]).join(','))].join('\n');
      fs.writeFileSync(csvPath, csvContent, 'utf8');
      res.sendStatus(200);
    });
});

app.get('/api/horas/config', (req, res) => {
  if (!fs.existsSync(configPath)) return res.json(null);
  res.json(JSON.parse(fs.readFileSync(configPath, 'utf8')));
});

app.post('/api/horas/config', (req, res) => {
  fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3001, () => console.log('✅ Backend CSV corriendo en http://localhost:3001'));
