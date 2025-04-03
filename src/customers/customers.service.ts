import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  // Go의 func (s *Service) GetAll() ([]Customer, error)와 비슷
  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  // Go의 func (s *Service) GetByID(id string) (*Customer, error)와 비슷
  async findOne(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // Go의 func (s *Service) Create(c *Customer) (*Customer, error)와 비슷
  async create(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }

  // Go의 func (s *Service) Update(id string, c *Customer) (*Customer, error)와 비슷
  async update(id: number, customer: Customer): Promise<Customer> {
    const existingCustomer = await this.findOne(id);
    Object.assign(existingCustomer, customer);
    return this.customersRepository.save(existingCustomer);
  }

  // Go의 func (s *Service) Delete(id string) error와 비슷
  async remove(id: number): Promise<void> {
    const result = await this.customersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }
}
