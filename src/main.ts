import Experience from './classes/Experience'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <canvas id="experience-canvas"></canvas>
  </main>
`

new Experience(document.getElementById('experience-canvas') as HTMLCanvasElement)
