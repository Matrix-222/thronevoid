const translations = {
    // English (en) translations
    'en': {
        // General & Navigation
        'LOGOUT': 'Logout',
        'DASHBOARD': 'Dashboard', // يمكن تغييرها لاحقًا إلى "الملف الشخصي"
        'SETTINGS': 'Admin',
        'PROFILE': 'Profile',
        'SIGN_IN': 'Sign In', 
        'REGISTER': 'Register Now', 
        
        // Language Buttons 
        'ARABIC_BUTTON': 'العربية', 
        'ENGLISH_BUTTON': 'English',
        
        // Chat - Matching & Private Chat (NEW)
        'MATCHING_PROFILES': 'Matching Profiles',
        'FIND_NEW_PEOPLE': 'Find New People to Chat With',
        'SEARCH_PROFILES_PLACEHOLDER': 'Search by Name or Interests...',
        'START_CHAT': 'Start Chat',
        'NO_PROFILES_FOUND': 'No matching profiles found.',
        'PRIVATE_CHAT_TITLE': 'Private Chat',
        'CHAT_MESSAGE_PLACEHOLDER': 'Type your message here...',
        'SEND_MESSAGE': 'Send',
        
        // Login/Auth 
        'SIGN_IN_EMAIL_TITLE': 'Sign In with Email',
        'EMAIL_PLACEHOLDER': 'Email Address',
        'PASSWORD_PLACEHOLDER': 'Password',
        'FORGOT_PASSWORD': 'Forgot Password?',
        'LOGIN_FIELDS_REQUIRED': 'Please enter both email and password.', 
        'LOGIN_SUCCESS': 'Login successful!',
        'LOGIN_FAIL': 'Login failed. Please check your credentials.',

        // Settings/User Data
        'SAVE_NAME': 'Save Name',
        'ACCOUNT_SETTINGS': 'Account Settings',
        'USERNAME': 'Username',
        'EMAIL': 'Email',
        'PROFILE_AVATAR': 'Profile Avatar',
        'FEATURE_DISABLED': '(This feature is currently disabled)',
        'NAME_SAVE_SUCCESS': 'Username updated successfully.',
        'NAME_SAVE_FAIL': 'Failed to update username. Please check your connection or try again.',

        // القديمة (تم حذفها من الاستخدام لكن تم الإبقاء على بعضها للوضوح)
        'GENERAL_CHAT_TITLE': 'General Chat', 
    },
    
    // Arabic (ar) translations
    'ar': {
        // عام وملاحة
        'LOGOUT': 'تسجيل الخروج',
        'DASHBOARD': 'لوحة التحكم',
        'SETTINGS': 'المدير',
        'PROFILE': 'الملف الشخصي',
        'SIGN_IN': 'تسجيل الدخول',
        'REGISTER': 'سجل الآن',

        // أزرار اللغة 
        'ARABIC_BUTTON': 'العربية', 
        'ENGLISH_BUTTON': 'English',
        
        // Chat - Matching & Private Chat (جديد)
        'MATCHING_PROFILES': 'ملفات التعارف',
        'FIND_NEW_PEOPLE': 'ابحث عن أشخاص جدد للدردشة',
        'SEARCH_PROFILES_PLACEHOLDER': 'ابحث بالاسم أو الاهتمامات...',
        'START_CHAT': 'ابدأ الدردشة',
        'NO_PROFILES_FOUND': 'لم يتم العثور على ملفات مطابقة.',
        'PRIVATE_CHAT_TITLE': 'الدردشة الخاصة',
        'CHAT_MESSAGE_PLACEHOLDER': 'اكتب رسالتك هنا...',
        'SEND_MESSAGE': 'إرسال',

        // تسجيل الدخول/المصادقة 
        'SIGN_IN_EMAIL_TITLE': 'تسجيل الدخول بالبريد الإلكتروني',
        'EMAIL_PLACEHOLDER': 'البريد الإلكتروني',
        'PASSWORD_PLACEHOLDER': 'كلمة المرور',
        'FORGOT_PASSWORD': 'نسيت كلمة المرور؟',
        'LOGIN_FIELDS_REQUIRED': 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.', 
        'LOGIN_SUCCESS': 'تم تسجيل الدخول بنجاح!',
        'LOGIN_FAIL': 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.',

        // الإعدادات/بيانات المستخدم
        'SAVE_NAME': 'حفظ الاسم',
        'ACCOUNT_SETTINGS': 'إعدادات الحساب والملف الشخصي',
        'USERNAME': 'اسم المستخدم',
        'EMAIL': 'البريد الإلكتروني',
        'PROFILE_AVATAR': 'تغيير صورة البروفايل',
        'FEATURE_DISABLED': '(هذه الميزة غير مفعلة حالياً)',
        'NAME_SAVE_SUCCESS': 'تم تحديث اسم المستخدم بنجاح.',
        'NAME_SAVE_FAIL': '❌ فشل تحديث الاسم. يرجى التحقق من اتصالك بالإنترنت أو المحاولة مجدداً.',
        
        // القديمة (تم حذفها من الاستخدام لكن تم الإبقاء على بعضها للوضوح)
        'GENERAL_CHAT_TITLE': 'الشات العام',
    }
};

let currentLang = localStorage.getItem('appLang') || 'ar'; 
window.translations = translations; 

// 1. الدالة الأساسية لتحميل الترجمة لمفتاح معين
function loadLanguage(key, lang = currentLang) {
    return translations[lang][key] || translations['en'][key] || key;
}
window.loadLanguage = loadLanguage; 


// 2. الدالة التي تقوم بتغيير اللغة وحفظها
window.switchLanguage = function(newLang) {
    if (translations[newLang]) {
        currentLang = newLang;
        localStorage.setItem('appLang', newLang); 
        
        window.location.reload(); 
        
    } else {
        console.warn(`اللغة ${newLang} غير مدعومة.`);
    }
}

// 3. الدالة التي تعمل عند تحميل الصفحة لأول مرة لتطبيق اللغة المحفوظة
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

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
