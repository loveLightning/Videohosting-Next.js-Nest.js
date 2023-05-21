export interface ISidebar {
  title: string
  href: string
}

export const sidebarData: ISidebar[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Categories',
    href: '/categories',
  },
  {
    title: 'Products',
    href: '/products',
  },
]
