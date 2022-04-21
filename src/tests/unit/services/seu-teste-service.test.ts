import { Types } from 'mongoose';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarService from '../../../services/CarService';
import { fusca, jsonResponse } from '../mocks';


chai.use(chaiHttp);

const { expect } = chai;
const carService = new CarService();

const carsArray = [jsonResponse];

describe('Teste do service', () => {
  describe('caso de sucesso de create', async () => {
  
    before(async () => {
      sinon
        .stub(carService, "read")
        .resolves(carsArray);
    });
  
    after(()=>{
      (carService.read as sinon.SinonStub).restore();
    })
  
    it('deveria retornar um array de objetos com todas as propriedades', async () => {
      const cars = await carService.read();
  
      expect(cars).to.be.have.a('array');
      expect(cars[0]).to.be.equal(jsonResponse)
    });
  });

  describe('caso de sucesso de update', async () => {
    const updatedCar = {
      _id: new Types.ObjectId(),
      model: 'VolksWagen Gol',
      year: 1994,
      color: 'White',
      buyValue: 5000,
      seatsQty: 5,
      doorsQty: 2
    }
  
    before(async () => {
      sinon
        .stub(carService, "update")
        .resolves(updatedCar);
    });
  
    after(()=>{
      (carService.update as sinon.SinonStub).restore();
    })
  
    it('deveria retornar um objetos com todas as propriedades', async () => {
      const newCar = await carService.update(updatedCar._id.toString(), updatedCar);
  
      expect(newCar).to.be.have.a('object');
      expect(newCar).to.be.equal(updatedCar)
    });
  });

  describe('caso de sucesso de delete', async () => {
    const deletedCar = {
      _id: new Types.ObjectId(),
      model: 'VolksWagen Gol',
      year: 1994,
      color: 'White',
      buyValue: 5000,
      seatsQty: 5,
      doorsQty: 2
    }
  
    before(async () => {
      sinon
        .stub(carService, "delete")
        .resolves(deletedCar);
    });
  
    after(()=>{
      (carService.delete as sinon.SinonStub).restore();
    })
  
    it(`deveria retornar um objeto com as propriedades corretas ao receber
      todos os dados corretos no corpo da requisição`, async () => {
      const deleteCar = await carService.delete(deletedCar._id.toString());
  
      expect(deleteCar).to.be.have.a('object');
      expect(deleteCar).to.be.equal(deletedCar)
    });
  });

  describe('caso de sucesso de readOne', async () => {  
    before(async () => {
      sinon
        .stub(carService, "readOne")
        .resolves(jsonResponse);
    });
  
    after(()=>{
      (carService.readOne as sinon.SinonStub).restore();
    })
  
    it(`deveria retornar um objeto com as propriedades corretas ao receber
      todos os dados corretos no corpo da requisição`, async () => {
      const newCar = await carService.readOne(jsonResponse._id.toString());
  
      expect(newCar).to.be.have.a('object');
      expect(newCar).to.equal(jsonResponse)
    });
  });
    
  describe('caso de erro de update', () => {
    const id = new Types.ObjectId();

    it('deveria retornar um erro', async () => {
      const result = await carService.update(id.toString(), { ...fusca, color: 'ab' });
      expect(result).to.be.have.a.property('error');
    });

  })

});