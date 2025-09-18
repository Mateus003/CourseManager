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
     const course = await this.prisma.course.findUnique({
     where: { id },
    }); 

  // const professor = await this.httpService.get(`localhost:3002/professores/${course.professorId}`)

    return course;
  }

  async findByProfessor(professorId: string) {
    return this.prisma.course.findMany({
      where: { professorId },
    });
  }
}
