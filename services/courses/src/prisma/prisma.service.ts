import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // abre a conexão quando o módulo sobe
  }

  async onModuleDestroy() {
    await this.$disconnect(); // fecha a conexão quando o módulo cai
  }
}
