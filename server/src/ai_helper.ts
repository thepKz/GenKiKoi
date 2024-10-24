const Helper = require('@codeceptjs/helper');
const { Configuration, OpenAIApi } = require('openai');

class AIHelper extends Helper {
  constructor(config : any) {
    super(config);
    const configuration = new Configuration({
      apiKey: config.apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async useAI(description: string) {
    const { page } = this.helpers.Playwright;
    console.log(`AI attempting to: ${description}`);
    // Implement AI logic here
  }
}

module.exports = AIHelper;