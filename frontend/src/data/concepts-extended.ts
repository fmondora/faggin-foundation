import type { Concept } from '@/types/strapi';
import type { OntologicalSpace } from './concepts';

export interface ExtendedConcept extends Concept {
  space: OntologicalSpace;
  sortOrder: number;
}

export interface ConceptConnection {
  from: string;
  to: string;
}

export const EXTENDED_CONCEPTS: ExtendedConcept[] = [
  // ═══════════════════════════════════════════════
  // Coscienza (C) — 20 concetti
  // ═══════════════════════════════════════════════
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
  {
    documentId: 'c5', name: 'Seity', space: 'C', sortOrder: 5,
    shortDescription: 'Campi quantistici coscienti che sono le parti-intero di Uno. Ogni seity ha coscienza e libero arbitrio e genera la realtà fisica come sua manifestazione esteriore. Il termine viene dall\'inglese antico e indica l\'essenza di un\'entità.',
    quote: 'La conseguenza logica del postulato dell\'Essere è che i campi quantistici della fisica devono avere coscienza e libero arbitrio. Ho chiamato questi campi e le loro combinazioni seity.',
  },
  {
    documentId: 'c6', name: 'Ego', space: 'C', sortOrder: 6,
    shortDescription: 'La parte della psiche che si identifica con il corpo e crede di essere separata dal tutto. L\'ego è necessario per fare esperienza nel mondo fisico, ma diventa un ostacolo quando domina impedendo l\'accesso alla dimensione più profonda della coscienza.',
    quote: 'L\'ego è quella parte di noi che si identifica con il nostro corpo e ci fa sentire separati dagli altri e dal resto del mondo.',
  },
  {
    documentId: 'c7', name: 'Unità di Coscienza (UC)', space: 'C', sortOrder: 7,
    shortDescription: 'Le parti-intero di Uno che mantengono il suo stesso potenziale cognitivo. Ogni UC è come un ologramma del Tutto: contiene l\'intero potenziale di Uno pur essendo un suo punto di vista unico e irripetibile.',
    quote: 'Concepisco una UC come una parte-intero di Uno, perché ha il suo stesso potenziale cognitivo ed è una delle sue innumerevoli parti.',
  },
  {
    documentId: 'c8', name: 'Autocoscienza', space: 'C', sortOrder: 8,
    shortDescription: 'La capacità di sapere di sapere, che distingue la coscienza umana da quella di entità meno complesse. L\'autocoscienza permette la riflessione su se stessi e la crescita interiore consapevole.',
    quote: 'La coscienza ci permette anche di sapere che sappiamo e di sapere che non sappiamo.',
  },
  {
    documentId: 'c9', name: 'Significato', space: 'C', sortOrder: 9,
    shortDescription: 'Solo la coscienza può dare significato all\'informazione. Il significato non è riducibile a simboli o algoritmi: richiede un\'entità cosciente che comprenda. Per questo le macchine non possono comprendere.',
    quote: 'Il significato è qualcosa che solo un\'entità cosciente può dare all\'informazione, perché il significato richiede comprensione, e la comprensione richiede coscienza.',
  },
  {
    documentId: 'c10', name: 'Comprensione', space: 'C', sortOrder: 10,
    shortDescription: 'La capacità esclusiva della coscienza di afferrare il significato profondo dell\'esperienza. La comprensione non è calcolo né elaborazione di dati: è un atto qualitativo irriducibile che nessuna macchina può replicare.',
    quote: 'La comprensione richiede coscienza. Nessun computer potrà mai comprendere, perché la comprensione non è un\'operazione algoritmica.',
  },
  {
    documentId: 'c11', name: 'Amore', space: 'C', sortOrder: 11,
    shortDescription: 'La forza fondamentale che tiene unito il Tutto. L\'amore è la forza coesiva di Uno, ciò che connette ogni seity al Tutto e permette la conoscenza di sé attraverso la relazione con l\'altro.',
    quote: 'L\'amore è la forza che tiene unito il Tutto. È la forza coesiva di Uno che si manifesta come la tendenza di ogni parte a ritornare al Tutto.',
  },
  {
    documentId: 'c12', name: 'Identità', space: 'C', sortOrder: 12,
    shortDescription: 'Ogni seity ha un\'identità unica e irripetibile che è il suo punto di vista su Uno. L\'identità non si riduce al corpo né alla mente: è l\'essenza cosciente che persiste oltre le trasformazioni fisiche.',
    quote: 'Ogni seity è un punto di vista unico e irripetibile di Uno su se stesso.',
  },
  {
    documentId: 'c13', name: 'Agentività', space: 'C', sortOrder: 13,
    shortDescription: 'La capacità di agire nel mondo in modo autonomo e intenzionale, che deriva dal libero arbitrio. L\'agentività vera richiede coscienza: le macchine simulano azione ma non hanno vera intenzionalità.',
    quote: 'Il libero arbitrio è la capacità di dirigere la propria conoscenza di sé, e questa capacità si manifesta come agentività nel mondo fisico.',
  },
  {
    documentId: 'c14', name: 'Risveglio', space: 'C', sortOrder: 14,
    shortDescription: 'Il processo di espansione della coscienza oltre i limiti dell\'ego. Il risveglio porta a riconoscere la propria natura come parte-intero di Uno, superando l\'illusione della separazione.',
    quote: 'Lo scopo della nostra vita è quello di risvegliarci alla nostra vera natura: renderci conto che non siamo solo un corpo ma siamo molto di più.',
  },
  {
    documentId: 'c15', name: 'Sofferenza', space: 'C', sortOrder: 15,
    shortDescription: 'Un segnale della coscienza che indica disallineamento tra l\'ego e la nostra natura profonda. La sofferenza ha una funzione evolutiva: spinge verso la crescita interiore e il superamento dei limiti dell\'ego.',
    quote: 'La sofferenza è un segnale che ci avverte che qualcosa non va, che stiamo andando nella direzione sbagliata.',
  },
  {
    documentId: 'c16', name: 'Gioia', space: 'C', sortOrder: 16,
    shortDescription: 'Lo stato naturale della coscienza quando è allineata con la propria essenza. La gioia profonda non dipende da condizioni esterne ma dalla connessione con Uno, a differenza del piacere che è transitorio.',
    quote: 'La gioia è lo stato naturale della coscienza quando l\'ego non la ostacola.',
  },
  {
    documentId: 'c17', name: 'Intuizione', space: 'C', sortOrder: 17,
    shortDescription: 'Conoscenza diretta che non passa per il ragionamento logico. L\'intuizione è una forma di comunicazione dalla dimensione più profonda della coscienza, uno strumento di conoscenza che la scienza materialista trascura.',
    quote: 'L\'intuizione è una forma di conoscenza diretta che viene dalla parte più profonda di noi.',
  },
  {
    documentId: 'c18', name: 'Creatività', space: 'C', sortOrder: 18,
    shortDescription: 'La capacità di creare qualcosa di genuinamente nuovo, non derivabile da ciò che esisteva prima. La creatività vera richiede coscienza e libero arbitrio: le macchine possono solo ricombinare pattern esistenti.',
    quote: 'La vera creatività richiede coscienza e libero arbitrio perché implica la creazione di qualcosa di genuinamente nuovo.',
  },
  {
    documentId: 'c19', name: 'Empatia', space: 'C', sortOrder: 19,
    shortDescription: 'La capacità di sentire ciò che l\'altro sente, resa possibile dalla connessione profonda tra tutte le seity in Uno. L\'empatia è evidenza diretta dell\'interconnessione cosciente che trascende lo spazio-tempo.',
    quote: 'L\'empatia è possibile perché siamo tutti connessi in Uno. Sentire ciò che l\'altro sente è una prova diretta della nostra interconnessione.',
  },
  {
    documentId: 'c20', name: 'Conoscenza di sé', space: 'C', sortOrder: 20,
    shortDescription: 'Lo scopo fondamentale di Uno e di ogni seity. Tutta la realtà esiste affinché Uno possa conoscere se stesso attraverso i suoi innumerevoli punti di vista. La conoscenza di sé è il motore dell\'evoluzione cosmica.',
    quote: 'Lo scopo dell\'esistenza è la conoscenza di sé. Uno vuole conoscere se stesso e lo fa attraverso le sue innumerevoli parti.',
  },

  // ═══════════════════════════════════════════════
  // Informazione (I) — 12 concetti
  // ═══════════════════════════════════════════════
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
  {
    documentId: 'i5', name: 'Teoria QIP', space: 'I', sortOrder: 5,
    shortDescription: 'Quantum Information-based Panpsychism: la teoria che identifica l\'informazione quantistica come la rappresentazione matematica dei qualia. Dimostra che la coscienza non può essere classica perché le sue proprietà sono quelle dell\'informazione quantistica.',
    quote: 'La teoria QIP propone che i qualia siano rappresentati da stati quantistici puri, cioè dall\'informazione quantistica.',
  },
  {
    documentId: 'i6', name: 'Quadro CIF', space: 'I', sortOrder: 6,
    shortDescription: 'Il framework ontologico che distingue tre spazi: Coscienza (C), Informazione (I) e Fisico (F). Lo spazio-C è il più fondamentale, lo spazio-I è il ponte, lo spazio-F è la manifestazione esteriore.',
    quote: 'Il quadro CIF prevede tre livelli di realtà: lo spazio della coscienza, lo spazio dell\'informazione e lo spazio fisico.',
  },
  {
    documentId: 'i7', name: 'Informazione viva', space: 'I', sortOrder: 7,
    shortDescription: 'L\'informazione portata dalle seity, che ha significato intrinseco a differenza dell\'informazione classica dei computer. L\'informazione viva è semantica, non solo sintattica: porta con sé comprensione e significato.',
    quote: 'L\'informazione delle seity è informazione viva, perché è portata da entità coscienti che le danno significato.',
  },
  {
    documentId: 'i8', name: 'Simboli vivi', space: 'I', sortOrder: 8,
    shortDescription: 'I simboli che hanno un significato intrinseco perché sono manifestazioni di entità coscienti. A differenza dei simboli artificiali (come le parole), i simboli vivi portano in sé il significato dell\'esperienza che rappresentano.',
    quote: 'I simboli vivi sono radicalmente diversi dai simboli artificiali come le parole, perché portano in sé il significato dell\'esperienza.',
  },
  {
    documentId: 'i9', name: 'Teorema di non-clonazione', space: 'I', sortOrder: 9,
    shortDescription: 'Uno dei pilastri della meccanica quantistica: è impossibile copiare uno stato quantistico sconosciuto. Questo spiega perché i qualia sono privati e non trasferibili -- l\'esperienza cosciente non può essere duplicata.',
    quote: 'Il teorema di non-clonazione della meccanica quantistica ci dice che è impossibile copiare uno stato quantistico, e questo è esattamente ciò che accade con i qualia: non possono essere trasferiti o copiati.',
  },
  {
    documentId: 'i10', name: 'Teorema di Holevo', space: 'I', sortOrder: 10,
    shortDescription: 'Stabilisce che uno stato quantistico contiene molta più informazione di quella estraibile con una misura classica. Spiega perché la comprensione interiore è sempre più ricca di ciò che possiamo esprimere a parole.',
    quote: 'Il teorema di Holevo dimostra che da uno stato quantistico si può estrarre con una misura classica solo una piccola parte dell\'informazione che contiene.',
  },
  {
    documentId: 'i11', name: 'Spazio di Hilbert', space: 'I', sortOrder: 11,
    shortDescription: 'Lo spazio matematico in cui vivono gli stati quantistici. Nella visione di Faggin, lo spazio di Hilbert è la struttura matematica che descrive lo spazio-I, il livello di realtà dell\'informazione.',
    quote: 'Lo spazio di Hilbert è lo spazio matematico dove vivono gli stati quantistici, e corrisponde a ciò che chiamo spazio dell\'informazione o spazio-I.',
  },
  {
    documentId: 'i12', name: 'Thoughtform', space: 'I', sortOrder: 12,
    shortDescription: 'Strutture informazionali nello spazio-I che possono influenzare la realtà fisica. I pensieri e le intenzioni coscienti creano thoughtform che mediano tra coscienza e materia.',
    quote: 'I pensieri e le intenzioni di una seity creano strutture nello spazio dell\'informazione che chiamo thoughtform.',
  },

  // ═══════════════════════════════════════════════
  // Fisico (F) — 18 concetti
  // ═══════════════════════════════════════════════
  {
    documentId: 'f1', name: 'Spazio-tempo', space: 'F', sortOrder: 1,
    shortDescription: 'Non è la realtà fondamentale ma emerge da una realtà più profonda. Esiste uno spazio-I (informazione viva) e uno spazio-C (coscienza) da cui lo spazio-F emerge. I "calcoli" del quantum computing avvengono fuori dallo spazio-tempo.',
    quote: 'Nessuno riesce a capire come possano funzionare i computer quantistici, visto che il calcolo richiede proprietà non-locali che non possono esistere nello spazio-tempo. Deve esistere un\'altra realtà più vasta.',
  },
  {
    documentId: 'f2', name: 'Materia', space: 'F', sortOrder: 2,
    shortDescription: 'Non è fondamentale ma manifestazione esteriore di entità coscienti. La coscienza è primaria e irriducibile, esiste prima della materia. I campi quantistici coscienti -- le seity -- generano la realtà fisica.',
    quote: 'La conseguenza logica del postulato dell\'Essere è che i campi quantistici della fisica devono avere coscienza e libero arbitrio. Ho chiamato questi campi e le loro combinazioni seity.',
  },
  {
    documentId: 'f3', name: 'Microprocessore', space: 'F', sortOrder: 3,
    shortDescription: 'Il culmine della ricerca materiale di Faggin. Un\'esperienza straordinaria ha poi capovolto l\'orizzonte delle sue ricerche, conducendolo dal mondo esteriore della materia all\'esplorazione del mondo interiore della coscienza.',
    quote: 'È questa passione che mi ha spinto a cercare i segreti del mondo materiale e a creare il primo microprocessore. Più avanti, un\'esperienza straordinaria ha capovolto l\'orizzonte delle mie ricerche.',
  },
  {
    documentId: 'f4', name: 'Fisica quantistica', space: 'F', sortOrder: 4,
    shortDescription: 'Le proprietà "strane" della meccanica quantistica -- indeterminazione, non-località, collasso della funzione d\'onda -- si spiegano partendo dalla coscienza. La probabilità quantistica non è ignoranza ma creazione reale di nuovi stati.',
    quote: 'Il libero arbitrio ha le stesse proprietà del cosiddetto collasso della funzione d\'onda, un fenomeno la cui interpretazione è ancora controversa.',
  },
  {
    documentId: 'f5', name: 'Collasso della funzione d\'onda', space: 'F', sortOrder: 5,
    shortDescription: 'Il momento in cui una sovrapposizione quantistica diventa uno stato definito. Faggin lo interpreta come l\'atto di libero arbitrio di una seity: non è un processo casuale ma una scelta cosciente.',
    quote: 'Il libero arbitrio ha le stesse proprietà del cosiddetto collasso della funzione d\'onda, un fenomeno la cui interpretazione è ancora controversa.',
  },
  {
    documentId: 'f6', name: 'Corpo', space: 'F', sortOrder: 6,
    shortDescription: 'Il simbolo vivente della seity nello spazio fisico. Il corpo non è una macchina ma un organismo cosciente di complessità infinitamente superiore a qualsiasi computer. È lo strumento attraverso cui la seity fa esperienza nel mondo fisico.',
    quote: 'Il nostro corpo è un sistema quantistico e classico di una complessità infinitamente maggiore delle macchine e dei computer che oggi sappiamo costruire.',
  },
  {
    documentId: 'f7', name: 'Cervello', space: 'F', sortOrder: 7,
    shortDescription: 'Non è la sorgente della coscienza ma uno strumento che la seity usa per interagire con il mondo fisico. Il cervello è come un\'interfaccia tra lo spazio-C e lo spazio-F, non il generatore della mente.',
    quote: 'Il cervello non produce la coscienza, così come la radio non produce la musica. Il cervello è lo strumento che la coscienza usa per interagire con il mondo fisico.',
  },
  {
    documentId: 'f8', name: 'Determinismo', space: 'F', sortOrder: 8,
    shortDescription: 'La visione secondo cui tutto è predeterminato dalle leggi fisiche. Faggin la rifiuta: il libero arbitrio e l\'indeterminazione quantistica dimostrano che il futuro è aperto e non predeterminato.',
    quote: 'Il libero arbitrio ci assicura che il futuro è aperto perché non è ancora determinato.',
  },
  {
    documentId: 'f9', name: 'Olismo', space: 'F', sortOrder: 9,
    shortDescription: 'Il principio fondamentale per cui il tutto è più della somma delle parti. L\'olismo quantistico (entanglement) dimostra che la realtà non è riducibile ai suoi componenti. Uno è il Tutto olistico per eccellenza.',
    quote: 'La realtà più profonda di Uno è organizzata olograficamente, perché ogni parte contiene il potenziale del Tutto.',
  },
  {
    documentId: 'f10', name: 'Riduzionismo', space: 'F', sortOrder: 10,
    shortDescription: 'L\'approccio scientifico che spiega il tutto riducendolo alle parti. Faggin lo considera inadeguato per comprendere la coscienza e la vita: il riduzionismo funziona per le macchine ma non per gli organismi viventi.',
    quote: 'Il riduzionismo è un metodo potente per studiare le macchine, ma è del tutto inadeguato per comprendere la vita e la coscienza.',
  },
  {
    documentId: 'f11', name: 'Fisicalismo', space: 'F', sortOrder: 11,
    shortDescription: 'La dottrina che afferma che tutto ciò che esiste è fisico o superviene sul fisico. Faggin la rifiuta come dogma non dimostrato: la coscienza e l\'informazione quantistica dimostrano l\'esistenza di realtà non-fisiche.',
    quote: 'Il fisicalismo è un dogma non dimostrato. La coscienza non può essere spiegata dalla materia perché la materia è una manifestazione della coscienza, non il contrario.',
  },
  {
    documentId: 'f12', name: 'Intelligenza Artificiale', space: 'F', sortOrder: 12,
    shortDescription: 'Le macchine possono elaborare simboli ma non comprenderne il significato. L\'IA non è e non può essere cosciente perché opera solo con informazione classica, non quantistica. Attribuirle coscienza è un errore fondamentale.',
    quote: 'I computer manipolano solo simboli senza comprenderne il significato. L\'intelligenza artificiale non è intelligente: è un\'elaborazione meccanica di dati priva di comprensione.',
  },
  {
    documentId: 'f13', name: 'LLM e reti neurali', space: 'F', sortOrder: 13,
    shortDescription: 'I Large Language Models sono macchine statistiche che manipolano probabilisticamente i token senza alcuna comprensione. Possono imitare il linguaggio umano ma non capiscono ciò che dicono. La confusione tra imitazione e comprensione è pericolosa.',
    quote: 'I cosiddetti modelli di linguaggio di grandi dimensioni non comprendono il linguaggio: ne producono un\'imitazione statistica estremamente sofisticata.',
  },
  {
    documentId: 'f14', name: 'Computer quantistico', space: 'F', sortOrder: 14,
    shortDescription: 'Dimostra l\'esistenza di una realtà oltre lo spazio-tempo, perché i calcoli quantistici richiedono proprietà non-locali impossibili nel mondo classico. Il quantum computing è una prova indiretta dello spazio-I.',
    quote: 'Nessuno riesce a capire come possano funzionare i computer quantistici, visto che il calcolo richiede proprietà non-locali che non possono esistere nello spazio-tempo.',
  },
  {
    documentId: 'f15', name: 'Morte e trasformazione', space: 'F', sortOrder: 15,
    shortDescription: 'La morte del corpo non è la fine della seity ma una trasformazione. La coscienza non è prodotta dal cervello e quindi non muore con esso. La morte è un passaggio da uno stato di coscienza a un altro.',
    quote: 'La morte non è la fine ma una trasformazione. La coscienza non è prodotta dal cervello, e quindi non può morire con il corpo.',
  },
  {
    documentId: 'f16', name: 'Esperienze di premorte', space: 'F', sortOrder: 16,
    shortDescription: 'Le NDE (Near-Death Experiences) forniscono evidenza empirica che la coscienza può esistere indipendentemente dal cervello. Chi le vive riporta una coscienza espansa, più vivida di quella ordinaria.',
    quote: 'Le esperienze di premorte dimostrano che la coscienza può funzionare anche quando il cervello è clinicamente morto, il che prova che il cervello non produce la coscienza.',
  },
  {
    documentId: 'f17', name: 'Sogni', space: 'F', sortOrder: 17,
    shortDescription: 'I sogni sono esperienze coscienti che avvengono fuori dallo spazio-tempo fisico. Dimostrano che la coscienza non ha bisogno del mondo esterno per avere esperienze ricche e significative.',
    quote: 'Nei sogni creiamo mondi interi con i nostri qualia, dimostrando che la coscienza non ha bisogno degli stimoli del mondo esterno per fare esperienza.',
  },
  {
    documentId: 'f18', name: 'Meditazione', space: 'F', sortOrder: 18,
    shortDescription: 'Pratica che permette di accedere a stati di coscienza più profondi, silenziando l\'ego e il rumore mentale. La meditazione è uno strumento per sperimentare direttamente la propria natura come parte-intero di Uno.',
    quote: 'La meditazione ci permette di andare oltre l\'ego e di sperimentare direttamente la nostra connessione con il Tutto.',
  },
];

