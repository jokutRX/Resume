<script setup lang="ts">
import { useTheme, type ThemeColor } from '@/composables/useTheme'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/index'
import { Paintbrush } from 'lucide-vue-next'

const { activeTheme, setTheme } = useTheme()

const colors: { name: string; value: ThemeColor; class: string }[] = [
  { name: 'Обычный', value: 'default', class: 'bg-slate-500' },
  { name: 'Роза', value: 'rose', class: 'bg-rose-500' },
  { name: 'Синий', value: 'blue', class: 'bg-blue-500' },
  { name: 'Оранжевый', value: 'orange', class: 'bg-orange-500' },
  { name: 'Фиолетовый', value: 'purple', class: 'bg-purple-500' },
  { name: 'Зеленый', value: 'green', class: 'bg-green-500' },
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
      
      <!-- Название / Логотип -->
      <div class="text-lg font-bold tracking-tight">
        Мое Резюме
      </div>

      <!-- Правая часть (Кисточка) -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="icon">
            <Paintbrush class="h-4 w-4" />
            <span class="sr-only">Сменить тему</span>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" class="w-48">
          <DropdownMenuItem 
            v-for="color in colors" 
            :key="color.value"
            @click="setTheme(color.value)"
            class="flex items-center justify-between cursor-pointer"
          >
            <span>{{ color.name }}</span>
            <span 
              :class="[color.class, 'h-4 w-4 rounded-full border']" 
              :style="{ borderColor: activeTheme === color.value ? 'var(--primary)' : 'transparent', boxShadow: activeTheme === color.value ? '0 0 0 2px var(--background), 0 0 0 4px var(--primary)' : 'none' }"
            ></span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  </header>
</template>