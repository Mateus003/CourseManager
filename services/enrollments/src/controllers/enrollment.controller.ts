// src/controllers/enrollment.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';

@Controller('matriculas')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('matricula')
  async create(@Body() body: { studentId: string; courseId: string }) {
    const { studentId, courseId } = body;
    return this.enrollmentService.create(studentId, courseId);
  }

  @Get('aluno/:id')
  async getByStudent(@Param('id') studentId: string) {
    return this.enrollmentService.findByStudent(studentId);
  }

  @Get('curso/:id')
  async getByCourse(@Param('id') courseId: string) {
    return this.enrollmentService.findByCourse(courseId);
  }
}
