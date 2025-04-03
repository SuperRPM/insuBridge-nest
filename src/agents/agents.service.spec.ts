import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentsService } from './agents.service';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { NotFoundException } from '@nestjs/common';

describe('AgentsService', () => {
  let service: AgentsService;
  let repository: Repository<Agent>;

  const mockAgent = {
    id: 1,
    name: '김보험',
    phoneNumber: '010-1234-5678',
    email: 'kim@insurance.com',
    connectedCustomersCount: 0,
    successfulContractsCount: 0,
    expertise: '자동차보험',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => ({ ...dto, id: 1 })),
    save: jest.fn().mockImplementation((agent) => Promise.resolve(agent)),
    find: jest.fn().mockResolvedValue([mockAgent]),
    findOne: jest.fn().mockResolvedValue(mockAgent),
    delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentsService,
        {
          provide: getRepositoryToken(Agent),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AgentsService>(AgentsService);
    repository = module.get<Repository<Agent>>(getRepositoryToken(Agent));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new agent', async () => {
      const createAgentDto: CreateAgentDto = {
        name: '김보험',
        phoneNumber: '010-1234-5678',
        email: 'kim@insurance.com',
        expertise: '자동차보험',
      };

      const result = await service.create(createAgentDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(createAgentDto.name);
      expect(result.phoneNumber).toBe(createAgentDto.phoneNumber);
      expect(result.email).toBe(createAgentDto.email);
      expect(result.expertise).toBe(createAgentDto.expertise);
      expect(repository.create).toHaveBeenCalledWith(createAgentDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of agents', async () => {
      const result = await service.findAll();

      expect(result).toEqual([mockAgent]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single agent', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(mockAgent);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when agent not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an agent', async () => {
      const updateAgentDto: UpdateAgentDto = {
        name: '김보험(수정)',
        expertise: '생명보험',
      };

      const result = await service.update(1, updateAgentDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(updateAgentDto.name);
      expect(result.expertise).toBe(updateAgentDto.expertise);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when updating non-existent agent', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an agent', async () => {
      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when removing non-existent agent', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 0, raw: {} });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
