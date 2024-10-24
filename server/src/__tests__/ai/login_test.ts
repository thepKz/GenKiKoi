Feature('Login');

Scenario('test login', ({ I }) => {
  I.amOnPage('/login');
  I.fillField('input[name=email]', 'test@example.com');
  I.fillField('input[name=password]', 'password123');
  I.click('button[type=submit]');
  I.see('Welcome');
});