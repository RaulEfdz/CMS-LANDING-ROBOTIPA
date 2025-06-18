"use client"

import React from 'react';
import ChartCard from '@/app/modules/analytics/components/ChartCard';
import { data, DataPoint, chartConfigs } from '@/app/db/charts';

interface ChartViewsProps {
  showFullViewButton: boolean;
}

const ChartViews: React.FC<ChartViewsProps> = ({ showFullViewButton = false }) => {
  const config = chartConfigs.find(c => c.dataKey === "visitas") || {
    title: 'Vistas',
    dataKey: "visitas" as keyof DataPoint,
    color: '#82ca9c' // Color por defecto
  };

  return (
    <ChartCard
      title={config.title}
      dataKey={config.dataKey}
      color={config.color}
      data={data}
      fullViewRoute={showFullViewButton ? "/analytics/content/views" : undefined}
    />
  );
};

export default ChartViews;
