import { useTranslation } from 'react-i18next';

function HomePage({ user }) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{t('welcome')}</h1>
      {!user && <p className="mt-4">{t('signInPrompt')}</p>}
    </div>
  );
}

export default HomePage;