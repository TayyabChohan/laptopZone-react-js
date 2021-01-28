import React from "react";
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SerchBarcode from "./serchbarcode.js";
import Header from "./header.js";
import Footer from "./footer.js";
import UnpostedRecord from "./unpostedrecord.js";
import VerifyItem from "./verify.js";

// import Login from './login.js'
import NotFound from "./NotFound.js";
import MerchDash from "./merDash.js";
import NewDashboard from "./newDashboard.js";
import MerchLots from "./merchLots.js";
import MerActivListing from "./merActivListing.js";
import MerInvoice from "./merInvoice.js";
import MerActivNotListing from "./merActivNotListing.js";
/****************************
 * Modules By Tahir Imports
 ****************************/
import searchItem from "../ModulesByTahir/Transaction_Form/searchItem";
import manageInventory from "../ModulesByTahir/Transaction_Form/manageInventory";
import generateBars from "../ModulesByTahir/Transaction_Form/generateBars";
import Shipment from "../ModulesByTahir/Shipment/Create_Shipment/shipment";
import ShipmentTable from "../ModulesByTahir/Shipment/Create_Shipment/shipmentTable";
import ReceiveShipment from "../ModulesByTahir/Shipment/Receive_Shipment/receiveShipment";
import ReceiveShipmentList from "../ModulesByTahir/Shipment/Receive_Shipment/receiveShipmentList";
import ShipQueue from "../ModulesByTahir/Transaction_Form/shipQueue";
import ReturnInventory from "../ModulesByTahir/Return/Return_Inventory/returnInventory";
import CreateReturn from "../ModulesByTahir/Return/Return_Inventory/createReturn";
import ReceiveReturn from "../ModulesByTahir/Return/Receive_Return/receiveReturn";
import ReturnList from "../ModulesByTahir/Return/Receive_Return/returnList";
import JunkList from "../ModulesByTahir/Return/Receive_Return/junkList";
import AllRequests from "../ModulesByTahir/Return/Receive_Return/allRequests";
import UnderProcess from "../ModulesByTahir/Return_Under_Process/underProcess";
import ProcessComplete from "../ModulesByTahir/Return_Under_Process/processComplete";
import ListedItemsAudit from "../ModulesByTahir/Items_Audit/listedItemsAudit";
import DekitItemsAudit from "../ModulesByTahir/Items_Audit/dekitItemsAudit";
import VerifyCount from "../ModulesByTahir/Items_Audit/verifyCount";
import LocationHistory from "../ModulesByTahir/Items_Audit/locationHistory";
import MultipleTransaction from "../ModulesByTahir/Items_Audit/multipleTransaction";
import BarcodeShortage from "../ModulesByTahir/Items_Audit/barcodeShortage";
import DiscardedBarcodes from "../ModulesByTahir/Items_Audit/discardedBarcodes";
import AuditStats from "../ModulesByTahir/Items_Audit/auditStats";
import SearchOrder from "../ModulesByTahir/PostSales/searchOrder";
import AccountSelect from "../ModulesByTahir/PostSales/accountSelect";
import PictureBinStats from "../ModulesByTahir/Items_Audit/pictureBinStats";
import ItemHistory from "../ModulesByTahir/Items_Audit/itemHistory";
import TransferItems from "../ModulesByTahir/Items_Audit/transferItems";
import NewRequests from "../ModulesByTahir/LZW_repair/newRequests";
/********************************
 * #END# Modules By Tahir Imports
 *********************************/
/********************************
 * Modules By Haziq Imports
 *********************************/
import Create_Lot from "./create_lot/Create_Lot.js";
import eBayIntegration from "./ebayintegration/eBayIntegration.js";
import GenrateBarcode from "./othermerchantservices/GenrateBarcode.js";
import CreateAppointment from "./appointment/CreateAppointment.js";
import GenrateBill from "./genratebill/GenrateBill.js";
import InvoiceDetail from "./invoice/InvoiceDetail.js";
import ProductDimension from "./productdimensions/ProductDimension.js";
import PosForm from "./posForm/PosForm.js";
import RepaireForm from "./posForm/RepaireForm.js";
import RegisterPosStore from "./posForm/RegisterPosStore.js";
import POS_Receipt_View from "./posForm/POS_Receipt_View.js";
import Pos_Form_Edit from "./posForm/Pos_Form_Edit.js";
import AssignBarcode from "./assignBarcode/AssignBarcode.js";
import InvoiceOrder from "./dashboard/InvoiceOrder.js";
import ClassifiedAd_List from "./classified_ad/ClassifiedAd_List.js";
import Lzw_Config from "./lzwConfig/Lzw_Config.jsx";
// import File_Upload from './fileUpload/File_Upload.js'
/********************************
 * #END# Modules By Haziq Imports
 *********************************/

