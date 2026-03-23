---
layout: home
title: "//behaviour.priming — NEONCODE!"
head:
  - - meta
    - name: description
      content: "Behaviour Priming replaces step-by-step LLM instructions with a designed semantic field. Stable behaviour, no drift, minimal prompts. See the method and live examples."
  - - meta
    - name: keywords
      content: "behaviour priming, LLM behaviour design, prompt architecture, semantic field, stable prompts, autonomous agent, prompt method"
  - - meta
    - property: og:title
      content: "//behaviour.priming — NEONCODE!"
  - - meta
    - property: og:description
      content: "Replace instruction lists with designed semantic fields. The LLM finds the path. No duct tape."
  - - meta
    - name: twitter:title
      content: "//behaviour.priming — NEONCODE!"
  - - meta
    - name: twitter:description
      content: "Replace instruction lists with designed semantic fields. The LLM finds the path."

hero:
  name: "//behaviour:priming"
  text: "Let the LLM <em>do the thinking</em>."
  tagline: "Prime the behaviour. Let go."
  actions:
    - theme: alt
      text:  See the Minimal Prompt
      link: "#minimal-prompt"
    - theme: brand
      text: See the Charged Prompt
      link: "#charged-prompt"
---

<section class="nc-section nc-section-border-top">
<p class="section-index">01 — Method</p>
<h2>Set the stage. <em>The model finds the play.</em></h2>
<p>Instead of scripting every step, you set the stage. Two inputs. One autonomous agent.</p>
<div class="nc-steps">
<div class="nc-step">
<span class="nc-step-number">1</span>
<h3>Define Behaviour</h3>
<p>Describe how the LLM should think, act, and interact. Give it a character, a stance, a way of operating — not a script.</p>
</div>
<div class="nc-step">
<span class="nc-step-number">2</span>
<h3>Define Outcome</h3>
<p>Specify what success looks like. What should exist when the session is over? Files, decisions, artefacts — make it concrete.</p>
</div>
<div class="nc-step">
<span class="nc-step-number">3</span>
<h3>LLM Finds the Path</h3>
<p>The model determines the best route. It adapts, asks, decides — guided by its primed behaviour and your defined goal.</p>
</div>
</div>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">02 — Principle, not procedure</p>
<h2>Delegate the path. <em>Keep the standards.</em></h2>
<p>Behaviour Priming replaces procedures with principles, decision rules, and verification gates. You delegate the path — but keep the standards. Unlike role-prompting, you're not assigning a character. You're encoding a decision-making framework.</p>
<div class="nc-compare nc-compare-spaced">
<div class="nc-compare-card">
<h4>⛓️ Procedure-first</h4>
<ul>
<li>Step-by-step workflow instructions</li>
<li>Breaks when situation drifts</li>
<li>You manage every edge case</li>
<li>Prompt gets longer with every issue</li>
</ul>
</div>
<div class="nc-compare-card nc-compare-highlight">
<h4>✦ Principle-first</h4>
<ul>
<li>Principles, decision rules, verification gates</li>
<li>Adapts naturally to context</li>
<li>Model handles edge cases itself</li>
<li>Stays minimal, stays focused</li>
</ul>
</div>
</div>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">03 — Use Cases</p>
<h2>Works wherever the LLM <em>needs to act.</em></h2>
<p>Best in sessions with user interaction — but equally effective in fully autonomous agentic tasks.</p>
<div class="nc-usecases">
<div class="nc-usecase">
<span class="nc-usecase-icon">💬</span>
<div>
<h4>Chat Agents</h4>
<p>Prime a persona and desired outcome before any conversation starts. The agent navigates the chat to get there.</p>
</div>
</div>
<div class="nc-usecase">
<span class="nc-usecase-icon">🔬</span>
<div>
<h4>Discovery &amp; Interviews</h4>
<p>Give the model an interviewer's mindset and a document to produce. It runs the session.</p>
</div>
</div>
<div class="nc-usecase">
<span class="nc-usecase-icon">⚙️</span>
<div>
<h4>Technical Agentic Tasks</h4>
<p>Define an engineering behaviour and a deliverable. Let the agent decide how to build it.</p>
</div>
</div>
<div class="nc-usecase">
<span class="nc-usecase-icon">🧠</span>
<div>
<h4>Teaching &amp; Coaching</h4>
<p>Prime a teaching philosophy and learning outcome. The model adapts to the learner's zone in real time.</p>
</div>
</div>
</div>
</section>

