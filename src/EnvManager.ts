import {ClassConstructor} from "class-transformer";
import {Env} from "./Env";

export class EnvManager {
  static envs = new Map<any, Env<any>>()

  static getEnv<T extends Record<string, any>>(envClass: ClassConstructor<T>): Env<T> {
    this.load(envClass)
    return this.envs.get(envClass)!;
  }

  static clear(): void {
    this.envs.clear()
  }

  static load(...envClasses: ClassConstructor<Record<string, any>>[]): void {
    for (const envClass of envClasses) {
      let env = this.envs.get(envClass);
      if (env) {
        break;
      }
      env = new Env(envClass);
      this.envs.set(envClass, env);
    }
  }
}
