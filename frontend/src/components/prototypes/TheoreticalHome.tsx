'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CosmographyHero from '@/components/cosmography/CosmographyHero';

/**
 * PROTOTIPO 3: TEORETICO
 * Ispirato all'alberatura di Erica (struttura accademica/istituzionale)
 *
 * Filosofia: struttura enciclopedica navigabile. Indice concetti,
 * mappa relazioni, glossario. Il visitatore approfondisce.
 * Rigore scientifico, terminologia precisa.
 */

const CONCEPT_GROUPS = [
  {
    space: 'Coscienza',
    color: '#F5A623',
    icon: '◉',
    concepts: [
      {
        name: 'Uno',
        definition: 'La totalità di ciò che esiste. È dinamico, olistico e vuole conoscere se stesso. Genera le unità di coscienza (UC) come propri punti di vista.',
        implications: 'Permette di spiegare la fisica quantistica come conseguenza della coscienza, non viceversa.',
      },
      {
        name: 'Postulato dell\'Essere',
        definition: 'Il fondamento di Nousym: Uno è la totalità di ciò che esiste ed è dinamico, olistico e vuole conoscere se stesso.',
        implications: 'Autoevidente — l\'evidenza della coscienza proviene dalla coscienza stessa.',
      },
      {
        name: 'Qualia',
        definition: 'Le sensazioni e i sentimenti con cui la coscienza esperisce la conoscenza. Sono privati, non trasferibili e non clonabili — come gli stati quantistici puri.',
        implications: 'I computer non possono avere qualia perché sono sistemi classici il cui stato è riproducibile.',
      },
      {
        name: 'Libero arbitrio',
        definition: 'La capacità di Uno di dirigere la propria conoscenza di sé. Proprietà fondamentale irriducibile, intrinsecamente legata alla coscienza.',
        implications: 'Spiega il collasso della funzione d\'onda come decisione di una seity, non come processo random.',
      },
    ],
  },
  {
    space: 'Informazione',
    color: '#9B59B6',
    icon: '◈',
    concepts: [
      {
        name: 'Seity',
        definition: 'Campi quantistici autocoscienti con identità e agentività. Sono parti-intero di Uno: ciascuna ha le stesse caratteristiche del Tutto, ma ne è un punto di vista.',
        implications: 'La seity non è il corpo — è il campo quantistico che controlla il corpo.',
      },
      {
        name: 'Nousym',
        definition: 'Disciplina che unisce scienza e spiritualità. Da nous (intelletto) e sym (simbolo). Riconosce coscienza e libero arbitrio come proprietà primarie irriducibili.',
        implications: 'Unisce il "come" della scienza al "perché" della spiritualità.',
      },
      {
        name: 'Informazione quantistica',
        definition: 'L\'esperienza cosciente condivide le proprietà dell\'informazione quantistica: non-clonabilità, privacy, indeterminazione.',
        implications: 'Teoria QIP (con D\'Ariano): i qualia sono rappresentabili come stati puri dell\'informazione quantistica.',
      },
      {
        name: 'Entanglement',
        definition: 'Correlazioni non-locali tra sistemi quantistici. Rivela l\'esistenza di una realtà più profonda dove le seity sono interconnesse.',
        implications: 'Tutti i campi sono connessi attraverso Uno — l\'entanglement ne è la manifestazione fisica.',
      },
    ],
  },
  {
    space: 'Fisico',
    color: '#3498DB',
    icon: '◇',
    concepts: [
      {
        name: 'Spazio-tempo',
        definition: 'Non è la realtà fondamentale. Emerge dallo spazio-I (informazione) e dallo spazio-C (coscienza), che sono realtà più vaste.',
        implications: 'I calcoli del quantum computing avvengono fuori dallo spazio-tempo.',
      },
      {
        name: 'Materia',
        definition: 'Manifestazione esteriore di entità coscienti. Le particelle fisiche sono i simboli che le seity usano per comunicare.',
        implications: 'Il più non può venire dal meno: la coscienza non emerge dalla materia incosciente.',
      },
      {
        name: 'Fisica quantistica',
        definition: 'Le proprietà "strane" (indeterminazione, non-località, collasso) si spiegano partendo dalla coscienza come realtà fondamentale.',
        implications: 'Il collasso è dovuto al libero arbitrio, non a processi casuali.',
      },
      {
        name: 'Intelligenza Artificiale',
        definition: 'Programmi che compiono funzioni che normalmente richiedono intelligenza umana. Priva di coscienza, libero arbitrio e comprensione.',
        implications: 'L\'IA sta alla mente come l\'energia nucleare sta al corpo: potere immenso, etica necessaria.',
      },
    ],
  },
];

const GLOSSARY = [
  { term: 'UC', def: 'Unità di Coscienza — seity elementare, parte-intero di Uno' },
  { term: 'QIP', def: 'Quantum Information in Panpsychism — teoria di Faggin e D\'Ariano' },
  { term: 'Spazio-C', def: 'Realtà in cui esistono qualia, comprensione e significato' },
  { term: 'Spazio-I', def: 'Realtà dell\'informazione viva, rappresentabile nello spazio di Hilbert' },
  { term: 'Spazio-F', def: 'Realtà fisica, lo spazio-tempo della fisica classica' },
  { term: 'Nousym', def: 'Da nous + sym. Disciplina che unisce scienza e spiritualità' },
];

