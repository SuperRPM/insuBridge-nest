import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomer = {
    id: 1,
    name: '김고객',
    phoneNumber: '010-1234-5678',
    location: '서울시 강남구',
    preferredContactTime: '오후 2시',
    monthlyInsuranceBudget: 100000,
    interestedInsuranceTypes: ['자동차보험', '생명보험'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCustomersService = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ ...dto, id: 1 })),
    findAll: jest.fn().mockResolvedValue([mockCustomer]),
    findOne: jest.fn().mockResolvedValue(mockCustomer),
    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ ...mockCustomer, ...dto })),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: '김고객',
        phoneNumber: '010-1234-5678',
        location: '서울시 강남구',
        preferredContactTime: '오후 2시',
        monthlyInsuranceBudget: 100000,
        interestedInsuranceTypes: ['자동차보험', '생명보험'],
      };

      const result = await controller.create(createCustomerDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(createCustomerDto.name);
      expect(result.phoneNumber).toBe(createCustomerDto.phoneNumber);
      expect(result.location).toBe(createCustomerDto.location);
      expect(result.preferredContactTime).toBe(createCustomerDto.preferredContactTime);
      expect(result.monthlyInsuranceBudget).toBe(createCustomerDto.monthlyInsuranceBudget);
      expect(result.interestedInsuranceTypes).toEqual(createCustomerDto.interestedInsuranceTypes);
      expect(service.create).toHaveBeenCalledWith(createCustomerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockCustomer]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(mockCustomer);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when customer not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const updateCustomerDto: UpdateCustomerDto = {
        name: '김고객(수정)',
        location: '서울시 서초구',
      };

      const result = await controller.update('1', updateCustomerDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(updateCustomerDto.name);
      expect(result.location).toBe(updateCustomerDto.location);
      expect(service.update).toHaveBeenCalledWith(1, updateCustomerDto);
    });

    it('should throw NotFoundException when updating non-existent customer', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.update('999', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when removing non-existent customer', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
