class PrefixCommand {
  /**
   * @param {import("../Typescript/CommandType").CommandType} options 
   */
  constructor(options) {
    Object.assign(this, options);
  }
}

class SlashCommand {
  /**
   * @param {import("../Typescript/SlashType").SlashCommandType} options 
   */
  constructor(options) {
    Object.assign(this, options);
  }
}

module.exports = { PrefixCommand, SlashCommand };