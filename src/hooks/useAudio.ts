import { useCallback, useRef, useState } from 'react'

// Lecture des enregistrements natifs. Aucun TTS (CLAUDE.md §3).
export function useAudio() {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback((src?: string) => {
    if (!src) return
    if (ref.current) ref.current.pause()
    const a = new Audio(src)
    ref.current = a
    setPlaying(true)
    a.onended = () => setPlaying(false)
    a.play().catch(() => setPlaying(false))
  }, [])

  return { play, playing }
}
