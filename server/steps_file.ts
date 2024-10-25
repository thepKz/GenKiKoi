const { I } = inject();

export = function() {
  return actor({
    // Add custom steps here
    async waitAndSay(message: string, delay = 500) {
      await this.wait(delay);
      this.say(message);
    },

    // Add a general wait function
    async wait(time: number) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
  });
}