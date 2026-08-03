import React, { useEffect, useRef, useState } from 'react';

export default function App() {
    const canvasRef = useRef(null);
    const [iteration, setIteration] = useState(0);
    const [allocBytes, setAllocBytes] = useState('0.00 bytes');

    // 1. Simulación de Telemetría Dinámica (Fluctuación de memoria y ciclos)
    useEffect(() => {
        const metricsInterval = setInterval(() => {
            // Incrementa los ciclos/ticks del sistema linealmente
            setIteration((prev) => prev + 1);

            // Simula asignaciones de memoria contigua fluctuando entre 12.4 KB y 16.8 KB
            const baseMemory = 12.4 * 1024;
            const jitter = Math.sin(Date.now() / 200) * 4.2 * 1024;
            const totalBytes = baseMemory + jitter;

            if (totalBytes > 1024) {
                setAllocBytes(`${(totalBytes / 1024).toFixed(2)} KB`);
            } else {
                setAllocBytes(`${totalBytes.toFixed(0)} bytes`);
            }
        }, 16.67); // Sincronizado a ~60 ejecuciones por segundo

        return () => clearInterval(metricsInterval);
    }, []);

    // 2. Motor Gráfico en Canvas: Renderizado de Piscinas de Entidades ECS
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configurar tamaño fijo del canvas basado en su contenedor
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Inicializar 150 entidades distribuidas en memoria secuencial
        const entities = [];
        for (let i = 0; i < 150; i++) {
            entities.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 1.5 + 0.5,
                pulseOffset: Math.random() * Math.PI
            });
        }

        // Bucle principal de renderizado nativo a 60 FPS
        const render = () => {
            // Limpieza con rastro sutil de barrido (efecto radar/fósforo)
            ctx.fillStyle = 'rgba(3, 3, 3, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Dibujar líneas de cuadrícula de telemetría muy tenues
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.02)';
            ctx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            // Procesamiento secuencial de bloques de entidades
            entities.forEach((entity, idx) => {
                // Actualizar posiciones lineales
                entity.x += entity.speedX;
                entity.y += entity.speedY;

                // Rebotar en los límites del búfer del monitor
                if (entity.x < 0 || entity.x > canvas.width) entity.speedX *= -1;
                if (entity.y < 0 || entity.y > canvas.height) entity.speedY *= -1;

                // Renderizar nodo cian
                const alpha = 0.2 + Math.abs(Math.sin((Date.now() / 400) + entity.pulseOffset)) * 0.6;
                ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
                ctx.beginPath();
                ctx.arc(entity.x, entity.y, entity.size, 0, Math.PI * 2);
                ctx.fill();

                // Conectar nodos cercanos secuencialmente para simular mapeo de proximidad contiguo
                if (idx > 0 && idx % 12 === 0) {
                    ctx.strokeStyle = 'rgba(129, 140, 248, 0.08)';
                    ctx.beginPath();
                    ctx.moveTo(entity.x, entity.y);
                    ctx.lineTo(entities[idx - 1].x, entities[idx - 1].y);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Reajustar dimensiones si cambia el tamaño de la ventana
        const handleResize = () => {
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-100 p-4 md:p-12 font-sans selection:bg-cyan-500/20 flex flex-col justify-between relative overflow-hidden">

            {/* Malla técnica de fondo */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, #000 60%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, #000 60%, transparent 100%)'
                }}
            />

            {/* TOP_BAR: Estado Global del Sistema */}
            <header className="mono text-[10px] tracking-[0.2em] text-zinc-500 flex justify-between border-b border-zinc-900 pb-4 relative z-10">
                <div>CORE://MONTEZA_MILIAN. MOTOR &nbsp;|&nbsp; <span className="text-emerald-400">● SIM_NODE: ACTIVO</span></div>
                <div className="hidden sm:block">SYS_STATUS: <span className="text-indigo-400">0x0BFF8B</span></div>
            </header>

            {/* REJILLA BENTO PRINCIPAL */}
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto relative z-10 py-8 items-stretch">

                {/* COLUMNA IZQUIERDA: Identidad e Info Técnica */}
                <div className="lg:col-span-4 flex flex-col justify-between py-2">
                    <div>
                        <span className="mono text-xs uppercase tracking-[0.3em] text-indigo-400 font-medium block mb-2">Full-Stack Developer</span>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
                            José Luis <br />
                            <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent font-medium">Monteza Milian</span>
                        </h1>
                        <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed max-w-sm mb-8">
                            Monitor visual de un núcleo ECS simulado: telemetría en tiempo real y renderizado nativo en canvas a 60 FPS.
                        </p>
                    </div>

                    <div className="border-t border-zinc-900 pt-6 space-y-4 mono text-[11px] uppercase tracking-wider">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-600">Stack:</span>
                            <span className="text-zinc-300 font-medium">React 19 + Canvas API</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-600">Telemetría:</span>
                            <span className="text-cyan-400 font-medium">Simulada · 60 Hz</span>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: El Monitor ECS Vivo */}
                <div className="lg:col-span-8 bg-zinc-950/40 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between min-h-[420px] md:min-h-[480px]">

                    {/* Cabecera del Panel */}
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <h2 className="mono text-xs uppercase tracking-widest text-zinc-300 font-bold">Monitor de Núcleo ECS</h2>
                        </div>
                        <div className="mono text-[11px] text-right">
                            <span className="text-zinc-600 block sm:inline">ALLOC: </span>
                            <span className="text-emerald-400 font-mono font-medium">{allocBytes}</span>
                        </div>
                    </div>

                    {/* 🖥️ PANTALLA CENTRAL: CANVAS INTERACTIVO DE PARTÍCULAS */}
                    <div className="flex-1 bg-[#030303] border border-zinc-900 rounded-xl relative overflow-hidden group min-h-[260px] flex items-center justify-center">

                        {/* El Lienzo de Dibujo */}
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

                        {/* Efecto Scanline clásico de monitor */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-30"
                            style={{
                                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                                backgroundSize: '100% 4px, 6px 100%'
                            }}
                        />

                        {/* Texto Flotante de Estado en el Centro */}
                        <div className="relative z-10 text-center pointer-events-none bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-900/60 max-w-[85%]">
                            <div className="mono text-[10px] tracking-[0.2em] text-cyan-500 font-medium mb-1.5 animate-pulse">
                                ⚙️ ITERACIÓN: #{iteration}
                            </div>
                            <h3 className="mono text-xs uppercase tracking-[0.15em] text-white font-medium mb-1">
                                [ NÚCLEO FUNCIONANDO A 60 HZ ]
                            </h3>
                            <p className="text-[11px] text-zinc-500 font-light max-w-xs mx-auto">
                                Renderizado de 150 entidades con enlaces de proximidad.
                            </p>
                        </div>
                    </div>

                    {/* Pie del Panel */}
                    <div className="flex justify-between items-center border-t border-zinc-900 pt-4 mt-4 mono text-[10px] text-zinc-600 tracking-wider">
                        <div>FRAME_TIME: <span className="text-zinc-400">~16.6 MS</span></div>
                        <div>RENDER: <span className="text-indigo-400">NATIVE_CANVAS</span></div>
                    </div>

                </div>

            </main>

            {/* FOOTER METADATA */}
            <footer className="mono text-[9px] text-zinc-700 text-center border-t border-zinc-950 pt-4 relative z-10">
                REACT 19 · VITE · TAILWIND 4 · CANVAS // ALL RIGHTS RESERVED © {new Date().getFullYear()}
            </footer>

        </div>
    );
}