import { motion } from 'framer-motion';
import { galleryConfig } from './galleryConfig';

export default function GallerySection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            8 Presentations
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            See It in Action
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every deck runs live. Click any card to explore.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryConfig.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden group cursor-pointer${entry.featured ? ' ring-2 ring-blue-500' : ''}`}
            >
              {/* 16:9 thumbnail */}
              <div className="aspect-[16/9] bg-slate-800 overflow-hidden relative">
                <img
                  src={`${import.meta.env.BASE_URL}thumbnails/${entry.thumbnail}`}
                  alt={`${entry.title} — ${entry.slideCount} slides`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'w-full h-full bg-slate-700 flex items-center justify-center';
                      const initials = entry.title.split(' ').slice(0, 2).map(w => w[0]).join('');
                      placeholder.innerHTML = `<span class="text-white/30 text-3xl font-bold">${initials}</span>`;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
                {entry.featured && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">★ Featured</span>
                )}
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{entry.title}</h3>
                <p className="text-white/40 text-xs mb-3">{entry.slideCount} slides</p>
                <a
                  href={entry.route}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
