import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Domains',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Quiz',
    icon: 'layout-outline',
    link: '/pages/quizzes',
    children: [
      {
        title: 'Create',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/quizzes',
      }
    ],
  },
  {
    title: 'Account',
    group: true,
  },
  {
    title: 'Profile',
    icon: 'layout-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'Settings',
    icon: 'layout-outline',
    link: '/pages/layout/stepper',
  },
  {
    title: 'Log out',
    icon: 'layout-outline',
    link: '/pages/layout/stepper',
  },
];
