export function calloutForService(serviceSlug: string) {
  return {
    href: `/services/${serviceSlug}/`,
    label: "Learn more about this service",
  };
}
