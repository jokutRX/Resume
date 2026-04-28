// src/data/projects.ts
import { MonitorPlay, Rocket, type LucideIcon } from 'lucide-vue-next'

// Интерфейс для строгой типизации
export interface Project {
  id: string
  title: string
  type: string
  typeColor: string
  icon: LucideIcon // Тип для иконок Lucide
  description: string
  techStack: string[]
  tasks: string[]
  challenges: string[]
}

// Массив с данными
export const PROJECTS: Project[] = [
  {
    id: 'kirovets',
    title: 'Стадион «Кировец»',
    type: 'Коммерческий',
    typeColor: 'text-primary/80 border-primary/20',
    icon: MonitorPlay,
    description: 'Разработка экосистемы сервисов для цифровизации стадиона.',
    techStack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Axios', 'Vite'],
    tasks: [
      'Интеграция API систем бронирования билетов в реальном времени.',
      'Разработка адаптивных интерфейсов для инфокиосков (touch-управление).',
      'Оптимизация Core Web Vitals для снижения времени загрузки на мобильных устройствах.',
      'Реализация сложной валидации форм для покупки абонементов.'
    ],
    challenges: [
      'Проблема: Синхронизация статуса мест при высокой конкуренции (броски). Решение: Внедрение оптимистичного обновления UI и WebSocket для мгновенных уведомлений.',
      'Проблема: Производительность при отрисовке больших списков событий. Решение: Виртуализация списков и ленивая загрузка изображений.'
    ]
  },
  {
    id: 'locator',
    title: 'Локатор',
    type: 'Коммерческий',
    typeColor: 'text-purple-400 border-purple-500/20',
    icon: Rocket,
    description: 'Поддержка и масштабирование высоконагруженного веб-приложения.',
    techStack: ['Vue 3', 'JavaScript (Legacy)', 'Vuex / Pinia', 'REST API', 'Sass/SCSS'],
    tasks: [
      'Рефакторинг legacy-компонентов на Composition API.',
      'Разработка новой архитектуры хранения состояния (State Management).',
      'Участие в код-ревью и написании unit-тестов.',
      'Интеграция новых фич в существующую монолитную архитектуру.'
    ],
    challenges: [
      'Проблема: Сложность понимания старого кодовой базы и зависимостей. Решение: Документирование кода и постепенный переписывание модулей.',
      'Проблема: Работы с большими массивами данных на клиенте. Решение: Оптимизация запросов к API (пагинация, фильтрация на бэкенде).'
    ]
  }
]