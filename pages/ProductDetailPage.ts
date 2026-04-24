import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly path = '/product_details/1';

  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly productCategory: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability' });
    this.productCondition = page.locator('.product-information p').filter({ hasText: 'Condition' });
    this.productBrand = page.locator('.product-information p').filter({ hasText: 'Brand' });
    this.productCategory = page.locator('.product-information p').filter({ hasText: 'Category' });
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.clear();
    await this.quantityInput.fill(qty.toString());
  }

  async addToCart(): Promise<void> {
    await this.safeClick(this.addToCartButton);
  }
}
