const langOfTruckBtn = {
    login: 'Đăng nhập',
    system: 'Hệ thống'
}

const langOfLogin = {
    welcome: 'Chào mừng',
    userName: 'Tài khoản',
    password: 'Mật khẩu',
    login: 'ĐĂNG NHẬP'
}

const langOfTable = {
    actions_btnName: 'Thực hiện hành động',
}

const langOfSystemTopBar = {
    account: 'Tài khoản',
    logout: 'Đăng xuất'
}

const langOfSystemHome = {
    home: 'Trang chủ'
}


const langOfAccountInfo = {
    account_info: 'Thông tin tài khoản',
    name: 'Tên',
    userName: 'Tài khoản',
    password: 'Mật khẩu',
    admin: 'Quản trị viên',
    factory: 'Nhà máy',
    agency: 'Đại lý',
    maintain_center: 'Trung tâm bảo hành',
    unknown: 'Chưa xác định',
    role: 'Vai trò',
    email: 'Email',
    phone: 'Điện thoại',
    address: 'Địa chỉ',
    birth: 'Ngày sinh',
    status: 'Trạng thái',
    status_enable: 'Kích hoạt',
    status_disable: 'Vô hiệu',
}

const langOfMessage = {
    ...langOfAccountInfo,
    export_confirm: numOfProduct => {
        return `xác nhận đã xuất đi ${numOfProduct} sản phẩm.`
    },
    export: numOfProduct => {
        return `cần xác nhận đã xuất đi ${numOfProduct} sản phẩm.`
    },
    alerts: 'Thông báo',
    details: 'Xem chi tiết',
    show_all_alerts: 'Hiển thị toàn bộ thồng báo'
}

const langOfLanguageChooser = {
    _NAME_: 'VI',
    language: 'Ngôn ngữ',
    vietnamese: 'Tiếng Việt',
    english: 'Tiếng Anh',
}

const langOfSystemNavigator = {
    system: 'Tổng quan',
    home: 'Trang chủ',
    account: 'Tài khoản',
    display: 'Hiển thị'
}

const langOfAdminNavigator = {
    admin: 'Quản trị viên',
    manage_accounts: 'Quản lý tài khoản',
    manage_models: 'Quản lý dòng sản phẩm',
    manage_products: 'Quản lý sản phẩm',
    view_customers: 'Thông tin khách hàng',
}

const langOfFactoryNavigator = {
    factory: 'Cơ sở sản xuất',
    factory_models: 'Quản lý dòng sản phẩm',
    factory_products: 'Quản lý sản phẩm',
}

const langOfAgencyNavigator = {
    agency: 'Đại lý phân phối',
    agency_models: 'Các dòng sản phẩm',
    agency_products: 'Quản lý sản phẩm',
    agency_customers: 'Quản lý thông tin khách hàng',
}

const langOfMaintenanceNavigator = {
    maintenance: 'Trung tâm bảo hành',
    maintenance_models: 'Các dòng sản phẩm',
    maintenance_products: 'Quản lý sản phẩm bảo hành'
}

const langOfAdminAddAccount = {
    ...langOfAccountInfo,
    create_success: 'Tạo Tài Khoản Mới Thành Công',
    add_new_account: 'Thêm tài khoản mới',
    cancel: 'Hủy',
    submit: 'Nộp',
}

const langOfAdminAccounts = {
    ...langOfAccountInfo,
    manage_accounts: 'Quản lý các tài khoản',
    add_new_account: 'Thêm tài khoản mới',
    sumary_re: count => `Tổng số ${count} tài khoản`
}

const langOfAdminModels = {
    name: 'Tên dòng sản phẩm',
    sign_name: 'Mã dòng sản phẩm',
    generation: 'Thế hệ',
    produced_factory: 'Nhà máy sản xuất',
    birth: 'Ngày ra mắt',
    series: 'Phiên bản',
    trim: 'Trim',
    length: 'Chiều dài (mm)',
    width: 'Chiều rộng (mm)',
    height: 'Chiều cao (mm)',
    body_type: 'Loại thân xe',
    engine_type: 'Loại động cơ',
    max_speed: 'Tốc độ tối đa (km/h)',
    acceleration: 'Gia tốc',
    city_fuel: 'Nhiên liệu tiêu thụ (l/100km)',
    sumary_re: count => `Tổng số ${count} dòng sản phẩm`,
    manage_models: 'Quản lý các dòng sản phẩm'
}

