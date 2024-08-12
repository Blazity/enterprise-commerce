import { expect, test } from "@playwright/test"

test('Check header elements exist', async ({ page }) => {
    await page.goto("http://localhost:3000/")

  // Check for the existence of the header
  const header = page.locator('header.hidden.bg-white.py-4.md\\:block');
  await expect(header).toBeVisible();

  // Check for the existence of the logo link
  const logoLink = header.locator('a.text-3xl.font-bold');
  await expect(logoLink).toBeVisible();

  // Check for the existence of the "Log In" button
  const loginButton = header.locator('button:has-text("Log In")');
  await expect(loginButton).toBeVisible();

  // Check for the existence of the "Sign Up" button
  const signUpButton = header.locator('button:has-text("Sign Up")');
  await expect(signUpButton).toBeVisible();
});

test('Check that clicking Log In button opens the login menu', async ({ page }) => {
    await page.goto("http://localhost:3000/")
  
    // Click the "Log In" button
    await page.getByRole('button', { name: 'Log In' }).click();
  
    // Check the form title
    const loginTitle = "Login";
    const loginMenu = page.getByText(loginTitle);
    await expect(loginMenu).toBeVisible();

   // Check the form element
  const form = page.locator('form#loginForm');
  await expect(form).toBeVisible();

  // Check the email label by its text
  const emailLabel = form.locator('label:has-text("Email")');
  await expect(emailLabel).toBeVisible();

  // Check the email input by its placeholder
  const emailInput = form.locator('input[placeholder="Enter email..."]');
  await expect(emailInput).toBeVisible();

  // Check the password label by its text
  const passwordLabel = form.locator('label:has-text("Password")');
  await expect(passwordLabel).toBeVisible();

  // Check the password input by its placeholder
  const passwordInput = form.locator('input[placeholder="Enter password..."]');
  await expect(passwordInput).toBeVisible();
  });

  test('Check that clicking Log In button opens the Signup menu', async ({ page }) => {
    await page.goto("http://localhost:3000/")
  
    // Click the Sign up button
    await page.getByRole('button', { name: 'Sign up' }).click();
  
    // Check the form title
    const loginTitle = "Signup";
    const loginMenu = page.getByText(loginTitle);
    await expect(loginMenu).toBeVisible();

   // Check the form element
  const form = page.locator('form#loginForm');
  await expect(form).toBeVisible();

  // Check the email label by its text
  const emailLabel = form.locator('label:has-text("Email")');
  await expect(emailLabel).toBeVisible();

  // Check the email input by its placeholder
  const emailInput = form.locator('input[placeholder="Enter email..."]');
  await expect(emailInput).toBeVisible();

  // Check the password label by its text
  const passwordLabel = form.locator('label:has-text("Password")');
  await expect(passwordLabel).toBeVisible();

  // Check the password input by its placeholder
  const passwordInput = form.locator('input[placeholder="Enter password..."]');
  await expect(passwordInput).toBeVisible();
  });



test('should check if the image exists', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // image element
  const imageLocator = page.locator('div.shrink-1.flex.basis-1\\/2.items-center.justify-center.bg-neutral-100.p-36 img');

  await expect(imageLocator).toBeVisible();
  
  // 'src' attribute
  await expect(imageLocator).toHaveAttribute('src', '/default-product-image.svg');
});

test('should check if the heading and button exist', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // heading element 
  const headingLocator = page.locator('text=Your daily trendsetting deals');

  await expect(headingLocator).toBeVisible();

  // button 
  const buttonLocator = page.locator('div.flex.basis-1\\/2.flex-col.items-center.justify-start.gap-16.px-4.py-20.md\\:items-start.md\\:p-36 button');

  // Assert that the button exists
  await expect(buttonLocator).toBeVisible();
  await expect(buttonLocator).toHaveText('See on GitHub');

  // check the button's link
  const linkLocator = page.locator('div.flex.basis-1\\/2.flex-col.items-center.justify-start.gap-16.px-4.py-20.md\\:items-start.md\\:p-36 a');
  await expect(linkLocator).toHaveAttribute('href', 'https://git.new/commerce');
});

test('should check if the sale banner and link exist and verify link redirection', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  //  banner text
  const bannerLocator = page.locator('text=Sale 50% OFF');

  await expect(bannerLocator).toBeVisible();

  // "Shop Now" link
  const linkLocator = page.locator('text=Shop Now');

  await expect(linkLocator).toBeVisible();

  // "Shop Now" link and verify the redirection
  await linkLocator.click();

  await expect(page).toHaveURL('http://localhost:3000/');
});

test('should check if the "Shop by Category" section exists', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  //  "Shop by Category" heading
  const headingLocator = page.locator('div.basis-1\\/3.text-center.text-5xl.font-normal.tracking-tighter.sm\\:min-w-\\[280px\\].md\\:text-left.md\\:text-6xl h2');

  await expect(headingLocator).toBeVisible();
  await expect(headingLocator).toHaveText('Shop by Category');
});


test('should check if all category sections exist', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  //  "Beauty" category
  const beautyCategory = page.locator('h3:has-text("Beauty")');
  await expect(beautyCategory).toBeVisible();

  // "Electronics" category
  const electronicsCategory = page.locator('h3:has-text("Electronics")');
  await expect(electronicsCategory).toBeVisible();

  // "Fashion" category
  const fashionCategory = page.locator('h3:has-text("Fashion")');
  await expect(fashionCategory).toBeVisible();

  // "Furniture" category
  const furnitureCategory = page.locator('h3:has-text("Furniture")');
  await expect(furnitureCategory).toBeVisible();

  // "Home" category
  const homeCategory = page.locator('h3:has-text("Home")');
  await expect(homeCategory).toBeVisible();

  // "Retro" category
  const retroCategory = page.locator('h3:has-text("Retro")');
  await expect(retroCategory).toBeVisible();
});







