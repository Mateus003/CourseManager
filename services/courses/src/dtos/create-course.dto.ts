// Em /services/courses/src/dtos/create-course.dto.ts

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  // Usar IsUUID é uma boa prática se o ID do professor for um UUID
  @IsUUID() 
  @IsNotEmpty()
  professorId: string;
}