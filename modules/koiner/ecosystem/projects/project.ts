export interface Project {
  name: string;
  token?: string;
  caption?: string;
  description: string;
  image?: string;
  icon?: string;
  links: {
    url: string;
    icon: string;
  }[];
  dapp?: boolean;
  types: string[];
  tags: string[];
  maintainers: {
    name: string;
    discord: string;
    twitter: string;
  }[];
}
