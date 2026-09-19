-- =============================================================
-- BANCO.SQL
-- Script para colar inteiro no Supabase do site da Samara Dias.
--
-- ONDE COLAR:
-- 1. Entre em https://supabase.com/dashboard e abra o seu projeto.
-- 2. No menu da esquerda, clique em "SQL Editor".
-- 3. Clique em "New query".
-- 4. Cole este arquivo inteiro, do começo ao fim.
-- 5. Clique em "Run" (ou aperte Ctrl+Enter / Cmd+Enter).
-- 6. Se aparecer "Success. No rows returned", deu certo.
--
-- Pode rodar esse script mais de uma vez sem medo: os comandos
-- abaixo apagam a versão antiga da tabela antes de criar de novo
-- (DROP TABLE IF EXISTS), então rodar de novo só recomeça do zero.
-- Cuidado: se você já tiver dados reais nas tabelas, rodar de novo
-- APAGA esses dados. Depois que você começar a usar o painel de
-- verdade, não rode este arquivo de novo sem fazer uma cópia antes.
-- =============================================================


-- =============================================================
-- BLOCO 1: EXTENSÃO PARA GERAR OS IDs
-- O Supabase já vem com isso pronto na maioria dos projetos, mas
-- não custa garantir. É o que permite usar gen_random_uuid() para
-- criar um código único pra cada linha das tabelas.
-- =============================================================
create extension if not exists "pgcrypto";


-- =============================================================
-- BLOCO 2: TABELA "videos"
-- Os vídeos que aparecem no seu portfólio, na seção de destaques
-- e na galeria "Trabalhos por nicho".
--
-- destaque: um texto livre, tipo "2,4M views" ou "+340 salvos".
--           Se você preencher esse campo, o vídeo entra também na
--           faixa de "Conteúdos de destaque" lá em cima do site.
--           Se deixar em branco, ele só aparece na galeria normal.
-- ordem:    número que decide a ordem dos vídeos. Menor aparece
--           primeiro. No painel dá pra arrastar pra reordenar.
-- visivel:  se está desmarcado, o vídeo some do site mas continua
--           salvo aqui, pra você poder reativar depois.
-- =============================================================
drop table if exists public.videos cascade;

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  link text,
  nicho text not null,
  formato text,
  marca text,
  destaque text,
  ordem integer not null default 0,
  visivel boolean not null default true,
  criado_em timestamptz not null default now()
);

-- Uma linha de exemplo, só pra você entender o formato. Apague
-- ela quando cadastrar seus vídeos de verdade.
insert into public.videos (titulo, link, nicho, formato, marca, destaque, ordem, visivel)
values ('[Exemplo] Rotina de skincare em 3 passos', '#', 'skincare', 'foto do trabalho, formato 4:5', '[Exemplo] Marca', '', 1, true);


-- =============================================================
-- BLOCO 3: TABELA "marcas"
-- A sua base de contatos de empresas: quem já chamou, quem está
-- conversando, quem já é cliente e quem esfriou.
-- =============================================================
drop table if exists public.marcas cascade;

create table public.marcas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  instagram text,
  email text,
  telefone text,
  situacao text not null default 'Lead' check (situacao in ('Lead', 'Conversando', 'Cliente', 'Parada')),
  obs text,
  ultimo_contato date,
  criado_em timestamptz not null default now()
);

insert into public.marcas (nome, instagram, email, telefone, situacao, obs, ultimo_contato)
values ('[Exemplo] Marca Modelo', '@marcamodelo', 'contato@marcamodelo.com', '', 'Lead', 'Linha de exemplo, pode apagar.', current_date);


-- =============================================================
-- BLOCO 4: TABELA "calendario"
-- A sua agenda de gravar, editar e postar.
-- =============================================================
drop table if exists public.calendario cascade;

create table public.calendario (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  marca text,
  tipo text not null default 'gravar' check (tipo in ('gravar', 'editar', 'postar')),
  data date not null,
  status text not null default 'a fazer' check (status in ('a fazer', 'feito')),
  criado_em timestamptz not null default now()
);

