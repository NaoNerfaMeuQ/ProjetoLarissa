# Segurança e publicação

Este documento separa as proteções implementadas no código das configurações que precisam ser aplicadas nos serviços externos.

## Implementado no código

- [x] URL da API separada por ambiente Angular.
- [x] JWT Firebase enviado apenas para operações administrativas.
- [x] Backend com autorização `fail closed`: ausência de allowlist não concede acesso.
- [x] Custom claim `admin` ou allowlist explícita para criar, editar e excluir histórias.
- [x] Sanitização de HTML no backend e no frontend.
- [x] Upload limitado a JPG, PNG, WebP, GIF ou AVIF, com tamanho máximo de 5 MB.
- [x] Nomes de arquivos imprevisíveis gerados com `crypto.randomUUID()`.
- [x] Regras do Firebase Storage versionadas em `storage.rules`.
- [x] CORS restrito às origens configuradas no backend.
- [x] Arquivos de ambiente e credenciais privadas ignorados pelo Git.

## Configuração externa obrigatória

1. No Google Cloud Console, restrinja a chave web Firebase aos domínios reais do frontend e somente às APIs utilizadas.
2. Defina a custom claim `admin: true` apenas para a conta da autora, usando um ambiente administrativo confiável.
3. Publique `storage.rules` no projeto Firebase correto e teste leitura pública e escrita administrativa no Emulator Suite.
4. No Render, configure `ADMIN_EMAILS` ou `ADMIN_UIDS`, `FIREBASE_CONFIG_JSON`, `MONGODB_URI` e a origem exata em `CORS_ALLOWED_ORIGINS`.
5. No MongoDB Atlas, use usuário exclusivo com privilégio mínimo e restrição de rede adequada ao ambiente de hospedagem.

## Segredos

A chave web do Firebase aparece no bundle do navegador e não deve ser tratada como segredo. A segurança depende das restrições da chave, das regras Firebase e da autorização no backend. Service accounts, URIs com senha, tokens e arquivos `.env` nunca devem ser versionados.

Se algum segredo real já tiver sido publicado, removê-lo do último commit não basta: revogue ou rotacione a credencial e só depois limpe o histórico.
