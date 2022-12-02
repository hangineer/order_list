import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').fill('hannah@test,com');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').press('Tab');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="password"]').fill('111111');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').click();
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').press('ArrowLeft');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').press('ArrowLeft');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').press('ArrowLeft');
  await page.getByRole('tabpanel', { name: '登入' }).locator('input[type="email"]').fill('hannah@test.com');
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('button', { name: '確定' }).click();
  await page.getByRole('menuitem', { name: '訂單相關 ' }).locator('div').filter({ hasText: '訂單相關' }).click();
  await page.getByRole('menuitem', { name: '建立訂單' }).click();
  await page.getByPlaceholder('請選擇商品').click();
  await page.getByRole('listitem').filter({ hasText: '焦糖瑪奇朵' }).click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('no');
  await page.getByRole('button', { name: '新增' }).click();
  await page.getByRole('button', { name: '確定' }).click();
  await page.getByRole('row', { name: ' 編輯  刪除' }).filter({ hasText: '10焦糖瑪奇朵1100100no編輯刪除確定要刪除此筆訂單嗎？取消 確定' }).getByRole('button', { name: ' 編輯' }).click();
});