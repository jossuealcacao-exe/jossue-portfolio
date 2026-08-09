---
lang: en
slug: more-code-less-product
counterpartSlug: mas-codigo-menos-producto
title: "AI can write a lot of code and still fail to solve the problem"
description: "Generating functions and files faster helps, but product quality still depends on decisions, testing, and maintenance."
excerpt: "If the team still does not know what the user needs, producing code faster will not improve the outcome."
category: Web development
categorySlug: web-development
counterpartCategorySlug: desarrollo-web
publishedAt: 2026-08-06T12:00:00-06:00
readMinutes: 4
featured: false
draft: false
heroImage: ../../../assets/blog/social-feed/vibe-coding.png
heroAlt: "Rapidly generated code moving toward a digital structure that is still incomplete"
keywords: [generative AI, developer productivity, software quality, product, coding agents]
author:
  name: Jossue Alcalá
sources:
  - label: "Google — What is vibe coding?"
    url: "https://blog.google/innovation-and-ai/products/techspert-what-is-vibe-coding/"
  - label: "Claude — Claude Code"
    url: "https://claude.com/product/claude-code"
publication:
  publish: true
---

Coding agents can navigate a repository, edit several files, and run tests in a matter of minutes. They are especially useful for repetitive tasks and changes that used to consume a large part of the day.

The time savings are real. The problem begins when we measure the work by how much code was generated and stop asking whether the feature was necessary.

## The work begins before coding

In many projects, the hardest part is understanding what the user needs, reducing scope, and agreeing on how the result will be measured. Programming, testing, deployment, and maintenance come afterward.

An agent speeds up implementation. If the initial decision is unclear, it will quickly deliver a solution to a problem that may not have been well defined.

That is why I prefer to write the expected behavior first. What should the person be able to do? What should happen when something fails? How will we know the change worked?

## Cheap code generation also creates work

An idea can turn into twenty files in one afternoon. Someone will then have to read, correct, and maintain them.

When an agent proposes a large solution, I would check whether a smaller option exists. Sometimes configuration or a content change solves the same problem without adding another layer to the product.

I would also remove tests that no longer serve a purpose. Keeping every generated version makes the project harder to understand.

## How to measure the outcome

The number of lines and commits shows activity, but it does not explain whether the product improved. I prefer checks that are closer to the user:

- Whether they can complete the task.
- Whether errors decreased.
- Whether another person understands the change.
- Whether we can reverse it without affecting data.
- Whether operating costs remain reasonable.

AI can also help here. It can write tests, compare results, and prepare documentation so another person can review the work.

## How I use it

I use agents to investigate a repository, prepare a first implementation, and run checks. Before publishing, I review the change and confirm that it answers the original objective.

Speed is useful when it removes repetitive work. If it only increases the amount of code we must maintain, the savings disappear.
