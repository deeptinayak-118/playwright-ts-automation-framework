import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly path = '/products';

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly allProductsTitle: Locator;
  readonly productCards: Locator;
  readonly firstViewProduct: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.allProductsTitle = page.getByRole('heading', { name: 'All Products' });
    this.productCards = page.locator('.features_items .col-sm-4');
    this.firstViewProduct = page.locator('.choose a').first();
  }

  async searchProduct(query: string): Promise<void> {
    await this.safeFill(this.searchInput, query);
    await this.safeClick(this.searchButton);
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async viewFirstProduct(): Promise<void> {
    await this.safeClick(this.firstViewProduct);
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const product = this.productCards.nth(index);
    await product.hover();
    const addToCartBtn = product.locator('.add-to-cart').first();
    await addToCartBtn.click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async goToCart(): Promise<void> {
    await this.page.getByText('View Cart').click();
  }
}
