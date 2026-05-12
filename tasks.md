# Tasks

## Critical

- [ ] Rotate `TWITCH_TOKEN`, `TWITCH_CLIENT_ID`, `FACEBOOK_TOKEN` and `FACEBOOK_ID`. Live smoke tests on `2026-05-01` returned `auth_failed` for Twitch and Meta, so the saved credentials are no longer valid for production.
- [ ] Decide whether Instagram support should stay on the official Meta Business Discovery flow or move to a different acquisition strategy. The current app now explains the limitation clearly, but official coverage is still limited to eligible professional accounts and valid permissions.

## AdSense

- [ ] Replace the development ad placeholders with real AdSense slot IDs through `NEXT_PUBLIC_ADSENSE_HOME_SLOT`, `NEXT_PUBLIC_ADSENSE_TWITCH_SLOT`, `NEXT_PUBLIC_ADSENSE_INSTAGRAM_SLOT`, `NEXT_PUBLIC_ADSENSE_RECTANGLE_SLOT` and `NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT`.
- [ ] Add the final AdSense `ads.txt` entry in `public/ads.txt` after Google gives you the publisher ID line.
- [ ] Add a consent/CMP flow before enabling personalized ads in production.
- [ ] Create supporting SEO pages only if they help users search IDs directly, such as Twitch ID lookup, Instagram ID lookup and common API ID questions.

## Ops

- [ ] If you want error reporting back, re-enable Sentry with fresh `SENTRY_AUTH_TOKEN`, `SENTRY_ORG` and `SENTRY_PROJECT` values. The build now skips Sentry cleanly when those vars are absent.
- [ ] Refresh the local Browserslist database with `npx update-browserslist-db@latest` when you are ready to touch dependencies again.
