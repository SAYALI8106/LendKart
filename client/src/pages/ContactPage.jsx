import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Sparkles } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SEO
        title="Contact Community Support — LendKart"
        description="Have questions about listing equipment or requesting rentals? Contact the LendKart support team."
      />

      <div className="max-w-2xl space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
          <MessageSquare className="w-3.5 h-3.5 text-[#C96F52]" />
          <span>Community Concierge</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
          Get in Touch with LendKart
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5]">
          Our team is here to assist with lender onboarding, deposit questions, or platform partnerships across Pune & Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-3xl border border-[#E5E0D2] dark:border-white/10 shadow-soft-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">Headquarters & Support</h3>
            <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
              Available 7 days a week, 9:00 AM – 9:00 PM IST for gear verification, deposit refunds, and neighborhood booking support.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F7F4EC] dark:bg-[#0E1714] border border-[#E5E0D2] dark:border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#176B52]/10 dark:bg-[#176B52]/20 text-[#176B52] dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Support</div>
                <a href="mailto:support@lendkart.demo" className="font-semibold text-slate-900 dark:text-white hover:text-[#176B52]">
                  support@lendkart.demo
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F7F4EC] dark:bg-[#0E1714] border border-[#E5E0D2] dark:border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#176B52]/10 dark:bg-[#176B52]/20 text-[#176B52] dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phone / WhatsApp</div>
                <span className="font-semibold text-slate-900 dark:text-white">+91 98230 11223</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F7F4EC] dark:bg-[#0E1714] border border-[#E5E0D2] dark:border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#176B52]/10 dark:bg-[#176B52]/20 text-[#176B52] dark:text-emerald-300 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">City Hubs</div>
                <span className="font-semibold text-slate-900 dark:text-white">Pune, Mumbai & Bengaluru</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-3xl border border-[#E5E0D2] dark:border-white/10 shadow-soft-sm">
          {isSent ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Message Dispatched</h3>
              <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
                Thank you! Our community concierge will get back to your email within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Tanvi Gaikwad"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-[#F7F4EC] dark:bg-[#0E1714] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-[#F7F4EC] dark:bg-[#0E1714] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="e.g. Question regarding projector deposit"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-[#F7F4EC] dark:bg-[#0E1714] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="How can we help you?"
                  className="w-full p-4 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-[#F7F4EC] dark:bg-[#0E1714] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full !rounded-xl !bg-[#176B52] font-bold"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
