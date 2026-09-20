import React, { useEffect } from 'react';
import { trackPageView } from '../../services/analytics';

export const SEO = ({ title, description, url }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | LendKart — Community Rental Marketplace`
      : `LendKart — Don't Buy It. Lend It. | Premium Community Rental Marketplace`;

    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    trackPageView(url || window.location.pathname, fullTitle);
  }, [title, description, url]);

  return null;
};

export default SEO;
