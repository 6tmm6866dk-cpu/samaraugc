-- =============================================================
-- DISPARO.SQL
-- Script para colar no Supabase, pra ligar a aba Prospecção do
-- admin (envio de e-mail em massa pra base de marcas).
--
-- ONDE COLAR:
-- 1. Entre em https://supabase.com/dashboard e abra o seu projeto.
-- 2. No menu da esquerda, clique em "SQL Editor".
-- 3. Clique em "New query".
-- 4. Cole este arquivo inteiro, do começo ao fim.
-- 5. Clique em "Run" (ou Ctrl+Enter).
-- 6. Se aparecer "Success. No rows returned", deu certo.
--
-- Esse script NÃO apaga nada. Ele só acrescenta duas colunas
-- novas na tabela marcas (com ALTER TABLE) e cria duas tabelas
-- novas (com CREATE TABLE IF NOT EXISTS), então pode rodar mais
-- de uma vez sem medo, sem perder dado nenhum que já existe.
-- =============================================================


-- =============================================================
-- BLOCO 1: DUAS COLUNAS NOVAS NA TABELA "marcas"
--
-- selecionada:            fica marcado (true) quando você escolhe
--                          essa marca a dedo na aba Marcas, pra
--                          mandar prospecção depois. Fica salvo,
--                          não se perde quando você fecha o admin.
-- prospeccao_enviado_em:  a data e hora da última vez que essa
--                          marca recebeu um e-mail de prospecção.
-- =============================================================
alter table public.marcas add column if not exists selecionada boolean not null default false;
alter table public.marcas add column if not exists prospeccao_enviado_em timestamptz;


-- =============================================================
-- BLOCO 2: TABELA "email_envios"
-- Uma linha pra cada e-mail que a função de disparo tentou
-- mandar, com o resultado. É o seu comprovante: se um disparo
-- parar no meio, essa tabela mostra exatamente quem recebeu e
-- quem não recebeu.
-- =============================================================
create table if not exists public.email_envios (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  assunto text not null,
  status text not null check (status in ('ok', 'erro')),
  erro text,
  resend_id text,
  criado_em timestamptz not null default now()
);


-- =============================================================
-- BLOCO 3: TABELA "email_optout"
-- A lista de quem não quer mais receber e-mail seu. Uma marca
-- entra aqui sozinha quando clica em "cancelar inscrição" no
-- e-mail (a função de descadastro cuida disso), e a função de
-- disparo sempre confere essa lista antes de mandar qualquer
-- coisa, pra nunca mandar de novo pra quem já saiu.
-- =============================================================
create table if not exists public.email_optout (
  email text primary key,
  criado_em timestamptz not null default now()
);


-- =============================================================
-- BLOCO 4: LIGAR A TRANCA (RLS) NAS DUAS TABELAS NOVAS
-- Mesma regra das outras tabelas: só você, logada, lê e escreve.
-- As duas funções do Supabase (enviar-emails e desinscrever) não
-- dependem dessa trava pra funcionar, porque elas usam uma chave
-- interna do próprio Supabase que já enxerga tudo. Essa trava
-- aqui é só pra proteger a leitura pelo navegador (o admin).
-- =============================================================
alter table public.email_envios enable row level security;
alter table public.email_optout enable row level security;

create policy "eu leio email_envios"
  on public.email_envios for select
  to authenticated
  using (true);

create policy "eu insiro email_envios"
  on public.email_envios for insert
  to authenticated
  with check (true);

create policy "eu leio email_optout"
  on public.email_optout for select
  to authenticated
  using (true);

create policy "eu insiro email_optout"
  on public.email_optout for insert
  to authenticated
  with check (true);

create policy "eu apago email_optout"
  on public.email_optout for delete
  to authenticated
  using (true);


-- =============================================================
-- FIM DO SCRIPT.
--
-- Isso aqui só cria as tabelas. Pra a aba Prospecção funcionar de
-- verdade (o modo com envio automático, não o modo rascunho),
-- ainda faltam dois passos fora do SQL Editor, explicados na
-- mensagem que acompanha este arquivo:
-- 1. Criar as duas Edge Functions (enviar-emails e desinscrever).
-- 2. Guardar a chave do Resend como segredo da função.
-- =============================================================
