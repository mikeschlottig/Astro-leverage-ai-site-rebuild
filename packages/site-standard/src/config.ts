import { SiteStandardConfigError } from './types/index.js';
import type { SiteIdentity } from './types/index.js';

const ABSOLUTE_HTTPS_ORIGIN = /^https:\/\/[a-z0-9.-]+$/i;

/**
 * Validate and freeze a SiteIdentity. Fails fast at build time with a typed
 * error so a misconfigured origin can never ship a wrong canonical.
 */
export function defineSiteIdentity(input: SiteIdentity): SiteIdentity {
  if (!ABSOLUTE_HTTPS_ORIGIN.test(input.url)) {
    throw new SiteStandardConfigError(
      `SiteIdentity.url must be an https origin with no path and no trailing slash. Received: "${input.url}"`,
    );
  }
  if (input.url.startsWith('https://www.')) {
    throw new SiteStandardConfigError(
      `SiteIdentity.url must be the apex host (www 301s to apex per host policy). Received: "${input.url}"`,
    );
  }
  const absoluteUrlFields: ReadonlyArray<readonly [string, string]> = [
    ['logoUrl', input.logoUrl],
    ['defaultOgImageUrl', input.defaultOgImageUrl],
  ];
  for (const [key, value] of absoluteUrlFields) {
    if (!/^https:\/\//.test(value)) {
      throw new SiteStandardConfigError(
        `SiteIdentity.${key} must be an absolute https URL. Received: "${value}"`,
      );
    }
  }
  return Object.freeze({ ...input });
}
