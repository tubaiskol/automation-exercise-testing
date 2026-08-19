import type { APIRequestContext, APIResponse } from '@playwright/test';

import type { AccountPayload } from '../types/api';
import type { Credentials } from '../types/testData';

// Service object for the accounts endpoints
export class AccountsApi {
  constructor(private readonly request: APIRequestContext) {}

  createAccount(payload: AccountPayload): Promise<APIResponse> {
    return this.request.post('/api/createAccount', { form: { ...payload } });
  }

  updateAccount(payload: AccountPayload): Promise<APIResponse> {
    return this.request.put('/api/updateAccount', { form: { ...payload } });
  }

  getUserDetailByEmail(email: string): Promise<APIResponse> {
    return this.request.get('/api/getUserDetailByEmail', {
      params: { email },
    });
  }

  deleteAccount(credentials: Credentials): Promise<APIResponse> {
    return this.request.delete('/api/deleteAccount', {
      form: { ...credentials },
    });
  }
}
