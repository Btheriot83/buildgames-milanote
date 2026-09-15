import { expect, test } from '@playwright/test'

test('core loop: load film wall, capture note, search, export affordances', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Draftwall' })).toBeVisible({ timeout: 15_000 })
  await expect(page.getByTestId('board-viewport')).toBeVisible()
  await expect(page.getByRole('heading', { name: /Desert Diner/ })).toBeVisible()
  await expect(page.getByText(/Pin notes & links/i).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Export MD' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible()

  await page.getByTestId('capture-input').fill('E2E pinned note #smoke')
  await page.getByTestId('capture-submit').click()
  await expect(page.getByText('E2E pinned note').first()).toBeVisible()

  await page.getByTestId('search-input').fill('smoke')
  await expect(page.getByText('E2E pinned note').first()).toBeVisible()
  await expect(page.getByTestId('match-count')).toBeVisible()

  await page.getByTestId('export-json').click()
  await expect(page.getByText(/JSON export saved|pinned/i).first()).toBeVisible({ timeout: 5000 })

  await page.getByTestId('brief-open').click()
  await expect(page.getByTestId('brief-input')).toBeVisible()
})
