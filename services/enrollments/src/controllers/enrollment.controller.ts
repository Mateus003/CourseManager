import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';
import { CreateEnrollmentDto } from '../dtos/create-enrollment.dto';

@Controller() 
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @UsePipes(new ValidationPipe()) 
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    const { studentId, courseId } = createEnrollmentDto;
    return this.enrollmentService.create(studentId, courseId);
  }

  @Get('students/:id')
  async getByStudent(@Param('id') studentId: string) {
    return this.enrollmentService.findByStudent(studentId);
  }

  @Get('courses/:id')
  async getByCourse(@Param('id') courseId: string) {
    return this.enrollmentService.findByCourse(courseId);
  }
}