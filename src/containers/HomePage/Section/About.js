import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông nói về ABC</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/7DH468OKfQA"
              title="Alicia Keys - If I Ain&#39;t Got You (Live from Apple Music Festival, London, 2016)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Pariatur alias eum, placeat at dolores magnam pariatur magni
              maxime adipisci perspiciatis eveniet. Deserunt nam quod corporis
              hic aspernatur eum ad cum, quae reiciendis consequatur sit, et
              molestiae voluptas magnam, praesentium nesciunt in. Maiores sunt
              qui error deleniti mollitia, animi expedita harum esse eius,
              deserunt quod porro, iusto vel eligendi omnis officia maxime quas
              amet rem ducimus nesciunt laboriosam, et nesciunt quisquam soluta
              exercitationem tempora tenetur adipisci. Earum ad esse beatae
              perspiciatis voluptas, harum consequuntur similique laboriosam
              sapiente aliquid autem, culpa natus nobis quam ipsa quia quisquam
              molestiae quibusdam enim, eveniet dolorem doloremque quos veniam
              quaerat corporis non beatae ut exercitationem?
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
