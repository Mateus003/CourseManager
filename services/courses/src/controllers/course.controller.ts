import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CoursesService } from '../services/course.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('course')
  create(
    @Body()
    data: { titulo: string; descricao: string; professorId: string },
  ) {
    return this.coursesService.create(data);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Get('professor/:professorId')
  findByProfessor(@Param('professorId') professorId: string) {
    return this.coursesService.findByProfessor(professorId);
  }
}
