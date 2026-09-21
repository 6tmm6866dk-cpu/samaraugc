-- =============================================================
-- INSIGHTS.SQL
-- Script para colar no Supabase, pra ligar a aba Insights do admin
-- (o quadro de ideias, estilo Notion, com Semente / Amadurecida / Pronta).
--
-- ONDE COLAR:
-- 1. Entre em https://supabase.com/dashboard e abra o seu projeto.
-- 2. No menu da esquerda, clique em "SQL Editor" → "New query".
-- 3. Cole este arquivo inteiro e clique em "Run".
-- 4. Se aparecer "Success. No rows returned", deu certo.
--
-- Não apaga nada que já existe. Pode rodar mais de uma vez sem medo.
-- =============================================================


-- =============================================================
-- BLOCO 1: TABELA "insights"
-- Cada linha é um cartão do quadro.
--
-- categoria: sempre uma dessas três palavras: semente, amadurecida
--            ou pronta. É o que decide em qual coluna o cartão
--            aparece.
-- ordem:     a posição do cartão dentro da coluna dele.
-- midias:    a lista de fotos e vídeos anexados ao cartão, guardada
--            como uma lista de textos técnicos (json), com o link
--            de cada arquivo. Você nunca precisa mexer nisso na mão,
--            o admin cuida sozinho quando você sobe um arquivo.
-- =============================================================
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  texto text not null default '',
  categoria text not null default 'semente' check (categoria in ('semente', 'amadurecida', 'pronta')),
  ordem integer not null default 0,
  midias jsonb not null default '[]'::jsonb,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

insert into public.insights (texto, categoria, ordem)
select '[Exemplo] Vídeo mostrando o bastidor de uma gravação, o que dá errado antes de dar certo', 'semente', 1
where not exists (select 1 from public.insights);


-- =============================================================
-- BLOCO 2: LIGAR A TRANCA (RLS)
-- Só você, logada, lê e escreve. Ninguém deslogado enxerga nada
-- aqui, nem tem exceção pública nessa tabela (diferente de marcas
-- e visitas), porque isso aqui é o seu caderno de ideias pessoal.
-- =============================================================
alter table public.insights enable row level security;

create policy "eu leio insights"
  on public.insights for select
  to authenticated
  using (true);

create policy "eu insiro insights"
  on public.insights for insert
  to authenticated
  with check (true);

create policy "eu atualizo insights"
  on public.insights for update
  to authenticated
  using (true)
  with check (true);

create policy "eu apago insights"
  on public.insights for delete
  to authenticated
  using (true);


-- =============================================================
-- BLOCO 3: ESPAÇO PRA GUARDAR AS FOTOS E VÍDEOS
-- Isso cria uma "pasta" dentro do Supabase Storage chamada
-- "insights", onde os arquivos que você sobe ficam guardados de
-- verdade. Ela é pública pra leitura (pra você conseguir ver as
-- fotos e vídeos no admin sem precisar de um link temporário toda
-- vez), mas só você, logada, consegue subir ou apagar arquivo.
-- =============================================================
insert into storage.buckets (id, name, public)
values ('insights', 'insights', true)
on conflict (id) do nothing;

create policy "eu envio arquivos de insights"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'insights');

create policy "eu apago arquivos de insights"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'insights');

create policy "eu vejo arquivos de insights logada"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'insights');

create policy "leitura publica dos arquivos de insights"
  on storage.objects for select
  to anon
  using (bucket_id = 'insights');


-- =============================================================
-- FIM DO SCRIPT.
-- Se o bloco 3 der algum erro (alguns projetos do Supabase não
-- deixam mexer direto na tabela storage.buckets pelo SQL Editor),
-- me avise: nesse caso, é só criar o bucket pela tela mesmo, em
-- "Storage" no menu da esquerda → "New bucket" → nome "insights"
-- → marcar "Public bucket", e eu ajusto as regras de acesso dele
-- por lá com você.
-- =============================================================
