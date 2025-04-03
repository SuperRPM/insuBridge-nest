import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  preferredContactTime: string;

  @ApiProperty()
  monthlyInsuranceBudget: number;

  @ApiProperty({ type: [String] })
  interestedInsuranceTypes: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 