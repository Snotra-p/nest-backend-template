import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = Symbol('isPublic');
export const Public = (): CustomDecorator<symbol> =>
  SetMetadata(IS_PUBLIC_KEY, true);
