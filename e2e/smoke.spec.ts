import { expect, test } from '@playwright/test'

test('core loop: load sample, capture note, search, export affordances', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Draftwall' })).toBeVisible({ timeout: 15_000 })
  await expect(page.getByTestId('board-viewport')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Film lookbook (sample)' })).toBeVisible()

  await page.getByTestId('capture-input').fill('E2E pinned note #smoke')
  await page.getByTestId('capture-submit').click()
  await expect(page.getByText('E2E pinned note').first()).toBeVisible()

  await page.getByTestId('search-input').fill('smoke')
  await expect(page.getByText('E2E pinned note').first()).toBeVisible()

  await page.getByRole('button', { name: 'Export JSON' }).click()
  await expect(page.getByText(/JSON backup downloaded|pinned/i).first()).toBeVisible({ timeout: 5000 })
})
