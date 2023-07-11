import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports:[DrizzleModule],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}
