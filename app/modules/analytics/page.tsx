"use client";

import React from "react";
import ChartTR from "./content/tr/chartTR";
import ChartTC from "./content/tc/chartTC";
import ChartUsers from "./content/users/chartUsers";
import ChartViews from "./content/views/chartViews";
import PageHeader from "@/app/modules/analytics/components/PageHeader";
import ChartsTools from "./tools/chartsTools";
import { Header } from "./components/Header";

const Analytics = () => {

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
        <div className="px-6">
          <PageHeader title="Analíticas">
            <ChartsTools />
          </PageHeader>
        </div>
        <div className="flex-1 min-h-0 p-6 pt-0">
          <div className="h-full overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartTR showFullViewButton={true} />
              <ChartTC showFullViewButton={true} />
              <ChartUsers showFullViewButton={true} />
              <ChartViews showFullViewButton={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
