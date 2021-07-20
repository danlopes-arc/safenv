import {ClassConstructor} from "class-transformer";
import {Env} from "./Env";

const envs = new Map<any, Env<any>>()

export function env<T extends Record<string, any>>(envClass: ClassConstructor<T>): Env<T> {
  let env = envs.get(envClass);
  if (env) {
    return env as Env<T>;
  }
  env = new Env(envClass);
  envs.set(envClass, env);
  return env;
}
