import React from 'react';

type LegalProps = { type: 'privacy' | 'terms' };

const Legal: React.FC<LegalProps> = ({ type }) => {
  const privacy = type === 'privacy';
  return (
    <article className="legal-page mx-auto max-w-4xl pb-10">
      <header className="rounded-[2rem] bg-[#07182e] px-6 py-12 text-white sm:px-10">
        <span className="eyebrow text-[#e4c47e]">The Visa Fox</span>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{privacy ? 'Privacy Policy' : 'Terms of Use'}</h1>
        <p className="mt-4 leading-7 text-slate-300">Last updated: 2 September 2026</p>
      </header>
      <div className="prose-content mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {privacy ? (
          <>
            <h2>Information we collect</h2><p>We may collect the information you submit through our enquiry forms, including your name, contact details, preferred country, visa category and message.</p>
            <h2>How information is used</h2><p>Submitted information is used to review enquiries, contact applicants, provide requested guidance and improve our services. Please do not submit sensitive original documents through the general contact form.</p>
            <h2>Third-party services</h2><p>This website may use hosting, analytics, mapping, email or communication services. These providers may process limited information required to operate those services.</p>
            <h2>Your choices</h2><p>You may contact us to request correction or deletion of information previously submitted, subject to applicable record-keeping requirements.</p>
            <h2>Contact</h2><p>Privacy enquiries can be sent to info@thevisafox.com or discussed by calling 0172 319 6794.</p>
          </>
        ) : (
          <>
            <h2>Informational purpose</h2><p>Website content is general guidance and does not constitute a visa guarantee, legal advice or a decision by any embassy, consulate or immigration authority.</p>
            <h2>Applicant responsibility</h2><p>Applicants are responsible for supplying accurate, complete and genuine information and for reviewing documents before submission.</p>
            <h2>Authority decisions</h2><p>Visa approvals, refusals, processing times and immigration decisions remain solely with the relevant authority. Requirements may change without notice.</p>
            <h2>Website tools</h2><p>Checklists, SOP tools and other website resources are provided as preparation aids. Users should verify current requirements through official sources.</p>
            <h2>Contact</h2><p>Questions about these terms may be sent to info@thevisafox.com.</p>
          </>
        )}
      </div>
    </article>
  );
};

export default Legal;
