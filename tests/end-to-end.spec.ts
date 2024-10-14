import { test, expect } from '@playwright/test';

['-dev', ''].forEach(locationName => {
  test(`${locationName}test`, async ({ page }) => {
    await page.goto(`https://knmi-statistieken-2024${locationName}.vercel.app/hitte`);
    const circleBox = (await page.locator('rect:nth-child(589)').boundingBox())!;
    await page.mouse.click(circleBox.x + circleBox.width / 2, circleBox.y + circleBox.height - 5);

    await page.getByRole('textbox').first().click();
    await page.getByText('Aantal warme dagen', { exact: true }).click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByText('2050 hoogste scenario', { exact: true }).click();
    
    let box = (await page.locator('.image-Droogte').boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
    await page.locator('rect:nth-child(551)').click();
    await page.getByRole('textbox').first().click();
    await page.locator('.svelte-select-list .item').nth(2).click();

    box = (await page.locator('.image-Wateroverlast').boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
    await page.getByRole('textbox').first().click();
    await page.locator('.svelte-select-list .item').nth(2).click();
    await page.getByRole('textbox').nth(1).click();
    await page.locator('.svelte-select-list .item').nth(2).click();

    box = (await page.locator('.image-Zeespiegelstijging').boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);

    box = (await page.locator('.image-Droogte').boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
    await page.locator('rect:nth-child(551)').click();
    await page.getByRole('textbox').first().click();
    await page.locator('.svelte-select-list .item').nth(2).click();
  });
})