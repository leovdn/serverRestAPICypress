const {
  uniqueNamesGenerator,
  adjectives,
  starWars,
  animals,
} = require("unique-names-generator")

module.exports = {
  createNewEmail() {
    const num = Math.floor(Math.random() * 1000)

    const fullName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      style: "lowerCase",
    })

    return `test-${fullName}${num}@gmail.com`
  },
  createNewName() {
    const num = Math.floor(Math.random() * 1000)

    const fullName = uniqueNamesGenerator({
      dictionaries: [starWars],
      style: "capital",
    })

    return `test-${fullName}${num}`
  },
}
