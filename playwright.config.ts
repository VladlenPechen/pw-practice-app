import { defineConfig, devices } from '@playwright/test';
import type {TestOptions } from './test-options';

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig<TestOptions>({
  timeout: 40000,
  //globalTimeout: 60000,
  expect: {
    timeout: 10000,
    toMatchSnapshot: {
      maxDiffPixels: 50
    }
  }, //for locator assertions

  retries: process.env.CI ? 2 : 1,
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
     },
    ],
    ['html']
  ],

  use: {
    /* Configuration for Eyes VisualAI */

    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/' 
            : process.env.STAGING === '1' ? 'http://localhost:4202/' : 'http://localhost:4200/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200',
      }
    },
    {
      name: 'chromium'
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        video: {
          mode: "on",
          size: { width: 1920, height: 1080 }
        }
      },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: ['**/usePageObjects.spec.ts'],
      use: {
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    },
    {
      name: 'mobile',
      testMatch: ['**/testMobile.spec.ts'],
      use: {
        ...devices['Galaxy S24'],
        //viewport: {width: 412, height: 915} - can also test mobile like this
      }
    }
  ],
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:4200'
  // }
});
