import {
  Button,
  Image,
  Tag,
  Popup,
  Sidebar,
  SidebarItem,
  Search,
  Swipe,
  SwipeItem,
  Icon,
  Tab,
  Tabs,
} from "vant";

const vantList = [
  Button,
  Image,
  Tag,
  Popup,
  Sidebar,
  SidebarItem,
  Search,
  Swipe,
  SwipeItem,
  Icon,
  Tab,
  Tabs,
];
/**
 * 批量按需引入vant组件
 */
export class UseVant {
  constructor(app: any) {
    vantList.forEach((item) => {
      app.use(item);
    });
  }
}