<section class="nc-section">
<div class="nc-quote">
<p>A cast with scripts performs. Characters with depth find the play.</p>
</div>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">04 — The Spectrum</p>
<h2>Both work. <em>One works harder.</em></h2>
<p>A minimal Behaviour Priming prompt tends to outperform a procedure-first prompt in interactive, drift-heavy sessions. But when the behaviour is <em>designed</em> — every phrase chosen to tune a specific response, every principle stated to prevent a known failure mode — the outcome doesn't just happen. It emerges.</p>
</section>

<section class="nc-section nc-section-border-top" id="minimal-prompt">
<p class="section-index">05 — Minimal</p>
<h2>Two fields. <em>That's all it takes.</em></h2>
<p>No workflow. No edge case handling. The model decides how to get there.</p>
<div class="nc-prompt-box">
<div class="nc-prompt-header">
<span>behaviour-priming.prompt.md</span>
</div>
<div class="nc-prompt-body"><strong>Behaviour:</strong> Act as Bob Moesta. Conduct a Jobs-to-be-Done interview.<br><br><strong>Outcome:</strong><br><span class="nc-prompt-path">- jobs/{name}.md</span><span class="nc-prompt-path">- .github/prompts/{name}.prompt.md</span></div>
<div class="nc-prompt-footer">
<p><strong>Two inputs.</strong> The model decides how to run the interview, what to ask, when to stop, and how to structure the output.</p>
</div>
</div>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">06 — Go Deeper</p>
<h2>When the behaviour <em>is designed.</em></h2>
<p>A charged prompt isn't written phrase by phrase — it's compiled from intent. Intentional redundancy. Overlapping phrasing stabilizes behaviour and reduces drift across long sessions. The charged prompt looks long — it might look badly written. That's by design. Each phrase is a behaviour instruction. Each section tunes a specific response pattern. The LLM isn't told what to do. It's shaped into something that <strong>strongly biases the model toward the behaviour you need.</strong></p>
</section>

<section class="nc-section nc-section-border-top" id="charged-prompt">
<p class="section-index">07 — Charged</p>
<h2>The same intent. <em>Fully primed.</em></h2>
<p>The Jobs-to-be-Done Interview Coach — the same Bob Moesta, the same outcome. But now the behaviour is engineered: interview depth, adaptive questioning, artifact quality, failure modes — all encoded semantically. Both work. This one works harder.</p>

::: tip Copy this prompt
Both work. This one works harder.
:::

````markdown
<!--@include: ../.github/prompts/job-to-be-done-discovery.prompt.md-->
````

</section>

<!-- 
<section class="nc-section nc-section-border-top">
<p class="section-index">08 — Limits</p>
<h2><em>Not for everything.</em></h2>
<p>Behaviour Priming works where judgment, adaptation, and context matter. There are places it doesn't belong.</p>
<div class="nc-usecases">
<div class="nc-usecase nc-usecase-muted">
<span class="nc-usecase-icon">⚙️</span>
<div>
<h4>Deterministic pipelines</h4>
<p>When every step must execute in a fixed sequence and be auditable, use a procedure. Not this.</p>
</div>
</div>
<div class="nc-usecase nc-usecase-muted">
<span class="nc-usecase-icon">📋</span>
<div>
<h4>Compliance workflows</h4>
<p>Regulated outputs with zero tolerance for variation need scripts, not principles.</p>
</div>
</div>
<div class="nc-usecase nc-usecase-muted">
<span class="nc-usecase-icon">📐</span>
<div>
<h4>Strict output schemas</h4>
<p>If the format is the contract — JSON, XML, exact field mappings — enforce it structurally, not behaviourally.</p>
</div>
</div>
</div>
</section> 
-->

<section class="nc-final">
<h2>See if it works for you.</h2>
<p>Submit a use case. I'll build a prompt with Behaviour Priming. You test both — you decide.</p>
<p><a href="/prompt.forge/">//prompt.forge →</a></p>
</section>

