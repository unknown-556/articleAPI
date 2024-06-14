import mongoose from 'mongoose';
import { type } from 'os';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  Author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
