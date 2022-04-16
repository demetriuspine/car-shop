import { Document, Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDoc extends Car, Document {}

const carSchema = new Schema<CarDoc>({
  model: String,
  year: Number,
  color: String,
  status: { type: String, required: false },
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;