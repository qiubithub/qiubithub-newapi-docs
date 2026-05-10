import path from 'node:path';

import {defineConfig, devices} from '@playwright/test';

const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence', 'frontend-migration');

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
    baseURL: process.env.WWW_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 1440, height: 900},
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],
});
