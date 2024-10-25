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
        // Yêu cầu GPT trả về JSON cụ thể
        const completion = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system", 
            content: "You are a medical booking assistant. Return ONLY a JSON object with these exact fields in Vietnamese: {service: string, doctor: string, consultingType: string, address: string, reason: string}"
          }, {
            role: "user",
            content: "Generate medical booking details"
          }],
          temperature: 0.3 // Giảm temperature để output ổn định hơn
        });

        // Log response để debug
        console.log('GPT Response:', completion.choices[0].message.content);

        try {
          const formData = JSON.parse(completion.choices[0].message.content);
          
          // Validate dữ liệu
          if (!formData.address || !formData.reason) {
            throw new Error('Missing required fields from AI response');
          }

          // Fill service
          await page.click('.ant-select-selector');
          await page.waitForTimeout(1000);
          await page.click('.ant-select-item-option:first-child');
          
          // Fill doctor
          await page.click('form .ant-select-selector:nth-child(2)');
          await page.waitForTimeout(1000); 
          await page.click('.ant-select-item-option:first-child');

          // Fill consulting type
          await page.click('form .ant-select-selector:nth-child(3)');
          await page.waitForTimeout(1000);
          await page.click('.ant-select-item-option:first-child');

          // Select date
          await page.click('.ant-picker-cell-in-view:not(.ant-picker-cell-disabled)');
          await page.waitForTimeout(1000);

          // Select time slot
          await page.click('.ant-card:first-child');
          await page.waitForTimeout(1000);

          // Fill address & reason
          await page.fill('input[placeholder="Nhập địa chỉ"]', formData.address);
          await page.waitForTimeout(1000);
          await page.click('.ant-select-item:first-child');
          await page.fill('textarea[placeholder="Lý do khám"]', formData.reason);

        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          // Fallback values
          await page.fill('input[placeholder="Nhập địa chỉ"]', '123 Nguyễn Văn Linh');
          await page.waitForTimeout(1000);
          await page.click('.ant-select-item:first-child');
          await page.fill('textarea[placeholder="Lý do khám"]', 'Khám sức khỏe định kỳ');
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

      await page.waitForLoadState('networkidle');

    } catch (error) {
      console.error('Action error:', error);
      throw error;
    }
  }
}

module.exports = AIHelper;
