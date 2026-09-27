import React, { useState } from 'react';
import { Smartphone, Download, CheckCircle, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'landing' | 'compact' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already installed and running standalone, do not show install CTA
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      // If prompt not available yet or iOS, show instructions modal
      setShowIOSModal(true);
    }
  };

  const renderButtonContent = () => {
    if (variant === 'compact') {
      return (
        <button
          onClick={handleClick}
          title="Install WingPOS Mobile App"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>App</span>
        </button>
      );
    }

    if (variant === 'pill') {
      return (
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shadow-xs cursor-pointer ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Install WingPOS App</span>
        </button>
      );
    }

    if (variant === 'landing') {
      return (
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer border border-slate-700 ${className}`}
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Install WingPOS Mobile</span>
        </button>
      );
    }

    // Default 'header' variant
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold border border-emerald-500/40 shadow-xs transition-all cursor-pointer ${className}`}
        title="Install WingPOS on phone or desktop for instant offline access"
      >
        <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">Install</span>
      </button>
    );
  };

  return (
    <>
      {renderButtonContent()}

      {/* Guide Modal for iOS or manual install */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-slate-900 relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-xl">
                W
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Install WingPOS on your Phone</h3>
                <p className="text-xs text-slate-500 font-medium">Fast, full-screen POS with offline sales</p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    Tap the <strong className="inline-flex items-center gap-1 font-bold text-slate-900"><Share className="w-3.5 h-3.5 inline text-blue-600" /> Share button</strong> in Safari's bottom toolbar.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    Scroll down and tap <strong className="inline-flex items-center gap-1 font-bold text-slate-900"><PlusSquare className="w-3.5 h-3.5 inline text-slate-800" /> Add to Home Screen</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    Tap <strong className="font-bold text-emerald-700">Add</strong> at top right. WingPOS will appear on your phone home screen like a native app!
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <p>
                  To install WingPOS on your phone or desktop:
                </p>
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tap browser menu (<strong>⋮</strong> or <strong>Share</strong>)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Select <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong></span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm transition cursor-pointer"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
