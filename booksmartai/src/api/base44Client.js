import createClient from '@base44/sdk';

const appId = process.env.NEXT_PUBLIC_BASE44_APP_ID;

if (!appId) {
  throw new Error('NEXT_PUBLIC_BASE44_APP_ID environment variable is required');
}

export const base44 = createClient({
  appId: appId,
});
