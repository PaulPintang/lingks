export interface LabelInterface {
  label: string;
  color: string;
}

export interface LinksInterface {
  _id?: string;
  name: string | null;
  link: string | null;
  date?: string | null;
  createdAt: string;
}

export interface BookmarkInterface {
  _id?: string;
  title?: string | null;
  description?: string | null;
  banner?: string | null;
  labels?: LabelInterface[];
  links?: LinksInterface[];
  updatedAt?: string;
}
