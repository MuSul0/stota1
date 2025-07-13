import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SeoData {
  title: string;
  description: string;
  keywords: string;
}

const SeoManager = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const [defaultData, setDefaultData] = useState<SeoData | null>(null);

  const fetchSeoData = useCallback(async () => {
    const path = location.pathname;

    // Fetch data for the current path
    const { data, error } = await supabase
      .from('seo_metadata')
      .select('title, description, keywords')
      .eq('path', path)
      .single();

    if (data) {
      setSeoData(data);
    } else {
      setSeoData(null); // Reset if no specific data found
    }
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error fetching SEO data:', error);
    }

    // Fetch default data for fallback if not already fetched
    if (!defaultData) {
      const { data: defaultResult, error: defaultError } = await supabase
        .from('seo_metadata')
        .select('title, description, keywords')
        .eq('path', '/')
        .single();
      if (defaultResult) {
        setDefaultData(defaultResult);
      }
      if (defaultError && defaultError.code !== 'PGRST116') {
        console.error('Error fetching default SEO data:', defaultError);
      }
    }
  }, [location.pathname, defaultData]);

  useEffect(() => {
    fetchSeoData();

    const channel = supabase
      .channel('seo-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'seo_metadata' },
        (payload) => {
          console.log('SEO-Änderung erkannt, lade neu:', payload);
          fetchSeoData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSeoData]);

  const currentSeo = seoData || defaultData;

  if (!currentSeo) {
    return (
        <Helmet>
            <title>Stota Transport</title>
            <meta name="description" content="Ihr Partner für professionelle Transporte, gründliche Reinigung, kreativen Garten- & Landschaftsbau und umweltgerechte Entsorgung." />
        </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{currentSeo.title}</title>
      <meta name="description" content={currentSeo.description} />
      <meta name="keywords" content={currentSeo.keywords} />
    </Helmet>
  );
};

export default SeoManager;