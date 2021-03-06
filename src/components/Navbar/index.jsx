import React, { Component } from "react";
import LogoTickitz from "../../assets/img/Logo.svg";
import { Search } from "react-bootstrap-icons";
import { Link, withRouter } from "react-router-dom";
import Profile from "../../assets/img/Profile.png";
import axios from "../../utils/axios";
import { connect } from "react-redux";
import { GetUser } from "../../store/actions/user";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      menu: false,
      searchMenu: false,
      show: false,
      search: "",
      movies: [],
      isError: false,
      message: "",
      role: localStorage.getItem("role")
    };
  }
  handleMenuMobile = () => {
    return !this.state.menu ? this.setState({ menu: true }) : this.setState({ menu: false });
  };

  handleLinkSignUp = () => {
    this.props.history.push("/register");
  };
  handleSearch = () => {
    this.setState({
      searchMenu: true
    });
  };
  handleProfile = () => {
    if (!this.state.show) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  };

  handleFindMovie = (event) => {
    axios
      .get(`movie?searchName=${this.state.search}`)
      .then((response) => {
        // const movies = response.data.data.map((value) => value.title);
        this.setState({
          movies: response.data.data,
          isError: false
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          message: error.response.data.message
        });
      });
    this.setState({
      search: event.target.value
    });
  };
  handleDetailSearchMovie = (id) => {
    this.props.history.push(`/detail-movie/${id}`);
  };
  handleLogout = () => {
    localStorage.clear();
    alert("Thank you!");
    this.props.history.push("/login");
  };

  componentDidMount() {
    GetUser();
  }

  render() {
    const token = localStorage.getItem("token");
    const { user } = this.props;
    const { image } = user.users;
    return (
      <>
        <header>
          <nav className="navigation__homepage">
            <div className="navigation__homepage__parent">
              <div className="navigation__homepage--listmenu">
                <Link to={this.state.role === "admin" ? "/admin/dashboard" : "/"} className="mx-4">
                  <img
                    src={LogoTickitz}
                    className="img-fluid mb-2 navigation__homepage--image"
                    alt="Logo"
                  />
                </Link>
                {this.state.role !== "admin" ? (
                  <>
                    <Link to="/" className="d-none d-md-inline-block mx-5">
                      Home
                    </Link>
                    <Link to="/payment" className="mx-4 d-none d-md-inline-block">
                      Payment
                    </Link>
                    <Link to="/profile" className="mx-4 d-none d-md-inline-block">
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/admin/dashboard" className="d-none d-md-inline-block mx-5">
                      Dashboard
                    </Link>
                    <Link to="/admin/manage-movie" className="mx-4 d-none d-md-inline-block">
                      Manage Movie
                    </Link>
                    <Link to="/admin/manage-schedule" className="mx-4 d-none d-md-inline-block">
                      Manage Schedule
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="navigation__homepage__parent">
              <button
                className="navigation__homepage-button-icon-mobile d-md-none"
                onClick={this.handleMenuMobile}
              >
                <i className="bi bi-text-right fs-1 d-block d-md-none"></i>
              </button>

              <div className="mx-3 d-none d-md-inline-flex">
                <select className="navigation__homepage--option-select">
                  <option hidden>Location</option>
                  <option value="Indonesia">Indonesia</option>
                </select>
              </div>
              <div className="mx-3 d-none d-md-inline-flex">
                <button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  onClick={this.handleSearch}
                >
                  {this.state.searchMenu ? (
                    <>
                      <input
                        type="text"
                        className="form-control d-none d-md-block"
                        placeholder="Search Movie..."
                        onChange={this.handleFindMovie}
                      />
                      {this.state.search ? (
                        <div className="navigation__homepage-search-movie">
                          <p className="text-dark fw-bold">Search: {this.state.search}</p>
                          <hr className="text-dark" />
                          {this.state.isError ? (
                            <p className="text-dark fw-bold mx-5">{this.state.message}</p>
                          ) : (
                            this.state.movies.map((movie) => (
                              <div key={movie.id}>
                                <button
                                  className="navigation__homepage-search-movie-link text-decoration-none"
                                  onClick={() => this.handleDetailSearchMovie(movie.id)}
                                >
                                  {movie.title}
                                </button>
                              </div>
                            ))
                          )}
                          <hr />
                        </div>
                      ) : null}
                    </>
                  ) : this.state.role === "admin" ? null : (
                    <Search />
                  )}
                </button>
              </div>
              <div className="mx-3 d-none d-md-inline-flex">
                {token !== null ? (
                  <img
                    src={
                      image
                        ? `${process.env.REACT_APP_PROD}uploads/user/${image}`
                        : "https://inspektorat.kotawaringinbaratkab.go.id/public/uploads/user/default-user-imge.jpeg"
                    }
                    className="img-fluid"
                    style={{ width: 50, borderRadius: 100 }}
                    alt="Profile"
                    onClick={this.handleProfile}
                  />
                ) : (
                  <button className="button__signup--homepage" onClick={this.handleLinkSignUp}>
                    Sign Up
                  </button>
                )}
              </div>
              {this.state.show ? (
                <div style={{ position: "absolute", right: 80, top: 90 }}>
                  <div>
                    <button
                      onClick={this.handleLogout}
                      className="text-decoration-none text-dark fw-bold"
                      style={{
                        border: "none",
                        padding: "12px 24px",
                        backgroundColor: "#5F2EEA",
                        borderRadius: 8
                      }}
                    >
                      <span style={{ color: "#FFFFFF" }}>Logout</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </nav>
          {/* <!-- Menu Mobile --> */}
          <div
            className={"navigation__homepage--mobile d-md-none p-4 position-absolute"}
            style={{ display: `${this.state.menu ? "block" : "none"}` }}
          >
            {this.state.role === "admin" ? null : (
              <input
                type="search"
                className="navigation__homepage--mobile__input"
                placeholder="Search..."
              />
            )}
            {this.state.role === "admin" ? (
              <div className="text-center">
                <div className="navigation__homepage--mobile-parent-link">
                  <Link
                    to="/admin/dashboard"
                    className="d-block d-md-none navigation__homepage--mobile-link"
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="navigation__homepage--mobile-parent-link">
                  <Link
                    to="/admin/manage-movie"
                    className="d-block d-md-none navigation__homepage--mobile-link"
                  >
                    Manage Movie
                  </Link>
                </div>
                <div className="navigation__homepage--mobile-parent-link">
                  <Link
                    to="/admin/manage-schedule"
                    className="d-block d-md-none navigation__homepage--mobile-link"
                  >
                    Manage Schedule
                  </Link>
                </div>
                <div className="navigation__homepage--mobile-parent-link">
                  <Link
                    to="/admin/manage-schedule"
                    className="d-block d-md-none navigation__homepage--mobile-link"
                  >
                    Manage Schedule
                  </Link>
                </div>
                <p className="text-muted mt-5">&copy; 2021 Tickitz, All Rights Reserved</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="navigation__homepage--mobile-parent-link">
                  <Link to="/" className="d-block d-md-none navigation__homepage--mobile-link">
                    Home
                  </Link>
                </div>
                <div className="navigation__homepage--mobile-parent-link">
                  <Link to="/" className="d-block d-md-none navigation__homepage--mobile-link">
                    Payment
                  </Link>
                </div>
                <div className="navigation__homepage--mobile-parent-link">
                  <Link to="/" className="d-block d-md-none navigation__homepage--mobile-link">
                    Profile
                  </Link>
                </div>
                <p className="text-muted mt-5">&copy; 2021 Tickitz, All Rights Reserved</p>
              </div>
            )}
          </div>
          {/* <!-- Akhir Menu Mobile --> */}
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  GetUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
