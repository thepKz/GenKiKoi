import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  tests: './src/__tests__/**/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:5173',
      show: true,
      browser: 'chromium'
    },
    AI: {
      require: './helpers/ai_helper.ts',
      apiKey: process.env.OPENAI_API_KEY
    }
  },
  include: {
    I: './steps_file.ts'
  },
  name: 'server'
};