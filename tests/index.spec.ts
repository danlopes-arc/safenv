import {greet} from "../src";

it('should greet', function () {
  const greeting = greet('Afonso')
  expect(greeting).toBe('Hello, Afonso')
});
