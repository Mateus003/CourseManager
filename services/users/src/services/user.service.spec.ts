import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with hashed password', async () => {
      const userData = { name: 'João', email: 'joao@email.com', password: '123456', role: 'STUDENT' as 'STUDENT' | 'TEACHER' };
      const hashedPassword = 'hashed_password';
      const userMock = { id: '1', ...userData, password: hashedPassword, createdAt: new Date() };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jest.spyOn(prisma.user, 'create').mockResolvedValue(userMock);

      const result = await service.create(userData);
      expect(result).toEqual(userMock);
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { ...userData, password: hashedPassword },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const usersMock = [
        { id: '1', name: 'João', email: 'joao@email.com', password: 'hashed', role: 'STUDENT', createdAt: new Date() },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(usersMock);

      const result = await service.findAll();
      expect(result).toEqual(usersMock);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userMock = { id: '1', name: 'João', email: 'joao@email.com', password: 'hashed', role: 'STUDENT', createdAt: new Date() };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(userMock);

      const result = await service.findOne('1');
      expect(result).toEqual(userMock);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

  });
});