/* =========================================================
   Conexão com o Supabase.
   Este arquivo é carregado por TODAS as páginas (portfólio,
   login e admin) para que a URL e a chave fiquem guardadas
   em um lugar só.

   A chave abaixo é a chave PÚBLICA (publishable/anon). Ela não
   é secreta: sozinha, ela não permite ler nem escrever nada.
   Quem decide o que pode ou não pode é a trava de segurança
   (RLS) configurada dentro do Supabase, no arquivo banco.sql.

   Antes deste arquivo, a página precisa carregar a biblioteca
   do Supabase via CDN:
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ========================================================= */
(function () {
  "use strict";

  var SUPABASE_URL = "https://xqjrjyyydtbmxxxfbhtg.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_tmX3jnAyq8tViEsqNC7ENQ__beG9bac";

  if (typeof window.supabase === "undefined") {
    console.error("Biblioteca do Supabase não foi carregada antes de js/banco.js.");
    return;
  }

  window.supabaseCliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
