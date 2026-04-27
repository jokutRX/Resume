<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <TheHeader />
    
    <main>
      <HeroSection />
      <SkillsSection />
    </main>
  </div>
</template>