import { Request, Response } from 'express';
import * as cors from 'cors';
import { validateAddDocumentPayload } from './validatePayload'; // Middleware de validação

export const applyMiddleware =
  (
    handler: (req: Request, res: Response) => Promise<void> | void,
    { authenticatedRoute = false } = {}
  ) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (authenticatedRoute) {
        const isAuthorized = isAuthenticated(req);
        if (!isAuthorized) {
          res.status(401).send('Unauthorized');
          return;
        }
      }

      return cors()(req, res, async () => {
        validateAddDocumentPayload(req, res, async (err: any) => {
          if (err) {
            return;
          }
          await handler(req, res);
        });
      });
    } catch (error) {
      res.status(500).send('Internal Server Error');
      return;
    }
  };

const isAuthenticated = (req: Request): boolean => {
  return true;
};
