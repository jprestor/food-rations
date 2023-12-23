import { rest } from 'msw';

import { route as pagesRoute } from '@/features/page';
import { API_URL } from '@/constants';

export const handlers = [
  // Handles a GET /user request
  rest.get(`${API_URL}${pagesRoute}/:pageSlug`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),

  // Handles a POST /login request
  // rest.post('/login', null),
];
