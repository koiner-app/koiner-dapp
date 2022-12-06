export interface Project {
  name: string;
  token?: {
    name: string;
    contractId?: string;
  };
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
