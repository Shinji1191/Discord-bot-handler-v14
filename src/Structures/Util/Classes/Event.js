/**
 * @template {keyof import("discord.js").ClientEvents} Key
 */
class Event {
  /**
   * 
   * @param {import("../Typescript/EventType").EventType<Key>} options 
   */
  constructor(options) {
    Object.assign(this, options);
  }
}

module.exports = { Event }