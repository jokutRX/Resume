<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'

// --- Логика полоски прогресса скролла ---
const scrollProgress = ref(0)
const updateScrollProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const scrollableDistance = scrollHeight - clientHeight
  if (scrollableDistance > 0) {
    scrollProgress.value = (window.scrollY / scrollableDistance) * 100
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    
    <!-- Полоска прогресса -->
    <div class="fixed top-0 left-0 w-full h-1 z-[9999]">
      <div class="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" :style="{ width: scrollProgress + '%' }"></div>
    </div>
    
    <TheHeader />
    
    <!-- ИСПРАВЛЕНИЕ: Убрали <Transition>, так как она ломала навигацию -->
    <RouterView />
    
  </div>
</template>

<!-- Стили удалили, так как они относились к <Transition> -->