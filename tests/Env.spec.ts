import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Env} from "../src/Env";
import {Expose} from "class-transformer";
import 'reflect-metadata'

class TestEnv {
  @Expose()
  @IsString()
  DB_NAME!: string

  @Expose()
  @IsNumber()
  @IsInt()
  PORT!: number

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  TYPE?: string
}

describe('constructor', () => {
  it('should create if valid', function () {
    process.env = {
      ...process.env,
      DB_NAME: 'test-name',
      PORT: '3000',
    }
    expect(() => new Env(TestEnv)).not.toThrowError()
  });

  it('should throw if invalid', function () {
    process.env = {
      ...process.env,
      DB_NAME: 'test-name',
      PORT: 'not-a-number',
    }
    expect(() => new Env(TestEnv)).toThrowError()
  });

  it('should throw if variable does not exist', function () {
    process.env = {
      ...process.env,
      DB_NAME: 'test-name',
      PORT: undefined,
    }
    expect(() => new Env(TestEnv)).toThrowError()
  });
})

//// all
// should populate class correctly
// should not have extra properties

//// get
// should return correct value
