import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({ description: '보험 설계사 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '보험 설계사 전화번호' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: '보험 설계사 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '보험 설계사 전문 분야', required: false })
  @IsString()
  @IsOptional()
  expertise?: string;
}
