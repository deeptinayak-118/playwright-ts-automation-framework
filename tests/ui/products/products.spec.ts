import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/ProductsPage';
import { ProductDetailPage } from '../../../pages/ProductDetailPage';

test.describe('Products Page @smoke', () => {

  test('should display all products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.assertVisible(productsPage.allProductsTitle);
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should search for a product', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.searchProduct('Top');
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to product detail page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.viewFirstProduct();
    const detailPage = new ProductDetailPage(page);
    const name = await detailPage.getProductName();
    expect(name.length).toBeGreaterThan(0);
  });

  test('should display product details correctly', async ({ page }) => {
    const detailPage = new ProductDetailPage(page);
    await detailPage.goto();
    await detailPage.assertVisible(detailPage.productName);
    await detailPage.assertVisible(detailPage.productAvailability);
    await detailPage.assertVisible(detailPage.productCondition);
    await detailPage.assertVisible(detailPage.productBrand);
    const price = await detailPage.getProductPrice();
    expect(price).toContain('Rs.');
  });

});
