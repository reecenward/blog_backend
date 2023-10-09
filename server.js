const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const helmet = require('helmet'); // Add helmet for security headers
const winston = require('winston'); // Add Winston for logging

const app = express();
const port = process.env.PORT || 3000; // Use PORT environment variable for production

// Set up environment variables using dotenv for development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const prisma = new PrismaClient();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet()); // Use Helmet for security headers

// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Logging configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Routes
app.get('/', async (req, res) => {
  try {
    const names = await prisma.test.findMany();
    res.json({ names });
  } catch (error) {
    logger.error('Error fetching names:', error); // Log errors
    res.status(500).json({ error: 'Error fetching names' });
  }
});

app.post('/add-name', async (req, res) => {
  try {
    const { namex } = req.body;
    const newTestEntry = await prisma.test.create({
      data: {
        name: namex,
      },
    });
    res.redirect('/');
  } catch (error) {
    logger.error('Error adding name:', error); // Log errors
    res.status(500).send('Error adding name');
  }
});

app.put('/update-name/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { namex } = req.body;
    const updatedTestEntry = await prisma.test.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: namex,
      },
    });
    res.json({ updatedTestEntry });
  } catch (error) {
    logger.error('Error updating name:', error); // Log errors
    res.status(500).send('Error updating name');
  }
});

app.delete('/delete-name/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.test.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting name:', error); // Log errors
    res.status(500).send('Error deleting name');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
