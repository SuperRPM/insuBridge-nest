import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private agentsRepository: Repository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentsRepository.create(createAgentDto);
    return this.agentsRepository.save(agent);
  }

  async findAll(): Promise<Agent[]> {
    return this.agentsRepository.find();
  }

  async findOne(id: number): Promise<Agent> {
    const agent = await this.agentsRepository.findOne({ where: { id } });
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return agent;
  }

  async update(id: number, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const existingAgent = await this.findOne(id);
    Object.assign(existingAgent, updateAgentDto);
    return this.agentsRepository.save(existingAgent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.agentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
  }
}
