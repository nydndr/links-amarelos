# Links Amarelos

## Pre-launch polish

### Curation animation
- [ ] Pause and restart controls (visible on hover or always-visible)
- [ ] Replay on scroll re-entry (currently pauses; should restart from stage 0)
- [ ] Mobile QA pass — vertical axis layout works in code but needs visual review on real devices
- [ ] Label pills: check text overflow on small screens (`links + ondas` is long)
- [ ] Consider a skip/jump button to let users advance to the next stage manually
- [ ] Entrance animation for the whole section on first scroll-into-view

### Navigation
- [ ] Mobile nav (hamburger or drawer — currently desktop only)

### SEO / meta
- [ ] `og:image`, `og:title`, `og:description` for social sharing
- [ ] Twitter card tags
- [ ] Canonical URL
- [ ] Favicon + Apple touch icon

### Pages
- [ ] Custom 404 page
- [ ] `/realizacoes` page content (linked in nav, destination unclear)

### Performance
- [ ] Lighthouse audit — LCP, CLS, TBT
- [ ] Canvas animation: confirm no frame drops on low-end devices
- [ ] Image optimization audit (cover art PNGs)

### Analytics
- [ ] Add analytics (Plausible or Vercel Analytics)

### Accessibility
- [ ] Focus styles visible throughout
- [ ] Screen-reader skip link to main content
- [ ] Test with VoiceOver / NVDA
