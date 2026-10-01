import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

const getDirection = (locale) => (locale?.startsWith('ar') ? 'rtl' : 'ltr');

const useDocumentDirection = () => {
  const intl = useIntl();
  const locale = intl.locale || document.documentElement.lang || 'ar';
  const direction = getDirection(locale);
  const isArabic = direction === 'rtl';

  React.useEffect(() => {
    const html = document.documentElement;

    html.lang = locale;
    html.dir = direction;
    html.classList.toggle('kku-is-rtl', isArabic);
    html.classList.toggle('kku-is-ltr', !isArabic);
    document.body.dir = direction;
    document.body.classList.toggle('kku-is-rtl', isArabic);
    document.body.classList.toggle('kku-is-ltr', !isArabic);
  }, [locale, direction, isArabic]);

  return { locale, direction, isArabic };
};

export default useDocumentDirection;