export default function TheoreticalHome() {
  const [selectedConcept, setSelectedConcept] = useState<{ name: string; definition: string; implications: string } | null>(null);
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO — Cosmography compact + titolo */}
      <section className="relative bg-dark overflow-hidden">
        <div className="h-[60vh] min-h-[500px]">
          <CosmographyHero />
        </div>
        {/* Overlay title */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/80 to-transparent p-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-3xl md:text-5xl text-white mb-3">
              Nousym: dove scienza e spiritualit&agrave; si uniscono
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Una nuova disciplina fondata sul postulato che la coscienza &egrave; fondamentale
              e irriducibile, e che esiste prima della materia.
            </p>
          </div>
        </div>
      </section>

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-8 h-14 overflow-x-auto">
          {CONCEPT_GROUPS.map((group) => (
            <a
              key={group.space}
              href={`#${group.space.toLowerCase()}`}
              className="flex items-center gap-2 text-sm font-medium whitespace-nowrap hover:text-primary transition-colors"
              style={{ color: group.color }}
            >
              <span>{group.icon}</span>
              {group.space}
            </a>
          ))}
          <button
            onClick={() => setShowGlossary(!showGlossary)}
            className="ml-auto text-sm text-text-light hover:text-primary transition-colors whitespace-nowrap"
          >
            {showGlossary ? 'Chiudi glossario' : 'Glossario'}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        {/* MAIN CONTENT */}
        <div className="flex-1 min-w-0">
          {/* Intro */}
          <div className="mb-16 max-w-3xl">
            <h2 className="font-heading text-2xl text-dark mb-4">Il quadro concettuale</h2>
            <p className="text-text leading-relaxed mb-4">
              Il modello di Faggin organizza la realt&agrave; in tre spazi ontologici concentrici:
              lo <strong>spazio della Coscienza</strong> (C), lo <strong>spazio dell&apos;Informazione</strong> (I)
              e lo <strong>spazio Fisico</strong> (F). La coscienza &egrave; il livello pi&ugrave; fondamentale;
              la materia &egrave; la manifestazione pi&ugrave; esterna.
            </p>
            <p className="text-text-light text-sm">
              Clicca su un concetto per approfondire. I concetti sono organizzati per spazio ontologico.
            </p>
          </div>

          {/* Concept groups */}
          {CONCEPT_GROUPS.map((group) => (
            <section key={group.space} id={group.space.toLowerCase()} className="mb-16 scroll-mt-20">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl" style={{ color: group.color }}>{group.icon}</span>
                <h2 className="font-heading text-2xl font-bold" style={{ color: group.color }}>
                  Spazio: {group.space}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.concepts.map((concept) => (
                  <button
                    key={concept.name}
                    onClick={() => setSelectedConcept(concept)}
                    className="text-left p-6 rounded-lg border border-border hover:border-current hover:shadow-md transition-all group"
                    style={{ '--tw-border-opacity': 0.3 } as any}
                  >
                    <h3 className="font-heading text-lg font-bold text-dark group-hover:text-primary transition-colors mb-2">
                      {concept.name}
                    </h3>
                    <p className="text-text-light text-sm leading-relaxed line-clamp-3">
                      {concept.definition}
                    </p>
                    <span className="inline-block mt-3 text-xs uppercase tracking-wider text-text-light group-hover:text-primary transition-colors">
                      Approfondisci &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}

          {/* Publications */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-dark mb-8">Pubblicazioni</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Silicio', year: '2019', type: 'Autobiografia', img: '/images/silicio.jpg' },
                { title: 'Irriducibile', year: '2022', type: 'Teoria', img: '/images/irriducibile.jpg' },
                { title: 'Oltre l\'Invisibile', year: '2024', type: 'Sintesi', img: '/images/oltre.jpg' },
              ].map((book) => (
                <div key={book.title} className="flex gap-4 p-4 rounded-lg border border-border">
                  <div className="relative w-20 shrink-0 aspect-[3/4] rounded overflow-hidden">
                    <Image src={book.img} alt={book.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark">{book.title}</h3>
                    <p className="text-text-light text-sm">{book.year} &middot; {book.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR — Glossary */}
        <AnimatePresence>
          {showGlossary && (
            <motion.aside
              className="hidden lg:block w-72 shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="sticky top-20 p-6 bg-bg-alt rounded-lg">
                <h3 className="font-heading text-lg font-bold text-dark mb-4">Glossario</h3>
                <dl className="space-y-3">
                  {GLOSSARY.map((item) => (
                    <div key={item.term}>
                      <dt className="font-mono text-sm font-bold text-primary">{item.term}</dt>
                      <dd className="text-text-light text-sm">{item.def}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* CONCEPT DETAIL MODAL */}
      <AnimatePresence>
        {selectedConcept && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedConcept(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-heading text-2xl font-bold text-dark mb-4">{selectedConcept.name}</h2>
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-text-light mb-2">Definizione</h4>
                <p className="text-text leading-relaxed">{selectedConcept.definition}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-text-light mb-2">Implicazioni</h4>
                <p className="text-text leading-relaxed">{selectedConcept.implications}</p>
              </div>
              <button
                onClick={() => setSelectedConcept(null)}
                className="text-sm text-text-light hover:text-primary transition-colors"
              >
                Chiudi
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
