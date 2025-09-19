import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'; 
import { CoursesService } from '../services/course.service';
import { CreateCourseDto } from '../dtos/create-course.dto';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() data: CreateCourseDto) {
    return this.coursesService.create(data);
  }

  @Get()
  find(@Query('teacherId') teacherId?: string) {
    if (teacherId) {
      return this.coursesService.findByProfessor(teacherId);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }
}