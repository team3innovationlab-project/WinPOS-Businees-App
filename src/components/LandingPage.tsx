import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Play,
  TrendingUp,
  CreditCard,
  Package,
  RefreshCw,
  Users,
  Bell,
  ShieldCheck,
  Receipt,
  CheckCircle2,
  CheckCircle,
  ExternalLink,
  X,
  Phone,
  Store,
  ChevronRight,
  Server,
  Camera,
  ScanLine,
  Zap,
  Sparkles,
  Gift,
  MessageSquare,
  Calculator,
  HelpCircle,
  Menu,
  ChevronDown,
  ChevronUp,
  Printer,
  Lock,
  DollarSign,
  Smartphone,
  Download,
  Building2,
  ShoppingBag,
  Boxes,
  Mail,
  MapPin,
  Clock,
  Send,
  Star,
  Laptop,
  WifiOff,
  FileText
} from 'lucide-react';
import { BusinessProfile, SubscriptionPlan } from '../types';
import { ScanReconciliationModal, ScanResult } from './ScanReconciliationModal';
import { PWAInstallButton } from './PWAInstallButton';

interface LandingPageProps {
  business: BusinessProfile;
  onNavigateToOnboarding: (plan?: SubscriptionPlan) => void;
  onNavigateToLogin: () => void;
  onNavigateToApp: () => void;
  onOpenVpsGuide: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  business,
  onNavigateToOnboarding,
  onNavigateToLogin,
  onNavigateToApp,
  onOpenVpsGuide,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'momo' | 'telecel' | 'at' | 'card' | 'cash'>('momo');
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCameraScannerModal, setShowCameraScannerModal] = useState(false);
  const [lastScannedResult, setLastScannedResult] = useState<ScanResult | null>(null);
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [roiDailySales, setRoiDailySales] = useState<number>(3500);
  const [roiStaffCount, setRoiStaffCount] = useState<number>(3);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Direct Demo state
  const [demoCart, setDemoCart] = useState<{ id: string; name: string; price: number; qty: number; category: string }[]>([
    { id: 'item-1', name: 'iPhone Fast Charger 20W', price: 85, qty: 1, category: 'Accessories' },
    { id: 'item-2', name: 'Royal Aroma Rice 5kg', price: 140, qty: 1, category: 'Grocery' },
  ]);
  const [demoPaymentMode, setDemoPaymentMode] = useState<'momo' | 'cash' | 'card'>('momo');
  const [demoCustomerPhone, setDemoCustomerPhone] = useState('0244 567 890');
  const [demoReceiptSent, setDemoReceiptSent] = useState(false);
  const [demoOrderCompleted, setDemoOrderCompleted] = useState(false);

  // App Install Tab
  const [installDeviceTab, setInstallDeviceTab] = useState<'android' | 'ios' | 'desktop'>('android');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    storeName: '',
    city: 'Accra',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const plans = [
    {
      id: 'FREE_TRIAL' as SubscriptionPlan,
      name: 'Free Trial',
      description: 'Ideal for trying out the POS register and automated WhatsApp daily close reports.',
      price: 'GH₵ 0',
      period: 'for 14 days',
      features: [
        'Single POS register terminal',
        'Daily WhatsApp close reports',
        'Camera MoMo SMS & receipt scanning',
        'Real-time inventory tracking',
        'Sales & expenses ledger',
        'Cash & MoMo reconciliation',
      ],
      cta: 'Start 14-Day Free Trial',
      popular: false,
    },
    {
      id: 'STARTER' as SubscriptionPlan,
      name: 'Starter',
      description: 'Perfect for single kiosks, convenience shops, and retail boutiques.',
      price: billingCycle === 'MONTHLY' ? 'GH₵ 99' : 'GH₵ 79',
      period: '/ month',
      features: [
        'Up to 3 cashier & staff accounts',
        'Automated scheduled WhatsApp daily close reports',
        'Camera MoMo SMS & cash receipt scanner',
        'MTN MoMo, Telecel Cash & AT Money tracking',
        'Stock restock alerts & variance detection',
        'Customer logging & CSV export',
      ],
      cta: 'Choose Starter',
      popular: false,
    },
    {
      id: 'BUSINESS_PRO' as SubscriptionPlan,
      name: 'Business Pro',
      description: 'Our most popular plan for busy retail shops, supermarkets, and electronics stores.',
      price: billingCycle === 'MONTHLY' ? 'GH₵ 249' : 'GH₵ 199',
      period: '/ month',
      features: [
        'Unlimited staff & cashier user accounts',
        'Automated WhatsApp daily close reporting',
        'Camera MoMo SMS & receipt reconciliation scanner',
        '36 Ghana & World holiday promo campaigns',
        'Paystack MoMo & Visa/Mastercard processing',
        'Daily register variance & cash leakage shield',
        'Detailed sales & expense accounting exports',
      ],
      cta: 'Start with Business Pro',
      popular: true,
    },
    {
      id: 'ENTERPRISE' as SubscriptionPlan,
      name: 'Enterprise Multi-Store',
      description: 'Designed for supermarkets, multi-branch retailers, and growing chains.',
      price: billingCycle === 'MONTHLY' ? 'GH₵ 499' : 'GH₵ 399',
      period: '/ month',
      features: [
        'Multi-branch store management',
        'Centralized stock across branches',
        'Self-hosted VPS deployment & PM2 support',
        'Custom webhooks & WhatsApp Cloud API',
        'Priority technical support & SLA',
      ],
      cta: 'Choose Enterprise',
      popular: false,
    },
  ];

  const handleScanCompleted = (result: ScanResult) => {
    setLastScannedResult(result);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white antialiased flex flex-col">
      {/* Top Banner: Quick Access Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded text-[10px] uppercase">
              NEW
            </span>
            <span className="text-slate-300">
              Camera MoMo & Receipt Reconciliation Scanner is now live!
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => onNavigateToOnboarding('BUSINESS_PRO')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>New Business? Register</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onNavigateToApp}
              className="text-white hover:text-emerald-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              <span>Launch POS Demo Direct</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Zone */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-xs group-hover:bg-emerald-700 transition-colors shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current" aria-hidden="true">
                  <path d="M4 4h4.5v16H4V4zm6.5 0h4.2l5.3 7.8L14.7 20h-4.3l4.8-7.5L10.5 4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans leading-none">
                  WingPOS
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-700 tracking-tight leading-tight mt-0.5">
                  Retail Business Intelligence with WhatsApp Automation
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links (Desktop) - Clean & Reduced */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a 
              href="#features" 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Contact
            </a>
            <a 
              href="#industry" 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Industry
            </a>
            <a 
              href="#solution" 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Solution
            </a>
            <a 
              href="#pricing" 
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Pricing &amp; Plans
            </a>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Demo CTA */}
            <button
              onClick={onNavigateToApp}
              className="hidden md:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-full transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title="Launch live interactive POS demo without signing up"
            >
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Direct Demo</span>
            </button>

            {/* Install WingPOS App */}
            <PWAInstallButton variant="pill" className="hidden lg:inline-flex" />

            {/* Business Login */}
            <button
              onClick={onNavigateToLogin}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Business Login
            </button>

            {/* Start Free Trial */}
            <button
              onClick={() => onNavigateToOnboarding('FREE_TRIAL')}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-xs hover:shadow cursor-pointer flex items-center gap-1.5"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              WingPOS - Retail Business Intelligence with WhatsApp Automation
            </div>
            <div className="grid grid-cols-1 gap-1 text-sm font-semibold text-slate-700">
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>About</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#industry"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Industry</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#solution"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Solution</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Pricing &amp; Plans</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#direct-demo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-emerald-700"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>Direct Demo</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#install-app"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-emerald-700"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Install WingPOS App</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#roi-calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <span>ROI Calculator</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
              >
                <span>FAQ</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToApp();
                }}
                className="w-full text-center py-2.5 font-bold text-sm text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Launch Direct Demo</span>
              </button>
              <PWAInstallButton variant="landing" className="w-full justify-center" />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToLogin();
                }}
                className="w-full text-center py-2.5 font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Business Login
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToOnboarding('FREE_TRIAL');
                }}
                className="w-full text-center py-2.5 font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#f2f9f6]/70 via-[#f9fcfa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category Kicker & Regional Tag */}
              <div className="space-y-2">
                <span className="block text-[11px] font-extrabold uppercase tracking-widest text-emerald-700">
                  RETAIL BUSINESS INTELLIGENCE WITH WHATSAPP AUTOMATION
                </span>

                <div className="inline-flex items-center gap-2 bg-slate-100/90 text-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-200/80">
                  <span className="text-sm">🇬🇭</span>
                  <span>Engineered for Africa</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-semibold text-emerald-800">100% Offline POS & WhatsApp Automation</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                Run your store.<br />
                Know your numbers.<br />
                <span className="text-emerald-600">Close every day with</span><br />
                <span className="text-emerald-600">confidence.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-base text-slate-600 leading-relaxed font-normal max-w-lg">
                WingPOS combines high-velocity point-of-sale, real-time inventory management, camera receipt &amp; MoMo reconciliation, and automated evening financial close reports delivered straight to your WhatsApp.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToOnboarding('FREE_TRIAL')}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateToApp}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-xs hover:shadow-sm cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>Direct Demo</span>
                </button>

                <a
                  href="#install-app"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-3 rounded-full transition-all cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <span>Install WingPOS App</span>
                </a>

                <a
                  href="#roi-calculator"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3.5 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                  <span>ROI Calculator</span>
                </a>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 pt-1">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  14-Day Free Trial (No Card)
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  100% Offline Capability
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  Nightly WhatsApp Reports
                </span>
              </div>

              {/* Live Instance Badge */}
              <div className="pt-2">
                <button
                  onClick={onNavigateToApp}
                  className="group inline-flex items-center gap-2.5 bg-slate-900 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-emerald-300">pos.wingpos.app</span>
                  <span className="text-slate-400">·</span>
                  <span>Live Store Instance: {business.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: High-Fidelity Device Mockups (WhatsApp Daily Report + POS Register + Retail Owner) */}
            <div className="lg:col-span-7 relative">
              {/* Background Smiling African Retail Owner */}
              <div className="absolute right-0 top-0 w-72 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden opacity-90 shadow-lg border border-slate-200/60 hidden md:block z-0 pointer-events-none">
                <img 
                  src="/src/assets/images/kora_retail_owner_1790320644577.jpg" 
                  alt="Smiling African retail shop owner in green apron"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </div>

              {/* Handwritten style callout */}
              <div className="absolute -top-4 right-8 z-20 hidden lg:flex flex-col items-center">
                <div className="text-emerald-700 font-bold text-base sm:text-lg tracking-wide transform -rotate-6 font-sans">
                  Smarter Retail for Africa ⤹
                </div>
              </div>

              {/* Devices Presentation Layer */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-8 sm:pt-4">
                
                {/* 1. Smartphone Mockup: WhatsApp Daily Close Report (Front-left) */}
                <div className="sm:col-span-6 z-20">
                  <div className="w-full max-w-[320px] mx-auto bg-slate-900 p-2.5 rounded-[36px] shadow-2xl ring-1 ring-slate-800">
                    {/* Phone Screen */}
                    <div className="bg-[#eef2f5] rounded-[28px] overflow-hidden text-slate-800 text-[11px] font-sans flex flex-col h-[480px]">
                      {/* WhatsApp Chat Header */}
                      <div className="bg-[#075e54] text-white px-3 py-2.5 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white/90">←</span>
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                            W
                          </div>
                          <div>
                            <div className="flex items-center gap-1 font-bold text-xs text-white">
                              <span>WingPOS</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-300 fill-emerald-300 text-white" />
                            </div>
                            <div className="text-[9px] text-emerald-100/90 leading-none">
                              Daily Close Report · Techwokx Ghana
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-emerald-200">
                          Today, 8:00 PM
                        </div>
                      </div>

                      {/* WhatsApp Chat Body */}
                      <div className="flex-1 p-2.5 overflow-y-auto space-y-2 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:12px_12px] bg-[#e5ddd5]/30">
                        {/* Report Bubble */}
                        <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/80 space-y-2">
                          {/* Store Banner */}
                          <div className="border-b border-slate-100 pb-1.5 text-center">
                            <span className="text-[10px] font-extrabold text-slate-900 tracking-wider block">
                              TECHWOKX GHANA
                            </span>
                            <span className="text-[9px] font-bold text-emerald-700 tracking-wider block">
                              DAILY CLOSE REPORT 📊
                            </span>
                            <span className="text-[8px] text-slate-500 font-mono">
                              Thu, 24 Sep 2026 · 20:00 GMT
                            </span>
                          </div>

                          {/* Today's Sales Hero Metric */}
                          <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2 text-center">
                            <span className="text-[9px] font-semibold text-slate-600 block">
                              TODAY'S TOTAL SALES
                            </span>
                            <span className="text-base font-extrabold text-emerald-700 font-mono tabular-nums">
                              GH₵ 3,840.00
                            </span>
                          </div>

                          {/* Breakdown Lines */}
                          <div className="space-y-1 text-[10px] text-slate-600 font-mono">
                            <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
                              <span className="font-sans text-slate-600">🛍 Transactions</span>
                              <span className="font-bold text-slate-800">24 orders</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
                              <span className="font-sans text-slate-600">💵 Cash Collected</span>
                              <span className="font-semibold text-slate-800">GH₵ 1,420.00</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
                              <span className="font-sans text-slate-600">📱 Mobile Money</span>
                              <span className="font-semibold text-emerald-800">GH₵ 2,120.00</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
                              <span className="font-sans text-slate-600">💳 Card Settlements</span>
                              <span className="font-semibold text-slate-800">GH₵ 300.00</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
                              <span className="font-sans text-slate-600">📉 Expenses Recorded</span>
                              <span className="font-semibold text-rose-600">GH₵ 410.00</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 bg-emerald-100/60 rounded px-1">
                              <span className="font-sans font-bold text-emerald-900">⚖ Register Variance</span>
                              <span className="font-extrabold text-emerald-700">GH₵ 0.00 (BALANCED)</span>
                            </div>
                            <div className="flex justify-between items-center pt-1 font-bold text-slate-900">
                              <span className="font-sans">💰 Net Cash Flow</span>
                              <span className="text-emerald-700">GH₵ 3,430.00</span>
                            </div>
                          </div>

                          {/* WhatsApp Timestamp & Delivery Status */}
                          <div className="text-[8px] text-slate-400 text-right flex items-center justify-end gap-1 pt-1">
                            <span>20:00 GMT · Delivered</span>
                            <span className="text-sky-500 font-bold">✓✓</span>
                          </div>
                        </div>

                        {/* WhatsApp Automation Note */}
                        <div className="bg-emerald-50 border border-emerald-200/80 rounded-lg p-1.5 text-center text-[9px] text-emerald-900 font-medium">
                          ⚡ Automatically sent every evening at closing time.
                        </div>
                      </div>

                      {/* WhatsApp Bottom Bar */}
                      <div className="bg-white px-3 py-2 border-t border-slate-200 flex items-center justify-between text-slate-400 text-xs">
                        <span className="text-[10px]">Type a message...</span>
                        <div className="flex items-center gap-2">
                          <span>📎</span>
                          <span>🎙</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Tablet POS Terminal Mockup (Behind & offset right) */}
                <div className="sm:col-span-6 -mt-6 sm:mt-0 z-10">
                  <div className="w-full max-w-[370px] mx-auto bg-slate-900 p-3 rounded-[32px] shadow-xl ring-1 ring-slate-800">
                    <div className="bg-white rounded-[22px] overflow-hidden text-xs font-sans h-[420px] flex flex-col">
                      {/* POS Header */}
                      <div className="bg-slate-900 text-white px-3 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-900">
                            W
                          </div>
                          <span className="font-bold text-xs tracking-tight">WingPOS</span>
                        </div>
                        <div className="bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-300 flex items-center gap-1">
                          <span>🔍</span>
                          <span>Search products...</span>
                        </div>
                      </div>

                      {/* POS Main Screen */}
                      <div className="flex-1 flex overflow-hidden">
                        {/* Left Catalog Area */}
                        <div className="flex-1 p-2 space-y-2 border-r border-slate-100 overflow-y-auto">
                          {/* Category chips */}
                          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[9px] font-semibold text-slate-600 no-scrollbar">
                            <span className="bg-slate-900 text-white px-2 py-0.5 rounded">All Items</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded">Electronics</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded">Accessories</span>
                          </div>

                          {/* Product Items */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                              <div className="flex items-center gap-2">
                                <img 
                                  src="/src/assets/images/earbuds_product_1790320657709.jpg" 
                                  alt="Wireless Earbuds"
                                  className="w-7 h-7 rounded object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <div className="font-bold text-[10px] text-slate-800">Wireless Earbuds</div>
                                  <div className="text-[9px] text-emerald-700 font-mono">GH₵ 420.00</div>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                x1
                              </span>
                            </div>

                            <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                              <div className="flex items-center gap-2">
                                <img 
                                  src="/src/assets/images/fast_charger_box_1790320674616.jpg" 
                                  alt="Fast Charger"
                                  className="w-7 h-7 rounded object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <div className="font-bold text-[10px] text-slate-800">Fast Charger</div>
                                  <div className="text-[9px] text-emerald-700 font-mono">GH₵ 360.00</div>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                x2
                              </span>
                            </div>

                            <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-xs">
                                  🔌
                                </div>
                                <div>
                                  <div className="font-bold text-[10px] text-slate-800">Braided Cable</div>
                                  <div className="text-[9px] text-emerald-700 font-mono">GH₵ 75.00</div>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                x1
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Order Summary Area */}
                        <div className="w-36 p-2 flex flex-col justify-between bg-slate-50/70">
                          <div>
                            <span className="text-[9px] text-slate-500 font-bold block">Cart Total</span>
                            <span className="text-sm font-extrabold text-slate-900 font-mono">GH₵ 855.00</span>
                            
                            <div className="mt-2 space-y-1">
                              <span className="text-[8px] text-slate-400 uppercase font-bold block">Payment</span>
                              <div className="grid grid-cols-2 gap-1 text-[8px] font-semibold">
                                <span className="bg-yellow-400 text-slate-900 px-1 py-0.5 rounded text-center">MoMo</span>
                                <span className="bg-red-600 text-white px-1 py-0.5 rounded text-center">Telecel</span>
                                <span className="bg-blue-600 text-white px-1 py-0.5 rounded text-center">Visa</span>
                                <span className="bg-emerald-600 text-white px-1 py-0.5 rounded text-center">Cash</span>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={onNavigateToApp}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-lg text-[10px] transition-colors shadow-2xs cursor-pointer text-center"
                          >
                            Complete Sale
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DIRECT DEMO INTERACTIVE SECTION */}
      <section id="direct-demo" className="py-16 lg:py-24 bg-gradient-to-b from-white via-[#f4fbf7] to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>DIRECT DEMO · ZERO SETUP REQUIRED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Test-drive the WingPOS register in 10 seconds.
            </h2>
            <p className="text-base text-slate-600">
              No account creation, no password, no credit card. Tap products below to build a quick sale, split cash and MoMo payments, and simulate sending a WhatsApp digital receipt.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Quick Tap Products Catalog */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tap to Add Items to Cart
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Sample Inventory SKU
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { id: 'demo-1', name: 'iPhone 20W Fast Charger', price: 85, category: 'Accessories', icon: '🔌' },
                  { id: 'demo-2', name: 'Royal Aroma Rice 5kg', price: 140, category: 'Grocery', icon: '🌾' },
                  { id: 'demo-3', name: 'Panadol Extra 20 Tablets', price: 22, category: 'Pharmacy', icon: '💊' },
                  { id: 'demo-4', name: 'Milo Chocolate Tin 400g', price: 48, category: 'Beverages', icon: '☕' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setDemoCart((prev) => {
                        const exists = prev.find((p) => p.id === item.id);
                        if (exists) {
                          return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
                        }
                        return [...prev, { ...item, qty: 1 }];
                      });
                      setDemoOrderCompleted(false);
                    }}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.category}</div>
                    </div>
                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="font-mono font-bold text-xs text-slate-900">GH₵ {item.price.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-2 py-0.5 rounded-full transition-colors">
                        + Add
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Barcode scanner test banner */}
              <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                    <ScanLine className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Need full terminal testing?</div>
                    <div className="text-[11px] text-emerald-200">Test barcode cameras, staff PINs, and Bluetooth printing</div>
                  </div>
                </div>
                <button
                  onClick={onNavigateToApp}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                >
                  Launch Full POS
                </button>
              </div>
            </div>

            {/* Right: Live Cart & Instant WhatsApp Receipt preview */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Demo Register Cart ({demoCart.reduce((sum, item) => sum + item.qty, 0)})</span>
                  </span>
                  {demoCart.length > 0 && (
                    <button
                      onClick={() => setDemoCart([])}
                      className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-4">
                  {demoCart.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      Cart is empty. Tap any sample product on the left to test.
                    </div>
                  ) : (
                    demoCart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl text-xs">
                        <div className="flex-1 mr-2">
                          <div className="font-bold text-slate-800 line-clamp-1">{item.name}</div>
                          <div className="text-slate-400 font-mono text-[10px]">GH₵ {item.price.toFixed(2)} each</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setDemoCart((prev) =>
                                prev
                                  .map((p) => p.id === item.id ? { ...p, qty: p.qty - 1 } : p)
                                  .filter((p) => p.qty > 0)
                              );
                            }}
                            className="w-5 h-5 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs hover:bg-slate-300"
                          >
                            -
                          </button>
                          <span className="font-bold font-mono text-xs w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => {
                              setDemoCart((prev) =>
                                prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
                              );
                            }}
                            className="w-5 h-5 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs hover:bg-slate-300"
                          >
                            +
                          </button>
                          <span className="font-bold font-mono text-slate-900 w-16 text-right">
                            GH₵ {(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Payment Selection */}
                <div className="mb-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 block">Tender Method:</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      onClick={() => setDemoPaymentMode('momo')}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        demoPaymentMode === 'momo'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-900 font-black ring-1 ring-yellow-400'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      MTN MoMo
                    </button>
                    <button
                      onClick={() => setDemoPaymentMode('cash')}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        demoPaymentMode === 'cash'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-black ring-1 ring-emerald-400'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Cash
                    </button>
                    <button
                      onClick={() => setDemoPaymentMode('card')}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        demoPaymentMode === 'card'
                          ? 'border-blue-500 bg-blue-50 text-blue-900 font-black ring-1 ring-blue-400'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Visa Card
                    </button>
                  </div>
                </div>

                {/* WhatsApp Receipt Toggle */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 mb-4 text-xs">
                  <label className="flex items-center gap-2 font-bold text-emerald-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={demoReceiptSent}
                      onChange={(e) => setDemoReceiptSent(e.target.checked)}
                      className="accent-emerald-600 rounded"
                    />
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Send digital receipt to customer's WhatsApp</span>
                  </label>
                  {demoReceiptSent && (
                    <input
                      type="text"
                      value={demoCustomerPhone}
                      onChange={(e) => setDemoCustomerPhone(e.target.value)}
                      placeholder="Customer phone (e.g. 0244 567 890)"
                      className="mt-2 w-full text-xs p-2 rounded-lg bg-white border border-emerald-200 text-slate-800"
                    />
                  )}
                </div>
              </div>

              {/* Total & Checkout */}
              <div>
                <div className="flex justify-between items-center py-2 border-t border-slate-100 text-sm">
                  <span className="font-bold text-slate-600">Total Due:</span>
                  <span className="font-mono text-xl font-black text-slate-900">
                    GH₵ {demoCart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
                  </span>
                </div>

                {demoOrderCompleted ? (
                  <div className="p-3 bg-emerald-600 text-white rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Sale Recorded &amp; Reconciled! WhatsApp Receipt Queued.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => setDemoOrderCompleted(true)}
                      disabled={demoCart.length === 0}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs cursor-pointer text-center"
                    >
                      Complete Sale (Demo)
                    </button>
                    <button
                      onClick={onNavigateToApp}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs cursor-pointer text-center flex items-center justify-center gap-1"
                    >
                      <span>Open Full POS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTALL WINGPOS APP SECTION */}
      <section id="install-app" className="py-16 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>OFFLINE PROGRESSIVE WEB APP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Install WingPOS on your phone, tablet, or PC.
            </h2>
            <p className="text-base text-slate-600">
              Zero App Store friction. Works 100% offline, launches instantly from your home screen, and connects directly to thermal receipt printers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
            {/* Left 4 Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <WifiOff className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">100% Offline Capability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never stop ringing sales when cellular networks go down or fiber cables cut. WingPOS securely caches everything locally and synchronizes automatically upon reconnection.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 fill-sky-600 text-sky-600" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">Instant 2-Second Launch</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No 150MB App Store downloads. Tap Install to get a native standalone application icon on your phone home screen or Windows taskbar.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Printer className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">Thermal Receipt Printing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect seamlessly to 58mm &amp; 80mm ESC/POS thermal printers via Bluetooth or Wi-Fi. Print customer receipts and end-of-day register audit slips.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">Ultra-Low Data Overhead</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered specifically for African mobile networks. The app uses minimal cache and lightweight updates for daily operation.
                </p>
              </div>
            </div>

            {/* Right: Installation Card & Interactive Tabs */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#042821] text-white p-7 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shrink-0">
                  W
                </div>
                <div>
                  <div className="font-black text-lg text-white">WingPOS Retail App</div>
                  <div className="text-xs text-emerald-300">Version 2.4 · Offline Ready</div>
                </div>
              </div>

              {/* Platform Selector */}
              <div className="bg-white/10 p-1 rounded-xl flex items-center text-xs font-bold">
                <button
                  onClick={() => setInstallDeviceTab('android')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    installDeviceTab === 'android' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Android
                </button>
                <button
                  onClick={() => setInstallDeviceTab('ios')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    installDeviceTab === 'ios' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  iPhone / iPad
                </button>
                <button
                  onClick={() => setInstallDeviceTab('desktop')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    installDeviceTab === 'desktop' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  PC / Mac
                </button>
              </div>

              {/* Instructions per device */}
              <div className="text-xs text-slate-300 space-y-2.5 bg-black/20 p-4 rounded-xl border border-white/10">
                {installDeviceTab === 'android' && (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">1.</span>
                      <span>Open Chrome on your Android smartphone or tablet.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">2.</span>
                      <span>Click the <strong>Install WingPOS App</strong> button below or tap the 3-dots menu.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">3.</span>
                      <span>Tap <strong>Add to Home screen</strong> to launch like a native app anytime!</span>
                    </div>
                  </>
                )}
                {installDeviceTab === 'ios' && (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">1.</span>
                      <span>Open this page in <strong>Safari</strong> on your iPhone or iPad.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">2.</span>
                      <span>Tap the <strong>Share</strong> button (box with upward arrow) at the bottom.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">3.</span>
                      <span>Scroll down and tap <strong>Add to Home Screen</strong>. Done!</span>
                    </div>
                  </>
                )}
                {installDeviceTab === 'desktop' && (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">1.</span>
                      <span>Open this page in Google Chrome, Microsoft Edge, or Brave on Windows or macOS.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">2.</span>
                      <span>Click the install computer/download icon on the right side of the address bar.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">3.</span>
                      <span>WingPOS will open in its own clean window without browser tabs!</span>
                    </div>
                  </>
                )}
              </div>

              {/* Install Trigger Button */}
              <div className="space-y-2">
                <PWAInstallButton variant="landing" className="w-full justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-sm shadow-md" />
                <button
                  onClick={onNavigateToApp}
                  className="w-full text-center text-xs text-emerald-300 hover:text-white underline cursor-pointer py-1 font-semibold"
                >
                  Or continue in browser mode →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Feature Value Pillars Grid */}
      <section id="features" className="py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* 1. Sales */}
            <div className="p-4 rounded-2xl bg-[#f8faf9] border border-slate-100/90 hover:border-emerald-200 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Sales
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Record every sale, track in real time.
              </p>
            </div>

            {/* 2. Expenses */}
            <div className="p-4 rounded-2xl bg-[#faf9fc] border border-slate-100/90 hover:border-purple-200 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CreditCard className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Expenses
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Monitor spending and control costs.
              </p>
            </div>

            {/* 3. Stock */}
            <div className="p-4 rounded-2xl bg-[#fcfaf7] border border-slate-100/90 hover:border-amber-200 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Package className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Stock
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Keep the right stock, at the right time.
              </p>
            </div>

            {/* 4. Reconciliation with Camera MoMo Scanner Highlight */}
            <div 
              onClick={() => setShowCameraScannerModal(true)}
              className="p-4 rounded-2xl bg-[#f7faff] border border-sky-200 hover:border-emerald-300 transition-all hover:shadow-md group cursor-pointer relative ring-1 ring-sky-300/40"
            >
              <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Camera className="w-2.5 h-2.5" />
                <span>Scanner</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <RefreshCw className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-1">
                <span>Reconciliation</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal mb-2">
                Balance transactions with ease.
              </p>
              <span className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1">
                <span>Try Camera Scanner</span>
                <span>→</span>
              </span>
            </div>

            {/* 5. Staff */}
            <div className="p-4 rounded-2xl bg-[#f9f8fc] border border-slate-100/90 hover:border-indigo-200 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Staff
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Manage your team and shifts.
              </p>
            </div>

            {/* 6. Alerts */}
            <div className="p-4 rounded-2xl bg-[#fcf8f8] border border-slate-100/90 hover:border-rose-200 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 rounded-xl bg-rose-100/70 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Bell className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Alerts
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Get notified before small issues become big problems.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* NEW: Dedicated Phone Camera MoMo & Receipt Reconciliation Feature Section */}
      <section id="scanner" className="py-16 bg-gradient-to-b from-white to-[#f4faf7] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-emerald-100 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Feature explanation */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                <Camera className="w-3.5 h-3.5" />
                <span>CUSTOMER PAYMENT SCANNER</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Scan payment notification receipt from customer after payment to reconcile payment.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Eliminate manual typing and unverified cash balances. Point your phone camera at the customer's phone showing their MoMo payment notification SMS or customer receipt slip to automatically extract amounts, transaction IDs, and reconcile daily register accounts without leakage.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instantly scans MTN Mobile Money, Telecel Cash, and AT Money SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Captures physical cash drawer totals from thermal till receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Logs transaction reference numbers directly into auditor ledger</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setShowCameraScannerModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Test Camera Scanner Live</span>
                </button>

                <button
                  onClick={onNavigateToApp}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Launch POS Demo Direct</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual scanner demo preview */}
            <div className="lg:col-span-6 relative">
              <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden">
                {/* Visual scan frame */}
                <div className="border border-emerald-500/40 rounded-2xl p-4 sm:p-5 bg-slate-950/80 relative space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <ScanLine className="w-3.5 h-3.5 animate-pulse" />
                      CAMERA VIEWFINDER ACTIVE
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono text-[10px]">
                      AUTO-DETECT ON
                    </span>
                  </div>

                  {/* MoMo SMS Screen Mockup being scanned */}
                  <div className="bg-white text-slate-900 p-3.5 rounded-xl shadow-md border-l-4 border-yellow-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase text-slate-700 tracking-wider">
                        MTN Mobile Money SMS
                      </span>
                      <span className="text-[9px] text-slate-400">19:42 GMT</span>
                    </div>
                    <p className="text-xs font-mono font-medium text-slate-800 leading-snug">
                      Payment received for <strong className="text-emerald-700 bg-emerald-50 px-1 rounded">GHS 420.00</strong> from Kwesi Mensah (0244123456). Ref: 298104812. Available Balance: GHS 2,120.00.
                    </p>
                  </div>

                  {/* Recognition Extracted Card */}
                  <div className="bg-emerald-950/80 border border-emerald-500/60 rounded-xl p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between text-emerald-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>OCR Extracted & Matched</span>
                      </span>
                      <span className="font-mono text-base font-extrabold text-white">
                        GH₵ 420.00
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
                      <div>Channel: <strong className="text-yellow-400">MTN MoMo</strong></div>
                      <div>Ref: <strong>298104812</strong></div>
                    </div>
                    <div className="text-[10px] text-emerald-200 bg-emerald-900/60 p-1.5 rounded flex items-center justify-between">
                      <span>Register Variance Impact:</span>
                      <strong className="text-emerald-300">GH₵ 0.00 (Balanced)</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCameraScannerModal(true)}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Scan payment notification receipt from customer after payment to reconcile payment</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Spotlight: FAST CHECKOUT / Multiple Payment Methods */}
      <section className="py-16 lg:py-24 bg-[#f8faf9]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="block text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-2">
                  FAST CHECKOUT
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Multiple payment methods, one system.
                </h2>
              </div>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Create a sale in seconds and record exactly how the customer paid.
              </p>

              {/* Payment Method Badges / Toggles */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('momo')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPaymentMethod === 'momo'
                      ? 'bg-[#ffcc00] text-slate-950 shadow-xs ring-2 ring-yellow-500/50'
                      : 'bg-[#ffcc00]/90 text-slate-950 hover:bg-[#ffcc00]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-slate-950"></span>
                  MTN MoMo
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('telecel')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPaymentMethod === 'telecel'
                      ? 'bg-[#e60000] text-white shadow-xs ring-2 ring-red-500/50'
                      : 'bg-[#e60000]/90 text-white hover:bg-[#e60000]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  Telecel Cash
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('at')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPaymentMethod === 'at'
                      ? 'bg-[#00875a] text-white shadow-xs ring-2 ring-emerald-500/50'
                      : 'bg-[#00875a]/90 text-white hover:bg-[#00875a]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  AT Money
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPaymentMethod === 'card'
                      ? 'bg-[#1434cb] text-white shadow-xs ring-2 ring-blue-500/50'
                      : 'bg-[#1434cb]/90 text-white hover:bg-[#1434cb]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Visa / Mastercard
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('cash')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPaymentMethod === 'cash'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 ring-2 ring-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <span>💵</span>
                  Cash
                </button>
              </div>

              {/* Auto-generate Receipts bullet */}
              <div className="pt-2 flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <span>Auto-generate receipts for your customers</span>
              </div>
            </div>

            {/* Right Side: Fast Checkout POS Tablet + Phone Receipt & Printed Receipt Paper */}
            <div className="lg:col-span-7 relative">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                
                {/* 1. Large POS Checkout Tablet Terminal */}
                <div className="w-full max-w-md bg-slate-900 p-3 rounded-[32px] shadow-2xl ring-1 ring-slate-800">
                  <div className="bg-white rounded-[22px] overflow-hidden text-xs flex flex-col h-[340px]">
                    {/* Tablet Top Nav */}
                    <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-900">
                          W
                        </div>
                        <span className="font-bold text-xs tracking-tight">WingPOS</span>
                      </div>
                      <div className="bg-slate-800 px-3 py-1 rounded text-[10px] text-slate-300">
                        Search products...
                      </div>
                    </div>

                    {/* Tablet Main View */}
                    <div className="flex-1 flex overflow-hidden">
                      {/* Left: Product List */}
                      <div className="flex-1 p-3 border-r border-slate-100 overflow-y-auto space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 pb-1 border-b border-slate-100">
                          <span>Items (4)</span>
                          <span className="font-mono text-emerald-700">GH₵ 855.00</span>
                        </div>

                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 font-medium">Wireless Earbuds</span>
                            <span className="text-slate-400 font-mono">x1</span>
                            <span className="font-mono font-semibold text-slate-800">420.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 font-medium">Fast Charger</span>
                            <span className="text-slate-400 font-mono">x2</span>
                            <span className="font-mono font-semibold text-slate-800">360.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 font-medium">Braided Cable</span>
                            <span className="text-slate-400 font-mono">x1</span>
                            <span className="font-mono font-semibold text-slate-800">75.00</span>
                          </div>
                        </div>

                        {/* Selected Payment preview */}
                        <div className="pt-2 border-t border-slate-100">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">
                            Selected Method
                          </span>
                          <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-[10px] flex items-center justify-between">
                            <span className="uppercase font-mono">{selectedPaymentMethod}</span>
                            <span className="text-emerald-700 font-bold">READY</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Checkout Button & Total */}
                      <div className="w-36 p-3 flex flex-col justify-between bg-slate-50">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase font-bold block">Total Due</span>
                          <span className="text-base font-extrabold text-slate-900 font-mono">GH₵ 855.00</span>
                        </div>

                        <button
                          type="button"
                          onClick={onNavigateToApp}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-xs cursor-pointer text-center"
                        >
                          Complete Sale
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Connected Phone & Printed Receipt Preview */}
                <div className="relative w-56 -mt-8 sm:mt-0">
                  {/* Smartphone with Payment Successful screen */}
                  <div className="bg-slate-900 p-2.5 rounded-[32px] shadow-xl ring-1 ring-slate-800">
                    <div className="bg-white rounded-[24px] overflow-hidden text-center p-3 h-[250px] flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 mx-auto">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Payment Successful!
                      </span>
                      <span className="text-sm font-extrabold text-emerald-700 font-mono my-1">
                        GH₵ 855.00
                      </span>
                      <span className="text-[10px] text-slate-500 block mb-2">
                        Thank you for your purchase!
                      </span>
                      <button 
                        onClick={onNavigateToApp}
                        className="text-[9px] font-bold text-emerald-700 border border-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 cursor-pointer"
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>

                  {/* Printed Receipt Paper Mockup */}
                  <div className="absolute -bottom-10 right-2 w-40 bg-white p-2.5 rounded-lg shadow-xl border border-slate-200 text-[8px] font-mono text-slate-700 rotate-3 z-20">
                    <div className="text-center pb-1 border-b border-dashed border-slate-300">
                      <span className="font-bold text-slate-900 block text-[9px]">WINGPOS RECEIPT</span>
                      <span className="text-[7px] text-slate-500">Techwokx Ghana</span>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <div className="flex justify-between">
                        <span>Earbuds</span>
                        <span>420.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fast Charger x2</span>
                        <span>360.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cable</span>
                        <span>75.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 pt-0.5 border-t border-slate-200">
                        <span>TOTAL</span>
                        <span>GH₵ 855.00</span>
                      </div>
                    </div>
                    {/* Fake QR code */}
                    <div className="w-8 h-8 mx-auto mt-1 border border-slate-300 bg-slate-100 flex items-center justify-center text-[6px]">
                      QR CODE
                    </div>
                    <div className="text-center text-[6px] text-slate-400 mt-1">
                      Thank you!
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: 36 Ghana & World Retail Holidays Promo Hub + Owner WhatsApp Approval */}
      <section id="holidays" className="py-16 lg:py-24 bg-gradient-to-b from-[#f8faf9]/50 via-white to-[#f0f9f5]/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>36 HOLIDAYS & INTERNATIONAL EVENTS PROMO AUTOMATION</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Run promos from all holidays and 36 international events in the world to your existing customers via WhatsApp.
            </h2>
            
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Capture seasonal shopping rushes with zero manual marketing hassle. WingPOS proactively notifies the business owner on WhatsApp before upcoming holidays with auto-generated festive copy, customizable discounts or promo pricing, and 1-tap approval directly via WhatsApp.
            </p>
          </div>

          {/* Interactive Holiday Marketing Experience Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Holiday Library & Pricing Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Popular Holidays & Events Included
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-center gap-2">
                      <span>🇬🇭</span>
                      <span>Ghana Independence Day</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 flex items-center gap-2">
                      <span>🐣</span>
                      <span>Easter & Family Picnic</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/80 border border-purple-200/80 text-purple-900 flex items-center gap-2">
                      <span>🌙</span>
                      <span>Eid al-Fitr & Sallah</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200/80 text-rose-900 flex items-center gap-2">
                      <span>🛍️</span>
                      <span>Black Friday Mega Sale</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 flex items-center gap-2">
                      <span>🎄</span>
                      <span>Christmas & Boxing Day</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200/80 text-sky-900 flex items-center gap-2">
                      <span>👩</span>
                      <span>Mother's & Women's Day</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-2">
                    + 30 more statutory holidays, Farmers' Day, Cyber Monday, Earth Day, Father's Day & Valentine's.
                  </span>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    How Owner WhatsApp Approval Works:
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-slate-900">3-Day Proactive WhatsApp Reminder:</strong> WingPOS detects the upcoming holiday and sends a WhatsApp prompt directly to the owner's phone.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-slate-900">Auto-Generated Festive Content:</strong> High-converting copy with store branding, store city, emojis, and urgency is created automatically.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="text-slate-900">Custom Discount or Price:</strong> Choose 10%–30% OFF or set custom promotional pricing (e.g. <em>GH₵ 99 Deal</em>).
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <strong className="text-slate-900">1-Tap WhatsApp Approval:</strong> Business owner replies "YES" on WhatsApp to instantly trigger broadcast to all existing customer contacts!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onNavigateToApp}
                    className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Launch POS Demo Direct</span>
                  </button>

                  <button
                    onClick={() => onNavigateToOnboarding('BUSINESS_PRO')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all cursor-pointer"
                  >
                    <span>New Business? Register</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual WhatsApp Mobile Simulation of Notification & Approval */}
              <div className="lg:col-span-5">
                <div className="w-full max-w-[340px] mx-auto bg-slate-900 p-3 rounded-[32px] shadow-2xl ring-1 ring-slate-800">
                  <div className="bg-[#eef2f5] rounded-[24px] overflow-hidden text-slate-800 text-xs flex flex-col h-[450px]">
                    
                    {/* WhatsApp Header */}
                    <div className="bg-[#075e54] text-white px-3 py-2.5 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white/80">←</span>
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                          W
                        </div>
                        <div>
                          <div className="flex items-center gap-1 font-bold text-xs text-white">
                            <span>WingPOS Holiday Bot</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-300 fill-emerald-300 text-white" />
                          </div>
                          <div className="text-[9px] text-emerald-100/90 leading-none">
                            Upcoming Promo Automation
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] text-emerald-200 font-mono">Today, 9:00 AM</span>
                    </div>

                    {/* WhatsApp Message Body */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#e5ddd5]/30 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:12px_12px]">
                      
                      {/* Alert Bubble sent to Owner */}
                      <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-[10px] font-extrabold text-emerald-800 flex items-center gap-1">
                            <Bell className="w-3 h-3 text-emerald-600" />
                            <span>UPCOMING PROMO ALERT</span>
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">09:00 GMT</span>
                        </div>

                        <div className="text-[11px] text-slate-800 space-y-1">
                          <p className="font-semibold text-slate-900">
                            Hello Techwokx Ghana Owner!
                          </p>
                          <p className="text-slate-600 text-[10px]">
                            Upcoming: <strong>Ghana Independence Day (March 6)</strong>
                          </p>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5 text-[10px] font-mono text-emerald-900">
                            Offer: <strong>25% OFF All Catalog</strong>
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-sans text-slate-700 leading-snug">
                          "🇬🇭⭐ Yεn Ara Asaase Ni! Happy 6th March from Techwokx Ghana! Enjoy our giant Freedom Promo of 25% OFF across our store in Accra today only. Message us here to claim your deals! 🎁"
                        </div>

                        <div className="text-[10px] bg-amber-50 border border-amber-200 rounded-lg p-1.5 text-amber-900">
                          👉 <strong>Reply "YES" to approve</strong> and auto-broadcast to all 154 registered customer numbers.
                        </div>

                        <div className="text-[8px] text-slate-400 text-right flex items-center justify-end gap-1">
                          <span>Delivered</span>
                          <span className="text-sky-500 font-bold">✓✓</span>
                        </div>
                      </div>

                      {/* Owner Approves via WhatsApp */}
                      <div className="bg-[#dcf8c6] rounded-xl p-2.5 shadow-xs border border-emerald-200 ml-6 space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-slate-900">Business Owner</span>
                          <span className="text-[8px] text-slate-500">09:04 GMT</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900">
                          YES, APPROVED! Broadcast 25% Independence Promo 🚀
                        </p>
                        <div className="text-[8px] text-slate-500 text-right">✓✓</div>
                      </div>

                      {/* Bot Confirmation */}
                      <div className="bg-white rounded-xl p-2.5 shadow-xs border border-emerald-300 text-[10px] text-emerald-900 space-y-1">
                        <div className="font-bold flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Broadcast Successfully Sent!</span>
                        </div>
                        <p className="text-slate-600">
                          Dispatched via WhatsApp to all 154 logged customer phones with personalized names.
                        </p>
                      </div>

                    </div>

                    {/* Chat Footer */}
                    <div className="bg-white p-2.5 border-t border-slate-200 text-center">
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                        ⚡ WhatsApp Auto-Pilot Active
                      </span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 1. WHATSAPP REPORTS SECTION */}
      <section id="whatsapp-reports" className="py-16 lg:py-24 bg-gradient-to-b from-[#f4faf7] via-white to-[#fbfdfc] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Automated Daily Close &amp; WhatsApp Reports</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Know your shop numbers before you sleep — delivered straight to WhatsApp.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              No more manual calculators, lost receipt books, or calling cashiers late at night. 
              WingPOS automatically calculates gross sales, payment channels, store expenses, and cash-in-drawer balance, sending the owner a complete executive summary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Key Features of WhatsApp Reporting */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Channel-by-Channel Breakdown</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Instant separation of Physical Cash, MTN MoMo, Telecel Cash, AT Money, and Visa/Mastercard (Paystack) totals so you can reconcile bank and drawer deposits in seconds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Instant Cash Discrepancy &amp; Leakage Alert</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Flags physical till shortages or unrecorded disbursements immediately. If expected cash doesn't match physical count, WingPOS highlights the exact variance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Staff &amp; Cashier Performance</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Track which cashier recorded which transactions using their personal 4-digit PIN, eliminating shift confusion and promoting staff accountability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigateToOnboarding('BUSINESS_PRO')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Get WhatsApp Reports for Your Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: WhatsApp Phone Simulation */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-[#efeae2] rounded-[36px] p-3 shadow-2xl border-4 border-slate-800">
                {/* Simulated Phone Top Notch */}
                <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 rounded-t-[28px] flex items-center justify-between">
                  <span className="font-semibold">9:01 PM</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] text-slate-300">WhatsApp Business</span>
                  </div>
                </div>

                {/* WhatsApp Chat Header */}
                <div className="bg-[#075e54] text-white p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950 font-black text-sm">
                    W
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">WingPOS Retail Bot</div>
                    <div className="text-[10px] text-emerald-200">Daily Close &amp; Reconciliation</div>
                  </div>
                </div>

                {/* WhatsApp Chat Area */}
                <div className="p-3.5 space-y-3 font-sans text-xs">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 space-y-2">
                    <div className="font-black text-slate-900 text-sm border-b border-slate-100 pb-1.5 flex items-center justify-between">
                      <span>📊 DAILY REGISTER CLOSE REPORT</span>
                      <span className="text-[10px] font-normal text-slate-500">Today</span>
                    </div>

                    <p className="text-[11px] text-slate-600">
                      Store: <strong className="text-slate-900">{business.name || 'Accra Central Supermarket'}</strong><br />
                      Closed by: <strong className="text-slate-900">Kofi Mensah (PIN: 1102)</strong>
                    </p>

                    <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-[11px]">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Total Gross Sales:</span>
                        <span className="text-emerald-700">GH₵ 3,845.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>• Cash in Till:</span>
                        <span>GH₵ 1,420.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>• MTN MoMo &amp; Telecel:</span>
                        <span>GH₵ 1,925.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>• Visa / Mastercard (Paystack):</span>
                        <span>GH₵ 500.00</span>
                      </div>
                    </div>

                    <div className="bg-amber-50/70 p-2.5 rounded-xl space-y-1 text-[11px] border border-amber-100">
                      <div className="flex justify-between text-amber-900 font-semibold">
                        <span>Shop Expenses Paid:</span>
                        <span>- GH₵ 220.00</span>
                      </div>
                      <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-amber-200">
                        <span>Net Cash Profit:</span>
                        <span className="text-emerald-700">GH₵ 3,625.00</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 text-emerald-900 p-2 rounded-xl text-[10px] font-bold flex items-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Reconciliation Verified: 0.00 discrepancy in cash till!</span>
                    </div>

                    <div className="text-[9px] text-slate-400 text-right">9:01 PM ✓✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solution" className="py-16 lg:py-24 bg-gradient-to-b from-[#f8faf9]/50 via-white to-[#f0f9f5]/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE WINGPOS SOLUTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Built to solve real retail headaches.
            </h2>
            <p className="text-base text-slate-600">
              How WingPOS transforms chaotic store counters into predictable, automated profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solution 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">The Problem: Cash &amp; MoMo Leakage</div>
                <h3 className="text-xl font-bold text-slate-900">End-of-day drawer variance and disputed customer transfers</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cashiers miscalculate change, customers show fabricated Mobile Money SMS messages, and owners spend hours trying to figure out why the till is short.
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="font-bold text-emerald-950 block mb-1">WingPOS Solution:</strong>
                Live camera scanner reads customer MoMo SMS and till slips to match amounts with transaction reference numbers in seconds. Zero guesswork.
              </div>
            </div>

            {/* Solution 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">The Problem: Remote Blindness</div>
                <h3 className="text-xl font-bold text-slate-900">Store owners kept in the dark when away from the shop</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Calling staff late at night asking for numbers, waiting for paper notebooks to be tallied, or worrying about stock when traveling.
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="font-bold text-emerald-950 block mb-1">WingPOS Solution:</strong>
                Automated WhatsApp Nightly Business Intelligence. Every evening, you receive a full financial digest on WhatsApp: total sales, cash vs MoMo, expenses, and staff shift balance.
              </div>
            </div>

            {/* Solution 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">The Problem: Internet Outages</div>
                <h3 className="text-xl font-bold text-slate-900">Network downtime halts queue checkout and loses sales</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cloud-only POS systems crash when local cellular networks drop or power cuts occur, forcing staff to revert to paper receipts and losing customer trust.
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="font-bold text-emerald-950 block mb-1">WingPOS Solution:</strong>
                100% Offline-First PWA. The cash register, catalog, and receipt printer operate locally without any internet connection, then seamlessly sync once back online.
              </div>
            </div>

            {/* Solution 4 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">The Problem: Customer Churn</div>
                <h3 className="text-xl font-bold text-slate-900">Quiet retail weeks and losing repeat buyers to competitors</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Customers walk in once and never return. Traditional stores have no way to reach existing shoppers with promotional discounts or festive holiday sales.
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="font-bold text-emerald-950 block mb-1">WingPOS Solution:</strong>
                WhatsApp Digital Receipts automatically capture customer phone numbers with permission, powering automated 36 holiday promotions that bring shoppers back.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY SECTION */}
      <section id="industry" className="py-16 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>INDUSTRY VERTICALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Engineered for every retail industry.
            </h2>
            <p className="text-base text-slate-600">
              Whether you run a high-traffic grocery, electronics boutique, pharmacy, or wholesale depot, WingPOS adapts to your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Supermarkets & Groceries',
                icon: ShoppingBag,
                desc: 'Fast barcode scanning, multi-lane cashier shifts, weigh-scale item entry, and fast bulk inventory imports.',
                features: ['Weigh-scale & barcode support', 'Multi-cashier shift balancing', 'Fast bulk CSV stock import'],
              },
              {
                title: 'Electronics & Mobile Gadgets',
                icon: Smartphone,
                desc: 'Serial & IMEI number logging, warranty tracking, customer phone capture, and instant Mobile Money split checkout.',
                features: ['IMEI & serial number logs', 'Warranty records on receipts', 'MTN MoMo & Telecel splits'],
              },
              {
                title: 'Pharmacies & Health Outlets',
                icon: Package,
                desc: 'Batch number logging, prescription notes, supplier invoices, and automated alerts before items reach expiry.',
                features: ['Batch & expiry date alerts', 'Prescription customer logs', 'Low-stock reorder triggers'],
              },
              {
                title: 'Fashion, Apparel & Boutiques',
                icon: Store,
                desc: 'Size and color variants, seasonal clearance promos, customer VIP ledgers, and digital WhatsApp receipts.',
                features: ['Size, color & variant matrices', 'Holiday clearance promo tags', 'Digital WhatsApp receipts'],
              },
              {
                title: 'Wholesale & FMCG Distribution',
                icon: Boxes,
                desc: 'Bulk tiered volume pricing, carton-to-unit sales, customer credit ledgers, and delivery invoice logs.',
                features: ['Tiered wholesale bulk pricing', 'Carton to piece conversion', 'Customer credit accounting'],
              },
              {
                title: 'Quick-Service Retail & Cafes',
                icon: Zap,
                desc: 'Fast touch screen menus, kitchen order slips, dual cash/MoMo registers, and daily perishable ingredient cost logs.',
                features: ['Quick-touch visual register', 'Perishable ingredient expenses', 'Instant SMS/receipt printing'],
              },
            ].map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-4 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{ind.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{ind.desc}</p>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {ind.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-200">
                    <button
                      onClick={() => onNavigateToOnboarding('BUSINESS_PRO')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore {ind.title} Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 lg:py-24 bg-gradient-to-b from-[#f4faf7] via-white to-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Store className="w-3.5 h-3.5" />
                <span>ABOUT WINGPOS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Built for retailers who refuse to fly blind.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                WingPOS was born from a fundamental observation across retail markets in Ghana and West Africa: retail merchants work 14 hours a day, yet lose significant profits each month to unverified Mobile Money payments, drawer shortages, untracked expenses, and manual paper bookkeeping fatigue.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                We engineered WingPOS to solve these realities from the ground up: an operating system that works 100% offline, bridges cash with Mobile Money through AI camera reconciliation, and delivers nightly business health reports directly to the tool merchants already use every hour — WhatsApp.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="text-2xl font-black text-slate-900 font-mono">2,400+</div>
                  <div className="text-xs text-slate-500 font-medium">Active storefronts powered</div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="text-2xl font-black text-emerald-600 font-mono">99.98%</div>
                  <div className="text-xs text-slate-500 font-medium">Offline register uptime</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToOnboarding('FREE_TRIAL')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onNavigateToApp}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  Launch Direct Demo
                </button>
              </div>
            </div>

            {/* Right: Pillars */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 mb-1">Bank-Grade MoMo Reconciliation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Point your camera at customer SMS confirmation slips to extract reference numbers, prevent fake payment alerts, and eliminate till discrepancies.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 mb-1">WhatsApp-Native Automation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No complicated corporate software. Get evening financial summaries on WhatsApp, issue digital customer receipts, and run seasonal promo campaigns.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 fill-purple-600 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 mb-1">Zero Hardware Lock-In</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Run WingPOS on any device you already own — Android phones, iPads, laptops, or standard thermal POS terminals.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PRICING & PLANS SECTION */}
      <section id="pricing" className="py-16 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Transparent Pricing &amp; Plans</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Predictable plans built for businesses of any scale.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Start with our 14-day free trial. Upgrade anytime as your retail branches grow. No hidden transaction cuts on cash.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs sm:text-sm font-semibold ${billingCycle === 'MONTHLY' ? 'text-slate-900' : 'text-slate-500'}`}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'MONTHLY' ? 'ANNUAL' : 'MONTHLY')}
                className="w-14 h-8 bg-emerald-600 rounded-full p-1 transition-colors relative cursor-pointer"
                aria-label="Toggle annual billing"
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    billingCycle === 'ANNUAL' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs sm:text-sm font-semibold ${billingCycle === 'ANNUAL' ? 'text-slate-900' : 'text-slate-500'}`}>
                  Annual Billing
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  SAVE 20%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl p-6 transition-all flex flex-col justify-between ${
                  p.popular
                    ? 'border-2 border-emerald-600 bg-white shadow-xl relative'
                    : 'border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{p.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">{p.price}</span>
                    <span className="text-xs text-slate-500 font-medium">{p.period}</span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2.5">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onNavigateToOnboarding(p.id)}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      p.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ROI CALCULATOR SECTION */}
      <section id="roi-calculator" className="py-16 lg:py-24 bg-gradient-to-b from-[#f0f9f5]/50 via-white to-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive ROI &amp; Revenue Protection Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              See how much cash leakage and manual time WingPOS saves your shop.
            </h2>
            <p className="text-base text-slate-600">
              Unreconciled registers lose an average of 3%–5% of turnover each month to untracked discounts, unverified MoMo payments, and drawer variances.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Daily Sales Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">
                    Average Daily Turnover:
                  </label>
                  <span className="text-lg font-black text-emerald-700">
                    GH₵ {roiDailySales.toLocaleString()} / day
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={roiDailySales}
                  onChange={(e) => setRoiDailySales(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>GH₵ 500</span>
                  <span>GH₵ 12,500</span>
                  <span>GH₵ 25,000+</span>
                </div>
              </div>

              {/* Staff Count Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">
                    Number of Cashiers &amp; Shop Staff:
                  </label>
                  <span className="text-lg font-black text-emerald-700">
                    {roiStaffCount} {roiStaffCount === 1 ? 'Person' : 'People'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={roiStaffCount}
                  onChange={(e) => setRoiStaffCount(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>1 cashier</span>
                  <span>5 team members</span>
                  <span>10+ attendants</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-800">Calculated with Ghana retail benchmarks:</div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>3.2% estimated leakage eliminated via Camera MoMo reconciliation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1.5 hours of manual daily bookkeeping recovered per staff member</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>18% holiday sales uplift across Ghana's 36 seasonal calendar events</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Metrics Display */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-[#032e25] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Estimated Monthly Value Delivered
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  GH₵ {Math.round(roiDailySales * 30 * 0.032 + roiDailySales * 30 * 0.15).toLocaleString()}
                  <span className="text-sm font-semibold text-emerald-300"> / month</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/80">
                <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                  <div className="text-[11px] text-slate-300">Cash Leakage Stopped:</div>
                  <div className="text-xl font-bold text-emerald-300 mt-0.5">
                    GH₵ {Math.round(roiDailySales * 30 * 0.032).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">per month</div>
                </div>

                <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                  <div className="text-[11px] text-slate-300">Reconciliation Hours Saved:</div>
                  <div className="text-xl font-bold text-emerald-300 mt-0.5">
                    {Math.round(roiStaffCount * 1.5 * 26)} hrs
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">staff time monthly</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToOnboarding('FREE_TRIAL')}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Start Free Trial — Protect Your Revenue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section id="faq" className="py-16 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to know about WingPOS
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear answers on WhatsApp delivery, permissions, hardware printers, and payment channels.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does the WhatsApp Daily Close Report work?',
                a: 'Every evening when you close your till or at your scheduled closing time, WingPOS automatically summarizes all sales, separates Cash from Mobile Money (MTN, Telecel, AT) and Card payments, deducts shop expenses, and delivers the report straight to the business owner\'s personal WhatsApp. You don\'t even have to open the app.',
              },
              {
                q: 'Can staff members access my dashboard, expenses, or change payment settings?',
                a: 'No. WingPOS comes with role-based access control (RBAC). Staff and Cashiers only have access to the sales register, which is locked behind their unique 4-digit PIN. Only the business owner can view the executive dashboard, manage expense records, perform audit reconciliation, or configure payment gateways.',
              },
              {
                q: 'Can I connect a thermal receipt printer via Bluetooth or Wi-Fi?',
                a: 'Yes! WingPOS has built-in Bluetooth and Wi-Fi receipt printer connectivity. You can connect to standard 58mm or 80mm ESC/POS thermal printers directly from your browser to print customer receipts and complete sales accounting ledgers.',
              },
              {
                q: 'How does Visa & Mastercard card payment via Paystack work?',
                a: 'When you record a sale, select the Visa / Mastercard option. You can enter or scan card details processed securely through Paystack Ghana. The reference code is logged automatically into your ledger, and funds settle directly into your linked bank or MoMo account.',
              },
              {
                q: 'What is the 36 Holidays Promo feature?',
                a: 'WingPOS comes preloaded with Ghana\'s full 36 retail and cultural holidays (e.g. Independence Day, Eid, Mother\'s Day, Farmer\'s Day, Cyber Week, Christmas). Before each event, WingPOS drafts a high-conversion promotional message with your chosen discount rate. You review and approve it with one tap to send to your customer database.',
              },
              {
                q: 'Do I need special POS hardware or a desktop computer?',
                a: 'No special hardware is required. WingPOS runs seamlessly on any smartphone, iPad/tablet, or computer laptop. You can even use your phone camera directly on customer SMS screens to verify MoMo payments.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 lg:py-24 bg-[#f8faf9]/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>CONTACT WINGPOS SUPPORT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              We're here to help your store thrive.
            </h2>
            <p className="text-base text-slate-600">
              Questions about hardware compatibility, WhatsApp reporting, multi-store setups, or custom VPS deployment? Chat with our retail engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-5 shadow-xs">
                <h3 className="font-bold text-lg text-slate-900">Direct Support Channels</h3>

                <a
                  href={`https://wa.me/233244567890?text=${encodeURIComponent('Hello WingPOS team, I would like to inquire about setting up WingPOS for my retail shop.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 bg-[#00a884] hover:bg-[#008f70] text-white rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  <div>
                    <div>Chat on WhatsApp (+233 24 456 7890)</div>
                    <div className="text-[10px] text-emerald-100 font-normal">Typical reply time: Under 5 minutes</div>
                  </div>
                </a>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Phone Hotline</div>
                      <div className="text-slate-500">{business.phone || '+233 24 456 7890'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Official Email Support</div>
                      <div className="text-slate-500 font-mono">support@wingpos.app</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Retail Support Hub</div>
                      <div className="text-slate-500">Accra, Ghana · Mon – Sat (7:00 AM – 9:00 PM GMT)</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenVpsGuide}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>View Self-Hosted VPS Deployment Guide</span>
                </button>
              </div>
            </div>

            {/* Right: In-Page Contact Form */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-black text-xl text-slate-900 mb-2">Send an Instant Message</h3>
              <p className="text-xs text-slate-500 mb-6">
                Tell us about your business, and a retail specialist will reach out to you via WhatsApp or phone.
              </p>

              {contactSubmitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Thank you, {contactForm.name}!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your inquiry has been received. Our retail onboarding specialist will contact you on WhatsApp ({contactForm.phone}) shortly.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', phone: '', storeName: '', city: 'Accra', message: '' });
                    }}
                    className="text-xs font-bold text-emerald-700 underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!contactForm.name || !contactForm.phone) return;
                    setContactSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Kwesi Mensah"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="e.g. +233 24 123 4567"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Shop / Store Name</label>
                      <input
                        type="text"
                        value={contactForm.storeName}
                        onChange={(e) => setContactForm({ ...contactForm, storeName: e.target.value })}
                        placeholder="e.g. Mensah Supermarket"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                      <input
                        type="text"
                        value={contactForm.city}
                        onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                        placeholder="e.g. Accra, Kumasi, Takoradi"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message or Inquiries</label>
                    <textarea
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us what you sell, how many cashiers you have, or any specific POS hardware you want to use."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to WingPOS Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* START FREE TRIAL & DIRECT DEMO BANNER */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#033b31] via-[#054337] to-[#04604b] rounded-[32px] p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Copy */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-emerald-300 shrink-0 border border-white/20">
                <ShieldCheck className="w-8 h-8 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Start Your 14-Day Free Trial Today
                </h3>
                <p className="text-sm sm:text-base text-emerald-100/90 font-normal">
                  Protect your revenue, stop cash leakage, and receive automated WhatsApp business health reports every evening.
                </p>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateToOnboarding('FREE_TRIAL')}
                className="bg-white hover:bg-slate-100 text-slate-950 font-black text-sm px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Start Free Trial (14 Days)</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>

              <button
                onClick={onNavigateToApp}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-5 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Direct Demo</span>
              </button>

              <a
                href="#install-app"
                className="bg-black/30 hover:bg-black/40 border border-white/20 text-white font-bold text-sm px-4 py-3.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-300" />
                <span>Install App</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Clean Footer matching the design */}
      <footer className="border-t border-slate-100 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current" aria-hidden="true">
                <path d="M4 4h4.5v16H4V4zm6.5 0h4.2l5.3 7.8L14.7 20h-4.3l4.8-7.5L10.5 4z" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              WingPOS
            </span>
          </div>

          {/* Center: Tagline */}
          <div className="text-sm font-medium text-slate-600">
            Retail Business Intelligence with WhatsApp Automation
          </div>

          {/* Right: Actions & Instance */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onNavigateToApp} 
              className="font-mono text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              wingpos.app
            </button>
            <span>·</span>
            <button 
              onClick={() => onNavigateToOnboarding('BUSINESS_PRO')}
              className="text-slate-600 hover:text-emerald-700 font-semibold cursor-pointer"
            >
              New Business? Register
            </button>
          </div>
        </div>
      </footer>

      {/* Camera MoMo & Receipt Scanner Modal (usable directly from Landing Page!) */}
      <ScanReconciliationModal
        isOpen={showCameraScannerModal}
        onClose={() => setShowCameraScannerModal(false)}
        onScanExtracted={handleScanCompleted}
        currency={business.currency}
      />

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Simple, Transparent Pricing</h3>
                <p className="text-sm text-slate-500">Choose the plan that fits your retail shop.</p>
              </div>
              <button 
                onClick={() => setShowPricingModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-slate-100 p-1 rounded-full flex items-center text-xs font-bold">
                <button
                  onClick={() => setBillingCycle('MONTHLY')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    billingCycle === 'MONTHLY' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('ANNUAL')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    billingCycle === 'ANNUAL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Annual (20% Off)
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((p) => (
                <div 
                  key={p.id} 
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    p.popular 
                      ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div>
                    {p.popular && (
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full inline-block mb-2">
                        Most Popular
                      </span>
                    )}
                    <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-3">{p.description}</p>
                    <div className="mb-4">
                      <span className="text-2xl font-black text-slate-900 font-mono">{p.price}</span>
                      <span className="text-xs text-slate-500 ml-1">{p.period}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 mb-6">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowPricingModal(false);
                      onNavigateToOnboarding(p.id);
                    }}
                    className={`w-full py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      p.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-xl font-bold text-slate-900">About WingPOS</h3>
              <button 
                onClick={() => setShowAboutModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              WingPOS is the modern retail business intelligence platform built specifically for retail storefronts, supermarkets, boutiques, and pharmacies across West Africa.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Our mission is to eliminate cash shrinkage and guesswork in retail through seamless POS checkout, integrated Mobile Money reconciliation, phone camera scanning for MoMo SMS alerts, and automated daily WhatsApp financial close reports delivered directly to the business owner every evening.
            </p>
            <button
              onClick={() => {
                setShowAboutModal(false);
                onNavigateToOnboarding('BUSINESS_PRO');
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-full text-sm transition-colors cursor-pointer"
            >
              Start Free Trial with WingPOS
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-xl font-bold text-slate-900">Contact WingPOS Support</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Store className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">Store Support Hub</div>
                  <div className="text-xs text-slate-500">Accra, Ghana</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">WhatsApp & Phone Hotline</div>
                  <div className="text-xs text-slate-500">{business.phone || '+233 24 456 7890'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Server className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">Self-Hosted VPS Inquiries</div>
                  <div className="text-xs text-slate-500">support@wingpos.app</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowContactModal(false);
                onOpenVpsGuide();
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-full text-xs transition-colors cursor-pointer mb-2"
            >
              Open VPS & Self-Host Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
