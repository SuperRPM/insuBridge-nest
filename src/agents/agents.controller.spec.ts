import { Test, TestingModule } from '@nestjs/testing';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { NotFoundException } from '@nestjs/common';

describe('AgentsController', () => {
  let controller: AgentsController;
  let service: AgentsService;

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

  const mockAgentsService = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ ...dto, id: 1 })),
    findAll: jest.fn().mockResolvedValue([mockAgent]),
    findOne: jest.fn().mockResolvedValue(mockAgent),
    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ ...mockAgent, ...dto })),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentsController],
      providers: [
        {
          provide: AgentsService,
          useValue: mockAgentsService,
        },
      ],
    }).compile();

    controller = module.get<AgentsController>(AgentsController);
    service = module.get<AgentsService>(AgentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new agent', async () => {
      const createAgentDto: CreateAgentDto = {
        name: '김보험',
        phoneNumber: '010-1234-5678',
        email: 'kim@insurance.com',
        expertise: '자동차보험',
      };

      const result = await controller.create(createAgentDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(createAgentDto.name);
      expect(result.phoneNumber).toBe(createAgentDto.phoneNumber);
      expect(result.email).toBe(createAgentDto.email);
      expect(result.expertise).toBe(createAgentDto.expertise);
      expect(service.create).toHaveBeenCalledWith(createAgentDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of agents', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockAgent]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single agent', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(mockAgent);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when agent not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an agent', async () => {
      const updateAgentDto: UpdateAgentDto = {
        name: '김보험(수정)',
        expertise: '생명보험',
      };

      const result = await controller.update('1', updateAgentDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(updateAgentDto.name);
      expect(result.expertise).toBe(updateAgentDto.expertise);
      expect(service.update).toHaveBeenCalledWith(1, updateAgentDto);
    });

    it('should throw NotFoundException when updating non-existent agent', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.update('999', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an agent', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when removing non-existent agent', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
