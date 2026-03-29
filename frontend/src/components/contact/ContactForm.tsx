'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-white/70 mb-2">
          {t('name')}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-white/70 mb-2">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-white/30 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm text-white/70 mb-2">
          {t('type')}
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors"
        >
          <option value="general">{t('typeGeneral')}</option>
          <option value="academic">{t('typeAcademic')}</option>
          <option value="media">{t('typeMedia')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-white/70 mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-white/30 focus:outline-none transition-colors resize-y"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-white/10 px-8 py-3 text-white font-medium hover:bg-white/20 transition-colors"
      >
        {t('send')}
      </button>
    </form>
  );
}
