import createClient from '@base44/sdk';

const appId = process.env.NEXT_PUBLIC_BASE44_APP_ID;

if (!appId) {
  console.error("CRITICAL: NEXT_PUBLIC_BASE44_APP_ID environment variable is not set. The application will not work without it.");
}

export const base44 = createClient({
  appId: appId,
});
