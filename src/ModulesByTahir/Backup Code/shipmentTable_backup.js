import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const products = [];
const products2 = [];
var prod = "";
var obj = "";

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 1; i <= quantity; i++) {
    const id = i;
    if (i == 1) {
      prod += `[`;
    }
    if (i >= 1 && i < quantity) {
      prod +=
        ` {"id":  ` +
        i +
        ` , "name" : "Item name  ` +
        id +
        ` ", "price":  ` +
        (2100 + id) +
        ` ,
      "expand": [{ "fieldA" : "test1", "fieldB" :  ` +
        (id + 1) * 99 +
        ` , "fieldC": ` +
        (id + 1) * Math.random() * 100 +
        ` , "fieldD" : "123eedd ` +
        id +
        ` " },
      { "fieldA": "test2", "fieldB" : ` +
        id * 99 +
        `, "fieldC": ` +
        id * Math.random() * 100 +
        ` ,"fieldD": "123eedd ` +
        id +
        ` " } ] },`;
    }
    if (i == quantity) {
      prod +=
        ` {"id":  ` +
        id +
        ` , "name" : "Item name  ` +
        id +
        ` ", "price":  ` +
        (2100 + id) +
        ` ,
      "expand": [{ "fieldA" : "test ` +
        id +
        `", "fieldB" :  ` +
        (i + 1) * 99 +
        ` , "fieldC": ` +
        (i + 1) * Math.random() * 100 +
        `, "fieldD" : "123eedd ` +
        i +
        ` " },
      { "fieldA": "test` +
        id +
        `", "fieldB" : ` +
        i * 99 +
        `, "fieldC": ` +
        i * Math.random() * 100 +
        ` ,"fieldD": "123eedd ` +
        i +
        ` " } ] }]`;
    }
    // if (i < 3) {
    //   products.push();
    // } else {
    //   products.push({
    //     id: id,
    //     name: "Item name " + id,
    //     price: 2100 + i
    //   });
    // }

    products2.push({
      id: id,
      name: "Item name " + id,
      price: 2100 + i,
      expand: [
        {
          fieldA: "test1",
          fieldB: (i + 1) * 99,
          fieldC: (i + 1) * Math.random() * 100,
          fieldD: "123eedd" + i
        },
        {
          fieldA: "test2",
          fieldB: i * 99,
          fieldC: i * Math.random() * 100,
          fieldD: "123eedd" + i
        }
      ]
    });
  }

  obj = JSON.parse(prod);
  console.log(obj);
  console.log(products2);
  products.push(obj);
}
addProducts(5);

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn dataField="fieldA" isKey={true}>
            Field A
          </TableHeaderColumn>
          <TableHeaderColumn dataField="fieldB">Field B</TableHeaderColumn>
          <TableHeaderColumn dataField="fieldC">Field C</TableHeaderColumn>
          <TableHeaderColumn dataField="fieldD">Field D</TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}

class ShipmentTable extends Component {
  constructor(props) {
    super(props);
  }
  isExpandableRow = row => {
    // if (row.id < 3)
    return true;
    // else return false;
  };

  expandComponent = row => {
    return <BSTable data={row.expand} />;
  };
  render() {
    const options = {
      expandRowBgColor: "rgb(242, 255, 163)"
    };
    return (
      <React.Fragment>
        <section className="content-header">
          <h1>
            Shipment Form <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/welcom">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Transaction Form</li>
            <li className="active">
              <Link to="/shipment">Shipment Form</Link>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Shipment Details</h3>
                </div>
                <div className="box-body">
                  <div className="col-sm-12">
                    <BootstrapTable
                      data={obj}
                      options={options}
                      expandableRow={this.isExpandableRow}
                      expandComponent={this.expandComponent}
                      search
                    >
                      <TableHeaderColumn dataField="id" isKey={true}>
                        Product ID
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="name">
                        Product Name
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="price">
                        Product Price
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ShipmentTable;
