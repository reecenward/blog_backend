const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

exports.CreatePost = async (req, res) => {
  try {

    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content cannot be blank' });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    console.log('New Post created:', newPost);

    res.status(201).json({ message: 'Content saved successfully', newPost });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Error saving content' });
  }
};

exports.UpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title: updatedTitle, content: updatedContent } = req.body;

    if (!updatedTitle || !updatedContent) {
      return res.status(400).json({ error: 'Title and content cannot be blank' });
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: updatedTitle,
        content: updatedContent,
      },
    });

    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Error updating post' });
  }
  };
  
exports.DeletePost = async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: 'id cannot be blank' });
      }
      // Delete the post in the database based on the ID
      await prisma.post.delete({
        where: { id: parseInt(id) }, // Assuming ID is an integer
      });
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  };
  
  exports.GetPost = async (req, res) => {
    try {
      const { id } = req.params; // Correct parameter name is 'id'
  
      if (!id) {
        return res.status(400).json({ error: 'id cannot be blank' });
      }

      console.log('Received id parameter:', id);
  
      const post = await prisma.post.findFirst({
        where: { id: parseInt(id) }, // Use 'id' here
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