const translations = {
    // English (en) translations
    'en': {
        // General
        'LOGOUT': 'Logout',
        'DASHBOARD': 'Dashboard',
        'SETTINGS': 'Admin',
        'PROFILE': 'Profile',
        
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
        
        // New Alliance Keys
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
        
        // Login/Auth
        'PHONE_LOGIN_TITLE': 'Sign in with Phone Number',
        'FORGOT_PASSWORD': 'Forgot Password?',
        'SEND_VERIFICATION_CODE': 'Send Verification Code',
        'VERIFY_CODE_PLACEHOLDER': 'Enter verification code',
        'VERIFY': 'Verify',
        'NOT_A_ROBOT': 'I am not a robot',
        'LOGIN_ERROR_PHONE_FORMAT': 'Failed to send verification code. Please make sure the correct phone number (+ country code) is provided.',
        'LOGIN_ERROR_RECAPTCHA': 'reCAPTCHA setup is required or failed to verify. Try again.',
        'LOGIN_SUCCESS': 'Login successful!',
        'LOGIN_FAIL': 'Login failed. Please check your credentials.',

    },
    
    // Arabic (ar) translations
    'ar': {
        // عام
        'LOGOUT': 'تسجيل الخروج',
        'DASHBOARD': 'لوحة التحكم',
        'SETTINGS': 'المدير',
        'PROFILE': 'الملف الشخصي',

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

        // مفاتيح التحالف الجديدة (لصفحة الدردشة الموحدة)
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

        // تسجيل الدخول/المصادقة
        'PHONE_LOGIN_TITLE': 'أو سجل برقم الجوال',
        'FORGOT_PASSWORD': 'نسيت كلمة المرور؟',
        'SEND_VERIFICATION_CODE': 'إرسال رمز التحقق',
        'VERIFY_CODE_PLACEHOLDER': 'أدخل رمز التحقق',
        'VERIFY': 'تحقق',
        'NOT_A_ROBOT': 'أنا لست برنامج روبوت',
        'LOGIN_ERROR_PHONE_FORMAT': '❌ فشل إرسال رمز التحقق. تأكد من تهيئة reCAPTCHA وتنسيق رقم الجوال الصحيح (+ رمز الدولة).',
        'LOGIN_ERROR_RECAPTCHA': '❌ يتطلب إعداد reCAPTCHA أو فشل التحقق. حاول مرة أخرى.',
        'LOGIN_SUCCESS': 'تم تسجيل الدخول بنجاح!',
        'LOGIN_FAIL': 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.',

    }
};

let currentLang = 'ar'; // تعيين اللغة الافتراضية

function loadLanguage(key, lang = currentLang) {
    return translations[lang][key] || translations['en'][key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
    // تحديد اللغة من المتصفح أو أي آلية أخرى
    // حالياً نعتمد 'ar' كافتراضية
    currentLang = 'ar'; 
    document.documentElement.dir = 'rtl';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = loadLanguage(key);
        
        if (element.tagName === 'INPUT' && element.getAttribute('type') === 'text' && element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', translation);
        } else {
            element.textContent = translation;
        }
    });
});
