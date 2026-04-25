<script setup lang="ts">
import { ref } from 'vue'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // Берем тип напрямую из компонента Shadcn, чтобы избежать конфликтов
  type CarouselApi,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'

import { MapPin, GraduationCap, User, ArrowRight } from 'lucide-vue-next'

const activeSlide = ref(0)
const api = ref<CarouselApi>()

const autoplayPlugin = Autoplay({ delay: 4000, stopOnInteraction: true })

// Делаем параметр опциональным (| undefined), чтобы TypeScript не ругался
const setApi = (val: CarouselApi | undefined) => {
  if (!val) return
  
  api.value = val
  activeSlide.value = val.selectedScrollSnap()
  
  val.on('select', () => {
    activeSlide.value = val.selectedScrollSnap()
  })
}

const scrollTo = (index: number) => {
  api.value?.scrollTo(index)
}
</script>

<template>
  <section id="about" class="min-h-[calc(100vh-3.5rem)] flex items-center py-12 md:py-20">
    <div class="container mx-auto max-w-screen-xl px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <!-- ЛЕВАЯ ЧАСТЬ: Информация обо мне -->
        <div class="space-y-6 animate-fade-in-up" style="animation-delay: 0ms;">
          <div class="space-y-3">
            <!-- Статус -->
            <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium bg-background">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Открыт к предложениям
            </div>

            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Никита Когут
            </h1>
            <p class="text-xl text-primary font-semibold">
              Frontend разработчик
            </p>
          </div>

          <p class="text-muted-foreground leading-relaxed">
            Разрабатываю современные веб-приложения с упором на качество кода, 
            производительность и удобство пользовательского интерфейса.
          </p>

          <!-- Карточка с деталями -->
          <div class="bg-muted/40 border rounded-xl p-5 space-y-4 backdrop-blur-sm">
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-sm">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <User class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Возраст</p>
                  <p class="font-medium text-foreground">22 года</p>
                </div>
              </li>
              <li class="flex items-center gap-3 text-sm">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <MapPin class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Город</p>
                  <p class="font-medium text-foreground">Санкт-Петербург, Россия</p>
                </div>
              </li>
              <li class="flex items-center gap-3 text-sm">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <GraduationCap class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Образование</p>
                  <p class="font-medium text-foreground">СПБУТУиЭ, Информ. системы и программирование</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Кнопка -->
          <div class="pt-2">
            <a href="#contacts">
              <Button size="lg" class="gap-2">
                Связаться со мной
                <ArrowRight class="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <!-- ПРАВАЯ ЧАСТЬ: Карусель с фотографиями -->
        <div class="animate-fade-in-up" style="animation-delay: 200ms;">
          <Carousel 
            class="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            :plugins="[autoplayPlugin]"
            @init-api="setApi"
          >
            <CarouselContent>
              <!-- Слайд 1 -->
              <CarouselItem>
                <div class="p-1">
                  <Card class="border-2 border-primary shadow-2xl shadow-primary/10 rounded-xl overflow-hidden">
                    <CardContent class="p-0 flex aspect-square items-center justify-center">
                      <img 
                        src="https://ui-avatars.com/api/?name=Work+Photo&size=600&background=0d1117&color=58a6ff&bold=true&font-size=0.3" 
                        alt="Фото 1" 
                        class="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              
              <!-- Слайд 2 -->
              <CarouselItem>
                <div class="p-1">
                  <Card class="border-2 border-primary shadow-2xl shadow-primary/10 rounded-xl overflow-hidden">
                    <CardContent class="p-0 flex aspect-square items-center justify-center">
                      <img 
                        src="https://ui-avatars.com/api/?name=Travel+Photo&size=600&background=0d1117&color=58a6ff&bold=true&font-size=0.3" 
                        alt="Фото 2" 
                        class="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <!-- Слайд 3 -->
              <CarouselItem>
                <div class="p-1">
                  <Card class="border-2 border-primary shadow-2xl shadow-primary/10 rounded-xl overflow-hidden">
                    <CardContent class="p-0 flex aspect-square items-center justify-center">
                      <img 
                        src="https://ui-avatars.com/api/?name=Hobby+Photo&size=600&background=0d1117&color=58a6ff&bold=true&font-size=0.3" 
                        alt="Фото 3" 
                        class="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          
          <!-- Кастомные точки пагинации -->
          <div class="flex items-center justify-center gap-2 mt-6">
            <button
              v-for="(_, index) in 3" 
              :key="index"
              @click="scrollTo(index)"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                activeSlide === index ? 'bg-primary w-6' : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
              ]"
            >
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>