import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Airplane3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const airplaneRef = useRef<HTMLDivElement>(null)
  const leftWingRef = useRef<HTMLDivElement>(null)
  const rightWingRef = useRef<HTMLDivElement>(null)
  const helixRefs = useRef<HTMLDivElement[]>([])
  const cloudRefs = useRef<HTMLDivElement[]>([])
  const skyLayerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const world = worldRef.current
    const airplane = airplaneRef.current
    const leftWing = leftWingRef.current
    const rightWing = rightWingRef.current
    const skyLayer = skyLayerRef.current
    const overlay = overlayRef.current

    if (!container || !world || !airplane || !leftWing || !rightWing || !skyLayer) return

    // Set cloud Z positions
    cloudRefs.current.forEach((cloud, i) => {
      if (cloud) {
        const z = -200 - (i * 30)
        cloud.dataset.z = String(z)
        cloud.style.transform = `translate3d(0, 0, ${z}px) rotateY(90deg)`
      }
    })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress

        // 1. Camera/World movement
        const cameraY = -progress * 2000
        world.style.transform = `translateY(${cameraY}px)`

        // 2. Airplane position and banking
        const planeY = progress * 500
        const planeZ = 200 + Math.sin(progress * Math.PI * 2) * 100
        const planeRotateX = -10 + Math.sin(progress * Math.PI) * 5
        const planeRotateZ = Math.sin(progress * Math.PI * 4) * 15

        airplane.style.transform = `translate3d(0, ${planeY}px, ${planeZ}px) rotateX(${planeRotateX}deg) rotateZ(${planeRotateZ}deg)`

        // 3. Wing flex based on banking
        const bankAngle = planeRotateZ
        const wingFlex = bankAngle * 2
        leftWing.style.transform = `translate3d(0, 0, 0) rotateX(90deg) rotateY(-90deg) translate3d(0, -12px, 0) rotateZ(${-wingFlex}deg)`
        rightWing.style.transform = `translate3d(0, 0, 0) rotateX(90deg) rotateY(90deg) translate3d(0, -12px, 0) rotateZ(${wingFlex}deg)`

        // 4. Helix rotation
        const helixRotation = progress * 360 * 20
        helixRefs.current.forEach((h) => {
          if (h) h.style.transform = `translate3d(0, 0, 14px) rotateZ(${helixRotation}deg)`
        })

        // 5. Parallax cloud movement
        cloudRefs.current.forEach((cloud, i) => {
          if (!cloud) return
          const cloudSpeed = 0.5 + (i * 0.1)
          const cloudY = -progress * 1000 * cloudSpeed
          const cloudZ = cloud.dataset.z || -200
          cloud.style.transform = `translate3d(0, ${cloudY}px, ${cloudZ}px) rotateY(90deg)`
        })

        // 6. Sky color transition
        const skyColor1R = Math.round(78 + (progress * (255 - 78)))
        const skyColor1G = Math.round(205 - (progress * (205 - 107)))
        const skyColor1B = Math.round(196 - (progress * (196 - 107)))
        skyLayer.style.background = `linear-gradient(to bottom, rgb(${skyColor1R}, ${skyColor1G}, ${skyColor1B}) 0%, rgb(${skyColor1R - 20}, ${skyColor1G - 20}, ${skyColor1B - 20}) 100%)`

        // 7. Fade overlay
        if (overlay) {
          const overlayOpacity = Math.max(0, 1 - progress * 3)
          overlay.style.opacity = String(overlayOpacity)
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  // Generate cloud elements
  const clouds = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      ref={(el) => {
        if (el) cloudRefs.current[i] = el
      }}
      className="cloud"
      style={{
        position: 'absolute',
        width: `${200 + Math.random() * 200}px`,
        height: `${60 + Math.random() * 60}px`,
        left: `${-50 + Math.random() * 150}%`,
        top: `${10 + Math.random() * 80}%`,
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    />
  ))

  // Generate engine helix refs
  const addHelixRef = (el: HTMLDivElement | null, index: number) => {
    if (el) helixRefs.current[index] = el
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: '300vh',
        position: 'relative',
      }}
    >
      {/* 3D Scene Container */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          perspective: '500px',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* World */}
        <div
          ref={worldRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Sky Layer 1 */}
          <div
            ref={skyLayerRef}
            className="sky-layer-1"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgb(78, 205, 196) 0%, rgb(58, 185, 176) 100%)',
              transform: 'translate3d(0, 0, -600px)',
              zIndex: -1,
            }}
          />

          {/* Sky Layer 2 (Dawn overlay) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #FF6B6B 0%, transparent 100%)',
              transform: 'translate3d(0, 0, -500px)',
              zIndex: -2,
            }}
          />

          {/* Sun */}
          <div
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'translate3d(100px, -100px, -1000px)',
              top: '20%',
              right: '20%',
            }}
          />

          {/* Clouds */}
          {clouds}

          {/* Mountains */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`mountain-${i}`}
              style={{
                position: 'absolute',
                width: `${200 + Math.random() * 300}px`,
                height: `${200 + Math.random() * 200}px`,
                background: '#000',
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                transform: `translate3d(${-400 + i * 250}px, 300px, -800px)`,
                opacity: 0.15,
              }}
            />
          ))}

          {/* Airplane */}
          <div
            ref={airplaneRef}
            className="airplane"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              marginLeft: '-15px',
              marginTop: '-15px',
            }}
          >
            {/* Fuselage (Body) */}
            <div
              className="body"
              style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0) rotateY(90deg)',
              }}
            >
              {/* Cylinder faces */}
              {Array.from({ length: 20 }).map((_, i) => {
                const radius = 12
                const length = 96
                const faceWidth = length
                const faceHeight = (radius * Math.PI) / 10 + 1
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: `${faceWidth}px`,
                      height: `${faceHeight}px`,
                      background: i === 0 ? '#DBDFE0' : i === 1 ? '#E8ECEE' : '#fff',
                      backfaceVisibility: 'hidden',
                      transform: `rotateY(${i * 18}deg) translateZ(${radius}px)`,
                      left: -faceWidth / 2,
                      top: -faceHeight / 2,
                    }}
                  />
                )
              })}
            </div>

            {/* Left Wing */}
            <div
              ref={leftWingRef}
              className="wing left"
              style={{
                position: 'absolute',
                width: '25px',
                height: '120px',
                background: '#fff',
                transformOrigin: '50% 0%',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0) rotateX(90deg) rotateY(-90deg) translate3d(0, -12px, 0)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
              }}
            />

            {/* Right Wing */}
            <div
              ref={rightWingRef}
              className="wing right"
              style={{
                position: 'absolute',
                width: '25px',
                height: '120px',
                background: '#fff',
                transformOrigin: '50% 0%',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0) rotateX(90deg) rotateY(90deg) translate3d(0, -12px, 0)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
              }}
            />

            {/* Tail (Vertical Stabilizer) */}
            <div
              style={{
                position: 'absolute',
                width: '3px',
                height: '40px',
                background: '#fff',
                transform: 'translate3d(0, -55px, 0) rotateX(0deg)',
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }}
            />

            {/* Horizontal Stabilizers */}
            <div
              style={{
                position: 'absolute',
                width: '40px',
                height: '3px',
                background: '#fff',
                transform: 'translate3d(0, -35px, 0) rotateX(90deg)',
              }}
            />

            {/* Engines */}
            {[
              { x: -36, y: 20, z: 0 },
              { x: -72, y: 20, z: 0 },
              { x: 36, y: 20, z: 0 },
              { x: 72, y: 20, z: 0 },
            ].map((pos, i) => (
              <div
                key={`engine-${i}`}
                style={{
                  position: 'absolute',
                  width: '16px',
                  height: '16px',
                  transformStyle: 'preserve-3d',
                  transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`,
                }}
              >
                {/* Engine cylinder */}
                {Array.from({ length: 12 }).map((_, j) => {
                  const er = 8
                  const el = 28
                  const fh = (er * Math.PI) / 6 + 1
                  return (
                    <div
                      key={j}
                      style={{
                        position: 'absolute',
                        width: `${el}px`,
                        height: `${fh}px`,
                        background: '#f5f5f5',
                        backfaceVisibility: 'hidden',
                        transform: `rotateY(${j * 30}deg) translateZ(${er}px)`,
                        left: -el / 2,
                        top: -fh / 2,
                      }}
                    />
                  )
                })}
                {/* Helix */}
                <div
                  ref={(el) => addHelixRef(el, i)}
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '4px',
                    background: '#111',
                    borderRadius: '50%',
                    transform: 'translate3d(0, 0, 14px)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay UI */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ opacity: 1 }}
      >
        {/* Flight Data */}
        <div className="absolute top-24 left-6 font-mono-flight text-xs sm:text-sm text-white/80 text-shadow-sm">
          <span>ALT 38,000 FT</span>
          <span className="mx-3">|</span>
          <span>GS 847 KTS</span>
          <span className="mx-3">|</span>
          <span>HDG 284°</span>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-shadow-hero mb-4">
            Your Journey Begins
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-lg text-shadow-sm mb-8">
            Discover the world from above. Premium flights to 200+ destinations.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll to fly</span>
          <ChevronDown className="w-5 h-5 animate-bounce-slow" />
        </div>
      </div>
    </div>
  )
}
