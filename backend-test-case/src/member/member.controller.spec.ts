// import { Test, TestingModule } from '@nestjs/testing';
// import { MemberController } from './member.controller';
// import { MemberService } from './member.service';
// import { PrismaService } from '../../src/prisma/prisma/prisma.service';

// describe('MemberController', () => {
//   let controller: MemberController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MemberController],
//       providers: [MemberService, PrismaService],
//     }).compile();

//     controller = module.get<MemberController>(MemberController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import CreateMemberDto from './dto/create-member.dto';

describe('MemberController', () => {
  let controller: MemberController;
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a member and return success message', async () => {
      const createMemberDto: CreateMemberDto = { name: 'John Doe' };
      const createdMember = {
        id: 1,
        name: 'John Doe',
        code: 'M001',
        penaltyEnds: null,
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdMember);

      const result = await controller.create(createMemberDto);

      expect(service.create).toHaveBeenCalledWith(createMemberDto);
      expect(result).toEqual({
        message: 'create member successfully',
        data: createdMember,
      });
    });
  });

  describe('findAll', () => {
    it('should return all members with a success message', async () => {
      const members = [
        {
          id: 1,
          name: 'John Doe',
          code: 'M001',
          penaltyEnds: null,
          _count: { borrows: 0 },
        },
        {
          id: 2,
          name: 'Jane Doe',
          code: 'M002',
          penaltyEnds: null,
          _count: { borrows: 0 },
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(members);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'get all members successfully!',
        data: members,
      });
    });
  });
});
