-- Contact form submissions.
--
-- Applied by hand against the Vercel Postgres (Neon) database; there is no
-- migration runner in this repo and one bare table does not earn one. Re-runnable.
--
-- PERSONAL DATA. Every row holds a real person's name, work email and sometimes a
-- phone number. Nghị định 13/2023/NĐ-CP applies: the form needs a visible processing
-- notice, and rows need a retention limit. Neither exists yet — docs/05-backlog.md.

create table if not exists contact_submission (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),

  name        text not null,
  company     text not null,
  email       text not null,
  phone       text,
  message     text not null,

  -- Which page the submission came from. One form today; the column keeps a second
  -- one from needing a schema change.
  source_page text not null default 'contact',

  -- Salted SHA-256 of the client IP, never the address itself. Only purpose is the
  -- rate-limit lookup below. Unsalted hashes of IPv4 are trivially reversible, so the
  -- salt is mandatory — see CONTACT_IP_SALT in .env.example.
  ip_hash     text,
  user_agent  text,

  -- Defence in depth: the route validates the same bounds before it ever gets here.
  -- If a second writer ever appears, the database still refuses junk.
  constraint contact_submission_name_len    check (char_length(name)    between 1 and 120),
  constraint contact_submission_company_len check (char_length(company) between 1 and 160),
  constraint contact_submission_email_len   check (char_length(email)   between 3 and 254),
  constraint contact_submission_email_shape check (position('@' in email) > 1),
  constraint contact_submission_phone_len   check (phone is null or char_length(phone) between 1 and 40),
  constraint contact_submission_message_len check (char_length(message) between 1 and 4000)
);

-- Reading the inbox newest-first.
create index if not exists contact_submission_created_at_idx
  on contact_submission (created_at desc);

-- The rate-limit query: how many rows from this ip_hash since a cutoff.
create index if not exists contact_submission_ip_hash_created_at_idx
  on contact_submission (ip_hash, created_at desc);
