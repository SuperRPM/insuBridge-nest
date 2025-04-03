import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  // Go의 func (w http.ResponseWriter, r *http.Request)와 비슷
  @Get()
  findAll(): Promise<Customer[]> {
    // TODO: 서비스 레이어 구현 후 연결
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    // Go의 chi.URLParam(r, "id")와 비슷
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post()
  create(@Body() customer: Customer): Promise<Customer> {
    // Go의 json.NewDecoder(r.Body).Decode(&customer)와 비슷
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() customer: Customer): Promise<Customer> {
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
