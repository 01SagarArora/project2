import express, { Request, Response } from 'express';
import path from 'path';

import { ChunkExtractor } from '@loadable/server';

import { serverRenderer } from './middlewares/serverRenderer';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));

// app.get("/messages/", function(req, res) {
//   res.send("Hello");
// });

// app.get('/mycoolapp/', function(req, res){
//   res.send("Hello from the root application URL");
// });

// app.get('/mycoolapp/test/', function(req, res){
//   res.send("Hello from the 'test' URL");
// });

// Handling all routes with server-side rendering
app.get('*', (req: Request, res: Response, next) => { 
  const chunkExtractor = new ChunkExtractor({ statsFile: '../client/stats.json' });

  // Call render function from serverRenderer.tsx
  serverRenderer(chunkExtractor)(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
