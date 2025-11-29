const translations = {
    // English (en) translations
    'en': {
        'LOGOUT': 'Logout',
        'DASHBOARD': 'Dashboard',
        'GENERAL_CHAT': 'General Chat',
        'ALLIANCES_CHAT': 'Alliance Chat (Private)',
        'SIGN_IN': 'Sign In', // مفتاح افتراضي لصفحة index
        'PHONE_LOGIN_TITLE': 'Sign in with Phone Number', // مفتاح افتراضي
    },
    
    // Arabic (ar) translations
    'ar': {
        'LOGOUT': 'تسجيل الخروج',
        'DASHBOARD': 'لوحة التحكم',
        'GENERAL_CHAT': 'الشات العام',
        'ALLIANCES_CHAT': 'شات التحالفات (خاص)',
        'SIGN_IN': 'تسجيل الدخول', // مفتاح افتراضي لصفحة index
        'PHONE_LOGIN_TITLE': 'أو سجل برقم الجوال', // مفتاح افتراضي
    }
};

let currentLang = localStorage.getItem('appLang') || 'ar'; // قراءة اللغة المحفوظة
window.translations = translations; // لجعل الترجمات متاحة عالميا

// 1. الدالة الأساسية لتحميل الترجمة لمفتاح معين
function loadLanguage(key, lang = currentLang) {
    return translations[lang][key] || translations['en'][key] || key;
}

// 2. الدالة التي تقوم بتغيير اللغة وحفظها (هذه هي الدالة التي يستدعيها زر اللغة)
window.switchLanguage = function(newLang) {
    if (translations[newLang]) {
        currentLang = newLang;
        localStorage.setItem('appLang', newLang); // حفظ اللغة
        
        // تحديث اتجاه النص (RTL/LTR)
        document.documentElement.dir = (newLang === 'ar') ? 'rtl' : 'ltr';
        
        // إعادة تحميل الصفحة لتطبيق الترجمة على جميع العناصر بشكل فعال
        window.location.reload(); 
        
        // (ملاحظة: لقد قمنا بتعطيل تحديث DOM المباشر واستبدلناه بإعادة التحميل لضمان التوافق مع Firebase)
        
    } else {
        console.warn(`اللغة ${newLang} غير مدعومة.`);
    }
}

// 3. الدالة التي تعمل عند تحميل الصفحة لأول مرة لتطبيق اللغة المحفوظة
document.addEventListener('DOMContentLoaded', () => {
    // تعيين اتجاه النص الأولي
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

    // تطبيق الترجمة على جميع العناصر في الصفحة
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = loadLanguage(key);
        
        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', translation);
        } else {
            element.textContent = translation;
        }
    });
});
