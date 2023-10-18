const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.GetPost = async (req, res) => {
    try {
      const { title } = req.params; // Use the correct parameter name 'title'
  
      console.log('Received title parameter:', title);
  
      const post = await prisma.post.findFirst({
        where: { title: title }, // Use the title parameter here
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      console.log('Found post:', post);
  
      res.json({ post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Error fetching post' });
    }
  };