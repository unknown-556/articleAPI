import express from 'express';
import connectDB from './database.js';
import upload from './multer.js';
import Article from './article.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});





app.use(express.json());

// Create an article
app.post("/articles",  async (req, res) => {
  const { title, content, description, category, Author } = req.body;

  try {

//     if (!req.file) {
//         console.log('No file uploaded');
//         return;

//     }


//     console.log('Uploading file buffer:', req.file.buffer);

//  const result = await cloudinary.uploader.upload(req.file.path,
// { resource_type: 'auto' });
// (error, result) => {
//     if (error) {
//         console.error('Error uploading to Cloudinary:', error);
//     } else {
//         console.log('Upload successful. Cloudinary response:');
//         console.log('Image URL:', result.secure_url); // Log the image URL
//         resolve(result);
//     }
// }
// ;





    const newArticle = new Article({
      title,
      content,
      description,
      category,
      Author,
    });

    await newArticle.save();

    console.log('Creating article:', newArticle);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});



// Update an article
app.put("/articles/:id", async (req, res) => {
  const { title, content, description, category, Author } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, description, category, Author },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Get a single article
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).select('title content description category Author');

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Get all articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().select('title content description category Author').sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.listen(4444, () => {
  console.log('Server is running on port 4444');
});
