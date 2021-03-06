//  DEFAULT Action
export const PANEL_TOGGLE = 'PANEL_TOGGLE'
export const SHOW_SUCCESS_TOSTER = 'SHOW_SUCCESS_TOSTER'
export const CLOSE_TOSTER = 'CLOSE_TOSTER'
//  eBay Integration Action Types:
export const E_BAY_STORE_NAME = 'E_BAY_STORE_NAME'
export const SWEET_ALERT_ERROR_MESSAGE = 'SWEET_ALERT_ERROR_MESSAGE'
export const E_BAY_SAVE_STORE_NAME = 'E_BAY_SAVE_STORE_NAME'
export const E_BAY_SELECT_ALL_STORE_DATA = 'E_BAY_SELECT_ALL_STORE_DATA'
export const MESSAGE_SERVER = 'MESSAGE_SERVER'
export const E_BAY_SELECT_ALL_STORE_DATA_START =
  'E_BAY_SELECT_ALL_STORE_DATA_START'
export const GET_PORTAL_NAME = 'GET_PORTAL_NAME'
export const SWEET_ALERT_SUCCESS_MESSAGE = 'SWEET_ALERT_SUCCESS_MESSAGE'
export const CLOSE_MESSAGES = 'CLOSE_MESSAGES'
export const BUTTON_LOADER_START = 'BUTTON_LOADER_START'
export const BUTTON_LOADER_END = 'BUTTON_LOADER_END'
export const TOKEN_UPDATED = 'TOKEN_UPDATED'
export const ALERT_MESSAGE = 'ALERT_MESSAGE'
export const ACCOUNT_TOGGLE_FUNCTION = 'ACCOUNT_TOGGLE_FUNCTION'
export const SELLER_ACCOUNT_TOGGLE_FUNCTION = 'SELLER_ACCOUNT_TOGGLE_FUNCTION'
//  Genrate Barcode Action Types:
export const GET_MERCHANT_DETAIL = 'GET_MERCHANT_DETAIL'
export const GET_TOTAL_BARCODE = 'GET_TOTAL_BARCODE'
export const REMOVE_TOTAL_BARCODE = 'REMOVE_TOTAL_BARCODE'
export const ADD_BARCODE_NUMBER = 'ADD_BARCODE_NUMBER'
export const BARCODE_DETAIL_DATATABLE = 'BARCODE_DETAIL_DATATABLE'
export const STORE_BARCODE_DATA = 'STORE_BARCODE_DATA'
export const GET_BARCODE_DETAIL = 'GET_BARCODE_DETAIL'
export const NEW_BARCODE_INSERTED = 'NEW_BARCODE_INSERTED'
export const DELETE_BARCODE = 'DELETE_BARCODE'
// Merchant Lot Detail
//  ADD_NEW_LOT in genrateBarcodeReducer
export const ADD_NEW_LOT = 'ADD_NEW_LOT'
//   Create Appointment
export const GET_SERVICES_FOR_APPOINTMENT = 'GET_SERVICES_FOR_APPOINTMENT'
export const GET_APPOINTMENT_DETAIL = 'GET_APPOINTMENT_DETAIL'
export const CENCEL_APPOINTMENT = 'CENCEL_APPOINTMENT'
export const ADMIN_APPROVED_APPOINTMENT = 'ADMIN_APPROVED_APPOINTMENT'
export const USER_INQUEUE_APPOINTMENT = 'USER_INQUEUE_APPOINTMENT'
export const INSERT_NEW_APPOINTMENT = 'INSERT_NEW_APPOINTMENT'
export const GET_SPECIFIC_SEVICES = 'GET_SPECIFIC_SEVICES'
export const GET_SPECIFIC_SEVICES_NO_RECORD = 'GET_SPECIFIC_SEVICES_NO_RECORD'
export const PROCESS_APPOINTMENT = 'PROCESS_APPOINTMENT'
export const COMPLETE_APPOINTMENT = 'COMPLETE_APPOINTMENT'
export const CUSTOM_PROCESS_APPOINTMENT = 'CUSTOM_PROCESS_APPOINTMENT'
export const CUSTOM_PROCESS_APPOINTMENT_FAIL = 'CUSTOM_PROCESS_APPOINTMENT_FAIL'
export const GET_SPECIFIC_LOG_DETAIL = 'GET_SPECIFIC_LOG_DETAIL'
export const DELETE_SPECIFIC_LOG_DETAIL = 'DELETE_SPECIFIC_LOG_DETAIL'
export const DELETE_SPECIFIC_LOG_ALL_DETAIL = 'DELETE_SPECIFIC_LOG_ALL_DETAIL'
export const SEARCH_BARCODE = 'SEARCH_BARCODE'
export const SEARCH_PROCESS_APPOINTMENT = 'SEARCH_PROCESS_APPOINTMENT'
export const REMOVE_SEARCH_BARCODES = 'REMOVE_SEARCH_BARCODES'
export const SET_DIFF_MINS = 'SET_DIFF_MINS'
export const GET_APPOINTMENT_SUMMARY = 'GET_APPOINTMENT_SUMMARY'
export const APPOINTMENT_MERCHANT_LOT = 'APPOINTMENT_MERCHANT_LOT'
export const ADD_LOT_BARCODE_APPOINTMENT = 'ADD_LOT_BARCODE_APPOINTMENT'
export const LOT_PROCESS_APPOINTMENT = 'LOT_PROCESS_APPOINTMENT'
export const REMOVE_LOT_BARCODES = 'REMOVE_LOT_BARCODES'
export const SAVE_ALL_LOT_BARCODES = 'SAVE_ALL_LOT_BARCODES'
export const UPDATE_TIME_AFTER_SAVE = 'UPDATE_TIME_AFTER_SAVE'
export const DELETE_ALLAPPOINTMENT_BARCODES = 'DELETE_ALLAPPOINTMENT_BARCODES'
export const SAVE_APPOINTMENT_PACKING = 'SAVE_APPOINTMENT_PACKING'
export const GET_APPOINTMENT_PACKING = 'GET_APPOINTMENT_PACKING'
export const UPDATE_APPOINTMENT_PACKING = 'UPDATE_APPOINTMENT_PACKING'
export const SAVE_ALL_APPOINTMENT_PACKING = 'SAVE_ALL_APPOINTMENT_PACKING'
export const UPDATE_ALL_APPOINTMENT_PACKING = 'UPDATE_ALL_APPOINTMENT_PACKING'
//  Genrate Billing Admin
export const GENRATE_SERVICE_BILL = 'GENRATE_SERVICE_BILL'
export const GET_PACKING_TYPE = 'GET_PACKING_TYPE'
export const GENRATE_PACKING_BILL = 'GENRATE_PACKING_BILL'
export const GET_SERVICE_BILLS = 'GET_SERVICE_BILLS'
export const DELETE_SERVICE_BILL = 'DELETE_SERVICE_BILL'
export const UPDATE_SERVICE_BILL = 'UPDATE_SERVICE_BILL'
//  Product Dimension
export const GET_PRODUCT_DIMENSION = 'GET_PRODUCT_DIMENSION'
// Invoice Detail
export const GET_INVOICE_DETAIL = 'GET_INVOICE_DETAIL'
export const GET_INVOICE_DATA_DETAIL = 'GET_INVOICE_DATA_DETAIL'
export const GET_SPECIFIC_INVOICE_DETAIL = 'GET_SPECIFIC_INVOICE_DETAIL'
export const CHANGE_DIS_AMOUNT = 'CHANGE_DIS_AMOUNT'
export const CHANGE_DIS_AMOUNT_PER = 'CHANGE_DIS_AMOUNT_PER'
export const CHANGE_CHARGE = 'CHANGE_CHARGE'
export const SAVE_DISCOUNT_AMOUNT = 'SAVE_DISCOUNT_AMOUNT'
export const CHANGE_ALL_DIS_AMOUNT = 'CHANGE_ALL_DIS_AMOUNT'
export const CHANGE_ALL_DIS_PERC = 'CHANGE_ALL_DIS_PERC'
export const SAVE_ALL_DIS_AMOUNT_PERC_CHANGE = 'SAVE_ALL_DIS_AMOUNT_PERC_CHANGE'
export const GET_INVOICE_SUMMARY = 'GET_INVOICE_SUMMARY'
// start invoice detail by tayyab
export const INSERT_PAYMENT_DETAIL = 'INSERT_PAYMENT_DETAIL'
export const GET_RECEIPT_NO = 'GET_RECEIPT_NO'
// end invoice detail by tayyab
//  Create Lot
export const MERCHANT_BARCODE_CHECK = 'MERCHANT_BARCODE_CHECK'
export const DELETE_BARCODE_FROM_LOT = 'DELETE_BARCODE_FROM_LOT'
export const ITEM_COND_DETAIL = 'ITEM_COND_DETAIL'
export const OBJECT_COND_DETAIL = 'OBJECT_COND_DETAIL'
export const ADD_NEW_OBJECT = 'ADD_NEW_OBJECT'
export const RANGE_BARCODE_CHECK = 'RANGE_BARCODE_CHECK'
export const ADD_IMAGE_TO_LOT = 'ADD_IMAGE_TO_LOT'
export const CHANGE_SAVE_LOT_BUTTON_PROP = 'CHANGE_SAVE_LOT_BUTTON_PROP'
export const CHANGE_SAVE_LOT_BUTTON_SOWL = 'CHANGE_SAVE_LOT_BUTTON_SOWL'
export const MERCHANT_UNPOSTED_BARCODE_CHECK = 'MERCHANT_UNPOSTED_BARCODE_CHECK'
export const DELETE_UNPOSTED_BARCODE_FROM_LOT =
  'DELETE_UNPOSTED_BARCODE_FROM_LOT'
