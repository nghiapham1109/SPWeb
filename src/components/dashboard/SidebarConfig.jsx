import { Icon } from '@iconify/react';
import foodCake16Filled from '@iconify/icons-fluent/food-cake-16-filled';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <img style={{height:22,width:22}} src='images/injection.png'/>
  },
  {
    title: 'disease',
    path: '/disease',
    icon: <img style={{height:22,width:22}} src='images/coronavirus.png'/>
  },
  {
    title: 'symptom',
    path: '/symptom',
    icon: <img style={{height:22,width:22}} src='images/injection.png'/>
  },
  // {
  //   title: 'food',
  //   path: '/food',
  //   icon: getIcon(foodCake16Filled)
  // },
];

export default sidebarConfig;
