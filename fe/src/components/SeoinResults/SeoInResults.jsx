import React from 'react';
import MetaTagsAnalysis from './MetaTagsAnalysis';
import HeadingsAnalysis from './HeadingAnalysis';
import KeywordDensityAnalysis from './KeywordDensityAnalysis';
import ImagesOptimizationAnalysis from './ImagesOptimizationAnalysis';
import URLStructureAnalysis from './URLStructureAnalysis';
import DuplicateContentAnalysis from './DuplicateContentAnalysis';
import ReadabilityAnalysis from './ReadabilityAnalysis';

const SeoInResults = ({ seoData, loading }) => {
  if (loading) {
    return <p>Caricamento dei dati SEO in corso...</p>;
  }

  if (!seoData) {
    return <p>Non sono disponibili dati SEO da mostrare.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Analizza la SEO in-page</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetaTagsAnalysis metaData={seoData.metaTags} />
        <HeadingsAnalysis headingsData={seoData.headings} />
        <KeywordDensityAnalysis keywordDensityData={seoData.keywordDensity} />
        <ImagesOptimizationAnalysis imagesData={seoData.images} />
        <URLStructureAnalysis urlStructureData={seoData.urlStructure} />
        <DuplicateContentAnalysis duplicateContentData={seoData.duplicateContent} />
        <ReadabilityAnalysis readabilityData={seoData.readability} />
      </div>
    </div>
  );
};

export default SeoInResults;
