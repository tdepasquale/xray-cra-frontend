export enum ElementType {
  Heading = 0,
  Paragraph = 1,
  Link = 2,
  ListItem = 3,
  Image = 4,
}

export interface IBlogSection {
  id: string;
  type: ElementType;
  index: number;
  text?: string;
  imageFile?: string | null;
  imageUrl?: string;
  imageSrc?: string;
}

export interface IBlog {
  id: string;
  title: string;
  coverImageFile?: string | null;
  // coverImageFile?: File;
  // coverImageFile?: FormData;
  coverImageUrl: string;
  sections: IBlogSection[];
  ownerUsername: string;
  // datePosted?: Date;
  feedback?: string;
}
