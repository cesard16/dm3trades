'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useLanguage } from '@/lib/i18n'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus('idle')

    try {
      const validated = contactSchema.parse(formData)
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof ContactFormData] = language === 'es' 
              ? error.message.replace('must be', 'debe tener').replace('at least', 'al menos')
              : error.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const getErrorMessage = (key: keyof ContactFormData) => {
    const msg = errors[key]
    if (!msg) return ''
    if (language === 'es') {
      return msg.replace('must be', 'debe tener').replace('at least', 'al menos')
    }
    return msg
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <div className="bg-success/10 border border-success/30 rounded-lg p-4 text-success">
          {t('form.success')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-4 text-error">
          {t('form.error')}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
          {t('form.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder={t('form.namePlaceholder')}
        />
        {errors.name && <p className="mt-1 text-sm text-error">{getErrorMessage('name')}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
          {t('form.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder={t('form.emailPlaceholder')}
        />
        {errors.email && <p className="mt-1 text-sm text-error">{getErrorMessage('email')}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
          {t('form.subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder={t('form.subjectPlaceholder')}
        />
        {errors.subject && <p className="mt-1 text-sm text-error">{getErrorMessage('subject')}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
          {t('form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          placeholder={t('form.messagePlaceholder')}
        />
        {errors.message && <p className="mt-1 text-sm text-error">{getErrorMessage('message')}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-primary font-semibold py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('form.sending') : t('form.send')}
      </button>
    </form>
  )
}
