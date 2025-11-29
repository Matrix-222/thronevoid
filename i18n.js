// i18n.js
// قاموس الترجمة: يجب أن يتضمن هذا القاموس جميع النصوص في صفحات HTML
const translations = {
    'HOME': {
        'en': 'HOME',
        'ar': 'الرئيسية'
    },
    'LOGIN': {
        'en': 'LOGIN',
        'ar': 'تسجيل الدخول'
    },
    'REGISTER': {
        'en': 'REGISTER',
        'ar': 'تسجيل جديد'
    },
    'LEADERBOARD': {
        'en': 'LEADERBOARD',
        'ar': 'لوحة المتصدرين'
    },
    'HERO_TITLE': {
        'en': 'WELCOME, WARLORD',
        'ar': 'مرحباً بك أيها المحارب'
    },
    'HERO_SUBTITLE': {
        'en': 'Enter the Galactic Arena, fight to survive, and assert your dominance over the Void Throne.',
        'ar': 'ادخل إلى ساحة المجرة، قاتل للبقاء، وأثبت هيمنتك على العرش.'
    },
    'START_CHALLENGE': {
        'en': 'START THE CHALLENGE',
        'ar': 'ابدأ التحدي'
    },
    'DASHBOARD': {
        'en': 'DASHBOARD',
        'ar': 'لوحة التحكم'
    },
    'SETTINGS': {
        'en': 'SETTINGS',
        'ar': 'الإعدادات'
    },
    'LOGOUT': {
        'en': 'LOGOUT',
        'ar': 'تسجيل الخروج'
    },
    'LOG_IN_ACCOUNT': {
        'en': 'Login / Create Account',
        'ar': 'تسجيل الدخول / إنشاء حساب'
    },
    'EMAIL_PLACEHOLDER': {
        'en': 'Email',
        'ar': 'البريد الإلكتروني'
    },
    'PASSWORD_PLACEHOLDER': {
        'en': 'Password',
        'ar': 'كلمة المرور'
    },
    'AUTH_BUTTON_LOGIN': {
        'en': 'Login',
        'ar': 'تسجيل الدخول'
    },
    'AUTH_BUTTON_REGISTER': {
        'en': 'Create Account',
        'ar': 'إنشاء حساب'
    },
    'TOGGLE_TO_REGISTER': {
        'en': "Don't have an account? Click to Register",
        'ar': 'لا تملك حساباً؟ انقر للتسجيل'
    },
    'TOGGLE_TO_LOGIN': {
        'en': "Already have an account? Click to Login",
        'ar': 'لديك حساب؟ انقر للدخول'
    },
    'SIGN_IN_WITH_GOOGLE': {
        'en': 'Sign in with Google',
        'ar': 'تسجيل الدخول باستخدام جوجل'
    },
    // قم بإضافة باقي النصوص هنا (مثل نصوص لوحة التحكم ولوحة المتصدرين)
};

// الدالة الرئيسية للترجمة
function setLanguage(lang) {
    // حفظ اختيار المستخدم
    localStorage.setItem('lang', lang);

    // تطبيق اتجاه الكتابة (RTL/LTR)
    document.body.style.direction = (lang === 'ar' ? 'rtl' : 'ltr');

    // تغيير اللغة على جميع العناصر التي تحمل وسم 'data-i18n'
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            // للعناصر العادية
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[key][lang];
            } else {
                element.textContent = translations[key][lang];
            }
        }
    });
}

// دالة التحقق من اللغة المحفوظة وتحميلها
function loadLanguage() {
    const defaultLang = 'ar';
    const lang = localStorage.getItem('lang') || defaultLang;
    setLanguage(lang);
    return lang;
}

// تصدير الدوال لاستخدامها في ملفات HTML الأخرى
window.setLanguage = setLanguage;
window.loadLanguage = loadLanguage;
window.translations = translations;
