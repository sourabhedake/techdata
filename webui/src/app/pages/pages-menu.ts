import { NbMenuItem } from '@nebular/theme';

export const DASHBOARD_MENU: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  }
];

export const ADMIN_MENU: NbMenuItem[] = [
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
]

export const QUIZ_MENU: NbMenuItem[] = [
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
];

export const ACCOUNT_MENU: NbMenuItem[] = [
  {
    title: 'Log out',
    icon: 'layout-outline',
    link: '/auth/logout',
  },
];
