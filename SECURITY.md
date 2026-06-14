# Security Policy — PortfolioHUB

## Versões Suportadas

Este projeto é um site estático hospedado via GitHub Pages. Apenas a versão mais recente da branch `main` recebe atualizações de segurança.

| Versão         | Status          |
| -------------- | --------------- |
| `main` (atual) | ✅ Suportada    |
| Versões antigas | ❌ Não suportadas |

---

## Como Reportar uma Vulnerabilidade

**Não abra uma Issue pública** para reportar vulnerabilidades de segurança.

Entre em contato diretamente por e-mail: **vitor.g.muzzi@sempreceub.com**

Inclua na mensagem:
- Descrição clara da vulnerabilidade
- Passos para reproduzir o problema
- Impacto potencial estimado
- (Opcional) Sugestão de correção

**Tempo de resposta esperado:** até 48 horas após o recebimento.

---

## Medidas de Segurança Implementadas

### Segurança do Repositório

| Medida                      | Status | Descrição |
| --------------------------- | ------ | --------- |
| Branch Protection (`main`)  | ✅     | Push direto bloqueado; mudanças exigem Pull Request |
| Autenticação 2FA            | ✅     | 2FA habilitado na conta do proprietário |
| Dependabot Alerts           | ✅     | Alertas automáticos para dependências vulneráveis |
| Secret Scanning             | ✅     | Varredura ativa para prevenir exposição de tokens e chaves |
| Code Scanning               | ✅     | Análise estática de código ativada |

### Segurança do Código

- **Nenhum dado sensível no código-fonte:** Chaves de API, senhas e tokens nunca são commitados.
- **Integração via API pública do GitHub:** O site utiliza apenas endpoints públicos — nenhum token é exposto no client-side.
- **Sem código server-side:** Como site estático, a superfície de ataque é mínima — não há backend comprometível.
- **Dependências com versão fixada:** Font Awesome 6.4.0 é carregado de CDN confiável com versão explícita.

### Controle de Acesso

| Aspecto               | Configuração                        |
| --------------------- | ----------------------------------- |
| Visibilidade do repo  | Público (portfólio)                 |
| Escrita no repo       | Somente o proprietário              |
| Deploy automático     | GitHub Pages via branch `main`      |
| Colaboradores externos | Somente com permissão de leitura   |

---

## Boas Práticas Seguidas

- Nenhum dado de usuário é coletado, armazenado ou transmitido
- Sem cookies ou localStorage com informações sensíveis
- Links externos usam `target="_blank"` (comportamento `noopener` implícito em navegadores modernos)
- CSP (Content Security Policy) aplicada via cabeçalhos do GitHub Pages
- Código revisado antes de cada merge para `main`

---

## Recursos de Referência

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Google Gemini — Boas Práticas de Segurança em Projetos Web](https://gemini.google.com)
