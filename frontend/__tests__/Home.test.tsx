import { beforeAll, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import HomePage from '@/app/page';

import { server } from './__mocks__/msw/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test('it renders static test page', () => {
  render(<HomePage />);

  const heading = screen.getByRole('heading', {
    name: /It's a test page/i,
  });
  expect(heading).toBeDefined();

  // const main = within(screen.getByRole('main'));
  // expect(
  //   main.getByRole('heading', { level: 1, name: /Main page!/i }),
  // ).toBeDefined();
  // const footer = within(screen.getByRole('contentinfo'));
  // const link = within(footer.getByRole('link'));
  // expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined();
});
