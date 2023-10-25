export const paths = {
    HOME: '/',
    LOGIN: '/login',
    SYSTEM: '/system',
    ACCOUNT: '/system/account',
    ADMIN_ACCOUNTS: '/system/admin/accounts',
    ADMIN_MODELS_SHOW_ONE: '/system/admin/models/detail',
    ADMIN_MODELS: '/system/admin/models',
    ADMIN_PRODUCTS: '/system/admin/products',
    ADMIN_CUSTOMERS: '/system/admin/customers',
    FACTORY_MODELS: '/system/factory/models',
    FACTORY_PRODUCTS: '/system/factory/products',
    AGENCY_MODELS: '/system/agency/models',
    AGENCY_PRODUCTS: '/system/agency/products',
    AGENCY_CUSTOMERS: '/system/agency/customers',
    MAINTENANCE_MODELS: '/system/maintenance/models',
    MAINTENANCE_PRODUCTS: '/system/maintenance/products'
}

export const messageTitles = {
    NEW_MESSAGE: 'NEW_MESSAGE',
    AUTHENTICATE_RESPONSE: 'AUTHENTICATE_RESPONSE',
    AUTHENTICATE_REQUEST: 'AUTHENTICATE_REQUEST',
    NEED_AUTHENTICATE: 'NEED_AUTHENTICATE'
}

export const apiUrls = {
    LOGIN: 'login-partner',
    GET_PARTNERS_BY_QUERY: '/api/get-partners-by-query',
    CREATE_PARTNER: '/api/create-partner',
    CREATE_MODEL: '/api/create-model',
    CREATE_PRODUCTS: '/api/create-products',
    EXPORT_PRODUCTS: '/api/export-products',
    GET_MODELS_BY_QUERY: '/api/get-models-by-query',
    GET_MODELS_BY_IDS: '/api/get-models-by-ids',
    GET_PRODUCTS_BY_QUERY: '/api/get-products-by-query',
    GET_CUSTOMERS_BY_QUERY: '/api/get-customers-by-query',
    GET_CURRENT_PRODUCTS_BY_QUERY: '/api/get-current-products-by-query',
    GET_RESOURCES: '/api/get-resources',
    MAINTENANCE_PRODUCTS: '/api/maintain-products',
    EXPORT_PRODUCTS: '/api/export-products',
    RECALL_PRODUCTS: '/api/recall-products',
    RETURN_PRODUCT: '/api/return-products-to-customer',
    CONFIRM_PRODUCT: '/api/confirm-export-products',
    GET_NEWEST_EXPORTS: '/api/get-newest-exports',
    GET_CUSTOMER: '/api/get-customers-by-query',
    SOLD_PRODUCT: '/api/sold-product',
}

export const roles = {
    ADMIN: 1,
    FACTORY: 2,
    AGENCY: 3,
    MAINTERNANCE: 4
}