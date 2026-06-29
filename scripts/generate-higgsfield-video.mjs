/**
 * Génération de vidéos Higgsfield pour Halpulaar
 *
 * Usage :
 *   node scripts/generate-higgsfield-video.mjs --key=TON_API_KEY --scene=village
 *
 * Scènes disponibles : village | famille | fleuve | marche
 *
 * Après génération, copie l'URL dans src/pages/AdventurePage.tsx → HIGGS_VIDEOS
 *
 * Obtenir une clé API : https://cloud.higgsfield.ai → Settings → API Keys
 */

const PROMPTS = {
  village: `
    Cinematic night scene in a West African Fouta Toro village. Mud clay huts with thatched
    roofs silhouetted against a deep indigo sky. A large golden moon reflects on the Senegal
    River in the foreground. Fireflies float in the warm air. A small campfire glows between
    the huts, casting amber light. Tall baobab tree on the right. Slow cinematic pan from sky
    to river. 4K, 24fps film grain, ultra-realistic, golden hour warm tones, atmospheric.
  `.trim(),

  famille: `
    Warm interior of a West African Peul home at night. Family gathered on woven mats around
    a central fire. Geometric Fula textile patterns on the walls in gold and teal. A clay pot
    on the fire. Soft amber candlelight on dark brown skin faces. Children leaning on elders.
    Slow dolly-in shot. Rich colors, cinematic bokeh background, 4K, emotional, warm golden light.
  `.trim(),

  fleuve: `
    Senegal River at golden hour dusk. Lush green Sahel vegetation on the banks. A traditional
    wooden pirogue canoe with a triangular sail slowly drifts on calm turquoise-blue water.
    Perfect golden reflections shimmering on the surface. Herons standing in the shallows.
    Aerial drone shot slowly descending to water level. 4K, cinematic, magical realism.
  `.trim(),

  marche: `
    Vibrant West African village market at midday. Colorful fabrics hanging between stalls —
    indigo, gold, red. Women in headwraps negotiating over fresh produce. Children running.
    Red clay dust in sunbeams. A goat passing. Slow-motion wide shot panning across the
    market. Rich saturated colors, 4K cinematic, warm golden sunlight, documentary style.
  `.trim(),
}

async function generateVideo(apiKey, scene) {
  const prompt = PROMPTS[scene]
  if (!prompt) {
    console.error(`Scène inconnue: ${scene}. Choisir parmi: ${Object.keys(PROMPTS).join(', ')}`)
    process.exit(1)
  }

  console.log(`\n🎬 Génération vidéo — scène: ${scene}`)
  console.log(`📝 Prompt (${prompt.length} chars)`)
  console.log('⏳ Envoi à Higgsfield...\n')

  // Étape 1 — lancer la génération (text-to-image puis image-to-video)
  const genRes = await fetch('https://api.higgsfield.ai/v1/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'higgsfield-dop',     // Higgsfield DoP — cinématique
      task:  'text-to-video',
      prompt,
      duration: 8,                 // secondes
      resolution: '1080p',
      aspect_ratio: '16:9',
    }),
  })

  if (!genRes.ok) {
    const err = await genRes.text()
    console.error(`❌ Erreur API (${genRes.status}):`, err)
    process.exit(1)
  }

  const { generation_id, status } = await genRes.json()
  console.log(`✅ Génération lancée — ID: ${generation_id} | Status: ${status}`)
  console.log('⏳ Attente de la vidéo (peut prendre 1-3 minutes)...\n')

  // Étape 2 — polling jusqu'à completion
  let url = null
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 5000))   // attendre 5s
    const poll = await fetch(`https://api.higgsfield.ai/v1/generations/${generation_id}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    })
    const data = await poll.json()
    process.stdout.write(`  ⏱  [${i * 5}s] Status: ${data.status}         \r`)

    if (data.status === 'completed' || data.status === 'succeeded') {
      url = data.output_url ?? data.video_url ?? data.url
      break
    }
    if (data.status === 'failed' || data.status === 'error') {
      console.error('\n❌ Génération échouée:', data)
      process.exit(1)
    }
  }

  if (!url) {
    console.error('\n❌ Timeout après 5 minutes.')
    process.exit(1)
  }

  console.log(`\n\n✅ Vidéo générée !`)
  console.log(`🔗 URL: ${url}\n`)
  console.log('─'.repeat(60))
  console.log(`Ajoute cette URL dans src/pages/AdventurePage.tsx :`)
  console.log(`\n  HIGGS_VIDEOS['${scene}'] = '${url}'`)
  console.log('─'.repeat(60))
  return url
}

// ── Parse args ──────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => a.slice(2).split('='))
)

const apiKey = args.key
const scene  = args.scene ?? 'village'

if (!apiKey) {
  console.log(`
Usage: node scripts/generate-higgsfield-video.mjs --key=TON_API_KEY --scene=SCENE

Scènes: village | famille | fleuve | marche

Obtenir ta clé API Higgsfield :
  1. Va sur https://cloud.higgsfield.ai
  2. Crée un compte (accès gratuit disponible)
  3. Settings → API Keys → Generate Key
  4. Relance: node scripts/generate-higgsfield-video.mjs --key=VOTRE_CLÉ --scene=village
`)
  process.exit(0)
}

generateVideo(apiKey, scene)
