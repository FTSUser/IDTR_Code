import React, { useEffect, useState, useRef } from "react";
import { NavLink, Router } from "react-router-dom/cjs/react-router-dom.min";
import { ApiGet, ApiPost, ApiPut } from "../../Helpers/Api/ApiData";
import "./AccountInformation.scss";
import Logo from "../../../src/Assets/Images/honda.png";
import Pdf from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import moment from "moment";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";
import { useTranslation } from "react-i18next";
var a = [
  "",
  "One ",
  "Two ",
  "Three ",
  "Four ",
  "Five ",
  "Six ",
  "Seven ",
  "Eight ",
  "Nine ",
  "Ten ",
  "Eleven ",
  "Twelve ",
  "Thirteen ",
  "Fourteen ",
  "Fifteen ",
  "Sixteen ",
  "Seventeen ",
  "Eighteen ",
  "Nineteen ",
];
var b = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function inWords(num) {
  if (!num) return;
  if ((num?.toString()).length > 9) return;
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? " And " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        " Only "
      : "";
  return str;
}

class ComponentToPrints extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState(this.props);
  }

  render() {
    return (
      <>
        <table
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style={{ padding: "30px" }}
        >
          <tr>
            <td style={{ padding: "0px 0 0px 0" }}>
              <table align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "100px" }}
                        src="https://i.ibb.co/87cN78k/aa.png"
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "50px" }}
                        src="https://i.ibb.co/XLg1jLn/rre.png"
                      />
                    </div>
                  </div>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "20px 0 20px 0" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Institute of Driving Training & Research
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                          maxWidth: "330px",
                        }}
                      >
                        Uchani Village, Baldhi part, Near New Bus Stand Teshil
                        and District Karnal, Haryana-122001
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Phone No:
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="first-grid">
                      <div className="first-grid-items">
                        <span
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          GST No
                        </span>
                      </div>
                      <div className="first-grid-items">
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "16px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SAC Code:999293
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        margin: "20px 0 15px 0",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "18px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        PAYMENT RECEIPT
                      </p>
                    </div>
                    <div className="sec-grid">
                      <div className="sec-grid-items">
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Receipt No. <span>{`${this.props?.data?._id} `}</span>
                        </p>

                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Trainee Name:{" "}
                          <span>{`${this.props?.data?.fname} `}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Address:{" "}
                          <span>{`${this.props?.data?.address} `}</span>
                        </p>
                      </div>
                      <div className="sec-grid-items">
                        <div className="three-grid">
                          <div>
                            <p>
                              {" "}
                              Receipt Date:{" "}
                              <span>{`${moment(
                                this.props?.data?.receiptDate
                              ).format("DD-MM-YYYY ")} `}</span>
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              S/o
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              Mobile No:{" "}
                              <span>{`${this.props?.data?.phone} `}</span>
                            </p>
                          </div>
                          <div
                            style={{
                              height: "120px",
                              width: "100%",
                              backgroundColor: "#000",
                            }}
                          >
                            <img
                              style={{
                                height: "120px",
                                width: "100%",
                                backgroundColor: "#000",
                              }}
                              src={this?.props?.data?.passportPhoto}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table className="new-table-design new-table-design-style" style={{width:'100%'}}>
                      <thead style={{ border: "1px solid red" }}>
                        <tr>
                          <th align="center" width="8%">
                            Regn No
                          </th>
                          <th align="center" width="30%">
                            Regn Date
                          </th>
                          <th align="center" width="20.66">
                            Course Description/ Name
                          </th>
                          <th align="center" width="20.66">
                            Theory Date <br /> (Time- 8:45 AM)
                          </th>
                        </tr>
                      </thead>
                      <tr>
                        <td align="center">1</td>
                        <td>
                          {moment(this?.props?.data?.createdAt).format(
                            "DD-MM-YYYY "
                          )}
                        </td>
                        <td align="center">
                          <span>{this.props?.data?.cnid?.courseName}</span>
                        </td>
                        <td align="center">
                          {this?.props?.data?.cnid?.duration}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="thee-col-alignment">
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount (RS):
                          <span>{this.props?.data?.cnid?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Taxable Amount:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Rounded Off:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount in Words:{" "}
                          <span>
                            {inWords(
                              Math.round(
                                this.props?.data?.paymentHistory?.price
                              )
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Discount (Rs):<span>-</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          CGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.cgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Payable Amount :
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.sgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Pay Mode:
                          <span>{this.props?.data?.paymentType}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "40px 0 0px 0" }}>
                      <p>Fot IDTR Karnal:</p>
                      <span>Note:</span>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        1. 100% refund if cancellation is made 3 days prior to
                        course commencement
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        2. Offline cancellation is not allowed for online
                        bookings
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        3. Refunds will be processed to customer within 10-15
                        days
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        4. No Change/modification is allowed for allocated
                        training slot.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                          color: "#000",
                          textAlign: "center",
                        }}
                      >
                        ***** This is a computer-generated Invoice and signature
                        not required *****
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        {/* <div className="invoice-box">
          <table>
            <tr className="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>

                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>A joint venture of Transport Department, <br /> Government of Haryana & Honda IDTR</p>
                      <p>GST Number:121222</p>
                    </td>
                    <td className="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created: {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                    <td>
                      <h3>TAX INVOICE</h3>
                      Invoice #: {this.props?.data?._id}<br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className=''>
              <td >

                <td>Invoice To: {`${this.props?.data?.fname} `} </td>
                <td>{this.props?.data?.lname}</td>

              </td>
            </tr>

            <tr className="heading">
              <td>Payment Method</td>


            </tr>

            <tr className="details">
              <td>{this.props?.data?.type}</td>
            </tr>

            <tr className="heading">
              <td>Item</td>
              <td>GST</td>
              <td>COST</td>

            </tr>

            <tr className="item">
              <td>{this.props?.data?.cnid?.courseName}</td>
              <td>12FC34343433</td>
              <td>&#x20b9;{this.props?.data?.cnid?.price}</td>
            </tr>


            <tr></tr>
            <tr className="total top">
              <td></td>

              <td>Total: &#x20b9;{this.props?.data?.cnid?.price}</td>
            </tr>
            <tr className="total">
              <td></td>

              <td>Grand Total: &#x20b9;{this.props?.data?.cnid?.price}</td>
            </tr>
          </table>
        </div> */}
      </>
    );
  }
}
class ComponentToPrints1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState(this.props);
  }

  render() {
    return (
      <>
        <table
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style={{ padding: "30px" }}
        >
          <tr>
            <td style={{ padding: "0px 0 0px 0" }}>
              <table align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "100px" }}
                        src="https://i.ibb.co/87cN78k/aa.png"
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "50px" }}
                        src="https://i.ibb.co/XLg1jLn/rre.png"
                      />
                    </div>
                  </div>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "20px 0 20px 0" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Institute of Driving Training & Research
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                          maxWidth: "330px",
                        }}
                      >
                        Uchani Village, Baldhi part, Near New Bus Stand Teshil
                        and District Karnal, Haryana-122001
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Phone No:
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="first-grid">
                      <div className="first-grid-items">
                        <span
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          GST No
                        </span>
                      </div>
                      <div className="first-grid-items">
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "16px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SAC Code:999293
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        margin: "20px 0 15px 0",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "18px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        CANCELLATION RECEIPT
                      </p>
                    </div>
                    <div className="sec-grid">
                      <div className="sec-grid-items">
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Receipt No. <span>{`${this.props?.data?._id} `}</span>
                        </p>

                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Trainee Name:{" "}
                          <span>{`${this.props?.data?.fname} `}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Address:{" "}
                          <span>{`${this.props?.data?.address} `}</span>
                        </p>
                      </div>
                      <div className="sec-grid-items">
                        <div className="three-grid">
                          <div>
                            <p>
                              Cancellation Receipt Date:{" "}
                              <span>{`${moment(
                                this.props?.data?.receiptDate
                              ).format("DD-MM-YYYY ")} `}</span>
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              S/o
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              Mobile No:{" "}
                              <span>{`${this.props?.data?.phone} `}</span>
                            </p>
                          </div>
                          <div
                            style={{
                              height: "120px",
                              width: "100%",
                              backgroundColor: "#000",
                            }}
                          >
                            <img
                              style={{
                                height: "120px",
                                width: "100%",
                                backgroundColor: "#000",
                              }}
                              src={this?.props?.data?.passportPhoto}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table className="new-table-design new-table-design-style" style={{width:"100%"}}>
                      <thead style={{ border: "1px solid red" }}>
                        <tr>
                          <th align="center" width="8%">
                            Regn No
                          </th>
                          <th align="center" width="30%">
                            Regn Date
                          </th>
                          <th align="center" width="20.66">
                            Course Description/ Name
                          </th>
                          <th align="center" width="20.66">
                            Theory Date <br /> (Time- 8:45 AM)
                          </th>
                        </tr>
                      </thead>
                      <tr>
                        <td align="center">1</td>
                        <td>
                          {moment(this?.props?.data?.createdAt).format(
                            "DD-MM-YYYY "
                          )}
                        </td>
                        <td align="center">
                          <span>{this.props?.data?.cnid?.courseName}</span>
                        </td>
                        <td align="center">
                          {this?.props?.data?.cnid?.duration}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="thee-col-alignment">
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount (RS):
                          <span>{this.props?.data?.cnid?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Taxable Amount:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Rounded Off:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount in Words:{" "}
                          <span>
                            {inWords(
                              Math.round(
                                this.props?.data?.paymentHistory?.price
                              )
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Discount (Rs):<span>-</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          CGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.cgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Refundable amount :
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.sgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Refund Mode:
                          <span>{this.props?.data?.paymentType}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "40px 0 0px 0" }}>
                      <p>Fot IDTR Karnal:</p>
                      <span>Note:</span>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        1. 100% refund if cancellation is made 3 days prior to
                        course commencement
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        2. Offline cancellation is not allowed for online
                        bookings
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        3. Refunds will be processed to customer within 10-15
                        days
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        4. No Change/modification is allowed for allocated
                        training slot.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                          color: "#000",
                          textAlign: "center",
                        }}
                      >
                        ***** This is a computer-generated Invoice and signature
                        not required *****
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        {/* <div className="invoice-box">
          <table>
            <tr className="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>

                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>A joint venture of Transport Department, <br /> Government of Haryana & Honda IDTR</p>
                      <p>GST Number:121222</p>
                    </td>
                    <td className="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created: {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                    <td>
                      <h3>TAX INVOICE</h3>
                      Invoice #: {this.props?.data?._id}<br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className=''>
              <td >

                <td>Invoice To: {`${this.props?.data?.fname} `} </td>
                <td>{this.props?.data?.lname}</td>

              </td>
            </tr>

            <tr className="heading">
              <td>Payment Method</td>


            </tr>

            <tr className="details">
              <td>{this.props?.data?.type}</td>
            </tr>

            <tr className="heading">
              <td>Item</td>
              <td>GST</td>
              <td>COST</td>

            </tr>

            <tr className="item">
              <td>{this.props?.data?.cnid?.courseName}</td>
              <td>12FC34343433</td>
              <td>&#x20b9;{this.props?.data?.cnid?.price}</td>
            </tr>


            <tr></tr>
            <tr className="total top">
              <td></td>

              <td>Total: &#x20b9;{this.props?.data?.cnid?.price}</td>
            </tr>
            <tr className="total">
              <td></td>

              <td>Grand Total: &#x20b9;{this.props?.data?.cnid?.price}</td>
            </tr>
          </table>
        </div> */}
      </>
    );
  }
}

