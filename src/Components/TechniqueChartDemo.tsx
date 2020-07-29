import React from "react";
import { ITechnique, ITechniqueChart } from "../models/chart";
import { EditTechniqueChartMobile } from "./EditTechniqueChartMobile";

export const TechniqueChartDemo = () => {
  const initialTechniques: ITechnique[] = [
    {
      id: "0",
      index: 0,
      bodyPart: "Fingers / Toes",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    { id: "1", index: 1, bodyPart: "Hand / Wrist", mAs: 0, kVp: 0, notes: "" },
    {
      id: "2",
      index: 2,
      bodyPart: "Carpal Tunnel",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    { id: "3", index: 3, bodyPart: "Forearm", mAs: 0, kVp: 0, notes: "" },
    { id: "4", index: 4, bodyPart: "Elbow", mAs: 0, kVp: 0, notes: "" },
    { id: "5", index: 5, bodyPart: "Humerus", mAs: 0, kVp: 0, notes: "" },
    { id: "6", index: 6, bodyPart: "Foot", mAs: 0, kVp: 0, notes: "" },
    { id: "7", index: 7, bodyPart: "Ankle", mAs: 0, kVp: 0, notes: "" },
    { id: "8", index: 8, bodyPart: "Tib / Fib", mAs: 0, kVp: 0, notes: "" },
    { id: "9", index: 9, bodyPart: "Femur", mAs: 0, kVp: 0, notes: "" },
    { id: "10", index: 10, bodyPart: "Hip", mAs: 0, kVp: 0, notes: "" },
    { id: "11", index: 11, bodyPart: "Knee AP", mAs: 0, kVp: 0, notes: "" },
    {
      id: "12",
      index: 12,
      bodyPart: "Knee Tunnel",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    {
      id: "13",
      index: 13,
      bodyPart: "Knee Sunrise",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    {
      id: "14",
      index: 14,
      bodyPart: "Shoulder AP",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    {
      id: "15",
      index: 15,
      bodyPart: "Shoulder Axillary",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    { id: "16", index: 16, bodyPart: "Shoulder Y", mAs: 0, kVp: 0, notes: "" },
    { id: "17", index: 17, bodyPart: "A/C Joints", mAs: 0, kVp: 0, notes: "" },
    { id: "18", index: 18, bodyPart: "S/C Joints", mAs: 0, kVp: 0, notes: "" },
    { id: "19", index: 19, bodyPart: "C-Spine AP", mAs: 0, kVp: 0, notes: "" },
    {
      id: "20",
      index: 20,
      bodyPart: "C-Spine Lat",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    { id: "21", index: 21, bodyPart: "T-Spine", mAs: 0, kVp: 0, notes: "" },
    {
      id: "22",
      index: 22,
      bodyPart: "Lumbar Spine",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    {
      id: "23",
      index: 23,
      bodyPart: "Lumbar Spine Obliques",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    {
      id: "24",
      index: 24,
      bodyPart: "Lumbar Spine Lateral",
      mAs: 0,
      kVp: 0,
      notes: ""
    },
    { id: "25", index: 25, bodyPart: "Pelvis", mAs: 0, kVp: 0, notes: "" }
  ];

  const chart: ITechniqueChart = {
    id: "guid",
    name: "Blank Chart",
    ownerUsername: "blank",
    techniques: initialTechniques
  };

  return <EditTechniqueChartMobile isDemo={true} chart={chart} />;
};
