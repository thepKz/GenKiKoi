import * as dotenv from 'dotenv';
dotenv.config();

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const config = {
  tests: './src/__tests__/**/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://staginggenkikoi.netlify.app',
      // url: 'http://localhost:5173',
      show: true,
      browser: 'chromium',
      waitForTimeout: 2000,
      waitForNavigation: "networkidle",
      waitForAction: 100
    },
    AIHelper: {
      require: './src/ai_helper.ts',
      apiKey: process.env.OPENAI_API_KEY
    }
  },
  include: {
    I: './steps_file.ts'
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 3
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    heal: {
      enabled: true,
      debug: true,
      skipElements: ['button[type=submit]'], // bỏ qua một số elements
      locatorStrategy: {
        getByRole: true,
        getByLabel: true,
        getByPlaceholder: true,
        getByText: true,
        getByTestId: true,
      }
    }
  },
  ai: {
    request: async (messages) => {
      const OpenAI = require('openai');
      const openai = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 1000,
        temperature: 0.7
      });

      return completion?.choices[0]?.message?.content;
    }
  }
};