export const EXTENDED_CONNECTIONS: ConceptConnection[] = [
  // Coscienza interna
  { from: 'c1', to: 'c9' },   // Qualia → Significato
  { from: 'c1', to: 'i1' },   // Qualia → Informazione quantistica
  { from: 'c2', to: 'f5' },   // Libero arbitrio → Collasso
  { from: 'c2', to: 'c13' },  // Libero arbitrio → Agentività
  { from: 'c2', to: 'f8' },   // Libero arbitrio → Determinismo
  { from: 'c3', to: 'c7' },   // Uno → UC
  { from: 'c3', to: 'c5' },   // Uno → Seity
  { from: 'c3', to: 'c20' },  // Uno → Conoscenza di sé
  { from: 'c3', to: 'f9' },   // Uno → Olismo
  { from: 'c4', to: 'c3' },   // Postulato → Uno
  { from: 'c4', to: 'i3' },   // Postulato → Nousym
  { from: 'c5', to: 'c7' },   // Seity → UC
  { from: 'c5', to: 'f2' },   // Seity → Materia
  { from: 'c5', to: 'c12' },  // Seity → Identità
  { from: 'c5', to: 'i12' },  // Seity → Thoughtform
  { from: 'c6', to: 'c14' },  // Ego → Risveglio
  { from: 'c6', to: 'c15' },  // Ego → Sofferenza
  { from: 'c6', to: 'f6' },   // Ego → Corpo
  { from: 'c7', to: 'c3' },   // UC → Uno
  { from: 'c8', to: 'c20' },  // Autocoscienza → Conoscenza di sé
  { from: 'c9', to: 'c10' },  // Significato → Comprensione
  { from: 'c9', to: 'f12' },  // Significato → IA
  { from: 'c10', to: 'c1' },  // Comprensione → Qualia
  { from: 'c11', to: 'c3' },  // Amore → Uno
  { from: 'c11', to: 'c19' }, // Amore → Empatia
  { from: 'c14', to: 'f18' }, // Risveglio → Meditazione
  { from: 'c15', to: 'c16' }, // Sofferenza → Gioia
  { from: 'c17', to: 'c18' }, // Intuizione → Creatività
  { from: 'c18', to: 'c2' },  // Creatività → Libero arbitrio
  { from: 'c19', to: 'i2' },  // Empatia → Entanglement

  // Informazione interna
  { from: 'i1', to: 'i5' },   // Info quantistica → QIP
  { from: 'i1', to: 'i9' },   // Info quantistica → Non-clonazione
  { from: 'i1', to: 'i10' },  // Info quantistica → Holevo
  { from: 'i2', to: 'f9' },   // Entanglement → Olismo
  { from: 'i2', to: 'i11' },  // Entanglement → Spazio di Hilbert
  { from: 'i3', to: 'c4' },   // Nousym → Postulato
  { from: 'i3', to: 'i6' },   // Nousym → Quadro CIF
  { from: 'i4', to: 'i8' },   // Simboli → Simboli vivi
  { from: 'i4', to: 'f6' },   // Simboli → Corpo
  { from: 'i5', to: 'c1' },   // QIP → Qualia
  { from: 'i5', to: 'i1' },   // QIP → Info quantistica
  { from: 'i6', to: 'i7' },   // Quadro CIF → Informazione viva
  { from: 'i7', to: 'i8' },   // Informazione viva → Simboli vivi
  { from: 'i9', to: 'c1' },   // Non-clonazione → Qualia
  { from: 'i11', to: 'i1' },  // Spazio di Hilbert → Info quantistica
  { from: 'i12', to: 'c5' },  // Thoughtform → Seity

  // Fisico interna
  { from: 'f1', to: 'f14' },  // Spazio-tempo → Computer quantistico
  { from: 'f1', to: 'i6' },   // Spazio-tempo → Quadro CIF
  { from: 'f2', to: 'c5' },   // Materia → Seity
  { from: 'f2', to: 'f11' },  // Materia → Fisicalismo
  { from: 'f3', to: 'f12' },  // Microprocessore → IA
  { from: 'f4', to: 'f5' },   // Fisica quantistica → Collasso
  { from: 'f4', to: 'i2' },   // Fisica quantistica → Entanglement
  { from: 'f5', to: 'c2' },   // Collasso → Libero arbitrio
  { from: 'f6', to: 'f7' },   // Corpo → Cervello
  { from: 'f6', to: 'i4' },   // Corpo → Simboli
  { from: 'f7', to: 'c8' },   // Cervello → Autocoscienza
  { from: 'f8', to: 'c2' },   // Determinismo → Libero arbitrio
  { from: 'f9', to: 'f10' },  // Olismo → Riduzionismo
  { from: 'f10', to: 'f11' }, // Riduzionismo → Fisicalismo
  { from: 'f12', to: 'f13' }, // IA → LLM
  { from: 'f12', to: 'c10' }, // IA → Comprensione
  { from: 'f13', to: 'c9' },  // LLM → Significato
  { from: 'f14', to: 'i11' }, // Computer quantistico → Spazio di Hilbert
  { from: 'f15', to: 'f16' }, // Morte → NDE
  { from: 'f15', to: 'c5' },  // Morte → Seity
  { from: 'f16', to: 'f7' },  // NDE → Cervello
  { from: 'f17', to: 'c1' },  // Sogni → Qualia
  { from: 'f18', to: 'c14' }, // Meditazione → Risveglio
  { from: 'f18', to: 'c6' },  // Meditazione → Ego
];
