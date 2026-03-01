/**
 * Seed script for Strapi v5
 * Populates all content for the Faggin Foundation website.
 *
 * Usage:
 *   npx tsx scripts/seed-strapi.ts
 *
 * Requires:
 *   - Strapi running on http://localhost:1337
 *   - Admin user created (bootstrap creates admin@faggin.local / Admin1234!)
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
let AUTH_TOKEN = '';

// ─── Auth ───────────────────────────────────────────────────────

async function login() {
  const email = process.env.STRAPI_ADMIN_EMAIL || 'admin@faggin.local';
  const password = process.env.STRAPI_ADMIN_PASSWORD || 'Admin1234!';

  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin login failed (${res.status}): ${text}\nMake sure Strapi is running and admin user exists.`);
  }

  const json = await res.json();
  AUTH_TOKEN = json.data.token;
  log('Authenticated as admin');
}

// ─── HTTP helpers ───────────────────────────────────────────────

async function api(
  endpoint: string,
  method = 'GET',
  body?: any,
  locale?: string,
) {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  if (locale) url.searchParams.set('locale', locale);
  if (method === 'POST' || method === 'PUT') url.searchParams.set('status', 'published');

  const res = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: body ? JSON.stringify({ data: body }) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${endpoint} (${locale || 'default'}) → ${res.status}: ${text}`);
  }
  return res.json();
}

async function create(endpoint: string, data: any) {
  return api(endpoint, 'POST', data);
}

async function createLocalization(
  endpoint: string,
  documentId: string,
  locale: string,
  data: any,
) {
  // Strapi v5: create localization via PUT with locale param
  const url = new URL(`/api/${endpoint}/${documentId}`, STRAPI_URL);
  url.searchParams.set('locale', locale);
  url.searchParams.set('status', 'published');

  const res = await fetch(url.toString(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${endpoint}/${documentId} (${locale}) → ${res.status}: ${text}`);
  }
  return res.json();
}

async function createSingleType(endpoint: string, data: any) {
  // Single types use PUT to create/update
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  url.searchParams.set('status', 'published');
  const res = await fetch(url.toString(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${endpoint} → ${res.status}: ${text}`);
  }
  return res.json();
}

async function createSingleTypeLocalization(
  endpoint: string,
  locale: string,
  data: any,
) {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  url.searchParams.set('locale', locale);
  url.searchParams.set('status', 'published');

  const res = await fetch(url.toString(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${endpoint} (${locale}) → ${res.status}: ${text}`);
  }
  return res.json();
}

function log(msg: string) {
  console.log(`[seed] ${msg}`);
}

// ─── Data ───────────────────────────────────────────────────────

const BOOKS = {
  it: [
    { title: 'Silicio', tagline: 'Dall\'invenzione del microprocessore alla nuova scienza della consapevolezza', year: 2019, videoUrl: 'https://www.youtube.com/watch?v=Gf7-u6k498Y', buttonLabel: 'VIDEO PRESENTAZIONE', sortOrder: 1 },
    { title: 'Irriducibile', tagline: 'La coscienza, la vita, i computer e la nostra natura', year: 2022, videoUrl: 'https://www.youtube.com/watch?v=C5fgYfNQJp0', buttonLabel: 'VIDEO PRESENTAZIONE', sortOrder: 2 },
    { title: 'Oltre l\'Invisibile', tagline: 'Dove la scienza incontra la spiritualità', year: 2024, videoUrl: 'https://www.youtube.com/watch?v=IpB8tc50UU4', buttonLabel: 'VIDEO PRESENTAZIONE', sortOrder: 3 },
  ],
  en: [
    { title: 'Silicon', tagline: 'From the invention of the microprocessor to the new science of awareness', buttonLabel: 'WATCH PRESENTATION' },
    { title: 'Irreducible', tagline: 'Consciousness, life, computers, and human nature', buttonLabel: 'WATCH PRESENTATION' },
    { title: 'Beyond the Invisible', tagline: 'Where science meets spirituality', buttonLabel: 'WATCH PRESENTATION' },
  ],
  de: [
    { title: 'Silizium', tagline: 'Von der Erfindung des Mikroprozessors zur neuen Wissenschaft des Bewusstseins', buttonLabel: 'VIDEO ANSEHEN' },
    { title: 'Irreduzibel', tagline: 'Bewusstsein, Leben, Computer und unsere Natur', buttonLabel: 'VIDEO ANSEHEN' },
    { title: 'Jenseits des Unsichtbaren', tagline: 'Wo Wissenschaft auf Spiritualität trifft', buttonLabel: 'VIDEO ANSEHEN' },
  ],
  es: [
    { title: 'Silicio', tagline: 'De la invención del microprocesador a la nueva ciencia de la conciencia', buttonLabel: 'VER PRESENTACIÓN' },
    { title: 'Irreducible', tagline: 'La conciencia, la vida, los ordenadores y nuestra naturaleza', buttonLabel: 'VER PRESENTACIÓN' },
    { title: 'Más allá de lo Invisible', tagline: 'Donde la ciencia se encuentra con la espiritualidad', buttonLabel: 'VER PRESENTACIÓN' },
  ],
};

const VIDEO_THEMES = {
  it: [
    { name: 'La Coscienza è Irriducibile', description: 'Video sulla tesi centrale: la coscienza come proprietà fondamentale della realtà, non come prodotto della materia.', sortOrder: 1 },
    { name: 'Intelligenza Artificiale e Natura Umana', description: 'Perché l\'inventore del microprocessore sostiene che le macchine non potranno mai essere consapevoli. La distinzione tra sapere e conoscere.', sortOrder: 2 },
    { name: 'Fisica Quantistica e Informazione', description: 'Il Panpsichismo dell\'Informazione Quantistica (QIP) spiegato. I dialoghi con D\'Ariano, Penrose e Kastrup.', sortOrder: 3 },
    { name: 'La Mia Storia', description: 'Interviste biografiche e il documentario RAI "Federico Faggin, l\'uomo che vide il futuro" (2025).', sortOrder: 4 },
    { name: 'Presentazioni dei Libri', description: 'Le presentazioni dei tre libri di Federico Faggin.', sortOrder: 5 },
  ],
  en: [
    { name: 'Consciousness Is Irreducible', description: 'Videos on the central thesis: consciousness as a fundamental property of reality.' },
    { name: 'Artificial Intelligence and Human Nature', description: 'Why the inventor of the microprocessor argues machines can never be conscious.' },
    { name: 'Quantum Physics and Information', description: 'Quantum Information Panpsychism (QIP) explained. Dialogues with D\'Ariano, Penrose and Kastrup.' },
    { name: 'My Story', description: 'Biographical interviews and the RAI documentary.' },
    { name: 'Book Presentations', description: 'Presentations of Federico Faggin\'s three books.' },
  ],
  de: [
    { name: 'Bewusstsein ist irreduzibel', description: 'Videos zur zentralen These: Bewusstsein als grundlegende Eigenschaft der Realität.' },
    { name: 'Künstliche Intelligenz und menschliche Natur', description: 'Warum der Erfinder des Mikroprozessors argumentiert, dass Maschinen nie bewusst sein können.' },
    { name: 'Quantenphysik und Information', description: 'Quanten-Informations-Panpsychismus (QIP) erklärt.' },
    { name: 'Meine Geschichte', description: 'Biografische Interviews und der RAI-Dokumentarfilm.' },
    { name: 'Buchpräsentationen', description: 'Präsentationen der drei Bücher von Federico Faggin.' },
  ],
  es: [
    { name: 'La Conciencia es Irreducible', description: 'Videos sobre la tesis central: la conciencia como propiedad fundamental de la realidad.' },
    { name: 'Inteligencia Artificial y Naturaleza Humana', description: 'Por qué el inventor del microprocesador sostiene que las máquinas nunca podrán ser conscientes.' },
    { name: 'Física Cuántica e Información', description: 'El Panpsiquismo de la Información Cuántica (QIP) explicado.' },
    { name: 'Mi Historia', description: 'Entrevistas biográficas y el documental RAI.' },
    { name: 'Presentaciones de Libros', description: 'Presentaciones de los tres libros de Federico Faggin.' },
  ],
};

// Videos are NOT localized (same for all languages)
const VIDEOS = [
  { title: 'Noi Siamo Campi Quantistici Auto-Coscienti', youtubeId: 'IBt4oUCNl3U', description: 'Presa Scienza Filosofia', themeIndex: 0, sortOrder: 1 },
  { title: 'Quantum Fields Are Conscious', youtubeId: 'ssE4h70qKWk', description: 'Essentia Foundation', themeIndex: 0, sortOrder: 2 },
  { title: 'L\'AI non sarà mai cosciente - AI Talks #18', youtubeId: 'qr2tmUrKphs', description: '', themeIndex: 1, sortOrder: 1 },
  { title: 'Quantum Information Panpsychism Explained', youtubeId: '0FUFewGHLLg', description: 'Essentia Foundation', themeIndex: 2, sortOrder: 1 },
  { title: 'Quantum Consciousness Debate: Penrose, Faggin & Kastrup', youtubeId: '0nOtLj8UYCw', description: 'Essentia Foundation', themeIndex: 2, sortOrder: 2 },
  { title: 'USI incontra Federico Faggin — Oltre le percezioni', youtubeId: 'ch-iNvebvUw', description: 'USI Università della Svizzera italiana', themeIndex: 3, sortOrder: 1 },
  { title: 'The Nature of Consciousness', youtubeId: 'K5REKKkKZpY', description: 'Science and Nonduality (SAND)', themeIndex: 3, sortOrder: 2 },
  { title: 'Silicio — Presentazione del libro', youtubeId: 'Gf7-u6k498Y', description: '', themeIndex: 4, sortOrder: 1 },
  { title: 'Irriducibile — Presentazione del libro', youtubeId: 'C5fgYfNQJp0', description: 'Casa della Cultura Milano', themeIndex: 4, sortOrder: 2 },
  { title: 'Oltre l\'Invisibile — Presentazione del libro', youtubeId: 'IpB8tc50UU4', description: 'Libreria Palazzo Roberti', themeIndex: 4, sortOrder: 3 },
];

const EVENTS = {
  it: [
    { title: 'Presentazione documentario RAI "L\'uomo che vide il futuro"', description: '', date: '2025-03-15', location: 'Camera dei Deputati, Roma', type: 'past', sortOrder: 1 },
    { title: 'The Science of Consciousness Conference', description: '', date: '2024-06-01', location: 'Barcellona', type: 'past', sortOrder: 2 },
    { title: 'Presentazione "Oltre l\'Invisibile"', description: '', date: '2024-03-01', location: 'Da confermare', type: 'past', sortOrder: 3 },
    { title: 'Wired Next Fest', description: '', date: '2019-05-15', location: 'Milano', type: 'past', sortOrder: 4 },
  ],
  en: [
    { title: 'RAI Documentary Premiere "The Man Who Saw the Future"', location: 'Chamber of Deputies, Rome' },
    { title: 'The Science of Consciousness Conference', location: 'Barcelona' },
    { title: '"Beyond the Invisible" Book Launch', location: 'TBC' },
    { title: 'Wired Next Fest', location: 'Milan' },
  ],
  de: [
    { title: 'RAI-Dokumentarfilm Premiere "Der Mann, der die Zukunft sah"', location: 'Abgeordnetenkammer, Rom' },
    { title: 'The Science of Consciousness Conference', location: 'Barcelona' },
    { title: 'Buchvorstellung "Jenseits des Unsichtbaren"', location: 'Wird bestätigt' },
    { title: 'Wired Next Fest', location: 'Mailand' },
  ],
  es: [
    { title: 'Estreno documental RAI "El hombre que vio el futuro"', location: 'Cámara de Diputados, Roma' },
    { title: 'The Science of Consciousness Conference', location: 'Barcelona' },
    { title: 'Presentación "Más allá de lo Invisible"', location: 'Por confirmar' },
    { title: 'Wired Next Fest', location: 'Milán' },
  ],
};

const BIO_SECTIONS = {
  it: [
    {
      period: '1941-1967',
      title: 'La Formazione',
      content: 'Nato il 1 dicembre 1941 a Vicenza, durante il regime fascista. Figlio di Giuseppe, insegnante di filosofia e storia, fin da bambino Federico è attratto dalle macchine e dalla tecnologia.\n\nA 19 anni progetta il suo primo computer sperimentale all\'Olivetti — "Era alto 2 metri e largo come una porta." Si laurea in fisica con lode all\'Università di Padova nel 1965, completando in 4 anni un percorso che normalmente ne richiede 7.',
      sortOrder: 1,
    },
    {
      period: '1968-1974',
      title: 'La Rivoluzione del Silicio',
      content: 'Nel 1968 si trasferisce nella Silicon Valley. Alla Fairchild Semiconductor sviluppa la rivoluzionaria tecnologia MOS a porta di silicio (SGT), il processo produttivo che renderà possibile i microprocessori.\n\nAlla Intel progetta l\'Intel 4004 — il primo microprocessore commerciale al mondo (1971) — firmando le sue iniziali "FF" sulla maschera del chip. Seguono l\'Intel 8008 e l\'Intel 8080, che poseranno le fondamenta dell\'architettura x86 ancora oggi in uso.\n\nNel 1974 co-fonda Zilog e concepisce lo Z80, uno dei microprocessori più diffusi della storia, ancora in produzione dopo quasi 50 anni.',
      sortOrder: 2,
    },
    {
      period: '1986-2009',
      title: 'L\'Imprenditore',
      content: 'Nel 1986 co-fonda Synaptics con il professor Carver Mead del Caltech. Partendo dalla ricerca sulle reti neurali, l\'azienda sviluppa il primo touchpad per laptop (1992) e la tecnologia touchscreen (1999), diventando leader mondiale nelle interfacce uomo-macchina.\n\n"Avevo ottenuto tutto ciò che il mondo dice dovrebbe portare la felicità: una bella famiglia, salute, ricchezza e fama."',
      sortOrder: 3,
    },
    {
      period: '2009-oggi',
      title: 'La Coscienza',
      content: 'La notte di Natale del 1990, a Lake Tahoe, Federico vive un\'esperienza che cambierà per sempre la sua visione della realtà:\n\n"Una luce bianca scintillante, viva e beatifica, sgorgava dal mio cuore con una forza incredibile. La luce esplose e si espanse fino ad abbracciare l\'intero universo. Sapevo allora, senza ombra di dubbio, che questa era la sostanza di cui tutto ciò che esiste è fatto. Poi, con immensa sorpresa, riconobbi che io ero quella luce."\n\nQuesta esperienza avvia un percorso di oltre trent\'anni dedicato allo studio scientifico della coscienza. Nel 2011, con la moglie Elvia, fonda la Federico and Elvia Faggin Foundation, dedicata alla ricerca sulla natura e l\'origine della coscienza nelle università di tutto il mondo.',
      sortOrder: 4,
    },
  ],
  en: [
    { title: 'The Formation', content: 'Born on December 1, 1941 in Vicenza, during the fascist regime. Son of Giuseppe, a philosophy and history teacher, from childhood Federico was drawn to machines and technology.\n\nAt 19 he designed his first experimental computer at Olivetti — "It was 2 meters tall and as wide as a door." He graduated in physics with honors from the University of Padova in 1965, completing in 4 years a course that normally takes 7.' },
    { title: 'The Silicon Revolution', content: 'In 1968 he moved to Silicon Valley. At Fairchild Semiconductor he developed the revolutionary MOS silicon gate technology (SGT).\n\nAt Intel he designed the Intel 4004 — the world\'s first commercial microprocessor (1971) — signing his initials "FF" on the chip mask. The Intel 8008 and Intel 8080 followed, laying the foundations for the x86 architecture still in use today.\n\nIn 1974 he co-founded Zilog and conceived the Z80, one of the most widespread microprocessors in history.' },
    { title: 'The Entrepreneur', content: 'In 1986 he co-founded Synaptics with Professor Carver Mead of Caltech. Starting from neural network research, the company developed the first laptop touchpad (1992) and touchscreen technology (1999), becoming a world leader in human-machine interfaces.' },
    { title: 'Consciousness', content: 'On Christmas Eve 1990, at Lake Tahoe, Federico had an experience that would forever change his view of reality.\n\nThis experience launched a journey of over thirty years dedicated to the scientific study of consciousness. In 2011, with his wife Elvia, he founded the Federico and Elvia Faggin Foundation, dedicated to research on the nature and origin of consciousness at universities worldwide.' },
  ],
  de: [
    { title: 'Die Ausbildung', content: 'Geboren am 1. Dezember 1941 in Vicenza, während des faschistischen Regimes. Als Sohn von Giuseppe, einem Philosophie- und Geschichtslehrer, fühlte sich Federico von klein auf zu Maschinen und Technologie hingezogen.\n\nMit 19 Jahren entwarf er seinen ersten experimentellen Computer bei Olivetti. Er schloss 1965 sein Physikstudium an der Universität Padua mit Auszeichnung ab.' },
    { title: 'Die Silizium-Revolution', content: '1968 zog er ins Silicon Valley. Bei Fairchild Semiconductor entwickelte er die revolutionäre MOS-Silizium-Gate-Technologie (SGT).\n\nBei Intel entwarf er den Intel 4004 — den weltweit ersten kommerziellen Mikroprozessor (1971). 1974 gründete er Zilog mit und entwarf den Z80.' },
    { title: 'Der Unternehmer', content: '1986 gründete er zusammen mit Professor Carver Mead vom Caltech Synaptics. Das Unternehmen entwickelte das erste Laptop-Touchpad (1992) und die Touchscreen-Technologie (1999).' },
    { title: 'Das Bewusstsein', content: 'In der Weihnachtsnacht 1990 erlebte Federico am Lake Tahoe eine Erfahrung, die seine Sicht auf die Realität für immer verändern sollte.\n\n2011 gründete er mit seiner Frau Elvia die Federico and Elvia Faggin Foundation, die sich der Erforschung der Natur und des Ursprungs des Bewusstseins widmet.' },
  ],
  es: [
    { title: 'La Formación', content: 'Nacido el 1 de diciembre de 1941 en Vicenza, durante el régimen fascista. Hijo de Giuseppe, profesor de filosofía e historia, desde niño Federico se sintió atraído por las máquinas y la tecnología.\n\nA los 19 años diseñó su primer ordenador experimental en Olivetti. Se graduó en física con honores en la Universidad de Padua en 1965.' },
    { title: 'La Revolución del Silicio', content: 'En 1968 se trasladó a Silicon Valley. En Fairchild Semiconductor desarrolló la revolucionaria tecnología MOS de puerta de silicio (SGT).\n\nEn Intel diseñó el Intel 4004 — el primer microprocesador comercial del mundo (1971). En 1974 cofundó Zilog y concibió el Z80.' },
    { title: 'El Empresario', content: 'En 1986 cofundó Synaptics con el profesor Carver Mead del Caltech. La empresa desarrolló el primer touchpad para portátiles (1992) y la tecnología touchscreen (1999).' },
    { title: 'La Conciencia', content: 'La noche de Navidad de 1990, en Lake Tahoe, Federico vivió una experiencia que cambiaría para siempre su visión de la realidad.\n\nEn 2011, con su esposa Elvia, fundó la Federico and Elvia Faggin Foundation, dedicada a la investigación sobre la naturaleza y el origen de la conciencia.' },
  ],
};

const AWARDS = [
  { year: 2019, title: 'Cavaliere di Gran Croce', description: 'Presidente Mattarella', sortOrder: 1 },
  { year: 2014, title: 'Premio Enrico Fermi', description: 'Società Italiana di Fisica', sortOrder: 2 },
  { year: 2009, title: 'National Medal of Technology and Innovation', description: 'Presidente Obama', sortOrder: 3 },
  { year: 2006, title: 'Lifetime Achievement Award', description: 'European Patent Organization', sortOrder: 4 },
  { year: 1997, title: 'Kyoto Prize per la Tecnologia Avanzata', description: '', sortOrder: 5 },
  { year: 1996, title: 'National Inventors Hall of Fame', description: '', sortOrder: 6 },
  { year: 1994, title: 'IEEE W. Wallace McDowell Award', description: '', sortOrder: 7 },
  { year: 1988, title: 'Marconi International Fellowship Award', description: '', sortOrder: 8 },
  { year: 1988, title: 'Medaglia d\'Oro per la Scienza e la Tecnologia', description: 'Presidente della Repubblica', sortOrder: 9 },
];

const TOPICS = {
  it: [
    { title: 'Coscienza e intelligenza artificiale', description: 'Può una macchina diventare consapevole? Il dibattito tra Faggin e i sostenitori dell\'IA forte.', sortOrder: 1 },
    { title: 'La fisica quantistica spiegata semplice', description: 'I concetti chiave della meccanica quantistica alla base della teoria di Faggin, accessibili a tutti.', sortOrder: 2 },
    { title: 'Esperienze di pre-morte e coscienza', description: 'Cosa suggeriscono le NDE sulla natura della coscienza e sulla sopravvivenza dopo la morte fisica?', sortOrder: 3 },
    { title: 'Meditazione e consapevolezza', description: 'Il ruolo della meditazione nello sviluppo della consapevolezza, secondo l\'esperienza di Faggin.', sortOrder: 4 },
    { title: 'Sapere vs. Conoscere', description: 'La differenza tra conoscenza simbolica e comprensione vissuta. Implicazioni per l\'educazione.', sortOrder: 5 },
    { title: 'Libero arbitrio: illusione o realtà?', description: 'Perché Faggin sostiene che il libero arbitrio è una proprietà fondamentale della natura.', sortOrder: 6 },
    { title: 'Scienza e spiritualità: il Nousym', description: 'Come scienza e spiritualità possono convergere in una visione unitaria della realtà.', sortOrder: 7 },
    { title: 'Il futuro dell\'umanità nell\'era dell\'IA', description: 'Come preservare la nostra umanità in un mondo dominato dall\'intelligenza artificiale.', sortOrder: 8 },
  ],
  en: [
    { title: 'Consciousness and artificial intelligence', description: 'Can a machine become conscious? The debate between Faggin and strong AI advocates.' },
    { title: 'Quantum physics made simple', description: 'Key concepts of quantum mechanics underlying Faggin\'s theory, accessible to all.' },
    { title: 'Near-death experiences and consciousness', description: 'What do NDEs suggest about the nature of consciousness and survival after physical death?' },
    { title: 'Meditation and awareness', description: 'The role of meditation in developing awareness, according to Faggin\'s experience.' },
    { title: 'Knowing vs. Understanding', description: 'The difference between symbolic knowledge and lived understanding. Implications for education.' },
    { title: 'Free will: illusion or reality?', description: 'Why Faggin argues that free will is a fundamental property of nature.' },
    { title: 'Science and spirituality: the Nousym', description: 'How science and spirituality can converge in a unified vision of reality.' },
    { title: 'The future of humanity in the AI era', description: 'How to preserve our humanity in a world dominated by artificial intelligence.' },
  ],
  de: [
    { title: 'Bewusstsein und künstliche Intelligenz', description: 'Kann eine Maschine bewusst werden? Die Debatte zwischen Faggin und den Befürwortern starker KI.' },
    { title: 'Quantenphysik einfach erklärt', description: 'Schlüsselkonzepte der Quantenmechanik, die Faggins Theorie zugrunde liegen.' },
    { title: 'Nahtoderfahrungen und Bewusstsein', description: 'Was deuten NDEs über die Natur des Bewusstseins an?' },
    { title: 'Meditation und Bewusstsein', description: 'Die Rolle der Meditation bei der Entwicklung des Bewusstseins.' },
    { title: 'Wissen vs. Verstehen', description: 'Der Unterschied zwischen symbolischem Wissen und gelebtem Verständnis.' },
    { title: 'Willensfreiheit: Illusion oder Realität?', description: 'Warum Faggin argumentiert, dass der freie Wille eine grundlegende Eigenschaft der Natur ist.' },
    { title: 'Wissenschaft und Spiritualität: das Nousym', description: 'Wie Wissenschaft und Spiritualität in einer einheitlichen Vision der Realität zusammenfinden können.' },
    { title: 'Die Zukunft der Menschheit im KI-Zeitalter', description: 'Wie wir unsere Menschlichkeit in einer von KI dominierten Welt bewahren können.' },
  ],
  es: [
    { title: 'Conciencia e inteligencia artificial', description: '¿Puede una máquina llegar a ser consciente? El debate entre Faggin y los defensores de la IA fuerte.' },
    { title: 'Física cuántica explicada de forma sencilla', description: 'Conceptos clave de la mecánica cuántica que subyacen en la teoría de Faggin.' },
    { title: 'Experiencias cercanas a la muerte y conciencia', description: '¿Qué sugieren las ECM sobre la naturaleza de la conciencia?' },
    { title: 'Meditación y conciencia', description: 'El papel de la meditación en el desarrollo de la conciencia, según la experiencia de Faggin.' },
    { title: 'Saber vs. Conocer', description: 'La diferencia entre conocimiento simbólico y comprensión vivida. Implicaciones para la educación.' },
    { title: 'Libre albedrío: ¿ilusión o realidad?', description: 'Por qué Faggin sostiene que el libre albedrío es una propiedad fundamental de la naturaleza.' },
    { title: 'Ciencia y espiritualidad: el Nousym', description: 'Cómo ciencia y espiritualidad pueden converger en una visión unitaria de la realidad.' },
    { title: 'El futuro de la humanidad en la era de la IA', description: 'Cómo preservar nuestra humanidad en un mundo dominado por la inteligencia artificial.' },
  ],
};

const SOCIAL_LINKS = [
  { platform: 'website', url: 'https://www.federicofaggin.com', label: 'federicofaggin.com', sortOrder: 1 },
  { platform: 'twitter', url: 'https://twitter.com/fedefaggin', label: '@fedefaggin', sortOrder: 2 },
  { platform: 'facebook', url: 'https://www.facebook.com/FedericoFagginFoundation', label: 'Facebook', sortOrder: 3 },
  { platform: 'instagram', url: 'https://www.instagram.com/federicofaggin', label: 'Instagram', sortOrder: 4 },
  { platform: 'youtube', url: 'https://www.youtube.com/@FedericoFagginFoundation', label: 'YouTube', sortOrder: 5 },
];

// ─── Home page content ──────────────────────────────────────────

const HOME_PAGE = {
  it: {
    purposeTitle: 'Scopo della fondazione',
    purposeText: 'La Faggin Foundation nasce per promuovere una nuova comprensione della realtà, fondata sul riconoscimento che la coscienza non è un prodotto della materia, ma il fondamento stesso dell\'esistenza.\n\nAttraverso i libri, le conferenze e la ricerca scientifica di Federico Faggin, la fondazione esplora il punto in cui scienza e spiritualità si incontrano, offrendo una visione dell\'essere umano che va oltre il paradigma materialista.\n\nLa nostra missione: aiutare le persone a riscoprire la propria natura irriducibile — consapevolezza, libero arbitrio e creatività — in un\'epoca dominata dall\'intelligenza artificiale.',
    storyTitle: 'USI incontra Federico Faggin',
    storyBio: 'Fisico, inventore e imprenditore italiano, naturalizzato statunitense, noto per aver progettato il primo microprocessore al mondo, l\'Intel 4004, nel 1971. Pioniere della tecnologia MOS con porta di silicio, ha rivoluzionato l\'informatica, creato il microprocessore Z80 e co-fondato Synaptics, introducendo touchpad e touchscreen.\n\nA seguito di una significativa esperienza biografica, da circa 20 anni si occupa dello studio scientifico della coscienza, focalizzandosi sul superamento della scienza materialista.',
    storyVideoUrl: 'https://www.youtube.com/embed/ch-iNvebvUw',
    videoSerieTitle: 'Video Serie',
    videoSerieSubtitle: 'Una selezione di interviste e conferenze',
  },
  en: {
    purposeTitle: 'Foundation\'s Purpose',
    purposeText: 'The Faggin Foundation was born to promote a new understanding of reality, based on the recognition that consciousness is not a product of matter, but the very foundation of existence.\n\nThrough the books, lectures and scientific research of Federico Faggin, the foundation explores the point where science and spirituality meet, offering a vision of the human being that goes beyond the materialist paradigm.\n\nOur mission: to help people rediscover their irreducible nature — awareness, free will and creativity — in an age dominated by artificial intelligence.',
    storyTitle: 'USI meets Federico Faggin',
    storyBio: 'Italian physicist, inventor and entrepreneur, naturalized American citizen, known for designing the world\'s first microprocessor, the Intel 4004, in 1971. Pioneer of MOS silicon gate technology, he revolutionized computing, created the Z80 microprocessor and co-founded Synaptics, introducing touchpad and touchscreen.\n\nFollowing a significant biographical experience, for about 20 years he has been devoted to the scientific study of consciousness, focusing on moving beyond materialist science.',
    videoSerieTitle: 'Video Series',
    videoSerieSubtitle: 'A selection of interviews and lectures',
  },
  de: {
    purposeTitle: 'Zweck der Stiftung',
    purposeText: 'Die Faggin Foundation wurde gegründet, um ein neues Verständnis der Realität zu fördern, basierend auf der Erkenntnis, dass Bewusstsein kein Produkt der Materie ist, sondern die Grundlage der Existenz selbst.\n\nUnsere Mission: den Menschen zu helfen, ihre irreduzible Natur wiederzuentdecken — Bewusstsein, freier Wille und Kreativität — in einem Zeitalter, das von künstlicher Intelligenz dominiert wird.',
    storyTitle: 'USI trifft Federico Faggin',
    storyBio: 'Italienischer Physiker, Erfinder und Unternehmer, eingebürgerter amerikanischer Staatsbürger, bekannt für den Entwurf des weltweit ersten Mikroprozessors, des Intel 4004, im Jahr 1971.',
    videoSerieTitle: 'Videoreihe',
    videoSerieSubtitle: 'Eine Auswahl von Interviews und Vorträgen',
  },
  es: {
    purposeTitle: 'Propósito de la fundación',
    purposeText: 'La Faggin Foundation nació para promover una nueva comprensión de la realidad, basada en el reconocimiento de que la conciencia no es un producto de la materia, sino el fundamento mismo de la existencia.\n\nNuestra misión: ayudar a las personas a redescubrir su naturaleza irreducible — conciencia, libre albedrío y creatividad — en una época dominada por la inteligencia artificial.',
    storyTitle: 'USI encuentra a Federico Faggin',
    storyBio: 'Físico, inventor y empresario italiano, ciudadano estadounidense naturalizado, conocido por diseñar el primer microprocesador del mundo, el Intel 4004, en 1971.',
    videoSerieTitle: 'Serie de Videos',
    videoSerieSubtitle: 'Una selección de entrevistas y conferencias',
  },
};

const ABOUT_PAGE = {
  it: { pageTitle: 'Le quattro vite di Federico Faggin', introText: '"Sono rinato a una nuova vita ogni volta, osservando il mondo da prospettive inaspettate, la mia mente espansa a nuove comprensioni."' },
  en: { pageTitle: 'The four lives of Federico Faggin', introText: '"I was reborn to a new life each time, observing the world from unexpected perspectives, my mind expanded to new understandings."' },
  de: { pageTitle: 'Die vier Leben von Federico Faggin', introText: '"Ich wurde jedes Mal in ein neues Leben wiedergeboren und betrachtete die Welt aus unerwarteten Perspektiven."' },
  es: { pageTitle: 'Las cuatro vidas de Federico Faggin', introText: '"Renací a una nueva vida cada vez, observando el mundo desde perspectivas inesperadas."' },
};

const VIDEO_PAGE_DATA = {
  it: { pageTitle: 'Video Serie', subtitle: 'Una raccolta di interviste, conferenze e dialoghi in cui Federico Faggin esplora i temi fondamentali della sua ricerca: la natura della coscienza, il rapporto tra scienza e spiritualità, il libero arbitrio, e perché l\'intelligenza artificiale non potrà mai essere consapevole.' },
  en: { pageTitle: 'Video Series', subtitle: 'A collection of interviews, lectures and dialogues in which Federico Faggin explores the fundamental themes of his research: the nature of consciousness, the relationship between science and spirituality, free will, and why artificial intelligence can never be conscious.' },
  de: { pageTitle: 'Videoreihe', subtitle: 'Eine Sammlung von Interviews, Vorträgen und Dialogen, in denen Federico Faggin die grundlegenden Themen seiner Forschung erforscht.' },
  es: { pageTitle: 'Serie de Videos', subtitle: 'Una colección de entrevistas, conferencias y diálogos en los que Federico Faggin explora los temas fundamentales de su investigación.' },
};

const EVENTS_PAGE_DATA = {
  it: { pageTitle: 'Eventi' },
  en: { pageTitle: 'Events' },
  de: { pageTitle: 'Veranstaltungen' },
  es: { pageTitle: 'Eventos' },
};

const RESEARCH_PAGE_DATA = {
  it: {
    pageTitle: 'Ricerca e Sviluppo',
    introText: 'La Federico and Elvia Faggin Foundation promuove la ricerca teorica e sperimentale sulla natura e l\'origine della coscienza presso università e istituti di ricerca.\n\nL\'obiettivo è la creazione di una nuova teoria matematica della coscienza in grado di produrre previsioni verificabili sperimentalmente.',
    areasTitle: 'Aree di ricerca',
    areas: [
      'Panpsichismo dell\'Informazione Quantistica (QIP)',
      'Rapporto tra informazione quantistica e qualia',
      'Libero arbitrio e indeterminazione quantistica',
      'Limiti fondamentali dell\'intelligenza artificiale',
    ],
    collaborationsTitle: 'Collaborazioni accademiche',
    collaborations: [
      { title: 'Cattedra Faggin Family Presidential in Physics of Information, UC Santa Cruz', description: 'Dotazione di $1M, 2015' },
      { title: 'Collaborazione con Prof. Giacomo Mauro D\'Ariano', description: 'Paper: "Hard Problem and Free Will: an information-theoretical approach"' },
    ],
    votingTitle: 'Quali temi vuoi approfondire?',
    votingSubtitle: 'La fondazione vuole ascoltare la tua voce. Registrati e vota il tema che vorresti vedere approfondito nei prossimi contenuti: interviste, podcast, video o articoli.\n\nOgni utente registrato ha diritto a un voto per tema.',
  },
  en: {
    pageTitle: 'Research',
    introText: 'The Federico and Elvia Faggin Foundation promotes theoretical and experimental research on the nature and origin of consciousness at universities and research institutes.\n\nThe goal is the creation of a new mathematical theory of consciousness capable of producing experimentally verifiable predictions.',
    areasTitle: 'Research Areas',
    areas: [
      'Quantum Information Panpsychism (QIP)',
      'Relationship between quantum information and qualia',
      'Free will and quantum indeterminacy',
      'Fundamental limits of artificial intelligence',
    ],
    collaborationsTitle: 'Academic Collaborations',
    collaborations: [
      { title: 'Faggin Family Presidential Chair in Physics of Information, UC Santa Cruz', description: '$1M endowment, 2015' },
      { title: 'Collaboration with Prof. Giacomo Mauro D\'Ariano', description: 'Paper: "Hard Problem and Free Will: an information-theoretical approach"' },
    ],
    votingTitle: 'Which topics would you like to explore?',
    votingSubtitle: 'The foundation wants to hear your voice. Sign up and vote for the topic you\'d like to see explored in upcoming content.',
  },
  de: {
    pageTitle: 'Forschung',
    introText: 'Die Federico and Elvia Faggin Foundation fördert die theoretische und experimentelle Forschung über die Natur und den Ursprung des Bewusstseins.',
    areasTitle: 'Forschungsbereiche',
    areas: [
      'Quanten-Informations-Panpsychismus (QIP)',
      'Beziehung zwischen Quanteninformation und Qualia',
      'Willensfreiheit und Quantenunbestimmtheit',
      'Grundlegende Grenzen der künstlichen Intelligenz',
    ],
    collaborationsTitle: 'Akademische Kooperationen',
    collaborations: [
      { title: 'Faggin Family Presidential Chair in Physics of Information, UC Santa Cruz', description: '$1M Stiftung, 2015' },
    ],
    votingTitle: 'Welche Themen möchten Sie vertiefen?',
    votingSubtitle: 'Die Stiftung möchte Ihre Stimme hören. Registrieren Sie sich und stimmen Sie ab.',
  },
  es: {
    pageTitle: 'Investigación',
    introText: 'La Federico and Elvia Faggin Foundation promueve la investigación teórica y experimental sobre la naturaleza y el origen de la conciencia.',
    areasTitle: 'Áreas de investigación',
    areas: [
      'Panpsiquismo de la Información Cuántica (QIP)',
      'Relación entre información cuántica y qualia',
      'Libre albedrío e indeterminación cuántica',
      'Límites fundamentales de la inteligencia artificial',
    ],
    collaborationsTitle: 'Colaboraciones académicas',
    collaborations: [
      { title: 'Cátedra Faggin Family Presidential in Physics of Information, UC Santa Cruz', description: 'Dotación de $1M, 2015' },
    ],
    votingTitle: '¿Qué temas te gustaría explorar?',
    votingSubtitle: 'La fundación quiere escuchar tu voz. Regístrate y vota por el tema que te gustaría ver desarrollado.',
  },
};

const SITE_CONFIG = {
  it: { siteTitle: 'Faggin Foundation', description: 'Promuovere la ricerca sulla natura e l\'origine della coscienza.', footerText: '© 2025 Faggin Foundation. Tutti i diritti riservati.' },
  en: { siteTitle: 'Faggin Foundation', description: 'Promoting research on the nature and origin of consciousness.', footerText: '© 2025 Faggin Foundation. All rights reserved.' },
  de: { siteTitle: 'Faggin Foundation', description: 'Förderung der Forschung über die Natur und den Ursprung des Bewusstseins.', footerText: '© 2025 Faggin Foundation. Alle Rechte vorbehalten.' },
  es: { siteTitle: 'Faggin Foundation', description: 'Promoviendo la investigación sobre la naturaleza y el origen de la conciencia.', footerText: '© 2025 Faggin Foundation. Todos los derechos reservados.' },
};

// ─── Main seed function ─────────────────────────────────────────

async function seed() {
  log('Starting seed...');
  await login();

  // 1. Social links (no i18n)
  log('Creating social links...');
  const socialLinkIds: string[] = [];
  for (const link of SOCIAL_LINKS) {
    const res = await create('social-links', link);
    socialLinkIds.push(res.data.documentId);
    log(`  ✓ ${link.platform}`);
  }

  // 2. Awards (no i18n)
  log('Creating awards...');
  for (const award of AWARDS) {
    await create('awards', award);
    log(`  ✓ ${award.year} ${award.title}`);
  }

  // 3. Video themes (i18n - IT first since IT is default locale)
  log('Creating video themes...');
  const themeDocIds: string[] = [];
  for (let i = 0; i < VIDEO_THEMES.it.length; i++) {
    const res = await create('video-themes', VIDEO_THEMES.it[i]);
    const docId = res.data.documentId;
    themeDocIds.push(docId);
    log(`  ✓ [it] ${VIDEO_THEMES.it[i].name}`);

    for (const locale of ['en', 'de', 'es'] as const) {
      await createLocalization('video-themes', docId, locale, VIDEO_THEMES[locale][i]);
      log(`  ✓ [${locale}] ${VIDEO_THEMES[locale][i].name}`);
    }
  }

  // 4. Videos (no i18n, linked to themes)
  log('Creating videos...');
  const videoDocIds: string[] = [];
  for (const video of VIDEOS) {
    const res = await create('videos', {
      title: video.title,
      youtubeId: video.youtubeId,
      description: video.description,
      sortOrder: video.sortOrder,
      theme: themeDocIds[video.themeIndex],
    });
    videoDocIds.push(res.data.documentId);
    log(`  ✓ ${video.title}`);
  }

  // 5. Books (i18n - IT first as default locale)
  log('Creating books...');
  for (let i = 0; i < BOOKS.it.length; i++) {
    const res = await create('books', BOOKS.it[i]);
    const docId = res.data.documentId;
    log(`  ✓ [it] ${BOOKS.it[i].title}`);

    for (const locale of ['en', 'de', 'es'] as const) {
      const { year, videoUrl, sortOrder } = BOOKS.it[i];
      await createLocalization('books', docId, locale, { ...BOOKS[locale][i], year, videoUrl, sortOrder });
      log(`  ✓ [${locale}] ${BOOKS[locale][i].title}`);
    }
  }

  // 6. Events (i18n - IT first as default locale)
  log('Creating events...');
  for (let i = 0; i < EVENTS.it.length; i++) {
    const res = await create('events', EVENTS.it[i]);
    const docId = res.data.documentId;
    log(`  ✓ [it] ${EVENTS.it[i].title}`);

    for (const locale of ['en', 'de', 'es'] as const) {
      const { description, date, type, sortOrder } = EVENTS.it[i];
      await createLocalization('events', docId, locale, { ...EVENTS[locale][i], description, date, type, sortOrder });
      log(`  ✓ [${locale}] ${EVENTS[locale][i].title}`);
    }
  }

  // 7. Bio sections (i18n - IT first as default locale)
  log('Creating bio sections...');
  for (let i = 0; i < BIO_SECTIONS.it.length; i++) {
    const res = await create('bio-sections', BIO_SECTIONS.it[i]);
    const docId = res.data.documentId;
    log(`  ✓ [it] ${BIO_SECTIONS.it[i].title}`);

    for (const locale of ['en', 'de', 'es'] as const) {
      const { period, sortOrder } = BIO_SECTIONS.it[i];
      await createLocalization('bio-sections', docId, locale, {
        ...BIO_SECTIONS[locale][i],
        period,
        sortOrder,
      });
      log(`  ✓ [${locale}] ${BIO_SECTIONS[locale][i].title}`);
    }
  }

  // 8. Topics (i18n - IT first as default locale)
  log('Creating topics...');
  for (let i = 0; i < TOPICS.it.length; i++) {
    const res = await create('topics', TOPICS.it[i]);
    const docId = res.data.documentId;
    log(`  ✓ [it] ${TOPICS.it[i].title}`);

    for (const locale of ['en', 'de', 'es'] as const) {
      const { sortOrder } = TOPICS.it[i];
      await createLocalization('topics', docId, locale, { ...TOPICS[locale][i], sortOrder });
      log(`  ✓ [${locale}] ${TOPICS[locale][i].title}`);
    }
  }

  // 9. Single types

  // Featured video IDs for homepage (first 4 videos)
  const featuredVideoIds = videoDocIds.slice(0, 4);

  log('Creating home-page...');
  await createSingleType('home-page', {
    ...HOME_PAGE.it,
    featuredVideos: featuredVideoIds,
  });
  log('  ✓ [it]');
  for (const locale of ['en', 'de', 'es'] as const) {
    await createSingleTypeLocalization('home-page', locale, HOME_PAGE[locale]);
    log(`  ✓ [${locale}]`);
  }

  log('Creating about-page...');
  await createSingleType('about-page', ABOUT_PAGE.it);
  log('  ✓ [it]');
  for (const locale of ['en', 'de', 'es'] as const) {
    await createSingleTypeLocalization('about-page', locale, ABOUT_PAGE[locale]);
    log(`  ✓ [${locale}]`);
  }

  log('Creating video-page...');
  await createSingleType('video-page', VIDEO_PAGE_DATA.it);
  log('  ✓ [it]');
  for (const locale of ['en', 'de', 'es'] as const) {
    await createSingleTypeLocalization('video-page', locale, VIDEO_PAGE_DATA[locale]);
    log(`  ✓ [${locale}]`);
  }

  log('Creating events-page...');
  await createSingleType('events-page', EVENTS_PAGE_DATA.it);
  log('  ✓ [it]');
  for (const locale of ['en', 'de', 'es'] as const) {
    await createSingleTypeLocalization('events-page', locale, EVENTS_PAGE_DATA[locale]);
    log(`  ✓ [${locale}]`);
  }

  log('Creating research-page...');
  await createSingleType('research-page', RESEARCH_PAGE_DATA.it);
  log('  ✓ [it]');
  for (const locale of ['en', 'de', 'es'] as const) {
    await createSingleTypeLocalization('research-page', locale, RESEARCH_PAGE_DATA[locale]);
    log(`  ✓ [${locale}]`);
  }

  log('Creating site-config...');
  await createSingleType('site-config', {
    ...SITE_CONFIG.it,
    socialLinks: socialLinkIds,
  });
  log('  ✓ [it]');
  for (const locale of ['en', 'de', 'es'] as const) {
    await createSingleTypeLocalization('site-config', locale, SITE_CONFIG[locale]);
    log(`  ✓ [${locale}]`);
  }

  // 10. Example votes (20 votes distributed across topics)
  log('Creating example votes...');
  const topicsRes = await api('votes/topics-with-counts', 'GET');
  const topicDocs: { documentId: string; title: string }[] = topicsRes.data || [];

  if (topicDocs.length > 0) {
    const EXAMPLE_VOTES = [
      // Topic 0 "Coscienza e IA" — 5 votes (most popular)
      { email: 'maria.rossi@example.com', topicIdx: 0 },
      { email: 'luca.bianchi@example.com', topicIdx: 0 },
      { email: 'anna.verdi@example.com', topicIdx: 0 },
      { email: 'marco.ferrari@example.com', topicIdx: 0 },
      { email: 'elena.russo@example.com', topicIdx: 0 },
      // Topic 1 "Fisica quantistica" — 4 votes
      { email: 'giovanni.esposito@example.com', topicIdx: 1 },
      { email: 'francesca.romano@example.com', topicIdx: 1 },
      { email: 'luca.bianchi@example.com', topicIdx: 1 },
      { email: 'anna.verdi@example.com', topicIdx: 1 },
      // Topic 2 "NDE e coscienza" — 3 votes
      { email: 'paolo.colombo@example.com', topicIdx: 2 },
      { email: 'maria.rossi@example.com', topicIdx: 2 },
      { email: 'sara.ricci@example.com', topicIdx: 2 },
      // Topic 3 "Meditazione" — 2 votes
      { email: 'elena.russo@example.com', topicIdx: 3 },
      { email: 'francesca.romano@example.com', topicIdx: 3 },
      // Topic 4 "Sapere vs Conoscere" — 2 votes
      { email: 'paolo.colombo@example.com', topicIdx: 4 },
      { email: 'marco.ferrari@example.com', topicIdx: 4 },
      // Topic 5 "Libero arbitrio" — 2 votes
      { email: 'sara.ricci@example.com', topicIdx: 5 },
      { email: 'giovanni.esposito@example.com', topicIdx: 5 },
      // Topic 6 "Nousym" — 1 vote
      { email: 'maria.rossi@example.com', topicIdx: 6 },
      // Topic 7 "Futuro umanità" — 1 vote
      { email: 'luca.bianchi@example.com', topicIdx: 7 },
    ];

    let voteCount = 0;
    for (const v of EXAMPLE_VOTES) {
      if (v.topicIdx < topicDocs.length) {
        try {
          const url = new URL(`/api/votes/cast`, STRAPI_URL);
          const res = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topicId: topicDocs[v.topicIdx].documentId, userEmail: v.email }),
          });
          if (res.ok) {
            voteCount++;
          }
        } catch {}
      }
    }
    log(`  ✓ ${voteCount} votes created`);
  } else {
    log('  ⚠ No topics found, skipping votes');
  }

  log('');
  log('🎉 Seed complete!');
  log('');
  log('Summary:');
  log(`  Social links: ${SOCIAL_LINKS.length}`);
  log(`  Awards: ${AWARDS.length}`);
  log(`  Video themes: ${VIDEO_THEMES.it.length} × 4 locales`);
  log(`  Videos: ${VIDEOS.length}`);
  log(`  Books: ${BOOKS.it.length} × 4 locales`);
  log(`  Events: ${EVENTS.it.length} × 4 locales`);
  log(`  Bio sections: ${BIO_SECTIONS.it.length} × 4 locales`);
  log(`  Topics: ${TOPICS.it.length} × 4 locales`);
  log(`  Single types: 6 × 4 locales`);
  log(`  Example votes: 20`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
