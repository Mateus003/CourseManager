import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/course.controller';
import { CoursesService } from './services/course.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class AppModule {}
