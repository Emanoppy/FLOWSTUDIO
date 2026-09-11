-- FLOWSTUDIO — esquema de Supabase
-- Correr esto completo en: tu proyecto de Supabase > SQL Editor > New query > Run
-- Reconstruido a partir de las columnas que server/supabase.js realmente usa.

create table if not exists flowstudio_users (
  id text primary key,
  username text not null unique,
  email text,
  password_hash text,
  role text not null default 'user',        -- 'user' | 'admin'
  status text not null default 'active',     -- 'active' | 'banned' | 'suspended'
  hwid text unique,
  license_plan text,
  license_expires_at timestamptz,
  max_accounts int not null default 1,
  notes text default '',
  created_at timestamptz not null default now(),
  last_login_at timestamptz,
  last_login_ip text
);

create table if not exists flowstudio_licenses (
  key text primary key,
  name text default '',
  plan text not null default 'Pro',
  duration_days int not null default 30,
  max_accounts int not null default 1,
  is_redeemed boolean not null default false,
  redeemed_by_user_id text references flowstudio_users(id) on delete set null,
  redeemed_hwid text,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists flowstudio_license_devices (
  id bigint generated always as identity primary key,
  license_key text not null references flowstudio_licenses(key) on delete cascade,
  hwid text not null,
  user_id text references flowstudio_users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (license_key, hwid)
);

create table if not exists flowstudio_access_logs (
  id bigint generated always as identity primary key,
  user_id text,
  username text default 'Desconocido',
  hwid text,
  ip text,
  status text not null,
  details text default '',
  created_at timestamptz not null default now()
);

create table if not exists flowstudio_settings (
  key text primary key,
  value text
);

create table if not exists flowstudio_announcements (
  id bigint generated always as identity primary key,
  title text not null,
  body text default '',
  version text,
  download_url text,
  is_published boolean not null default false,
  published_at timestamptz
);

-- Seguridad: la app se conecta con la service_role key (uso exclusivo del servidor),
-- que ignora RLS igual. Igual activamos RLS sin políticas para que la clave "anon"
-- (si alguna vez se usa en el cliente) no pueda leer ni escribir nada de esto.
alter table flowstudio_users            enable row level security;
alter table flowstudio_licenses         enable row level security;
alter table flowstudio_license_devices  enable row level security;
alter table flowstudio_access_logs      enable row level security;
alter table flowstudio_settings         enable row level security;
alter table flowstudio_announcements    enable row level security;

-- Indices utiles para las consultas que hace el backend
create index if not exists idx_users_hwid on flowstudio_users(hwid);
create index if not exists idx_licenses_redeemed_by on flowstudio_licenses(redeemed_by_user_id);
create index if not exists idx_access_logs_created_at on flowstudio_access_logs(created_at desc);
