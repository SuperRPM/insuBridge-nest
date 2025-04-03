import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  preferredContactTime?: string;

  @IsNumber()
  @IsOptional()
  monthlyInsuranceBudget?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestedInsuranceTypes?: string[];
} 