import { Module } from '@nestjs/common';
import { typeormUserRepository } from '../user.repository.interface';

@Module({
  providers: [typeormUserRepository],
  exports: [typeormUserRepository],
})
export class TypeormUserModule {}
