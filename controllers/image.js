const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require("crypto");
const sharp = require("sharp")
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  region: process.env.BUCKET_REGION
})

exports.get = async (req, res) => {
    const posts = await prisma.image.findMany();
  
    for (const post of posts) { // Use 'of' instead of 'in' to iterate through the array
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: post.imageName, // Use 'post.imageName' as the Key
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.imageUrl = url;
    }
  
    res.send(posts);
  };
  
exports.delete = async (req, res) => {
    const id = +req.params.id
  
    const post = await prisma.image.findUnique({where:{id}});
  
    if(!post){ 
      res.status(404).send("post not found")
      return
    }
  
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: post.imageName
    }
  
    const command = new DeleteObjectCommand(params)
    await s3.send(command)
  
    await prisma.image.delete({where: {id}})
  
    res.send(post);
  };
  
exports.upload = async (req, res) => {
    try {
      console.log("req.body: ",req.body)
      console.log("req.file: ",req.file)
  
      const buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit: "contain"}).toBuffer()
  
      const ImageName = randomImageName()
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: ImageName,
        Body: buffer,
        ContentType: req.file.mimetype,
      }
  
      const command = new PutObjectCommand(params)
      await s3.send(command)
  
      const image = await prisma.image.create({
        data: {
          imageName: ImageName
        }
      })
  
      res.send(image)
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  };