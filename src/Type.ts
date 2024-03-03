export interface AuthenticatedRequest extends Request {
  user: {
    user: {
      id: number;
    };
  };
}
