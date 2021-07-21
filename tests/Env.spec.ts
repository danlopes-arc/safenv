import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Env} from "../src/Env";
import {Expose} from "class-transformer";

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

const originalProcessEnv = {...process.env}

beforeEach(() => {
  process.env = {...originalProcessEnv}
})

const validVariables = {
  DB_NAME: 'test-name',
  PORT: '3000',
}

describe('constructor', () => {
  it('should create if valid', function () {
    process.env = {
      ...process.env,
      ...validVariables
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

describe('all method', () => {
  it('should populate class correctly', function () {
    process.env = {
      ...process.env,
      ...validVariables
    }

    const env = new Env(TestEnv)
    const all = env.all()

    const expected = {
      DB_NAME: 'test-name',
      PORT: 3000,
    }

    expect(all).toEqual(expected)
  });

  it('should return a copy', function () {
    process.env = {
      ...process.env,
      ...validVariables
    }

    const env = new Env(TestEnv)
    const firstAll = env.all()
    const secondAll = env.all()

    expect(firstAll).not.toBe(secondAll)
  });
})

describe('get method', () => {
  it('should return correct value', function () {
    process.env = {
      ...process.env,
      ...validVariables
    }

    const env = new Env(TestEnv)

    const dbName = env.get('DB_NAME')
    const port = env.get('PORT')
    const type = env.get('TYPE')

    expect(dbName).toBe('test-name')
    expect(port).toBe(3000)
    expect(type).not.toBeDefined()
  });
})
