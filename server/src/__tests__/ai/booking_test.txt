Feature('AI Booking Flow');

Scenario('Complete booking process with AI assistance', async ({ I }) => {
  // Login
  I.amOnPage('/sign-in');
  await I.useAI('login with username');
  await I.useAI('login with password');
  await I.useAI('click login button');
  await I.waitForText('Đăng nhập thành công', 5);

  // Navigate to booking
  await I.useAI('click booking link');
  await I.wait(2000);

  // Fill booking form with AI
  await I.useAI('fill booking form');
  
  // Complete booking
  await I.useAI('click payment button');
  await I.waitForText('Thanh toán thành công', 10);
});