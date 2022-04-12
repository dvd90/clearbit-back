import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  company_id: string;
}

const LikeSchema: Schema = new Schema({
  company_id: String
});

export const Like = mongoose.model<ILike>('likes', LikeSchema, 'likes');
