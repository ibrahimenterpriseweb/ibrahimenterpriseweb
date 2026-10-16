/**
 * IBRAHIM ENTERPRISE - INTERACTIVE GLOBAL MARKETS SVG MAP
 * Highlights verified trading routes, target export destinations, and Afghanistan import corridor.
 */

function renderTradeMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const svgContent = `
  <div class="relative w-full overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-4 md:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#0fa14a]"></span>
          <span class="text-xs uppercase font-bold tracking-wider text-emerald-400">Verified Trade Corridors</span>
        </div>
        <h3 class="text-lg md:text-xl font-bold text-white">Global Import & Export Network</h3>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>India (Operations & Export Hub)</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Afghanistan (20 MT/mo Hing Import)</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-300">
          <span class="w-2 h-2 rounded-full bg-sky-400"></span>
          <span>Export Destinations</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300">
          <span class="w-2 h-2 rounded-full bg-purple-400"></span>
          <span>Dubai (Planned Expansion)</span>
        </div>
      </div>
    </div>

    <div class="relative w-full aspect-[2/1] min-h-[340px] max-h-[520px]">
      <svg viewBox="0 0 1000 500" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="importGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#0fa14a" stop-opacity="0.9" />
          </linearGradient>
          <linearGradient id="exportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0fa14a" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.9" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- High-Resolution Graphic World Map Background -->
        <image href="assets/images/world-map.jpg" x="0" y="0" width="1000" height="500" preserveAspectRatio="none" opacity="0.85" />
        <rect x="0" y="0" width="1000" height="500" fill="#0f172a" opacity="0.15" />

        <!-- Grid Lines for Navigation Aesthetic -->
        <line x1="0" y1="250" x2="1000" y2="250" stroke="#334155" stroke-dasharray="2 6" stroke-width="0.7" opacity="0.5" />
        <line x1="500" y1="0" x2="500" y2="500" stroke="#334155" stroke-dasharray="2 6" stroke-width="0.7" opacity="0.5" />

        <!-- TRADE ROUTES (Animated SVG Curves) -->
        <!-- Route 1: Afghanistan -> India (Import corridor: 20 MT/mo Hing) -->
        <path d="M 645 190 Q 660 220 685 260" fill="none" stroke="url(#importGrad)" stroke-width="3" class="trade-route" />
        
        <!-- Outbound Routes from India (685, 260) -->
        <!-- India -> Sri Lanka -->
        <path d="M 685 260 Q 692 280 695 305" fill="none" stroke="url(#exportGrad)" stroke-width="2.5" class="trade-route" />
        
        <!-- India -> Malaysia & Singapore -->
        <path d="M 685 260 Q 720 285 750 300" fill="none" stroke="url(#exportGrad)" stroke-width="2.5" class="trade-route" />
        <path d="M 750 300 Q 765 315 770 330" fill="none" stroke="url(#exportGrad)" stroke-width="2" class="trade-route" />
        
        <!-- India -> Thailand -->
        <path d="M 685 260 Q 725 265 745 275" fill="none" stroke="url(#exportGrad)" stroke-width="2.2" class="trade-route" />
        
        <!-- India -> China -->
        <path d="M 685 260 Q 740 220 790 200" fill="none" stroke="url(#exportGrad)" stroke-width="2.5" class="trade-route" />
        
        <!-- India -> Middle East / UAE (Dubai) -->
        <path d="M 685 260 Q 640 240 615 235" fill="none" stroke="url(#exportGrad)" stroke-width="2.8" class="trade-route" />
        
        <!-- India -> UK & Europe -->
        <path d="M 685 260 Q 580 180 490 140" fill="none" stroke="url(#exportGrad)" stroke-width="2.5" class="trade-route" />
        <path d="M 490 140 Q 470 130 455 125" fill="none" stroke="url(#exportGrad)" stroke-width="2" class="trade-route" />
        
        <!-- India -> USA (East & West) -->
        <path d="M 490 140 Q 320 120 210 160" fill="none" stroke="url(#exportGrad)" stroke-width="2.2" class="trade-route" />

        <!-- NODES & HUBS -->
        
        <!-- 1. INDIA (HQ Hub: Chennai / All-India Ports) -->
        <g transform="translate(685, 260)">
          <circle r="14" fill="#0fa14a" opacity="0.25" class="node-ping" />
          <circle r="7" fill="#0fa14a" stroke="#ffffff" stroke-width="2" filter="url(#glow)" />
          <text x="12" y="4" fill="#4ade80" font-weight="700" font-size="12" font-family="sans-serif">India (Ibrahim Enterprise HQ)</text>
          <text x="12" y="16" fill="#94a3b8" font-size="9" font-family="sans-serif">Chennai / Export Gateway (~100 Containers/mo)</text>
        </g>

        <!-- 2. AFGHANISTAN (Hing Origin) -->
        <g transform="translate(645, 190)">
          <circle r="10" fill="#f59e0b" opacity="0.3" class="node-ping" />
          <circle r="6" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
          <text x="-12" y="-12" fill="#fbbf24" font-weight="700" font-size="11" text-anchor="end" font-family="sans-serif">Afghanistan</text>
          <text x="-12" y="0" fill="#cbd5e1" font-size="9" text-anchor="end" font-family="sans-serif">Hing Sourcing (20 MT/Month)</text>
        </g>

        <!-- 3. DUBAI (Planned Expansion) -->
        <g transform="translate(615, 235)">
          <circle r="8" fill="#c084fc" opacity="0.4" class="node-ping" />
          <circle r="5" fill="#a855f7" stroke="#ffffff" stroke-width="1.5" />
          <text x="-10" y="16" fill="#d8b4fe" font-weight="700" font-size="10" text-anchor="end" font-family="sans-serif">Dubai (UAE)</text>
          <text x="-10" y="27" fill="#a855f7" font-size="8" text-anchor="end" font-family="sans-serif">Planned Warehouse</text>
        </g>

        <!-- 4. SRI LANKA -->
        <g transform="translate(695, 305)">
          <circle r="4" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="10" y="4" fill="#e2e8f0" font-size="9" font-family="sans-serif">Sri Lanka</text>
        </g>

        <!-- 5. MALAYSIA & SINGAPORE -->
        <g transform="translate(750, 300)">
          <circle r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="10" y="3" fill="#e2e8f0" font-size="9" font-family="sans-serif">Malaysia</text>
        </g>
        <g transform="translate(770, 330)">
          <circle r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="10" y="4" fill="#e2e8f0" font-size="9" font-family="sans-serif">Singapore</text>
        </g>

        <!-- 6. THAILAND -->
        <g transform="translate(745, 275)">
          <circle r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="10" y="3" fill="#e2e8f0" font-size="9" font-family="sans-serif">Thailand</text>
        </g>

        <!-- 7. CHINA -->
        <g transform="translate(790, 200)">
          <circle r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="10" y="4" fill="#e2e8f0" font-size="10" font-family="sans-serif">China</text>
        </g>

        <!-- 8. UK & EUROPE -->
        <g transform="translate(455, 125)">
          <circle r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="-10" y="4" fill="#e2e8f0" font-size="10" text-anchor="end" font-family="sans-serif">UK</text>
        </g>
        <g transform="translate(490, 140)">
          <circle r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
          <text x="10" y="4" fill="#e2e8f0" font-size="10" font-family="sans-serif">Europe</text>
        </g>

        <!-- 9. USA -->
        <g transform="translate(210, 160)">
          <circle r="5.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
          <text x="12" y="4" fill="#e2e8f0" font-weight="600" font-size="10" font-family="sans-serif">United States</text>
        </g>
      </svg>
    </div>

    <!-- Map Legend Bar -->
    <div class="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div class="p-2 rounded-lg bg-slate-800/50">
        <p class="text-xs text-slate-400">Import Volume</p>
        <p class="text-sm font-bold text-amber-400">20 MT / Month (Hing)</p>
      </div>
      <div class="p-2 rounded-lg bg-slate-800/50">
        <p class="text-xs text-slate-400">Export Volume</p>
        <p class="text-sm font-bold text-emerald-400">~100 Containers / Month</p>
      </div>
      <div class="p-2 rounded-lg bg-slate-800/50">
        <p class="text-xs text-slate-400">Target Markets</p>
        <p class="text-sm font-bold text-sky-400">9 Core Regional Hubs</p>
      </div>
      <div class="p-2 rounded-lg bg-slate-800/50">
        <p class="text-xs text-slate-400">Future Distribution</p>
        <p class="text-sm font-bold text-purple-400">Planned Dubai Hub</p>
      </div>
    </div>
  </div>
  `;

  container.innerHTML = svgContent;
}

document.addEventListener('DOMContentLoaded', () => {
  renderTradeMap('global-trade-map-container');
});
