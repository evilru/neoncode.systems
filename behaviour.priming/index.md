---
layout: home

hero:
  name: "//behaviour.priming"
  text: "Stop thinking for the LLM."
  tagline: Give it a disposition. Let it find the path.
  actions:
    - theme: alt
      text: See the Minimal Prompt
      link: "#minimal-prompt"
    - theme: brand
      text: See the Charged Prompt
      link: "#charged-prompt"

features:
  - icon: "1️⃣"
    title: Define Behaviour
    details: Describe how the LLM should think, act, and interact. Give it a character, a stance, a way of operating — not a script.
  - icon: "2️⃣"
    title: Define Outcome
    details: Specify what success looks like. What should exist when the session is over? Files, decisions, artefacts — make it concrete.
  - icon: "3️⃣"
    title: LLM Finds the Path
    details: The model determines the best route. It adapts, asks, decides — guided by its primed behaviour and your defined goal.
---

> *A cast with scripts performs. Characters with depth find the play.*

## Why it works

### Delegate the path. Keep the standards.

Behaviour Priming replaces procedures with principles, decision rules, and verification gates. You delegate the path — but keep the standards. Unlike role-prompting, you're not assigning a character. You're encoding a decision-making framework.

| ⛓️ Procedure-first | ✦ Principle-first |
|---|---|
| Step-by-step workflow instructions | ✔️ Principles, decision rules, verification gates |
| Breaks when situation drifts | ✔️ Adapts naturally to context |
| You manage every edge case | ✔️ Model handles edge cases itself |
| Prompt gets longer with every issue | ✔️ Stays minimal, stays focused |

## Use Cases

### Works wherever the LLM needs to act.

Best in sessions with user interaction — but equally effective in fully autonomous agentic tasks.

- 💬 **Chat Agents** — Prime a persona and desired outcome before any conversation starts. The agent navigates the chat to get there.
- 🔬 **Discovery & Interviews** — Give the model an interviewer's mindset and a document to produce. It runs the session.
- ⚙️ **Technical Agentic Tasks** — Define an engineering behaviour and a deliverable. Let the agent decide how to build it.
- 🧠 **Teaching & Coaching** — Prime a teaching philosophy and learning outcome. The model adapts to the learner's zone in real time.

## The Spectrum

### Both work. One works harder.

A minimal Behaviour Priming prompt tends to outperform a procedure-first prompt in interactive, drift-heavy sessions. But when the behaviour is *designed* — every phrase chosen to tune a specific response, every principle stated to prevent a known failure mode — the outcome doesn't just happen. It emerges.

## Minimal Prompt {#minimal-prompt}

### Two fields. That's all it takes.

No workflow. No edge case handling. The model decides how to get there.

::: tip Copy this prompt
Two inputs. The model decides how to run the interview, what to ask, when to stop, and how to structure the output.
:::

```markdown
Behaviour: Act as Bob Moesta. Conduct a Jobs-to-be-Done interview.

Outcome:
- jobs/{name}.md
- .github/prompts/{name}.prompt.md
```

## Go Deeper

### When the behaviour is designed.

Intentional redundancy. Overlapping phrasing stabilizes behaviour and reduces drift across long sessions. The charged prompt looks long — it might look badly written. That's by design. Each phrase is a behaviour instruction. Each section tunes a specific response pattern. The LLM isn't told what to do. It's *shaped* into something that **strongly biases the model toward the behaviour you need.**

## Charged Prompt {#charged-prompt}

### The same intent. Fully primed.

The Jobs-to-be-Done Interview Coach — the same Bob Moesta, the same outcome. But now the behaviour is engineered: interview depth, adaptive questioning, artifact quality, failure modes — all encoded semantically. Both work. This one works harder.

::: tip Copy this prompt
Both work. This one works harder.
:::

````markdown
<!--@include: ../.github/prompts/job-to-be-done-discovery.prompt.md-->
````

## Limits

### Not for everything.

Behaviour Priming works where judgment, adaptation, and context matter. There are places it doesn't belong.

- ⚙️ **Deterministic pipelines** — When every step must execute in a fixed sequence and be auditable, use a procedure. Not this.
- 📋 **Compliance workflows** — Regulated outputs with zero tolerance for variation need scripts, not principles.
- 📐 **Strict output schemas** — If the format is the contract — JSON, XML, exact field mappings — enforce it structurally, not behaviourally.
