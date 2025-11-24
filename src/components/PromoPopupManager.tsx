'use client';

import { useEffect, useState } from 'react';
import PromoPopup from './PromoPopup';
import { getActivePromo, type PromoConfig } from '@/data/promoConfig';

export default function PromoPopupManager() {
  const [activePromo, setActivePromo] = useState<PromoConfig | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActivePromo(getActivePromo());
  }, []);

  if (!mounted || !activePromo) {
    return null;
  }

  return (
    <PromoPopup
      title={activePromo.title}
      description={activePromo.description}
      code={activePromo.code}
      discount={activePromo.discount}
      validUntil={activePromo.validUntil}
      autoShow={activePromo.autoShow}
      delay={activePromo.delay}
      showOnce={activePromo.showOnce}
    />
  );
}
