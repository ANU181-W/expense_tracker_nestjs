export interface AuthenticatedRequest extends Request {
  user: {
    [x: string]: any;
    id: number;
  };
}
