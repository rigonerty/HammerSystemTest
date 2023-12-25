

import { 
  DashboardOutlined, 
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  MobileOutlined,
  FileTextOutlined,
  EditOutlined,
  PictureOutlined,
  ShoppingOutlined,
  ShopOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'


const mainNavTree = [{
  key: 'main',
  path: `${APP_PREFIX_PATH}/main`,
  title: 'основные',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboard',
      path: `${APP_PREFIX_PATH}/main/dashboard`,
      title: 'Дашборт',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'planner',
      path: `${APP_PREFIX_PATH}/main/planner`,
      title: 'Планировщик',
      icon: EditOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'catalog',
      path: `${APP_PREFIX_PATH}/main/catalog`,
      title: 'Каталог',
      icon: ShoppingCartOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'supply',
          path: `${APP_PREFIX_PATH}/main/catalog/supply`,
          title: 'Товары',
          icon: "",
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'rating',
          path: `${APP_PREFIX_PATH}/main/catalog/rating`,
          title: 'Категории',
          icon: "",
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'collection',
          path: `${APP_PREFIX_PATH}/main/catalog/collection`,
          title: 'Коллекции',
          icon: "",
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'combo',
          path: `${APP_PREFIX_PATH}/main/catalog/combo`,
          title: 'Комбо',
          icon: "",
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'orders',
      path: `${APP_PREFIX_PATH}/main/orders`,
      title: 'Заказы',
      icon: ShoppingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'clients',
      path: `${APP_PREFIX_PATH}/main/clients`,
      title: 'Клиенты',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'list',
          path: `${APP_PREFIX_PATH}/main/clients/list`,
          title: 'Список клиентов',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'group',
          path: `${APP_PREFIX_PATH}/main/clients/group`,
          title: 'Группы клиентов',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'banners',
      path: `${APP_PREFIX_PATH}/main/banners`,
      title: 'Баннеры',
      icon: PictureOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'promocode',
      path: `${APP_PREFIX_PATH}/main/promocode`,
      title: 'Промокоды',
      icon: GiftOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'offlinePoint',
      path: `${APP_PREFIX_PATH}/main/offlinePoint`,
      title: 'Оффлайн точки',
      icon: ShopOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'addres',
          path: `${APP_PREFIX_PATH}/main/offlinePoint/addres`,
          title: 'Адреса',
          icon: "",
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'geozones',
          path: `${APP_PREFIX_PATH}/main/offlinePoint/geozones`,
          title: 'Геозоны',
          icon: "",
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'workers',
      path: `${APP_PREFIX_PATH}/main/workers`,
      title: 'Сотрудники',
      icon: UsergroupAddOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'mails',
      path: `${APP_PREFIX_PATH}/main/mails`,
      title: 'Рассылки',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}]

const systemNavTree = [{
  key: 'system',
  path: `${APP_PREFIX_PATH}/system`,
  title: 'Системные',
  icon: AppstoreOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'settings',
      path: `${APP_PREFIX_PATH}/system/settings`,
      title: 'Настройки',
      icon: SettingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'mobileSoft',
      path: `${APP_PREFIX_PATH}/system/mobileSoft`,
      title: 'Мобильное приложение',
      icon: MobileOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'logs',
      path: `${APP_PREFIX_PATH}/system/logs`,
      title: 'Логи',
      icon: FileTextOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...mainNavTree,
  ...systemNavTree,
]

export default navigationConfig;
