<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Briefcase, Rocket, Code2, Server } from 'lucide-vue-next'

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
  <section ref="sectionRef" id="experience" class="py-12 md:py-20 overflow-hidden relative z-10">
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

      <!-- Обертка для всех карточек -->
      <div class="max-w-3xl mx-auto space-y-6 mt-12 md:mt-16 animate-fade-in-up" style="animation-delay: 200ms;">
        
        <!-- Сетка рабочих карточек -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- 1. Локатор -->
          <Card class="bg-background/60 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <CardContent class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <Badge variant="secondary" class="font-normal">июль 2025 - июль 2026</Badge>
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

          <!-- 2. Стадион «Кировец» -->
          <Card class="bg-background/60 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <CardContent class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <Badge variant="secondary" class="font-normal">Январь 2025 - Июнь 2025</Badge>
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

        </div>

        <!-- ==========================================
             КАРТОЧКА: АКТИВНО ИЗУЧАЮ (Динамичная)
             ========================================== -->
        <Card class="bg-background/60 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          <CardContent class="p-6 space-y-5">
            
            <!-- Заголовок с пульсирующим индикатором "Live" -->
            <div class="flex items-center gap-3">
              <div class="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <Rocket class="h-5 w-5 text-primary" />
                <!-- Зеленая пульсирующая точка -->
                <span class="absolute -top-1 -right-1 flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-foreground">Активно изучаю</h3>
                <p class="text-xs text-muted-foreground">Расширение экспертизы и инфраструктурные навыки</p>
              </div>
            </div>

            <Separator class="bg-white/10" />

            <!-- Блок 1: Backend для Frontend (Обновлено) -->
            <div class="space-y-3 p-3 -mx-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Code2 class="h-4 w-4 text-muted-foreground" />
                  <p class="text-sm font-medium text-foreground">Backend разработка</p>
                </div>
                <Badge variant="outline" class="text-xs font-normal">В процессе</Badge>
              </div>
              <p class="text-xs text-muted-foreground leading-relaxed pl-6">
                Активное изучение Backend для правильного и эффективного взаимодействия с серверной частью, написания оптимизированных запросов и понимания архитектуры данных.
              </p>
              <!-- Шкала прогресса -->
              <Progress :model-value="70" class="h-2 bg-white/10 pl-6" />
            </div>

            <Separator class="bg-white/10" />

            <!-- Блок 2: DevOps (Динамичный) -->
            <div class="space-y-3 p-3 -mx-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Server class="h-4 w-4 text-muted-foreground" />
                  <p class="text-sm font-medium text-foreground">DevOps и Инфраструктура</p>
                </div>
                <Badge variant="outline" class="text-xs font-normal">Активно</Badge>
              </div>
              <p class="text-xs text-muted-foreground leading-relaxed pl-6">
                Глубокое изучение Docker (написание сложных compose-сценариев для микросервисов), настройка CI/CD пайплайнов для полной автоматизации сборки и деплоя.
              </p>
              <!-- Шкала прогресса -->
              <Progress :model-value="55" class="h-2 bg-white/10 pl-6" />
            </div>

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