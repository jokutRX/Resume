<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section id="projects" class="pb-12 md:pb-20">
    <div class="container mx-auto max-w-screen-xl px-4">
      
      <div class="text-center mb-12 md:mb-16 space-y-4 animate-fade-in-up" style="animation-delay: 0ms;">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Проекты
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Здесь представлены реализованные проекты, которые формируют мой профессиональный опыт.
        </p>
      </div>

      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style="animation-delay: 200ms;">
        
        <!-- ДОБАВЛЕН ID ДЛЯ СТРЕЛКИ -->
        <Card id="proj-card-1" class="group bg-muted/40 border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardContent class="p-6 space-y-4 h-full flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">Стадион «Кировец»</h3>
              <p class="text-sm text-muted-foreground mt-2 leading-relaxed">
                Подробное описание того, что конкретно было сделано, какой стек применялся и какие проблемы были решены.
              </p>
            </div>
            <div class="flex items-center text-sm font-medium text-primary gap-1 pt-2">
              Подробнее <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>

        <!-- ДОБАВЛЕН ID ДЛЯ СТРЕЛКИ -->
        <Card id="proj-card-2" class="group bg-muted/40 border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardContent class="p-6 space-y-4 h-full flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">Локатор</h3>
              <p class="text-sm text-muted-foreground mt-2 leading-relaxed">
                Подробное описание проекта Локатор. Архитектура, сложные моменты разработки, ваша роль.
              </p>
            </div>
            <div class="flex items-center text-sm font-medium text-primary gap-1 pt-2">
              Подробнее <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
</style>