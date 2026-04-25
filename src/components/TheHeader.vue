<script setup lang="ts">
import { useTheme, type ThemeColor } from '@/composables/useTheme'
import { useDark, useToggle } from '@vueuse/core' // Добавили импорт темной темы
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/index'
import { Paintbrush, Check, Sun, Moon } from 'lucide-vue-next' // Добавили иконки

const { activeTheme, setTheme } = useTheme()

// Логика переключения темной темы
const isDark = useDark()
const toggleDark = useToggle(isDark)

const colors: { name: string; value: ThemeColor; class: string }[] = [
  { name: 'Черный', value: 'default', class: 'bg-slate-500' },
  { name: 'Роза', value: 'rose', class: 'bg-rose-500' },
  { name: 'Синий', value: 'blue', class: 'bg-blue-500' },
  { name: 'Зеленый', value: 'green', class: 'bg-green-500' },
  { name: 'Оранжевый', value: 'orange', class: 'bg-orange-500' },
  { name: 'Фиолетовый', value: 'purple', class: 'bg-purple-500' },
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 max-w-screen-2xl items-center px-4 gap-4">
      
      <div class="text-lg font-bold tracking-tight">
        Мое Резюме
      </div>

      <div class="flex items-center gap-2">
        <!-- Кнопка переключения темы (Солнце/Луна) -->
        <button 
          @click="toggleDark()" 
          class="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          title="Переключить тему"
        >
          <!-- Плавная анимация появления -->
          <Transition name="fade" mode="out-in">
            <Sun v-if="!isDark" class="h-4 w-4 text-black" />
            <Moon v-else class="h-4 w-4 text-white" />
          </Transition>
        </button>

        <!-- Кнопка выбора цвета -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon" class="h-8 w-8">
              <Paintbrush class="h-4 w-4" />
              <span class="sr-only">Сменить тему</span>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="start" class="w-96 p-2">
            <div class="px-2 pb-3 pt-1">
              <h4 class="text-xs font-bold tracking-wider uppercase">Цвет</h4>
              <p class="text-[11px] text-muted-foreground mt-1">Выберите свой акцентный цвет</p>
            </div>

            <div class="grid grid-cols-3 gap-1.5">
              <button
                v-for="color in colors" 
                :key="color.value"
                @click="setTheme(color.value)"
                :class="[
                  'flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer border-2',
                  activeTheme === color.value 
                    ? 'border-primary bg-secondary/30 h-9' 
                    : 'border-transparent bg-secondary hover:bg-secondary/80 h-9'
                ]"
              >
                <span :class="[color.class, 'h-5 w-5 rounded-full shrink-0 flex items-center justify-center']">
                  <Check 
                    v-if="activeTheme === color.value" 
                    class="h-3 w-3 text-white" 
                    stroke-width="3" 
                  />
                </span>
                <span class="text-xs font-medium leading-tight">{{ color.name }}</span>
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  </header>
</template>

<!-- CSS для плавного затухания иконок -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-90deg);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(90deg);
}
</style>