
"use client";

import React from "react";

import { Header } from "../../components/Header";
import PageHeader from "@/app/modules/analytics/components/PageHeader";
import ChartTR from "./chartTR";
import ChartTools from "../../tools/chartTools";

const PageChartTR = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
        <div className="px-6">
        <PageHeader title="Tasa de robote" >
            <ChartTools/>
          </PageHeader>
        </div>
        <div className="flex-1 min-h-0 p-6 pt-0">
          <div className="h-full overflow-auto">
              <ChartTR showFullViewButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageChartTR;