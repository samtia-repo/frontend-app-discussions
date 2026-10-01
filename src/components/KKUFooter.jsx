import { getConfig } from '@edx/frontend-platform';

import aiYearLogo from '../assets/footer/ai.svg';
import visionLogo from '../assets/footer/vision-2030.svg';
import kkuLogo from '../assets/footer/kku-logo-white.svg';
import kkuxLogoAr from '../assets/footer/logo-ar.svg';
import kkuxLogoEn from '../assets/footer/logo-en.svg';
import useDocumentDirection from '../hooks/useDocumentDirection';

const KKUFooter = () => {
  const { isArabic, direction } = useDocumentDirection();
  const kkuxLogo = isArabic ? kkuxLogoAr : kkuxLogoEn;
  const homeUrl = getConfig().KKU_HOME_URL || '';

  const labels = isArabic
    ? {
      privacyPolicy: 'سياسة الخصوصية',
      regulations: 'الأنظمة والشروط',
      siteMap: 'خريطة الموقع',
      copyright: 'جميع الحقوق محفوظة لجامعة الملك خالد © 2026',
      developedBy: 'تم تطويره وصيانته بواسطة جامعة الملك خالد',
      lastUpdated: 'تاريخ آخر تحديث: 04/12/2026',
      aiYear: 'عام الذكاء الاصطناعي',
    }
    : {
      privacyPolicy: 'Privacy Policy',
      regulations: 'Regulations and Conditions',
      siteMap: 'Sitemap',
      copyright: 'All rights reserved to the King Khalid University © 2026',
      developedBy: 'Developed and maintained by King Khalid University',
      lastUpdated: 'Last updated: 04/12/2026',
      aiYear: 'Year of AI',
    };

  return (
    <footer className="site-footer" dir={direction}>
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <div className="site-footer__brands">
            <a
              className="site-footer__ai-year"
              href="https://sdaia.gov.sa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.aiYear}
            >
              <img src={aiYearLogo} alt={labels.aiYear} />
            </a>
            <img src={visionLogo} alt="Vision 2030" />
            <img src={kkuLogo} alt="King Khalid University" />
            <img
              src={kkuxLogo}
              alt="KKUx"
              className={`site-footer__kkux-logo ${
                !isArabic ? 'site-footer__kkux-logo--en' : ''
              }`}
            />
          </div>

          <div className="site-footer__legal">
            <div className="site-footer__legal-links">
              <a href={`${homeUrl}/privacy-terms`}>{labels.privacyPolicy}</a>
              <a href={`${homeUrl}/regulations`}>{labels.regulations}</a>
              <a
                href="https://maps.google.com/?q=King+Khalid+University+Abha"
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.siteMap}
              </a>
            </div>

            <p className="site-footer__copyright">
              {labels.copyright}
            </p>

            <p>{labels.developedBy}</p>

            <p>{labels.lastUpdated}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KKUFooter;
