import path from 'node:path';

import {defineConfig, devices} from '@playwright/test';

const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence', 'task-1-golden-pages');

export default defineConfig({
  testDir: './tests/golden-pages',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 45_000,
  reporter: [
    ['list'],
    ['json', {outputFile: path.join(evidenceDir, 'results.json')}],
  ],
  outputDir: path.join(evidenceDir, 'test-results'),
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 1440, height: 900},
      },
    },
  ],
});
