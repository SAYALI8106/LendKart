import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
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
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">
          Community Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Get in Touch with LendKart
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Our team is here to assist with lender onboarding, deposit questions, or platform partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Headquarters & Support</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Available 7 days a week, 9:00 AM – 9:00 PM IST for gear verification and booking support.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <Mail className="w-5 h-5 text-brand-primary shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Email Support</div>
                <div className="font-semibold text-white">support@lendkart.demo</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <Phone className="w-5 h-5 text-brand-secondary shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Helpline</div>
                <div className="font-semibold text-white">+91 (020) 2567-8900</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Hub Office</div>
                <div className="font-semibold text-white">Kothrud Tech Center, Pune 411038</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
          {isSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold font-display text-white">Inquiry Received!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out. A community specialist will respond to your email within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Lender verification inquiry"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md">
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
