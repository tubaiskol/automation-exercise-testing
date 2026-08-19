import type { APIRequestContext, APIResponse } from '@playwright/test';

import type { Credentials } from '../types/testData';

// Service object for the authentication endpoints
export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  verifyLogin(credentials: Credentials): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', { form: { ...credentials } });
  }

  verifyLoginWithoutEmail(password: string): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', { form: { password } });
  }

  deleteVerifyLogin(): Promise<APIResponse> {
    return this.request.delete('/api/verifyLogin');
  }
}
