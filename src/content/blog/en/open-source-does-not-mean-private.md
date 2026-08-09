---
lang: en
slug: open-source-does-not-mean-private
counterpartSlug: open-source-no-significa-privado
title: "An open source agent can still send your code to third parties"
description: "The license of a tool does not determine where its code, prompts, and project context are processed."
excerpt: "To know whether a tool is private, you need to review its model, provider, extensions, and complete configuration."
category: Technology
categorySlug: technology
counterpartCategorySlug: tecnologia
publishedAt: 2026-08-06T18:00:00-06:00
readMinutes: 4
featured: false
draft: false
heroImage: ../../../assets/blog/social-feed/agent-security.png
heroAlt: "A digital agent protected by layers, with credentials and data outside its perimeter"
keywords: [open source, privacy, local agents, OpenCode, local models]
author:
  name: Jossue Alcalá
sources:
  - label: "OpenCode — open source coding agent"
    url: "https://opencode.ai/"
  - label: "OpenCode Docs — Providers"
    url: "https://opencode.ai/docs/providers/"
publication:
  publish: true
---

An open source tool lets you inspect its code, modify it, and host it yourself. All of that helps protect sensitive information. The license alone, however, does not guarantee that the contents of your repository stay on your computer.

An agent also depends on the model that responds, the provider that runs it, and the connected services. Each part may handle data differently.

## Review the path your data takes

OpenCode states that it does not store your code or context and that it supports local models. If you choose a model installed on your computer, much of the processing can happen there.

If you connect the same tool to an external provider, it must send the information needed to respond. You then need to review that provider's terms: what it retains, for how long, and how it may use the data.

The interface remains open source. The processing is no longer completely local.

## A local model still needs limits

Running the model on your computer reduces the amount of information that leaves it, but the agent may still have access to the internet, remote repositories, system tools, and variables containing secrets.

It may also install extensions or call external services. That is why it is useful to limit folders, commands, and connections even when the model is local.

## Questions to ask about a tool

Before using it with a real repository, I would check:

- Which files it can read.
- What information it sends to the model provider.
- Whether data is used for training.
- How long logs are retained.
- Which extensions and services have access.
- Whether credentials are separated by project.

If those answers are not documented, we still do not know whether the configuration is suitable for sensitive information.

## Why open source still matters

Access to the code makes audits easier and allows parts of the system to be replaced. It also reduces dependence on a single interface.

That is an important advantage, but privacy depends on the complete configuration. The license creates the opportunity to inspect and control the tool; the team must still decide how to run it and which services to connect.
