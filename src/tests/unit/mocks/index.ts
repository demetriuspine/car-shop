import { Request, Response } from "express"
import { Types } from "mongoose"

export const fusca = {
  model: 'VolksWagen Fusca',
  year: 1976,
  color: 'blue',
  buyValue: 3000,
  seatsQty: 5,
  doorsQty: 2
}

export const jsonResponse = {
  ...fusca,
  _id: new Types.ObjectId()
}


export const req = {
  body: fusca,
} as Request

export const res = {
  statusCode: 201,
  json: jsonResponse
}  as unknown as Response