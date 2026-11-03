/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI & Automation Lab Section for Raphics Digital Solutions.
 * "BUILD SMARTER. WORK INTELLIGENTLY."
 * Features 3D neural node graph, production vs prototype distinctions,
 * and an interactive RAG semantic query simulation.
 */

import React, { useState } from 'react';
import { AI_SERVICES } from '../../data/services';
import { NeuralNodeScene } from '../3d/NeuralNodeScene';
import { Cpu, Terminal, ArrowUpRight, Search, FileText, CheckCircle2, Zap, Layers } from 'lucide-react';

export const AILabSection: React.FC = () => {
  const [activeSimulationStep, setActiveSimulationStep] = useState<number>(0);
  const [simulatedQuery, setSimulatedQuery] = useState('How does Raphics structure custom RAG data ingestion?');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveSimulationStep(1);
    setTimeout(() => setActiveSimulationStep(2), 700);
    setTimeout(() => setActiveSimulationStep(3), 1500);
    setTimeout(() => {
      setActiveSimulationStep(4);
      setIsSimulating(false);
    }, 2300);
  };

  return (
    <section id="ai-lab" className="relative py-28 bg-[#080808] border-t border-neutral-900 overflow-hidden">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#D51F16]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>04 // AI & AUTOMATION LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
            Build Smarter. <span className="text-[#D51F16]">Work Intelligently.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            We architect pragmatic artificial intelligence systems that replace manual toil with verified accuracy.
            From private Retrieval-Augmented Generation (RAG) knowledge vaults to autonomous task agents and
            sub-second conversational voice bots.
          </p>
        </div>

        {/* 3D Neural Visualization & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Interactive 3D Neural Node Graph (6 cols) */}
          <div className="lg:col-span-6">
            <NeuralNodeScene />
          </div>

          {/* Right Column: Key AI Solutions & Architecture Status (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
                <span className="text-xs font-mono text-neutral-400">STATUS CLASSIFICATION</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono">
                  PRODUCTION READY
                </span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white">
                Zero Hallucination Enterprise RAG Systems
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                We implement semantic chunking pipelines that vectorize your corporate policy handbooks,
                product catalogs, and software docs. Every single answer includes verbatim source citations
                with exact page numbers and verifiable excerpt confidence scores.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-400 pt-2">
                <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white block font-bold">Vector Ingestion</span>
                  <span className="text-[11px] text-neutral-400">PDF, Markdown, SQL</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white block font-bold">Context Grounding</span>
                  <span className="text-[11px] text-neutral-400">Strict Source Filtering</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
                <span className="text-xs font-mono text-neutral-400">RESEARCH & ADVANCED EXPERIMENTS</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono">
                  PROTOTYPE & OPEN SOURCE
                </span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white">
                Autonomous Agentic Loops & Low-Latency Voice
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Our active research repositories (e.g. <code>pixelcraft-ai-agent</code>, <code>nova-voice-agent</code>)
                test the frontiers of multi-turn tool calling, automated graphic rendering, and human interruption
                in conversational telephony.
              </p>
            </div>

          </div>

        </div>

        {/* Interactive Live Simulation: How Raphics Processes RAG Knowledge */}
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-850">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
                <Terminal className="w-4 h-4" />
                <span>INTERACTIVE RAG PIPELINE DEMONSTRATION</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mt-1">
                Semantic Ingestion & Verified Retrieval Architecture
              </h3>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                isSimulating
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#D51F16] text-white hover:bg-[#B81912] shadow-[0_0_15px_rgba(213,31,22,0.4)] cursor-pointer'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Simulating Pipeline...' : 'Run Pipeline Simulation'}</span>
            </button>
          </div>

          {/* Pipeline Flow Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                activeSimulationStep >= 1
                  ? 'bg-neutral-900/90 border-[#D51F16] shadow-[0_0_15px_rgba(213,31,22,0.2)]'
                  : 'bg-neutral-950/60 border-neutral-850 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#D51F16]">STAGE 01</span>
                {activeSimulationStep >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h4 className="text-sm font-heading font-bold text-white mb-1">
                Document Parsing
              </h4>
              <p className="text-xs text-neutral-400">
                Recursive text extraction across PDF/DOCX with semantic header chunking.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                activeSimulationStep >= 2
                  ? 'bg-neutral-900/90 border-[#D51F16] shadow-[0_0_15px_rgba(213,31,22,0.2)]'
                  : 'bg-neutral-950/60 border-neutral-850 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#D51F16]">STAGE 02</span>
                {activeSimulationStep >= 2 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h4 className="text-sm font-heading font-bold text-white mb-1">
                Vector Embedding
              </h4>
              <p className="text-xs text-neutral-400">
                768-dim mathematical indexing stored in pgvector with HNSW similarity trees.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                activeSimulationStep >= 3
                  ? 'bg-neutral-900/90 border-[#D51F16] shadow-[0_0_15px_rgba(213,31,22,0.2)]'
                  : 'bg-neutral-950/60 border-neutral-850 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#D51F16]">STAGE 03</span>
                {activeSimulationStep >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h4 className="text-sm font-heading font-bold text-white mb-1">
                Semantic Reranking
              </h4>
              <p className="text-xs text-neutral-400">
                Cross-encoder filters top 3 most relevant factual snippets, discarding noise.
              </p>
            </div>

            {/* Step 4 */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                activeSimulationStep >= 4
                  ? 'bg-neutral-900/90 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-neutral-950/60 border-neutral-850 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-emerald-400">STAGE 04</span>
                {activeSimulationStep >= 4 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h4 className="text-sm font-heading font-bold text-white mb-1">
                Cited Synthesis
              </h4>
              <p className="text-xs text-neutral-400">
                Ground-truth answer delivered with verified clickable reference tokens.
              </p>
            </div>

          </div>

          {/* Interactive Simulated Response Card */}
          {activeSimulationStep >= 4 && (
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-emerald-500/40 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulated Output [Confidence: 99.4%]</span>
              </div>
              <p className="text-neutral-200 leading-relaxed">
                "Raphics Digital Solutions ingests unstructured enterprise records via recursive semantic chunking, creates cosine similarity embeddings, and injects verified context into high-speed LLM pipelines with strict guardrails [Doc Ref: RDS-Knowledge-Arch-v2.pdf, p.14]."
              </p>
            </div>
          )}
        </div>

        {/* AI Services Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#D51F16]/10 border border-[#D51F16]/20 flex items-center justify-center text-[#D51F16]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  {srv.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D51F16]/20 text-[#D51F16] border border-[#D51F16]/40 text-[10px] font-mono">
                      CORE CAPABILITY
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors">
                  {srv.name}
                </h4>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {srv.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-900 space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Tech & Integration:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {srv.toolsAndTech?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AILabSection;