export const UNPOSTED_RANGE_BARCODE_CHECK = 'UNPOSTED_RANGE_BARCODE_CHECK'
export const CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP =
  'CHANGE_SAVE_UNPOSTEDLOT_BUTTON_PROP'
export const CHANGE_SAVE_UNPOSTEDLOT_BUTTON_SOWL =
  'CHANGE_SAVE_UNPOSTEDLOT_BUTTON_SOWL'
export const ADD_IMAGE_TO_UNPOST_LOT = 'ADD_IMAGE_TO_UNPOST_LOT'
export const UNSELECT_ALL_IMAGES = 'UNSELECT_ALL_IMAGES'
export const UNSELECT_ALL_UNPOST_IMAGES = 'UNSELECT_ALL_UNPOST_IMAGES'
export const SUGESTED_CATEGORY = 'SUGESTED_CATEGORY'
export const REMOVE_SUGGEST_CATEGORY = 'REMOVE_SUGGEST_CATEGORY'
// POSt ACTIONS
export const GET_POS_FORM_DATA = 'GET_POS_FORM_DATA'
export const GET_POS_FORM_STATE = 'GET_POS_FORM_STATE'
export const GET_POS_FORM_STORE_NAME = 'GET_POS_FORM_STORE_NAME'
export const GET_TAX = 'GET_TAX'
export const CHANGE_EXEMPT = 'CHANGE_EXEMPT'
export const CHANGE_EXEMPT_EDIT = 'CHANGE_EXEMPT_EDIT'
export const GET_BARCODE_DETAIL_POS = 'GET_BARCODE_DETAIL_POS'
export const OPEN_END_ITEM_MODEL = 'OPEN_END_ITEM_MODEL'
export const GET_SCAN_BARCODE_DETAIL = 'GET_SCAN_BARCODE_DETAIL'
export const CHANGE_LINE_TYPE_VALUE = 'CHANGE_LINE_TYPE_VALUE'
export const CHANGE_COST_PRICE = 'CHANGE_COST_PRICE'
export const CHANGE_DISCOUNT_PER = 'CHANGE_DISCOUNT_PER'
export const CHANGE_DISCOUNT_AMOUNT = 'CHANGE_DISCOUNT_AMOUNT'
export const CHANGE_SAVE_BUTTON_PROPS = 'CHANGE_SAVE_BUTTON_PROPS'
export const DELETE_POS_BARCODE = 'DELETE_POS_BARCODE'
export const GET_POS_TABLE_DATA = 'GET_POS_TABLE_DATA'
export const DELETE_INVOICE = 'DELETE_INVOICE'
export const GET_BUYER_INFO_EDIT = 'GET_BUYER_INFO_EDIT'
export const GET_POS_EDIT_FORM_DATA = 'GET_POS_EDIT_FORM_DATA'
export const GET_BARCODE_DETAIL_POS_EDIT = 'GET_BARCODE_DETAIL_POS_EDIT'
export const CHANGE_LINE_TYPE_VALUE_EDIT = 'CHANGE_LINE_TYPE_VALUE_EDIT'
export const CHANGE_COST_PRICE_EDIT = 'CHANGE_COST_PRICE_EDIT'
export const CHANGE_DISCOUNT_PER_EDIT = 'CHANGE_DISCOUNT_PER_EDIT'
export const CHANGE_DISCOUNT_AMOUNT_EDIT = 'CHANGE_DISCOUNT_AMOUNT_EDIT'
export const GET_TAX_EDIT = 'GET_TAX_EDIT'
export const GET_BARCODE_EDIT_DETAIL_POS = 'GET_BARCODE_EDIT_DETAIL_POS'
export const GET_POS_TOTAL_AMOUNT = 'GET_POS_TOTAL_AMOUNT'
export const POST_POS_INVOICE = 'POST_POS_INVOICE'
export const DELETE_ALL_POS_iNOVICE = 'DELETE_ALL_POS_iNOVICE'
export const POST_ALL_POS_INOVICE = 'POST_ALL_POS_INOVICE'
export const UNPOST_ALL_POS_INVOICE = 'UNPOST_ALL_POS_INVOICE'
export const DELETE_POS_BARCODE_EDIT = 'DELETE_POS_BARCODE_EDIT'
export const GET_POS_TOTAL_AMOUNT_EDIT = 'GET_POS_TOTAL_AMOUNT_EDIT'
export const GET_POS_RECEPIT_BY_STORE = 'GET_POS_RECEPIT_BY_STORE'
export const REMOVE_ALL_EDIT_UNMOUNT = 'REMOVE_ALL_EDIT_UNMOUNT'
export const UNMOUNT_POS_FORM = 'UNMOUNT_POS_FORM'
export const CHANGE_ALL_DIS_PER = 'CHANGE_ALL_DIS_PER'
export const CHANGE_ALL_DIS_AMOUNT_EDIT = 'CHANGE_ALL_DIS_AMOUNT_EDIT'
export const CHANGE_ALL_DIS_PER_EDIT = 'CHANGE_ALL_DIS_PER_EDIT'
export const CHANGE_POS_DETAIL_USING_TAX = 'CHANGE_POS_DETAIL_USING_TAX'
export const SEARCH_FORM_DATA = 'SEARCH_FORM_DATA'
export const ADD_REPAIR_TO_POS = 'ADD_REPAIR_TO_POS'
export const REMOVE_SEARCH_REPAIR_POS_BARCODE =
  'REMOVE_SEARCH_REPAIR_POS_BARCODE'
