import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Login Page @smoke', () => {

  test('should display login form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.assertVisible(loginPage.emailInput);
    await loginPage.assertVisible(loginPage.passwordInput);
    await loginPage.assertVisible(loginPage.loginButton);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@test.com', 'wrongpassword');
    const errorVisible = await loginPage.isErrorVisible();
    expect(errorVisible).toBeTruthy();
  });

  test('should have correct page title', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const title = await loginPage.getTitle();
    expect(title).toContain('Automation Exercise');
  });

});
