import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Types } from 'mongoose';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
import { jsonResponse, req, res } from '../mocks';

chai.use(chaiHttp);


const carController = new CarController();

const { expect } = chai;

describe('Teste do controller', () => {


  describe("caso de sucesso de create", () => {
    before(async () => {
      sinon
        .stub(carController, 'create')
        .resolves(res);
    });
  
    after(()=>{
      (carController.create as sinon.SinonStub).restore();
    })

    it('deveria retornar o status 201', async () => {
      const newCar = await carController.create(req, res);
      expect(newCar.statusCode).to.be.equal(201);
    });
  
    it('deveria retornar um objeto com todas as propriedades', async () => {
      const newCar = await carController.create(req, res);
      expect(newCar.json).to.be.equal(jsonResponse);
    });
  })


});