export default function AccountInformation() {
  // const ref = useRef();
  const ref = React.createRef();
  const itemsRef = useRef([]);
  const [getAllInformation, setGetAllInformation] = useState();
  const [getAllPast, setGetAllPast] = useState();
  const [allData, setData] = useState();
  const [getAllUpcoming, setGetAllUpcoming] = useState();
  const [getAllCancel, setGetAllCancel] = useState();
  const [pdfData, setPdfData] = useState();
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [modalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const getAllPropery = () => {
    ApiGet(
      `register/getFilterRecords?uid=${userInfo?.payload?.user?._id}`
    ).then((res) => {
      if (res.data.payload) {
        setGetAllInformation(res.data.payload.Property);
        setGetAllPast(res.data.payload?.past);
        setGetAllUpcoming(res.data.payload?.upcomming);
        setGetAllCancel(res.data.payload?.Cancle);
      }
    });
  };

  useEffect(() => {
    getAllPropery();
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, []);

  const ClickPdf = useReactToPrint({
    content: () => ref.current,
  });

  const [tab, setTab] = useState("past");

  const handleOnClick = (e, key) => {
    e.preventDefault();
    if (key === "upcoming") {
      setTab(key);
    }
    if (key === "cancel") {
      setTab(key);
    } else {
      setTab(key);
    }
  };

  const cancelBooking = (data) => {
    setModalOpen(false);
    if (data?._id) {
      ApiPut(`register/cancleBooking?uid=${data?._id}`)
        .then((res) => {
          toast.success("Your booking cancel successfully");
          getAllPropery();
        })
        .catch((err) => {
          toast.error(err, { theme: "colored" });
        });
    }
  };

  const getData = (data) => {
    history.push({
      pathname: "/register",
      state: data,
    });
  };

  return (
    <div>
      <section className="container">
        <div className="register-page-alignment">
          <div className="breadcrumbs-alignment">
            <ul className="breadcrumb">
              <li>
                <a href="#">{t("Home")}</a>
              </li>
              <li>{t("My Account")}</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="account-section-alignment">
        <div className="container">
          <h1 className="margin">
            {t("Your Registered Mobile No is")} :{" "}
            <span>{userInfo?.payload?.user?.phone}</span>
          </h1>
          <h3>
            {t("User ID")} : <span>{userInfo?.payload?.user?._id}</span>
          </h3>
          {/* <p> <div>{userInfo?.payload?.user?._id}</div></p> */}
          <NavLink to="/register">
            <button>{t("Click here for new course registration")}</button>
          </NavLink>

          <div className="registration-box-details">
            <h1>{t("Your bookings will display here")}</h1>
            <div className="tabs">
              <div className="register-page-alignment">
                <div className="container">
                  <div className="breadcrumbs-alignment"></div>

                  <div className="tab-design">
                    <ul>
                      <li
                        className={tab === "past" && "tab-active"}
                        onClick={(e) => handleOnClick(e, "past")}
                      >
                        {t("Past Booking")}
                      </li>
                      <li
                        className={tab === "upcoming" && "tab-active"}
                        onClick={(e) => handleOnClick(e, "upcoming")}
                      >
                        {t("Upcoming Booking")}
                      </li>
                      <li
                        className={tab === "cancel" && "tab-active"}
                        onClick={(e) => handleOnClick(e, "cancel")}
                      >
                        {t("Cancelled Booking")}
                      </li>
                    </ul>
                  </div>
                  {tab === "past" && (
                    <div className="tab-details-alignment">
                      <div className="tab-details-title">
                        <h2>{t("Past Booking")}</h2>
                      </div>
                      <div className="booking-grid-cus">
                        {getAllPast?.map((data, i) => (
                          <div className="card" key={i}>
                            {/* <div className="">{i + 1}</div> */}
                            <div className="d-flex align-item-center justify-content-center">
                              <p className="gray">Booking ID : </p>
                              <p className="black"> &nbsp;{data?._id}</p>
                            </div>
                            <div className="d-flex align-item-center justify-content-center">
                              <p
                                className="gray"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                Booking Date :{" "}
                              </p>
                              <p
                                className="black"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                &nbsp;
                                {moment(data?.createdAt).format("DD-MM-YYYY ")}
                              </p>
                            </div>
                            <div className="booking-text-grid">
                              <div className="booking-text-grid-items">
                                <p>First Name:</p>
                                <span>{data?.fname ? data?.fname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Last Name:</p>
                                <span>{data?.lname ? data?.lname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Middle Name :</p>
                                <span>{data?.mname ? data?.mname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Address:</p>
                                <span>
                                  {data?.address ? data?.address : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Email:</p>
                                <span>{data?.email ? data?.email : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Gender:</p>
                                <span>{data?.gender ? data?.gender : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Phone:</p>
                                <span>{data?.phone ? data?.phone : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Pin Code:</p>
                                <span>
                                  {data?.pincode ? data?.pincode : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Qualification:</p>
                                <span>
                                  {data?.qualification
                                    ? data?.qualification
                                    : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>State:</p>
                                <span>{data?.state ? data?.state : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>City:</p>
                                <span>{data?.city ? data?.city : "-"}</span>
                              </div>

                              <div className="booking-text-grid-items">
                                <p>Driving License</p>
                                {data?.drivingLicense ? (
                                  <a
                                    className="hocers"
                                    href={data?.drivingLicense}
                                    target="_blank"
                                  >
                                    Driving License
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>

                              <div className="booking-text-grid-items">
                                <p>Passport Photo</p>
                                {data?.passportPhoto ? (
                                  <a
                                    className="hocers"
                                    href={data?.passportPhoto}
                                    target="_blank"
                                  >
                                    Passport Photo
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Id Proof</p>
                                {data?.IDproof ? (
                                  <a
                                    className="hocers"
                                    href={data?.IDproof}
                                    target="_blank"
                                  >
                                    Id Proof
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Medical Certificate</p>

                                {data?.medicalCertificate ? (
                                  <a
                                    className="hocers"
                                    href={data?.medicalCertificate}
                                    target="_blank"
                                  >
                                    Medical Certificate
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Payment Type</p>
                                <span>{data?.type ? data?.type : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Course Name</p>
                                <span>
                                  {data?.cnid?.courseName
                                    ? data?.cnid?.courseName
                                    : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Course Price</p>
                                <span>
                                  {data?.cnid?.price ? data?.cnid?.price : "-"}
                                </span>
                              </div>
                            </div>

                            <div className="d-flex center">
                              <ReactToPrint
                                trigger={() => (
                                  <button className="center-button pdf-button">
                                    Generate PDF
                                  </button>
                                )}
                                content={() => itemsRef.current[i]}
                              />
                              <div style={{ display: "none" }}>
                                <div
                                  ref={(el) => (itemsRef.current[i] = el)}
                                  id={data?._id}
                                >
                                  <ComponentToPrints data={data} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {tab === "upcoming" && (
                    <div className="tab-details-alignment">
                      <div className="tab-details-title">
                        <h2>{t("Upcoming Booking")}</h2>
                      </div>
                      <div className="booking-grid-cus">
                        {getAllUpcoming?.map((data, i) =>{ 
                          let subTractDate = moment(data?.tdid?.date).subtract(3, "days").format("YYYY-MM-DD");
                          let isCancleButton = moment(subTractDate).isAfter(moment(new Date()).format("YYYY-MM-DD"));
                          return (
                          <div className="card" key={i}>
                            <div className="d-flex align-item-center justify-content-center">
                              <p className="gray">Booking ID : </p>
                              <p className="black"> &nbsp;{data?._id}</p>
                            </div>
                            <div className="d-flex align-item-center justify-content-center">
                              <p
                                className="gray"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                Booking Date :{" "}
                              </p>
                              <p
                                className="black"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                &nbsp;
                                {moment(data?.createdAt).format("DD-MM-YYYY ")}
                              </p>
                            </div>
                            {/* <div className="">{i + 1}</div> */}
                            <div className="booking-text-grid">
                              <div className="booking-text-grid-items">
                                <p>First Name:</p>
                                <span>{data?.fname ? data?.fname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Last Name:</p>
                                <span>{data?.lname ? data?.lname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Middle Name :</p>
                                <span>{data?.mname ? data?.mname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Address:</p>
                                <span>
                                  {data?.address ? data?.address : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Email:</p>
                                <span>{data?.email ? data?.email : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Gender:</p>
                                <span>{data?.gender ? data?.gender : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Phone:</p>
                                <span>{data?.phone ? data?.phone : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Pin Code:</p>
                                <span>
                                  {data?.pincode ? data?.pincode : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Qualification:</p>
                                <span>
                                  {data?.qualification
                                    ? data?.qualification
                                    : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>State:</p>
                                <span>{data?.state ? data?.state : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>City:</p>
                                <span>{data?.city ? data?.city : "-"}</span>
                              </div>

                              <div className="booking-text-grid-items">
                                <p>Driving License</p>
                                {data?.drivingLicense ? (
                                  <a
                                    className="hocers"
                                    href={data?.drivingLicense}
                                    target="_blank"
                                  >
                                    Driving License
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>

                              <div className="booking-text-grid-items">
                                <p>Passport Photo</p>
                                {data?.passportPhoto ? (
                                  <a
                                    className="hocers"
                                    href={data?.passportPhoto}
                                    target="_blank"
                                  >
                                    Passport Photo
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Id Proof</p>
                                {data?.IDproof ? (
                                  <a
                                    className="hocers"
                                    href={data?.IDproof}
                                    target="_blank"
                                  >
                                    Id Proof
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Medical Certificate</p>

                                {data?.medicalCertificate ? (
                                  <a
                                    className="hocers"
                                    href={data?.medicalCertificate}
                                    target="_blank"
                                  >
                                    Medical Certificate
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Payment Type</p>
                                <span>{data?.type ? data?.type : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Course Name</p>
                                <span>
                                  {data?.cnid?.courseName
                                    ? data?.cnid?.courseName
                                    : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Course Price</p>
                                <span>
                                  {data?.cnid?.price ? data?.cnid?.price : "-"}
                                </span>
                              </div>
                            </div>

                            <div className="d-flex center">
                              <ReactToPrint
                                trigger={() => <div className='cancel-booking'>Generate PDF</div>}
                                content={() => itemsRef.current[i]}
                              />
                              <div style={{ display: 'none' }}>
                                <div ref={el => (itemsRef.current[i] = el)} id={data?._id} >
                                  <ComponentToPrints
                                    data={data}
                                  />
                                </div>
                              </div>
                              {isCancleButton && <div
                                className="cancel-booking"
                                onClick={() => {
                                  setModalOpen(!modalOpen);
                                  setData(data);
                                }}
                              >  Cancel Booking
                              </div>}
                            </div>
                          </div>
                        )})}
                      </div>
                    </div>
                  )}
                  {tab === "cancel" && (
                    <div className="tab-details-alignment">
                      <div className="tab-details-title">
                        <h2>{t("Cancelled Booking")}</h2>
                      </div>
                      <div className="booking-grid-cus">
                        {getAllCancel?.map((data, i) => (
                          <div className="card" key={i}>
                            <div className="d-flex align-item-center justify-content-center">
                              <p className="gray">Booking ID : </p>
                              <p className="black"> &nbsp;{data?._id}</p>
                            </div>
                            <div className="d-flex align-item-center justify-content-center">
                              <p
                                className="gray"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                Booking Date :{" "}
                              </p>
                              <p
                                className="black"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                &nbsp;
                                {moment(data?.createdAt).format("DD-MM-YYYY ")}
                              </p>
                            </div>
                            <div className="d-flex align-item-center justify-content-center">
                              <p
                                className="gray"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                Cancelled Date :{" "}
                              </p>
                              <p
                                className="black"
                                style={{ margin: "0 0 20px 0" }}
                              >
                                {" "}
                                &nbsp;
                                {moment(data?.updatedAt).format("DD-MM-YYYY ")}
                              </p>
                            </div>
                            {/* <div className="">{i + 1}</div> */}
                            <div className="booking-text-grid">
                              <div className="booking-text-grid-items">
                                <p>First Name:</p>
                                <span>{data?.fname ? data?.fname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Last Name:</p>
                                <span>{data?.lname ? data?.lname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Middle Name :</p>
                                <span>{data?.mname ? data?.mname : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Address:</p>
                                <span>
                                  {data?.address ? data?.address : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Email:</p>
                                <span>{data?.email ? data?.email : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Gender:</p>
                                <span>{data?.gender ? data?.gender : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Phone:</p>
                                <span>{data?.phone ? data?.phone : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Pin Code:</p>
                                <span>
                                  {data?.pincode ? data?.pincode : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Qualification:</p>
                                <span>
                                  {data?.qualification
                                    ? data?.qualification
                                    : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>State:</p>
                                <span>{data?.state ? data?.state : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>City:</p>
                                <span>{data?.city ? data?.city : "-"}</span>
                              </div>

                              <div className="booking-text-grid-items">
                                <p>Driving License</p>
                                {data?.drivingLicense ? (
                                  <a
                                    className="hocers"
                                    href={data?.drivingLicense}
                                    target="_blank"
                                  >
                                    Driving License
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>

                              <div className="booking-text-grid-items">
                                <p>Passport Photo</p>
                                {data?.passportPhoto ? (
                                  <a
                                    className="hocers"
                                    href={data?.passportPhoto}
                                    target="_blank"
                                  >
                                    Passport Photo
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Id Proof</p>
                                {data?.IDproof ? (
                                  <a
                                    className="hocers"
                                    href={data?.IDproof}
                                    target="_blank"
                                  >
                                    Id Proof
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Medical Certificate</p>

                                {data?.medicalCertificate ? (
                                  <a
                                    className="hocers"
                                    href={data?.medicalCertificate}
                                    target="_blank"
                                  >
                                    Medical Certificate
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Payment Type</p>
                                <span>{data?.type ? data?.type : "-"}</span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Course Name</p>
                                <span>
                                  {data?.cnid?.courseName
                                    ? data?.cnid?.courseName
                                    : "-"}
                                </span>
                              </div>
                              <div className="booking-text-grid-items">
                                <p>Course Price</p>
                                <span>
                                  {data?.cnid?.price ? data?.cnid?.price : "-"}
                                </span>
                              </div>
                            </div>

                            <div className="d-flex">
                              <ReactToPrint
                                trigger={() => (
                                  <button className="center-button pdf-button">
                                    Generate PDF
                                  </button>
                                )}
                                content={() => itemsRef.current[i]}
                              />
                              <div style={{ display: "none" }}>
                                <div
                                  ref={(el) => (itemsRef.current[i] = el)}
                                  id={data?._id}
                                >
                                  <ComponentToPrints1 data={data} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {modalOpen && (
        <div className="feedback-background-blur">
          <div className="feedback-modal">
            <div className="modal-header">
              <h1>{t("Cancel Booking")}</h1>
              <i
                onClick={() => setModalOpen(false)}
                className="fas fa-times"
              ></i>
            </div>
            <div className="modal-body">
              <h2 className="text-center">
                {t("Please confirm cancellation")}{" "}
              </h2>
              <div className="d-flex center">
                <div
                  className="cancel-booking ml3"
                  onClick={(e) => cancelBooking(allData)}
                >
                  {t("Continue")}
                </div>
                <div
                  className="cancel-booking"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  {t("Back")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
