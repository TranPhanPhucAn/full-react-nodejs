import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HandBookImg from "../../../assets/handbook/viem-dai-trang-co-tu-khoi-duoc-khong.png";
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }
class HandBook extends Component {
  render() {
    //   let settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     // nextArrow: <SampleNextArrow />,
    //     // prevArrow: <SamplePrevArrow />,
    //   };
    // const { isLoggedIn } = this.props;
    // let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <img src={HandBookImg} />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className="img-customize">
                <img src={HandBookImg} />
                <div>Cơ xương khớp 2</div>
              </div>
              <div className="img-customize">
                <img src={HandBookImg} />
                <div>Cơ xương khớp 3</div>
              </div>
              <div className="img-customize">
                <img src={HandBookImg} />
                <div>Cơ xương khớp 4</div>
              </div>
              <div className="img-customize">
                <img src={HandBookImg} />
                <div>Cơ xương khớp 5</div>
              </div>
              <div className="img-customize">
                <img src={HandBookImg} />
                <div>Cơ xương khớp 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
