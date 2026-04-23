import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly path = '/login';

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText(/Your email or password is incorrect/i);
    this.signupLink = page.getByRole('link', { name: /signup/i });
  }

  async login(email: string, password: string): Promise<void> {
    await this.safeFill(this.emailInput, email);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
