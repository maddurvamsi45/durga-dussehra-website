# Development checklist

## UI and accessibility
- [ ] Headings are in a logical order.
- [ ] Meaningful images have descriptive alt text.
- [ ] Mobile navigation can be opened and closed by keyboard.
- [ ] Buttons have visible focus states.
- [ ] Gallery filters display the expected category.
- [ ] Lightbox has a clear close control.
- [ ] Contact labels match their fields.
- [ ] No personal data is embedded in demo content.

## Frontend quality
- [ ] `npm ci` completes cleanly.
- [ ] `npm test` passes.
- [ ] `npm run build` succeeds.
- [ ] Browser console has no uncaught errors.
- [ ] Layout works at mobile, tablet, and desktop sizes.
- [ ] External image failures are handled gracefully.

## Container quality
- [ ] Build works from a clean checkout.
- [ ] Runtime image contains only Nginx and static assets.
- [ ] Health endpoint returns HTTP 200.
- [ ] Container listens on port 8080 and runs non-root.
- [ ] Secrets are not present in image layers or build logs.

## Kubernetes and CI/CD
- [ ] Namespace and image names are correct.
- [ ] Readiness and liveness probes pass.
- [ ] Resource requests and limits suit cluster capacity.
- [ ] Ingress DNS and TLS are configured before public exposure.
- [ ] Production secrets are restricted.
- [ ] Rollback procedure has been tested.
