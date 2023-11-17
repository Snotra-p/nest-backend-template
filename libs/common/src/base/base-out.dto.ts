import { ClassConstructor } from 'class-transformer';

export class BaseOutDto {
  static build<T>(this: ClassConstructor<T>, params: Pick<T, keyof T>): T {
    return Object.assign(new this(), params);
  }
}
