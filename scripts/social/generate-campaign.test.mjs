import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCopies, campaignUrl, makeSvg, parsePost } from './generate-campaign.mjs';

const source = `---
lang: es
slug: prueba
title: "La velocidad no reemplaza una buena decisión"
description: "Una descripción suficiente para la prueba."
excerpt: "Hacer más trabajo no garantiza resolver el problema correcto."
category: Tecnología
keywords: [producto, decisiones]
---

Una herramienta puede acelerar el trabajo. La decisión sigue siendo humana.

## Define el problema

Antes de producir, explica qué debería cambiar para la persona usuaria.

## Mide el resultado

La actividad no equivale a un resultado útil.

## Conserva una salida

Una solución segura también se puede revertir.
`;

const platforms = {
  x: { copy_limit: 280, utm_source: 'x', utm_medium: 'organic_social' },
  reddit: { copy_limit: 10000, utm_source: 'reddit', utm_medium: 'community' },
  facebook_groups: { copy_limit: 5000, utm_source: 'facebook', utm_medium: 'community' },
  linkedin: { copy_limit: 3000, utm_source: 'linkedin', utm_medium: 'organic_social' },
  instagram: { copy_limit: 2200, utm_source: 'instagram', utm_medium: 'organic_social' },
  threads: { copy_limit: 500, utm_source: 'threads', utm_medium: 'organic_social' },
};

test('extrae metadatos y secciones sin inventar contenido', () => {
  const post = parsePost(source);
  assert.equal(post.slug, 'prueba');
  assert.deepEqual(post.keywords, ['producto', 'decisiones']);
  assert.equal(post.sections.length, 3);
  assert.match(post.sections[0].insight, /Antes de producir/);
});

test('genera un post estándar de X dentro del límite', () => {
  const post = parsePost(source);
  const copies = buildCopies(post, platforms, '20260808-prueba');
  assert.ok(copies.x.single_post.length <= 280, `Longitud: ${copies.x.single_post.length}`);
  assert.ok(copies.x.thread.every((item) => item.length <= 280));
});

test('añade UTM trazables por plataforma', () => {
  const url = new URL(campaignUrl(parsePost(source), 'reddit', platforms, '20260808-prueba'));
  assert.equal(url.searchParams.get('utm_source'), 'reddit');
  assert.equal(url.searchParams.get('utm_campaign'), '20260808');
});

test('produce artes SVG accesibles en los tres formatos', () => {
  for (const format of ['landscape', 'square', 'portrait']) {
    const svg = makeSvg(parsePost(source), format);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /blog\.jossuealcala\.com/);
  }
});
