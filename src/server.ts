import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'rsvps.json');

// Middleware to parse JSON
app.use(express.json());

// Load RSVPs from file or return empty array if file doesn't exist
const loadRSVPs = (): any[] => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading RSVPs from file:', error);
  }
  return [];
};

// Save RSVPs to file
const saveRSVPs = (rsvps: any[]): boolean => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(rsvps, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving RSVPs to file:', error);
    return false;
  }
};

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Get all RSVPs
app.get('/api/rsvps', (req, res) => {
  const rsvps = loadRSVPs();
  res.json(rsvps);
});

// Add or update an RSVP
app.post('/api/rsvp', (req, res) => {
  const newRsvp = req.body;
  if (!newRsvp || !newRsvp.name) {
    return res.status(400).json({ error: 'Имя гостя обязательно' });
  }

  const rsvps = loadRSVPs();
  // Filter out any existing RSVP with the same ID or name (case insensitive) to allow modifications
  const filtered = rsvps.filter(
    (item) =>
      item.id !== newRsvp.id &&
      item.name.toLowerCase() !== newRsvp.name.toLowerCase()
  );
  
  const updated = [newRsvp, ...filtered];
  if (saveRSVPs(updated)) {
    res.json({ success: true, rsvp: newRsvp });
  } else {
    res.status(500).json({ error: 'Не удалось сохранить ответ гостя на сервере' });
  }
});

// Delete a specific RSVP by ID
app.delete('/api/rsvp/:id', (req, res) => {
  const { id } = req.params;
  const rsvps = loadRSVPs();
  const updated = rsvps.filter((item) => item.id !== id);
  
  if (saveRSVPs(updated)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Не удалось удалить гостя' });
  }
});

// Clear all RSVPs
app.post('/api/rsvps/clear', (req, res) => {
  if (saveRSVPs([])) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Не удалось очистить список' });
  }
});

// ----------------------------------------------------
// VITE OR STATIC FRONTEND SERVING
// ----------------------------------------------------
async function setupFrontend() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupFrontend();
