test("test runs with custom path", () => {
  const dotenv_action = require("./dotenv_action")
  expect(dotenv_action("fixtures/")).toEqual({ fixtures_1: "123" })
})

test("test runs with different path", () => {
  const dotenv_action = require("./dotenv_action")
  expect(dotenv_action("fixtures/another/")).toEqual({
    fixtures_2: "xyz",
    other_key: "this",
  })
})

test("test runs with broken path", () => {
  const dotenv_action = require("./dotenv_action")
  expect(() => {
    dotenv_action("nosuchfile")
  }).toThrow(Error)
})

test("test runs with expanded values", () => {
  const dotenv_action = require("./dotenv_action")
  expect(dotenv_action("fixtures/expand")).toEqual({
    fixtures_3: "xyz",
    expanded: "123-xyz",
    expanded_2: "123-xyz",
  })
})

test("test runs with flowed files", () => {
  const dotenv_action = require("./dotenv_action")
  expect(dotenv_action("fixtures/flow/")).toEqual({
    flow_env: "true",
    test_file_path: ".env.test",
  })
})
