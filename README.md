# ID Lookup

Next.js utility for finding Twitch user IDs and supported Instagram business IDs by username.

## What changed

- The homepage is now the lookup tool itself: choose a platform, enter a username and copy the returned ID.
- Dedicated Twitch and Instagram lookup pages stay available for SEO and direct links.
- AdSense-ready ad slots are available for sidebar, rectangle and horizontal placements.
- API responses handle expired credentials, invalid usernames, rate limits and unsupported Instagram lookups.
- GTM, AdSense and Sentry are optional through environment variables.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` values into `.env.local` and fill the credentials you actually want to use.

3. Start the app:

```bash
npm run dev
```

4. Production build check:

```bash
npm run build
npm run start
```

## Environment variables

### Public

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `NEXT_PUBLIC_ADSENSE_HOME_SLOT`
- `NEXT_PUBLIC_ADSENSE_TWITCH_SLOT`
- `NEXT_PUBLIC_ADSENSE_INSTAGRAM_SLOT`
- `NEXT_PUBLIC_ADSENSE_RECTANGLE_SLOT`
- `NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT`

### Server

- `TWITCH_CLIENT_ID`
- `TWITCH_TOKEN`
- `FACEBOOK_ID`
- `FACEBOOK_TOKEN`
- `FACEBOOK_GRAPH_VERSION`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

## Platform notes

- Twitch uses the official Helix user lookup and expects a valid app token plus Client ID.
- Instagram uses Meta Business Discovery, so account coverage depends on permissions and eligible professional accounts.

## AdSense setup

The UI includes neutral ad containers and only loads AdSense when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and the matching slot ID are configured. In production, unconfigured ad slots are hidden.

## Pending follow-up

See [`tasks.md`](./tasks.md) for the remaining production checklist.
