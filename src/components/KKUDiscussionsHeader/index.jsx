import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import useDocumentDirection from '../../hooks/useDocumentDirection';

import logoAr from './assets/images/logo-ar.svg';
import logoEn from './assets/images/logo-en.svg';
import avatarIcon from './assets/images/header-icons/avatar.svg';
import arrowIcon from './assets/images/header-icons/arrow.svg';

import './index.scss';

const safeHref = (value, fallback = '#') => value || fallback;

const KKUDiscussionsHeader = ({
  courseOrg,
  courseNumber,
  courseTitle,
  showUserDropdown,
}) => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { isArabic, direction } = useDocumentDirection();
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const currentLogo = isArabic ? logoAr : logoEn;
  const displayName = authenticatedUser?.name || authenticatedUser?.username || '';

  const labels = isArabic
    ? {
      help: 'المساعدة',
      learnerRole: 'متدرب',
      account: 'الحساب',
      profile: 'الملف الشخصي',
      dashboard: 'لوحة التعلم',
      signOut: 'تسجيل الخروج',
    }
    : {
      help: 'Help',
      learnerRole: 'Learner',
      account: 'Account',
      profile: 'Profile',
      dashboard: 'Dashboard',
      signOut: 'Sign Out',
    };

  const links = {
    home: safeHref(getConfig().KKU_HOME_URL || getConfig().LMS_BASE_URL),
    help: safeHref(getConfig().SUPPORT_URL),
    dashboard: safeHref(getConfig().KKU_LEARNER_DASHBOARD_URL || getConfig().LEARNING_BASE_URL),
    profile: safeHref(getConfig().KKU_PROFILE_URL || getConfig().PROFILE_URL),
    account: safeHref(getConfig().KKU_ACCOUNT_URL || getConfig().ACCOUNT_PROFILE_URL),
    logout: safeHref(getConfig().KKU_LOGOUT_URL || getConfig().LOGOUT_URL),
  };

  const userMenuItems = [
    { href: links.dashboard, content: labels.dashboard },
    { href: links.profile, content: labels.profile },
    { href: links.account, content: labels.account },
    { href: links.logout, content: labels.signOut },
  ].filter((item) => item.href && item.href !== '#');

  return (
    <header className="kku-discussions-header" dir={direction}>
      <div className="kku-discussions-header__inner">
        <a href={links.home} className="kku-discussions-header__brand" aria-label="KKUx">
          <img
            src={currentLogo}
            alt="KKUx"
            className={`kku-discussions-header__logo ${!isArabic ? 'kku-discussions-header__logo--en' : ''}`}
          />
        </a>

        <div className="kku-discussions-header__course">
          {courseNumber && (
            <span className="kku-discussions-header__course-number">
              {[courseOrg, courseNumber].filter(Boolean).join(' ')}
            </span>
          )}

          {courseTitle && (
            <span className="kku-discussions-header__course-title">
              {courseTitle}
            </span>
          )}
        </div>

        <div className="kku-discussions-header__actions">
          {links.help !== '#' && (
            <a href={links.help} className="kku-discussions-header__help">
              {labels.help}
            </a>
          )}

          {showUserDropdown && (
            <div className={`kku-discussions-user-menu ${userMenuOpen ? 'kku-discussions-user-menu--open' : ''}`}>
              <button
                type="button"
                className="kku-discussions-user-menu__button"
                onClick={() => setUserMenuOpen((value) => !value)}
              >
                <img src={avatarIcon} alt="" className="kku-discussions-user-menu__avatar" />

                <span className="kku-discussions-user-menu__text">
                  <span className="kku-discussions-user-menu__name">{displayName}</span>
                  <span className="kku-discussions-user-menu__role">{labels.learnerRole}</span>
                </span>

                <img src={arrowIcon} alt="" className="kku-discussions-user-menu__arrow" />
              </button>

              <div className="kku-discussions-user-menu__dropdown">
                {userMenuItems.map((item) => (
                  <a
                    key={item.content}
                    href={item.href}
                    className="kku-discussions-user-menu__item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {item.content}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

KKUDiscussionsHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  showUserDropdown: PropTypes.bool,
};

KKUDiscussionsHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default KKUDiscussionsHeader;
