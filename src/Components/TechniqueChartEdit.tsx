import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import agent from "../agent";
import { ITechniqueChart } from "../models/chart";
import { EditTechniqueChartMobile } from "./EditTechniqueChartMobile";
import { toast } from "react-toastify";

export const TechniqueChartEdit = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState<ITechniqueChart | null>(null);

  useEffect(() => {
    const getChart = async () => {
      try {
        const chartFromDB: ITechniqueChart = await agent.TechniqueCharts.get(
          id!
        );
        setChart(chartFromDB);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error getting chart.");
      }
    };

    getChart();
  }, [id]);

  if (isLoading) return <Loading content="Loading chart..." />;

  return <EditTechniqueChartMobile chart={chart!} isDemo={false} />;
};
