'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * PROTOTIPO 2: NARRATIVO
 * Ispirato a deepakchopra.com
 *
 * Filosofia: scroll verticale narrativo, il protagonista è Federico.
 * Racconto personale, foto, aneddoti, percorso dal microprocessore alla coscienza.
 * Il visitatore scorre una storia. Tono caldo, accessibile.
 */

const TIMELINE = [
  { year: '1941', text: 'Nasce a Vicenza. Da bambino vuole capire il perché di ogni cosa.', color: '#3498DB' },
  { year: '1971', text: 'Progetta l\'Intel 4004, il primo microprocessore al mondo.', color: '#3498DB' },
  { year: '1974', text: 'Fonda la Zilog, crea il leggendario Z80.', color: '#3498DB' },
  { year: '1986', text: 'Co-fonda Synaptics: nasce il touchpad.', color: '#3498DB' },
  { year: '1990', text: 'L\'esperienza del risveglio. Tutto cambia.', color: '#F5A623' },
  { year: '2011', text: 'Fonda la Federico and Elvia Faggin Foundation per lo studio della coscienza.', color: '#F5A623' },
  { year: '2019', text: 'Pubblica Silicio, la sua autobiografia.', color: '#9B59B6' },
  { year: '2022', text: 'Irriducibile: la teoria che la coscienza è fondamentale.', color: '#9B59B6' },
  { year: '2024', text: 'Oltre l\'Invisibile: dove scienza e spiritualità si uniscono.', color: '#9B59B6' },
];

const FEATURED_VIDEOS = [
  { id: 'IBt4oUCNl3U', title: 'Noi Siamo Campi Quantistici Auto-Coscienti' },
  { id: 'ssE4h70qKWk', title: 'Quantum Fields Are Conscious' },
  { id: '0FUFewGHLLg', title: 'QIP Explained' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8 },
};

export default function NarrativeHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO — Full-bleed portrait */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
        <div className="absolute inset-0 bg-dark">
          {/* Placeholder for Federico's portrait photo */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/10 text-9xl font-heading">FF</div>
          </div>
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-6 pb-16 md:pb-24">
          <motion.p
            className="text-white/50 text-sm uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Federico Faggin
          </motion.p>
          <motion.h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Dal microprocessore<br />
            alla coscienza
          </motion.h1>
          <motion.p
            className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            Ho cercato i segreti del mondo materiale e ho creato il primo microprocessore.
            Poi un&apos;esperienza straordinaria ha capovolto l&apos;orizzonte delle mie ricerche.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="animate-bounce opacity-40">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* QUOTE D'APERTURA */}
      <section className="py-24 px-6 bg-white">
        <motion.blockquote
          className="max-w-3xl mx-auto text-center"
          {...fadeUp}
        >
          <p className="font-heading text-2xl md:text-4xl text-dark italic leading-relaxed">
            &ldquo;Ricordo che, quand&apos;ero bambino, tutto mi riempiva di curiosit&agrave;.
            Volevo capire il perch&eacute; di ogni cosa.&rdquo;
          </p>
          <footer className="mt-6 text-text-light text-sm uppercase tracking-widest">
            Oltre l&apos;Invisibile, 2024
          </footer>
        </motion.blockquote>
      </section>

      {/* TIMELINE */}
      <section className="py-20 px-6 bg-bg-alt">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="font-heading text-3xl md:text-4xl text-dark text-center mb-16"
            {...fadeUp}
          >
            Un percorso straordinario
          </motion.h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative flex items-start mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white z-10"
                  style={{ backgroundColor: item.color }} />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <span className="font-heading text-2xl font-bold" style={{ color: item.color }}>
                    {item.year}
                  </span>
                  <p className="text-text mt-1 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IL RISVEGLIO — momento chiave */}
      <section className="py-24 px-6 text-white" style={{ background: 'linear-gradient(180deg, #1a0a2e 0%, #0a0a1a 100%)' }}>
        <motion.div className="max-w-3xl mx-auto text-center" {...fadeUp}>
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-8">
            Lago Tahoe, Natale 1990
          </p>
          <p className="font-heading text-2xl md:text-3xl italic leading-relaxed text-white/90 mb-8">
            &ldquo;Mi svegliai verso mezzanotte. Di punto in bianco sentii un fascio
            di energia potente sgorgare con forza dal mio petto. Era una luce bianca,
            scintillante, fatta di amore, gioia e pace.&rdquo;
          </p>
          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
            Quell&apos;esperienza cambi&ograve; tutto. Da quel momento, Federico dedic&ograve;
            la sua vita a comprendere la natura della coscienza &mdash; non come
            epifenomeno del cervello, ma come fondamento della realt&agrave;.
          </p>
        </motion.div>
      </section>

      {/* VIDEO SERIE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="font-heading text-3xl text-dark text-center mb-12" {...fadeUp}>
            Ascolta dalla sua voce
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_VIDEOS.map((video) => (
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                {...fadeUp}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-medium text-text group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRI */}
      <section className="py-20 px-6 bg-bg-alt">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="font-heading text-3xl text-dark text-center mb-4" {...fadeUp}>
            I libri
          </motion.h2>
          <motion.p className="text-text-light text-center mb-12 max-w-xl mx-auto" {...fadeUp}>
            Tre tappe di un percorso: dalla materia alla coscienza, dalla scienza alla spiritualit&agrave;.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Silicio', year: '2019', desc: 'L\'autobiografia. Dal bambino curioso di Vicenza all\'inventore della Silicon Valley.', img: '/images/silicio.jpg' },
              { title: 'Irriducibile', year: '2022', desc: 'La teoria. La coscienza è fondamentale e irriducibile, esiste prima della materia.', img: '/images/irriducibile.jpg' },
              { title: 'Oltre l\'Invisibile', year: '2024', desc: 'La sintesi. Dove scienza e spiritualità si uniscono in Nousym.', img: '/images/oltre.jpg' },
            ].map((book) => (
              <motion.div key={book.title} className="text-center" {...fadeUp}>
                <div className="relative w-40 mx-auto mb-6 aspect-[3/4] rounded shadow-lg overflow-hidden">
                  <Image src={book.img} alt={book.title} fill className="object-cover" />
                </div>
                <h3 className="font-heading text-xl font-bold text-dark">{book.title}</h3>
                <p className="text-text-light text-sm mt-1 mb-3">{book.year}</p>
                <p className="text-text text-sm leading-relaxed">{book.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MESSAGGIO FINALE */}
      <section className="py-24 px-6 bg-dark text-white text-center">
        <motion.div className="max-w-2xl mx-auto" {...fadeUp}>
          <p className="font-heading text-3xl md:text-4xl italic leading-relaxed mb-8">
            &ldquo;Il mio messaggio &egrave; ottimista, ma richiede che ciascuno di noi
            affronti la situazione con intelligenza, buon senso e impegno,
            perch&eacute; la soluzione pu&ograve; venire solo da dentro.&rdquo;
          </p>
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Federico Faggin
          </p>
        </motion.div>
      </section>
    </div>
  );
}
