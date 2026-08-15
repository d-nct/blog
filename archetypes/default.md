---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
description: "Uma breve síntese ou subtítulo do post para exibição nas prévias e SEO."
categories:
  - "Gastronomia" # Gastronomia | Bares por Aí | Matemática | Carnaval
tags:
  - "artigo"
cover:
  image: "" # Ex: "/images/capa.jpg" ou URL externa
  alt: "Texto alternativo da imagem de capa"
  caption: "Legenda opcional da imagem"
toc: true # Exibe índice automático caso haja títulos (h2, h3)
math: false # Ativa renderização de fórmulas LaTeX / KaTeX ($ ou $$)
---

## Introdução

Escreva seu texto aqui. Você pode utilizar formatação padrão Markdown:

- Listas de tópicos
- **Negrito**, *itálico*, links e imagens

## Exemplo de Seção

> Citações ou destaques podem ser feitos usando blockquotes.

```python
# Blocos de código com destaque de sintaxe
def ola_mundo():
    print("Olá, leitor!")
```