const langOfAdminProducts = {
    manage_products: 'Quản lý các sản phẩm',
    model: 'Tên & Mã dòng sản phẩm',
    produced_factory: 'Nhà máy sản xuất',
    birth: 'Ngày sản xuất',
    state: 'Trạng thái',
    location: 'Vị trí',
    sumary_re: count => `Tổng số ${count} sản phẩm`,
    moving_to: (partner) => {
        const prefix = 'Đang vận chuyển đến '
        switch (partner.role) {
            case 2:
                return prefix + 'nhà máy ' + partner.name
            case 3:
                return prefix + 'đại lý ' + partner.name
            case 4:
                return prefix + 'TTBH ' + partner.name
        }
        return 'Unkown'
    },
    staying_at: (name, role) => {
        return role + ' ' + name
    },
    by_customer: (name) => {
        return 'Khách hàng ' + name
    },
    factory: 'Nhà máy',
    agency: 'Đại lý',
    maintain_center: 'Trung tâm bảo hành',
    customer: 'Khách hàng'
}

const langOfAdminCustomers = {
    ...langOfAccountInfo,
    view_customers: 'Thông tin khách hàng',
    sumary_re: count => `Tổng số ${count} khách hàng`
}

const langOfFactoryModels = {
    ...langOfAdminModels,
    add_model_btn: 'Thêm dòng sản phẩm mới',
}

const langOfFactoryAddModel = {
    ...langOfAdminModels,
    add_new_model: "Thêm dòng sản phẩm mới",
    birth: 'Ngày ra mắt',
    length: 'Chiều dài',
    width: 'Chiều rộng',
    height: 'Chiều cao',
    max_speed: 'Tốc độ tối đa',
    city_fuel: 'Nhiên liệu tiêu thụ',
    cancel: 'Hủy',
    submit: 'Thêm',
    add_success: 'Thêm dòng sản phẩm mới thành công!',
}

const langOfFactoryProducts = {
    ...langOfAdminProducts,
    import_products_btn: 'Nhập lô sản phẩm',
}

const langOfFactoryImportProducts = {
    ...langOfAdminProducts,
    import_products: "Nhập lô sản phẩm",
    quantity: 'Số lượng',
    cancel: 'Hủy',
    submit: 'Nhập',
    import_success: 'Nhập lô sản phẩm thành công!',
}

const langOfAgencyModels = {
    ...langOfAdminModels,
    view_models: 'Các dòng sản phẩm',
}

const langOfAgencyProducts = {
    ...langOfAdminProducts
}

const langOfAgencyCustomers = {
    ...langOfAdminAccounts,
    manage_customers: 'Quản lý thông tin khách hàng',
    add_new_customer: 'Thêm thông tin khách hàng mới',
    sumary_re: count => `Tổng số ${count} khách hàng`
}

const langOfAgencyAddCustomer = {
    ...langOfAdminAccounts,
    add_new_customer: 'Thêm thông tin khách hàng',
}

const langOfMaintenanceModels = {
    ...langOfAdminModels,
    view_models: 'Các dòng sản phẩm',
}

const langOfMaintenanceProducts = {
    ...langOfAdminProducts
}

const langOfModelDisplay = {
    ...langOfAdminModels,
    model_details: 'Thông tin dòng sản phẩm'
}

const langOfAccountDisplay = {
    ...langOfAccountInfo,
    created_at: 'Ngày tạo',
    updated_at: 'Sửa đổi cuối',
    account_details: 'Thông tin chi tiết'
}

const langOfProductDisplay = {
    ...langOfAdminProducts,
    product_details: 'Thông tin chi tiết',
    history: 'Lịch sử',
    produced_at: factoryName => `Sản xuất tại nhà máy ${factoryName}`,
    begin_maintain: agencyName => `Bắt đầu bảo hành tại đại lý ${agencyName}`,
    export_out: (from, to, roles) => {
        return `Vận chuyển từ ${roles[from.role].toLowerCase()} ${from.name} đến ${roles[to.role].toLowerCase()} ${to.name}`
    },
    purchase_to: customerName => `Sản phẩm được bán cho khách hàng ${customerName}`,
    recall_start: (agency, customer) => {
        return `Đại lý ${agency?.name} thu hồi sản phẩm từ khách hàng ${customer?.name}`
    },
    maintain_fail: (maintainCenter, factory) => {
        return `Sản phẩm được trung tâm bảo hành ${maintainCenter?.name} chuyển về nhà máy ${factory?.name} do phát hiện lỗi trong quá trình bảo hành`
    },
    maintain_moving: (sender, reciever, isFromAgency) => {
        if (isFromAgency) {
            return `Đại lý ${sender?.name} chuyển sản phẩm đến trung tâm bảo hành ${reciever?.name} để bảo hành sản phẩm`
        }
        return `Sản phẩm hoàn tất bảo hành tại trung tâm bảo hành ${sender?.name} và được vận chuyển về đại lý  ${reciever?.name}`
    },
    return_customer: (agency, customer) => {
        return `Đại lý ${agency?.name} trả sản phẩm cho khách hàng ${customer?.name} sau bảo hành`
    },
    recall_moving: (sender, reciever, isFromAgency) => {
        if (isFromAgency) {
            return `Đại lý ${sender?.name} chuyển sản phẩm đến trung tâm bảo hành ${reciever?.name} để thu hồi`
        }
        return `Trung tâm bảo hành ${sender?.name} chuyển sản phẩm về nhà máy ${reciever?.name} để thu hồi`
    },
    recieved_product: (sender, reciever, roles) => {
        return `${roles[reciever.role]} ${reciever?.name} xác nhận sản phẩm`
    }
}

