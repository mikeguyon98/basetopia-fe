import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Basetopia',
      signInPrompt: 'Please sign in to access all features',
      profile: 'Profile',
      home: 'Home',
      signIn: 'Sign in with Google',
      signOut: 'Sign Out',
      welcome_user: 'Welcome, {{email}}!',
      loading: 'Loading...',
      error: 'Error: {{message}}',
      userProfile: 'User Profile',
      name: 'Name',
      email: 'Email',
      explore: 'Explore',
      following: 'Following'
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Basetopia',
      signInPrompt: 'Inicia sesión para acceder a todas las funciones',
      profile: 'Perfil',
      home: 'Inicio',
      signIn: 'Iniciar sesión con Google',
      signOut: 'Cerrar sesión',
      welcome_user: '¡Bienvenido, {{email}}!',
      loading: 'Cargando...',
      error: 'Error: {{message}}',
      userProfile: 'Perfil del Usuario',
      name: 'Nombre',
      email: 'Correo electrónico',
      explore: 'Explorar',
      following: 'Siguiendo'
    }
  },
  ja: {
    translation: {
      welcome: 'Basetopiaへようこそ',
      signInPrompt: 'すべての機能にアクセスするにはサインインしてください',
      profile: 'プロフィール',
      home: 'ホーム',
      signIn: 'Googleでサインイン',
      signOut: 'サインアウト',
      welcome_user: 'ようこそ、{{email}}さん！',
      loading: '読み込み中...',
      error: 'エラー: {{message}}',
      userProfile: 'ユーザープロフィール',
      name: '名前',
      email: 'メールアドレス',
      explore: '探索',
      following: 'フォロー中'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;