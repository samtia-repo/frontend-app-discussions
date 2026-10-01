import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { StrictMode } from 'react';

// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';

import {
  APP_INIT_ERROR, APP_READY, initialize, mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import Head from './components/Head/Head';
import { DiscussionsHome } from './discussions';
import useDocumentDirection from './hooks/useDocumentDirection';
import messages from './i18n';
import store from './store';

import './index.scss';

const DocumentDirection = () => {
  useDocumentDirection();
  return null;
};

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(
    <StrictMode>
      <AppProvider store={store}>
        <DocumentDirection />
        <Head />
        <DiscussionsHome />
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<ErrorPage message={error.message} />);
});

initialize({
  requireAuthenticatedUser: true,
  messages,
  handlers: {
    config: () => {
      mergeConfig({
        LEARNING_BASE_URL: process.env.LEARNING_BASE_URL,
        LEARNER_FEEDBACK_URL: process.env.LEARNER_FEEDBACK_URL,
        STAFF_FEEDBACK_URL: process.env.STAFF_FEEDBACK_URL,
        ENABLE_PROFILE_IMAGE: process.env.ENABLE_PROFILE_IMAGE,
        KKU_HOME_URL: process.env.KKU_HOME_URL || null,
        KKU_LMS_URL: process.env.KKU_LMS_URL || null,
        KKU_LOGIN_URL: process.env.KKU_LOGIN_URL || null,
        KKU_LOGOUT_URL: process.env.KKU_LOGOUT_URL || null,
        KKU_LEARNER_DASHBOARD_URL: process.env.KKU_LEARNER_DASHBOARD_URL || null,
        KKU_PROFILE_URL: process.env.KKU_PROFILE_URL || null,
        KKU_ACCOUNT_URL: process.env.KKU_ACCOUNT_URL || null,
        KKU_AUTHN_URL: process.env.KKU_AUTHN_URL || null,
        KKU_LEARNING_URL: process.env.KKU_LEARNING_URL || null,
        SUPPORT_URL: process.env.SUPPORT_URL || null,
      }, 'DiscussionsConfig');
    },
  },
});
