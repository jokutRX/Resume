<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase } from 'lucide-vue-next'

const sectionRef = ref<HTMLElement | null>(null)
const displayedYears = ref(0)
const progressPercentage = ref(0) 
const targetYears = 1.5
let ticking = false

const updateCounter = () => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  const startPoint = windowHeight * 0.8
  const middlePoint = windowHeight * 0.3
  const endPoint = -windowHeight * 0.2
  const top = rect.top
  let progress = 0

  if (top > middlePoint && top <= startPoint) {
    progress = (startPoint - top) / (startPoint - middlePoint)
  } else if (top > endPoint && top <= middlePoint) {
    progress = 1
  } else if (top <= endPoint) {
    progress = 1 - (Math.abs(top - endPoint) / (windowHeight * 0.5))
  }

  progress = Math.max(0, Math.min(1, progress))
  displayedYears.value = parseFloat((progress * targetYears).toFixed(1))
  progressPercentage.value = progress * 100
  ticking = false
}

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateCounter)
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateCounter()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section ref="sectionRef" id="experience" class="py-12 md:py-20 overflow-hidden">
    <div class="container mx-auto max-w-screen-xl px-4">
      
      <div class="text-center mb-8 animate-fade-in-up" style="animation-delay: 0ms;">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Опыт работы</h2>

        <div class="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-6 animate-fade-in-up" style="animation-delay: 100ms;">
          <div class="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-glow z-0"></div>
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow z-10"></div>
          
          <svg class="w-full h-full -rotate-90 z-20 relative" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" stroke-width="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" stroke-width="10" stroke-linecap="round"
              :stroke-dasharray="326.73"
              :stroke-dashoffset="326.73 - (326.73 * progressPercentage / 100)"
              style="transition: none;" />
          </svg>

          <div class="absolute inset-0 flex flex-col items-center justify-center z-30">
            <span class="text-5xl md:text-6xl font-extrabold text-primary tabular-nums leading-none">{{ displayedYears }}</span>
            <span class="text-xs md:text-sm text-muted-foreground font-medium mt-1 tracking-widest uppercase">Года</span>
          </div>
        </div>

        <p class="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          коммерческой разработки в создании масштабных и современных веб-приложений
        </p>
      </div>

      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16 animate-fade-in-up" style="animation-delay: 200ms;">
        
        <!-- ДОБАВЛЕН ID ДЛЯ СТРЕЛКИ -->
        <Card id="exp-card-1" class="bg-muted/40 border hover:border-primary/30 transition-colors">
          <CardContent class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <Badge variant="secondary" class="font-normal">6 месяцев</Badge>
              <Briefcase class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-foreground">Стадион «Кировец»</h3>
              <p class="text-sm text-muted-foreground mt-1">Frontend разработчик</p>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">
              Разработка интерфейсов для цифровых сервисов стадиона. Работа с адаптивной версткой, интеграция API и оптимизация пользовательского пути.
            </p>
          </CardContent>
        </Card>

        <!-- ДОБАВЛЕН ID ДЛЯ СТРЕЛКИ -->
        <Card id="exp-card-2" class="bg-muted/40 border hover:border-primary/30 transition-colors">
          <CardContent class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <Badge variant="secondary" class="font-normal">1 год</Badge>
              <Briefcase class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-foreground">Локатор</h3>
              <p class="text-sm text-muted-foreground mt-1">Frontend разработчик</p>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">
              Поддержка и развитие масштабного веб-приложения. Рефакторинг legacy-кода, внедрение новых фич и работа со сложной стейт-менеджмент логикой.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s ease-out forwards;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>