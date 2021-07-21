import {EnvManager} from '../src/EnvManager'
import {env} from '../src'

class TestEnv {
}

describe('env()', () => {
  it('should return same Env class as EnvManager.getEnv()', function () {
    const envFromFunction = env(TestEnv)
    const envFromClass = EnvManager.getEnv(TestEnv)

    expect(envFromFunction).toBe(envFromClass)
  });
})
