import Helper from '@codeceptjs/helper';
import { OpenAI } from 'openai';

class AIHelper extends Helper {
  openai: OpenAI;
  credentials: any;

  constructor(config: any) {
    super(config);
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.credentials = {
      username: `testuser${Date.now()}`,
      email: `testuser${Date.now()}@gmail.com`,
      password: 'Test123@'
    };
  }

  async useAI(description: string) {
  try {
    const { page } = this.helpers.Playwright;
    console.log(`AI attempting to: ${description}`);

    if (description === 'fill booking form') {
      try {
        // Wait for form to be fully loaded
        await page.waitForSelector('.ant-select', { state: 'visible', timeout: 10000 });
        await page.waitForTimeout(2000);

        // Fill service type
        await page.locator('.ant-select').first().click();
        await page.waitForTimeout(500);
        await page.locator('.ant-select-item-option-content:has-text("Siêu âm")').click();
        await page.waitForTimeout(1000);

        // Fill doctor selection
        await page.locator('.ant-select').nth(1).click();
        await page.waitForTimeout(500);
        await page.locator('.ant-select-item-option-content:has-text("Bs. Đỗ Thị Mỹ Uyên")').click();
        await page.waitForTimeout(1000);

        // Fill consulting type
        await page.locator('.ant-select').nth(2).click();
        await page.waitForTimeout(500);
        await page.locator('.ant-select-item-option-content:has-text("Tại Phòng Khám")').click();
        await page.waitForTimeout(1000);

        // Wait for calendar to load after doctor selection
        await page.waitForSelector('.ant-picker-calendar', { timeout: 10000 });
        await page.waitForTimeout(1000);

        // Find and click first available date (not disabled)
        const availableDate = await page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled)').first();
        if (await availableDate.isVisible()) {
          await availableDate.click();
          await page.waitForTimeout(1000);

          // Wait for time slots to appear and select first available slot
          await page.waitForSelector('.ant-card:not(.opacity-50)', { timeout: 5000 });
          await page.locator('.ant-card:not(.opacity-50)').first().click();
        } else {
          throw new Error('No available dates found in calendar');
        }

        // Fill reason
        await page.locator('textarea[placeholder="Lý do khám"]').fill('Khám sức khỏe định kỳ cho cá Koi');
        await page.waitForTimeout(1000);

      } catch (error) {
        console.error('Failed to fill booking form:', error);
        throw error;
      }
    } else {
      // Các case khác giữ nguyên
      if (description === 'login with username') {
        await page.fill('input[placeholder="Email"]', 'gemixdecor1');
      }
      else if (description === 'login with password') {
        await page.fill('input[placeholder="Mật khẩu"]', 'Gemixdecor1@');
      }
      else if (description.includes('click login')) {
        await page.click('.ant-btn:has-text("Đăng nhập")');
      }
      else if (description === 'click booking link') {
        await page.waitForTimeout(2000);
        await page.click('a[href="/booking"]', {
          timeout: 5000,
          force: true
        });
      }
      else if (description === 'click payment button') {
        await page.click('button:has-text("Thanh toán")');
        await page.waitForTimeout(2000);
      }
      // Register cases
      else if (description === 'register with username') {
        await page.fill('input[placeholder="Tên tài khoản"]', this.credentials.username);
        await page.waitForTimeout(500);
      }
      else if (description === 'register with email') {
        await page.fill('input[placeholder="Email"]', this.credentials.email);
        await page.waitForTimeout(500);
      }
      else if (description === 'register with password') {
        await page.fill('input[placeholder="Mật khẩu"]', this.credentials.password);
        await page.waitForTimeout(500);
      }
      else if (description === 'register with confirm password') {
        await page.fill('input[placeholder="Xác nhận mật khẩu"]', this.credentials.password);
        await page.waitForTimeout(500);
      }
      else if (description === 'click register button') {
        await page.click('button:has-text("Đăng ký")');
        // Đợi API response
        await page.waitForTimeout(2000);
        // Đợi message hiển thị
        await page.waitForSelector('.ant-message', { timeout: 5000 });
      }
    }
    // Add delay between test cases
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');

  } catch (error) {
    console.error('Action error:', error);
    throw error;
  }
}
}

module.exports = AIHelper;
