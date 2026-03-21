<template>
  <section class="nc-hero">
    <p v-if="$slots.label" class="section-label"><slot name="label" /></p>
    <h1><span class="nc-hero-title"><slot name="title" /></span></h1>
    <p v-if="$slots.tagline" class="nc-hero-tagline"><slot name="tagline" /></p>
  </section>
</template>
