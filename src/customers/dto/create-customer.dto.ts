import { IsString, IsNumber, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional()
  interestedInsuranceTypes?: string;
} 