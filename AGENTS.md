AGENTS — LeadForge2 workspace guide

- Layout: BE (Node/Express API, CommonJS) and client (Vite + React + TS). Deployed via Vercel configs in each folder.
- Backend stack: Express 5, Mongoose (MongoDB), Cloudinary (multer-storage-cloudinary), JWT auth, Nodemailer. Entry: BE/index.js.
- Backend run: cd BE; npm run dev (nodemon) | npm start. Env: MONGO_URI, JWT_SECRET, CLOUDINARY_*, SMTP_*.
- Backend APIs: /api/admin (POST /login; contacts CRUD: POST /contacts, GET /contacts, PATCH /contact/:id/viewed), /api/testimonial (POST /, PUT /:id, PUT /status/:id, GET /, GET /active, DELETE /:id).
- Backend conventions: CommonJS require/module.exports; controllers in BE/controllers return JSON with status codes; middleware in BE/middleware (auth, upload); models in BE/models (Mongoose schemas); errors via try/catch → res.status(4xx/5xx). JWT in Authorization: Bearer <token>.

- Frontend stack: React 18 + TypeScript, Vite, TanStack Query, Wouter router, TailwindCSS. Entry: client/src/main.tsx → App.tsx.
- Frontend run: cd client; npm run dev | npm run build | npm run preview. Type-check: npx tsc -p client (strict true). Aliases: @ → src, @shared → shared, @assets → attached_assets.
- Frontend pages: client/src/pages (home, not-found, admin/*). Admin uses APIs above; components under client/src/components; types under client/src/lib/types.

- Tests: No test runner configured in BE or client package.json. Single-test runs: N/A (add Vitest/Jest to enable, e.g., vitest -t "pattern").
- Lint/format: No ESLint/Prettier config found. Keep TS strict, idiomatic React FCs + hooks; prefer named imports; stable import order (node, third-party, aliases, relative).

- Error handling: Use async/await with try/catch; send consistent JSON { message, ... }. Validate inputs server-side; controllers should not throw to the event loop.
- Data: MongoDB via BE/configs/db.js; Cloudinary via BE/configs/cloudinary.js; email via BE/configs/email.js. Drizzle config exists in client/drizzle.config.ts but shared/schema.ts is absent (unused currently).
- Secrets: Read from .env files in BE and client; never commit secrets. Use process.env access only.

- Editor/agent rules: No Cursor (.cursor), Claude (CLAUDE.md), Windsurf (.windsurfrules), Cline (.clinerules), Goose (.goosehints), or Copilot rules found.
- PR/commit style: Small, focused changes; mirror existing naming (camelCase JS, PascalCase React components); avoid introducing new frameworks without discussion.
