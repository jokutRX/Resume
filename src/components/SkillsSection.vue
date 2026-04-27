<script setup lang="ts">
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

import { FileCode2, Layers, Wrench } from 'lucide-vue-next'

// Импортируем данные
import { skillsData } from '@/data/skills'
</script>

<template>
  <section id="skills" class="py-12 md:py-20">
    <div class="container mx-auto max-w-screen-xl px-4">
      
      <!-- Заголовок секции -->
      <div class="text-center mb-12 md:mb-16 space-y-4 animate-fade-in-up" style="animation-delay: 0ms;">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Навыки и технологии
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Не просто знаю технологии, а умею применять их для решения бизнес-задач и создания качественного пользовательского опыта.
        </p>
      </div>

      <!-- Табы -->
      <div class="animate-fade-in-up" style="animation-delay: 200ms;">
        <Tabs default-value="languages" class="w-full">
          
          <!-- Кнопки переключения -->
          <TabsList class="mx-auto grid w-fit grid-cols-3 bg-muted/50 p-1 rounded-lg mb-10">
            <TabsTrigger value="languages" class="gap-1.5 text-sm">
              <FileCode2 class="h-4 w-4 hidden sm:block" />
              Языки
            </TabsTrigger>
            <TabsTrigger value="frameworks" class="gap-1.5 text-sm">
              <Layers class="h-4 w-4 hidden sm:block" />
              Фреймворки
            </TabsTrigger>
            <TabsTrigger value="tools" class="gap-1.5 text-sm">
              <Wrench class="h-4 w-4 hidden sm:block" />
              Инструменты
            </TabsTrigger>
          </TabsList>

          <!-- Динамический рендер контента табов -->
          <TabsContent v-for="(skills, category) in skillsData" :key="category" :value="category">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Card 
                v-for="tech in skills" 
                :key="tech.name" 
                class="group bg-background/50 border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent class="p-6 flex flex-col items-center text-center gap-4 h-full">
                  
                  <!-- Блок с иконкой (Фиксированный размер для идеального выравнивания) -->
                  <div class="bg-muted/50 rounded-2xl p-3 w-24 h-24 flex items-center justify-center border transition-colors group-hover:border-primary/20">
                    <img 
                      :src="tech.icon" 
                      :alt="tech.name" 
                      class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>

                  <!-- Блок с текстом -->
                  <div class="space-y-2 flex-1 flex flex-col justify-center">
                    <h3 class="text-lg font-semibold text-foreground">{{ tech.name }}</h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">{{ tech.desc }}</p>
                  </div>

                </CardContent>
              </Card>

            </div>
          </TabsContent>

        </Tabs>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Анимация появления при скролле */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Плавное появление контента при переключении таба */
[data-state="active"] {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from { 
    opacity: 0; 
    transform: translateY(5px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>