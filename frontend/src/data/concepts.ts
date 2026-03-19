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
  {
    documentId: 'c1', name: 'Qualia', space: 'C', sortOrder: 1,
    shortDescription: 'I qualia sono le sensazioni e i sentimenti con cui la coscienza esperisce l\'informazione che viene da fuori e la comprensione e il significato che vengono da dentro. Sono privati e non trasferibili, come gli stati quantistici puri.',
    quote: 'I qualia non sono teoremi né algoritmi: sono i portatori di significato. La coscienza ci permette anche di sapere che sappiamo e di sapere che non sappiamo.',
  },
  {
    documentId: 'c2', name: 'Libero arbitrio', space: 'C', sortOrder: 2,
    shortDescription: 'La capacità di Uno di dirigere la propria conoscenza di sé. È una proprietà fondamentale irriducibile che esiste assieme alla coscienza e spiega l\'indeterminazione quantistica.',
    quote: 'Il libero arbitrio ci assicura che il futuro è aperto perché non è ancora determinato. Neppure Uno può conoscere il proprio futuro, e tantomeno noi.',
  },
  {
    documentId: 'c3', name: 'Uno', space: 'C', sortOrder: 3,
    shortDescription: 'La totalità di ciò che esiste: dinamico, olistico, che vuole conoscere se stesso. Genera le seity come propri punti di vista. La realtà più profonda di Uno è organizzata olograficamente, perché ogni parte contiene il potenziale del Tutto.',
    quote: 'Concepisco una UC come una parte-intero di Uno, perché ha il suo stesso potenziale cognitivo ed è una delle sue innumerevoli parti.',
  },
  {
    documentId: 'c4', name: 'Postulato dell\'Essere', space: 'C', sortOrder: 4,
    shortDescription: 'Il fondamento di Nousym. Afferma l\'esistenza di un Tutto olistico e dinamico dotato di coscienza e libero arbitrio come proprietà irriducibili. È autoevidente perché l\'evidenza proviene dalla coscienza stessa.',
    quote: 'Il nuovo postulato dell\'Essere mi permette di definire la coscienza come la capacità di Uno di conoscere se stesso e il libero arbitrio come la capacità di Uno di dirigere la propria conoscenza di sé.',
  },
  // Informazione (I)
  {
    documentId: 'i1', name: 'Informazione quantistica', space: 'I', sortOrder: 1,
    shortDescription: 'L\'esperienza cosciente ha le stesse caratteristiche fondamentali dell\'informazione quantistica: impossibilità di clonazione, privacy, indeterminazione. La teoria QIP dimostra come l\'informazione quantistica sia la rappresentazione matematica dei qualia.',
    quote: 'L\'esistenza del mondo quantistico ci permette di capire che la coscienza dev\'essere un fenomeno quantistico, perché l\'esperienza cosciente ha le stesse caratteristiche fondamentali dell\'informazione quantistica.',
  },
  {
    documentId: 'i2', name: 'Entanglement', space: 'I', sortOrder: 2,
    shortDescription: 'L\'olismo quantistico che non può essere spiegato dalla fisica classica. Rivela correlazioni non-locali istantanee e l\'esistenza di una realtà più profonda: lo spazio-I, dove le seity sono interconnesse.',
    quote: 'Tutti i campi sono connessi da dentro tramite Uno, e la loro interconnessione si manifesta come quella proprietà della fisica quantistica che chiamiamo entanglement.',
  },
  {
    documentId: 'i3', name: 'Nousym', space: 'I', sortOrder: 3,
    shortDescription: 'La nuova disciplina che unisce scienza e spiritualità: nous (intelletto) e sym (simbolo). Riconosce la coscienza come proprietà primaria e irriducibile, non emergente dalla materia.',
    quote: 'Il mio obiettivo dal 2008 in poi è stato quello di unire scienza e spiritualità in una nuova disciplina, Nousym. Nousym afferma che la coscienza e il libero arbitrio esistono come proprietà fondamentali e irriducibili di Uno.',
  },
  {
    documentId: 'i4', name: 'Simboli', space: 'I', sortOrder: 4,
    shortDescription: 'Il corpo è un simbolo quantistico e classico fatto di simboli vivi. Le particelle fisiche sono l\'aspetto esteriore della realtà interiore delle seity. Per comprendere il significato di un simbolo bisogna aver vissuto un\'esperienza simile.',
    quote: 'Il nostro corpo è un sistema quantistico e classico di una complessità infinitamente maggiore delle macchine e dei computer che oggi sappiamo costruire. Nondimeno, il corpo è un simbolo quantistico e classico fatto di simboli vivi.',
  },
  // Fisico (F)
  {
    documentId: 'f1', name: 'Spazio-tempo', space: 'F', sortOrder: 1,
    shortDescription: 'Non è la realtà fondamentale ma emerge da una realtà più profonda. Esiste uno spazio-I (informazione viva) e uno spazio-C (coscienza) da cui lo spazio-F emerge. I "calcoli" del quantum computing avvengono fuori dallo spazio-tempo.',
    quote: 'Nessuno riesce a capire come possano funzionare i computer quantistici, visto che il calcolo richiede proprietà non-locali che non possono esistere nello spazio-tempo. Deve esistere un\'altra realtà più vasta.',
  },
  {
    documentId: 'f2', name: 'Materia', space: 'F', sortOrder: 2,
    shortDescription: 'Non è fondamentale ma manifestazione esteriore di entità coscienti. La coscienza è primaria e irriducibile, esiste prima della materia. I campi quantistici coscienti — le seity — generano la realtà fisica.',
    quote: 'La conseguenza logica del postulato dell\'Essere è che i campi quantistici della fisica devono avere coscienza e libero arbitrio. Ho chiamato questi campi e le loro combinazioni seity.',
  },
  {
    documentId: 'f3', name: 'Microprocessore', space: 'F', sortOrder: 3,
    shortDescription: 'Il culmine della ricerca materiale di Faggin. Un\'esperienza straordinaria ha poi capovolto l\'orizzonte delle sue ricerche, conducendolo dal mondo esteriore della materia all\'esplorazione del mondo interiore della coscienza.',
    quote: 'È questa passione che mi ha spinto a cercare i segreti del mondo materiale e a creare il primo microprocessore. Più avanti, un\'esperienza straordinaria ha capovolto l\'orizzonte delle mie ricerche.',
  },
  {
    documentId: 'f4', name: 'Fisica quantistica', space: 'F', sortOrder: 4,
    shortDescription: 'Le proprietà "strane" della meccanica quantistica — indeterminazione, non-località, collasso della funzione d\'onda — si spiegano partendo dalla coscienza. La probabilità quantistica non è ignoranza ma creazione reale di nuovi stati.',
    quote: 'Il libero arbitrio ha le stesse proprietà del cosiddetto collasso della funzione d\'onda, un fenomeno la cui interpretazione è ancora controversa.',
  },
];
