const translations = {
    // English (en) translations
    'en': {
        // General & Navigation
        'LOGOUT': 'Logout',
        'PROFILE': 'Profile',
        'SIGN_IN': 'Sign In', 
        'REGISTER': 'Register Now', 
        'BACK_TO_MATCHING': 'Back to Profiles',
        
        // Language Buttons 
        'ARABIC_BUTTON': 'العربية', 
        'ENGLISH_BUTTON': 'English',
        
        // Chat - Matching & Private Chat 
        'MATCHING_PROFILES': 'Matching Profiles',
        'FIND_NEW_PEOPLE': 'Find New People to Chat With',
        'SEARCH_PROFILES_PLACEHOLDER': 'Search by Name or Bio...',
        'START_CHAT': 'Start Chat',
        'NO_PROFILES_FOUND': 'No matching profiles found.',
        'PRIVATE_CHAT_TITLE': 'Private Chat',
        'CHAT_MESSAGE_PLACEHOLDER': 'Type your message here...',
        'SEND_MESSAGE': 'Send',
        'ADVANCED_FILTERS': 'Advanced Filters',
        'NEW_MESSAGE_NOTIFICATION': 'New Message from', // مفتاح جديد
        
        // Login/Auth 
        'SIGN_IN_EMAIL_TITLE': 'Sign In with Email',
        'EMAIL_PLACEHOLDER': 'Email Address',
        'PASSWORD_PLACEHOLDER': 'Password',
        'FORGOT_PASSWORD': 'Forgot Password?',
        'LOGIN_FIELDS_REQUIRED': 'Please enter both email and password.', 
        'LOGIN_SUCCESS': 'Login successful!',
        'LOGIN_FAIL': 'Login failed. Please check your credentials.',

        // Settings/User Data (Dashboard)
        'ACCOUNT_SETTINGS': 'Profile Settings',
        'USERNAME': 'Username',
        'USER_BIO': 'Bio (About Me)',
        'USER_INTERESTS': 'Interests (Comma Separated)',
        'SAVE_PROFILE': 'Save Profile',
        'EMAIL': 'Email',
        'PROFILE_AVATAR': 'Profile Avatar',
        'FEATURE_DISABLED': '(This feature is currently disabled)',
        'NAME_SAVE_SUCCESS': 'Profile updated successfully.',
        'NAME_SAVE_FAIL': 'Failed to update profile. Please check your connection or try again.',
        'DEFAULT_INTERESTS': 'Not specified',
        'DEFAULT_BIO': 'The user has not added a bio yet.',
        
        // مفاتيح قديمة غير مستخدمة (للتذكير)
        'DASHBOARD': 'Dashboard',
        'SETTINGS': 'Admin',
        'GENERAL_CHAT_TITLE': 'General Chat', 
    },
    
    // Arabic (ar) translations
    'ar': {
        // عام وملاحة
        'LOGOUT': 'تسجيل الخروج',
        'PROFILE': 'الملف الشخصي',
        'SIGN_IN': 'تسجيل الدخول',
        'REGISTER': 'سجل الآن',
        'BACK_TO_MATCHING': 'العودة للملفات',


        // أزرار اللغة 
        'ARABIC_BUTTON': 'العربية', 
        'ENGLISH_BUTTON': 'English',
        
        // Chat - Matching & Private Chat 
        'MATCHING_PROFILES': 'ملفات التعارف',
        'FIND_NEW_PEOPLE': 'ابحث عن أشخاص جدد للدردشة',
        'SEARCH_PROFILES_PLACEHOLDER': 'ابحث بالاسم أو النبذة...',
        'START_CHAT': 'ابدأ الدردشة',
        'NO_PROFILES_FOUND': 'لم يتم العثور على ملفات مطابقة.',
        'PRIVATE_CHAT_TITLE': 'الدردشة الخاصة',
        'CHAT_MESSAGE_PLACEHOLDER': 'اكتب رسالتك هنا...',
        'SEND_MESSAGE': 'إرسال',
        'ADVANCED_FILTERS': 'تصفية متقدمة',
        'NEW_MESSAGE_NOTIFICATION': 'رسالة جديدة من', // مفتاح جديد

        // تسجيل الدخول/المصادقة 
        'SIGN_IN_EMAIL_TITLE': 'تسجيل الدخول بالبريد الإلكتروني',
        'EMAIL_PLACEHOLDER': 'البريد الإلكتروني',
        'PASSWORD_PLACEHOLDER': 'كلمة المرور',
        'FORGOT_PASSWORD': 'نسيت كلمة المرور؟',
        'LOGIN_FIELDS_REQUIRED': 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.', 
        'LOGIN_SUCCESS': 'تم تسجيل الدخول بنجاح!',
        'LOGIN_FAIL': 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.',

        // الإعدادات/بيانات المستخدم
        'ACCOUNT_SETTINGS': 'إعدادات الملف الشخصي',
        'USERNAME': 'اسم المستخدم',
        'USER_BIO': 'نبذة عني (Bio)',
        'USER_INTERESTS': 'اهتماماتي (مفصولة بفواصل)',
        'SAVE_PROFILE': 'حفظ الملف الشخصي',
        'EMAIL': 'البريد الإلكتروني',
        'PROFILE_AVATAR': 'تغيير صورة البروفايل',
        'FEATURE_DISABLED': '(هذه الميزة غير مفعلة حالياً)',
        'NAME_SAVE_SUCCESS': 'تم تحديث الملف الشخصي بنجاح.',
        'NAME_SAVE_FAIL': '❌ فشل تحديث الملف الشخصي. يرجى التحقق من اتصالك بالإنترنت أو المحاولة مجدداً.',
        'DEFAULT_INTERESTS': 'غير محددة',
        'DEFAULT_BIO': 'لم يقم المستخدم بإضافة نبذة بعد.',

        // مفاتيح قديمة غير مستخدمة (للتذكير)
        'DASHBOARD': 'لوحة التحكم',
        'SETTINGS': 'المدير',
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
        } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
             element.setAttribute('placeholder', translation);
        } else {
            element.textContent = translation;
        }
    });
});
