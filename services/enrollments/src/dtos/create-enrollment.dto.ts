import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID() 
  studentId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}