export const CLOSE_END_ITEM_MODEL = 'CLOSE_END_ITEM_MODEL'
export const EBAY_BARCODE_QTY = 'EBAY_BARCODE_QTY'
// POS STORE
export const GET_POS_STORE_DATA = 'GET_POS_STORE_DATA'
export const SAVE_POS_STORE_INFO = 'SAVE_POS_STORE_INFO'
export const DELETE_STORE = 'DELETE_STORE'
export const GET_POS_FORM_STATE_EDIT = 'GET_POS_FORM_STATE_EDIT'
export const GET_POS_FORM_STORE_UPDATE = 'GET_POS_FORM_STORE_UPDATE'
export const CLOSE_MODEL_ON_SUCCESS = 'CLOSE_MODEL_ON_SUCCESS'
/**
 *
 * Reapire Pos Form
 */
export const GET_POS_REPAIRE_FORM_DATA = 'GET_POS_REPAIRE_FORM_DATA'
export const SAVE_POS_REPAIRE_DATA = 'SAVE_POS_REPAIRE_DATA'
export const DELETE_POS_REPAIRE_DATA = 'DELETE_POS_REPAIRE_DATA'
export const GET_BARCODE_DETAIL_POS_REPAIR = 'GET_BARCODE_DETAIL_POS_REPAIR'
export const CHANGE_LINE_TYPE_REPAIRE = 'CHANGE_LINE_TYPE_REPAIRE'
export const DELETE_REPAIR_BARCODE = 'DELETE_REPAIR_BARCODE'
export const CHANGE_COST_REPAIRE = 'CHANGE_COST_REPAIRE'
export const CHANGE_ADVANCE_AMOUNT = 'CHANGE_ADVANCE_AMOUNT'
export const GET_SPECIFIC_POS_REPAIR_DATA = 'GET_SPECIFIC_POS_REPAIR_DATA'
/**
 *
 * Repair Edit POS
 *
 *  */
