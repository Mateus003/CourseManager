import { Module } from '@nestjs/common';
import { EnrollmentService } from './services/enrollment.service';
import { PrismaModule } from './prisma/prisma.module';
import {EnrollmentController} from "./controllers/enrollment.controller";

@Module({
  imports: [PrismaModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class AppModule {}
