export interface ITechniqueChart {
  id: string;
  ownerUsername: string;
  name: string;
  techniques: ITechnique[];
}

export interface ITechnique {
  id: string;
  bodyPart: string;
  mAs: number;
  kVp: number;
  notes: string;
  index: number;
}
