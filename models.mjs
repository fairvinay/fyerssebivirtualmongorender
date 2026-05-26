import mongoose, { connectMongo } from './mongoose-setup.mjs';
import dotenv from 'dotenv';

dotenv.config();

//await connectMongo();

const Schema = mongoose.Schema;

/*
|--------------------------------------------------------------------------
| Money Schema
|--------------------------------------------------------------------------
*/

const moneySchema = new Schema({
  money: {
    type: Number,
    required: true,
    default: 10000,
  },

  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'User',
  },
});

/*
|--------------------------------------------------------------------------
| Portfolio Schema
|--------------------------------------------------------------------------
*/

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  buyPrice: {
    type: Number,
    required: true,
  },

  currPrice: {
    type: Number,
    required: true,
  },

  shareWorth: {
    type: Number,
    required: true,
  },

  profitLoss: {
    type: Number,
    required: true,
  },

  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

/*
|--------------------------------------------------------------------------
| Prevent OverwriteModelError in Netlify Hot Reload
|--------------------------------------------------------------------------
*/

export const Money =
  mongoose.models.Money ||
  mongoose.model('Money', moneySchema);

export const Portfolio =
  mongoose.models.Portfolio ||
  mongoose.model('Portfolio', companySchema);
