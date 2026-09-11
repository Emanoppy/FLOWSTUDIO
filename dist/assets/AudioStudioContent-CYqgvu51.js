import { jsx, jsxs } from "./jsx-shim/jsx-runtime.js";
import { r, j as jsx2 } from "./vendor-react-BbRiLirl.js";
import { u as useStore, D as DEFAULT_CAPTION_STYLE } from "./index-DE7up0M0.js";
const me = "ai33_api_key";
const Qo = "https://api.ai33.pro";
const co = () => localStorage.getItem(me) || "";
const lo = (apiKey) => {
  if (apiKey) {
    localStorage.setItem(me, apiKey.trim());
  } else {
    localStorage.removeItem(me);
  }
};
const D = async (path, options = {}, apiKeyOverride = null) => {
  var errorTemp;
  const apiKey = apiKeyOverride || co();
  if (!apiKey) {
    throw new Error("No has configurado tu API Key de AI33.pro. Ve a Ajustes en el Generador de Audio para ingresarla.");
  }
  const url = path.startsWith("http") ? path : "" + Qo + path;
  const headers = {
    "xi-api-key": apiKey,
    ...options.headers || {}
  };
  let body = options.body;
  if (body && !(body instanceof FormData) && typeof body != "string") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  const response = await fetch(url, {
    ...options,
    headers,
    body
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data && data.success === false) {
    const errorMessage = (data == null ? void 0 : data.error_message) || ((errorTemp = data == null ? void 0 : data.error) == null ? void 0 : errorTemp.message) || (data == null ? void 0 : data.message) || "Error HTTP " + response.status + ": " + response.statusText;
    throw new Error(errorMessage);
  }
  return data;
};
const B = async (apiKeyOverride = null) => {
  const data = await D("/v1/credits", {
    method: "GET"
  }, apiKeyOverride);
  return (data == null ? void 0 : data.credits) ?? 0;
};
const Zo = async (apiKeyOverride = null) => {
  const data = await D("/v1/health-check", {
    method: "GET"
  }, apiKeyOverride);
  return (data == null ? void 0 : data.data) || {};
};
const ae = async (taskId, {
  onProgress = null,
  pollInterval = 2e3,
  maxTimeoutMs = 42e4
} = {}, apiKeyOverride = null) => {
  const startTime = Date.now();
  let errorCount = 0;
  while (Date.now() - startTime < maxTimeoutMs) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
    let taskResult = null;
    try {
      taskResult = await D("/v1/task/" + taskId, {
        method: "GET"
      }, apiKeyOverride);
      errorCount = 0;
    } catch (error) {
      errorCount++;
      if (errorCount < 8) {
        if (typeof onProgress == "function") {
          onProgress(null, "procesando en servidor...", null);
        }
        await new Promise((resolve) => setTimeout(resolve, 2e3 + errorCount * 500));
        continue;
      }
      throw error;
    }
    if (!taskResult) {
      continue;
    }
    const status = String(taskResult.status || "doing").toLowerCase();
    const progress = Number(taskResult.progress) || 0;
    if (typeof onProgress == "function") {
      onProgress(progress, status, taskResult);
    }
    if (status === "done" || status === "success" || status === "completed") {
      return taskResult;
    }
    if (status === "error" || status === "failed") {
      throw new Error(taskResult.error_message || "La tarea de generaci\xF3n fall\xF3 en AI33.pro.");
    }
  }
  throw new Error("Tiempo de espera agotado al generar el audio. El servidor tard\xF3 demasiado en responder.");
};
const et = async ({
  text,
  voice_id: voiceId,
  speed = 1,
  with_transcript: withTranscript = false,
  file_name: fileName = null
}, {
  onProgress = null,
  apiKey = null
} = {}) => {
  if (!text || !text.trim()) {
    throw new Error("Debes ingresar un texto para sintetizar.");
  }
  if (!voiceId) {
    throw new Error("Debes seleccionar una voz de la biblioteca.");
  }
  const formData = new FormData();
  formData.append("text", text.trim());
  let voiceIdNormalized = String(voiceId).trim();
  if (!voiceIdNormalized.includes("_")) {
    voiceIdNormalized = "elevenlabs_" + voiceIdNormalized;
  }
  formData.append("voice_id", voiceIdNormalized);
  formData.append("speed", String(speed));
  formData.append("with_transcript", withTranscript ? "true" : "false");
  if (fileName) {
    formData.append("file_name", fileName);
  }
  const result = await D("/v3/text-to-speech", {
    method: "POST",
    body: formData
  }, apiKey);
  if (result == null || !result.task_id) {
    throw new Error("No se recibi\xF3 task_id de la API de AI33.");
  }
  return await ae(result.task_id, {
    onProgress
  }, apiKey);
};
const ot = async ({
  text,
  speakers,
  delay = 0.3,
  with_transcript: withTranscript = true
}, {
  onProgress = null,
  apiKey = null
} = {}) => {
  if (!text || !text.trim()) {
    throw new Error("Debes ingresar el gui\xF3n del di\xE1logo.");
  }
  if (!Array.isArray(speakers) || speakers.length < 2) {
    throw new Error("El di\xE1logo requiere al menos 2 voces configuradas (Voz A y Voz B).");
  }
  const normalizedSpeakers = speakers.map((speaker) => ({
    ...speaker,
    voice_id: String(speaker.voice_id).includes("_") ? String(speaker.voice_id).trim() : "elevenlabs_" + String(speaker.voice_id).trim()
  }));
  const formData = new FormData();
  formData.append("text", text.trim());
  formData.append("speakers", JSON.stringify(normalizedSpeakers));
  formData.append("delay", String(delay));
  formData.append("with_transcript", withTranscript ? "true" : "false");
  const result = await D("/v3/text-to-speech/dialogue", {
    method: "POST",
    body: formData
  }, apiKey);
  if (result == null || !result.task_id) {
    throw new Error("No se recibi\xF3 task_id para el di\xE1logo.");
  }
  return await ae(result.task_id, {
    onProgress
  }, apiKey);
};
const tt = async ({
  create_mode: createMode = "simple",
  gpt_description_prompt: description = "",
  make_instrumental: makeInstrumental = false,
  title = "",
  lyrics = "",
  tags = "",
  vocal_gender: vocalGender = ""
}, {
  onProgress = null,
  apiKey = null
} = {}) => {
  let payload = {
    create_mode: createMode
  };
  if (createMode === "simple") {
    if (!description.trim()) {
      throw new Error("Ingresa una descripci\xF3n del estilo musical que deseas crear.");
    }
    payload.gpt_description_prompt = description.trim();
    payload.make_instrumental = !!makeInstrumental;
  } else {
    if (!lyrics.trim() && !tags.trim()) {
      throw new Error("En modo personalizado debes ingresar al menos la letra o los estilos/tags.");
    }
    if (title.trim()) {
      payload.title = title.trim();
    }
    if (lyrics.trim()) {
      payload.lyrics = lyrics.trim();
    }
    if (tags.trim()) {
      payload.tags = tags.trim();
    }
    if (vocalGender) {
      payload.vocal_gender = vocalGender;
    }
  }
  const result = await D("/v1s/task/music-generation", {
    method: "POST",
    body: payload
  }, apiKey);
  if (result == null || !result.task_id) {
    throw new Error("No se recibi\xF3 task_id para la generaci\xF3n de m\xFAsica Suno.");
  }
  return await ae(result.task_id, {
    onProgress,
    maxTimeoutMs: 6e5
  }, apiKey);
};
const at = async ({
  text,
  duration_seconds: durationSeconds = 5,
  prompt_influence: promptInfluence = 0.3,
  loop = false,
  model_id: modelId = "eleven_text_to_sound_v2"
}, {
  onProgress = null,
  apiKey = null
} = {}) => {
  if (!text || !text.trim()) {
    throw new Error("Debes describir el efecto de sonido.");
  }
  const payload = {
    text: text.trim().slice(0, 450),
    duration_seconds: durationSeconds ? Number(durationSeconds) : null,
    prompt_influence: Number(promptInfluence) || 0.3,
    loop: !!loop,
    model_id: modelId
  };
  const result = await D("/v1/task/sound-effect", {
    method: "POST",
    body: payload
  }, apiKey);
  if (result == null || !result.task_id) {
    throw new Error("No se recibi\xF3 task_id para el efecto de sonido.");
  }
  return await ae(result.task_id, {
    onProgress
  }, apiKey);
};
const rt = async ({
  voice_name: voiceName,
  audio_file: audioFile
}, apiKeyOverride = null) => {
  var resultDataTemp;
  if (!voiceName || !voiceName.trim()) {
    throw new Error("Ingresa un nombre para la voz clonada.");
  }
  if (!audioFile) {
    throw new Error("Selecciona un archivo de audio para clonar.");
  }
  const formData = new FormData();
  formData.append("voice_name", voiceName.trim());
  formData.append("audio_file", audioFile);
  const result = await D("/v3/text-to-speech/voice-clone", {
    method: "POST",
    body: formData
  }, apiKeyOverride);
  return ((resultDataTemp = result == null ? void 0 : result.data) == null ? void 0 : resultDataTemp.voice_id) || null;
};
const H = [{
  voice_id: "elevenlabs_pNInz6obpgDQGcFmaJgB",
  name: "Adam \xB7 Narrador \xC9pico (Deep & Warm)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["\xC9pico", "Documentales", "Cine", "Deep"]
}, {
  voice_id: "elevenlabs_21m00Tcm4TlvDq8ikWAM",
  name: "Rachel \xB7 Calma & Clara (Storytelling)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Suave", "Audiolibros", "Storytelling"]
}, {
  voice_id: "elevenlabs_ErXwobaYiN019PkySvjV",
  name: "Antoni \xB7 Vers\xE1til & Din\xE1mico (Young)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Vers\xE1til", "Expresivo", "Joven"]
}, {
  voice_id: "elevenlabs_TxGEqnHWrfWFTfGW9XjX",
  name: "Josh \xB7 Confiado & Profundo (Commercial)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Publicidad", "Comercial", "Potente"]
}, {
  voice_id: "elevenlabs_VR6AewLTigWG4xSOukaG",
  name: "Arnold \xB7 N\xEDtido & Maduro (Narrator)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Maduro", "Educativo", "Documental"]
}, {
  voice_id: "elevenlabs_yoZ06aMxZJJ28mfd3POQ",
  name: "Sam \xB7 Rasposo & Carism\xE1tico (Dynamic)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Rasposo", "Carism\xE1tico", "En\xE9rgico"]
}, {
  voice_id: "elevenlabs_AZnzlk1XvdvUeBnXmlld",
  name: "Domi \xB7 Fuerte & Apasionada (Strong)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Fuerte", "En\xE9rgica", "Pasi\xF3n"]
}, {
  voice_id: "elevenlabs_EXAVITQu4vr4xnSDxMaL",
  name: "Bella \xB7 Dulce & Suave (Narration)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Dulce", "Relatos", "Cuentos"]
}, {
  voice_id: "elevenlabs_IKne3meq5aSn9XLyUdCD",
  name: "Charlie \xB7 Casual & Amigable (Natural)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Casual", "Amigable", "Conversacional"]
}, {
  voice_id: "elevenlabs_JBFqnCBsd6RMkjVDRZzb",
  name: "George \xB7 Brit\xE1nico C\xE1lido (Story & History)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Elegante", "Historia", "Brit\xE1nico"]
}, {
  voice_id: "elevenlabs_TX3LPaxmHKxFdv7VOQHJ",
  name: "Liam \xB7 Joven & Limpio (Tutorial & Podcast)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Joven", "Limpio", "Podcast"]
}, {
  voice_id: "elevenlabs_N2lVS1w4EtoT3dr4eOWO",
  name: "Callum \xB7 Intenso & Suspenso (Thriller)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Intenso", "Suspenso", "Cine"]
}, {
  voice_id: "elevenlabs_XB0fDUnXU5powFXDhCwa",
  name: "Charlotte \xB7 Cautivadora & Sofisticada",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Sofisticada", "Premium", "Seductora"]
}, {
  voice_id: "elevenlabs_Xb7hH8MSUJpSbSDYk0k2",
  name: "Alice \xB7 Noticiero & Periodismo (News)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Noticias", "Confiable", "Periodismo"]
}, {
  voice_id: "elevenlabs_XrExE9yKIg1WjnnlVkGX",
  name: "Matilda \xB7 Educativa & Amable (Friendly)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Educativa", "Amable", "Relatos"]
}, {
  voice_id: "elevenlabs_bIHbv24MWmeRgasZH58o",
  name: "Will \xB7 Espont\xE1neo & Cercano (Podcast)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Espont\xE1neo", "Podcast", "Cercano"]
}, {
  voice_id: "elevenlabs_cgSgspJ2msm6clMCkdW9",
  name: "Jessica \xB7 Juvenil & Expresiva (Upbeat)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Juvenil", "Brillante", "Expresiva"]
}, {
  voice_id: "elevenlabs_cjVigY5qzO86Huf0OWal",
  name: "Eric \xB7 Confiable & Ejecutivo (Corporate)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Ejecutivo", "Corporativo", "Confiable"]
}, {
  voice_id: "elevenlabs_iP95p4xoKVk53GoZ742B",
  name: "Chris \xB7 Conversaci\xF3n Natural (Everyday)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Realista", "Conversacional", "Natural"]
}, {
  voice_id: "elevenlabs_nPczCjzI2devNBz1zQrb",
  name: "Brian \xB7 Profundo & Autoritario (Trailers)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Autoritario", "Trailers", "Cine"]
}, {
  voice_id: "elevenlabs_onwK4e9ZLuTAKqWW03F9",
  name: "Daniel \xB7 Sobrio & Elegante (Broadcast)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Sobrio", "Elegante", "Locutor"]
}, {
  voice_id: "elevenlabs_pFZP5JQG7iQjIQuC4Bku",
  name: "Lily \xB7 Rasposa & \xCDntima (Warm Narration)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["\xCDntima", "Rasposa", "C\xE1lida"]
}, {
  voice_id: "elevenlabs_pqHfZKP75CvOlQylNhV4",
  name: "Bill \xB7 Maduro & Documental (Historic)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Maduro", "Historia", "Documentales"]
}, {
  voice_id: "elevenlabs_t0jbNlEBZgoAfZq35cjz",
  name: "Sarah \xB7 Corporativa & Profesional (News)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Corporativa", "Noticias", "Profesional"]
}, {
  voice_id: "elevenlabs_FGY2WhTYpPnrIDTdsKH5",
  name: "Laura \xB7 Entusiasta & Vendedora (Promo)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Entusiasta", "Promo", "Comercial"]
}, {
  voice_id: "elevenlabs_CwhRBWXzGAHq8TQ4Fs17",
  name: "Roger \xB7 Voz de Tr\xE1iler (Action & Movie)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Male",
  tags: ["Tr\xE1iler", "Acci\xF3n", "Voz Grave"]
}, {
  voice_id: "elevenlabs_SAz9YHcvj6GT2YYXdXww",
  name: "River \xB7 Calma & Meditaci\xF3n (Poetry/ASMR)",
  language: "es / en / multi",
  provider: "elevenlabs",
  gender: "Female",
  tags: ["Meditaci\xF3n", "Relajaci\xF3n", "Poes\xEDa"]
}, {
  voice_id: "minimax_male-qn-qingse",
  name: "Minimax Pro Male \xB7 Cinem\xE1tico \xC9pico",
  language: "es / en / multi",
  provider: "minimax",
  gender: "Male",
  tags: ["\xC9pico", "Cinem\xE1tico", "Minimax"]
}, {
  voice_id: "minimax_female-shaonv",
  name: "Minimax Pro Female \xB7 Juvenil Expresiva",
  language: "es / en / multi",
  provider: "minimax",
  gender: "Female",
  tags: ["Juvenil", "Expresiva", "Minimax"]
}, {
  voice_id: "edge_es-ES-AlvaroNeural",
  name: "\xC1lvaro (Espa\xF1ol Espa\xF1a \xB7 Narrador)",
  language: "es-ES",
  provider: "edge",
  gender: "Male",
  tags: ["Natural", "Narraci\xF3n", "Espa\xF1a"]
}, {
  voice_id: "edge_es-ES-ElviraNeural",
  name: "Elvira (Espa\xF1ol Espa\xF1a \xB7 Clara)",
  language: "es-ES",
  provider: "edge",
  gender: "Female",
  tags: ["Clara", "Profesional", "Espa\xF1a"]
}, {
  voice_id: "edge_es-MX-JorgeNeural",
  name: "Jorge (Espa\xF1ol M\xE9xico \xB7 C\xE1lido)",
  language: "es-MX",
  provider: "edge",
  gender: "Male",
  tags: ["C\xE1lido", "Documental", "M\xE9xico"]
}, {
  voice_id: "edge_es-MX-DaliaNeural",
  name: "Dalia (Espa\xF1ol M\xE9xico \xB7 Din\xE1mica)",
  language: "es-MX",
  provider: "edge",
  gender: "Female",
  tags: ["Din\xE1mica", "Juvenil", "M\xE9xico"]
}, {
  voice_id: "edge_es-AR-TomasNeural",
  name: "Tom\xE1s (Espa\xF1ol Argentina)",
  language: "es-AR",
  provider: "edge",
  gender: "Male",
  tags: ["Expresivo", "Argentina"]
}, {
  voice_id: "edge_es-CO-GonzaloNeural",
  name: "Gonzalo (Espa\xF1ol Colombia)",
  language: "es-CO",
  provider: "edge",
  gender: "Male",
  tags: ["Neutro", "Colombia"]
}, {
  voice_id: "edge_es-US-AlonsoNeural",
  name: "Alonso (Espa\xF1ol Latino Neutral)",
  language: "es-US",
  provider: "edge",
  gender: "Male",
  tags: ["Neutro", "Latinoam\xE9rica"]
}, {
  voice_id: "edge_en-US-GuyNeural",
  name: "Guy (English US \xB7 News & Documentary)",
  language: "en-US",
  provider: "edge",
  gender: "Male",
  tags: ["Natural", "News"]
}, {
  voice_id: "edge_en-US-JennyNeural",
  name: "Jenny (English US \xB7 Clear & Story)",
  language: "en-US",
  provider: "edge",
  gender: "Female",
  tags: ["Clear", "Story"]
}, {
  voice_id: "edge_en-GB-RyanNeural",
  name: "Ryan (English UK \xB7 Professional)",
  language: "en-GB",
  provider: "edge",
  gender: "Male",
  tags: ["British", "Clean"]
}, {
  voice_id: "kokoro_am_adam",
  name: "Kokoro Adam (Fast TTS)",
  language: "en-US",
  provider: "kokoro",
  gender: "Male",
  tags: ["R\xE1pido", "Ligero"]
}];
const lt = ({
  mode = "view",
  isOpen = true,
  onClose,
  onApplyAudio,
  initialTab = "tts"
}) => {
  var metaTemp1;
  var metaTemp2;
  var metaTemp3;
  var metaTemp4;
  var metaTemp5;
  var metaTemp6;
  var metaTemp7;
  var metaTemp8;
  var metaTemp9;
  var metaTemp10;
  var metaTemp11;
  var metaTemp12;
  const setCurrentView = useStore((state) => state.setCurrentView);
  const [activeTab, setActiveTab] = r.useState(initialTab);
  const [apiKey, setApiKey] = r.useState(co());
  const [credits, setCredits] = r.useState(null);
  const [healthStatus, setHealthStatus] = r.useState(null);
  const [generationProgress, setGenerationProgress] = r.useState({
    active: false,
    message: "",
    progress: 0
  });
  const [errorMessage, setErrorMessage] = r.useState("");
  const [successMessage, setSuccessMessage] = r.useState("");
  const [ttsText, setTtsText] = r.useState("");
  const [selectedVoiceId, setSelectedVoiceId] = r.useState("elevenlabs_pNInz6obpgDQGcFmaJgB");
  const [ttsSpeed, setTtsSpeed] = r.useState(1);
  const [ttsWithTranscript, setTtsWithTranscript] = r.useState(true);
  const [ttsResult, setTtsResult] = r.useState(null);
  const [dialogueText, setDialogueText] = r.useState("A> Hola, bienvenidos a este nuevo video documental.\nB> Hoy descubriremos secretos incre\xEDbles que cambiar\xE1n tu perspectiva.");
  const [dialogueVoiceA, setDialogueVoiceA] = r.useState("elevenlabs_pNInz6obpgDQGcFmaJgB");
  const [dialogueVoiceB, setDialogueVoiceB] = r.useState("elevenlabs_21m00Tcm4TlvDq8ikWAM");
  const [dialogueDelay, setDialogueDelay] = r.useState(0.3);
  const [dialogueResult, setDialogueResult] = r.useState(null);
  const [musicCreateMode, setMusicCreateMode] = r.useState("simple");
  const [musicDescription, setMusicDescription] = r.useState("");
  const [musicInstrumental, setMusicInstrumental] = r.useState(false);
  const [musicTitle, setMusicTitle] = r.useState("");
  const [musicLyrics, setMusicLyrics] = r.useState("");
  const [musicTags, setMusicTags] = r.useState("cinematic, documentary, ambient, strings");
  const [musicVocalGender, setMusicVocalGender] = r.useState("");
  const [musicResult, setMusicResult] = r.useState(null);
  const [musicInsertVolume, setMusicInsertVolume] = r.useState(0.2);
  const [musicInsertLoop, setMusicInsertLoop] = r.useState(true);
  const [sfxText, setSfxText] = r.useState("");
  const [sfxDuration, setSfxDuration] = r.useState(5);
  const [sfxLoop, setSfxLoop] = r.useState(false);
  const [sfxResult, setSfxResult] = r.useState(null);
  const [sfxInsertVolume, setSfxInsertVolume] = r.useState(0.1);
  const [sfxInsertLoop, setSfxInsertLoop] = r.useState(true);
  const [cloneVoiceName, setCloneVoiceName] = r.useState("");
  const [cloneAudioFile, setCloneAudioFile] = r.useState(null);
  const [clonedVoicesList, setClonedVoicesList] = r.useState([]);
  const [customVoices, setCustomVoices] = r.useState(() => {
    try {
      const storedCustomVoices = localStorage.getItem("flowstudio_custom_eleven_voices");
      if (storedCustomVoices) {
        return JSON.parse(storedCustomVoices);
      } else {
        return [];
      }
    } catch {
      return [];
    }
  });
  const [customVoiceIdInput, setCustomVoiceIdInput] = r.useState("");
  const [customVoiceNameInput, setCustomVoiceNameInput] = r.useState("");
  const handleAddCustomVoice = (voiceIdOverride, nameOverride = "") => {
    const rawId = customVoiceIdInput.trim();
    if (!rawId) {
      return;
    }
    const cleanId = rawId.replace(/^elevenlabs_/, "");
    const fullVoiceId = "elevenlabs_" + cleanId;
    const displayName = (nameOverride || customVoiceNameInput).trim() || "ElevenLabs (" + cleanId.slice(0, 8) + "...)";
    const existingVoice = customVoices.find((voice) => voice.voice_id === fullVoiceId);
    let updatedVoices;
    if (existingVoice) {
      updatedVoices = customVoices;
    } else {
      updatedVoices = [{
        voice_id: fullVoiceId,
        name: "\u{1F451} " + displayName,
        language: "es / en / multi",
        provider: "elevenlabs",
        gender: "Custom",
        tags: ["Custom ID", "ElevenLabs"],
        isCustom: true
      }, ...customVoices];
      setCustomVoices(updatedVoices);
      try {
        localStorage.setItem("flowstudio_custom_eleven_voices", JSON.stringify(updatedVoices));
      } catch {
      }
    }
    setSelectedVoiceId(fullVoiceId);
    setSuccessMessage("\u2713 Voz ElevenLabs seleccionada: " + cleanId);
    setCustomVoiceIdInput("");
    setCustomVoiceNameInput("");
  };
  const handleRemoveCustomVoice = (voiceId) => {
    const updatedVoices = customVoices.filter((voice) => voice.voice_id !== voiceId);
    setCustomVoices(updatedVoices);
    try {
      localStorage.setItem("flowstudio_custom_eleven_voices", JSON.stringify(updatedVoices));
    } catch {
    }
    if (selectedVoiceId === voiceId) {
      setSelectedVoiceId("elevenlabs_IKne3meq5aSn9XLyUdCD");
    }
  };
  const [filteredVoices, setFilteredVoices] = r.useState(H);
  const [providerFilter, setProviderFilter] = r.useState("elevenlabs");
  const [languageFilter, setLanguageFilter] = r.useState("es");
  const [voiceSearchQuery, setVoiceSearchQuery] = r.useState("");
  const [playingPreviewUrl, setPlayingPreviewUrl] = r.useState(null);
  const audioPreviewRef = r.useRef(null);
  const updateProject = useStore((state) => state.updateProject);
  const project = useStore((state) => state.project);
  r.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  r.useEffect(() => {
    if (isOpen && apiKey) {
      B(apiKey).then((credits2) => setCredits(credits2)).catch(() => {
      });
      Zo(apiKey).then((health) => setHealthStatus(health)).catch(() => {
      });
    }
  }, [isOpen, apiKey]);
  r.useEffect(() => {
    let combinedVoices = [...customVoices, ...H, ...clonedVoicesList];
    if (providerFilter !== "all") {
      combinedVoices = combinedVoices.filter((voice) => voice.provider === providerFilter);
    }
    if (languageFilter && languageFilter !== "all") {
      const languageLower = languageFilter.toLowerCase();
      combinedVoices = combinedVoices.filter((voice) => {
        const voiceLanguage = (voice.language || "").toLowerCase();
        if (voiceLanguage.includes("multi") || voiceLanguage.includes("es / en")) {
          return true;
        } else {
          return voiceLanguage.includes(languageLower);
        }
      });
    }
    if (voiceSearchQuery.trim()) {
      const searchLower = voiceSearchQuery.toLowerCase().trim();
      combinedVoices = combinedVoices.filter((voice) => voice.name.toLowerCase().includes(searchLower) || voice.voice_id.toLowerCase().includes(searchLower) || voice.tags && voice.tags.some((tag) => tag.toLowerCase().includes(searchLower)) || voice.gender && voice.gender.toLowerCase().includes(searchLower));
    }
    setFilteredVoices(combinedVoices);
  }, [providerFilter, languageFilter, voiceSearchQuery, clonedVoicesList, customVoices]);
  if (!isOpen) {
    return null;
  }
  const handleSaveApiKey = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!apiKey.trim()) {
      lo("");
      setCredits(null);
      setSuccessMessage("API Key eliminada.");
      return;
    }
    try {
      const credits2 = await B(apiKey.trim());
      lo(apiKey.trim());
      setCredits(credits2);
      setSuccessMessage("\u2713 \xA1API Key guardada exitosamente! Saldo disponible: " + credits2.toLocaleString() + " cr\xE9ditos.");
    } catch (error) {
      setErrorMessage("Error al validar API Key: " + error.message);
    }
  };
  const handleTogglePreview = (previewUrl) => {
    var audioElementTemp;
    if (previewUrl) {
      if (playingPreviewUrl === previewUrl) {
        if ((audioElementTemp = audioPreviewRef.current) != null) {
          audioElementTemp.pause();
        }
        setPlayingPreviewUrl(null);
        return;
      }
      if (audioPreviewRef.current) {
        audioPreviewRef.current.src = previewUrl;
        audioPreviewRef.current.play();
        setPlayingPreviewUrl(previewUrl);
      }
    }
  };
  const handleGenerateTts = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setTtsResult(null);
    setGenerationProgress({
      active: true,
      message: "Iniciando s\xEDntesis de voz con IA...",
      progress: 10
    });
    try {
      const result = await et({
        text: ttsText,
        voice_id: selectedVoiceId,
        speed: ttsSpeed,
        with_transcript: ttsWithTranscript
      }, {
        onProgress: (progress, status) => {
          setGenerationProgress({
            active: true,
            message: "Generando voz (" + status + "): " + progress + "%",
            progress
          });
        }
      });
      setTtsResult(result);
      setGenerationProgress({
        active: false,
        message: "",
        progress: 100
      });
      setSuccessMessage("\xA1Audio generado con \xE9xito!");
      if (apiKey) {
        B(apiKey).then(setCredits).catch(() => {
        });
      }
    } catch (error) {
      setGenerationProgress({
        active: false,
        message: "",
        progress: 0
      });
      setErrorMessage(error.message);
    }
  };
  const handleGenerateDialogue = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setDialogueResult(null);
    setGenerationProgress({
      active: true,
      message: "Preparando di\xE1logo multi-voz...",
      progress: 10
    });
    try {
      const result = await ot({
        text: dialogueText,
        speakers: [{
          voice_id: dialogueVoiceA,
          speed: 1
        }, {
          voice_id: dialogueVoiceB,
          speed: 1
        }],
        delay: dialogueDelay,
        with_transcript: true
      }, {
        onProgress: (progress, status) => {
          setGenerationProgress({
            active: true,
            message: "Generando di\xE1logo (" + status + "): " + progress + "%",
            progress
          });
        }
      });
      setDialogueResult(result);
      setGenerationProgress({
        active: false,
        message: "",
        progress: 100
      });
      setSuccessMessage("\xA1Di\xE1logo generado con \xE9xito!");
      if (apiKey) {
        B(apiKey).then(setCredits).catch(() => {
        });
      }
    } catch (error) {
      setGenerationProgress({
        active: false,
        message: "",
        progress: 0
      });
      setErrorMessage(error.message);
    }
  };
  const handleGenerateMusic = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setMusicResult(null);
    setGenerationProgress({
      active: true,
      message: "Enviando composici\xF3n a Suno AI...",
      progress: 10
    });
    try {
      const result = await tt({
        create_mode: musicCreateMode,
        gpt_description_prompt: musicDescription,
        make_instrumental: musicInstrumental,
        title: musicTitle,
        lyrics: musicLyrics,
        tags: musicTags,
        vocal_gender: musicVocalGender
      }, {
        onProgress: (progress, status) => {
          setGenerationProgress({
            active: true,
            message: "Componiendo m\xFAsica Suno (" + status + "): " + progress + "%",
            progress
          });
        }
      });
      setMusicResult(result);
      setGenerationProgress({
        active: false,
        message: "",
        progress: 100
      });
      setSuccessMessage("\xA1Canci\xF3n de Suno completada con \xE9xito!");
      if (apiKey) {
        B(apiKey).then(setCredits).catch(() => {
        });
      }
    } catch (error) {
      setGenerationProgress({
        active: false,
        message: "",
        progress: 0
      });
      setErrorMessage(error.message);
    }
  };
  const handleGenerateSfx = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setSfxResult(null);
    setGenerationProgress({
      active: true,
      message: "Generando efecto de sonido...",
      progress: 15
    });
    try {
      const result = await at({
        text: sfxText,
        duration_seconds: sfxDuration,
        loop: sfxLoop
      }, {
        onProgress: (progress, status) => {
          setGenerationProgress({
            active: true,
            message: "Creando SFX (" + status + "): " + progress + "%",
            progress
          });
        }
      });
      setSfxResult(result);
      setGenerationProgress({
        active: false,
        message: "",
        progress: 100
      });
      setSuccessMessage("\xA1Efecto de sonido generado con \xE9xito!");
      if (apiKey) {
        B(apiKey).then(setCredits).catch(() => {
        });
      }
    } catch (error) {
      setGenerationProgress({
        active: false,
        message: "",
        progress: 0
      });
      setErrorMessage(error.message);
    }
  };
  const handleCloneVoiceSubmit = async (event) => {
    event.preventDefault();
    if (!cloneVoiceName.trim() || !cloneAudioFile) {
      setErrorMessage("Ingresa un nombre y selecciona un archivo de audio para clonar.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("");
    setGenerationProgress({
      active: true,
      message: "Subiendo y clonando muestra de voz...",
      progress: 30
    });
    try {
      const voiceId = await rt({
        voice_name: cloneVoiceName,
        audio_file: cloneAudioFile
      }, apiKey);
      const newClonedVoice = {
        voice_id: "clone_" + voiceId,
        name: cloneVoiceName + " (Clonada)",
        language: "Multiling\xFCe",
        provider: "clone",
        gender: "Custom",
        tags: ["Voz Clonada", "Propia"]
      };
      setClonedVoicesList((prevList) => [newClonedVoice, ...prevList]);
      setSelectedVoiceId("clone_" + voiceId);
      setGenerationProgress({
        active: false,
        message: "",
        progress: 100
      });
      setSuccessMessage("\u2713 \xA1Voz clonada con \xE9xito! ID: clone_" + voiceId);
      setCloneVoiceName("");
      setCloneAudioFile(null);
      setActiveTab("tts");
    } catch (error) {
      setGenerationProgress({
        active: false,
        message: "",
        progress: 0
      });
      setErrorMessage(error.message);
    }
  };
  const extractAudioUrl = (result) => {
    var resultMetaTemp1;
    var resultMetaTemp2;
    var resultMetaTemp3;
    var resultMetaTemp4;
    var resultMetaTemp5;
    var resultMetaTemp6;
    var resultMetaTemp7;
    var resultMetaTemp8;
    var resultMetaTemp9;
    if (result) {
      if (typeof result == "string" && result.startsWith("http")) {
        return result;
      } else {
        return ((resultMetaTemp1 = result.metadata) == null ? void 0 : resultMetaTemp1.audio_url) || ((resultMetaTemp2 = result.metadata) == null ? void 0 : resultMetaTemp2.output_uri) || ((resultMetaTemp3 = result.metadata) == null ? void 0 : resultMetaTemp3.file_url) || ((resultMetaTemp4 = result.metadata) == null ? void 0 : resultMetaTemp4.result_url) || ((resultMetaTemp5 = result.metadata) == null ? void 0 : resultMetaTemp5.url) || ((resultMetaTemp9 = (resultMetaTemp8 = (resultMetaTemp7 = (resultMetaTemp6 = result.metadata) == null ? void 0 : resultMetaTemp6.suno_result) == null ? void 0 : resultMetaTemp7.clips) == null ? void 0 : resultMetaTemp8[0]) == null ? void 0 : resultMetaTemp9.audio_url) || result.output_uri || result.audio_url || result.file_url || result.result_url || result.url || "";
      }
    } else {
      return "";
    }
  };
  const applyAudioToProject = async (audioSourceOrResult, trackType = "narration", label = "Audio IA", volumeOverride = null, loopOverride = null) => {
    try {
      const audioUrl = typeof audioSourceOrResult == "string" ? audioSourceOrResult : extractAudioUrl(audioSourceOrResult);
      if (!audioUrl) {
        throw new Error("No se pudo obtener una URL de audio v\xE1lida del resultado.");
      }
      const audioElement = new Audio(audioUrl);
      await new Promise((resolve) => {
        audioElement.onloadedmetadata = () => resolve();
        audioElement.onerror = () => resolve();
        setTimeout(resolve, 3e3);
      });
      const durationSeconds = audioElement.duration || 10;
      const durationMs = Math.round(durationSeconds * 1e3);
      const volume = volumeOverride !== null ? volumeOverride : trackType === "music" ? 0.1 : 1;
      const loop = loopOverride !== null ? loopOverride : trackType === "music";
      const trackData = {
        id: crypto.randomUUID(),
        name: label,
        url: audioUrl,
        durationMs,
        volume,
        muted: false,
        loop
      };
      if (trackType === "music") {
        updateProject({
          musicTrack: trackData
        });
        setSuccessMessage("\u2713 \xA1M\xFAsica / SFX agregada a la pista A2 (" + Math.round(volume * 100) + "% de volumen, " + (loop ? "Bucle ON" : "Sin bucle") + ")!");
      } else {
        updateProject({
          audioTrack: trackData
        });
        setSuccessMessage("\u2713 \xA1Audio agregado a la pista A1 (Narraci\xF3n) del proyecto!");
      }
      if (onApplyAudio) {
        onApplyAudio(trackData);
      }
    } catch (error) {
      setErrorMessage("Error al agregar audio: " + error.message);
    }
  };
  const handleUploadAudioFile = async (file) => {
    if (file) {
      try {
        setGenerationProgress({
          active: true,
          message: "Subiendo " + file.name + " a la pista A2...",
          progress: 30
        });
        const headers = {
          "Content-Type": file.type || "audio/mpeg",
          "x-filename": encodeURIComponent(file.name)
        };
        const response = await fetch("http://127.0.0.1:4322/api/import", {
          method: "POST",
          headers,
          body: file
        }).catch(() => fetch("/api/import", {
          method: "POST",
          headers,
          body: file
        }));
        const data = await response.json();
        if (!response.ok || data == null || !data.url) {
          throw new Error((data == null ? void 0 : data.error) || "Error subiendo archivo");
        }
        const audioElement = new Audio(data.url);
        await new Promise((resolve) => {
          audioElement.onloadedmetadata = () => resolve();
          audioElement.onerror = () => resolve();
          setTimeout(resolve, 3e3);
        });
        const durationSeconds = audioElement.duration || 10;
        const durationMs = Math.round(durationSeconds * 1e3);
        const trackData = {
          id: crypto.randomUUID(),
          name: file.name,
          url: data.url,
          durationMs,
          volume: 0.1,
          muted: false,
          loop: true
        };
        updateProject({
          musicTrack: trackData
        });
        setSuccessMessage("\u2713 \xA1" + file.name + " asignado a la pista A2 con \xE9xito!");
        setGenerationProgress({
          active: false,
          message: "",
          progress: 0
        });
      } catch (error) {
        setErrorMessage("Error al subir archivo: " + error.message);
        setGenerationProgress({
          active: false,
          message: "",
          progress: 0
        });
      }
    }
  };
  const applySrtCaptions = async (srtUrl) => {
    var captionStyleTemp;
    if (srtUrl) {
      try {
        const srtText = await fetch(srtUrl).then((response) => response.text());
        const cues = [];
        srtText.split(/\n\s*\n/).forEach((block) => {
          const lines = block.trim().split("\n");
          if (lines.length >= 2) {
            const timeRange = lines[1].includes("-->") ? lines[1] : lines[0].includes("-->") ? lines[0] : "";
            const textContent = lines.slice(lines[1].includes("-->") ? 2 : 1).join(" ");
            if (timeRange) {
              const [startTimeStr, endTimeStr] = timeRange.split("-->").map((s) => s.trim());
              const parseTimestamp = (timestamp) => {
                const [timePart, msPart] = timestamp.split(/[,.]/);
                const [hours, minutes, seconds] = timePart.split(":").map(Number);
                return hours * 3600 + minutes * 60 + seconds + (Number(msPart) || 0) / 1e3;
              };
              const startSeconds = parseTimestamp(startTimeStr);
              const endSeconds = parseTimestamp(endTimeStr);
              const startMs = Math.round(startSeconds * 1e3);
              const endMs = Math.round(endSeconds * 1e3);
              const cueText = textContent.trim();
              const words = cueText.split(/\s+/).filter(Boolean);
              const msPerWord = (endMs - startMs) / Math.max(1, words.length);
              const wordTimings = words.map((word, wordIndex) => ({
                word,
                startMs: Math.round(startMs + wordIndex * msPerWord),
                endMs: Math.round(startMs + (wordIndex + 1) * msPerWord)
              }));
              cues.push({
                id: crypto.randomUUID(),
                text: cueText,
                startMs,
                endMs,
                startSeconds,
                endSeconds,
                words: wordTimings
              });
            }
          }
        });
        if (cues.length > 0) {
          updateProject({
            captionTrack: {
              enabled: true,
              sourceName: "AI33 / SRT",
              cues,
              style: {
                ...DEFAULT_CAPTION_STYLE,
                ...((captionStyleTemp = project.captionTrack) == null ? void 0 : captionStyleTemp.style) || {}
              }
            }
          });
          setSuccessMessage("\u2713 \xA1" + cues.length + " subt\xEDtulos sincronizados aplicados a la pista CC del timeline!");
        } else {
          setErrorMessage("No se pudieron extraer subt\xEDtulos v\xE1lidos del archivo SRT.");
        }
      } catch (error) {
        setErrorMessage("Error aplicando subt\xEDtulos: " + error.message);
      }
    }
  };
  const applyAudioAndCaptions = async (audioSourceOrResult, srtUrl = null, trackType = "narration", label = "Audio IA") => {
    await applyAudioToProject(audioSourceOrResult, trackType, label);
    if (srtUrl) {
      await applySrtCaptions(srtUrl);
    }
    setSuccessMessage("\u2713 \xA1Audio y subt\xEDtulos sincronizados insertados en el proyecto!");
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    width: "100%",
    height: "100%",
    background: "var(--popover)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    color: "var(--foreground)",
    fontFamily: "var(--font-sans)"
  }, children: [
    /* @__PURE__ */ jsx("audio", { ref: audioPreviewRef, style: {
      display: "none"
    } }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "16px 22px",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "var(--surface)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          width: 36,
          height: 36,
          borderRadius: "var(--radius-sm)",
          background: "var(--muted)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18
        }, children: "\u{1F399}\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--foreground)",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.015em"
          }, children: "Estudio de Audio & M\xFAsica IA (AI33.pro)" }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "var(--muted-foreground)",
            fontSize: 11.5
          }, children: "Text-To-Speech v3 \xB7 Di\xE1logos \xB7 M\xFAsica Suno \xB7 Efectos de Sonido SFX \xB7 Clonaci\xF3n" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }, children: [
        credits !== null && /* @__PURE__ */ jsxs("div", { style: {
          background: "var(--muted)",
          border: "1px solid var(--border)",
          padding: "4px 10px",
          borderRadius: "var(--radius-xs)",
          color: "var(--foreground)",
          fontSize: 11.5,
          fontWeight: 600,
          fontFamily: "var(--font-mono)"
        }, children: [
          credits.toLocaleString(),
          " cr\xE9ditos"
        ] }),
        mode === "view" ? /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }, children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setCurrentView("editor"), style: {
            background: "var(--primary)",
            border: "1px solid var(--border-strong)",
            color: "var(--primary-foreground)",
            padding: "6px 14px",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }, children: "Ir al Editor" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setCurrentView("dashboard"), style: {
            background: "var(--muted)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer"
          }, children: "Inicio" })
        ] }) : /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
          background: "transparent",
          border: "none",
          color: "var(--muted-foreground)",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px"
        }, children: "\u2715" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      gap: 4,
      padding: "8px 18px",
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)"
    }, children: [{
      id: "tts",
      label: "Locuci\xF3n (TTS)"
    }, {
      id: "dialogue",
      label: "Di\xE1logo Multi-Voz"
    }, {
      id: "suno",
      label: "M\xFAsica Suno AI"
    }, {
      id: "sfx",
      label: "Efectos SFX"
    }, {
      id: "clone",
      label: "Clonar Voz"
    }, {
      id: "settings",
      label: "Ajustes & API Key"
    }].map((tab) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab(tab.id), style: {
      padding: "6px 12px",
      borderRadius: "var(--radius-xs)",
      background: activeTab === tab.id ? "var(--accent)" : "transparent",
      border: activeTab === tab.id ? "1px solid var(--border-strong)" : "1px solid transparent",
      color: activeTab === tab.id ? "var(--foreground)" : "var(--muted-foreground)",
      fontWeight: activeTab === tab.id ? 600 : 500,
      fontSize: 12,
      cursor: "pointer"
    }, children: tab.label }, tab.id)) }),
    errorMessage && /* @__PURE__ */ jsxs("div", { style: {
      background: "rgba(239, 68, 68, 0.12)",
      borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
      padding: "8px 20px",
      color: "#fca5a5",
      fontSize: 12,
      fontWeight: 700
    }, children: [
      "\u26A0\uFE0F ",
      errorMessage
    ] }),
    successMessage && /* @__PURE__ */ jsx("div", { style: {
      background: "rgba(34, 197, 94, 0.12)",
      borderBottom: "1px solid rgba(34, 197, 94, 0.3)",
      padding: "8px 20px",
      color: "#86efac",
      fontSize: 12,
      fontWeight: 700
    }, children: successMessage }),
    generationProgress.active && /* @__PURE__ */ jsxs("div", { style: {
      background: "var(--surface)",
      padding: "10px 20px",
      borderBottom: "1px solid var(--border)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        color: "var(--foreground)",
        fontSize: 11.5,
        fontWeight: 600,
        marginBottom: 6
      }, children: [
        /* @__PURE__ */ jsx("span", { children: generationProgress.message }),
        /* @__PURE__ */ jsxs("span", { style: {
          fontFamily: "var(--font-mono)"
        }, children: [
          generationProgress.progress,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        height: 4,
        background: "var(--muted)",
        borderRadius: 2,
        overflow: "hidden"
      }, children: /* @__PURE__ */ jsx("div", { style: {
        width: generationProgress.progress + "%",
        height: "100%",
        background: "var(--foreground)",
        transition: "width 200ms ease"
      } }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      flex: 1,
      overflowY: "auto",
      padding: "18px 22px"
    }, children: [
      activeTab === "tts" && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: 14
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            flexWrap: "wrap",
            gap: 8
          }, children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { style: {
              color: "var(--foreground)",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6
            }, children: [
              /* @__PURE__ */ jsx("span", { children: "Voces de ElevenLabs & Biblioteca" }),
              /* @__PURE__ */ jsxs("span", { style: {
                fontSize: 10,
                background: "var(--muted)",
                color: "var(--muted-foreground)",
                border: "1px solid var(--border)",
                padding: "1px 6px",
                borderRadius: "var(--radius-xs)",
                fontWeight: 700,
                fontFamily: "var(--font-mono)"
              }, children: [
                filteredVoices.length,
                " disponibles"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap"
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Buscar voz o estilo (ej. Adam, Rachel)...", value: voiceSearchQuery, onChange: (event) => setVoiceSearchQuery(event.target.value), style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xs)",
                padding: "4px 10px",
                fontSize: 11,
                width: 220,
                outline: "none"
              } }),
              /* @__PURE__ */ jsxs("select", { value: languageFilter, onChange: (event) => setLanguageFilter(event.target.value), style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xs)",
                padding: "4px 8px",
                fontSize: 11
              }, children: [
                /* @__PURE__ */ jsx("option", { value: "es", children: "Espa\xF1ol & Multi" }),
                /* @__PURE__ */ jsx("option", { value: "en", children: "Ingl\xE9s" }),
                /* @__PURE__ */ jsx("option", { value: "all", children: "Todos los idiomas" })
              ] }),
              /* @__PURE__ */ jsxs("select", { value: providerFilter, onChange: (event) => setProviderFilter(event.target.value), style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xs)",
                padding: "4px 8px",
                fontSize: 11
              }, children: [
                /* @__PURE__ */ jsx("option", { value: "elevenlabs", children: "ElevenLabs" }),
                /* @__PURE__ */ jsx("option", { value: "all", children: "Todos los proveedores" }),
                /* @__PURE__ */ jsx("option", { value: "minimax", children: "Minimax" }),
                /* @__PURE__ */ jsx("option", { value: "edge", children: "Edge TTS" }),
                /* @__PURE__ */ jsx("option", { value: "kokoro", children: "Kokoro" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 8,
            maxHeight: 200,
            overflowY: "auto",
            paddingRight: 4
          }, children: filteredVoices.map((voice) => {
            const isSelected = selectedVoiceId === voice.voice_id;
            const isElevenLabs = voice.provider === "elevenlabs";
            const isMinimax = voice.provider === "minimax";
            return /* @__PURE__ */ jsxs("div", { onClick: () => setSelectedVoiceId(voice.voice_id), style: {
              padding: "8px 10px",
              borderRadius: 8,
              background: isSelected ? "rgba(99, 102, 241, 0.25)" : "#161b28",
              border: isSelected ? "1px solid #818cf8" : "1px solid #232b3d",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 100ms ease"
            }, children: [
              /* @__PURE__ */ jsxs("div", { style: {
                minWidth: 0,
                flex: 1,
                paddingRight: 6
              }, children: [
                /* @__PURE__ */ jsxs("div", { style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 2
                }, children: [
                  /* @__PURE__ */ jsx("span", { style: {
                    fontSize: 9,
                    fontWeight: 900,
                    background: isElevenLabs ? "rgba(236,72,153,0.18)" : isMinimax ? "rgba(234,179,8,0.18)" : "rgba(148,163,184,0.15)",
                    color: isElevenLabs ? "#f472b6" : isMinimax ? "#facc15" : "#94a3b8",
                    border: isElevenLabs ? "1px solid rgba(236,72,153,0.4)" : isMinimax ? "1px solid rgba(234,179,8,0.4)" : "1px solid rgba(148,163,184,0.3)",
                    padding: "0 4px",
                    borderRadius: 3
                  }, children: isElevenLabs ? "ELEVENLABS" : voice.provider.toUpperCase() }),
                  voice.gender && /* @__PURE__ */ jsx("span", { style: {
                    fontSize: 9,
                    color: "#94a3b8"
                  }, children: voice.gender === "Male" ? "\u{1F468}" : voice.gender === "Female" ? "\u{1F469}" : "\u{1F399}\uFE0F" })
                ] }),
                /* @__PURE__ */ jsx("div", { style: {
                  color: isSelected ? "#fff" : "#e2e8f0",
                  fontSize: 11.5,
                  fontWeight: 800,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap"
                }, children: voice.name }),
                voice.tags && voice.tags.length > 0 && /* @__PURE__ */ jsx("div", { style: {
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  marginTop: 3
                }, children: voice.tags.slice(0, 3).map((tag, index) => /* @__PURE__ */ jsx("span", { style: {
                  fontSize: 8.5,
                  background: "#1c2234",
                  color: "#94a3b8",
                  padding: "1px 4px",
                  borderRadius: 3
                }, children: tag }, index)) })
              ] }),
              voice.preview_url && /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.stopPropagation();
                handleTogglePreview(voice.preview_url);
              }, style: {
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: 14
              }, title: "Escuchar muestra", children: playingPreviewUrl === voice.preview_url ? "\u23F8" : "\u25B6" })
            ] }, voice.voice_id);
          }) }),
          /* @__PURE__ */ jsxs("div", { style: {
            marginTop: 12,
            padding: "10px 12px",
            borderRadius: 8,
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
            border: "1px solid rgba(236, 72, 153, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 6
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6
            }, children: [
              /* @__PURE__ */ jsxs("span", { style: {
                fontSize: 11.5,
                fontWeight: 900,
                color: "#f472b6",
                display: "flex",
                alignItems: "center",
                gap: 6
              }, children: [
                /* @__PURE__ */ jsx("span", { children: "\u{1F451} Usar Voice ID Personalizado de ElevenLabs" }),
                /* @__PURE__ */ jsx("small", { style: {
                  fontSize: 10,
                  color: "#94a3b8",
                  fontWeight: 600
                }, children: "(Voz propia o de Voice Lab / Community)" })
              ] }),
              selectedVoiceId && (!H.some((voice) => voice.voice_id === selectedVoiceId) || customVoices.some((voice) => voice.voice_id === selectedVoiceId)) && /* @__PURE__ */ jsxs("span", { style: {
                fontSize: 10.5,
                color: "#34d399",
                fontWeight: 800,
                background: "rgba(52, 211, 153, 0.12)",
                padding: "1px 6px",
                borderRadius: 4,
                border: "1px solid rgba(52, 211, 153, 0.3)"
              }, children: [
                "\u2713 Activa: ",
                selectedVoiceId.replace(/^elevenlabs_/, "")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap"
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Pega el Voice ID (ej. 21m00Tcm4TlvDq8ikWAM)", value: customVoiceIdInput, onChange: (event) => setCustomVoiceIdInput(event.target.value), onKeyDown: (event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddCustomVoice();
                }
              }, style: {
                flex: 2,
                minWidth: 200,
                background: "#161b28",
                color: "#fff",
                border: "1px solid rgba(236, 72, 153, 0.4)",
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 11.5,
                outline: "none"
              } }),
              /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Nombre opcional", value: customVoiceNameInput, onChange: (event) => setCustomVoiceNameInput(event.target.value), onKeyDown: (event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddCustomVoice();
                }
              }, style: {
                flex: 1,
                minWidth: 130,
                background: "#161b28",
                color: "#fff",
                border: "1px solid #283144",
                borderRadius: 6,
                padding: "6px 10px",
                fontSize: 11.5,
                outline: "none"
              } }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleAddCustomVoice(), disabled: !customVoiceIdInput.trim(), style: {
                background: "linear-gradient(135deg, #ec4899 0%, #818cf8 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 11.5,
                fontWeight: 900,
                cursor: customVoiceIdInput.trim() ? "pointer" : "not-allowed",
                opacity: customVoiceIdInput.trim() ? 1 : 0.5
              }, children: "\u2713 Aplicar ID" })
            ] }),
            customVoices.length > 0 && /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: 2
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                fontSize: 9.5,
                color: "#94a3b8",
                fontWeight: 700
              }, children: "Guardadas:" }),
              customVoices.map((customVoice) => /* @__PURE__ */ jsxs("div", { style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: selectedVoiceId === customVoice.voice_id ? "rgba(236, 72, 153, 0.25)" : "rgba(255, 255, 255, 0.05)",
                border: selectedVoiceId === customVoice.voice_id ? "1px solid #ec4899" : "1px solid rgba(255, 255, 255, 0.1)",
                padding: "2px 6px",
                borderRadius: 4,
                fontSize: 10,
                color: "#fff",
                cursor: "pointer"
              }, onClick: () => setSelectedVoiceId(customVoice.voice_id), children: [
                /* @__PURE__ */ jsx("span", { style: {
                  fontWeight: 800
                }, children: customVoice.name }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                  event.stopPropagation();
                  handleRemoveCustomVoice(customVoice.voice_id);
                }, style: {
                  background: "transparent",
                  border: "none",
                  color: "#f87171",
                  cursor: "pointer",
                  fontSize: 11,
                  lineHeight: 1,
                  padding: 0
                }, title: "Eliminar", children: "\xD7" })
              ] }, customVoice.voice_id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 6
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }, children: [
            /* @__PURE__ */ jsx("label", { style: {
              color: "#fff",
              fontSize: 12.5,
              fontWeight: 800
            }, children: "Gui\xF3n / Texto para Narrar" }),
            /* @__PURE__ */ jsxs("span", { style: {
              color: "#64748b",
              fontSize: 11
            }, children: [
              ttsText.length.toLocaleString(),
              " caracteres"
            ] })
          ] }),
          /* @__PURE__ */ jsx("textarea", { value: ttsText, onChange: (event) => setTtsText(event.target.value), placeholder: "Pega aqu\xED el texto o gui\xF3n que deseas sintetizar con IA...", rows: 6, style: {
            width: "100%",
            background: "#0e111a",
            color: "#fff",
            border: "1px solid #232b3d",
            borderRadius: 10,
            padding: 12,
            fontSize: 13,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#111420",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #202738"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 14
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: "#94a3b8",
                fontSize: 11.5,
                fontWeight: 700
              }, children: "Velocidad:" }),
              /* @__PURE__ */ jsx("input", { type: "range", min: "0.5", max: "1.5", step: "0.05", value: ttsSpeed, onChange: (event) => setTtsSpeed(Number(event.target.value)), style: {
                width: 90
              } }),
              /* @__PURE__ */ jsxs("span", { style: {
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 800
              }, children: [
                ttsSpeed,
                "x"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#cbd5e1",
              fontSize: 11.5,
              cursor: "pointer"
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: ttsWithTranscript, onChange: (event) => setTtsWithTranscript(event.target.checked) }),
              "Generar subt\xEDtulos sincronizados (SRT)"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleGenerateTts, disabled: generationProgress.active || !ttsText.trim(), style: {
            height: 38,
            padding: "0 20px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            border: "none",
            color: "#fff",
            fontWeight: 800,
            fontSize: 13,
            cursor: generationProgress.active || !ttsText.trim() ? "not-allowed" : "pointer",
            opacity: generationProgress.active || !ttsText.trim() ? 0.5 : 1,
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)"
          }, children: generationProgress.active ? "Generando..." : "\u26A1 Generar Audio con IA" })
        ] }),
        ttsResult && /* @__PURE__ */ jsxs("div", { style: {
          background: "#111728",
          border: "1px solid #263554",
          borderRadius: 12,
          padding: 14
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }, children: [
            /* @__PURE__ */ jsx("strong", { style: {
              color: "#38bdf8",
              fontSize: 13
            }, children: "\u{1F389} Audio generado listo" }),
            /* @__PURE__ */ jsxs("span", { style: {
              color: "#94a3b8",
              fontSize: 11
            }, children: [
              "Costo: ",
              ttsResult.credit_cost || 1,
              " cr\xE9ditos"
            ] })
          ] }),
          ((metaTemp1 = ttsResult.metadata) == null ? void 0 : metaTemp1.audio_url) && /* @__PURE__ */ jsx("audio", { controls: true, src: ttsResult.metadata.audio_url, style: {
            width: "100%",
            marginBottom: 10
          } }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: 8
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: (metaTemp2 = ttsResult.metadata) != null && metaTemp2.srt_url ? "1fr 1fr" : "1fr",
              gap: 8
            }, children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applyAudioToProject(ttsResult.metadata.audio_url, "narration", "Narraci\xF3n IA"), style: {
                height: 38,
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
              }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F3B5} Agregar Audio a Pista A1" }) }),
              ((metaTemp3 = ttsResult.metadata) == null ? void 0 : metaTemp3.srt_url) && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applySrtCaptions(ttsResult.metadata.srt_url), style: {
                height: 38,
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)"
              }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F4AC} Aplicar Subt\xEDtulos al Timeline (CC)" }) })
            ] }),
            ((metaTemp4 = ttsResult.metadata) == null ? void 0 : metaTemp4.srt_url) && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applyAudioAndCaptions(ttsResult.metadata.audio_url, ttsResult.metadata.srt_url, "narration", "Narraci\xF3n IA"), style: {
              height: 36,
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: 800,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
            }, children: /* @__PURE__ */ jsx("span", { children: "\u26A1 Insertar Audio + Subt\xEDtulos Juntos" }) }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: 8,
              marginTop: 2
            }, children: [
              /* @__PURE__ */ jsx("a", { href: ttsResult.metadata.audio_url, download: "audio-ia.mp3", style: {
                flex: 1,
                height: 32,
                background: "#181d2c",
                border: "1px solid #2d374d",
                borderRadius: 6,
                color: "#94a3b8",
                fontWeight: 700,
                fontSize: 11.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none"
              }, children: "\u2B07\uFE0F Descargar MP3" }),
              ((metaTemp5 = ttsResult.metadata) == null ? void 0 : metaTemp5.srt_url) && /* @__PURE__ */ jsx("a", { href: ttsResult.metadata.srt_url, download: "subtitulos.srt", style: {
                flex: 1,
                height: 32,
                background: "#181d2c",
                border: "1px solid #2d374d",
                borderRadius: 6,
                color: "#94a3b8",
                fontWeight: 700,
                fontSize: 11.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none"
              }, children: "\u2B07\uFE0F Descargar SRT" })
            ] })
          ] })
        ] })
      ] }),
      activeTab === "dialogue" && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            background: "#111420",
            border: "1px solid #202738",
            borderRadius: 10,
            padding: 12
          }, children: [
            /* @__PURE__ */ jsx("label", { style: {
              color: "#38bdf8",
              fontSize: 12,
              fontWeight: 800
            }, children: "Voz A (Habla con prefijo A>)" }),
            /* @__PURE__ */ jsx("select", { value: dialogueVoiceA, onChange: (event) => setDialogueVoiceA(event.target.value), style: {
              width: "100%",
              marginTop: 6,
              background: "#181d2c",
              color: "#fff",
              border: "1px solid #2a344d",
              borderRadius: 8,
              padding: "7px 10px",
              fontSize: 12
            }, children: H.map((voice) => /* @__PURE__ */ jsx("option", { value: voice.voice_id, children: voice.name }, voice.voice_id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            background: "#111420",
            border: "1px solid #202738",
            borderRadius: 10,
            padding: 12
          }, children: [
            /* @__PURE__ */ jsx("label", { style: {
              color: "#ec4899",
              fontSize: 12,
              fontWeight: 800
            }, children: "Voz B (Habla con prefijo B>)" }),
            /* @__PURE__ */ jsx("select", { value: dialogueVoiceB, onChange: (event) => setDialogueVoiceB(event.target.value), style: {
              width: "100%",
              marginTop: 6,
              background: "#181d2c",
              color: "#fff",
              border: "1px solid #2a344d",
              borderRadius: 8,
              padding: "7px 10px",
              fontSize: 12
            }, children: H.map((voice) => /* @__PURE__ */ jsx("option", { value: voice.voice_id, children: voice.name }, voice.voice_id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 6
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 800
          }, children: "Gui\xF3n del Di\xE1logo (Usa A> y B>)" }),
          /* @__PURE__ */ jsx("textarea", { value: dialogueText, onChange: (event) => setDialogueText(event.target.value), rows: 8, style: {
            width: "100%",
            background: "#0e111a",
            color: "#fff",
            border: "1px solid #232b3d",
            borderRadius: 10,
            padding: 12,
            fontSize: 13,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#111420",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #202738"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 8
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: "#94a3b8",
              fontSize: 11.5
            }, children: "Pausa entre hablantes:" }),
            /* @__PURE__ */ jsx("input", { type: "range", min: "0.1", max: "1.5", step: "0.1", value: dialogueDelay, onChange: (event) => setDialogueDelay(Number(event.target.value)), style: {
              width: 80
            } }),
            /* @__PURE__ */ jsxs("span", { style: {
              color: "#fff",
              fontSize: 11.5,
              fontWeight: 700
            }, children: [
              dialogueDelay,
              "s"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleGenerateDialogue, disabled: generationProgress.active || !dialogueText.trim(), style: {
            height: 38,
            padding: "0 20px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
            border: "none",
            color: "#fff",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer"
          }, children: "\u26A1 Generar Di\xE1logo Multi-Voz" })
        ] }),
        dialogueResult && /* @__PURE__ */ jsxs("div", { style: {
          background: "#111728",
          border: "1px solid #263554",
          borderRadius: 12,
          padding: 14
        }, children: [
          /* @__PURE__ */ jsx("strong", { style: {
            color: "#a855f7",
            fontSize: 13,
            display: "block",
            marginBottom: 8
          }, children: "\u{1F389} Di\xE1logo completado" }),
          ((metaTemp6 = dialogueResult.metadata) == null ? void 0 : metaTemp6.audio_url) && /* @__PURE__ */ jsx("audio", { controls: true, src: dialogueResult.metadata.audio_url, style: {
            width: "100%",
            marginBottom: 10
          } }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: 8
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: (metaTemp7 = dialogueResult.metadata) != null && metaTemp7.srt_url ? "1fr 1fr" : "1fr",
              gap: 8
            }, children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applyAudioToProject(dialogueResult.metadata.audio_url, "narration", "Di\xE1logo IA"), style: {
                height: 38,
                background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(168, 85, 247, 0.3)"
              }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F3B5} Agregar Di\xE1logo a Pista A1" }) }),
              ((metaTemp8 = dialogueResult.metadata) == null ? void 0 : metaTemp8.srt_url) && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applySrtCaptions(dialogueResult.metadata.srt_url), style: {
                height: 38,
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)"
              }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F4AC} Aplicar Subt\xEDtulos al Timeline (CC)" }) })
            ] }),
            ((metaTemp9 = dialogueResult.metadata) == null ? void 0 : metaTemp9.srt_url) && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applyAudioAndCaptions(dialogueResult.metadata.audio_url, dialogueResult.metadata.srt_url, "narration", "Di\xE1logo IA"), style: {
              height: 36,
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: 800,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
            }, children: /* @__PURE__ */ jsx("span", { children: "\u26A1 Insertar Di\xE1logo + Subt\xEDtulos Juntos" }) }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: 8,
              marginTop: 2
            }, children: [
              /* @__PURE__ */ jsx("a", { href: dialogueResult.metadata.audio_url, download: "dialogo-ia.mp3", style: {
                flex: 1,
                height: 32,
                background: "#181d2c",
                border: "1px solid #2d374d",
                borderRadius: 6,
                color: "#94a3b8",
                fontWeight: 700,
                fontSize: 11.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none"
              }, children: "\u2B07\uFE0F Descargar MP3" }),
              ((metaTemp10 = dialogueResult.metadata) == null ? void 0 : metaTemp10.srt_url) && /* @__PURE__ */ jsx("a", { href: dialogueResult.metadata.srt_url, download: "subtitulos-dialogo.srt", style: {
                flex: 1,
                height: 32,
                background: "#181d2c",
                border: "1px solid #2d374d",
                borderRadius: 6,
                color: "#94a3b8",
                fontWeight: 700,
                fontSize: 11.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none"
              }, children: "\u2B07\uFE0F Descargar SRT" })
            ] })
          ] })
        ] })
      ] }),
      activeTab === "suno" && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          gap: 8
        }, children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMusicCreateMode("simple"), style: {
            flex: 1,
            padding: "8px 0",
            borderRadius: 8,
            background: musicCreateMode === "simple" ? "rgba(215, 255, 79, 0.15)" : "#161b28",
            border: musicCreateMode === "simple" ? "1px solid #d7ff4f" : "1px solid #232b3d",
            color: musicCreateMode === "simple" ? "#d7ff4f" : "#94a3b8",
            fontWeight: 800,
            fontSize: 12,
            cursor: "pointer"
          }, children: "\u26A1 Modo Simple (Prompt Descriptivo)" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMusicCreateMode("custom"), style: {
            flex: 1,
            padding: "8px 0",
            borderRadius: 8,
            background: musicCreateMode === "custom" ? "rgba(215, 255, 79, 0.15)" : "#161b28",
            border: musicCreateMode === "custom" ? "1px solid #d7ff4f" : "1px solid #232b3d",
            color: musicCreateMode === "custom" ? "#d7ff4f" : "#94a3b8",
            fontWeight: 800,
            fontSize: 12,
            cursor: "pointer"
          }, children: "\u270D\uFE0F Modo Personalizado (Letra & Estilos)" })
        ] }),
        musicCreateMode === "simple" ? /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 800
          }, children: "Descripci\xF3n de la M\xFAsica (Prompt)" }),
          /* @__PURE__ */ jsx("textarea", { value: musicDescription, onChange: (event) => setMusicDescription(event.target.value), placeholder: "Ejemplo: Epic cinematic orchestral soundtrack with energetic drums, dramatic strings and emotional piano build up...", rows: 4, style: {
            width: "100%",
            background: "#0e111a",
            color: "#fff",
            border: "1px solid #232b3d",
            borderRadius: 10,
            padding: 12,
            fontSize: 13,
            boxSizing: "border-box"
          } }),
          /* @__PURE__ */ jsxs("label", { style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#cbd5e1",
            fontSize: 12,
            cursor: "pointer"
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: musicInstrumental, onChange: (event) => setMusicInstrumental(event.target.checked) }),
            "M\xFAsica puramente Instrumental (Sin voces)"
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { style: {
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 700
              }, children: "T\xEDtulo de la Canci\xF3n" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: musicTitle, onChange: (event) => setMusicTitle(event.target.value), placeholder: "Ej: Luces de la Ciudad", style: {
                width: "100%",
                marginTop: 4,
                background: "#0e111a",
                color: "#fff",
                border: "1px solid #232b3d",
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: 12,
                boxSizing: "border-box"
              } })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { style: {
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 700
              }, children: "G\xE9nero / Tags de Estilo" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: musicTags, onChange: (event) => setMusicTags(event.target.value), placeholder: "Ej: indie pop, emotional, cinematic drums", style: {
                width: "100%",
                marginTop: 4,
                background: "#0e111a",
                color: "#fff",
                border: "1px solid #232b3d",
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: 12,
                boxSizing: "border-box"
              } })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { style: {
              color: "#fff",
              fontSize: 11.5,
              fontWeight: 700
            }, children: "Letra de la Canci\xF3n (Lyrics)" }),
            /* @__PURE__ */ jsx("textarea", { value: musicLyrics, onChange: (event) => setMusicLyrics(event.target.value), placeholder: "[Verse 1]\\nCaminando en la noche solitaria...\\n[Chorus]\\nLa m\xFAsica empieza a sonar...", rows: 5, style: {
              width: "100%",
              marginTop: 4,
              background: "#0e111a",
              color: "#fff",
              border: "1px solid #232b3d",
              borderRadius: 8,
              padding: 10,
              fontSize: 12,
              boxSizing: "border-box"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: handleGenerateMusic, disabled: generationProgress.active, style: {
          height: 40,
          background: "linear-gradient(135deg, #d7ff4f 0%, #10b981 100%)",
          border: "none",
          borderRadius: 8,
          color: "#000",
          fontWeight: 900,
          fontSize: 13,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(215, 255, 79, 0.25)"
        }, children: "\u{1F3B5} Componer M\xFAsica con Suno AI" }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          margin: "2px 0"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            height: 1,
            flex: 1,
            background: "#1e293b"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 11,
            color: "#64748b",
            fontWeight: 700
          }, children: "O SUBE TU PROPIA M\xDASICA" }),
          /* @__PURE__ */ jsx("span", { style: {
            height: 1,
            flex: 1,
            background: "#1e293b"
          } })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: {
          height: 38,
          background: "#0e131f",
          border: "1px dashed #334155",
          borderRadius: 8,
          color: "#94a3b8",
          fontWeight: 700,
          fontSize: 12.5,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.2s ease"
        }, title: "Selecciona un archivo MP3/WAV de tu PC para asignarlo a la pista A2", children: [
          /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
            var filesTemp;
            return handleUploadAudioFile((filesTemp = event.target.files) == null ? void 0 : filesTemp[0]);
          }, style: {
            display: "none"
          } }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F4C1} Subir M\xFAsica desde PC a Pista A2" })
        ] }),
        musicResult && /* @__PURE__ */ jsxs("div", { style: {
          background: "#111728",
          border: "1px solid #263554",
          borderRadius: 12,
          padding: 14
        }, children: [
          /* @__PURE__ */ jsxs("strong", { style: {
            color: "#d7ff4f",
            fontSize: 13,
            display: "block",
            marginBottom: 8
          }, children: [
            "\u{1F389} Canci\xF3n generada: ",
            ((metaTemp11 = musicResult.metadata) == null ? void 0 : metaTemp11.title) || "Suno Track"
          ] }),
          extractAudioUrl(musicResult) && /* @__PURE__ */ jsx("audio", { controls: true, src: extractAudioUrl(musicResult), style: {
            width: "100%",
            marginBottom: 12
          } }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            background: "#0a0e1a",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #1c2438",
            marginBottom: 12
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4
              }, children: [
                /* @__PURE__ */ jsx("label", { style: {
                  color: "#94a3b8",
                  fontSize: 11.5,
                  fontWeight: 700
                }, children: "Volumen de Fondo:" }),
                /* @__PURE__ */ jsxs("span", { style: {
                  color: "#d7ff4f",
                  fontSize: 11.5,
                  fontWeight: 800
                }, children: [
                  Math.round(musicInsertVolume * 100),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("input", { type: "range", min: "0.05", max: "1.0", step: "0.05", value: musicInsertVolume, onChange: (event) => setMusicInsertVolume(Number(event.target.value)), style: {
                width: "100%",
                accentColor: "#d7ff4f"
              } })
            ] }),
            /* @__PURE__ */ jsx("div", { style: {
              display: "flex",
              alignItems: "center"
            }, children: /* @__PURE__ */ jsxs("label", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#cbd5e1",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 600
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: musicInsertLoop, onChange: (event) => setMusicInsertLoop(event.target.checked), style: {
                accentColor: "#d7ff4f",
                width: 16,
                height: 16
              } }),
              /* @__PURE__ */ jsx("span", { children: "\u{1F501} Repetir en bucle (todo el video)" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
              var musicResultMetaTemp;
              return applyAudioToProject(extractAudioUrl(musicResult), "music", ((musicResultMetaTemp = musicResult.metadata) == null ? void 0 : musicResultMetaTemp.title) || "M\xFAsica Suno", musicInsertVolume, musicInsertLoop);
            }, style: {
              flex: 1,
              height: 38,
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: 800,
              fontSize: 12.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
            }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F3B5} Insertar a Pista A2 (M\xFAsica de Fondo)" }) }),
            extractAudioUrl(musicResult) && /* @__PURE__ */ jsx("a", { href: extractAudioUrl(musicResult), download: (((metaTemp12 = musicResult.metadata) == null ? void 0 : metaTemp12.title) || "suno-track") + ".mp3", style: {
              height: 38,
              padding: "0 14px",
              background: "#181d2c",
              border: "1px solid #2d374d",
              borderRadius: 8,
              color: "#94a3b8",
              fontWeight: 700,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }, children: "\u2B07\uFE0F Descargar MP3" })
          ] })
        ] })
      ] }),
      activeTab === "sfx" && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: 6
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 800
          }, children: "Descripci\xF3n del Efecto de Sonido (SFX)" }),
          /* @__PURE__ */ jsx("textarea", { value: sfxText, onChange: (event) => setSfxText(event.target.value), placeholder: "Ejemplo: Trueno potente con lluvia torrencial y viento fuerte en un bosque oscuro...", rows: 4, style: {
            width: "100%",
            background: "#0e111a",
            color: "#fff",
            border: "1px solid #232b3d",
            borderRadius: 10,
            padding: 12,
            fontSize: 13,
            boxSizing: "border-box"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#111420",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #202738"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 12
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: "#94a3b8",
                fontSize: 11.5
              }, children: "Duraci\xF3n muestra:" }),
              /* @__PURE__ */ jsx("input", { type: "range", min: "1", max: "20", step: "0.5", value: sfxDuration, onChange: (event) => setSfxDuration(Number(event.target.value)), style: {
                width: 80
              } }),
              /* @__PURE__ */ jsxs("span", { style: {
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 700
              }, children: [
                sfxDuration,
                "s"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#cbd5e1",
              fontSize: 11.5,
              cursor: "pointer"
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: sfxLoop, onChange: (event) => setSfxLoop(event.target.checked) }),
              "Loop nativo"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleGenerateSfx, disabled: generationProgress.active || !sfxText.trim(), style: {
            height: 38,
            padding: "0 20px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
            border: "none",
            color: "#fff",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer"
          }, children: "\u26A1 Generar Efecto SFX" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          margin: "2px 0"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            height: 1,
            flex: 1,
            background: "#1e293b"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: 11,
            color: "#64748b",
            fontWeight: 700
          }, children: "O SUBE TU PROPIO EFECTO SFX" }),
          /* @__PURE__ */ jsx("span", { style: {
            height: 1,
            flex: 1,
            background: "#1e293b"
          } })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: {
          height: 38,
          background: "#0e131f",
          border: "1px dashed #334155",
          borderRadius: 8,
          color: "#38bdf8",
          fontWeight: 700,
          fontSize: 12.5,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.2s ease"
        }, title: "Selecciona un archivo MP3/WAV de tu PC para asignarlo como efecto de sonido o m\xFAsica a la pista A2", children: [
          /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/*", onChange: (event) => {
            var filesTemp;
            return handleUploadAudioFile((filesTemp = event.target.files) == null ? void 0 : filesTemp[0]);
          }, style: {
            display: "none"
          } }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F4C1} Subir Efecto SFX desde PC a Pista A2" })
        ] }),
        sfxResult && /* @__PURE__ */ jsxs("div", { style: {
          background: "#111728",
          border: "1px solid #263554",
          borderRadius: 12,
          padding: 14
        }, children: [
          /* @__PURE__ */ jsx("strong", { style: {
            color: "#38bdf8",
            fontSize: 13,
            display: "block",
            marginBottom: 8
          }, children: "\u{1F389} Efecto SFX Listo" }),
          extractAudioUrl(sfxResult) && /* @__PURE__ */ jsx("audio", { controls: true, src: extractAudioUrl(sfxResult), style: {
            width: "100%",
            marginBottom: 12
          } }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            background: "#0a0e1a",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #1c2438",
            marginBottom: 12
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4
              }, children: [
                /* @__PURE__ */ jsx("label", { style: {
                  color: "#94a3b8",
                  fontSize: 11.5,
                  fontWeight: 700
                }, children: "Volumen de Fondo (A2):" }),
                /* @__PURE__ */ jsxs("span", { style: {
                  color: "#38bdf8",
                  fontSize: 11.5,
                  fontWeight: 800
                }, children: [
                  Math.round(sfxInsertVolume * 100),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("input", { type: "range", min: "0.05", max: "1.0", step: "0.05", value: sfxInsertVolume, onChange: (event) => setSfxInsertVolume(Number(event.target.value)), style: {
                width: "100%",
                accentColor: "#38bdf8"
              } })
            ] }),
            /* @__PURE__ */ jsx("div", { style: {
              display: "flex",
              alignItems: "center"
            }, children: /* @__PURE__ */ jsxs("label", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#cbd5e1",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 600
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: sfxInsertLoop, onChange: (event) => setSfxInsertLoop(event.target.checked), style: {
                accentColor: "#38bdf8",
                width: 16,
                height: 16
              } }),
              /* @__PURE__ */ jsx("span", { children: "\u{1F501} Repetir en bucle (todo el video)" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => applyAudioToProject(extractAudioUrl(sfxResult), "music", "SFX: " + sfxText.slice(0, 24) + "...", sfxInsertVolume, sfxInsertLoop), style: {
              flex: 1,
              height: 38,
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: 800,
              fontSize: 12.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)"
            }, children: /* @__PURE__ */ jsx("span", { children: "\u{1F50A} Agregar SFX a Pista A2 (Fondo)" }) }),
            extractAudioUrl(sfxResult) && /* @__PURE__ */ jsx("a", { href: extractAudioUrl(sfxResult), download: "efecto-sfx.mp3", style: {
              height: 38,
              padding: "0 14px",
              background: "#181d2c",
              border: "1px solid #2d374d",
              borderRadius: 8,
              color: "#94a3b8",
              fontWeight: 700,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }, children: "\u2B07\uFE0F Descargar MP3" })
          ] })
        ] })
      ] }),
      activeTab === "clone" && /* @__PURE__ */ jsxs("form", { onSubmit: handleCloneVoiceSubmit, style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          background: "rgba(99, 102, 241, 0.08)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          borderRadius: 12,
          padding: 14
        }, children: [
          /* @__PURE__ */ jsx("strong", { style: {
            color: "#a5b4fc",
            fontSize: 13
          }, children: "\u{1F9EC} Clonaci\xF3n Instant\xE1nea de Voz (Voice Clone v3)" }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#94a3b8",
            fontSize: 11.5,
            margin: "6px 0 0 0"
          }, children: "Sube una muestra de audio limpia (1 a 5 minutos, formato MP3 o WAV, m\xE1x. 10MB). La voz clonada se a\xF1adir\xE1 de inmediato a tu biblioteca para usar en TTS y Di\xE1logos." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#fff",
            fontSize: 12,
            fontWeight: 700
          }, children: "Nombre de la Voz Clonada" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: cloneVoiceName, onChange: (event) => setCloneVoiceName(event.target.value), placeholder: "Ej: Mi Voz Narrador, Voz YouTuber...", style: {
            width: "100%",
            marginTop: 6,
            background: "#0e111a",
            color: "#fff",
            border: "1px solid #232b3d",
            borderRadius: 8,
            padding: "9px 12px",
            fontSize: 12.5,
            boxSizing: "border-box"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#fff",
            fontSize: 12,
            fontWeight: 700
          }, children: "Archivo de Audio de Muestra (MP3 / WAV)" }),
          /* @__PURE__ */ jsx("input", { type: "file", accept: "audio/mp3,audio/wav,audio/m4a", onChange: (event) => {
            var filesTemp;
            return setCloneAudioFile(((filesTemp = event.target.files) == null ? void 0 : filesTemp[0]) || null);
          }, style: {
            width: "100%",
            marginTop: 6,
            background: "#0e111a",
            color: "#94a3b8",
            border: "1px solid #232b3d",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            boxSizing: "border-box"
          } })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: generationProgress.active || !cloneVoiceName.trim() || !cloneAudioFile, style: {
          height: 40,
          background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontWeight: 800,
          fontSize: 13,
          cursor: "pointer"
        }, children: "\u{1F9EC} Clonar Voz con AI33.pro" })
      ] }),
      activeTab === "settings" && /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          background: "#111420",
          border: "1px solid #202738",
          borderRadius: 12,
          padding: 16
        }, children: [
          /* @__PURE__ */ jsx("label", { style: {
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
            display: "block",
            marginBottom: 6
          }, children: "API Key de AI33.pro (xi-api-key)" }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#8592a6",
            fontSize: 11.5,
            margin: "0 0 12px 0"
          }, children: "Tu clave se almacena de forma segura y permanente en esta aplicaci\xF3n. Te permite generar voces de ElevenLabs, Minimax, Edge, Kokoro y m\xFAsica con Suno AI." }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsx("input", { type: "password", value: apiKey, onChange: (event) => setApiKey(event.target.value), placeholder: "Pega tu API Key de AI33.pro aqu\xED...", style: {
              flex: 1,
              background: "#0c0e16",
              color: "#fff",
              border: "1px solid #2a344d",
              borderRadius: 8,
              padding: "9px 12px",
              fontSize: 13,
              outline: "none"
            } }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleSaveApiKey, style: {
              height: 40,
              padding: "0 22px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              border: "none",
              color: "#fff",
              fontWeight: 800,
              fontSize: 12.5,
              cursor: "pointer"
            }, children: "Verificar y Guardar" })
          ] })
        ] }),
        healthStatus && /* @__PURE__ */ jsxs("div", { style: {
          background: "#111420",
          border: "1px solid #202738",
          borderRadius: 12,
          padding: 14
        }, children: [
          /* @__PURE__ */ jsx("strong", { style: {
            color: "#fff",
            fontSize: 12.5,
            display: "block",
            marginBottom: 8
          }, children: "Estado de los Proveedores AI33" }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              background: "#171c2b",
              padding: "8px 12px",
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between"
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: "#94a3b8",
                fontSize: 12
              }, children: "ElevenLabs" }),
              /* @__PURE__ */ jsxs("span", { style: {
                color: "#4ade80",
                fontSize: 12,
                fontWeight: 700
              }, children: [
                "\u25CF ",
                healthStatus.elevenlabs || "Activo"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              background: "#171c2b",
              padding: "8px 12px",
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between"
            }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: "#94a3b8",
                fontSize: 12
              }, children: "Minimax" }),
              /* @__PURE__ */ jsxs("span", { style: {
                color: "#4ade80",
                fontSize: 12,
                fontWeight: 700
              }, children: [
                "\u25CF ",
                healthStatus.minimax || "Activo"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "12px 22px",
      borderTop: "1px solid #202738",
      background: "#0e111a",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        color: "#64748b",
        fontSize: 11
      }, children: "FLOWSTUDIO Audio Engine \xB7 Impulsado por AI33.pro" }),
      mode === "view" ? /* @__PURE__ */ jsx("button", { onClick: () => setCurrentView("editor"), style: {
        height: 36,
        padding: "0 18px",
        borderRadius: 8,
        background: "var(--primary)",
        border: "1px solid var(--border-strong)",
        color: "var(--primary-foreground)",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer"
      }, children: "Volver al Editor" }) : /* @__PURE__ */ jsx("button", { onClick: onClose, style: {
        height: 36,
        padding: "0 18px",
        borderRadius: 8,
        background: "#181d2c",
        border: "1px solid #2a344d",
        color: "#cbd5e1",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer"
      }, children: "Cerrar" })
    ] })
  ] });
};
export {
  lt as A
};
