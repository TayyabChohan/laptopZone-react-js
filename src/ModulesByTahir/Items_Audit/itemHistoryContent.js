import React, { Component } from "react";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../CSS_Files/table.css";

var that = "";

export class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.state.images
    };
  }

  render() {
    const { cell, row, imagesUrl } = this.state;

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    };
    return (
      <React.Fragment>
        <div
          style={{
            overflow: " hidden",
            position: "relative"
          }}
        >
          <RViewer
            index={this.props.cell}
            options={options}
            imageUrls={imagesUrl[this.props.cell]}
          >
            <RViewerTrigger>
              <div className="col-md-12">
                <img
                  className="getCss"
                  src={imagesUrl[this.props.cell][0]}
                  width="150px"
                  height="150px"
                />
              </div>
            </RViewerTrigger>
          </RViewer>
        </div>
      </React.Fragment>
    );
  }
}

function imageView(cell, row) {
  return <ImageView cell={cell} row={row} />;
}
function ebayLink(cell, row) {
  if (cell) {
    return (
      <a href={"https://www.ebay.com/itm/" + cell} target="_blank">
        EBAY ID: {cell}
        <br />
        <span className="btn btn-success btn-xs">LISTED</span>
      </a>
    );
  } else {
    return <span className="btn btn-danger btn-xs">NOT LISTED</span>;
  }
}
function mpn_upc(cell, row) {
  return (
    <React.Fragment>
      <p style={{ color: "#226EC0" }}>{cell}</p>
      <br />
      {row.UPC ? row.UPC : "No UPC"}
    </React.Fragment>
  );
}

class ItemHistoryContent extends Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      itemContent: this.props.itemContent,
      images: this.props.images,
      contentType: this.props.contentType
    };
  }

  render() {
    const { itemContent, images, contentType } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 1,
      sizePerPage: 25,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: "Prev",
      nextPage: "Next",
      firstPage: "First",
      lastPage: "Last",
      prePageTitle: "Go to previous",
      nextPageTitle: "Go to next",
      firstPageTitle: "Go to first",
      lastPageTitle: "Go to Last",
      paginationPosition: "top",
      sizePerPageList: [
        {
          text: "25",
          value: 25
        },
        {
          text: "50",
          value: 50
        },
        {
          text: "100",
          value: 100
        },
        {
          text: "All",
          value: itemContent.length
        }
      ]
    };
    console.log(itemContent);
    return (
      <React.Fragment>
        <BootstrapTable
          data={itemContent}
          pagination
          hover
          search
          tableHeaderClass="my-header-class"
          columnWidth="100%"
          options={options}
        >
          <TableHeaderColumn
            dataField="BARCODE_NO"
            width="8.4%"
            isKey={true}
            dataFormat={imageView}
          >
            PICTURE
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="EBAY_ITEM_ID"
            width="8.4%"
            dataFormat={ebayLink}
          >
            EBAY ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="BARCODE_NO" width="8.4%">
            BARCODE
          </TableHeaderColumn>
          <TableHeaderColumn dataField="LISTER_NAME" width="8.4%">
            LISTED BY
          </TableHeaderColumn>
          <TableHeaderColumn dataField="STATUS" width="8.4%">
            STATUS
          </TableHeaderColumn>
          <TableHeaderColumn dataField="LIST_DATE" width="8.4%">
            LIST DATE
          </TableHeaderColumn>
          <TableHeaderColumn dataField="COND_NAME" width="8.4%">
            CONDITION
          </TableHeaderColumn>
          <TableHeaderColumn dataField="LIST_PRICE" width="8.4%">
            LIST PRICE
          </TableHeaderColumn>
          <TableHeaderColumn dataField="BIN_NAME" width="8.4%">
            LOCATION
          </TableHeaderColumn>
          <TableHeaderColumn dataField="DESCR" width="8.4%">
            TITLE
          </TableHeaderColumn>
          <TableHeaderColumn dataField="MPN" width="8.4%" dataFormat={mpn_upc}>
            MPN
          </TableHeaderColumn>
          <TableHeaderColumn dataField="BRAND" width="8.4%">
            BRAND
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}
export default ItemHistoryContent;