const langOfProductActions = {
    ...langOfAdminProducts,
    selected_num: rows => {
        return `Đã chọn ${rows.length} sản phẩm`
    },
    actions_title: 'Hành động',
    actions_selection: 'Chọn hành động',
    cancel: 'Hủy',
    submit: 'Hành động',
}

const langOfFactoryActions = {
    ...langOfProductActions,
    actions_title: "Xuất lô sản phẩm",
    destination_agency: 'Tới Đại lý',
    quantity: 'Số lượng',
    delivery_date: 'Ngày giao hàng',
    submit: 'Xuất',
    alert_success: 'Xuất lô sản phẩm thành công!',
    action_one: 'Xuất sản phẩm đến Đại lý',
    action_two: 'Xác nhận sản phẩm',
}

const langOfAgencyActions = {
    ...langOfProductActions,
    action_one: 'Bảo hành tại đại lý',
    action_two: 'Thu hồi sản phẩm',
    action_three: 'Xuất sản phẩm đến Trung tâm bảo hành để bảo hành',
    action_four: 'Chuyển sản phẩm cho khách hàng sau bảo hành',
    action_five: 'Xác nhận sản phẩm',
    action_six: 'Bán sản phẩm cho khách hàng'
}

const langOfMaintenanceActions = {
    ...langOfProductActions,
    action_one: 'Xuất sản phẩm',
    action_two: 'Xác nhận sản phẩm',
}

const langOfExportProducts = {
    destination: 'Điểm đến',
    reason: 'Lý do',
    reason_warranty: 'Bảo hành',
    reason_recall: 'Thu hồi',
    reason_export: 'Xuất kho',
    reason_error_maintain: 'Lỗi trong quá trình bảo hành',
    note: 'Ghi chú',
}

const vi = {
    _NAME_: 'VI',
    TruckBtn: langOfTruckBtn,
    Login: langOfLogin,
    Table: langOfTable,

    SystemTopBar: langOfSystemTopBar,
    SystemHome: langOfSystemHome,
    Message: langOfMessage,
    AccountInfo: langOfAccountInfo,
    LanguageChooser: langOfLanguageChooser,

    SystemNagivator: langOfSystemNavigator,
    AdminNavigator: langOfAdminNavigator,
    FactoryNavigator: langOfFactoryNavigator,
    AgencyNavigator: langOfAgencyNavigator,
    MaintenanceNavigator: langOfMaintenanceNavigator,

    ModelDisplay: langOfModelDisplay,
    AccountDisplay: langOfAccountDisplay,
    ProductDisplay: langOfProductDisplay,

    AdminAddAccount: langOfAdminAddAccount,
    AdminAccounts: langOfAdminAccounts,
    AdminModels: langOfAdminModels,
    AdminProducts: langOfAdminProducts,
    AdminCustomers: langOfAdminCustomers,

    ProductActions: langOfProductActions,
    FactoryActions: langOfFactoryActions,
    AgencyActions: langOfAgencyActions,
    MaintenanceActions: langOfMaintenanceActions,
    ExportProducts: langOfExportProducts,

    FactoryModels: langOfFactoryModels,
    FactoryAddModel: langOfFactoryAddModel,
    FactoryProducts: langOfFactoryProducts,
    FactoryImportProducts: langOfFactoryImportProducts,

    AgencyModels: langOfAgencyModels,
    AgencyProducts: langOfAgencyProducts,
    AgencyCustomers: langOfAgencyCustomers,
    AgencyAddCustomer: langOfAgencyAddCustomer,

    MaintenanceModels: langOfMaintenanceModels,
    MaintenanceProducts: langOfMaintenanceProducts,
}

export default vi