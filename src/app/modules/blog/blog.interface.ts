import { Types } from 'mongoose';

export interface IBlogPost {
  title: string;
  slug?: string;
  content: string;
  author: Types.ObjectId;
  isPublished?: boolean;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
