import {ClassConstructor, plainToClass} from "class-transformer";
import {validateSync} from "class-validator";

export class Env<T extends Record<string, any>> {
  private environment: T;

  constructor(envClass: ClassConstructor<T>) {
    const environment = plainToClass(envClass, process.env, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    const errors = validateSync(environment);

    if (errors.length) {
      const errorDescription = errors
        .map((e) => `${e.property}: ${Object.getOwnPropertyNames(e.constraints).join(', ',)}`)
        .join('\n');

      throw `\n[Environment Error] Variables failed the following validation constraints\n${errorDescription}\n`;
    }

    this.environment = environment;
  }

  all(): T {
    return this.environment;
  }

  get<K extends keyof T>(key: K): T[K] {
    return null as any
  }
}
