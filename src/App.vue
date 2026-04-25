<script setup lang="ts">
import { RouterView } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 p-8">
    <h1 class="text-5xl font-bold tracking-tight">Мое резюме</h1>
    <p class="text-xl text-muted-foreground">Vue + Tailwind + Shadcn работают идеально!</p>
    
    <div class="flex gap-4 mt-4">
      <Button>Связаться со мной</Button>
      <Button variant="outline">Скачать PDF</Button>
      <Button variant="secondary">Вторичная</Button>
      <Button variant="destructive">Опасная</Button>
    </div>
    
    <!-- RouterView пока оставим тут, он нужен для Vue Router -->
    <RouterView />
  </div>
</template>