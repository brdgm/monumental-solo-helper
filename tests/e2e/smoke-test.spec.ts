import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Monumental Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('link', { name: 'Select Civilization' }).click()
  await page.getByTestId('player-civilization-0').getByRole('button', { name: '(select)' }).click()
  await page.getByTestId('player-civilization-0').locator('a').filter({ hasText: 'Random civilization' }).click()
  await page.getByTestId('bot-civilization-0').getByRole('button', { name: '(select)' }).click()
  await page.getByTestId('bot-civilization-0').locator('a').filter({ hasText: 'Random civilization' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // player turn
  await page.getByRole('link', { name: 'Next' }).click()

  // finish game
  await page.getByRole('button', { name: 'Finish Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Finish Game' }).click()

  // end game
  await page.getByRole('button', { name: 'End Game' }).click();
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Monumental Solo Helper')
})
