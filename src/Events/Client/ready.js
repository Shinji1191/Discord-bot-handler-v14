const chalk = require("chalk");
const { default: mongoose } = require("mongoose");
const { table } = require("table");
const { Event } = require("../../Structures/Util/Classes/Event");
const tableConfig = require("../../Structures/Util/Handler/tableConfig");

module.exports = new Event({
  name: "clientReady",
  event: "ready",
  async run(client) {
    let data = [
      ["Client", "Value", "Description"]
    ]

    data.push(
      ["Username", `${chalk.bgGreenBright.bold(client.user.username)}`, "My username"],
      ["Discriminator", `${chalk.bgGreenBright.bold(client.user.discriminator)}`, "My discriminator"],
      ["ID", `${chalk.bgGreenBright.bold(client.user.id)}`, "My ID"],
    )

    if (!client.config.bot.databaseURL) {
      data.push(["Database", `${chalk.bgRedBright.bold("No Connection")}`, "Database connection"])
      return console.log(
        table(data, {
          ...tableConfig,
          header: { content: "Client", alignment: "center" },
        })
      )
    }

    mongoose.connect(client.config.bot.databaseURL).then(() => {
      data.push(
        ["Database", `${chalk.bgGreenBright.bold("Connected")}`, "Database connection"],
      )

      console.log(
        table(data, {
          ...tableConfig,
          header: { content: "Client", alignment: "center" },
        })
      )
    })
  }
})