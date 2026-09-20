import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEO
        title="Contact Community Support"
        description="Have questions about listing equipment or requesting rentals? Contact the LendKart support team."
      />

      <div className="max-w-2xl space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-900/20 px-3 py-1 rounded-full">
          <MessageSquare className="w-3.5 h-3.5" />
          Community Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-charcoal-900 dark:text-sand-100">
          Get in Touch with LendKart
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
          Our team is here to assist with lender onboarding, deposit questions, or platform partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] shadow-soft-sm space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-serif text-charcoal-900 dark:text-sand-100">Headquarters & Support</h3>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Available 7 days a week, 9:00 AM – 9:00 PM IST for gear verification, deposit refunds, and neighborhood booking support.
            </p>
          </div>

          <div className="space-y-3 text-xs text-charcoal-700 dark:text-sand-200">
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-200 dark:border-[#1E332B]">
              <div className="w-9 h-9 rounded-lg bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-bold uppercase tracking-wider">Email Support</div>
                <div className="font-semibold text-charcoal-900 dark:text-sand-100">support@lendkart.demo</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-200 dark:border-[#1E332B]">
              <div className="w-9 h-9 rounded-lg bg-sage-100 dark:bg-forest-900/30 text-forest-800 dark:text-sage-300 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-bold uppercase tracking-wider">Helpline</div>
                <div className="font-semibold text-charcoal-900 dark:text-sand-100">+91 (020) 2567-8900</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-200 dark:border-[#1E332B]">
              <div className="w-9 h-9 rounded-lg bg-terracotta-500/10 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-bold uppercase tracking-wider">Hub Office</div>
                <div className="font-semibold text-charcoal-900 dark:text-sand-100">Kothrud Tech Center, Pune 411038</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] shadow-soft-sm">
          {isSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-forest-600 dark:text-forest-400 mx-auto" />
              <h3 className="text-xl font-bold font-serif text-charcoal-900 dark:text-sand-100">Inquiry Received!</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300 max-w-sm mx-auto">
                Thank you for reaching out. A community specialist will respond to your email within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Lender verification inquiry"
                  className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md" className="shadow-soft-sm">
                  <Send className="w-4 h-4 mr-1.5" />
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
