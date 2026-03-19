import type { Concept } from '@/types/strapi';

export type OntologicalSpace = 'C' | 'I' | 'F';

export const SPACE_COLORS: Record<OntologicalSpace, { primary: string; glow: string }> = {
  C: { primary: '#F5A623', glow: 'rgba(245, 166, 35, 0.4)' },
  I: { primary: '#9B59B6', glow: 'rgba(155, 89, 182, 0.4)' },
  F: { primary: '#3498DB', glow: 'rgba(52, 152, 219, 0.4)' },
};

export const SPACE_LABELS: Record<OntologicalSpace, string> = {
  C: 'Coscienza',
  I: 'Informazione',
  F: 'Fisico',
};

export const FALLBACK_CONCEPTS: Concept[] = [
  // Coscienza (C)
  { documentId: 'c1', name: 'Qualia', space: 'C', shortDescription: 'Le sensazioni e i sentimenti che proviamo, privati e non trasferibili. Sono la forma con cui la coscienza conosce se stessa.', sortOrder: 1 },
  { documentId: 'c2', name: 'Libero arbitrio', space: 'C', shortDescription: 'La capacità di Uno di dirigere la propria conoscenza di sé. Non può emergere dal determinismo, ma il determinismo può emergere dall\'indeterminismo.', sortOrder: 2 },
  { documentId: 'c3', name: 'Uno', space: 'C', shortDescription: 'La totalità di ciò che esiste: dinamico, olistico, e vuole conoscere se stesso. Il postulato fondante da cui tutto deriva.', sortOrder: 3 },
  { documentId: 'c4', name: 'Postulato dell\'Essere', space: 'C', shortDescription: 'Uno è la totalità di ciò che esiste ed è dinamico, olistico e vuole conoscere se stesso. Da questo postulato autoevidente nasce Nousym.', sortOrder: 4 },
  // Informazione (I)
  { documentId: 'i1', name: 'Informazione quantistica', space: 'I', shortDescription: 'L\'informazione quantistica non si può copiare (teorema di non-clonazione), proprio come i qualia. Questa è la chiave che collega coscienza e fisica.', sortOrder: 1 },
  { documentId: 'i2', name: 'Entanglement', space: 'I', shortDescription: 'La correlazione istantanea tra particelle quantistiche, che rivela una realtà più profonda dello spazio-tempo dove tutto è interconnesso.', sortOrder: 2 },
  { documentId: 'i3', name: 'Nousym', space: 'I', shortDescription: 'La nuova disciplina che unisce scienza e spiritualità, da nous (intelletto) e sym (simbolo). Parte dal postulato dell\'Essere.', sortOrder: 3 },
  { documentId: 'i4', name: 'Simboli', space: 'I', shortDescription: 'Le particelle e gli atomi sono i simboli che le seity usano per comunicare il significato di ciò che provano nella loro coscienza.', sortOrder: 4 },
  // Fisico (F)
  { documentId: 'f1', name: 'Spazio-tempo', space: 'F', shortDescription: 'Il palcoscenico della realtà fisica, che emerge da una realtà più profonda. Non è fondamentale: è il modo in cui le seity si manifestano.', sortOrder: 1 },
  { documentId: 'f2', name: 'Materia', space: 'F', shortDescription: 'Ciò che percepiamo come solido e reale è la manifestazione esteriore di entità coscienti. Il più non può venire dal meno.', sortOrder: 2 },
  { documentId: 'f3', name: 'Microprocessore', space: 'F', shortDescription: 'L\'invenzione che ha rivoluzionato il mondo fisico. Il punto di partenza del viaggio di Faggin dalla materia alla coscienza.', sortOrder: 3 },
  { documentId: 'f4', name: 'Fisica quantistica', space: 'F', shortDescription: 'Le sue proprietà "strane" si spiegano partendo dalla coscienza: il collasso della funzione d\'onda corrisponde al libero arbitrio delle seity.', sortOrder: 4 },
];
