---
layout: page
title: What's left when development is autonomous.
---

<NcHero>
  <template #label>thinking / 2026-03-19</template>
  <template #title>What's left when development is autonomous.</template>
</NcHero>

<section class="nc-section nc-section-border-top">
<p>Assume the agent handles implementation. Another agent handles operations — Terraform, Kubernetes, configuration, deployment. Both are nearly there today. In 1–2 years, close enough.</p>

<p>What's the loop that remains?</p>

<div class="nc-quote">
<p>Data → Hypothesis → A/B Test → Requirement → Data → ...</p>
</div>

<p>That's it. That's the residual human loop — not because it can't be automated, but because it's the loop where organizational intelligence lives. Where business context meets system signal. Where intent is formed.</p>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">The data that drives it</p>
<h2>Requirements are data too.</h2>

<p>Most agentic SDLC thinking focuses on the execution layer: faster code, automated deploys. That's the easy part. The harder insight is that the entire input surface is data:</p>

<div class="nc-compare">
<div class="nc-compare-card">
<p class="label">Infrastructure signals</p>
<p>Terraform state, K8s events, resource metrics, config drift</p>
</div>
<div class="nc-compare-card">
<p class="label">Application signals</p>
<p>Traces, error rates, latency, A/B results, conversion</p>
</div>
<div class="nc-compare-card">
<p class="label">Business signals</p>
<p>KPIs, user behavior, feature requests, support patterns</p>
</div>
<div class="nc-compare-card">
<p class="label">Requirement signals</p>
<p>User feedback, issues, stated needs — <strong>structurally identical to the others</strong></p>
</div>
</div>

<p>When requirements are treated as data, the loop closes. The system can generate hypotheses, run experiments, implement winners, measure outcomes — and feed results back as new signal. At every layer simultaneously.</p>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">The wrong question</p>
<h2>Why is everyone building a human process in an agent?</h2>

<p>Current agentic SDLC approaches copy the shape of how humans work: ticket → branch → PR → review → deploy. The same steps, faster. That's not a new process. That's an old process with a faster executor.</p>

<p>The right question isn't "how do we automate what developers do?" It's "what does a process look like that was designed for an agent from the start?"</p>

<p>An agent doesn't need a ticket system. It needs a signal. It doesn't need a sprint. It needs a priority function. It doesn't need a PR. It needs a verification gate.</p>

<div class="nc-quote">
<p>"Fix your processes. Then automate them."</p>
</div>

<p>The sequence matters. AI on top of broken processes doesn't produce better software faster. It produces broken software faster.</p>
</section>

<section class="nc-section nc-section-border-top">
<p class="section-index">Where this is going</p>
<h2>This is a working concept, not a finished argument.</h2>
<p>Some of this I'm exploring with others. What the data loop actually looks like in practice. Where humans stay in the loop not because they have to, but because they add something irreplaceable. What the MCP layer means for frontend — and whether what we call "the web" is about to change shape again.</p>
<p>More as it becomes clearer.</p>
</section>
