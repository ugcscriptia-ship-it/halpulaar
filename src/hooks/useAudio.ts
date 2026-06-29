import { useCallback, useRef, useState } from 'react'

/**
 * Lecture audio avec fallback TTS.
 * 1. Si `src` est fourni → tente de lire le fichier natif.
 * 2. Si le fichier est absent (404 / erreur) → bascule sur TTS avec `ttsText`.
 * 3. Si pas de src → TTS directement.
 * Le badge "tts" dans AudioPlayButton avertit l'utilisateur.
 */
export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const speakTts = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    // Nettoie les glyphes Pulaar spéciaux que le TTS ne sait pas prononcer
    const clean = text
      .replace(/ɓ/gi, 'b').replace(/ɗ/gi, 'd').replace(/ŋ/gi, 'ng')
      .replace(/ƴ/gi, 'y').replace(/'/g, '').replace(/-/g, ' ')
    const utt = new SpeechSynthesisUtterance(clean)
    const voices = window.speechSynthesis.getVoices()
    // Préfère pt-PT (voyelles ouvertes proches du Pulaar) ou fr-FR en fallback
    const preferred = voices.find(v => v.lang.startsWith('pt')) ??
                      voices.find(v => v.lang.startsWith('fr')) ??
                      voices[0]
    if (preferred) utt.voice = preferred
    utt.lang    = preferred?.lang ?? 'fr-FR'
    utt.rate    = 0.52
    utt.pitch   = 0.82
    utt.volume  = 1
    utt.onstart = () => setPlaying(true)
    utt.onend   = () => setPlaying(false)
    utt.onerror = () => setPlaying(false)
    setPlaying(true)
    window.speechSynthesis.speak(utt)
  }, [])

  const play = useCallback((src?: string, ttsText?: string) => {
    // Stoppe tout
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setPlaying(false)

    if (src) {
      const a = new Audio(src)
      audioRef.current = a
      setPlaying(true)
      a.onended = () => setPlaying(false)
      // Si le fichier audio natif est absent → bascule sur TTS
      a.onerror = () => {
        setPlaying(false)
        if (ttsText) speakTts(ttsText)
      }
      a.play().catch(() => {
        setPlaying(false)
        if (ttsText) speakTts(ttsText)
      })
    } else if (ttsText) {
      speakTts(ttsText)
    }
  }, [speakTts])

  const stop = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setPlaying(false)
  }, [])

  return { play, stop, playing }
}
