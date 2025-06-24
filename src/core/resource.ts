// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Sfdc } from '../client';

export abstract class APIResource {
  protected _client: Sfdc;

  constructor(client: Sfdc) {
    this._client = client;
  }
}
