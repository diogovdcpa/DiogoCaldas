# Diogo Caldas

Portfólio pessoal interativo de Diogo Caldas, com foco em cibersegurança, SecOps, perícia digital e pré-vendas técnicas. A experiência visual usa o formato de uma edição de história em quadrinhos com elementos de jogo.

## Estrutura

- `index.html`: conteúdo, estrutura semântica e metadados da página.
- `style.css`: estilos, layout responsivo, animações e temas visuais.
- `script.js`: dados do portfólio, renderização dos capítulos, interações e progresso.

## Executar localmente

O projeto não requer instalação de dependências nem etapa de build. Para servir os arquivos localmente com Python:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000` no navegador. Também é possível abrir `index.html` diretamente, mas um servidor local é recomendado para que todos os recursos do navegador, incluindo o cálculo de integridade SHA-256, funcionem corretamente.

## Funcionalidades

- Capítulos sobre competências, implantações, formação, certificações, missões e projetos.
- Progresso em XP, níveis e conquistas desbloqueados durante a navegação.
- Modo terminal, efeitos sonoros opcionais e animações que respeitam a preferência por movimento reduzido.
- Salvamento local do progresso pelo `localStorage` do navegador. Os dados não são enviados para um servidor.
- Resumo SHA-256 dos dados apresentados na página.

## SEO e compartilhamento

O HTML define o idioma `pt-BR`, título e descrição da página, metadados Open Graph e Twitter Card, além de dados estruturados `Person` em JSON-LD. A página não declara URL canônica nem imagem de compartilhamento; esses dados devem ser adicionados quando o domínio e a imagem oficial estiverem definidos.

## Recursos externos

Com conexão à internet, o site carrega fontes do Google Fonts e bibliotecas de animação e confete via CDN (GSAP, ScrollTrigger e canvas-confetti). Sem essas bibliotecas, o conteúdo e as interações principais continuam disponíveis, mas os efeitos visuais correspondentes podem não funcionar.
