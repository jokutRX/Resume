// src/data/projects.ts
import { MonitorPlay, Rocket, type LucideIcon, Code2, Server, Container, Activity } from 'lucide-vue-next'

export interface Project {
  id: string
  title: string
  type: string
  typeColor: string
  icon: LucideIcon
  description: string // Короткое описание для списка
  longDescription?: string // Длинное описание для карточки (ДОБАВЛЕНО)
  techStack: string[]
  tasks: string[]
  challenges: string[]
  
  // Новые свойства
  techStackSections?: {
    title: string
    icon: LucideIcon
    techs: string
    description: string
  }[]
  screenshots?: string[]
  githubLink?: string
  liveLink?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'locator',
    title: 'Локатор',
    type: 'Коммерческий',
    typeColor: 'text-purple-400 border-purple-500/20',
    icon: Rocket,
    description: 'Поддержка и масштабирование высоконагруженного веб-приложения.',
    // ДОБАВЛЕНО Длинное описание
    longDescription: 'Работа в команде разработки над масштабным приложением «Локатор». Занимался рефакторингом legacy-кода, внедрением новых модулей и оптимизацией работы с большими массивами данных на стороне клиента.',
    
    // Детальный стек (Степпер)
    techStackSections: [
      {
        title: 'Frontend',
        icon: Code2,
        techs: 'Vue 3, TypeScript, Pinia',
        description: 'Полноценный SPA на базе Vue 3 с использованием Composition API и TypeScript для типобезопасности.'
      },
      {
        title: 'Backend & Data',
        icon: Server,
        techs: 'Go, Python (FastAPI), PostgreSQL',
        description: 'Высоконагруженные микросервисы на Go для обработки API запросов. Python (FastAPI) для бизнес-логики и интеграции с внешними системами. PostgreSQL как основная СУБД.'
      },
      {
        title: 'Инструменты',
        icon: Container,
        techs: 'Docker, Docker Compose, Prometheus, Grafana',
        description: 'Полная контейнеризация приложений для идентичности окружений. Настройка системы мониторинга и метрик.'
      }
    ],
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
    ],
    githubLink: 'https://github.com/your-repo'
  },
  {
    id: 'kirovets',
    title: 'Стадион «Кировец»',
    type: 'Коммерческий',
    typeColor: 'text-primary/80 border-primary/20',
    icon: MonitorPlay,
    description: 'Разработка экосистемы сервисов для цифровизации стадиона.',
    longDescription: 'Полноценный цикл разработки интерфейсов для цифрового стадиона. Основной упор на адаптивность, производительность и удобство покупки билетов.',
    
    techStackSections: [
      {
        title: 'Frontend',
        icon: Code2,
        techs: 'Vue 3, TypeScript, Pinia, Tailwind CSS',
        description: 'Реализация интерфейсов с использованием Tailwind CSS для быстрой стилизации и Pinia для управления состоянием.'
      },
      {
        title: 'Backend',
        icon: Server,
        techs: 'Node.js (NestJS), PostgreSQL, Redis',
        description: 'Бэкенд для обработки бронирований и хранения сессий пользователей.'
      }
    ],
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
    ],
    screenshots: ['kirovets1.jpg', 'kirovets2.jpg'],
    liveLink: 'https://stadium.kirovets.ru'
  }
]