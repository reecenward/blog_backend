const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000; // You can change the port as needed
const prisma = new PrismaClient(); // Initialize Prisma Client

// Define routes or middleware (e.g., for parsing JSON)
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
      // Use Prisma Client to fetch all names from the "Test" model
      const names = await prisma.test.findMany();
  
      // Send the names data as JSON response
      res.json({ names });
    } catch (error) {
      console.error('Error fetching names:', error);
      res.status(500).json({ error: 'Error fetching names' });
    }
  });

app.post('/add-name', async (req, res) => {
    try {
      const { namex } = req.body; // Updated field name to "namex"
  
      // Use Prisma Client to create a new entry in the "Test" model
      const newTestEntry = await prisma.test.create({
        data: {
          name: namex, // Updated field name to "namex"
        },
      });
  
      // Redirect to the home page to display the names
      res.redirect('/');
    } catch (error) {
      console.error('Error adding name:', error);
      res.status(500).send('Error adding name');
    }
  });

  app.put('/update-name/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { namex } = req.body; // Updated field name to "namex"

      // Use Prisma Client to update the name in the "Test" model
      const updatedTestEntry = await prisma.test.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: namex, // Updated field name to "namex"
        },
      });

      // Send a JSON response with the updated entry
      res.json({ updatedTestEntry });
    } catch (error) {
      console.error('Error updating name:', error);
      res.status(500).send('Error updating name');
    }
  });


  app.delete('/delete-name/:id', async (req, res) => {
    try {
      const { id } = req.params;

      // Use Prisma Client to delete the entry from the "Test" model
      await prisma.test.delete({
        where: {
          id: parseInt(id),
        },
      });

      // Send a success response
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting name:', error);
      res.status(500).send('Error deleting name');
    }
  });


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
