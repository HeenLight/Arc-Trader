module.exports = {
  name: 'ready',
  once: true,
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute() {
    console.log('I am bot!');

  },
};