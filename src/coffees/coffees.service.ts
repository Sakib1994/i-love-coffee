import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((flavor) => this.preloadFlavorByName(flavor)),
    );
    const newCoffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    console.debug(newCoffee);
    return this.coffeeRepository.save(newCoffee);
  }

  findAll() {
    return this.coffeeRepository.find({ relations: ['flavors'] });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((flavor) => this.preloadFlavorByName(flavor)),
    );
    const existingCoffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!existingCoffee) {
      throw new NotFoundException(`There is no Coffee having #${id} index`);
    }
    return this.coffeeRepository.save(existingCoffee);
  }

  async remove(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id });
    if (!coffee) throw new NotFoundException(`No such Coffee to delete`);
    return this.coffeeRepository.remove(coffee);
  }
  async getFlavorFromDb(name: string) {
    return await this.preloadFlavorByName(name);
  }
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) return existingFlavor;
    return this.flavorRepository.create({ name });
  }
}
