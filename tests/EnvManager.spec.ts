import {Expose} from "class-transformer";
import {IsInt, IsNumber, IsString} from "class-validator";
import {EnvManager} from '../src/EnvManager'

class TestEnv1 {
  @Expose()
  @IsString()
  DB_NAME!: string

  @Expose()
  @IsNumber()
  @IsInt()
  PORT!: number
}

class TestEnv2 {
  @Expose()
  @IsString()
  CLIENT_KEY!: string

  @Expose()
  @IsNumber()
  @IsInt()
  COUNT!: number
}

const originalProcessEnv = {...process.env}

const validVariables = {
  DB_NAME: 'test-name',
  PORT: '3000',
  CLIENT_KEY: 'client-key',
  COUNT: '7'
}

beforeEach(() => {
  EnvManager.clear()
  process.env = {
    ...originalProcessEnv,
    ...validVariables
  }
})

describe('getEnv()', () => {
  it('should return Env class with correct variables', function () {
    const testEnv1 = EnvManager.getEnv(TestEnv1)
    const testEnv2 = EnvManager.getEnv(TestEnv2)

    expect(testEnv1.all()).toEqual({
      DB_NAME: 'test-name',
      PORT: 3000,
    })

    expect(testEnv2.all()).toEqual({
      CLIENT_KEY: 'client-key',
      COUNT: 7
    })
  });

  it('should return same Env class', function () {
    const firstTestEnv = EnvManager.getEnv(TestEnv1)
    const secondTestEnv = EnvManager.getEnv(TestEnv1)

    expect(firstTestEnv).toBe(secondTestEnv)
  });
});

describe('clear()', () => {
  it('should should clear envs', function () {
    const firstTestEnv = EnvManager.getEnv(TestEnv1)
    EnvManager.clear()
    const secondTestEnv = EnvManager.getEnv(TestEnv1)

    expect(firstTestEnv).not.toBe(secondTestEnv)
  });
});

describe('load()', () => {
  it('should load classes', function () {
    EnvManager.load(TestEnv1)
    process.env.DB_NAME = 'other-name'
    const testEnv1 = EnvManager.getEnv(TestEnv1)

    expect(testEnv1.all()).toEqual({
      DB_NAME: 'test-name',
      PORT: 3000,
    })
  });
})
