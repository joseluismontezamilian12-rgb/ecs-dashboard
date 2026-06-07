import { useState } from 'react';
import { Radio, Binary, Sliders } from 'lucide-react';

export default function App() {
    const [engineActive, setEngineActive] = useState(false);

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-100 antialiased relative overflow-hidden p-6 md:p-12">
            <div className="absolute inset-0 grid-mesh opacity-40 pointer-events-none z-0" />
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md px-6 py-3 flex justify-between items-center text-[11px] font-mono tracking-widest text-zinc-500 rounded-t-xl relative z-10">
                <div className="flex items-center gap-4">
                    <span>CORE://MONTEZA_MILIAN.ENGINE</span>
                    <span className="text-zinc-800">|</span>
                    <span className="flex items-center gap-1 text-cyan-500"><Radio size={12} className="animate-pulse" /> WASM_NODE: READY</span>
                </div>
                <div className="hidden md:block">SYS_STATUS: 0x00FF00</div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10">
                <section className="lg:col-span-4 border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-mono tracking-[0.3em] text-indigo-400 uppercase block mb-2">Systems Architect</span>
                        <h1 className="text-4xl font-light tracking-tight text-white leading-none mb-6">
                            José Luis <br />
                            <span className="font-semibold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Monteza Milian</span>
                        </h1>
                        <p className="text-zinc-400 text-xs font-mono leading-relaxed border-l-2 border-zinc-800 pl-4">
                            C# High-Performance Computing Core enfocado en el mapeo de memoria contigua y optimización de cach&eacute;.
                        </p>
                    </div>

                    <div className="mt-12 space-y-3 font-mono text-[11px] text-zinc-400">
                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                            <span>Stack:</span> <span className="text-white">C# / .NET 10</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Memory Engine:</span> <span className="text-cyan-400">Zero-Allocation</span>
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-8 bg-zinc-950/20 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                            <h3 className="text-xs font-mono tracking-wider text-zinc-300">ECS CORE MONITOR</h3>
                        </div>
                    </div>

                    <div className="bg-black/90 rounded-xl border border-zinc-900 aspect-video relative flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none" />

                        {!engineActive ? (
                            <button
                                onClick={() => setEngineActive(true)}
                                className="bg-white text-zinc-950 hover:bg-cyan-400 px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-xl active:scale-95 z-10"
                            >
                                Initialize Core Benchmark
                            </button>
                        ) : (
                            <div className="w-full h-full p-6 font-mono text-[11px] text-cyan-400 flex flex-col justify-between z-10">
                                <div className="flex justify-between border-b border-zinc-900 pb-2">
                                    <span className="flex items-center gap-1"><Sliders size={12} /> ITERATION: ACTIVE</span>
                                    <span className="text-zinc-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/50">ALLOC: 0.00 Bytes</span>
                                </div>
                                <div className="text-center my-auto space-y-1">
                                    <Binary size={24} className="mx-auto text-cyan-500/30 mb-2" />
                                    <div className="text-white font-bold text-sm tracking-widest">[ CORE RUNNING AT 60 HZ ]</div>
                                    <div className="text-zinc-500 text-[10px]">Processing 300 Dense-Sparse Pools Sequentially</div>
                                </div>
                                <div className="grid grid-cols-2 text-[10px] text-zinc-500">
                                    <div>CPU_CACHE: OPTIMIZED</div>
                                    <div className="text-right text-indigo-400">RENDER: NATIVE_CANVAS</div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}