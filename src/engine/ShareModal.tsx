import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Linkedin } from 'lucide-react';

interface ShareModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

type Tab = 'link' | 'embed' | 'social';

export default function ShareModal({ url, title, onClose }: ShareModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('link');
  const [linkCopied, setLinkCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const embedCode = `<iframe src="${url}" width="1280" height="720" frameborder="0" allowfullscreen></iframe>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    });
  };

  const shareOnX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out "' + title + '" — built with AutoDeck')}`
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    );
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'link', label: 'Link' },
    { id: 'embed', label: 'Embed' },
    { id: 'social', label: 'Social' },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-6 mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <h2 className="text-white font-semibold text-lg mb-4">Share this presentation</h2>

          {/* Tab buttons */}
          <div className="flex gap-2 mb-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Link tab */}
          {activeTab === 'link' && (
            <div className="space-y-3">
              <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-xs text-white/40 truncate">{url}</p>
              </div>
              <button
                data-testid="share-copy-url"
                onClick={copyLink}
                className="w-full py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
              >
                {linkCopied ? 'Copied ✓' : 'Copy Link'}
              </button>
            </div>
          )}

          {/* Embed tab */}
          {activeTab === 'embed' && (
            <div className="space-y-3">
              <textarea
                readOnly
                value={embedCode}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 resize-none h-20 focus:outline-none"
              />
              <button
                onClick={copyEmbed}
                className="w-full py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
              >
                {embedCopied ? 'Copied ✓' : 'Copy Embed'}
              </button>
              <p
                data-testid="share-embed-note"
                className="text-xs text-white/40 mt-2"
              >
                Note: Embedding requires the presentation to be deployed on a non-GitHub-Pages host (GitHub Pages restricts iframe embedding).
              </p>
            </div>
          )}

          {/* Social tab */}
          {activeTab === 'social' && (
            <div className="space-y-3">
              <button
                onClick={shareOnX}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
              >
                <Twitter size={16} />
                Share on X
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
              >
                <Linkedin size={16} />
                Share on LinkedIn
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
