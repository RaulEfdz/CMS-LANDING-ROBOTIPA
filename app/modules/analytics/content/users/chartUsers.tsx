"use client"

import React from 'react';
import ChartCard from '@/app/modules/analytics/components/ChartCard';
import { data, DataPoint, chartConfigs } from '@/app/db/charts';

interface ChartUsersProps {
  showFullViewButton: boolean;
}

const ChartUsers: React.FC<ChartUsersProps> = ({ showFullViewButton = false }) => {
  const config = chartConfigs.find(c => c.dataKey === "usuarios") || {
    title: 'Usuarios',
    dataKey: "usuarios" as keyof DataPoint,
    color: '#8884d8' // Color por defecto
  };

  return (
    <ChartCard
      title={config.title}
      dataKey={config.dataKey}
      color={config.color}
      data={data}
      fullViewRoute={showFullViewButton ? "/analytics/content/users" : undefined}
    />
  );
};

export default ChartUsers;
