const translations = {
    // English (en) translations
    'en': {
        // General & Navigation
        'LOGOUT': 'Logout',
        'DASHBOARD': 'Dashboard',
        'SETTINGS': 'Admin',
        'PROFILE': 'Profile',
        'SIGN_IN': 'Sign In', 
        'REGISTER': 'Register Now', 
        
        // Language Buttons 
        'ARABIC_BUTTON': 'العربية', 
        'ENGLISH_BUTTON': 'English',
        
        // Chat - General
        'GENERAL_CHAT': 'General Chat',
        'GENERAL_CHAT_TITLE': 'General Chat (All)',
        'CHAT_CHANNELS': 'Chat Channels',
        'CHAT_MESSAGE_PLACEHOLDER': 'Type your message here...',
        'SEND_MESSAGE': 'Send',
        'WELCOME_CHAT': 'Welcome! Exchange messages with other players.',
        
        // Chat - Alliance
        'ALLIANCES_CHAT': 'Alliance Chat (Private)',
        'ALLIANCES_CHAT_TITLE': 'Alliance Chat (Private)',
        'CHAT_NOTE': 'Alliance chat will be enabled after joining an alliance.',
        'CLEAR_CHAT_HISTORY': 'Clear Chat History',
        'WELCOME_ALLIANCE_CHAT': 'Welcome to your Alliance Chat!',
        'ALLIANCE_ACCESS_DENIED': 'Access Denied',
        'ALLIANCE_ACCESS_DENIED_MSG': 'You must be a member of an alliance to join this channel.',

        // Settings/User Data
        'SAVE_NAME': 'Save Name',
        'ACCOUNT_SETTINGS': 'Account Settings',
        'USERNAME': 'Username',
        'EMAIL': 'Email',
        'PROFILE_AVATAR': 'Profile Avatar',
        'FEATURE_DISABLED': '(This feature is currently disabled)',
        'NAME_SAVE_SUCCESS': 'Username updated successfully.',
        'NAME_SAVE_FAIL': 'Failed to update username. Please check your connection or try again.',
        
        // Login/Auth (NEW Keys for Email/Password)
        'SIGN_IN_EMAIL_TITLE': 'Sign In with Email',
        'EMAIL_PLACEHOLDER': 'Email Address',
        'PASSWORD_PLACEHOLDER': 'Password',
        'FORGOT_PASSWORD': 'Forgot Password?',
        'LOGIN_FIELDS_REQUIRED': 'Please enter both email and password.', 
        'LOGIN_SUCCESS': 'Login successful!',
        'LOGIN_FAIL': 'Login failed. Please check your credentials.',

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
        
        // الدردشة - عام
        'GENERAL_CHAT': 'الشات العام',
        'GENERAL_CHAT_TITLE': 'الشات العام (الجميع)',
        'CHAT_CHANNELS': 'قنوات الدردشة',
        'CHAT_MESSAGE_PLACEHOLDER': 'اكتب رسالتك هنا...',
        'SEND_MESSAGE': 'إرسال',
        'WELCOME_CHAT': 'أهلاً بك! تبادل الرسائل مع اللاعبين الآخرين.',

        // الدردشة - تحالفات
        'ALLIANCES_CHAT': 'شات التحالفات (خاص)',
        'ALLIANCES_CHAT_TITLE': 'شات التحالفات (الخاص)',
        'CHAT_NOTE': 'سيتم تمكين شات التحالفات بعد انضمامك لتحالف.',
        'CLEAR_CHAT_HISTORY': 'حذف تاريخ الدردشة',
        'WELCOME_ALLIANCE_CHAT': 'أهلاً بك في شات تحالفك!',
        'ALLIANCE_ACCESS_DENIED': 'غير مصرح بالدخول',
        'ALLIANCE_ACCESS_DENIED_MSG': 'يجب أن تكون عضواً في تحالف للانضمام لهذه القناة.',


        // الإعدادات/بيانات المستخدم
        'SAVE_NAME': 'حفظ الاسم',
        'ACCOUNT_SETTINGS': 'إعدادات الحساب والملف الشخصي',
        'USERNAME': 'اسم المستخدم',
        'EMAIL': 'البريد الإلكتروني',
        'PROFILE_AVATAR': 'تغيير صورة البروفايل',
        'FEATURE_DISABLED': '(هذه الميزة غير مفعلة حالياً)',
        'NAME_SAVE_SUCCESS': 'تم تحديث اسم المستخدم بنجاح.',
        'NAME_SAVE_FAIL': '❌ فشل تحديث الاسم. يرجى التحقق من اتصالك بالإنترنت أو المحاولة مجدداً.',

        // تسجيل الدخول/المصادقة (مفاتيح جديدة للإيميل/كلمة المرور)
        'SIGN_IN_EMAIL_TITLE': 'تسجيل الدخول بالبريد الإلكتروني',
        'EMAIL_PLACEHOLDER': 'البريد الإلكتروني',
        'PASSWORD_PLACEHOLDER': 'كلمة المرور',
        'FORGOT_PASSWORD': 'نسيت كلمة المرور؟',
        'LOGIN_FIELDS_REQUIRED': 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.', 
        'LOGIN_SUCCESS': 'تم تسجيل الدخول بنجاح!',
        'LOGIN_FAIL': 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.',

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
