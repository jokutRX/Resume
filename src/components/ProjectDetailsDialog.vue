<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PROJECTS, type Project } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Github, 
  Code2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-vue-next'

// Импортируем логотипы
import skrfPng from '@/assets/skrf.png'
import locatorSvg from '@/assets/locator.svg'

const route = useRoute()
const router = useRouter()

// Получаем проект по ID из URL
const project = computed(() => {
  const id = route.params.id
  
  if (!id || Array.isArray(id)) return null

  return PROJECTS.find(p => p.id === id) || null
})

// Функция для возврата назад
const goBack = () => {
  router.push('/')
}

// Функция парсинга текста
const parseChallenge = (text: string) => {
  if (!text) return { problem: '', solution: '' }
  
  const parts = text.split('Решение:')
  
  return {
    problem: (parts[0] || '').replace('Проблема: ', ''),
    solution: parts[1] || ''
  }
}
</script>

<template>
  <div class="min-h-screen pb-20 pt-24 bg-background text-foreground animate-fade-in-up">
    <div class="container mx-auto max-w-5xl px-4">
      
      <!-- Кнопка Назад -->
      <Button variant="ghost" size="sm" class="mb-6 group" @click="goBack">
        <ArrowLeft class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Назад к проектам
      </Button>

      <!-- Если проект не найден -->
      <div v-if="!project" class="text-center py-20">
        <h1 class="text-2xl font-bold text-muted-foreground">Проект не найден</h1>
      </div>

      <!-- Основной контент -->
      <div v-else class="space-y-10">
        
        <!-- ИНТЕРАКТИВНАЯ КАРТОЧКА -->
        <div class="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl min-h-[400px] flex items-center justify-center cursor-pointer transition-colors duration-500 hover:border-white/20">
          
          <!-- СЛОЙ 1: ЛОГОТИПЫ -->
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 transition-all duration-700 ease-in-out opacity-100 scale-100 blur-none group-hover:opacity-30 group-hover:scale-110 group-hover:blur-[1px]">
            <!-- SKRF -->
            <img :src="skrfPng" alt="SKRF Logo" class="h-24 md:h-32 w-auto object-contain transition-transform duration-500" />
            
            <!-- Вертикальный разделитель -->
            <Separator orientation="horizontal" class="w-16 md:w-24 bg-white/20" />
            
            <!-- Locator -->
            <img :src="locatorSvg" alt="Locator Logo" class="h-24 md:h-32 w-auto object-contain transition-transform duration-500 delay-100" />
          </div>

          <!-- СЛОЙ 2: ТЕКСТ -->
          <div class="relative z-20 w-full max-w-3xl mx-auto transition-all duration-700 ease-out transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-center">
            
            <div class="space-y-6">
              <!-- Заголовок с ТЕКУЩИМ ШРИФТОМ -->
              <!-- Добавлен класс locator-font -->
              <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-2xl locator-font">
                {{ project.title }}
              </h1>

              <!-- Описание -->
              <p class="text-lg md:text-xl text-foreground/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
                {{ project.longDescription || project.description }}
              </p>

              <!-- Кнопки действий -->
              <div class="flex flex-wrap gap-4 pt-4 justify-center">
                <Button v-if="project.githubLink" variant="default" size="lg" class="gap-2 shadow-lg shadow-primary/25 border border-white/10" as-child>
                  <a :href="project.githubLink" target="_blank" rel="noopener noreferrer">
                    <Github class="w-5 h-5" />
                    GitHub
                  </a>
                </Button>
              </div>

            </div>
          </div>

        </div>

        <Separator class="bg-white/10" />

        <!-- Стек технологий -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold flex items-center gap-2 text-foreground">
            <Code2 class="w-5 h-5 text-primary" /> Технологический стек
          </h3>
          <div class="flex flex-wrap gap-3">
            <Badge v-for="tech in project.techStack" :key="tech" variant="secondary" class="text-base px-4 py-1.5 bg-background/50 border-white/10">
              {{ tech }}
            </Badge>
          </div>
        </div>

        <Separator class="bg-white/10" />

        <!-- Задачи и Сложности (Grid) -->
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold flex items-center gap-2 text-green-400">
              <CheckCircle2 class="w-5 h-5" /> Выполненные задачи
            </h3>
            <ul class="space-y-4 text-muted-foreground">
              <li v-for="task in project.tasks" :key="task" class="flex gap-3 leading-relaxed">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                {{ task }}
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold flex items-center gap-2 text-amber-400">
              <AlertTriangle class="w-5 h-5" /> Сложности и решения
            </h3>
            <div class="space-y-4">
              <div 
                v-for="(challenge, idx) in project.challenges" 
                :key="idx" 
                class="border border-white/5 bg-white/[0.02] rounded-lg p-3"
              >
                <div class="text-red-400/90 font-medium mb-1 text-sm">
                  <AlertTriangle class="w-3.5 h-3.5 mr-1 inline" />
                  {{ parseChallenge(challenge).problem }}
                </div>
                <div class="text-green-400/90 text-sm pl-5.5">
                  <CheckCircle2 class="w-3.5 h-3.5 mr-1 inline" />
                  <span class="text-muted-foreground">{{ parseChallenge(challenge).solution }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator class="bg-white/10" />

        <!-- Галерея скриншотов -->
        <div v-if="project.screenshots && project.screenshots.length" class="space-y-4">
          <h3 class="text-xl font-semibold">Скриншоты</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="(scr, idx) in project.screenshots" 
              :key="idx"
              class="rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-video flex items-center justify-center text-muted-foreground relative group"
            >
               <!-- <img :src="scr" class="object-cover w-full h-full" /> -->
               <div class="text-sm opacity-50">
                 Изображение: {{ scr }} ({{ idx + 1 }})
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Подключение шрифта */
@font-face {
  font-family: 'Locator';
  src: url('/fonts/locator_font.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* Класс для применения шрифта */
.locator-font {
  font-family: 'Locator', sans-serif;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s ease-out forwards;
}
</style>