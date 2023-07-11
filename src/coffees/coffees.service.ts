import { HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { MYSQL_CONNECTION } from 'src/constants';

@Injectable()
export class CoffeesService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: any) {}
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];
  create(createCoffeeDto: CreateCoffeeDto) {
    const newCoffee = { id: this.coffees.length + 1, ...createCoffeeDto };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  findAll() {
    // findAll(limit, offset) {
    // return this.coffees;
    return this.conn.query.countries.findMany();
  }

  findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      return 'May be updated';
    }
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
    return `This action removes a #${id} coffee`;
  }
}
