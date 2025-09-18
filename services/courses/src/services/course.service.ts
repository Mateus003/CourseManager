import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { titulo: string; descricao: string; professorId: string }) {
    return this.prisma.course.create({
      data,
    });
  }

  async findById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        professor: true, 
      },
    });
  }

  async findByProfessor(professorId: string) {
    return this.prisma.course.findMany({
      where: { professorId },
    });
  }
}
