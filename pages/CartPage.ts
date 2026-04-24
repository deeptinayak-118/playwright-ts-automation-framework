import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly path = '/view_cart';

  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly proceedToCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.proceedToCheckout = page.getByText('Proceed To Checkout');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async isCartEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }

  async getItemName(index: number): Promise<string> {
    const row = this.cartItems.nth(index);
    return (await row.locator('.cart_description h4 a').textContent()) ?? '';
  }

  async getItemPrice(index: number): Promise<string> {
    const row = this.cartItems.nth(index);
    return (await row.locator('.cart_price p').textContent()) ?? '';
  }

  async getItemQuantity(index: number): Promise<string> {
    const row = this.cartItems.nth(index);
    return (await row.locator('.cart_quantity button').textContent()) ?? '';
  }

  async removeItem(index: number): Promise<void> {
    const row = this.cartItems.nth(index);
    await row.locator('.cart_quantity_delete').click();
  }

  async assertItemCount(expected: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expected);
  }
}
