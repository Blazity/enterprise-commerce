import { expect, test } from "@playwright/test"

test('Check if the cart element exists', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  
    const cartElement = await page.waitForSelector('div.relative.size-8.cursor-pointer.items-center.justify-center.fill-none.transition-transform.hover\\:scale-105.hidden.md\\:flex');

    expect(cartElement).not.toBeNull();

    // Further verification: Check if the SVG and button inside the div exist
    const svgElement = await page.$('div.relative.size-8.cursor-pointer.items-center.justify-center.fill-none.transition-transform.hover\\:scale-105.hidden.md\\:flex svg');
    const buttonElement = await page.$('div.relative.size-8.cursor-pointer.items-center.justify-center.fill-none.transition-transform.hover\\:scale-105.hidden.md\\:flex button');

    // Check for the span inside the button
    const spanElement = await page.$('div.relative.size-8.cursor-pointer.items-center.justify-center.fill-none.transition-transform.hover\\:scale-105.hidden.md\\:flex button span');

    // Ensure all elements are found before proceeding
    expect(svgElement).not.toBeNull();
    expect(buttonElement).not.toBeNull();
    expect(spanElement).not.toBeNull();

    if (!spanElement) {
        return;
    }
    
    const spanText = await spanElement.innerText();
    expect(spanText).toBe('open cart');
  });


test('Check button click opens the cart menu', async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  
    // Wait for the button to be present and click it
    const cartButtonSelector = 'div.relative.size-8.cursor-pointer.items-center.justify-center.fill-none.transition-transform.hover\\:scale-105.hidden.md\\:flex';
    await page.waitForSelector(cartButtonSelector);
    await page.click(cartButtonSelector);
  
    // Wait for the menu (dialog) to appear
    const dialogSelector = 'div[role="dialog"][id^="radix-:rc:"]';
    await page.waitForSelector(dialogSelector, { state: 'visible' });
  
    // Assert that the menu is now visible
    const dialog = await page.$(dialogSelector);
    expect(dialog).not.toBeNull();
  
    // Further checks for the dialog content if needed
    const dialogText = await page.innerText(dialogSelector);
    expect(dialogText).toContain('Review your cart');
  
    // Verify that the cart message is correct
    const cartMessageSelector = 'div[role="dialog"] p';
    const cartMessage = await page.innerText(cartMessageSelector);
    expect(cartMessage).toBe('Your cart is empty');
  
    // Close the dialog by clicking the close button
    const closeButtonSelector = 'div[role="dialog"] button';
    await page.click(closeButtonSelector);
  
    // Verify that the dialog is closed
    await page.waitForSelector(dialogSelector, { state: 'hidden' });
  });