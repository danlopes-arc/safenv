import {ClassConstructor} from "class-transformer";
import {Env} from "./Env";
import {EnvManager} from "./EnvManager";

export function env<T extends Record<string, any>>(envClass: ClassConstructor<T>): Env<T> {
  return EnvManager.getEnv(envClass)
}
