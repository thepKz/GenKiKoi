Feature('Register Test');

Scenario('Test register with AI', async ({ I }) => {
  I.amOnPage('/sign-up');
  await I.wait(1000); // Đợi form load
  
  await I.useAI('register with username');
  await I.useAI('register with email'); 
  await I.useAI('register with password');
  await I.useAI('register with confirm password');
  await I.useAI('click register button');

  // Đợi message thành công
  await I.waitForText('Đăng ký thành công!', 10, '.ant-message');
});
