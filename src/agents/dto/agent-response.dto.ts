import { ApiProperty } from '@nestjs/swagger';

export class AgentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  connectedCustomersCount: number;

  @ApiProperty()
  successfulContractsCount: number;

  @ApiProperty()
  expertise: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 