export const GET_BARCODE_DETAIL_POS_REPAIR_EDIT =
  'GET_BARCODE_DETAIL_POS_REPAIR_EDIT'
export const UPDATE_POS_REPAIRE_FORM = 'UPDATE_POS_REPAIRE_FORM'
export const CHANGE_LINE_TYPE_REPAIRE_EDIT = 'CHANGE_LINE_TYPE_REPAIRE_EDIT'
export const DELETE_REPAIR_BARCODE_EDIT = 'DELETE_REPAIR_BARCODE_EDIT'
export const CHANGE_COST_REPAIRE_EDIT = 'CHANGE_COST_REPAIRE_EDIT'
export const CHANGE_ADVANCE_AMOUNT_EDIT = 'CHANGE_ADVANCE_AMOUNT_EDIT'
export const EDIT_UNMOUNT_ALL_DATATABLE_RECORD =
  'EDIT_UNMOUNT_ALL_DATATABLE_RECORD'
/**
 *
 * POS Receipt Payment Detail
 */
export const GET_INVOICE_RECEIPT_DETAIL = 'GET_INVOICE_RECEIPT_DETAIL'
export const REMOVE_ALL_INVOICE_RECEIPT_DETAIL =
  'REMOVE_ALL_INVOICE_RECEIPT_DETAIL'
