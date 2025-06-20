export type THashRoute = `#${string}`;

export interface INavRoute {
  title: string;
  href: THashRoute;
  icon?: string;
}