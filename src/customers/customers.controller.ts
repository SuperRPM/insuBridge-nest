import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: '모든 고객 조회' })
  @ApiResponse({ status: 200, description: '고객 목록 반환', type: [CustomerResponseDto] })
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 고객 조회' })
  @ApiResponse({ status: 200, description: '고객 정보 반환', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: '고객을 찾을 수 없음' })
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: '새로운 고객 생성' })
  @ApiResponse({ status: 201, description: '고객이 성공적으로 생성됨', type: CustomerResponseDto })
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '고객 정보 업데이트' })
  @ApiResponse({ status: 200, description: '고객 정보가 성공적으로 업데이트됨', type: CustomerResponseDto })
  @ApiResponse({ status: 404, description: '고객을 찾을 수 없음' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '고객 삭제' })
  @ApiResponse({ status: 200, description: '고객이 성공적으로 삭제됨' })
  @ApiResponse({ status: 404, description: '고객을 찾을 수 없음' })
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }
}
