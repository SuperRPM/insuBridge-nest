import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { AgentResponseDto } from './dto/agent-response.dto';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @ApiOperation({ summary: '새로운 보험 설계사 생성' })
  @ApiResponse({ status: 201, description: '보험 설계사가 성공적으로 생성됨', type: AgentResponseDto })
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 보험 설계사 조회' })
  @ApiResponse({ status: 200, description: '보험 설계사 목록 반환', type: [AgentResponseDto] })
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 보험 설계사 조회' })
  @ApiResponse({ status: 200, description: '보험 설계사 정보 반환', type: AgentResponseDto })
  @ApiResponse({ status: 404, description: '보험 설계사를 찾을 수 없음' })
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: '보험 설계사 정보 업데이트' })
  @ApiResponse({ status: 200, description: '보험 설계사 정보가 성공적으로 업데이트됨', type: AgentResponseDto })
  @ApiResponse({ status: 404, description: '보험 설계사를 찾을 수 없음' })
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '보험 설계사 삭제' })
  @ApiResponse({ status: 200, description: '보험 설계사가 성공적으로 삭제됨' })
  @ApiResponse({ status: 404, description: '보험 설계사를 찾을 수 없음' })
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
