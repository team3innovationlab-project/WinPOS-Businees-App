import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  X, 
  Zap, 
  WifiOff, 
  Share2, 
  CheckCircle2, 
  Share, 
  PlusSquare,
  Sparkles
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAMobileInstallPrompt: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    showFirstTimePrompt,
    install,
    dismissFirstTimePrompt,
  } = usePWAInstall();

  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // If already installed or prompt should not be shown, do not render
  if (isInstalled || !showFirstTimePrompt) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success && isIOS) {
        setShowIOSInstructions(true);
      }
    } else {
      setShowIOSInstructions(true);
    }
  };

  return (
    <>
      {/* Floating Bottom Card for Mobile First-Time Users */}
      <aside 
        aria-label="Install WingPOS Mobile App"
        className="fixed bottom-3 inset-x-3 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md z-50 animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto"
      >
        <div className="bg-[#0b1c24] text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-emerald-500/30 backdrop-blur-md relative overflow-hidden">
          {/* Subtle Emerald glow background */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => dismissFirstTimePrompt(false)}
            aria-label="Dismiss install banner"
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            {/* App Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg shadow-emerald-500/30">
              <span>W</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  WingPOS Mobile Setup
                </span>
                <span className="text-slate-400 text-xs">· PWA</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                Install WingPOS on your Phone
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Add to your home screen for instant 1-tap POS, full offline checkout &amp; WhatsApp reports.
              </p>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Instant 1-Tap Launch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Offline Checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>WhatsApp Invoicing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>0 MB Storage Taken</span>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex items-center gap-2 mt-3.5">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install App Free</span>
            </button>

            <button
              onClick={() => dismissFirstTimePrompt(false)}
              className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </aside>

      {/* iOS Safari Guided Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-slate-900 relative">
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md font-black text-xl">
                W
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Add WingPOS to iPhone / iPad</h3>
                <p className="text-xs text-slate-500">Quick 2-step setup in Safari</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div className="leading-snug">
                  At the bottom of your Safari screen, tap the <strong className="inline-flex items-center gap-1 font-bold text-blue-600"><Share className="w-3.5 h-3.5" /> Share</strong> button.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div className="leading-snug">
                  Scroll down the menu and tap <strong className="inline-flex items-center gap-1 font-bold text-slate-900"><PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div className="leading-snug">
                  Tap <strong className="font-bold text-emerald-700">Add</strong> at top right. Done! WingPOS is now on your home screen.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowIOSInstructions(false);
                dismissFirstTimePrompt(false);
              }}
              className="mt-5 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm transition cursor-pointer"
            >
              I Understand, Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