/********************************
 * #Start# Modules By Tayyab
 *********************************/

import BilingSetup from "../conponentByTayyab/billing/BillingSetup.js";
import packingEntry from "../conponentByTayyab/Packing/PackingEntry.jsx";
import bilingRateSetup from "../conponentByTayyab/billing/BillingRateSetup.js";
import packingOrder from "../conponentByTayyab/Packing/PackingOrder.jsx";
import TemplateForm from "../conponentByTayyab/templateForm/TemplateForm.js";
import totalBarcodes from "../conponentByTayyab/totalBarcodes/TotalBarcodes.js";
import picturesDone from "../conponentByTayyab/picturesDone/PicturesDone.js";
import barcodeProcess from "../conponentByTayyab/barcodeProcess/BarcodeProcess.js";
import activeNotListed from "../conponentByTayyab/activeNotListed/ActiveNotListed.js";
import solditem from "../conponentByTayyab/solditem/Solditem.js";
import awaitingShipment from "../conponentByTayyab/awaitingShipment/AwaitingShipment.js";
import shipped from "../conponentByTayyab/shipped/Shipped.js";
import itemReturned from "../conponentByTayyab/itemReturned/ItemReturned.js";
import users from "../conponentByTayyab/users/Users.js";
import addMerchant from "../conponentByTayyab/otherMerchantServices/AddMerchant.js";
import merchLotDetail from "../components/merchLotDetail.js";
import myprofile from "../conponentByTayyab/myprofile/Myprofile.js";
import uSPKNonListedItems from "../conponentByTayyab/uSPKNonListedItems/USPKNonListedItems.js";
import dEKittingUS from "../conponentByTayyab/dEKittingUS/DeKittingUs.js";
import downloadOrders from "../conponentByTayyab/downloadOrders/DownloadOrders.js";
import postitemReturns from "../conponentByTayyab/postitemReturns/ItemReturns.js";
import barcodeImage from "../conponentByTayyab/barcodeImage/BarcodeImage.js";
import listerView from "../conponentByTayyab/listerView/ListerView.js";
import addWherehouse from "../conponentByTayyab/wherehouse/AddWherehouse.js";
import rack from "../conponentByTayyab/wherehouse/Rack.js";
import addBin from "../conponentByTayyab/wherehouse/AddBin.js";
import itemPacking from "../conponentByTayyab/wherehouse/ItemPacking.js";
import add_Info from "../conponentByTayyab/add_Info/Add_info.js";
import callLog from "../conponentByTayyab/lzw/CallLog.js";
import listedBarcode from "../conponentByTayyab/listedBarcode/ListedBarcode.js";

/********************************
 * #END# Modules By tayyab
 *********************************/
/****************************
 * Modules By Adil Ameeq Imports
 ****************************/
import CreateCancellation from "../componentByAdil/orders/create_cancellation.js";
/********************************
 * #END# Modules By Adil Ameeq
 *********************************/
