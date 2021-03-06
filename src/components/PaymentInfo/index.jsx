import React, { Component } from "react";
import BCA from "../../assets/img/BCA.png";
import DANA from "../../assets/img/DANA.png";
import GooglePay from "../../assets/img/GooglePay.png";
import Gopay from "../../assets/img/GoPay.png";
import Ovo from "../../assets/img/Ovo.png";
import Visa from "../../assets/img/Visa.png";
import axios from "../../utils/axios";
import { withRouter } from "react-router-dom";

export class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      userId: props.paymentInfo.user_id,
      movieId: props.paymentInfo.movieId,
      scheduleId: props.paymentInfo.scheduleId,
      dateBooking: props.paymentInfo.dateBooking,
      timeBooking: props.paymentInfo.timeBooking,
      movieName: props.paymentInfo.movieName,
      seat: props.paymentInfo.seat,
      paymentMethod: ""
    };
  }
  handlePayment = (e) => {
    const paymentMethod = e.target.alt;
    return paymentMethod;
  };
  handlePayment = (event) => {
    this.setState({
      paymentMethod: event.target.alt
    });
  };
  handlePostBooking = (event) => {
    console.log("you has been create booking!", event);
    const {
      userId,
      movieId,
      scheduleId,
      dateBooking,
      timeBooking,
      seat,
      paymentMethod,
      movieName
    } = this.state;
    const setDataBooking = {
      userId,
      movieId,
      scheduleId,
      dateBooking,
      timeBooking,
      seat,
      paymentMethod
    };
    if (paymentMethod === "" || undefined || null) {
      alert("silahkan pilih pembayaran terlebih dahulu!");
    } else {
      axios
        .post("booking/create", setDataBooking)
        .then((response) => {
          this.setState({
            booking: response.data.data.results
          });
          this.props.history.push("/ticket", { setDataBooking, movieName });
        })
        .catch((error) => console.log(error.response));
    }
  };

  render() {
    const { paymentInfo } = this.props;
    console.log(this.state.booking);
    return (
      <>
        <section className="payment__main-info">
          <h4 className="payment__main-info-title">Payment Info</h4>
          <div className="payment__main-info-card">
            <div className="payment__main-info-card-child">
              <p>Date & time</p>
              <span>
                {new Date(paymentInfo.dateBooking).toDateString()} at {paymentInfo.timeBooking}am
              </span>
            </div>
            <hr className="payment__main-info-card-line" />
            <div className="payment__main-info-card-child">
              <p>Movie title</p>
              <span>{paymentInfo.movieName}</span>
            </div>
            <hr className="payment__main-info-card-line" />
            <div className="payment__main-info-card-child">
              <p>Cinema name</p>
              <span>CineOne21 Cinema</span>
            </div>
            <hr className="payment__main-info-card-line" />
            <div className="payment__main-info-card-child">
              <p>Number of tickets</p>
              <span>{!paymentInfo.seat ? null : paymentInfo.seat.length} pieces</span>
            </div>
            <hr className="payment__main-info-card-line" />
            <div className="payment__main-info-card-child">
              <p>Total payment</p>
              <span>${!paymentInfo.seat ? null : paymentInfo.seat.length * 10},00</span>
            </div>
          </div>
          <div className="payment__main-method">
            <h3 className="payment__main-method-title">Choose a Payment Method</h3>
            <div className="payment__main-method-card">
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={GooglePay}
                  className="payment__main-method-image img-fluid"
                  alt="GooglePay"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={Visa}
                  className="payment__main-method-image img-fluid"
                  alt="Visa"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={Gopay}
                  className="payment__main-method-image img-fluid"
                  alt="Gopay"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={GooglePay}
                  className="payment__main-method-image img-fluid"
                  alt="Paypal"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={DANA}
                  className="payment__main-method-image img-fluid"
                  alt="DANA"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={BCA}
                  className="payment__main-method-image img-fluid"
                  alt="BCA"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={Visa}
                  className="payment__main-method-image img-fluid"
                  alt="BRI"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-method-card-child payment__main-method-card-payment_choose">
                <img
                  src={Ovo}
                  className="payment__main-method-image img-fluid"
                  alt="OVO"
                  onClick={this.handlePayment}
                />
              </div>
              <div className="payment__main-optional-payment">
                <hr />
                <p>Or</p>
                <hr />
              </div>
              <div className="mx-auto mt-4">
                <h3 className="payment__main-optional-title">
                  Pay via cash.{" "}
                  <a href="#">
                    <span className="payment__main-optional-subtitle">See how it work</span>
                  </a>
                </h3>
              </div>
            </div>
            <div className="payment__main-method-main-button">
              <button className="payment__main-method-button">Prvious step</button>
              <button
                type="submit"
                className="payment__main-method-button-active"
                onClick={this.handlePostBooking}
              >
                Pay your order
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(PaymentInfo);
