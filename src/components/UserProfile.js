import React from 'react';
import { useAuth } from '../utils/useAuth';
import { useTranslation } from 'react-i18next';

function UserProfile() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return <div className="text-white">{t('loading')}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-dark-800 rounded-lg shadow-xl border border-dark-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{t('userProfile')}</h2>
      {user.displayName && (
        <p className="mb-2 text-dark-100">
          <span className="font-semibold">{t('name')}:</span> {user.displayName}
        </p>
      )}
      <p className="mb-2 text-dark-100">
        <span className="font-semibold">{t('email')}:</span> {user.email}
      </p>
    </div>
  );
}

export default UserProfile;