const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.GetAllPosts = async (req, res) => {
    try {
      // Retrieve all posts from your database
      const posts = await prisma.post.findMany();
      
      console.log('Posts:', posts); // Add this line to log the posts data
  
      // Respond with the list of posts as JSON
      res.json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
  };