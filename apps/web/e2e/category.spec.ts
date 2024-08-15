import { expect, test } from "@playwright/test"

test('should check the existence of breadcrumb elements', async ({ page }) => {
    await page.goto('http://localhost:3000/category/beauty');
  
    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible();
  
    // Locate the ordered list within the breadcrumb
    const breadcrumbList = breadcrumbNav.locator('ol.no-scrollbar.flex.items-center.gap-1\\.5.overflow-x-scroll.whitespace-nowrap.text-xs.md\\:text-base\\/\\[18px\\]');
    await expect(breadcrumbList).toBeVisible();
  
    //  "Home" 
    const homeLink = breadcrumbList.locator('li a[href="/"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText('Home');
  
    // separator SVG exists and is visible
    const separatorSVG = breadcrumbList.locator('li svg.-rotate-90');
    await expect(separatorSVG).toBeVisible();
  
    // "Beauty" 
    const beautyLink = breadcrumbList.locator('li a[href="/category/beauty"].font-medium.underline');
    await expect(beautyLink).toBeVisible();
    await expect(beautyLink).toHaveText('Beauty');
  });
  