/// <reference path="../../../steps.d.ts" />

Feature('Login Test');

Scenario('Test login with AI', async ({ I }) => {
  I.amOnPage('/sign-in');
  
  await I.useAI('login with username');
  await I.useAI('login with password');
  await I.useAI('click login button');
  
  // Đợi message hiển thị
  await I.waitForText('Đăng nhập thành công', 5, '.ant-message');
});
