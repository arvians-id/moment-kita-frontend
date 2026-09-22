# Design References

This directory stores read-only visual and behavioral references for future frontend implementation. Nothing here is production source code, and production runtime code must never import from this directory.

Use one directory for each page, feature, or invitation-template reference. A reference directory may include:

- `source.html` for generated or raw reference markup.
- `screenshot.png` for the intended visual result.

Production implementations should preserve the referenced visual appearance while being rewritten cleanly with the established Next.js, React, TypeScript, and component architecture. When generated HTML is messy or structurally misleading, treat the screenshot as the visual source of truth.

Do not modify reference files unless the task explicitly requests it.
