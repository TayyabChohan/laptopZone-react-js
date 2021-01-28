import { createStore } from "redux";
// import defaultReducer from '../reducer/defaultReducer.js'
import { reducer as toastrReducer } from "react-redux-toastr";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
//  Reducers Mae By Haziq
import posReducer from "../reducer/posReducer.js";
import createLotReducer from "../reducer/createLotReducer.js";
import appointmentReducer from "../reducer/appointmentReducer.js";
import genrateBillingReducer from "../reducer/genrateBillingReducer.js";
import productDimensionReducer from "../reducer/productDimensionReducer.js";
import eBayReducer from "../reducer/eBayReducer.js";
import genrateBarcodeReducer from "../reducer/genrateBarcodeReducer.js";
import invoiceReducer from "../reducer/invoiceReducer.js";
import posRepaireReducer from "../reducer/posRepaireReducer.js";
import assignBarcodeReducer from "../reducer/assignBarcodeReducer.js";
import invoiceOrderReducer from "../reducer/invoiceOrderReducer.js";
import fileuploadReducer from "../reducer/fileuploadReducer.js";
import classifiedadReducer from "../reducer/classifiedadReducer.js";
import lzwConfigReducer from "../reducer/lzwConfigReducer.js";
// End Reducers

import packingReducer from "../billingReduderStore/Reducer/packingReducer.js";
import billingSetupReducer from "../billingReduderStore/Reducer/billingSetupReducer";
import packingOrderReducer from "../billingReduderStore/Reducer/packingOrderReducer";
import templateReducer from "../billingReduderStore/Reducer/templateReducer";
import totalBarcodeReducer from "../billingReduderStore/Reducer/totalBarcodeReducer";
import pictureReducer from "../billingReduderStore/Reducer/pictureReducer";
import barcodeProcessReducer from "../billingReduderStore/Reducer/barcodeProcessReducer";
import activeNotListedReducer from "../billingReduderStore/Reducer/activeNotListedReducer";
import solditemReducer from "../billingReduderStore/Reducer/solditemReducer";
import awaitingShipmentReducer from "../billingReduderStore/Reducer/awaitingShipmentReducer.js";
import shippedReducer from "../billingReduderStore/Reducer/shippedReducer.js";
import itemReturnedReducer from "../billingReduderStore/Reducer/itemReturnedReducer.js";
import usersReducer from "../billingReduderStore/Reducer/usersReducer.js";
import addmerchantReducer from "../billingReduderStore/Reducer/addmerchantReducer.js";
import myprofilrReducer from "../billingReduderStore/Reducer/myprofilrReducer.js";
import uSPKNonListedItemsReducer from "../billingReduderStore/Reducer/uSPKNonListedItemsReducer.js";
import deKittingUsReducer from "../billingReduderStore/Reducer/deKittingUsReducer.js";
import ItemReturnsPostReducer from "../billingReduderStore/Reducer/ItemReturnsPostReducer.js";
import BarcodeImageReducer from "../billingReduderStore/Reducer/BarcodeImageReducer.js";
import listerviewReducer from "../billingReduderStore/Reducer/listerviewReducer.js";
import addwerehouseReducer from "../billingReduderStore/Reducer/addwerehouseReducer.js";
import rackReducer from "../billingReduderStore/Reducer/rackReducer.js";
import addBinReducer from "../billingReduderStore/Reducer/addBinReducer.js";
import itempackingReducer from "../billingReduderStore/Reducer/itempackingReducer.js";
import add_info_reducer from "../billingReduderStore/Reducer/add_info_reducer.js";
import callLogReducer from "../billingReduderStore/Reducer/callLogReducer.js";
import listedBarcodeReducer from "../billingReduderStore/Reducer/listedBarcodeReducer";

//By Tahir
import getRequestsReducer from "../ModulesByTahir/reducers/getRequestsReducer.js";
//END Tahir

const rootReducer = combineReducers({
  eBayReducer,
  getRequestsReducer,
  classifiedadReducer,
  lzwConfigReducer,
  invoiceOrderReducer,
  posReducer,
  assignBarcodeReducer,
  posRepaireReducer,
  genrateBillingReducer,
  createLotReducer,
  genrateBarcodeReducer,
  appointmentReducer,
  billingSetupReducer,
  productDimensionReducer,
  packingOrderReducer,
  invoiceReducer,
  templateReducer,
  totalBarcodeReducer,
  pictureReducer,
  barcodeProcessReducer,
  activeNotListedReducer,
  solditemReducer,
  awaitingShipmentReducer,
  itemReturnedReducer,
  usersReducer,
  shippedReducer,
  addmerchantReducer,
  myprofilrReducer,
  uSPKNonListedItemsReducer,
  packingReducer,
  deKittingUsReducer,
  ItemReturnsPostReducer,
  toastr: toastrReducer,
  BarcodeImageReducer,
  listerviewReducer,
  addwerehouseReducer,
  rackReducer,
  addBinReducer,
  itempackingReducer,
  add_info_reducer,
  callLogReducer,
  listedBarcodeReducer
});
const composeEnhancers = composeWithDevTools({
  serialize: true
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
