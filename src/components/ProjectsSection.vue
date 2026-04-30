<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-vue-next'

import { PROJECTS, type Project } from '@/data/projects'

// Импортируем изображения для карточки Локатор
import skrfPng from '@/assets/skrf.png'
import locatorSvg from '@/assets/locator.svg'
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
            <!-- Кнопка Локатора (Яркая) -->
            <Button 
              v-if="project.id === 'locator'"
              as-child
              variant="default" 
              size="lg" 
              class="w-full shadow-[0_0_15px_rgba(var(--primary),0.4)] hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] transition-all duration-300"
            >
              <RouterLink :to="`/projects/${project.id}`" class="w-full flex items-center justify-center gap-2 font-semibold">
                Подробнее о кейсе <ExternalLink class="w-4 h-4" />
              </RouterLink>
            </Button>

            <!-- Кнопка остальных (Ghost) -->
            <Button 
              v-else
              as-child
              variant="ghost" 
              size="sm" 
              class="w-full justify-between px-4"
            >
              <RouterLink :to="`/projects/${project.id}`" class="w-full flex items-center justify-between gap-2">
                <span>Подробнее о кейсе</span>
                <ExternalLink class="w-4 h-4" />
              </RouterLink>
            </Button>
          </CardFooter>
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
</style>