insert into public.calendario (titulo, marca, tipo, data, status)
values ('[Exemplo] Gravar vídeo de unboxing', '[Exemplo] Marca', 'gravar', current_date, 'a fazer');


-- =============================================================
-- BLOCO 5: TABELA "campanhas"
-- Os seus contratos e negociações com as marcas, com valor,
-- prazo e situação de pagamento.
--
-- status segue o funil de trabalho, sempre nesta ordem:
-- Briefing -> Roteiro -> Aprovação Roteiro -> Gravação -> Edição
-- -> Aprovado -> Entregue
-- =============================================================
drop table if exists public.campanhas cascade;

create table public.campanhas (
  id uuid primary key default gen_random_uuid(),
  campanha text not null,
  cliente text not null,
  tipo text not null default 'Conteúdo' check (tipo in ('Conteúdo', 'Publicidade')),
  status text not null default 'Briefing' check (status in ('Briefing', 'Roteiro', 'Aprovação Roteiro', 'Gravação', 'Edição', 'Aprovado', 'Entregue')),
  qtd integer not null default 1,
  valor numeric(10,2) not null default 0,
  prazo date,
  pagamento text not null default 'pendente' check (pagamento in ('pendente', 'pago')),
  ativa boolean not null default true,
  favorita boolean not null default false,
  criado_em timestamptz not null default now()
);

insert into public.campanhas (campanha, cliente, tipo, status, qtd, valor, prazo, pagamento, ativa, favorita)
values ('[Exemplo] Campanha modelo', '[Exemplo] Marca', 'Conteúdo', 'Briefing', 1, 0, current_date + 14, 'pendente', true, false);


-- =============================================================
-- BLOCO 6: TABELA "marcados"
-- Guarda o que você já marcou no checklist do portfólio (aba
-- Checklist). Cada item do checklist tem uma chave de texto
-- própria, e essa tabela só guarda "essa chave foi marcada".
-- =============================================================
drop table if exists public.marcados cascade;

create table public.marcados (
  chave text primary key,
  marcado boolean not null default true,
  atualizado_em timestamptz not null default now()
);


-- =============================================================
-- BLOCO 7: TABELA "visitas"
-- Um registro simples de quem visita o seu portfólio, pra
-- alimentar as métricas do painel. Sem nome, sem e-mail, sem
-- nada que identifique a pessoa.
-- =============================================================
drop table if exists public.visitas cascade;

create table public.visitas (
  id uuid primary key default gen_random_uuid(),
  data timestamptz not null default now(),
  pagina text,
  origem text
);


-- =============================================================
-- BLOCO 8: LIGAR A TRANCA (RLS) EM TODAS AS TABELAS
-- RLS = Row Level Security. É a trava que decide quem pode ler
-- e escrever cada linha. Sem isso, a chave pública do passo 1
-- deixaria QUALQUER pessoa ler ou apagar os seus dados.
-- =============================================================
alter table public.videos     enable row level security;
alter table public.marcas     enable row level security;
alter table public.calendario enable row level security;
alter table public.campanhas  enable row level security;
alter table public.marcados   enable row level security;
alter table public.visitas    enable row level security;


-- =============================================================
-- BLOCO 9: REGRAS DA TABELA "videos"
-- Só você (logada) pode ler e mexer. Ninguém de fora lê nada
-- direto no banco, mas o SITE consegue mostrar os vídeos porque
-- o próprio site usa o seu login público de leitura... não, o
-- site NÃO precisa de login: por isso, os vídeos marcados como
-- "visivel = true" também podem ser lidos por qualquer pessoa,
-- senão o portfólio publicado ficaria sem vídeo nenhum pra quem
-- visita.
-- =============================================================
create policy "qualquer pessoa le videos visiveis"
  on public.videos for select
  to anon, authenticated
  using (visivel = true);

