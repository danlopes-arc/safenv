import {ClassConstructor} from "class-transformer";
import {Env} from "./Env";

export class EnvManager {
  static envs = new Map<any, Env<any>>()

  static getEnv<T extends Record<string, any>>(envClass: ClassConstructor<T>): Env<T> {
    let env = this.envs.get(envClass);
    if (env) {
      return env as Env<T>;
    }
    env = new Env(envClass);
    this.envs.set(envClass, env);
    return env;
  }
}
