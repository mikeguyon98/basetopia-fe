import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

function HomePage({ user }) {
  const { t } = useTranslation();
  
  if (user) {
    return <Navigate to="/explore" replace />;
  }
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{t('welcome')}</h1>
      <p className="mt-4">{t('signInPrompt')}</p>
    </div>
  );
}

export default HomePage;