create policy "eu leio todos os meus videos"
  on public.videos for select
  to authenticated
  using (true);

create policy "eu insiro videos"
  on public.videos for insert
  to authenticated
  with check (true);

create policy "eu atualizo videos"
  on public.videos for update
  to authenticated
  using (true)
  with check (true);

create policy "eu apago videos"
  on public.videos for delete
  to authenticated
  using (true);


-- =============================================================
-- BLOCO 10: REGRAS DA TABELA "marcas"
-- Exceção pedida: qualquer pessoa pode INSERIR (quando manda o
-- formulário de contato do site). Só você lê, atualiza e apaga.
-- =============================================================
create policy "qualquer pessoa envia o formulario de contato"
  on public.marcas for insert
  to anon, authenticated
  with check (true);

create policy "eu leio marcas"
  on public.marcas for select
  to authenticated
  using (true);

create policy "eu atualizo marcas"
  on public.marcas for update
  to authenticated
  using (true)
  with check (true);

create policy "eu apago marcas"
  on public.marcas for delete
  to authenticated
  using (true);


-- =============================================================
-- BLOCO 11: REGRAS DA TABELA "calendario"
-- Só você lê e escreve. Ninguém deslogado mexe aqui.
-- =============================================================
create policy "eu leio calendario"
  on public.calendario for select
  to authenticated
  using (true);

create policy "eu insiro calendario"
  on public.calendario for insert
  to authenticated
  with check (true);

create policy "eu atualizo calendario"
  on public.calendario for update
  to authenticated
  using (true)
  with check (true);

create policy "eu apago calendario"
  on public.calendario for delete
  to authenticated
  using (true);


-- =============================================================
-- BLOCO 12: REGRAS DA TABELA "campanhas"
-- Só você lê e escreve.
-- =============================================================
create policy "eu leio campanhas"
  on public.campanhas for select
  to authenticated
  using (true);

create policy "eu insiro campanhas"
  on public.campanhas for insert
  to authenticated
  with check (true);

create policy "eu atualizo campanhas"
  on public.campanhas for update
  to authenticated
  using (true)
  with check (true);

create policy "eu apago campanhas"
  on public.campanhas for delete
  to authenticated
  using (true);


-- =============================================================
-- BLOCO 13: REGRAS DA TABELA "marcados"
-- Só você lê e escreve (é o seu checklist pessoal).
-- =============================================================
create policy "eu leio marcados"
  on public.marcados for select
  to authenticated
  using (true);

create policy "eu insiro marcados"
  on public.marcados for insert
  to authenticated
  with check (true);

create policy "eu atualizo marcados"
  on public.marcados for update
  to authenticated
  using (true)
  with check (true);

create policy "eu apago marcados"
  on public.marcados for delete
  to authenticated
  using (true);


-- =============================================================
-- BLOCO 14: REGRAS DA TABELA "visitas"
-- Exceção pedida: qualquer pessoa pode INSERIR (é o registro de
-- visita do portfólio). Só você lê.
-- =============================================================
create policy "qualquer pessoa registra uma visita"
  on public.visitas for insert
  to anon, authenticated
  with check (true);

create policy "eu leio visitas"
  on public.visitas for select
  to authenticated
  using (true);


-- =============================================================
-- FIM DO SCRIPT.
--
-- DEPOIS DE RODAR ISSO, FALTA CRIAR O SEU USUÁRIO DE LOGIN:
-- 1. No menu da esquerda do Supabase, clique em "Authentication".
-- 2. Clique em "Add user" (ou "Invite user").
-- 3. Coloque o e-mail ugcsamara@gmail.com e escolha uma senha.
-- 4. Marque a opção de e-mail já confirmado (Auto Confirm User),
--    senão o Supabase vai exigir confirmação por e-mail antes de
--    deixar você entrar.
-- Isso é só isso, o script SQL acima não cria usuário nenhum de
-- login, só as tabelas de dados.
-- =============================================================
