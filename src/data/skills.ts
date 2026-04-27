// src/data/skills.ts

export interface Skill {
  name: string
  icon: string
  desc: string
}

// Импортируем локальные PNG картинки из папки assets
import tsImg from '@/assets/ts.png'
import jsImg from '@/assets/js.png'
import goImg from '@/assets/go.png'
import pythonImg from '@/assets/python.png'

import vueImg from '@/assets/vue.png'
import nuxtImg from '@/assets/nuxt.png'
import tailwindImg from '@/assets/tailwind.png'

import gitImg from '@/assets/git.png'
import viteImg from '@/assets/vite.png'
import figmaImg from '@/assets/figma.png'
import dockerImg from '@/assets/docker.png'

export const skillsData: Record<string, Skill[]> = {
  languages: [
    {
      name: 'TypeScript',
      icon: tsImg,
      desc: 'Использую для создания масштабируемых приложений. Применяю интерфейсы, дженерики и утилитарные типы для минимизации багов.'
    },
    {
      name: 'JavaScript (ES6+)',
      icon: jsImg,
      desc: 'Глубокое понимание замыканий, прототипного наследования, Event Loop и современных возможностей языка.'
    },
    {
      name: 'Go',
      icon: goImg,
      desc: 'Применял при разработке бэкенд-части фулстек-модуля на работе. Ценю за высокую производительность и горутины.'
    },
    {
      name: 'Python',
      icon: pythonImg,
      desc: 'Использовал для написания серверной логики в рамках фулстек-модуля и интеграции сторонних сервисов.'
    }
  ],
  
  frameworks: [
    {
      name: 'Vue 3',
      icon: vueImg,
      desc: 'Мой основной фреймворк. Отлично знаю Composition API, систему реактивности и жизненный цикл компонентов.'
    },
    {
      name: 'Nuxt 3',
      icon: nuxtImg,
      desc: 'Применял для разработки SEO-оптимизированных сайтов. Использую SSR, серверные компоненты и auto-imports.'
    },
    {
      name: 'Tailwind CSS',
      icon: tailwindImg,
      desc: 'Ускоряет верстку в несколько раз. Пишу переиспользуемые компоненты, легко кастомизирую дизайн-систему.'
    }
  ],

  tools: [
    {
      name: 'Git / GitHub',
      icon: gitImg,
      desc: 'Веду разработку через ветки (Git Flow). Умею разрешать конфликты, писать коммиты и настраивать CI/CD.'
    },
    {
      name: 'Vite',
      icon: viteImg,
      desc: 'Основной сборщик за счет мгновенного HMR. Настраивал плагины и оптимизацию бандла.'
    },
    {
      name: 'Figma',
      icon: figmaImg,
      desc: 'Умею читать макеты, работать с Auto Layout, переменными (Variables) и собирать дизайн-системы.'
    },
    {
      name: 'Docker',
      icon: dockerImg,
      desc: 'Использую для контейнеризации приложений. Упаковывал как фронтенд, так и бэкенд для удобного деплоя.'
    }
  ]
}