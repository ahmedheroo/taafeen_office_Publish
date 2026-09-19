/**
 * Chat Widget — Taafeen Umrah Services Assistant
 * AI-powered booking and information assistant for Umrah, transport, and hotels in Saudi Arabia
 *
 * Usage:
 *   <script src="chat-widget.js"></script>
 *   <script>ChatWidget.init({ apiUrl: 'http://localhost:29917' });</script>
 */
(function (global) {
  'use strict';

  /* ─── Brand Colors ─────────────────────────────────────────── */
  var BRAND = {
    primary: '#1643E8',
    primaryLight: '#3764FF',
    primaryDark: '#0B268C',
    primaryGradient: 'linear-gradient(135deg, #0B258D 0%, #1643E8 58%, #3764FF 100%)',
    accent: '#D9A52E',
    accentLight: '#FFF2CB',
    accentDark: '#A9780D',
    bg: '#F7F9FF',
    bgWarm: '#EEF3FF',
    textDark: '#17203E',
    textMuted: '#6B7594',
    textLight: '#FFFFFF',
    shadow: 'rgba(22, 67, 232, 0.28)',
    cardBg: '#FFFFFF',
    border: '#E5E7EB',
    msgUser: '#1643E8',
    msgAssistant: '#FFFFFF',
    chipBg: '#EEF3FF',
    chipBorder: '#C9D6FF',
    danger: '#DC2626',
    dangerBg: '#FEF2F2'
  };

  /* ─── Translations ─────────────────────────────────────────── */
  var TRANSLATIONS = {
    en: {
      title: "Taafeen",
      subtitle: "Umrah, Transport & Hotels",
      placeholder: "Ask about Umrah packages, transport, hotels, or booking...",
      greeting:
        "👋 Welcome to <strong>Taafeen Umrah Services</strong>! I can help arrange your Umrah journey in Saudi Arabia. 🚌✨<br><br>" +
        "I can help you with:<br>" +
        "📍 Transport between Riyadh, Makkah & Madinah<br>" +
        "🏨 Hotel and accommodation options near the Haram<br>" +
        "📋 Individual, family, and group Umrah packages<br>" +
        "❓ Answering your questions<br><br>" +
        "How can I assist you today?",
      suggestions: [
        "📋 Book an Umrah package",
        "🏨 Hotel accommodation",
        "🚌 VIP transport"
      ],
      errorDefault: "⚠️ Sorry, something went wrong. Please try again.",
      errorNetwork: "⚠️ Unable to connect. Please check your internet connection.",
      bookingTitle: "📋 Request an Umrah Booking",
      bookingName: "Full Name",
      bookingPhone: "Phone Number",
      bookingPackageType: "Booking Type",
      bookingRoute: "Preferred Route",
      bookingDate: "Travel Date",
      bookingPassengers: "Number of Passengers",
      bookingHotelCity: "Hotel City",
      bookingCheckIn: "Hotel Check-in Date",
      bookingNights: "Number of Nights",
      bookingRooms: "Number of Rooms",
      bookingNotes: "Hotel, package, or additional requests (optional)",
      bookingSubmit: "Send Booking via WhatsApp",
      bookingSending: "Opening WhatsApp...",
      bookingSuccess: "✅ Booking request ready! Click the button below to send via WhatsApp.",
      bookingFailed: "⚠️ WhatsApp didn't open? Click the button below manually.",
      routes: {
        meccaToRiyadh: "📍 Mecca → Riyadh",
        riyadhToMecca: "📍 Riyadh → Mecca",
        riyadhMeccaMadinah: "📍 Riyadh → Makkah → Madinah"
      },
      reset: "New conversation",
      ariaClose: "Close chat",
      ariaOpen: "Open chat",
      ariaLang: "Switch to العربية",
      ariaSend: "Send message",
      scrollToBottom: "Scroll to latest messages",
      bookingViaWhatsapp: "📲 Send Booking via WhatsApp",
      bookingConfirmed: "✅ Booking submitted! We'll contact you soon.",
      requiredFields: "Please fill in all required fields highlighted below"
    },
    ar: {
      title: "قافلة الطائفين",
      subtitle: "العمرة والنقل والفنادق",
      placeholder: "اسأل عن باقات العمرة أو النقل أو الفنادق أو الحجز...",
      greeting:
        "👋 مرحبًا بك في <strong>قافلة الطائفين لخدمات العمرة</strong>! أساعدك في ترتيب رحلة العمرة داخل المملكة العربية السعودية. 🚌✨<br><br>" +
        "يمكنني مساعدتك في:<br>" +
        "📍 النقل بين الرياض ومكة والمدينة<br>" +
        "🏨 خيارات الفنادق والسكن القريب من الحرم<br>" +
        "📋 باقات العمرة للأفراد والعائلات والمجموعات<br>" +
        "❓ الإجابة على استفساراتك<br><br>" +
        "كيف يمكنني مساعدتك اليوم؟",
      suggestions: [
        "📋 احجز باقة عمرة",
        "🏨 السكن والفنادق",
        "🚌 نقل VIP"
      ],
      errorDefault: "⚠️ عذرًا، حدث خطأ ما. يُرجى المحاولة مرة أخرى.",
      errorNetwork: "⚠️ تعذر الاتصال بالمساعد. يُرجى التحقق من اتصالك بالإنترنت.",
      bookingTitle: "📋 طلب حجز عمرة",
      bookingName: "الاسم الكامل",
      bookingPhone: "رقم الجوال",
      bookingPackageType: "نوع الحجز",
      bookingRoute: "المسار المطلوب",
      bookingDate: "تاريخ السفر",
      bookingPassengers: "عدد الركاب",
      bookingHotelCity: "مدينة الفندق",
      bookingCheckIn: "تاريخ دخول الفندق",
      bookingNights: "عدد الليالي",
      bookingRooms: "عدد الغرف",
      bookingNotes: "طلب فندق أو باقة أو ملاحظات إضافية (اختياري)",
      bookingSubmit: "إرسال الحجز عبر واتساب",
      bookingSending: "جاري فتح واتساب...",
      bookingSuccess: "✅ طلب الحجز جاهز! اضغط الزر أدناه للإرسال عبر واتساب.",
      bookingFailed: "⚠️ لم يتم فتح واتساب؟ اضغط الزر أدناه للإرسال يدويًا.",
      routes: {
        meccaToRiyadh: "📍 مكة ← الرياض",
        riyadhToMecca: "📍 الرياض ← مكة",
        riyadhMeccaMadinah: "📍 الرياض ← مكة ← المدينة"
      },
      reset: "محادثة جديدة",
      ariaClose: "إغلاق الشات",
      ariaOpen: "فتح الشات",
      ariaLang: "التبديل إلى English",
      ariaSend: "إرسال الرسالة",
      scrollToBottom: "الانتقال إلى أحدث الرسائل",
      bookingViaWhatsapp: "📲 إرسال الحجز عبر واتساب",
      bookingConfirmed: "✅ تم إرسال الحجز! سنتواصل معك قريبًا.",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة المظللة أدناه"
    }
  };

  /* ─── Defaults & State ────────────────────────────────────── */
  var DEFAULTS = {
    apiUrl: 'http://localhost:5000',
    position: 'right',
    primaryColor: BRAND.primary,
    provider: undefined,
    model: undefined,
      avatar: '🤖'
  };

  var opts = {};
  var conversationId = null;
  var isLoading = false;
  var currentLang = 'ar';
  var widgetEl = null;
  var toggleEl = null;
  var isOpen = false;
  var unreadCount = 0;
  var lastMsgTime = null;

  /* ─── DOM Helper ───────────────────────────────────────────── */
  function el(tag, attrs, children) {
    var elem = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') { elem.className = attrs[k]; }
        else if (k === 'style') { elem.style.cssText = attrs[k]; }
        else if (k === 'htmlFor') { elem.setAttribute('for', attrs[k]); }
        else { elem.setAttribute(k, attrs[k]); }
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (typeof c === 'string') { elem.appendChild(document.createTextNode(c)); }
        else if (c) { elem.appendChild(c); }
      });
    }
    return elem;
  }
  function $id(id) { return document.getElementById(id); }

  /* ─── i18n ─────────────────────────────────────────────────── */
  function getText(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
           (TRANSLATIONS.en && TRANSLATIONS.en[key]) || '';
  }

  function getRoute(key) {
    var routes = TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].routes;
    return (routes && routes[key]) || key;
  }

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('chatWidgetLang', lang);

    // Update entire widget direction
    if (widgetEl) {
      widgetEl.setAttribute('lang', lang);
      widgetEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      widgetEl.classList.toggle('chat-rtl', lang === 'ar');
      widgetEl.classList.toggle('chat-ltr', lang !== 'ar');
    }

    var header = widgetEl && widgetEl.querySelector('.chat-header');
    if (header) {
      var titleEl = header.querySelector('h3');
      var subEl = header.querySelector('p');
      if (titleEl) titleEl.textContent = getText('title');
      if (subEl) subEl.textContent = getText('subtitle');
      if (lang === 'ar') {
        header.classList.add('rtl');
        header.style.direction = 'rtl';
      } else {
        header.classList.remove('rtl');
        header.style.direction = 'ltr';
      }
      var langBtn = header.querySelector('.chat-lang-btn');
      if (langBtn) {
        langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
        langBtn.setAttribute('aria-label', getText('ariaLang'));
      }
    }

    // Update toggle aria-label
    if (toggleEl) {
      toggleEl.setAttribute('aria-label', isOpen ? getText('ariaClose') : getText('ariaOpen'));
    }

    var input = $id('chat-input-field');
    if (input) {
      input.placeholder = getText('placeholder');
      input.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      input.classList.toggle('rtl', lang === 'ar');
    }

    var greetingEl = $id('chat-greeting-msg');
    if (greetingEl) {
      var greetingRtl = lang === 'ar' || isRtlText(getText('greeting'));
      greetingEl.setAttribute('dir', greetingRtl ? 'rtl' : 'ltr');
      greetingEl.className = 'chat-msg assistant' + (greetingRtl ? ' rtl' : ' ltr');
      greetingEl.innerHTML = formatMessage(getText('greeting'));
    }

    var msgContainer = $id('chat-messages');
    if (msgContainer) {
      msgContainer.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }

    renderSuggestions(getText('suggestions'));
  }

  function hasArabicChar(text) {
    if (!text) return false;
    var arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  }

  function isRtlText(text) {
    if (!text) return false;
    if (currentLang === 'ar') return true;
    return hasArabicChar(text);
  }

  /* ─── Timestamp helper ─────────────────────────────────────── */
  function formatTime(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  /* ─── Inject Styles ────────────────────────────────────────── */
  function injectStyles() {
    var c = opts.primaryColor || BRAND.primary;
    var css = [
      '@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");',
      '',
      '#chat-widget-container * { box-sizing: border-box; margin: 0; padding: 0; }',
      '',
      '#chat-widget-toggle {',
      '  position: fixed; bottom: 24px; ' + (opts.position === 'left' ? 'left' : 'right') + ': 24px;',
      '  width: 62px; height: 62px; border-radius: 20px;',
      '  background: ' + BRAND.primaryGradient + '; color: #fff; border: none;',
      '  font-size: 28px; cursor: pointer;',
      '  box-shadow: 0 12px 26px ' + BRAND.shadow + ';',
      '  z-index: 10000;',
      '  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;',
      '  display: flex; align-items: center; justify-content: center;',
      '}',
      '#chat-widget-toggle:hover { transform: translateY(-3px); box-shadow: 0 16px 32px ' + BRAND.shadow + '; }',
      '#chat-widget-toggle:active { transform: scale(0.95); }',
      '',
      '/* Notification badge */',
      '#chat-widget-toggle .badge {',
      '  position: absolute; top: -4px; right: -4px;',
      '  min-width: 22px; height: 22px; border-radius: 11px;',
      '  background: ' + BRAND.danger + '; color: #fff;',
      '  font-size: 11px; font-weight: 700; line-height: 22px; text-align: center;',
      '  padding: 0 6px; box-shadow: 0 2px 6px rgba(220,38,38,0.4);',
      '  display: none;',
      '}',
      '#chat-widget-toggle .badge.show { display: block; }',
      '',
      '#chat-widget-panel {',
      '  position: fixed; bottom: 100px; ' + (opts.position === 'left' ? 'left' : 'right') + ': 24px;',
      '  width: 410px; max-height: 640px;',
      '  background: ' + BRAND.bg + '; border-radius: 24px;',
      '  border: 1px solid rgba(22,67,232,0.12);',
      '  box-shadow: 0 20px 56px rgba(11,38,140,0.22);',
      '  display: flex; flex-direction: column;',
      '  overflow: hidden; z-index: 10000;',
      '  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);',
      '  font-family: "Inter", "Cairo", system-ui, -apple-system, sans-serif;',
      '}',
      '#chat-widget-panel.chat-hidden {',
      '  opacity: 0; transform: translateY(24px) scale(0.93);',
      '  pointer-events: none;',
      '}',
      '',
      '#chat-widget-panel.chat-rtl { direction: rtl; }',
      '',
      '/* Staggered entrance animation */',
      '@keyframes staggerIn {',
      '  from { opacity: 0; transform: translateY(12px); }',
      '  to { opacity: 1; transform: translateY(0); }',
      '}',
      '#chat-widget-panel:not(.chat-hidden) .chat-header { animation: staggerIn 0.35s ease both; }',
      '#chat-widget-panel:not(.chat-hidden) #chat-suggestions { animation: staggerIn 0.35s ease 0.08s both; }',
      '#chat-widget-panel:not(.chat-hidden) #chat-messages { animation: staggerIn 0.35s ease 0.15s both; }',
      '#chat-widget-panel:not(.chat-hidden) .chat-input-area { animation: staggerIn 0.35s ease 0.22s both; }',
      '',
      '.chat-header {',
      '  background: ' + BRAND.primaryGradient + ';',
      '  min-height: 88px; padding: 20px 22px; color: #fff;',
      '  display: flex; align-items: center; gap: 14px;',
      '  position: relative;',
      '  overflow: hidden;',
      '}',
      '.chat-header::before {',
      '  content: "";',
      '  position: absolute; top: -50%; right: -20%;',
      '  width: 120px; height: 120px;',
      '  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);',
      '  border-radius: 50%;',
      '  pointer-events: none;',
      '}',
      '.chat-header::after {',
      '  content: "";',
      '  position: absolute; bottom: -30%; left: -10%;',
      '  width: 80px; height: 80px;',
      '  background: radial-gradient(circle, rgba(217,165,46,0.26) 0%, transparent 70%);',
      '  border-radius: 50%;',
      '  pointer-events: none;',
      '}',
      '.chat-avatar {',
      '  width: 44px; height: 44px; background: #fff;',
      '  border-radius: 14px; display: flex; align-items: center;',
      '  justify-content: center; font-size: 25px; font-weight: 700; flex-shrink: 0;',
      '  color: ' + BRAND.primary + '; border: 2px solid rgba(255,255,255,0.5);',
      '  backdrop-filter: blur(4px);',
      '  position: relative; z-index: 1;',
      '}',
      '.chat-header-text { flex: 1; position: relative; z-index: 1; }',
      '.chat-header h3 { font-size: 16px; font-weight: 700; letter-spacing: 0.3px; }',
      '.chat-header p { font-size: 12px; opacity: 0.88; font-weight: 400; }',
      '.chat-header.rtl { direction: rtl; text-align: right; }',
      '',
      '.chat-header-actions { display: flex; gap: 6px; position: relative; z-index: 1; flex-shrink: 0; }',
      '.chat-header.rtl .chat-header-actions { margin-left: 0; }',
      '',
      '.chat-lang-btn, .chat-reset-btn {',
      '  width: 34px; height: 34px; border-radius: 50%;',
      '  border: 1px solid rgba(255,255,255,0.35);',
      '  background: rgba(255,255,255,0.12); color: #fff;',
      '  cursor: pointer; flex-shrink: 0;',
      '  transition: all 0.2s; display: flex; align-items: center; justify-content: center;',
      '  backdrop-filter: blur(4px);',
      '}',
      '.chat-lang-btn { font-size: 10px; font-weight: 700; letter-spacing: 0.5px; }',
      '.chat-reset-btn { font-size: 14px; }',
      '.chat-lang-btn:hover, .chat-reset-btn:hover { background: rgba(255,255,255,0.25); }',
      '',
      '#chat-messages {',
      '  flex: 1; overflow-y: auto; padding: 20px 16px;',
      '  display: flex; flex-direction: column; gap: 12px;',
      '  min-height: 280px; max-height: 380px;',
      '  background: linear-gradient(180deg, #F7F9FF 0%, #FFFFFF 100%);',
      '  scroll-behavior: smooth;',
      '}',
      '#chat-messages::-webkit-scrollbar { width: 4px; }',
      '#chat-messages::-webkit-scrollbar-track { background: transparent; }',
      '#chat-messages::-webkit-scrollbar-thumb { background: ' + BRAND.accentLight + '; border-radius: 4px; }',
      '',
      '/* Scroll-to-bottom button */',
      '#chat-scroll-bottom {',
      '  position: absolute; bottom: 56px; left: 50%; transform: translateX(-50%);',
      '  width: 36px; height: 36px; border-radius: 50%;',
      '  background: ' + BRAND.cardBg + '; color: ' + BRAND.primary + ';',
      '  border: 1px solid ' + BRAND.border + '; cursor: pointer;',
      '  font-size: 18px; display: none; align-items: center; justify-content: center;',
      '  box-shadow: 0 2px 12px rgba(0,0,0,0.12);',
      '  z-index: 10; transition: all 0.2s;',
      '}',
      '#chat-scroll-bottom:hover { transform: translateX(-50%) translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.18); }',
      '#chat-scroll-bottom.show { display: flex; }',
      '',
      '.chat-msg-wrapper { position: relative; display: flex; flex-direction: column; animation: msgIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }',
      '',
      '.chat-msg {',
      '  max-width: 88%; padding: 12px 16px; border-radius: 18px;',
      '  font-size: 14px; line-height: 1.6; word-wrap: break-word;',
      '}',
      '@keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }',
      '',
      '.chat-msg.user {',
      '  background: ' + BRAND.primaryGradient + '; color: #fff;',
      '  align-self: flex-end;',
      '  border-bottom-right-radius: 4px;',
      '  box-shadow: 0 7px 16px rgba(22,67,232,0.22);',
      '}',
      '#chat-widget-panel.chat-rtl .chat-msg.user {',
      '  align-self: flex-start;',
      '  border-bottom-right-radius: 18px;',
      '  border-bottom-left-radius: 4px;',
      '}',
      '',
      '.chat-msg.assistant {',
      '  background: ' + BRAND.msgAssistant + '; color: ' + BRAND.textDark + ';',
      '  align-self: flex-start;',
      '  border-bottom-left-radius: 4px;',
      '  border: 1px solid ' + BRAND.border + ';',
      '}',
      '#chat-widget-panel.chat-rtl .chat-msg.assistant {',
      '  align-self: flex-end;',
      '  border-bottom-left-radius: 18px;',
      '  border-bottom-right-radius: 4px;',
      '}',
      '',
      '.chat-msg.assistant strong { color: ' + BRAND.primary + '; }',
      '.chat-msg.rtl { direction: rtl; text-align: right; }',
      '.chat-msg.ltr { direction: ltr; text-align: left; }',
      '#chat-input-field.rtl { direction: rtl; text-align: right; }',
      '',
      '/* Message timestamp */',
      '.chat-time {',
      '  font-size: 10px; color: ' + BRAND.textMuted + '; margin-top: 3px;',
      '  opacity: 0.7;',
      '}',
      '.chat-msg-wrapper.user .chat-time { color: rgba(255,255,255,0.65); }',
      '.chat-msg-wrapper {',
      '  display: flex; flex-direction: column;',
      '  align-items: flex-end;',
      '}',
      '.chat-msg-wrapper.assistant-wrapper { align-items: flex-start; }',
      '',
      '.chat-typing {',
      '  display: flex; gap: 5px; align-items: center;',
      '  padding: 16px 20px; background: ' + BRAND.msgAssistant + ';',
      '  border-radius: 18px; align-self: flex-start;',
      '  border: 1px solid ' + BRAND.border + ';',
      '  animation: msgIn 0.2s ease;',
      '}',
      '.chat-typing span { width: 8px; height: 8px; background: ' + BRAND.accent + '; border-radius: 50%; animation: chatBounce 1.4s infinite; }',
      '.chat-typing span:nth-child(2) { animation-delay: 0.2s; }',
      '.chat-typing span:nth-child(3) { animation-delay: 0.4s; }',
      '@keyframes chatBounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }',
      '',
      '.chat-input-area {',
      '  padding: 14px 16px; border-top: 1px solid ' + BRAND.border + ';',
      '  display: flex; gap: 10px; background: #FFFFFF;',
      '}',
      '#chat-widget-panel.chat-rtl .chat-input-area { direction: rtl; }',
      '#chat-widget-panel.chat-rtl .chat-input-area input { text-align: right; }',
      '.chat-input-area input {',
      '  flex: 1; padding: 12px 18px; border: 2px solid ' + BRAND.border + ';',
      '  border-radius: 28px; font-size: 14px; outline: none;',
      '  transition: border-color 0.25s, box-shadow 0.25s;',
      '  font-family: inherit; background: ' + BRAND.bg + ';',
      '}',
      '.chat-input-area input:focus {',
      '  border-color: ' + BRAND.primary + ';',
      '  box-shadow: 0 0 0 3px rgba(22,67,232,0.12);',
      '}',
      '.chat-input-area input::placeholder { color: ' + BRAND.textMuted + '; }',
      '.chat-input-area button {',
      '  width: 44px; height: 44px; background: ' + BRAND.primaryGradient + '; color: #fff;',
      '  border: none; border-radius: 50%; cursor: pointer; font-size: 20px;',
      '  display: flex; align-items: center; justify-content: center;',
      '  flex-shrink: 0; transition: all 0.2s;',
      '  box-shadow: 0 7px 16px rgba(22,67,232,0.25);',
      '}',
      '.chat-input-area button:hover { transform: translateY(-2px); box-shadow: 0 9px 18px rgba(22,67,232,0.35); }',
      '.chat-input-area button:active { transform: scale(0.92); }',
      '.chat-input-area button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }',
      '',
      '#chat-suggestions {',
      '  padding: 10px 16px; display: flex; flex-wrap: wrap; gap: 6px;',
      '  background: ' + BRAND.bg + ';',
      '}',
      '#chat-widget-panel.chat-rtl #chat-suggestions {',
      '  direction: rtl;',
      '  justify-content: flex-end;',
      '}',
      '.chat-chip {',
      '  font-size: 12px; padding: 6px 14px; border-radius: 16px;',
      '  border: 1.5px solid ' + BRAND.chipBorder + ';',
      '  color: ' + BRAND.primary + '; background: ' + BRAND.chipBg + ';',
      '  cursor: pointer; transition: all 0.2s; white-space: nowrap;',
      '  font-weight: 500;',
      '}',
      '.chat-chip:hover {',
      '  background: ' + BRAND.primaryGradient + '; color: #fff;',
      '  border-color: ' + BRAND.primary + ';',
      '  transform: translateY(-1px);',
      '  box-shadow: 0 5px 14px rgba(22,67,232,0.2);',
      '}',
      '.chat-chip:active { transform: translateY(0); }',
      '',
      '/* ─── Booking Form Styles ──────────────────────────── */',
      '.chat-booking-form {',
      '  background: #FFFFFF; border-radius: 18px; padding: 20px;',
      '  border: 1px solid ' + BRAND.border + ';',
      '  max-width: 100%; width: 100%; margin-top: 8px;',
      '  animation: msgIn 0.35s ease;',
      '  box-shadow: 0 2px 12px rgba(0,0,0,0.06);',
      '  box-sizing: border-box;',
      '}',
      '.chat-booking-form h4 {',
      '  font-size: 16px; color: ' + BRAND.primary + '; margin-bottom: 16px;',
      '  font-weight: 700; text-align: center;',
      '}',
      '.booking-field { margin-bottom: 14px; }',
      '.booking-field label {',
      '  display: block; font-size: 12px; font-weight: 600;',
      '  color: ' + BRAND.textMuted + '; margin-bottom: 4px;',
      '  transition: color 0.2s;',
      '}',
      '.booking-field input, .booking-field select, .booking-field textarea {',
      '  width: 100%; min-height: 44px; padding: 10px 14px; border: 2px solid ' + BRAND.border + ';',
      '  border-radius: 12px; font-size: 14px; outline: none;',
      '  transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit;',
      '  background: ' + BRAND.bg + ';',
      '  box-sizing: border-box;',
      '}',
      '.booking-field textarea { min-height: 60px; resize: vertical; }',
      '.booking-field input:focus, .booking-field select:focus, .booking-field textarea:focus {',
      '  border-color: ' + BRAND.primary + ';',
      '  box-shadow: 0 0 0 3px rgba(22,67,232,0.1);',
      '}',
      '/* Field validation error state */',
      '.booking-field.has-error label { color: ' + BRAND.danger + '; }',
      '.booking-field.has-error input,',
      '.booking-field.has-error select,',
      '.booking-field.has-error textarea {',
      '  border-color: ' + BRAND.danger + ';',
      '  background: ' + BRAND.dangerBg + ';',
      '  box-shadow: 0 0 0 3px rgba(220,38,38,0.08);',
      '}',
      '.booking-field select { cursor: pointer; appearance: auto; }',
      '.chat-btn-primary {',
      '  width: 100%; min-height: 48px; padding: 12px 16px; border: none; border-radius: 12px;',
      '  background: ' + BRAND.primaryGradient + '; color: #fff;',
      '  font-size: 15px; font-weight: 600; cursor: pointer;',
      '  transition: all 0.2s;',
      '  box-shadow: 0 8px 18px rgba(22,67,232,0.24);',
      '  display: flex; align-items: center; justify-content: center; gap: 8px;',
      '}',
      '.chat-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 11px 22px rgba(22,67,232,0.32); }',
      '.chat-btn-primary:active { transform: translateY(0); }',
      '.chat-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }',
      '',
      '/* Spinner for loading state */',
      '@keyframes spin { to { transform: rotate(360deg); } }',
      '.chat-spinner {',
      '  width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);',
      '  border-top-color: #fff; border-radius: 50%;',
      '  animation: spin 0.6s linear infinite;',
      '  display: inline-block;',
      '}',
      '',
      '/* WhatsApp link button */',
      '.chat-whatsapp-btn {',
      '  display: inline-flex; align-items: center; gap: 8px;',
      '  background: #25D366; color: #fff; text-decoration: none;',
      '  padding: 12px 20px; border-radius: 12px; font-weight: 600; font-size: 14px;',
      '  margin-top: 8px; transition: all 0.2s; border: none; cursor: pointer;',
      '  box-shadow: 0 2px 8px rgba(37,211,102,0.3);',
      '}',
      '.chat-whatsapp-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(37,211,102,0.4); }',
      '.chat-whatsapp-btn:active { transform: translateY(0); }',
      '',
      '#chat-widget-panel.chat-rtl .booking-field label { text-align: right; }',
      '#chat-widget-panel.chat-rtl .chat-booking-form { text-align: right; }',
      '',
      '/* ─── Responsive Breakpoints ────────────────────────── */',
      '',
      '@media (max-width: 600px) {',
      '  #chat-widget-panel {',
      '    width: calc(100vw - 24px);',
      '    right: 12px !important; left: 12px !important;',
      '    bottom: 90px; max-height: calc(100vh - 120px);',
      '    border-radius: 16px;',
      '  }',
      '  #chat-widget-toggle { bottom: 20px; }',
      '  .chat-booking-form { padding: 16px; }',
      '  .chat-booking-form h4 { font-size: 15px; margin-bottom: 14px; }',
      '  .booking-field { margin-bottom: 12px; }',
      '  .booking-field label { font-size: 11px; }',
      '  .booking-field input,',
      '  .booking-field select,',
      '  .booking-field textarea { min-height: 40px; padding: 8px 12px; font-size: 13px; }',
      '  .booking-field textarea { min-height: 52px; }',
      '  .chat-btn-primary { min-height: 44px; font-size: 14px; }',
      '  #chat-messages { padding: 16px 12px; max-height: 340px; min-height: 240px; }',
      '  .chat-msg { font-size: 13px; padding: 10px 14px; max-width: 92%; }',
      '  .chat-input-area { padding: 10px 12px; }',
      '  .chat-input-area input { padding: 10px 14px; min-height: 40px; }',
      '  .chat-input-area button { width: 40px; height: 40px; font-size: 18px; }',
      '  #chat-suggestions { padding: 8px 12px; }',
      '  .chat-chip { font-size: 11px; padding: 5px 12px; }',
      '  .chat-header { padding: 14px 16px; }',
      '  .chat-header h3 { font-size: 15px; }',
      '  .chat-header p { font-size: 11px; }',
      '  .chat-avatar { width: 36px; height: 36px; font-size: 18px; }',
      '}',
      '',
      '@media (max-width: 400px) {',
      '  #chat-widget-panel {',
      '    width: calc(100vw - 16px);',
      '    right: 8px !important; left: 8px !important;',
      '    bottom: 80px; max-height: calc(100vh - 100px);',
      '    border-radius: 14px;',
      '  }',
      '  #chat-widget-toggle {',
      '    bottom: 16px; width: 52px; height: 52px; font-size: 24px;',
      '    right: 16px !important;',
      '  }',
      '  .chat-booking-form { padding: 14px; border-radius: 12px; }',
      '  .chat-booking-form h4 { font-size: 14px; margin-bottom: 12px; }',
      '  .booking-field { margin-bottom: 10px; }',
      '  .booking-field label { font-size: 10px; }',
      '  .booking-field input,',
      '  .booking-field select,',
      '  .booking-field textarea { min-height: 38px; padding: 7px 10px; font-size: 13px; border-radius: 10px; }',
      '  .booking-field textarea { min-height: 48px; }',
      '  .chat-btn-primary { min-height: 42px; font-size: 13px; padding: 10px 14px; border-radius: 10px; }',
      '  #chat-messages { padding: 12px 10px; max-height: 300px; min-height: 200px; gap: 8px; }',
      '  .chat-msg { font-size: 12px; padding: 8px 12px; max-width: 95%; border-radius: 14px; }',
      '  .chat-input-area { padding: 8px 10px; gap: 8px; }',
      '  .chat-input-area input { padding: 8px 12px; font-size: 13px; min-height: 38px; }',
      '  .chat-input-area button { width: 38px; height: 38px; font-size: 16px; }',
      '  #chat-suggestions { padding: 6px 10px; gap: 4px; }',
      '  .chat-chip { font-size: 10px; padding: 4px 10px; }',
      '  .chat-header { padding: 12px 14px; gap: 10px; }',
      '  .chat-header h3 { font-size: 14px; }',
      '  .chat-header p { font-size: 10px; }',
      '  .chat-avatar { width: 32px; height: 32px; font-size: 16px; }',
      '  .chat-lang-btn, .chat-reset-btn { width: 30px; height: 30px; font-size: 9px; }',
      '  .chat-reset-btn { font-size: 12px; }',
      '}',
      '',
      '@media (max-height: 500px) and (orientation: landscape) {',
      '  #chat-widget-panel {',
      '    bottom: 60px; max-height: calc(100vh - 80px);',
      '  }',
      '  #chat-messages { max-height: calc(100vh - 220px); min-height: 140px; }',
      '  .chat-booking-form { padding: 12px; }',
      '  .booking-field { margin-bottom: 6px; }',
      '  .booking-field input,',
      '  .booking-field select { min-height: 34px; padding: 5px 8px; }',
      '  .chat-btn-primary { min-height: 36px; padding: 8px 12px; }',
      '  #chat-widget-toggle { width: 48px; height: 48px; font-size: 20px; bottom: 12px; }',
      '}'
    ].join('\n');

    var style = el('style', { id: 'chat-widget-styles' });
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ─── Build UI ─────────────────────────────────────────────── */
  function buildWidget() {
    var isRtl = currentLang === 'ar';

    /* Toggle button with badge */
    toggleEl = el('button', {
      id: 'chat-widget-toggle',
      'aria-label': getText('ariaOpen'),
      'aria-expanded': 'false'
    });
    toggleEl.innerHTML = '🤖<span class="badge" id="chat-badge"></span>';
    toggleEl.addEventListener('click', toggleChat);
    document.body.appendChild(toggleEl);

    /* Panel with proper direction */
    widgetEl = el('div', {
      id: 'chat-widget-panel',
      className: 'chat-hidden' + (isRtl ? ' chat-rtl' : ' chat-ltr'),
      lang: currentLang,
      dir: isRtl ? 'rtl' : 'ltr',
      role: 'dialog',
      'aria-label': getText('title')
    });

    /* Header */
    var headerClass = 'chat-header' + (isRtl ? ' rtl' : '');
    var header = el('div', { className: headerClass, dir: isRtl ? 'rtl' : 'ltr' });
      header.appendChild(el('div', { className: 'chat-avatar' }, opts.avatar || '🤖'));

    var headerText = el('div', { className: 'chat-header-text' });
    headerText.appendChild(el('h3', null, getText('title')));
    headerText.appendChild(el('p', null, getText('subtitle')));
    header.appendChild(headerText);

    var actions = el('div', { className: 'chat-header-actions' });
    var langBtn = el('button', {
      className: 'chat-lang-btn',
      'aria-label': getText('ariaLang')
    });
    langBtn.textContent = isRtl ? 'EN' : 'AR';
    langBtn.addEventListener('click', function () {
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
    actions.appendChild(langBtn);

    var resetBtn = el('button', {
      className: 'chat-reset-btn',
      'aria-label': getText('reset'),
      title: getText('reset')
    });
    resetBtn.textContent = '↺';
    resetBtn.addEventListener('click', resetChat);
    actions.appendChild(resetBtn);
    header.appendChild(actions);

    widgetEl.appendChild(header);

    /* Suggestions */
    var suggestionsBar = el('div', { id: 'chat-suggestions' });
    widgetEl.appendChild(suggestionsBar);

    /* Messages container with direction and scroll-to-bottom button */
    var messagesWrapper = el('div', { style: 'position: relative; flex: 1; display: flex; flex-direction: column;' });
    var messages = el('div', {
      id: 'chat-messages',
      dir: isRtl ? 'rtl' : 'ltr',
      'aria-live': 'polite',
      'aria-relevant': 'additions'
    });

    /* Scroll-to-bottom button */
    var scrollBtn = el('button', {
      id: 'chat-scroll-bottom',
      'aria-label': getText('scrollToBottom'),
      title: getText('scrollToBottom')
    });
    scrollBtn.innerHTML = '⬇';
    scrollBtn.addEventListener('click', function () {
      messages.scrollTop = messages.scrollHeight;
      scrollBtn.classList.remove('show');
    });

    /* Track scroll position to show/hide scroll-to-bottom button */
    messages.addEventListener('scroll', function () {
      var threshold = 80;
      var isNearBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < threshold;
      scrollBtn.classList.toggle('show', !isNearBottom);
    });

    /* Greeting message */
    var greetingMsg = el('div', {
      className: 'chat-msg assistant' + (isRtl ? ' rtl' : ' ltr'),
      id: 'chat-greeting-msg',
      dir: isRtl ? 'rtl' : 'ltr'
    });
    greetingMsg.innerHTML = formatMessage(getText('greeting'));
    messages.appendChild(greetingMsg);
    messagesWrapper.appendChild(messages);
    messagesWrapper.appendChild(scrollBtn);
    widgetEl.appendChild(messagesWrapper);

    /* Input area */
    var inputArea = el('div', { className: 'chat-input-area' });
    var inputField = el('input', {
      id: 'chat-input-field',
      type: 'text',
      placeholder: getText('placeholder'),
      dir: isRtl ? 'rtl' : 'ltr',
      'aria-label': getText('placeholder')
    });
    if (isRtl) inputField.classList.add('rtl');
    inputField.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !isLoading) {
        handleUserInput();
      }
    });
    inputField.addEventListener('input', function () {
      var val = this.value.trim();
      if (hasArabicChar(val)) {
        this.classList.add('rtl');
        this.setAttribute('dir', 'rtl');
      } else if (currentLang === 'ar') {
        // Keep RTL if widget is in Arabic mode
      } else {
        this.classList.remove('rtl');
        this.setAttribute('dir', 'ltr');
      }
    });

    var sendBtn = el('button', {
      id: 'chat-send-btn',
      'aria-label': getText('ariaSend')
    });
    sendBtn.innerHTML = '➤';
    sendBtn.addEventListener('click', handleUserInput);
    inputArea.appendChild(inputField);
    inputArea.appendChild(sendBtn);
    widgetEl.appendChild(inputArea);

    document.body.appendChild(widgetEl);
  }

  /* ─── Handle User Input ────────────────────────────────────── */
  function handleUserInput() {
    var input = $id('chat-input-field');
    var message = input.value.trim();
    if (!message || isLoading) return;

    // Detect booking intent
    var bookingKeywords = [
      'book', 'booking', 'حجز', 'احجز', 'reserve', 'reservation',
      'اريد احجز', 'أريد حجز', 'بغيت احجز', 'booking a trip',
      'book a trip', 'book trip', 'حجوزات', 'اريد', 'أريد'
    ];
    var isBookingIntent = bookingKeywords.some(function(kw) {
      return message.toLowerCase().includes(kw.toLowerCase());
    });

    if (isBookingIntent) {
      showBookingForm();
      input.value = '';
      return;
    }

    input.value = '';
    isLoading = true;
    var sendBtn = $id('chat-send-btn');
    if (sendBtn) sendBtn.disabled = true;

    // Auto-switch language
    if (hasArabicChar(message) && currentLang !== 'ar') {
      setLanguage('ar');
    } else if (!hasArabicChar(message) && currentLang !== 'en') {
      setLanguage('en');
    }

    // Escape HTML for user messages to prevent XSS
    addMessage('user', escapeHtml(message));
    showTyping();

    // Hide suggestions while waiting for response
    var suggestionsBar = $id('chat-suggestions');
    if (suggestionsBar) suggestionsBar.style.display = 'none';

    var url = opts.apiUrl.replace(/\/+$/, '') + '/api/chat';
    var payload = {
      prompt: message,
      conversationId: conversationId
    };
    if (opts.provider) payload.provider = opts.provider;
    if (opts.model) payload.model = opts.model;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function (res) {
      return res.json().then(function (data) {
        return { status: res.status, data: data };
      });
    })
    .then(function (result) {
      hideTyping();
      if (result.data.statusCode === 200) {
        addMessage('assistant', result.data.message);
        conversationId = result.data.conversationId;
      } else {
        addMessage('assistant', getText('errorDefault'));
      }
      // Re-show suggestions after response
      if (suggestionsBar) {
        suggestionsBar.style.display = '';
        renderSuggestions(getText('suggestions'));
      }
    })
    .catch(function (err) {
      hideTyping();
      addMessage('assistant', getText('errorNetwork'));
      console.error('[ChatWidget]', err);
      // Re-show suggestions even on error
      if (suggestionsBar) {
        suggestionsBar.style.display = '';
        renderSuggestions(getText('suggestions'));
      }
    })
    .then(function () {
      isLoading = false;
      var btn = $id('chat-send-btn');
      if (btn) btn.disabled = false;
      input.focus();
    });
  }

  /* ─── Booking Form ─────────────────────────────────────────── */
  function showBookingForm() {
    var container = $id('chat-messages');
    if (!container) return;

    var existing = $id('chat-booking-form');
    if (existing) existing.remove();

    var isRtl = currentLang === 'ar';
    var form = el('div', {
      className: 'chat-msg assistant' + (isRtl ? ' rtl' : ' ltr') + ' chat-booking-form',
      id: 'chat-booking-form',
      dir: isRtl ? 'rtl' : 'ltr'
    });

    var title = el('h4', null, getText('bookingTitle'));
    form.appendChild(title);

    // Name field — inputmode="text"
    var nameField = createField('name', getText('bookingName'), 'text', isRtl);
    var nameInput = nameField.querySelector('input');
    nameInput.setAttribute('inputmode', 'text');
    form.appendChild(nameField);

    // Phone field — inputmode="tel" with pattern
    var phoneField = createField('phone', getText('bookingPhone'), 'tel', isRtl);
    var phoneInput = phoneField.querySelector('input');
    phoneInput.setAttribute('inputmode', 'tel');
    phoneInput.pattern = '[0-9+\\s\\-]{7,20}';
    phoneInput.placeholder = isRtl ? '05xxxxxxxx' : '+9665xxxxxxxx';
    phoneInput.title = isRtl ? 'أدخل رقم الجوال (مثال: 0555555555)' : 'Enter phone number (e.g., +966555555555)';
    form.appendChild(phoneField);

    var packageField = createSelect('package-type', getText('bookingPackageType'), [
      { value: '', label: isRtl ? '-- اختر نوع الحجز --' : '-- Select booking type --' },
      { value: 'full-umrah-package', label: isRtl ? 'باقة عمرة كاملة' : 'Complete Umrah package' },
      { value: 'bus-only', label: isRtl ? 'حجز باص فقط' : 'Bus only' },
      { value: 'hotel-only', label: isRtl ? 'حجز فندق فقط' : 'Hotel only' },
      { value: 'bus-and-hotel', label: isRtl ? 'حجز باص كامل مع فندق' : 'Bus and hotel package' }
    ], isRtl);
    form.appendChild(packageField);

    // Route select
    var routeField = createSelect('route', getText('bookingRoute'), [
      { value: '', label: isRtl ? '-- اختر المسار --' : '-- Select route --' },
      { value: 'riyadh-to-mecca', label: getRoute('riyadhToMecca') },
      { value: 'mecca-to-riyadh', label: getRoute('meccaToRiyadh') },
      { value: 'riyadh-mecca-madinah', label: getRoute('riyadhMeccaMadinah') }
    ], isRtl);
    form.appendChild(routeField);

    // Date field
    var dateField = createField('date', getText('bookingDate'), 'date', isRtl);
    var dateInput = dateField.querySelector('input');
    var today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    form.appendChild(dateField);

    // Passengers field — inputmode="numeric"
    var passField = createField('passengers', getText('bookingPassengers'), 'number', isRtl);
    var passInput = passField.querySelector('input');
    passInput.setAttribute('inputmode', 'numeric');
    passInput.min = '1';
    passInput.value = '1';
    form.appendChild(passField);

    var hotelDetails = el('div', { id: 'booking-hotel-details', style: 'display: none;' });
    var hotelCityField = createSelect('hotel-city', getText('bookingHotelCity'), [
      { value: '', label: isRtl ? '-- اختر المدينة --' : '-- Select city --' },
      { value: 'makkah', label: isRtl ? 'مكة المكرمة' : 'Makkah' },
      { value: 'madinah', label: isRtl ? 'المدينة المنورة' : 'Madinah' },
      { value: 'makkah-and-madinah', label: isRtl ? 'مكة والمدينة' : 'Makkah and Madinah' }
    ], isRtl);
    hotelDetails.appendChild(hotelCityField);

    var checkInField = createField('hotel-check-in', getText('bookingCheckIn'), 'date', isRtl);
    var checkInInput = checkInField.querySelector('input');
    checkInInput.min = today;
    hotelDetails.appendChild(checkInField);

    var nightsField = createField('hotel-nights', getText('bookingNights'), 'number', isRtl);
    var nightsInput = nightsField.querySelector('input');
    nightsInput.min = '1';
    nightsInput.value = '1';
    hotelDetails.appendChild(nightsField);

    var roomsField = createField('hotel-rooms', getText('bookingRooms'), 'number', isRtl);
    var roomsInput = roomsField.querySelector('input');
    roomsInput.min = '1';
    roomsInput.value = '1';
    hotelDetails.appendChild(roomsField);
    form.appendChild(hotelDetails);

    var packageSelect = packageField.querySelector('select');
    packageSelect.addEventListener('change', function() {
      var includesHotel = packageSelect.value === 'full-umrah-package' || packageSelect.value === 'hotel-only' || packageSelect.value === 'bus-and-hotel';
      var includesBus = packageSelect.value !== 'hotel-only';
      hotelDetails.style.display = includesHotel ? '' : 'none';
      routeField.style.display = includesBus ? '' : 'none';
      dateField.style.display = includesBus ? '' : 'none';
      passField.style.display = includesBus ? '' : 'none';
    });

    // Notes field — now a textarea!
    var notesField = createField('notes', getText('bookingNotes'), 'textarea', isRtl, true);
    form.appendChild(notesField);

    // Submit button
    var submitBtn = el('button', {
      className: 'chat-btn-primary',
      id: 'booking-submit-btn',
      'aria-label': getText('bookingSubmit')
    });
    submitBtn.textContent = getText('bookingSubmit');
    submitBtn.addEventListener('click', function() {
      submitBookingForm(form);
    });
    form.appendChild(submitBtn);

    container.appendChild(form);
    container.scrollTop = container.scrollHeight;
  }

  function createField(name, label, type, isRtl, isOptional) {
    var field = el('div', { className: 'booking-field' });
    var lbl = el('label', { htmlFor: 'booking-' + name }, label + (isOptional ? '' : ' *'));
    field.appendChild(lbl);

    if (name === 'notes' && type === 'textarea') {
      var textarea = el('textarea', {
        id: 'booking-' + name,
        name: name,
        dir: isRtl ? 'rtl' : 'ltr',
        rows: 2,
        placeholder: isRtl ? 'أي ملاحظات إضافية...' : 'Any additional notes...'
      });
      if (isRtl) {
        textarea.style.textAlign = 'right';
        textarea.classList.add('rtl');
      }
      field.appendChild(textarea);
    } else {
      var input = el('input', {
        id: 'booking-' + name,
        type: type,
        name: name,
        dir: isRtl ? 'rtl' : 'ltr'
      });
      if (isRtl) {
        input.style.textAlign = 'right';
        input.classList.add('rtl');
      }
      field.appendChild(input);
    }

    return field;
  }

  function createSelect(name, label, options, isRtl) {
    var field = el('div', { className: 'booking-field' });
    var lbl = el('label', { htmlFor: 'booking-' + name }, label + ' *');
    field.appendChild(lbl);
    var select = el('select', { id: 'booking-' + name, name: name });
    options.forEach(function(opt) {
      select.appendChild(el('option', { value: opt.value }, opt.label));
    });
    if (isRtl) select.style.direction = 'rtl';
    field.appendChild(select);
    return field;
  }

  function submitBookingForm(form) {
    var name = $id('booking-name');
    var phone = $id('booking-phone');
    var packageType = $id('booking-package-type');
    var route = $id('booking-route');
    var date = $id('booking-date');
    var passengers = $id('booking-passengers');
    var hotelCity = $id('booking-hotel-city');
    var hotelCheckIn = $id('booking-hotel-check-in');
    var hotelNights = $id('booking-hotel-nights');
    var hotelRooms = $id('booking-hotel-rooms');
    var notes = $id('booking-notes');

    var submitBtn = $id('booking-submit-btn');
    if (submitBtn) submitBtn.disabled = true;

    // Clear previous errors
    clearFieldErrors();

    // Collect required fields for validation
    var fields = [
      { el: name, name: 'name' },
      { el: phone, name: 'phone' },
      { el: packageType, name: 'packageType' }
    ];

    var includesHotel = packageType && ['full-umrah-package', 'hotel-only', 'bus-and-hotel'].indexOf(packageType.value) !== -1;
    var includesBus = packageType && packageType.value !== 'hotel-only';
    if (includesBus) {
      fields.push({ el: route, name: 'route' }, { el: date, name: 'date' }, { el: passengers, name: 'passengers' });
    }
    if (includesHotel) {
      fields.push(
        { el: hotelCity, name: 'hotelCity' },
        { el: hotelCheckIn, name: 'hotelCheckIn' },
        { el: hotelNights, name: 'hotelNights' },
        { el: hotelRooms, name: 'hotelRooms' }
      );
    }

    var hasError = false;
    fields.forEach(function(f) {
      if (!f.el || !f.el.value || !f.el.value.trim()) {
        markFieldError(f.el, currentLang === 'ar' ? 'هذا الحقل مطلوب' : 'Required');
        hasError = true;
      }
    });

    if (hasError) {
      var container = $id('chat-messages');
      var isRtl = currentLang === 'ar';
      var errMsg = el('div', {
        className: 'chat-msg assistant' + (isRtl ? ' rtl' : ' ltr'),
        style: 'color: ' + BRAND.danger + '; font-size: 13px; background: ' + BRAND.dangerBg + '; border: 1px solid #FECACA;'
      });
      errMsg.innerHTML = '⚠️ ' + getText('requiredFields');
      container.appendChild(errMsg);
      container.scrollTop = container.scrollHeight;

      // Remove the error after 3 seconds
      setTimeout(function() {
        if (errMsg.parentNode) errMsg.remove();
      }, 3000);

      if (submitBtn) submitBtn.disabled = false;
      return;
    }

    // Show loading state on button
    var originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.innerHTML = '<span class="chat-spinner"></span> ' + getText('bookingSending');
    }

    // Build WhatsApp message
    var routeLabels = {
      'mecca-to-riyadh': currentLang === 'ar' ? 'من مكة إلى الرياض' : 'Makkah → Riyadh',
      'riyadh-to-mecca': currentLang === 'ar' ? 'من الرياض إلى مكة' : 'Riyadh → Makkah',
      'riyadh-mecca-madinah': currentLang === 'ar' ? 'الرياض → مكة → المدينة' : 'Riyadh → Makkah → Madinah'
    };

    var packageLabels = {
      'full-umrah-package': currentLang === 'ar' ? 'باقة عمرة كاملة' : 'Complete Umrah package',
      'bus-only': currentLang === 'ar' ? 'حجز باص فقط' : 'Bus only',
      'hotel-only': currentLang === 'ar' ? 'حجز فندق فقط' : 'Hotel only',
      'bus-and-hotel': currentLang === 'ar' ? 'حجز باص كامل مع فندق' : 'Bus and hotel package'
    };
    var hotelCityLabels = {
      makkah: currentLang === 'ar' ? 'مكة المكرمة' : 'Makkah',
      madinah: currentLang === 'ar' ? 'المدينة المنورة' : 'Madinah',
      'makkah-and-madinah': currentLang === 'ar' ? 'مكة والمدينة' : 'Makkah and Madinah'
    };
    var routeName = route && route.value ? (routeLabels[route.value] || route.value) : '';
    var packageName = packageLabels[packageType.value] || packageType.value;
    var msg = '📋 *' + (currentLang === 'ar' ? 'طلب حجز جديد' : 'New Booking Request') + '*\n\n';
    msg += '👤 *' + (currentLang === 'ar' ? 'الاسم' : 'Name') + ':* ' + name.value.trim() + '\n';
    msg += '📞 *' + (currentLang === 'ar' ? 'الجوال' : 'Phone') + ':* ' + phone.value.trim() + '\n';
    msg += '📦 *' + (currentLang === 'ar' ? 'نوع الحجز' : 'Booking type') + ':* ' + packageName + '\n';
    if (includesBus) {
      msg += '🗺️ *' + (currentLang === 'ar' ? 'مسار الرحلة' : 'Route') + ':* ' + routeName + '\n';
      msg += '📅 *' + (currentLang === 'ar' ? 'تاريخ السفر' : 'Travel date') + ':* ' + date.value + '\n';
      msg += '👥 *' + (currentLang === 'ar' ? 'عدد الركاب' : 'Passengers') + ':* ' + passengers.value + '\n';
    }
    if (includesHotel) {
      msg += '🏨 *' + (currentLang === 'ar' ? 'مدينة الفندق' : 'Hotel city') + ':* ' + hotelCityLabels[hotelCity.value] + '\n';
      msg += '📅 *' + (currentLang === 'ar' ? 'دخول الفندق' : 'Hotel check-in') + ':* ' + hotelCheckIn.value + '\n';
      msg += '🌙 *' + (currentLang === 'ar' ? 'عدد الليالي' : 'Nights') + ':* ' + hotelNights.value + '\n';
      msg += '🛏️ *' + (currentLang === 'ar' ? 'عدد الغرف' : 'Rooms') + ':* ' + hotelRooms.value + '\n';
    }
    if (notes && notes.value.trim()) {
      msg += '📝 *' + (currentLang === 'ar' ? 'ملاحظات' : 'Notes') + ':* ' + notes.value.trim() + '\n';
    }
    msg += '\n🕐 ' + new Date().toLocaleString();

    var whatsappUrl = 'https://wa.me/966541545580?text=' + encodeURIComponent(msg);

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Remove the booking form
    form.remove();

    // Show success message with a clickable WhatsApp button
    var container = $id('chat-messages');
    if (container) {
      var isRtlMsg = currentLang === 'ar';
      var successWrapper = el('div', {
        className: 'chat-msg assistant' + (isRtlMsg ? ' rtl' : ' ltr'),
        dir: isRtlMsg ? 'rtl' : 'ltr',
        style: 'padding: 14px 16px; background: #F0FFF4; border: 1px solid #BBF7D0; border-radius: 18px; align-self: flex-start;'
      });

      var successText = el('div', null, '✅ ' + (currentLang === 'ar'
        ? 'تم تجهيز طلب الحجز! اضغط الزر أدناه للإرسال عبر واتساب.'
        : 'Booking ready! Click the button below to send via WhatsApp.'));
      successWrapper.appendChild(successText);

      // WhatsApp clickable button
      var waBtn = el('a', {
        className: 'chat-whatsapp-btn',
        href: whatsappUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': currentLang === 'ar' ? 'إرسال الحجز عبر واتساب' : 'Send booking via WhatsApp'
      });
      waBtn.innerHTML = '📲 ' + getText('bookingViaWhatsapp');
      successWrapper.appendChild(waBtn);

      // Fallback text
      var fallbackText = el('div', {
        style: 'font-size: 11px; color: ' + BRAND.textMuted + '; margin-top: 6px;'
      }, currentLang === 'ar'
        ? 'إذا لم يتم فتح واتساب تلقائيًا، اضغط الزر أعلاه.'
        : 'If WhatsApp didn\'t open automatically, click the button above.');
      successWrapper.appendChild(fallbackText);

      container.appendChild(successWrapper);
      container.scrollTop = container.scrollHeight;
    }

    // Update badge if widget is closed
    unreadCount++;
    updateBadge();
  }

  function markFieldError(fieldEl, message) {
    if (!fieldEl) return;

    // Find the parent booking-field div
    var parent = fieldEl.closest('.booking-field') || fieldEl.parentNode;
    if (parent) {
      parent.classList.add('has-error');
      // Add error message if not exists
      var existingErr = parent.querySelector('.field-error');
      if (!existingErr) {
        var errSpan = el('span', {
          className: 'field-error',
          style: 'font-size: 10px; color: ' + BRAND.danger + '; margin-top: 2px; display: block;'
        }, message);
        parent.appendChild(errSpan);
      }
    }
  }

  function clearFieldErrors() {
    var form = $id('chat-booking-form');
    if (!form) return;
    var errorFields = form.querySelectorAll('.has-error');
    errorFields.forEach(function(f) { f.classList.remove('has-error'); });
    var errorMsgs = form.querySelectorAll('.field-error');
    errorMsgs.forEach(function(m) { m.remove(); });
  }

  /* ─── Toggle ───────────────────────────────────────────────── */
  function toggleChat() {
    isOpen = !isOpen;
    widgetEl.classList.toggle('chat-hidden', !isOpen);
    toggleEl.textContent = isOpen ? '✕' : '🤖';
    toggleEl.style.fontSize = isOpen ? '22px' : '28px';
    toggleEl.setAttribute('aria-label', isOpen ? getText('ariaClose') : getText('ariaOpen'));
    toggleEl.setAttribute('aria-expanded', isOpen);

    // Reset unread badge when opening
    if (isOpen) {
      unreadCount = 0;
      updateBadge();
      var input = $id('chat-input-field');
      if (input) setTimeout(function() { input.focus(); }, 400);
    }
  }

  function closeChat() {
    if (isOpen) {
      isOpen = false;
      widgetEl.classList.add('chat-hidden');
      toggleEl.textContent = '🤖';
      toggleEl.style.fontSize = '28px';
      toggleEl.setAttribute('aria-label', getText('ariaOpen'));
      toggleEl.setAttribute('aria-expanded', 'false');
    }
  }

  /* ─── Badge update ─────────────────────────────────────────── */
  function updateBadge() {
    var badge = $id('chat-badge');
    if (!badge) return;
    if (unreadCount > 0 && !isOpen) {
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  }

  /* ─── Reset ────────────────────────────────────────────────── */
  function resetChat() {
    conversationId = null;
    var container = $id('chat-messages');
    if (container) {
      container.innerHTML = '';
      var greetingRtl = currentLang === 'ar';
      var greetingMsg = el('div', {
        className: 'chat-msg assistant' + (greetingRtl ? ' rtl' : ' ltr'),
        id: 'chat-greeting-msg',
        dir: greetingRtl ? 'rtl' : 'ltr'
      });
      greetingMsg.innerHTML = formatMessage(getText('greeting'));
      container.appendChild(greetingMsg);
    }
    var suggestionsBar = $id('chat-suggestions');
    if (suggestionsBar) suggestionsBar.style.display = '';
    renderSuggestions(getText('suggestions'));
  }

  /* ─── Messages ─────────────────────────────────────────────── */
  function addMessage(role, content) {
    var container = $id('chat-messages');
    var isRtl = currentLang === 'ar' || hasArabicChar(content);
    var now = new Date();
    lastMsgTime = now;

    var wrapper = el('div', {
      className: 'chat-msg-wrapper' + (role === 'assistant' ? ' assistant-wrapper' : '')
    });

    var msg = el('div', {
      className: 'chat-msg ' + role + (isRtl ? ' rtl' : ' ltr'),
      dir: isRtl ? 'rtl' : 'ltr'
    });
    msg.innerHTML = formatMessage(content);
    wrapper.appendChild(msg);

    // Timestamp under message
    var timeEl = el('div', {
      className: 'chat-time',
      dir: isRtl ? 'rtl' : 'ltr'
    }, formatTime(now));
    wrapper.appendChild(timeEl);

    container.appendChild(wrapper);

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;

    // Increment unread count if panel is minimized
    if (!isOpen) {
      unreadCount++;
      updateBadge();
    }

    // Hide scroll-to-bottom button since we just scrolled
    var scrollBtn = $id('chat-scroll-bottom');
    if (scrollBtn) scrollBtn.classList.remove('show');

    return wrapper;
  }

  function showTyping() {
    var container = $id('chat-messages');
    var div = el('div', { className: 'chat-typing', id: 'chat-typing-indicator' });
    div.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    var el = $id('chat-typing-indicator');
    if (el) el.remove();
  }

  /* ─── Utilities ────────────────────────────────────────────── */
  function formatMessage(text) {
    // Handle **bold** markdown first, then newlines
    // Do NOT escape HTML — our translation strings intentionally use <strong> and <br>
    // For user messages, we escape HTML before calling addMessage
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function escapeHtml(text) {
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (c) { return map[c]; });
  }

  /* ─── Init ─────────────────────────────────────────────────── */
  function init(userOptions) {
    opts = {};
    Object.keys(DEFAULTS).forEach(function (k) { opts[k] = DEFAULTS[k]; });
    if (userOptions) {
      Object.keys(userOptions).forEach(function (k) {
        if (userOptions[k] !== undefined) opts[k] = userOptions[k];
      });
    }
    opts.apiUrl = opts.apiUrl.replace(/\/+$/, '');

    if ($id('chat-widget-toggle')) return;

    var savedLang = localStorage.getItem('chatWidgetLang');
    if (savedLang === 'ar' || savedLang === 'en') {
      currentLang = savedLang;
    }

    injectStyles();
    buildWidget();
    renderSuggestions(getText('suggestions'));

    // Global Escape key to close panel
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    });
  }

  function renderSuggestions(items) {
    var suggestionsBar = $id('chat-suggestions');
    if (!suggestionsBar) return;
    suggestionsBar.innerHTML = '';
    items.forEach(function (text) {
      var chip = el('span', { className: 'chat-chip' }, text);
      chip.addEventListener('click', function () {
        var input = $id('chat-input-field');
        if (input) {
          input.value = text;
          suggestionsBar.style.display = 'none';
          handleUserInput();
        }
      });
      suggestionsBar.appendChild(chip);
    });
  }

  /* ─── Expose Global ────────────────────────────────────────── */
  global.ChatWidget = { init: init };

})(window);
