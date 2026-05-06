<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PROJECTS, type Project } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion'

import { 
  ArrowLeft, 
  Github, 
  CheckCircle2, 
  FileText,
  Route,
  Code2,
  ShieldCheck,
  Zap,
  Layers,
  BarChart3,
  Database
} from 'lucide-vue-next'

import skrfPng from '@/assets/skrf.png'
import locatorSvg from '@/assets/locator.svg'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  const id = route.params.id as string
  if (!id) return null
  return PROJECTS.find(p => p.id === id) || null
})

const goBack = () => router.push('/')

// ✅ Реактивные переменные для обоих блоков
const hoveredTaskIndex = ref<number | null>(null)
const hoveredSolutionIndex = ref<number | null>(null)

const keyTasks = [
  { 
    icon: FileText, 
    title: 'Автоматизация документооборота', 
    category: 'Процессы',
    description: 'Разработка системы генерации, маршрутизации и хранения процессуальных документов с минимизацией ручного ввода и валидацией на лету.' 
  },
  { 
    icon: Route,
    title: 'Визуализация этапов УД', 
    category: 'UX/UI',
    description: 'Интерактивные схемы ведения уголовных дел с наглядным отображением статусов, процессуальных сроков и ответственных лиц.' 
  },
  { 
    icon: Code2, 
    title: 'Разработка модулей', 
    category: 'Разработка',
    description: 'Создание независимых функциональных блоков: аналитика, отчетность, интеграции с внешними реестрами и API.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Всесторонняя поддержка', 
    category: 'DevOps/Support',
    description: 'Настройка мониторинга, логирования, CI/CD пайплайнов, оперативное устранение инцидентов и сопровождение релизов.' 
  }
]

const keySolutions = [
  { 
    icon: Zap, 
    title: 'Оптимизация бизнес-процессов', 
    type: 'Архитектура',
    description: 'Внедрение ролевой модели доступа и автоматических валидаций для снижения ошибок ввода на 85%.' 
  },
  { 
    icon: Layers, 
    title: 'Модульная структура', 
    type: 'Backend',
    description: 'Переход к компонентной архитектуре для независимого масштабирования, тестирования и переиспользования логики.' 
  },
  { 
    icon: BarChart3, 
    title: 'Единая точка входа', 
    type: 'Интеграция',
    description: 'Консолидация разрозненных инструментов в единый дашборд с кастомными виджетами и экспортом данных.' 
  },
  { 
    icon: Database, 
    title: 'Централизованное хранение данных', 
    type: 'Data',
    description: 'Проектирование реляционной базы данных с нормализацией, индексами и репликацией для обеспечения целостности и производительности.' 
  }
]
</script>

