import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

type FormState = {
  name: string;
  phone: string;
  email: string;
  preferredCountry: string;
  visaType: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  preferredCountry: '',
  visaType: '',
  message: '',
};

const countryOptions = ['Albania', 'Australia', 'Azerbaijan', 'Canada', 'Germany', 'Malta', 'New Zealand', 'Poland', 'United Kingdom', 'United States', 'UAE', 'Other'];
const visaOptions = ['Work Visa Guidance', 'Visitor / Tourist Visa', 'Study Visa', 'Overseas Career Guidance', 'SOP Writing', 'Documentation Support', 'Sponsor / Invitation Letter', 'TRC Guidance'];

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (searchParams.get('service') === 'eligibility-check') {
      setFormData((current) => ({ ...current, message: 'I would like a profile assessment. Please contact me to discuss suitable visa or overseas career options.' }));
    }
  }, [searchParams]);

  const updateField = (field: keyof FormState, value: string) => setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const body = new URLSearchParams({
      'form-name': 'profile-assessment',
      ...formData,
    }).toString();

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!response.ok) throw new Error('Form submission failed');
      setStatus('success');
      setFormData(initialForm);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page pb-10">
      <section className="overflow-hidden rounded-[2rem] bg-[#07182e] px-5 py-14 text-white sm:px-10 lg:px-14 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="eyebrow text-[#e4c47e]">Start a conversation</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Let’s understand your goal first.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Tell us your preferred country and visa category. Our team will review your enquiry and guide you toward a practical next step.</p>
        </motion.div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.35fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#0b1f3a]">Contact information</h2>
            <div className="mt-6 space-y-5">
              <a href="tel:01723196794" className="contact-detail"><span className="contact-icon"><Phone size={20} /></span><span><strong>Call us</strong><small>0172 319 6794</small></span></a>
              <a href="mailto:info@thevisafox.com" className="contact-detail"><span className="contact-icon"><Mail size={20} /></span><span><strong>Email</strong><small>info@thevisafox.com</small></span></a>
              <a href="https://maps.google.com/?q=SCO+103,+Phase+7,+Mohali,+Punjab" target="_blank" rel="noreferrer" className="contact-detail"><span className="contact-icon"><MapPin size={20} /></span><span><strong>Office</strong><small>SCO 103, Phase 7, Mohali, Punjab</small></span></a>
              <div className="contact-detail"><span className="contact-icon"><Clock size={20} /></span><span><strong>Working hours</strong><small>Monday–Saturday, 9:00 AM–6:00 PM</small></span></div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#f7f1e5] p-6">
            <MessageCircle className="text-[#8f1633]" size={28} />
            <h2 className="mt-4 text-xl font-extrabold text-[#0b1f3a]">Prefer a direct conversation?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use WhatsApp for a quick enquiry or call the office during working hours.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href="https://wa.me/911723196794?text=Hello%20The%20Visa%20Fox%2C%20I%20would%20like%20visa%20guidance." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#178a50] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#117342]"><MessageCircle size={18} /> WhatsApp</a>
              <a href="tel:01723196794" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#102b4e]"><Phone size={18} /> Call now</a>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
          {status === 'success' ? (
            <div className="flex min-h-[540px] flex-col items-center justify-center text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle size={32} /></span>
              <h2 className="mt-6 text-2xl font-black text-[#0b1f3a]">Your enquiry has been received.</h2>
              <p className="mt-3 max-w-md leading-7 text-slate-600">Thank you for sharing your details. Our team will review the enquiry and contact you using the information provided.</p>
              <button type="button" onClick={() => setStatus('idle')} className="button-primary mt-7">Send another enquiry <ArrowRight size={18} /></button>
            </div>
          ) : (
            <>
              <div>
                <span className="eyebrow">Free profile assessment</span>
                <h2 className="mt-3 text-2xl font-black text-[#0b1f3a] sm:text-3xl">Tell us about your requirement</h2>
                <p className="mt-3 leading-7 text-slate-600">Fields marked with * are required.</p>
              </div>

              <form name="profile-assessment" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="mt-8 space-y-5">
                <input type="hidden" name="form-name" value="profile-assessment" />
                <p className="hidden"><label>Do not fill this out: <input name="bot-field" /></label></p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="form-field">Full name *<input name="name" required autoComplete="name" value={formData.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your full name" /></label>
                  <label className="form-field">Phone number *<input name="phone" type="tel" required autoComplete="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="Your phone number" /></label>
                </div>
                <label className="form-field">Email address *<input name="email" type="email" required autoComplete="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" /></label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="form-field">Preferred country *<select name="preferredCountry" required value={formData.preferredCountry} onChange={(event) => updateField('preferredCountry', event.target.value)}><option value="">Select country</option>{countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
                  <label className="form-field">Visa type *<select name="visaType" required value={formData.visaType} onChange={(event) => updateField('visaType', event.target.value)}><option value="">Select service</option>{visaOptions.map((visa) => <option key={visa} value={visa}>{visa}</option>)}</select></label>
                </div>
                <label className="form-field">Message *<textarea name="message" required rows={5} value={formData.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Share your profile, preferred country and main question." /></label>

                {status === 'error' && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700" role="alert">We could not submit your enquiry right now. Please try again, call us, or use WhatsApp.</div>}

                <button type="submit" disabled={status === 'submitting'} className="button-primary w-full justify-center py-4">
                  {status === 'submitting' ? 'Sending enquiry…' : <><Send size={18} /> Submit enquiry</>}
                </button>
                <p className="text-xs leading-5 text-slate-500">Submitting this form does not guarantee a visa or immigration outcome. Decisions are made by the relevant authority.</p>
              </form>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