export const DELETE_INVOICE_RECEIPT_DETAIL = 'DELETE_INVOICE_RECEIPT_DETAIL'
export const EDIT_INVOICE_RECEIPT_PAYMENT_DETAIL =
  'EDIT_INVOICE_RECEIPT_PAYMENT_DETAIL'
/**
 *
 * Assign Barcodes
 *
 *
 */

export const GET_EMPLOYEE_NAME = 'GET_EMPLOYEE_NAME'
export const GET_TOTAL_ITEMS = 'GET_TOTAL_ITEMS'
export const LOAD_SPECIAL_LOT_DATA = 'LOAD_SPECIAL_LOT_DATA'
export const TOGGLE_LOT_BARCODE = 'TOGGLE_LOT_BARCODE'
export const TOGGLE_LOT_ALL_BARCODE = 'TOGGLE_LOT_ALL_BARCODE'
export const TOGGLE_FILTER_ALL_BARCODE = 'TOGGLE_FILTER_ALL_BARCODE'
export const REMOVE_TOGGLE_BARCODES = 'REMOVE_TOGGLE_BARCODES'
export const CHANGE_ASSIGN_FILTER = 'CHANGE_ASSIGN_FILTER'
/**
 *
 *
 * Invoice Order Data
 *
 */

export const GET_INVOICE_ORDER_DATA = 'GET_INVOICE_ORDER_DATA'
export const OPEN_PANE = 'OPEN_PANE'
export const CLOSE_PANE = 'CLOSE_PANE'
export const GET_ORDER_BARCODES = 'GET_ORDER_BARCODES'
export const GET_VERIFIED_INVOICE_ORDER = 'GET_VERIFIED_INVOICE_ORDER'
export const GET_UN_VERIFIED_INVOICE_ORDER = 'GET_UN_VERIFIED_INVOICE_ORDER'
export const GET_ALL_INVOCIE_ORDER = 'GET_ALL_INVOCIE_ORDER'
export const VERIFIED_ALL_BARCODE = 'VERIFIED_ALL_BARCODE'
export const UN_VERIFIED_ALL_BARCODE = 'UN_VERIFIED_ALL_BARCODE'
/***
 *
 *
 * Classified Ad
 *
 *
 */
export const SEARCH_CLASSIFIED_AD = 'SEARCH_CLASSIFIED_AD'
export const FILTER_IMAGE_CLASSIFIED = 'FILTER_IMAGE_CLASSIFIED'
/***
 *
 *
 * User End Objects
 *
 *
 */
export const GET_OBJECTS = 'GET_OBJECTS'
export const GET_BRANDS = 'GET_BRANDS'
export const GET_SERIES = 'GET_SERIES'
export const GET_MODELS = 'GET_MODELS'
export const GET_LZW_CONFIG_DATA = 'GET_LZW_CONFIG_DATA'
