const tableConfig = require("./tableConfig");
const { promisify } = require("util");
const { table } = require("table");
const { glob } = require("glob");
const chalk = require("chalk");
const ExtendedClient = require("../../Client/Client");
const globPromise = promisify(glob);

/**
 * @param {import("../../Client/Client")} client
 */
module.exports = async (client) => {
  let slashArray = []

  const prefixCommandData = [
    ["Name", "Description", "Category", "Server Only", "Status"],
  ];

  const slashCommandData = [
    ["Name", "Description", "Category", "Server Only", "Status"],
  ];

  const prefixCommandDirectory = await globPromise(
    `${__dirname}/../../../Commands/**/*.js`
  );
  const slashCommandDirectory = await globPromise(
    `${__dirname}/../../../SlashCommands/**/*.js`
  );
  const eventDirectory = await globPromise(
    `${__dirname}/../../../Events/**/*.js`
  );

  prefixCommandDirectory.forEach((filePath) => {
    /** @type {import("../Typescript/CommandType").CommandType} */
    let file = require(filePath);
    let splitted = filePath.split("/");
    let directory = splitted[splitted.length - 2];

    if (!file?.name) return;

    if (file.name) {
      let properties = { ...file, directory };
      client.commands.set(file.name, properties);
      prefixCommandData.push([
        `${file.name}`,
        `${file.description}`,
        `${file.category}`,
        `${file.config?.guildOnly ? "Yes" : "No"}`,
        `${chalk.bgGreenBright.bold("Loaded")}`,
      ]);
    }

    if (file.aliases && Array.isArray(file.aliases))
      file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
  });

  console.log(
    table(prefixCommandData, {
      ...tableConfig,
      header: { content: "Prefix Commands", alignment: "center" },
    })
  );

  slashCommandDirectory.forEach((filePath) => {
    /** @type {import("../Typescript/SlashType").SlashCommandType} */
    let file = require(filePath);
    let splitted = filePath.split("/");
    let directory = splitted[splitted.length - 2];

    if (!file?.name) return;

    if (file.name) {
      let properties = { ...file, directory };
      client.slashCommands.set(file.name, properties);
      slashCommandData.push([
        `${file.name}`,
        `${file.description}`,
        `${file.category}`,
        `${file.config?.guildOnly ? "Yes" : "No"}`,
        `${chalk.bgGreenBright.bold("Loaded")}`,
      ]);
      slashArray.push(file)
    }
  });

  console.log(
    table(slashCommandData, {
      ...tableConfig,
      header: { content: "Slash Commands", alignment: "center" },
    })
  )

  client.on("ready", async () => {
    await registerCommands(client, { commands: slashArray.filter((file) => !file.config?.guildOnly) })
    if (client.config.developer.privateServerID) await registerCommands(client, { commands: slashArray, guild: client.config.developer.privateServerID })
  })

  eventDirectory.forEach((filePath) => {
    /**
     * @type {import("../Typescript/EventType").EventType<keyof import("discord.js").ClientEvents>}
     */
    let file = require(filePath);

    if (!file?.name) return;

    if (file.event) {
      if (file?.once) client.once(file.event, file.run.bind(null, client));
      else client.on(file.event, file.run.bind(null, client));
    }
  });
};

/**
 * @param {ExtendedClient} client 
 */
async function registerCommands(client, { commands, guild }) {
  if (guild) {
    let server = await client.guilds.fetch(guild)

    if (!server) return

    await server?.commands.set(commands)
  } else {
    await client.application?.commands.set(commands)
  }
}
