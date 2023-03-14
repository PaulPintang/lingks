export interface colorInterface {
  label: string;
  color: string;
}

export interface LinksInterface {
  name: string | null;
  link: string | null;
  date?: string | null;
}

export interface BookmarkInterface {
  _id?: string;
  title?: string | null;
  description?: string | null;
  banner?: string | null;
  labels?: colorInterface[];
  links?: LinksInterface[];
}
