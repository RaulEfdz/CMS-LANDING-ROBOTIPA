"use client"

import React from 'react';
import ChartCard from '@/app/modules/analytics/components/ChartCard';
import { data, DataPoint, chartConfigs } from '@/app/db/charts';

interface ChartTCProps {
  showFullViewButton: boolean;
}

const ChartTC: React.FC<ChartTCProps> = ({ showFullViewButton = false }) => {
  const config = chartConfigs.find(c => c.dataKey === "conversion") || {
    title: 'Tasa de Conversión',
    dataKey: "conversion" as keyof DataPoint,
    color: '#f50057' // Color por defecto
  };

  return (
    <ChartCard
      title={config.title}
      dataKey={config.dataKey}
      color={config.color}
      data={data}
      fullViewRoute={showFullViewButton ? "/analytics/content/tc" : undefined}
    />
  );
};

export default ChartTC;
