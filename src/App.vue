<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Подключаем наш Header -->
    <TheHeader />

    <main class="container mx-auto max-w-screen-xl flex flex-col items-center justify-center gap-6 p-8 mt-20">
      <h1 class="text-5xl font-bold tracking-tight">Привет, я разработчик</h1>
      <p class="text-xl text-muted-foreground">Нажми на кисточку вверху справа, чтобы изменить цвет кнопок!</p>
      
      <div class="flex gap-4 mt-4">
        <Button>Основная кнопка</Button>
        <Button variant="outline">Контурная кнопка</Button>
      </div>
    </main>
  </div>
</template>