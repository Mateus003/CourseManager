import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        {
          provide: PrismaService,
          useValue: {
            enrollment: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EnrollmentService>(EnrollmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an enrollment', async () => {
      const studentId = 'student1';
      const courseId = 'course1';
      const enrollmentMock = { id: '1', studentId, courseId, date: new Date() };

      jest.spyOn(prisma.enrollment, 'create').mockResolvedValue(enrollmentMock);

      const result = await service.create(studentId, courseId);
      expect(result).toEqual(enrollmentMock);
      expect(prisma.enrollment.create).toHaveBeenCalledWith({
        data: { studentId, courseId },
      });
    });
  });

  describe('findByStudent', () => {
    it('should return enrollments for a student', async () => {
      const studentId = 'student1';
      const enrollmentsMock = [
        { id: '1', studentId, courseId: 'course1', date: new Date() },
        { id: '2', studentId, courseId: 'course2', date: new Date() },
      ];

      jest.spyOn(prisma.enrollment, 'findMany').mockResolvedValue(enrollmentsMock);

      const result = await service.findByStudent(studentId);
      expect(result).toEqual(enrollmentsMock);
      expect(prisma.enrollment.findMany).toHaveBeenCalledWith({
        where: { studentId },
      });
    });

    it('should throw NotFoundException if no enrollments found', async () => {
      jest.spyOn(prisma.enrollment, 'findMany').mockResolvedValue([]);

      await expect(service.findByStudent('unknownStudent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByCourse', () => {
    it('should return enrollments for a course', async () => {
      const courseId = 'course1';
      const enrollmentsMock = [
        { id: '1', studentId: 'student1', courseId, date: new Date() },
        { id: '2', studentId: 'student2', courseId, date: new Date() },
      ];

      jest.spyOn(prisma.enrollment, 'findMany').mockResolvedValue(enrollmentsMock);

      const result = await service.findByCourse(courseId);
      expect(result).toEqual(enrollmentsMock);
      expect(prisma.enrollment.findMany).toHaveBeenCalledWith({
        where: { courseId },
      });
    });

    it('should throw NotFoundException if no enrollments found', async () => {
      jest.spyOn(prisma.enrollment, 'findMany').mockResolvedValue([]);

      await expect(service.findByCourse('unknownCourse')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
