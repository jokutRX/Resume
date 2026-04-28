<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'

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
    
    <main class="relative">
      <HeroSection />
      <SkillsSection />
      
      <!-- overflow-hidden убирает второй скролл от цветных пятен -->
      <div class="relative overflow-hidden">
        <ExperienceSection />
        
        <!-- АНИМИРОВАННЫЙ ЦВЕТНОЙ МОСТ -->
        <div class="aurora-bridge">
          <div class="aurora-blob blob-1"></div>
          <div class="aurora-blob blob-2"></div>
          <div class="aurora-blob blob-3"></div>
        </div>

        <ProjectsSection />
      </div>

    </main>
  </div>
</template>

<style>
/* ==========================================
   МАГИЯ AURORA (Адаптивная под обе темы)
   ========================================== */

.aurora-bridge {
  position: absolute;
  top: 30%;
  left: -10%;
  width: 120%;
  height: 80%;
  z-index: 0; 
  filter: blur(100px); 
  pointer-events: none; 
  overflow: hidden;
  
  /* СВЕТЛАЯ ТЕМА: Режим умножения дает красивый акварельный эффект */
  mix-blend-mode: multiply; 
  opacity: 0.6;
}

/* ТЕМНАЯ ТЕМА: Класс .dark добавляется Shadcn на тег html */
.dark .aurora-bridge {
  /* Режим осветления дает неоновое свечение */
  mix-blend-mode: screen; 
  opacity: 0.5;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  width: 50%;
  height: 60%;
}

.blob-1 {
  background: radial-gradient(circle, #a855f7 0%, transparent 70%);
  top: 10%;
  left: 10%;
  animation: float-1 12s ease-in-out infinite alternate;
}

.blob-2 {
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  top: 40%;
  right: 10%;
  animation: float-2 15s ease-in-out infinite alternate;
}

.blob-3 {
  background: radial-gradient(circle, #ec4899 0%, transparent 70%);
  bottom: 10%;
  left: 40%;
  animation: float-3 10s ease-in-out infinite alternate;
}

@keyframes float-1 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(100px, 50px) scale(1.2); }
}

@keyframes float-2 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-80px, -60px) scale(0.9); }
}

@keyframes float-3 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(50px, -80px) scale(1.1); }
}
</style>