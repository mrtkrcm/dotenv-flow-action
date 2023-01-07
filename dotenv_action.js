const fs = require("fs")

let dotenv_action = function (path, node_env) {
  if (!fs.existsSync(path)) {
    throw new Error("file does not exist")
  }

  const dotenvFlow = require("dotenv-flow")

  const dotenv = dotenvFlow.config({
    path: path,
    ignoreProcessEnv: true,
    node_env,
  })

  const dotenv_expand = require("dotenv-expand").expand(dotenv)
  try {
    console.log(
      "loading variables from following files " +
        JSON.stringify(
          // eslint-disable-next-line no-undef
          dotenvFlow.listDotenvFiles(path, { node_env }),
          null,
          2
        )
    )
  } catch (e) {
    console.log(e)
  }

  const returnedMap = {}
  for (const key in dotenv_expand.parsed) {
    const value = dotenv_expand.parsed[key]
    const lowercase_key = key.toLocaleLowerCase()
    returnedMap[lowercase_key] = value
  }
  return returnedMap
}

module.exports = dotenv_action
