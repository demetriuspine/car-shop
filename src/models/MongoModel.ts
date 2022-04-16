import { Model as MongooseModel, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: MongooseModel<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> => 
    this.model.findOne({ _id: id });

  update = async (id: string, obj: T): Promise<T | null> => 
    this.model.findByIdAndUpdate(id, { ...obj });

  delete = async (id: string): Promise<T | null> => 
    this.model.findByIdAndDelete(id);
}