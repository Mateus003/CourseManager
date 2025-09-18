import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const courseData = { titulo: 'Curso 1', descricao: 'Descrição', professorId: '123' };
      const courseMock = { 
        id: '1', 
        ...courseData, 
        criadoEm: new Date(), 
      };

      jest.spyOn(prisma.course, 'create').mockResolvedValue(courseMock);

      const result = await service.create(courseData);
      expect(result).toEqual(courseMock);
      expect(prisma.course.create).toHaveBeenCalledWith({ data: courseData });
    });
  });

  describe('findById', () => {
    it('should return a course by id', async () => {
      const courseMock = { 
        id: '1', 
        titulo: 'Curso 1', 
        descricao: 'Desc', 
        professorId: '123', 
        criadoEm: new Date(),
      };
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(courseMock);

      const result = await service.findById('1');
      expect(result).toEqual(courseMock);
      expect(prisma.course.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('findByProfessor', () => {
    it('should return courses by professorId', async () => {
      const coursesMock = [
        { 
          id: '1', 
          titulo: 'Curso 1', 
          descricao: 'Desc', 
          professorId: '123', 
          criadoEm: new Date(), 
        },
      ];
      jest.spyOn(prisma.course, 'findMany').mockResolvedValue(coursesMock);

      const result = await service.findByProfessor('123');
      expect(result).toEqual(coursesMock);
      expect(prisma.course.findMany).toHaveBeenCalledWith({ where: { professorId: '123' } });
    });
  });
});
