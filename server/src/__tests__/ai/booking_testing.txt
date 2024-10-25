Feature('Booking Test');

Scenario('Test booking with AI', async ({ I }) => {
  // Login first
  I.amOnPage('/sign-in');
  await I.useAI('login with username');
  await I.useAI('login with password');
  await I.useAI('click login button');
  await I.waitForText('Đăng nhập thành công', 5, '.ant-message');
    
  // Navigate to booking
  await I.useAI('click booking link');
  await I.wait(2000);

  // Let AI fill the entire form
  await I.useAI('fill booking form');
  
  // Submit form
  await I.useAI('click payment button');
  await I.waitForText('Thanh toán thành công', 10, '.ant-message');
});
