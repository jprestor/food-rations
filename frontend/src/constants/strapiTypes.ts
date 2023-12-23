type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  width: number;
  height: number;
  size: number;
  path: null;
};

export type ImageType = {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  size: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  url: string;
  previewUrl: string | null;
  createdAt: string;
  updatedAt: string;
  placeholder: string | null;
};

export type FileType = {
  id: number;
  url: string;
  size: number;
  ext: string;
};

export type WidgetFiles = { id: number; file: FileType }[];

export type MetaComponent = {
  title: string;
  description?: string;
  image?: ImageType | null;
} | null;

export type DynamicZone = { [key: string]: any }[];