<template>
  <div class="min-h-screen pb-24 pt-24 bg-background text-foreground overflow-x-hidden">
    <div class="container mx-auto max-w-4xl px-4">
      
      <!-- Кнопка назад -->
      <Button variant="ghost" size="sm" class="mb-10 group" @click="goBack">
        <ArrowLeft class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Назад к проектам
      </Button>

      <div v-if="!project" class="text-center py-20">
        <h1 class="text-3xl font-bold text-muted-foreground">Проект не найден</h1>
      </div>

      <div v-else class="space-y-16">
        
        <!-- Hero Section -->
        <div class="relative group overflow-hidden rounded-3xl border border-border bg-card shadow-2xl min-h-[460px] flex items-center justify-center cursor-pointer">
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 transition-all duration-700 
                      group-hover:opacity-30 group-hover:scale-110 group-hover:blur-[2px]">
            <img :src="skrfPng" alt="SKRF" class="h-36 w-auto drop-shadow-xl" />
            <Separator orientation="horizontal" class="w-28 bg-border" />
            <img :src="locatorSvg" alt="Locator" class="h-36 w-auto drop-shadow-xl" />
          </div>

          <div class="relative z-20 text-center px-6 max-w-3xl transition-all duration-700 
                      opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0">
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tighter locator-font mb-6">
              {{ project.title }}
            </h1>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
              {{ project.longDescription || project.description }}
            </p>

            <Button v-if="project.githubLink" size="lg" class="mt-10 gap-3" as-child>
              <a :href="project.githubLink" target="_blank" rel="noopener noreferrer">
                <Github class="w-5 h-5" /> GitHub
              </a>
            </Button>
          </div>
        </div>

        <Separator class="bg-border" />

        <!-- Технологический стек -->
        <div class="space-y-8">
          <h3 class="text-3xl font-semibold tracking-tight text-center">
            Технологический стек
          </h3>

          <Accordion type="multiple" class="space-y-4">
            <AccordionItem 
              v-for="(section, idx) in project.techStackSections" 
              :key="idx"
              :value="`item-${idx}`"
              class="group border border-border bg-card rounded-3xl overflow-hidden 
                     hover:border-primary hover:shadow-xl hover:-translate-y-1 
                     transition-all duration-300"
            >
              <AccordionTrigger class="px-8 py-7 hover:no-underline">
                <div class="flex items-center gap-5 w-full">
                  <div class="p-4 rounded-2xl bg-primary/10 text-primary transition-all duration-300 
                              group-hover:rotate-12 group-hover:scale-110 
                              group-data-[state=open]:rotate-6 group-data-[state=open]:scale-110">
                    <component :is="section.icon" class="w-7 h-7" />
                  </div>
                  
                  <div class="flex-1 text-left">
                    <h4 class="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {{ section.title }}
                    </h4>
                    <p class="text-muted-foreground mt-1.5 text-[15px] line-clamp-2">
                      {{ section.description }}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent class="px-8 pb-8">
                <div class="pt-6 border-t border-border">
                  <div class="flex flex-wrap gap-2.5 mb-6">
                    <Badge 
                      v-for="tech in section.techs.split(',')" 
                      :key="tech.trim()"
                      variant="secondary"
                      class="px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80"
                    >
                      {{ tech.trim() }}
                    </Badge>
                  </div>
                  <p class="text-foreground/80 leading-relaxed">
                    {{ section.description }}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator class="bg-border" />

        <!-- БЛОК: Результаты и решения -->
        <div class="space-y-10">
          <div class="text-center space-y-4">
            <h3 class="text-3xl font-semibold tracking-tight">Результаты и ключевые решения</h3>
            <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
              Структурированный подход к реализации системы: от автоматизации процессов до комплексной поддержки модулей.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-12">
            
            <!--  Выполненные задачи (Timeline с эффектом фокусировки) -->
            <div class="space-y-6">
              <h4 class="text-xl font-semibold flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 class="w-5 h-5" /> Выполненные задачи
              </h4>
              
              <div class="relative">
                <!-- Вертикальная линия -->
                <div class="absolute left-[11px] top-3 bottom-3 w-px bg-emerald-200/50 dark:bg-emerald-800/40"></div>
                
                <div 
                  v-for="(task, idx) in keyTasks" 
                  :key="idx" 
                  class="relative pl-8 pb-8 last:pb-0 group"
                  @mouseenter="hoveredTaskIndex = idx"
                  @mouseleave="hoveredTaskIndex = null"
                >
                  
                  <!-- Точка таймлайна -->
                  <div class="absolute left-[5px] top-[12px] w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-background 
                              group-hover:scale-125 group-hover:bg-emerald-600 transition-all duration-300"></div>
                  
                  <div 
                    class="space-y-2 transition-all duration-300"
                    :class="[
                      hoveredTaskIndex !== null && hoveredTaskIndex !== idx 
                        ? 'opacity-30' 
                        : 'opacity-100'
                    ]"
                  >
                    <div class="flex items-center gap-2 flex-wrap">
                      <component :is="task.icon" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <h5 class="font-semibold text-foreground text-[15px]">{{ task.title }}</h5>
                      <Badge variant="secondary" class="text-[10px] h-5 px-2 font-medium">{{ task.category }}</Badge>
                    </div>
                    <p class="text-sm text-muted-foreground leading-relaxed pl-6">
                      {{ task.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 🔵 Архитектурные решения (ИСПРАВЛЕНО: идентичная структура + эффект затухания) -->
            <div class="space-y-6">
              <h4 class="text-xl font-semibold flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Zap class="w-5 h-5" /> Архитектурные решения
              </h4>
              
              <div class="relative">
                <!-- Вертикальная линия -->
                <div class="absolute left-[11px] top-3 bottom-3 w-px bg-blue-200/50 dark:bg-blue-800/40"></div>
                
                <div 
                  v-for="(sol, idx) in keySolutions" 
                  :key="idx" 
                  class="relative pl-8 pb-8 last:pb-0 group"
                  @mouseenter="hoveredSolutionIndex = idx"
                  @mouseleave="hoveredSolutionIndex = null"
                >
                  
                  <!-- Точка-ромб -->
                  <div class="absolute left-[5px] top-[12px] w-3 h-3 bg-blue-500 rotate-45 
                              ring-4 ring-background group-hover:scale-150 group-hover:bg-blue-400 
                              transition-all duration-300"></div>
                  
                  <!-- ✅ Идентичная структура с левым блоком + эффект затухания -->
                  <div 
                    class="space-y-2 transition-all duration-300"
                    :class="[
                      hoveredSolutionIndex !== null && hoveredSolutionIndex !== idx 
                        ? 'opacity-30' 
                        : 'opacity-100'
                    ]"
                  >
                    <div class="flex items-center gap-2 flex-wrap">
                      <component :is="sol.icon" class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <h5 class="font-semibold text-foreground text-[15px]">{{ sol.title }}</h5>
                      <Badge variant="outline" class="text-[10px] h-5 px-2 font-medium">{{ sol.type }}</Badge>
                    </div>
                    <p class="text-sm text-muted-foreground leading-relaxed pl-6">
                      {{ sol.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Галерея -->
        <div v-if="project.screenshots?.length" class="space-y-8">
          <h3 class="text-2xl font-semibold">Скриншоты</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="(scr, idx) in project.screenshots" 
              :key="idx"
              class="aspect-video rounded-3xl border border-border bg-card flex items-center justify-center"
            >
              <span class="text-muted-foreground text-sm">Скриншот {{ idx + 1 }} — {{ scr }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.locator-font {
  font-family: 'Locator', sans-serif;
}
</style>