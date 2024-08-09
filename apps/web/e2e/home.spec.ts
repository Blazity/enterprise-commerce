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