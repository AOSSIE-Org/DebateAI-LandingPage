import{ useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export default function DebateCarousel({ slides: customSlides }) {

  const defaultSlides = [
    {
      id: 1,
      title: 'Real-Time Dynamic Debates',
      description: 'Engage in synchronized real-time arguments with human opponents or specialized AI debaters.',
      image: null,
    },
    {
      id: 2,
      title: 'Instant Argument Judgment',
      description: 'Advanced reasoning models evaluate rhetoric, fallacies, persuasiveness, and factual support.',
      image: null,
    },
    {
      id: 3,
      title: 'Decentralized Server Ecosystem',
      description: 'Host local tournaments, school debates, or company clubs with full sovereign data control.',
      image: null,
    },
    {
      id: 4,
      title: 'Skill Ratings & Elo Ranking',
      description: 'Climb national and community debate ladders with comprehensive metric breakdown.',
      image: null,
    },
  ]

  const slides = customSlides || defaultSlides

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full flex flex-col items-center">

      <div className="overflow-hidden w-full rounded-sm" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className="flex-[0_0_100%] min-w-0 p-2 sm:p-3"
            >
              <div
                className="relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-sm overflow-hidden border transition-all duration-300 flex flex-col justify-between p-6 sm:p-8"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >

                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  <>
                    <div className="relative z-10 flex items-center justify-end">
                      <span className="text-xs font-mono text-zinc-500">
                        0{index + 1} / 0{slides.length}
                      </span>
                    </div>

                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-5 shadow-lg border"
                        style={{
                          backgroundColor: 'rgba(234, 88, 12, 0.08)',
                          borderColor: 'rgba(234, 88, 12, 0.25)',
                        }}
                      >
                        <svg
                          className="w-10 h-10 sm:w-12 sm:h-12 text-(--brand-orange)"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          <path d="M8 9h8" strokeWidth="2" />
                          <path d="M8 13h5" strokeWidth="2" />
                        </svg>
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-bold tracking-tight mb-2"
                        style={{ color: 'var(--text)' }}
                      >
                        {slide.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm max-w-sm leading-relaxed"
                        style={{ color: 'var(--text2)' }}
                      >
                        {slide.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-3 mt-4">
        <button
          onClick={scrollPrev}
          type="button"
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'var(--surface2)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${index === selectedIndex
                  ? 'w-7 h-2 bg-(--brand-orange)'
                  : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'
                }`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          type="button"
          aria-label="Next slide"
          className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'var(--surface2)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
