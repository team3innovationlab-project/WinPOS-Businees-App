import { useState, useEffect, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [showFirstTimePrompt, setShowFirstTimePrompt] = useState<boolean>(false);
  const [justInstalled, setJustInstalled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check standalone
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsInstalled(standalone);
      return standalone;
    };

    const standalone = checkStandalone();

    // Check device type
    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const android = /android/.test(ua);
    const mobileScreen = window.innerWidth <= 768;
    const mobile = ios || android || mobileScreen;

    setIsIOS(ios);
    setIsAndroid(android);
    setIsMobile(mobile);

    // First time mobile check (if not standalone)
    if (!standalone) {
      const dismissedAt = localStorage.getItem('kora_pwa_prompt_dismissed');
      const now = Date.now();
      // Show if never dismissed or dismissed over 3 days ago
      const shouldPrompt = !dismissedAt || (now - parseInt(dismissedAt, 10)) > 3 * 24 * 60 * 60 * 1000;
      if (shouldPrompt && mobile) {
        // Small delay so page renders nicely first
        const timer = setTimeout(() => {
          setShowFirstTimePrompt(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowFirstTimePrompt(false);
      setJustInstalled(true);
      localStorage.setItem('kora_pwa_installed_time', Date.now().toString());
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    const mql = window.matchMedia('(display-mode: standalone)');
    const handleMqlChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };
    mql.addEventListener('change', handleMqlChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mql.removeEventListener('change', handleMqlChange);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) {
      return false;
    }
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setShowFirstTimePrompt(false);
        setJustInstalled(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error during PWA installation:', err);
      return false;
    }
  }, [deferredPrompt]);

  const dismissFirstTimePrompt = useCallback((temporary: boolean = false) => {
    setShowFirstTimePrompt(false);
    if (!temporary) {
      localStorage.setItem('kora_pwa_prompt_dismissed', Date.now().toString());
    }
  }, []);

  const closeJustInstalledNotification = useCallback(() => {
    setJustInstalled(false);
  }, []);

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isMobile,
    isIOS,
    isAndroid,
    showFirstTimePrompt,
    setShowFirstTimePrompt,
    justInstalled,
    install,
    dismissFirstTimePrompt,
    closeJustInstalledNotification,
  };
}