class Aside extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="content-wrapper">
          <aside className="main-sidebar">
            <section className="sidebar">
              <div className="user-panel">
                <div className="pull-left image">
                  <img
                    src="/images/Account-512.png"
                    className="img-circle"
                    alt="User"
                  />
                </div>

                <div className="pull-left info">
                  <p> {localStorage.getItem("accountName")}</p>
                  <a href="#">
                    <i className="fa fa-circle text-success" />{" "}
                    {localStorage.getItem("userName")}
                  </a>
                </div>
              </div>

              <form action="#" method="get" className="sidebar-form">
                <div className="input-group">
                  <input
                    type="text"
                    name="q"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      name="search"
                      id="search-btn"
                      className="btn btn-flat"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </form>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Dashboard</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    {/* <li className="active">
                      <Link to="/merchantDashboard">
                        <i className="fa fa-circle-o" /> My Dashboard{" "}
                      </Link>
                    </li> */}
                    <li className="active">
                      <Link to="/newDashboard">
                        <i className="fa fa-circle-o" /> New Dashboard{" "}
                      </Link>
                    </li>
                    {/* <li className="active">
                      <Link to="/merchlots">
                        <i className="fa fa-circle-o" /> Lot Dashboard{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/merchLotDetailView">
                        <i className="fa fa-circle-o" /> Lot Detail View{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/invoiceorders">
                        <i className="fa fa-circle-o" /> Get Invoice Orders{" "}
                      </Link>
                    </li> */}

                    {/* <li className="active">
                      <Link to="/totalBarcodes">
                        <i className="fa fa-circle-o" /> Total Barcodes{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/picturesDone">
                        <i className="fa fa-circle-o" /> Pictures Done{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/barcodeProcess">
                        <i className="fa fa-circle-o" />Barcode Process{" "}
                      </Link>
                    </li> */}

                    {/* <li className="active">
                      <Link to="/activeNotListed">
                        <i className="fa fa-circle-o" /> Active Not Listed{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/awaitingShipment">
                        <i className="fa fa-circle-o" /> Awaiting Shipment{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/shipped">
                        <i className="fa fa-circle-o" /> Shipped{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/solditem">
                        <i className="fa fa-circle-o" /> Sold{" "}
                      </Link>
    </li>

                    <li className="active">
                      <Link to="/merchantListing">
                        <i className="fa fa-circle-o" /> Active Listed{" "}
                      </Link>
                    </li> */}
                  </ul>
                </li>
              </ul>
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>My Profile</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/myprofile">
                        <i className="fa fa-circle-o" />
                        Update Profile{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/** ********************************
               Module Made By Tayyab
              **********************************/}

              {/** ********************************
               Module Made By Haziq
              **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Appointment</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/createappointment">
                        <i className="fa fa-circle-o" /> Create Appointment{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* <ul className='sidebar-menu' data-widget='tree'>
                <li className='treeview '>
                  <a href='#'>
                    <i className='fa fa-chevron-circle-down' />{' '}
                    <span>Pre Sale</span>
                    <span className='pull-right-container'>
                      <i className='fa fa-angle-left pull-right' />
                    </span>
                  </a>
                  <ul className='treeview-menu'>
                    <li className='active'>
                      <Link to='/createlot'>
                        <i className='fa fa-circle-o' />
                        Create Lot{' '}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul> */}
              {/** ********************************
               End Module Made By Haziq
              **********************************/}

              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Invoices</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    {/* <li className="active">
                      <Link to="/merchantDashboard">
                        <i className="fa fa-circle-o" /> My Dashboard{" "}
                      </Link>
                    </li> */}

                    {/* <li className="active">
                      <Link to="/merchlots">
                        <i className="fa fa-circle-o" /> Lot Dashboard{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/merchLotDetailView">
                        <i className="fa fa-circle-o" /> Lot Detail View{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/invoiceorders">
                        <i className="fa fa-circle-o" /> Get Invoice Orders{" "}
                      </Link>
                    </li> */}

                    {/* <li className="active">
                      <Link to="/totalBarcodes">
                        <i className="fa fa-circle-o" /> Total Barcodes{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/picturesDone">
                        <i className="fa fa-circle-o" /> Pictures Done{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/barcodeProcess">
                        <i className="fa fa-circle-o" />Barcode Process{" "}
                      </Link>
                    </li> */}

                    {/* <li className="active">
                      <Link to="/activeNotListed">
                        <i className="fa fa-circle-o" /> Active Not Listed{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/awaitingShipment">
                        <i className="fa fa-circle-o" /> Awaiting Shipment{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/shipped">
                        <i className="fa fa-circle-o" /> Shipped{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/solditem">
                        <i className="fa fa-circle-o" /> Sold{" "}
                      </Link>
    </li> */}
                    <li className="active">
                      <Link to="/merchInvoices">
                        <i className="fa fa-circle-o" /> Merchant Invoice{" "}
                      </Link>
                    </li>
                    <li className="active" aria-current="true">
                      <Link to="/invoicedetail">
                        <i className="fa fa-circle-o" /> Invoice Detail
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/bilingSetup">
                        <i className="fa fa-circle-o" />
                        Billing Setup{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/bilingRateSetup">
                        <i className="fa fa-circle-o" />
                        Billing Rate Setup{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Packing</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/packingEntry">
                        <i className="fa fa-circle-o" /> Add Packing{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/packingOrder">
                        <i className="fa fa-circle-o" />
                        Packing Order{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {sessionStorage.getItem("userId") == "2" ? (
                <ul className="sidebar-menu" data-widget="tree">
                  <li className="treeview ">
                    <a href="#">
                      <i className="fa fa-chevron-circle-down" />{" "}
                      <span>Users</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right" />
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li className="active">
                        <Link to="/users">
                          <i className="fa fa-circle-o" /> Users List{" "}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                ""
              )}
              {/* {sessionStorage.getItem("userId") == 2 ? (
                 <React.Fragment> */}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Pre-Sale</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>

                  <ul className="treeview-menu">
                    {/** ********************************
                  Module Moade By Haziq
                  **********************************/}
                    <li className="active">
                      <Link to="/createlot">
                        <i className="fa fa-circle-o" />
                        Create Lot{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/assignBarcode">
                        <i className="fa fa-circle-o" />
                        Assign Barcode{" "}
                      </Link>
                    </li>
                    {/** ********************************
                 End Module Moade By Haziq
                  **********************************/}
                    <li className="active">
                      <Link to="/templateform">
                        <i className="fa fa-circle-o" />
                        Template Form{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/varify">
                        <i className="fa fa-circle-o" /> Search Item{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/login">
                        <i className="fa fa-circle-o" /> login{" "}
                      </Link>
                    </li>
                    {/* <li className="active">
                      <Link to="/post">
                        <i className="fa fa-circle-o" /> post{" "}
                      </Link>
                    </li>
                    {/** ********************************
                  Module Moade By Haziq
                  **********************************/}
                    <li className="active">
                      <Link to="/barcodeImage">
                        <i className="fa fa-circle-o" /> Barcode image{" "}
                      </Link>
                    </li>
                    {/** ********************************
                  Module Moade By Haziq
                  **********************************/}
                    {/* <li className="active"><Link to="/varify"><i className="fa fa-circle-o"></i> Verify </Link></li> */}
                  </ul>
                </li>
              </ul>

              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Post Sale</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/downloadOrders">
                        <i className="fa fa-circle-o" />
                        Download Orders{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/postitemReturns">
                        <i className="fa fa-circle-o" />
                        Item Returns{" "}
                      </Link>
                    </li>
                    {/* Module By Tahir */}
                    <li className="active">
                      <Link to="/searchOrder">
                        <i className="fa fa-circle-o" />
                        Search Order{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/add_Info">
                        <i className="fa fa-circle-o" />
                        Add Info{" "}
                      </Link>
                    </li>

                    {/* <li className='active'>
                      <Link to='/accountSelect'>
                        <i className='fa fa-circle-o' />
                        Cancel Orders{' '}
                      </Link>
                    </li> */}
                    {/* #END# Module By Tahir */}
                    {/* Module By Adil Ameeq */}
                    <li className="active">
                      <Link to="/createCancellation">
                        <i className="fa fa-circle-o" />
                        Cancel Order
                      </Link>
                    </li>
                    {/* #END# Module By Adil Ameeq */}
                  </ul>
                </li>
              </ul>
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
 
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>De-Kiting PK-Us</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/uSPKNonListedItems">
                        <i className="fa fa-circle-o" />
                        Listing-pk-us{" "}
                      </Link>
                    </li>
                    {/* <li className="active">
                      <Link to="/dEKittingUS">
                        <i className="fa fa-circle-o" />
                        DE-Kitting-U.S.{" "}
                      </Link>
                    </li> */}
                  </ul>
                </li>
              </ul>
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Reports</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/listerView">
                        <i className="fa fa-circle-o" />
                        Lister View{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              {/*********************************
               * Modules By Tahir Side Bar Links
               **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Items Audit</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/auditStats">
                        <i className="fa fa-circle-o" /> Audit Statistics{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/itemHistory">
                        <i className="fa fa-circle-o" /> Items History{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/transferItems">
                        <i className="fa fa-circle-o" /> Transfer Items{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/pictureBinStats">
                        <i className="fa fa-circle-o" /> Picture Bin Stats{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/listedItemsAudit">
                        <i className="fa fa-circle-o" /> Listed Items Audit{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/dekitItemsAudit">
                        <i className="fa fa-circle-o" /> Dekit Items Audit{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/verifyCount">
                        <i className="fa fa-circle-o" /> Verify Count & Transfer
                        Bin{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/barcodeShortage">
                        <i className="fa fa-circle-o" /> Barcodes Shortage
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/discardedBarcodes">
                        <i className="fa fa-circle-o" /> Discarded Barcode
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/locationHistory">
                        <i className="fa fa-circle-o" /> Location History
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/multipleTransaction">
                        <i className="fa fa-circle-o" /> Transfer Location
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Transaction Form</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/searchItem">
                        <i className="fa fa-search" /> Search Item{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/manageInventory">
                        <i className="fa fa-list" /> Inventory{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/shipQueue">
                        <i className="fa fa-list" /> Ship Queue{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Create Shipment</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/shipmentTable">
                        <i className="fa fa-list" /> Shipment List{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/shipment">
                        <i className="fa fa-edit" /> New Shipment{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Receive Shipment</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/receiveShipment">
                        <i className="fa fa-edit" /> Receive{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/receiveShipmentList">
                        <i className="fa fa-list" /> Shipment List{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Return Inventory</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/createReturn">
                        <i className="fa fa-list" /> Create Return
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/returnInventory">
                        <i className="fa fa-list" /> Return
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Receive Return</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/receiveReturn">
                        <i className="fa fa-list" /> Receive
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/returnList">
                        <i className="fa fa-list" /> Return List
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/junkList">
                        <i className="fa fa-list" /> Junk List
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Return Under Process</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/underProcess">
                        <i className="fa fa-circle-o" /> Pending Requests{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/processComplete">
                        <i className="fa fa-circle-o" /> Process Complete{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/****************************************
               * #END# Modules By Tahir Side Bar Links
               ****************************************/}

              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Warehouse</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/addWherehouse">
                        <i className="fa fa-circle-o" />
                        Add WareHouse{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/rack">
                        <i className="fa fa-circle-o" />
                        Add Rack{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/addBin">
                        <i className="fa fa-circle-o" />
                        Add Bin{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/itemPacking">
                        <i className="fa fa-circle-o" />
                        Item Packing{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/** ********************************
               Module Made By Tayyab
              **********************************/}
              {/****************************************
                Modules Made By Haziq
                ****************************************/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Point Of Sale</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/repaireform">
                        <i className="fa fa-circle-o" /> Repair Form{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/registerpos">
                        <i className="fa fa-circle-o" /> Register POS Store{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/posform">
                        <i className="fa fa-circle-o" /> POS Form{" "}
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/posReceiptView">
                        <i className="fa fa-circle-o" /> POS Receipt View{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Client Step</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/ebayintegration">
                        <i className="fa fa-circle-o" /> eBay Integration{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview ">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Other Merchant Services</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active">
                      <Link to="/genratebarcode">
                        <i className="fa fa-circle-o" /> Generate Barcode{" "}
                      </Link>
                    </li>

                    <li className="active">
                      <Link to="/addMerchant">
                        <i className="fa fa-circle-o" /> Add Merchant{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview" aria-current="true">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Product Dimensions</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active" aria-current="true">
                      <Link to="/productdimension">
                        <i className="fa fa-circle-o" /> Product Dimension
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* <ul className='sidebar-menu' data-widget='tree'>
                <li className='treeview' aria-current='true'>
                  <a href='#'>
                    <i className='fa fa-chevron-circle-down' />{' '}
                    <span>File Upload</span>
                    <span className='pull-right-container'>
                      <i className='fa fa-angle-left pull-right' />
                    </span>
                  </a>
                  <ul className='treeview-menu'>
                    <li className='active' aria-current='true'>
                      <Link to='/fileupload'>
                        <i className='fa fa-circle-o' /> File Upload
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul> */}
              {/* <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview" aria-current="true">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Invoice</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active" aria-current="true">
                      <Link to="/invoicedetail">
                        <i className="fa fa-circle-o" /> Invoice Detail
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul> */}

              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview" aria-current="true">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>Classified Ad</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active" aria-current="true">
                      <Link to="/classified_ad">
                        <i className="fa fa-circle-o" /> Classified Add
                      </Link>
                    </li>
                    <li className="active" aria-current="true">
                      <Link to="/listedBarcode">
                        <i className="fa fa-circle-o" />Listed Barcode
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview" aria-current="true">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" />{" "}
                    <span>LZW Config</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active" aria-current="true">
                      <Link to="/lzwconfig">
                        <i className="fa fa-circle-o" /> LZW Config
                      </Link>
                    </li>
                    <li className="active" aria-current="true">
                      <Link to="/new-requests">
                        <i className="fa fa-circle-o" /> New Requests
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview" aria-current="true">
                  <a href="#">
                    <i className="fa fa-chevron-circle-down" /> <span>LZW</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="active" aria-current="true">
                      <Link to="/callLog">
                        <i className="fa fa-circle-o" /> callLog
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {localStorage.getItem("userId") == 2 ? (
                <React.Fragment>
                  <ul className="sidebar-menu" data-widget="tree">
                    <li className="treeview" aria-current="true">
                      <a href="#">
                        <i className="fa fa-chevron-circle-down" />{" "}
                        <span>Generate Bills</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right" />
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li className="active" aria-current="true">
                          <Link to="/genratebill">
                            <i className="fa fa-circle-o" /> Generate Bill
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </React.Fragment>
              ) : null}
            </section>
            :""}
            {/** ********************************
                 End Module Moade By Haziq
            **********************************/}
          </aside>
          <Switch>
            <Route exact path="/" component={NewDashboard} />
            {/* <Route path='/login' component={Login} /> */}
            <Route path="/post" component={UnpostedRecord} />
            <Route path="/varify" component={VerifyItem} />
            <Route path="/serch" component={SerchBarcode} />

            {/*********************************
             * Modules By Tahir Setting Routes
             **********************************/}
            <Route path="/searchItem" component={searchItem} />
            <Route path="/manageInventory" component={manageInventory} />
            <Route path="/generateBars" component={generateBars} />
            <Route path="/shipQueue" component={ShipQueue} />
            <Route path="/shipment" component={Shipment} />
            <Route path="/shipmentTable" component={ShipmentTable} />
            <Route path="/receiveShipment" component={ReceiveShipment} />
            <Route
              path="/receiveShipmentList"
              component={ReceiveShipmentList}
            />
            <Route path="/returnInventory" component={ReturnInventory} />
            <Route path="/receiveReturn" component={ReceiveReturn} />
            <Route path="/returnList" component={ReturnList} />
            <Route path="/junkList" component={JunkList} />
            <Route path="/createReturn" component={CreateReturn} />
            <Route path="/allRequests" component={AllRequests} />
            <Route path="/underProcess" component={UnderProcess} />
            <Route path="/processComplete" component={ProcessComplete} />
            <Route path="/listedItemsAudit" component={ListedItemsAudit} />
            <Route path="/dekitItemsAudit" component={DekitItemsAudit} />
            <Route path="/verifyCount" component={VerifyCount} />
            <Route path="/locationHistory" component={LocationHistory} />
            <Route
              path="/multipleTransaction"
              component={MultipleTransaction}
            />
            <Route path="/barcodeShortage" component={BarcodeShortage} />
            <Route path="/discardedBarcodes" component={DiscardedBarcodes} />
            <Route path="/auditStats" component={AuditStats} />
            <Route path="/searchOrder" component={SearchOrder} />
            <Route path="/accountSelect" component={AccountSelect} />
            <Route path="/pictureBinStats" component={PictureBinStats} />
            <Route path="/itemHistory" component={ItemHistory} />
            <Route path="/transferItems" component={TransferItems} />
            <Route path="/new-requests" component={NewRequests} />
            {/***************************************
             * #END# Modules By Tahir Setting Routes
             ****************************************/}
            {/********************************
             *  Modules By Haziq Routes
             *********************************/}
            <Route exact path="/createlot" component={Create_Lot} />
            <Route exact path="/assignBarcode" component={AssignBarcode} />
            <Route exact path="/ebayintegration" component={eBayIntegration} />
            <Route exact path="/genratebarcode" component={GenrateBarcode} />
            <Route exact path="/genratebill" component={GenrateBill} />
            <Route exact path="/invoicedetail" component={InvoiceDetail} />
            <Route exact path="/merchInvoices" component={MerInvoice} />
            <Route exact path="/invoicedetail" component={InvoiceDetail} />
            <Route exact path="/posform" component={PosForm} />
            <Route exact path="/repaireform" component={RepaireForm} />
            <Route exact path="/registerpos" component={RegisterPosStore} />
            <Route exact path="/posReceiptView" component={POS_Receipt_View} />
            <Route exact path="/posFormEdit" component={Pos_Form_Edit} />
            <Route exact path="/invoiceorders" component={InvoiceOrder} />
            <Route
              exact
              path="/productdimension"
              component={ProductDimension}
            />
            <Route
              exact
              path="/createappointment"
              component={CreateAppointment}
            />
            <Route
              exact
              path="/genratetoken"
              target="http://localhost/laptopzone/listing/listing/GetlocalID"
            />

            <Route exact path="/classified_ad" component={ClassifiedAd_List} />
            <Route exact path="/lzwconfig" component={Lzw_Config} />
            {/* <Route exact path='/fileupload' component={File_Upload} /> */}
            {/***************************************
             * #END# Modules By Haziq Setting Routes
             ****************************************/}

            {/********************************
             *  Modules By tayyab Routes
             *********************************/}
            <Route path="/merchantDashboard" component={MerchDash} />
            <Route path="/newDashboard" component={NewDashboard} />
            <Route path="/merchantListing" component={MerActivListing} />
            <Route path="/merchantNotListed" component={MerActivNotListing} />
            <Route path="/bilingSetup" component={BilingSetup} />
            <Route path="/bilingRateSetup" component={bilingRateSetup} />
            <Route path="/packingEntry" component={packingEntry} />
            <Route path="/packingOrder" component={packingOrder} />
            <Route path="/templateform" component={TemplateForm} />
            <Route path="/totalBarcodes" component={totalBarcodes} />
            <Route path="/picturesDone" component={picturesDone} />
            <Route path="/barcodeProcess" component={barcodeProcess} />
            <Route path="/activeNotListed" component={activeNotListed} />
            <Route path="/solditem" component={solditem} />
            <Route path="/awaitingShipment" component={awaitingShipment} />
            <Route path="/shipped" component={shipped} />
            <Route path="/itemReturned" component={itemReturned} />
            <Route path="/users" component={users} />
            <Route path="/addMerchant" component={addMerchant} />
            <Route path="/merchlots" component={MerchLots} />
            <Route path="/merchLotDetailView" component={merchLotDetail} />
            <Route path="/myprofile" component={myprofile} />
            <Route path="/uSPKNonListedItems" component={uSPKNonListedItems} />
            <Route path="/dEKittingUS" component={dEKittingUS} />
            <Route path="/downloadOrders" component={downloadOrders} />
            <Route path="/postitemReturns" component={postitemReturns} />
            <Route path="/barcodeImage" component={barcodeImage} />
            <Route path="/listerView" component={listerView} />
            <Route path="/addWherehouse" component={addWherehouse} />
            <Route path="/rack" component={rack} />
            <Route path="/addBin" component={addBin} />
            <Route path="/itemPacking" component={itemPacking} />
            <Route path="/add_Info" component={add_Info} />
            <Route path="/callLog" component={callLog} />
            <Route path="/listedBarcode" component={listedBarcode} />

            {/********************************
             *  Modules By tayyab Routes
             *********************************/}
            {/********************************
             *  Modules By Adil Ameeq Routes
             *********************************/}
            <Route path="/createCancellation" component={CreateCancellation} />
            {/********************************
             *  Modules By Adil Ameeq Routes
             *********************************/}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Aside;
