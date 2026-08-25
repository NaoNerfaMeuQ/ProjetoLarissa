# 🛡️ Guia de Segurança e Auditoria do Projeto

Documento de referência para acompanhamento das vulnerabilidades, configurações de segurança e melhorias arquiteturais antes e depois de publicar o projeto.

---

## 📋 Checklist de Ações

- [ ] **1. Google Cloud Console / Firebase:** Restringir chave de API (HTTP Referrers e escopos de API).
- [ ] **2. Firebase Auth:** Desabilitar cadastro público de usuários (permitir apenas contas criadas pelo admin).
- [ ] **3. Backend (API):** Implementar validação de papel/e-mail no token JWT (`Authorization: Bearer <token>`).
- [x] **4. Angular Frontend (`story.ts`):** Trocar URL hardcoded `http://localhost:8080` por `environment.apiUrl`.
- [x] **5. Angular Build (`angular.json`):** Adicionar `fileReplacements` para o build de produção.
- [x] **6. Dependência (`app.config.ts`):** Adicionar `provideHttpClient()` aos providers do Angular.
- [x] **7. Upload de Imagens no Frontend (`storage.ts` & `minhas-historias.ts`):** Migrado de Base64 para Firebase Storage (`StorageService.uploadImagem`).
- [ ] **8. Regras do Firebase Storage (`storage.rules`):** Configurar leitura pública e escrita apenas para autenticados.
- [ ] **9. Sanitização no Backend:** Adicionar biblioteca de sanitização de HTML (Jsoup / DOMPurify) no backend.
- [x] **10. Dados Pessoais / Profissionais (`sobre.ts`):** Centralizadas variáveis profissionais de e-mail e contato.

---

## 🔍 Passo a Passo para os Itens Pendentes

### 1. Restringir a Chave de API do Firebase (Google Cloud)
* **Onde:** [Google Cloud Console - Credenciais](https://console.cloud.google.com/apis/credentials)
* **Objetivo:** Evitar que terceiros utilizem a sua chave Firebase em outros sites/aplicativos.
* **Passos:**
  1. No menu superior, selecione o projeto `larissahub`.
  2. Na seção **Chaves de API**, clique no botão de edição (ícone de lápis) ao lado da chave (`AIzaSyBKAYhk...`).
  3. Em **Restrições de aplicativo**, selecione **Sites da Web (HTTP referrers)**:
     - `http://localhost:*` (para testes locais)
     - `https://seu-dominio-producao.com/*` (quando publicar na Vercel/Firebase Hosting/Cloudflare)
  4. Em **Restrições de API**, selecione **Restringir chave** e marque:
     - *Identity Toolkit API*
     - *Token Service API*
     - *Cloud Storage for Firebase*
  5. Clique em **Salvar**.

---

### 2. Desabilitar Cadastro Público no Firebase Auth
* **Onde:** [Firebase Console - Authentication](https://console.firebase.google.com/project/larissahub/authentication/settings)
* **Objetivo:** Garantir que visitantes aleatórios não consigam criar contas de autor.
* **Passos:**
  1. Vá em **Authentication** > aba **Configurações** (*Settings*).
  2. Clique em **Ações do usuário** (*User actions*).
  3. **Desmarque** a caixa *"Permitir que os usuários se inscrevam"* (*Enable create / sign-up*).
  4. Para criar o usuário da autora (Larissa), use a aba **Users** > **Adicionar usuário** manualmente informando o e-mail e uma senha forte.

---

### 3. Regras de Segurança do Firebase Storage (`storage.rules`)
* **Onde:** [Firebase Console - Storage](https://console.firebase.google.com/project/larissahub/storage/rules)
* **Objetivo:** Permitir que todo o público veja as imagens das histórias, mas que **somente a usuária autenticada** possa fazer upload ou apagar imagens.
* **Regras Recomendadas:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Imagens de capas e conteúdo dos posts
    match /{folder}/{allPaths=**} {
      // Qualquer visitante pode visualizar as fotos públicas do portfólio
      allow read: if true;
      
      // Apenas a usuária logada via Firebase Auth pode enviar arquivos
      // Validações extras: máximo de 5MB e apenas arquivos de imagem
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

### 4. Controle de Acesso no Backend (RBAC / Spring Boot ou Node)
* **Objetivo:** O backend deve garantir que apenas o token JWT pertencente ao e-mail da autora possa executar `POST /api/stories` e `DELETE /api/stories/{id}`.

#### Exemplo em Java (Spring Boot Filter / Security):
```java
@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // Endpoints de leitura são públicos (GET)
        if ("GET".equalsIgnoreCase(method)) {
            filterChain.doFilter(request, response);
            return;
        }

        // POST e DELETE exigem validação do token Firebase
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String idToken = authHeader.substring(7);
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String email = decodedToken.getEmail();

            // Valida se é o e-mail da Larissa
            if (!"larissacampos.autora@gmail.com".equalsIgnoreCase(email)) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }

            filterChain.doFilter(request, response);
        } catch (FirebaseAuthException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
```

---

### 5. Sanitização de HTML no Backend (Prevenção de XSS)
* **Objetivo:** Antes de salvar o HTML de uma história no banco de dados, limpar scripts e injeções maliciosas.

#### Exemplo com biblioteca Jsoup (Java):
```java
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

public String sanitizarConteudo(String htmlNaoConfiável) {
    // Permite formatações ricas de texto, parágrafos, imagens e links seguros
    Safelist safelist = Safelist.relaxed()
        .addTags("figure", "figcaption")
        .addAttributes("img", "src", "alt", "style", "class")
        .addProtocols("img", "src", "http", "https", "data");

    return Jsoup.clean(htmlNaoConfiável, safelist);
}
```

#### Exemplo com DOMPurify (Node.js):
```javascript
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitizarConteudo(html) {
    return DOMPurify.sanitize(html);
}
```
