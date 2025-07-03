# Google Authentication TypeScript Error

Minimal reproduction for a TypeScript compile-time error caused by an update to `google-auth-library` (v10.1.0) used transitively through `@google-cloud/bigquery`.

## Error

```bash
npx tsc --noEmit --project tsconfig.json
node_modules/google-auth-library/build/src/auth/authclient.d.ts:14:34 - error TS2339: Property 'fetch' does not exist on type 'Gaxios'.

14     fetch: typeof fetch | Gaxios['fetch'];
                                    ~~~~~~~

node_modules/google-auth-library/build/src/auth/authclient.d.ts:214:41 - error TS2339: Property 'fetch' does not exist on type 'Gaxios'.

214     fetch<T>(...args: Parameters<Gaxios['fetch']>): GaxiosPromise<T>;
```

## Reproduction Steps

1. Clone this repo:
   ```bash
   git clone

2. Install dependencies:
   ```bash
    npm install

3.  Run TypeScript compiler:
    ```bash
    npx tsc

You should now see the error above.

## Key Details
- Node.js: `v20.16.0`
- TypeScript: `v5.8.3`
- @google-cloud/bigquery: `^8.0.0`
- @google-cloud/storage: `^7.16.0`
- Transitive google-auth-library: `10.1.0`

The error only appears when **both** `bigquery` **and** `storage` dependencies are installed **and** `bigquery` pulls in `google-auth-library@10.1.0`. Downgrading it to `9.15.1` via overrides resolves the issue.

It is worth noting, however, that when installed in isolation *either* `bigquery` *or* `storage` may use `google-auth-library@10.1.0` without throwing an error during compilation. For example, installing *only* `bigquery` without any overrides and running the compiler will complete successfully:

```json
"dependencies": {
    "@google-cloud/bigquery": "^8.0.0",
    "typescript": "^5.8.3"
  }
```

```typescript
import { BigQuery } from '@google-cloud/bigquery';

const bq = new BigQuery();

console.log("Log: " + JSON.stringify({ bq }, null, 2));

```
