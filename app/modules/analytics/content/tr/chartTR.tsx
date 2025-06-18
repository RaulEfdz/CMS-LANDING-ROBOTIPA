"use client"

import React from 'react';
import ChartCard from '@/app/modules/analytics/components/ChartCard';
import { data, DataPoint, chartConfigs } from '@/app/db/charts';

interface ChartTRProps {
  showFullViewButton: boolean;
}

const ChartTR: React.FC<ChartTRProps> = ({ showFullViewButton = false }) => {
  const config = chartConfigs.find(c => c.dataKey === "rebote") || {
    title: 'Tasa de Rebote',
    dataKey: "rebote" as keyof DataPoint,
    color: '#ffc658' // Color por defecto
  };

  return (
    <ChartCard
      title={config.title}
      dataKey={config.dataKey}
      color={config.color}
      data={data}
      fullViewRoute={showFullViewButton ? "/analytics/content/tr" : undefined}
    />
  );
};

export default ChartTR;
