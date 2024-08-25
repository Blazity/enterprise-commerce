import { expect, test } from "@playwright/test"

test('Check that the favorite products elements exist by text', async ({ page }) => {
    await page.goto('http://localhost:3000/favorites'); 
  
    // heading element exists and contains the correct text
    const heading = await page.locator('h2:has-text("Favorite products")');
    await expect(heading).toBeVisible();
  
    //  paragraph element exists and contains the correct text
    const paragraph = await page.locator('p:has-text("No favorite products. You can add them by clicking on a heart icon on product page")');
    await expect(paragraph).toBeVisible();
  });


test('Check that the membership section elements exist', async ({ page }) => {
    await page.goto('http://localhost:3000/favorites'); 
    
    // Check the name input element exists
    const nameInput = await page.locator('input[placeholder="Name"]');
    await expect(nameInput).toBeVisible();
  
    // Check the email input element exists
    const emailInput = await page.locator('input[placeholder="Email"]');
    await expect(emailInput).toBeVisible();
  
    // Check the "Become a Member" button exists
    const becomeMemberButton = await page.locator('button:has-text("Become a Member")');
    await expect(becomeMemberButton).toBeVisible();
  });