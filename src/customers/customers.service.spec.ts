import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<Customer>;

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

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => ({ ...dto, id: 1 })),
    save: jest.fn().mockImplementation((customer) => Promise.resolve(customer)),
    find: jest.fn().mockResolvedValue([mockCustomer]),
    findOne: jest.fn().mockResolvedValue(mockCustomer),
    delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const result = await service.create(createCustomerDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(createCustomerDto.name);
      expect(result.phoneNumber).toBe(createCustomerDto.phoneNumber);
      expect(result.location).toBe(createCustomerDto.location);
      expect(result.preferredContactTime).toBe(createCustomerDto.preferredContactTime);
      expect(result.monthlyInsuranceBudget).toBe(createCustomerDto.monthlyInsuranceBudget);
      expect(result.interestedInsuranceTypes).toEqual(createCustomerDto.interestedInsuranceTypes);
      expect(repository.create).toHaveBeenCalledWith(createCustomerDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result = await service.findAll();

      expect(result).toEqual([mockCustomer]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when customer not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const updateCustomerDto: UpdateCustomerDto = {
        name: '김고객(수정)',
        location: '서울시 서초구',
      };

      const result = await service.update(1, updateCustomerDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(updateCustomerDto.name);
      expect(result.location).toBe(updateCustomerDto.location);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when updating non-existent customer', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when removing non-existent customer', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 0, raw: {} });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
