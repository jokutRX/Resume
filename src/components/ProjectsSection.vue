<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  Code2
} from 'lucide-vue-next'

// Импортируем данные и типы
import { PROJECTS, type Project } from '@/data/projects'

// Импортируем изображения
import skrfPng from '@/assets/skrf.png'
import locatorSvg from '@/assets/locator.svg'

// --- Логика ---
const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const openProjectDetails = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

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
  <section id="projects" class="pb-12 md:pb-20 relative z-10">
    <div class="container mx-auto max-w-screen-xl px-4">
      
      <div class="text-center mb-12 md:mb-16 space-y-4 animate-fade-in-up" style="animation-delay: 0ms;">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Избранные проекты
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Практические кейсы, демонстрирующие навыки архитектуры, работы со сложной логикой и создания удобных интерфейсов.
        </p>
      </div>

      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up" style="animation-delay: 200ms;">
        
        <Card 
          v-for="project in PROJECTS" 
          :key="project.id"
          class="group bg-background/60 backdrop-blur-xl border border-white/10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_5px_20px_-5px_rgba(6,182,212,0.1)] flex flex-col h-full"
        >
          <CardHeader>
            <div class="flex justify-between items-start">
              <div class="space-y-1">
                <!-- Заголовок скрыт для Локатора -->
                <CardTitle v-if="project.id !== 'locator'" class="text-xl group-hover:text-primary transition-colors">
                  {{ project.title }}
                </CardTitle>
                <div v-if="project.id !== 'locator'" class="flex items-center gap-2 pt-1">
                  <Badge variant="secondary" class="text-[10px] px-2 py-0 h-5 font-medium">{{ project.type }}</Badge>
                  <Badge variant="outline" :class="`text-[10px] px-2 py-0 h-5 ${project.typeColor}`">
                    Enterprise
                  </Badge>
                </div>
              </div>
              <!-- Иконка скрыта для Локатора -->
              <component v-if="project.id !== 'locator'" :is="project.icon" class="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardHeader>
          
          <CardContent class="flex-grow relative flex flex-col justify-center py-6">
            
            <!-- СПЕЦИАЛЬНЫЙ ДИЗАЙН ДЛЯ ЛОКАТОРА -->
            <div v-if="project.id === 'locator'" class="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in-up">
              <!-- Картинки по центру -->
              <div class="flex items-center justify-center gap-8 w-full px-4 opacity-90 group-hover:opacity-100 transition-opacity">
                <img :src="skrfPng" alt="SKRF Logo" class="h-16 md:h-20 w-auto object-contain transition-transform duration-500" />
                
                <Separator orientation="vertical" class="h-12 md:h-16 bg-white/20" />
                
                <img :src="locatorSvg" alt="Locator Logo" class="h-16 md:h-20 w-auto object-contain transition-transform duration-500" />
              </div>

              <div class="text-center space-y-1">
                <p class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-wide">
                  ЛОКАТОР
                </p>
              </div>
            </div>

            <!-- СТАНДАРТНЫЙ ДИЗАЙН ДЛЯ ОСТАЛЬНЫХ -->
            <div v-else class="flex flex-col h-full justify-between space-y-4 py-2">
              <div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <Badge v-for="tech in project.techStack.slice(0, 4)" :key="tech" variant="outline" class="text-xs bg-background/50">
                    {{ tech }}
                  </Badge>
                  <Badge v-if="project.techStack.length > 4" variant="outline" class="text-xs bg-background/50">
                    +{{ project.techStack.length - 4 }}
                  </Badge>
                </div>
              </div>
            </div>

          </CardContent>

          <CardFooter class="pt-4 border-t border-white/5 bg-white/[0.02]">
            <!-- КРАСИВАЯ КНОПКА -->
            <Button 
              v-if="project.id === 'locator'"
              variant="default" 
              size="lg" 
              class="w-full group/btn shadow-[0_0_15px_rgba(var(--primary),0.4)] hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] transition-all duration-300"
              @click="openProjectDetails(project)"
            >
              <span class="flex items-center gap-2 font-semibold">
                Подробнее о кейсе <ExternalLink class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Button>

            <!-- Обычная кнопка для остальных -->
            <Button 
              v-else
              variant="ghost" 
              size="sm" 
              class="w-full group/btn justify-between px-4"
              @click="openProjectDetails(project)"
            >
              <span class="group-hover/btn:translate-x-1 transition-transform flex items-center gap-2">
                Подробнее о кейсе <ExternalLink class="w-4 h-4" />
              </span>
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО -->
    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-white/10 text-foreground p-0 overflow-hidden">
        <DialogHeader class="px-6 pt-6 pb-2 border-b border-white/5">
          <div class="flex justify-between items-start">
            <div>
              <DialogTitle class="text-2xl font-bold tracking-tight">
                {{ selectedProject?.title }}
              </DialogTitle>
              <DialogDescription class="text-base mt-1 text-muted-foreground">
                {{ selectedProject?.description }}
              </DialogDescription>
            </div>
            <component :is="selectedProject?.icon" class="w-8 h-8 text-primary/50" />
          </div>
        </DialogHeader>

        <ScrollArea class="max-h-[60vh] px-6 py-4">
          
          <!-- 1. Стек технологий -->
          <div class="space-y-3 mb-6">
            <h4 class="text-sm font-semibold text-primary flex items-center gap-2">
              <Code2 class="w-4 h-4" /> Стек технологий
            </h4>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="tech in selectedProject?.techStack" :key="tech" variant="secondary" class="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1">
                {{ tech }}
              </Badge>
            </div>
          </div>

          <Separator class="bg-white/10" />

          <!-- 2. Выполненные задачи -->
          <div class="space-y-4 mt-6 mb-6">
            <h4 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-green-500" /> Выполненные задачи
            </h4>
            <ul class="space-y-3">
              <li v-for="(task, idx) in selectedProject?.tasks" :key="idx" class="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                <span class="mt-1.5 min-w-[4px] h-[4px] rounded-full bg-green-500/50 shrink-0"></span>
                <span>{{ task }}</span>
              </li>
            </ul>
          </div>

          <Separator class="bg-white/10" />

          <!-- 3. Сложности и решения -->
          <div class="space-y-4 mt-6 mb-2">
            <h4 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle class="w-4 h-4 text-amber-500" /> Сложности и решения
            </h4>
            <div class="space-y-4">
              <div v-for="(challenge, idx) in selectedProject?.challenges" :key="idx" class="text-sm border border-white/5 bg-white/[0.02] rounded-lg p-3">
                <!-- Используем вспомогательную функцию парсинга -->
                <div class="flex items-start gap-2 text-red-400/90 font-medium mb-1">
                  <AlertTriangle class="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{{ parseChallenge(challenge).problem }}</span>
                </div>
                <div class="flex items-start gap-2 text-green-400/90 pl-5.5">
                  <CheckCircle2 class="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span class="text-muted-foreground">{{ parseChallenge(challenge).solution }}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter class="px-6 py-4 border-t border-white/5 bg-white/[0.02]">
          <Button variant="outline" class="w-full sm:w-auto" @click="isModalOpen = false">
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

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
</style>