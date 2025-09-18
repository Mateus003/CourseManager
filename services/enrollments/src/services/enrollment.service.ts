import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(studentId: string, courseId: string) {
    try {
      return await this.prisma.enrollment.create({
        data: { studentId, courseId },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByStudent(studentId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { studentId },
    });

    if (!enrollments.length) {
      throw new NotFoundException('Nenhuma matrícula encontrada para este aluno');
    }

    return enrollments;
  }

  async findByCourse(courseId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { courseId },
    });

    if (!enrollments.length) {
      throw new NotFoundException('Nenhuma matrícula encontrada para este curso');
    }

    return enrollments;
  }
}