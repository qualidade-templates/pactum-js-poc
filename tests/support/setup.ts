import { request } from 'pactum';
import { env } from '../../src/config/env';

request.setBaseUrl(env.baseUrl);
request.setDefaultTimeout(20_000);
