import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="flex min-h-[72vh] items-center border-t border-white/10 bg-[#080808] py-24">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">404 · Page not found</p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">That page has moved on.</h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400">The address may be out of date. Visit the main sections or get in touch with the studio.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 bg-[#D51F16] px-5 py-3 text-sm text-white hover:bg-[#B81912]"><ArrowLeft className="h-4 w-4" /> Home</button>
          <button onClick={() => navigate('/work')} className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm text-neutral-200 hover:border-[#D51F16]">Work <ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => navigate('/services')} className="border border-white/15 px-5 py-3 text-sm text-neutral-200 hover:border-[#D51F16]">Services</button>
          <button onClick={() => navigate('/contact')} className="border border-white/15 px-5 py-3 text-sm text-neutral-200 hover:border-[#D51F16]">Contact</button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
