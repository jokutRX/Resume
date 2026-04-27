<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'

// --- Логика полоски прогресса скролла ---
const scrollProgress = ref(0)
const updateScrollProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const scrollableDistance = scrollHeight - clientHeight
  if (scrollableDistance > 0) {
    scrollProgress.value = (window.scrollY / scrollableDistance) * 100
  }
}

// --- Логика соединительных стрелок ---
const svgLayer = ref<HTMLElement | null>(null)

const drawConnectors = () => {
  if (!svgLayer.value) return
  
  const ec1 = document.getElementById('exp-card-1')
  const pc1 = document.getElementById('proj-card-1')
  const ec2 = document.getElementById('exp-card-2')
  const pc2 = document.getElementById('proj-card-2')

  if (!ec1 || !pc1 || !ec2 || !pc2) return

  const containerRect = svgLayer.value.getBoundingClientRect()
  svgLayer.value.style.height = `${containerRect.height}px`

  const drawPath = (id: string, startEl: HTMLElement, endEl: HTMLElement, side: 'left' | 'right') => {
    const path = document.getElementById(id)
    if (!path) return

    const r1 = startEl.getBoundingClientRect()
    const r2 = endEl.getBoundingClientRect()
    
    const loopSize = 100 

    // Точка старта: ровно СБОКУ ПОСЕРЕДИНЕ верхней карточки
    const x1 = side === 'left' 
      ? r1.left - containerRect.left 
      : r1.right - containerRect.left
    const y1 = r1.top - containerRect.top + (r1.height / 2)
      
    // Точка конца: ровно СБОКУ ПОСЕРЕДИНЕ нижней карточки
    const x2 = side === 'left' 
      ? r2.left - containerRect.left 
      : r2.right - containerRect.left
    const y2 = r2.top - containerRect.top + (r2.height / 2)

    const dy = y2 - y1 
    const loopDir = side === 'left' ? -1 : 1 

    // Построение пути с S-завитками
    // ВАЖНО: Последняя точка контрольной кривой ${x2 + (loopDir * -40)} ${y2}
    // заставляет линию подходить к карточке СТРОГО ГОРИЗОНТАЛЬНО сбоку
    const d = `
      M ${x1} ${y1} 
      C ${x1 + (loopDir * loopSize)} ${y1}, ${x1 + (loopDir * loopSize)} ${y1 + dy * 0.3}, ${x1} ${y1 + dy * 0.3} 
      C ${x1 + (loopDir * -loopSize)} ${y1 + dy * 0.3}, ${x1 + (loopDir * -loopSize)} ${y1 + dy * 0.6}, ${x1} ${y1 + dy * 0.6} 
      C ${x1 + (loopDir * loopSize * 1.2)} ${y1 + dy * 0.8}, ${x2 + (loopDir * -40)} ${y2}, ${x2} ${y2}
    `

    path.setAttribute('d', d)
  }

  drawPath('line-1', ec1, pc1, 'left')
  drawPath('line-2', ec2, pc2, 'right')
}

const handleUpdate = () => {
  updateScrollProgress()
  drawConnectors()
}

onMounted(() => {
  window.addEventListener('scroll', handleUpdate, { passive: true })
  window.addEventListener('resize', drawConnectors)
  setTimeout(drawConnectors, 100)
  handleUpdate()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleUpdate)
  window.removeEventListener('resize', drawConnectors)
})
</script>

<template>
  <div class="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    
    <div class="fixed top-0 left-0 w-full h-1 z-[9999]">
      <div class="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" :style="{ width: scrollProgress + '%' }"></div>
    </div>
    
    <TheHeader />
    
    <main class="relative">
      <HeroSection />
      <SkillsSection />
      
      <div ref="svgLayer" class="relative">
        <ExperienceSection />
        
        <svg class="absolute top-0 left-0 w-full pointer-events-none z-20" style="overflow: visible;">
          <defs>
            <!-- 
              МАРКЕР: Стрелка, смотрящая ВБЛИК (по горизонтали)
              d="M 0 0 L 14 7 L 0 14 Z" рисует треугольник, указывающий вправо.
              refX="14" refY="7" означает, что "острие" (14,7) будет привязано к концу линии.
              orient="auto" автоматически перевернет её для левой стороны.
            -->
            <marker id="arrowhead" markerWidth="14" markerHeight="14" refX="14" refY="7" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0 0 L 14 7 L 0 14 Z" fill="hsl(var(--primary))" />
            </marker>
          </defs>
          
          <path 
            id="line-1" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            stroke-width="2.5" 
            stroke-dasharray="12 14" 
            stroke-linecap="round"
            marker-end="url(#arrowhead)" 
          />
          
          <path 
            id="line-2" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            stroke-width="2.5" 
            stroke-dasharray="12 14" 
            stroke-linecap="round"
            marker-end="url(#arrowhead)" 
          />
        </svg>

        <ProjectsSection />
      </div>

    </main>
  </div>
</template>

<style>
</style>