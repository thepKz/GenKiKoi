Feature('Login');

Scenario('Test login with AI', async ({ I }) => {
  I.amOnPage('/login');
  
  // Sử dụng AI để tìm và điền form
  await I.useAI('Find email input and type test@example.com');
  await I.useAI('Find password field and type password123');
  await I.useAI('Click the login button');

  // Verify
  I.see('Welcome');
});