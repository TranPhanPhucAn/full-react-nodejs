export const adminMenu = [
  {
    //hệ thống
    //Quản lý người dùng
    // name: "menu.system.header",
    name: "menu.admin.manage-user",
    menus: [
      { name: "menu.admin.crud", link: "/system/user-manage" },
      { name: "menu.admin.crud-redux", link: "/system/user-redux" },
      {
        // name: "menu.system.system-administrator.header",
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",

        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },

        //   // { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
        //   // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
        // ],
      },
      {
        //Quản lý kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      // {
      //   name: "menu.system.system-parameter.header",
      //   link: "/system/system-parameter",
      // },
      { name: "menu.admin.manage-admin", link: "/system/user-admin" },
    ],
  },
  {
    //Quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      { name: "menu.admin.manage-clinic", link: "/system/manage-clinic" },
    ],
  },
  {
    //Quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      { name: "menu.admin.manage-specialty", link: "/system/manage-specialty" },
    ],
  },
  {
    //Quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      { name: "menu.admin.manage-handbook", link: "/system/manage-handbook" },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      //Quản lý kế hoạch khám bệnh của bác sĩ
      { name: "menu.doctor.manage-schedule", link: "/doctor/manage-schedule" },
    ],
  },
];
