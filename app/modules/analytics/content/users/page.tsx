"use client";

import React from "react";

import PageHeader from "@/app/modules/analytics/components/PageHeader";
import ChartUsers from "./chartUsers";
import ChartTools from "../../tools/chartTools";
import { Header } from "../../components/Header";

const PageChartUsers = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
        <div className="px-6">
          <PageHeader title="Usuarios" >
            <ChartTools/>
          </PageHeader>
        </div>
        <div className="flex-1 min-h-0 p-6 pt-0">
          <div className="h-full overflow-auto">
              <ChartUsers showFullViewButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageChartUsers;