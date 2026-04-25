import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export type ThemeColor = 'default' | 'rose' | 'blue' | 'orange' | 'purple' | 'green'

export function useTheme() {
  // useStorage автоматически сохраняет значение в localStorage браузера
  const activeTheme = useStorage<ThemeColor>('resume-color-theme', 'default')

  // Функция применения темы к тегу <html>
  const applyTheme = (theme: ThemeColor) => {
    // Удаляем старые классы тем
    const html = document.documentElement
    html.classList.remove('theme-default', 'theme-rose', 'theme-blue', 'theme-orange', 'theme-purple', 'theme-green')
    
    // Добавляем новый
    html.classList.add(`theme-${theme}`)
  }

  // Следим за изменениями и применяем
  watch(activeTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  return {
    activeTheme,
    setTheme: (theme: ThemeColor) => {
      activeTheme.value = theme
    }
  }
}