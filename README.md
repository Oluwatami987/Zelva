# Zelva waitlist landing page

A mobile-first React + Vite landing page based on Zelva's current launch direction. The placeholder wordmark is intentionally replaceable. The page uses ivory/navy/teal with restrained gold accents, a first-drop date, brand story, waitlist form, and post-signup WhatsApp group CTA.

## 1. Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows, create `.env.local` by copying `.env.example` manually if `cp` is unavailable.

## 2. Connect the waitlist to Supabase

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Project Settings → API, copy the Project URL and **anon/public key**.
4. Put them in `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/REAL_INVITE_CODE
```

5. Replace the WhatsApp invite URL with the real group invite link.

Only use the anon/public key in the frontend. **Never put a Supabase service-role key in a Vite `VITE_` variable.** The SQL enables row-level security and allows anonymous inserts only; the public cannot query the waitlist. The owner can view signups in the Supabase dashboard.

The form intentionally displays an error until Supabase is configured; it will not pretend to save signups when the database is disconnected.

## 3. Replace the placeholder wordmark

Replace `public/zelva-placeholder.jpg` with the final logo asset, keeping the same filename. A transparent PNG or SVG is ideal; update the CSS `.wordmark img` treatment if the final logo has a transparent background.

## 4. Deploy for free

A simple option is Cloudflare Pages:
1. Push this folder to a GitHub repository.
2. Create a Pages project connected to that repository.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add the three environment variables from `.env.local` in the Pages project settings.
6. Redeploy.

You can also deploy on another static host that supports Vite and environment variables. Never commit `.env.local`.

## 5. Before launch

- Confirm the launch date/time.
- Add the real WhatsApp group invite URL.
- Replace the placeholder logo.
- Test a signup and confirm it appears in Supabase.
- Test duplicate email handling and mobile layout.
- The WhatsApp group exposes members' phone numbers to other group members. Make sure this matches the brand's intended community experience.
