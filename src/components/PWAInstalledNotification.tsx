import React from 'react';
import { CheckCircle2, Sparkles, X, Smartphone, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstalledNotification: React.FC = () => {
  const { justInstalled, closeJustInstalledNotification } = usePWAInstall();

  if (!justInstalled) {
    return null;
  }

  return (
    <aside 
      aria-label="App Installed Notification"
      className="fixed top-5 right-5 left-5 sm:left-auto sm:max-w-md z-50 animate-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 border-2 border-emerald-400 text-white rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

        <button
          onClick={closeJustInstalledNotification}
          aria-label="Close notification"
          className="absolute top-3 right-3 p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <div className="w-11 h-11 rounded-xl bg-emerald-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-lg font-bold">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Installation Complete
              </span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
            </div>
            <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
              WingPOS Installed on your Device!
            </h2>
            <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
              WingPOS is now available on your home screen or app drawer. You can launch it directly anytime, even with <strong>zero internet connection</strong>.
            </p>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-emerald-700/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
            <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
            <span>Ready for offline sales &amp; thermal printing</span>
          </div>

          <button
            onClick={closeJustInstalledNotification}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Awesome!</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
