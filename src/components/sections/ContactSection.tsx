/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Contact & Project Inquiries Section for Raphics Digital Solutions.
 * "LET'S BUILD SOMETHING THAT MATTERS."
 * Features real working backend submission to /api/contact, persistent storage,
 * client & server validation, spam honeypot trap, optional budget ranges,
 * and direct email / WhatsApp links.
 */

import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import confetti from 'canvas-confetti';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    serviceRequired: 'Product Packaging & 3D Visualization',
    projectBudget: '', // Optional
    projectDescription: '',
    preferredContactMethod: 'Email',
    honeypot: '', // Hidden spam trap field
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation checks
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      setErrorMsg('Please describe your project scope (minimum 10 characters).');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit project inquiry.');
      }

      setSuccessData({
        inquiryId: result.inquiryId,
        message: result.message,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D51F16', '#ffffff', '#ff4d4d', '#222222'],
        });
      } catch {
        // Graceful fallback if restricted
      }

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        company: '',
        serviceRequired: 'Product Packaging & 3D Visualization',
        projectBudget: '',
        projectDescription: '',
        preferredContactMethod: 'Email',
        honeypot: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error submitting inquiry. Please email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#080808] border-t border-neutral-900 overflow-hidden">
      {/* Background Ambient Red Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-radial-red opacity-80 pointer-events-none blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>START A PROJECT OR INQUIRY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
            Let's Build Something <span className="text-[#D51F16]">That Matters.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Ready to design distinct product packaging, engineer custom business software, or deploy an AI system?
            Submit your project details below. All inquiries are saved to our persistent database and reviewed within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Agency Commitments (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Cards */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white">
                Direct Communication Channels
              </h3>

              {/* Email direct */}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/70 border border-neutral-850 hover:border-[#D51F16]/50 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#D51F16]/10 border border-[#D51F16]/20 text-[#D51F16]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-white">Agency Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D51F16] transition-colors" />
                  </div>
                  <p className="text-xs text-neutral-400 leading-tight">
                    Send RFPs, detailed briefs, NDAs, and project attachments.
                  </p>
                  <span className="text-[11px] font-mono text-neutral-300 block pt-1">
                    {BRAND_CONFIG.contact.email}
                  </span>
                </div>
              </a>

              {/* WhatsApp (only active if real number is configured) */}
              {BRAND_CONFIG.contact.whatsapp.isConfigured && BRAND_CONFIG.contact.whatsapp.whatsappUrl ? (
                <a
                  href={BRAND_CONFIG.contact.whatsapp.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/70 border border-neutral-850 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-white">WhatsApp Messaging</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-xs text-neutral-400 leading-tight">
                      Instant project triage and voice notes.
                    </p>
                    <span className="text-[11px] font-mono text-emerald-400 block pt-1">
                      {BRAND_CONFIG.contact.whatsapp.display}
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-400 space-y-1">
                  <span className="text-neutral-300 font-mono font-semibold block">Need immediate consultation?</span>
                  <p className="text-neutral-400 leading-relaxed">
                    Submit the discovery brief or email directly. Dedicated messaging lines are provided upon initial consultation.
                  </p>
                </div>
              )}

            </div>

            {/* Commitment Box */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
                <Clock className="w-4 h-4" />
                <span>WHAT HAPPENS NEXT?</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Review within 24 hours by agency leadership.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Clear project scope breakdown and transparent milestones.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mutual NDA signed prior to proprietary asset exchange upon request.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Persistent Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl relative">
            
            {successData ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Inquiry Recorded Successfully
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  {successData.message}
                </p>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 inline-block font-mono text-xs text-[#D51F16]">
                  Reference ID: {successData.inquiryId}
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSuccessData(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-xs text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Hidden Honeypot Spam Trap */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field blank</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                <div className="border-b border-neutral-850 pb-4 mb-2">
                  <h3 className="text-xl font-heading font-bold text-white">
                    Project Brief & Discovery Form
                  </h3>
                  <span className="text-xs text-neutral-400">
                    Inquiries are saved directly to persistent storage.
                  </span>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D51F16]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 block">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D51F16]"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 block">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Brand or company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D51F16]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 block">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D51F16]"
                    >
                      <option value="Product Packaging & 3D Visualization">
                        Product Packaging & 3D Visualization
                      </option>
                      <option value="Brand Identity & Logo Design">
                        Brand Identity & Logo Design
                      </option>
                      <option value="Website & Web Application Development">
                        Website & Web Application Development
                      </option>
                      <option value="Custom CRM & Business Software">
                        Custom CRM & Business Software
                      </option>
                      <option value="Enterprise AI Chatbot & RAG Systems">
                        Enterprise AI Chatbot & RAG Systems
                      </option>
                      <option value="AI Voice Agents & Automation">
                        AI Voice Agents & Automation
                      </option>
                      <option value="Multi-Discipline Creative & Tech Suite">
                        Multi-Discipline Creative & Tech Suite
                      </option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Budget (Optional) & Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 block">
                      Estimated Budget (Optional)
                    </label>
                    <select
                      value={formData.projectBudget}
                      onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D51F16]"
                    >
                      <option value="">Flexible / To Discuss</option>
                      <option value="$1,000 - $3,000">$1,000 &ndash; $3,000</option>
                      <option value="$3,000 - $7,500">$3,000 &ndash; $7,500</option>
                      <option value="$7,500 - $15,000">$7,500 &ndash; $15,000</option>
                      <option value="$15,000+">$15,000+</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 block">
                      Preferred Contact Method
                    </label>
                    <select
                      value={formData.preferredContactMethod}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredContactMethod: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#D51F16]"
                    >
                      <option value="Email">Email Communication</option>
                      <option value="Google Meet / Zoom">Video Call (Google Meet)</option>
                      <option value="WhatsApp">WhatsApp (if number provided)</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Project Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 block">
                    Project Scope & Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your design, packaging, software, or AI requirements, target timeline, or questions..."
                    value={formData.projectDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, projectDescription: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D51F16] leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      loading
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-[#D51F16] hover:bg-[#B81912] text-white shadow-[0_0_25px_rgba(213,31,22,0.4)] hover:shadow-[0_0_35px_rgba(213,31,22,0.6)]'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Recording Inquiry to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-400 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Confidentiality respected. We review all briefs under strict discretion.</span>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
