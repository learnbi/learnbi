import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import VisibilitySensor from "react-visibility-sensor";

import { ScreenWidthContext } from "../../layouts";
import config from "../../../content/meta/config";
import Menu from "../Menu";

import avatar from "../../images/jpg/avatar.jpg";

class Header extends React.Component {
  state = {
    fixed: false
  };

  visibilitySensorChange = val => {
    if (val) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  };

  getHeaderSize = () => {
    const fixed = this.state.fixed ? "fixed" : "";
    const homepage = this.props.path === "/" ? "homepage" : "";
    return "fixed"; // `${fixed} ${homepage}` (Change me if you want a more "lively" navbar)
  };

  render() {
    const { path, theme } = this.props;
    const { fixed } = this.state;

    return (
      <React.Fragment>
        <header className={`header ${this.getHeaderSize()}`}>
          <Link to="/about" className="logoType">
            <div className="logo">
              <svg viewBox="0 0 370 90" height="30px">
                <g transform="matrix(2.8125,0,0,2.8125,0,0)" stroke="none" fill="#017F8B">
                <path d="M4.029 14.362L14.362 4.028l.707.707L4.736 15.07zM17.135 27.47L27.47 17.135l.707.707-10.333 10.333zM4.029 17.841l.707-.707 10.333 10.334-.707.707zM17.135 4.735l.708-.707L28.176 14.36l-.707.707z"/>
                <g>
                <path d="M16 1.414l1.683 1.683L16 4.779l-1.683-1.683L16 1.414M16 0l-3.097 3.097L16 6.194l3.097-3.097L16 0zM16 27.221l1.683 1.683L16 30.586l-1.683-1.683L16 27.221m0-1.415l-3.097 3.097L16 32l3.097-3.097L16 25.806zM3.097 14.317L4.779 16l-1.683 1.683L1.414 16l1.683-1.683m0-1.414L0 16l3.097 3.097L6.194 16l-3.097-3.097zM28.903 14.317L30.586 16l-1.683 1.683L27.221 16l1.682-1.683m0-1.414L25.806 16l3.097 3.097L32 16l-3.097-3.097z"/>
                </g>
              </g>
              </svg>
            </div>
            <div className="type">
              <h1>{config.headerTitle}</h1>
              <h2>{config.headerSubTitle}</h2>
            </div>
          </Link>
            <ScreenWidthContext.Consumer>
              {width => (
                <Menu
                  path={path}
                  fixed={fixed}
                  screenWidth={width}
                  theme={theme}
                />
              )}
            </ScreenWidthContext.Consumer>
        </header>
        <VisibilitySensor onChange={this.visibilitySensorChange}>
          <div className="sensor" />
        </VisibilitySensor>

        {/* --- STYLES --- */}
        <style jsx>{`
          .header {
            padding-bottom: 0px !important;
            align-items: center;
            justify-content: center;
            background-color: ${theme.color.neutral.white};
            display: flex;
            height: ${theme.header.height.default};
            position: relative;
            top: 0;
            width: 100%;
            align-items: center;

            :global(a.logoType) {
              align-items: center;
              display: flex;
              flex-direction: "column";
              color: ${theme.text.color.primary};

              .logo {
                flex-shrink: 0;
              }
            }

            &.homepage {
              position: absolute;
              background-color: transparent;
              height: ${theme.header.height.homepage};
            }
          }

          h1 {
            font-size: ${theme.font.size.m};
            font-weight: ${theme.font.weight.standard};
            margin: ${theme.space.stack.xs};
          }

          h2 {
            font-weight: ${theme.font.weight.standard};
            font-size: ${theme.font.size.xxs};
            letter-spacing: 0;
            margin: 0;
          }

          .logo {
            border-radius: ${theme.size.radius.small};
            border: 1px solid #eee;
            display: inline-block;
            height: 44px;
            margin: ${theme.space.inline.default};
            overflow: hidden;
            width: 44px;
            transition: all 0.5s;

            .homepage & {
              height: 60px;
              width: 60px;
            }

            img {
              width: 100%;
            }
          }

          .sensor {
            display: block;
            position: absolute;
            bottom: 0;
            z-index: 1;
            left: 0;
            right: 0;
            height: 1px;
            top: ${path === "/" ? theme.header.height.homepage : theme.header.height.default};
          }

          @from-width tablet {
            .header {
              padding: ${theme.space.inset.l};

              &.homepage {
                height: ${theme.header.height.homepage};
              }
            }
          }

          @below desktop {
            :global(a.logoType) {
              visibility: hidden;
            }
            .header.homepage {
              .logo {
                border: none;
              }

              :global(a.logoType),
              h1 {
                color: ${theme.color.neutral.white};
              }
              h2 {
                color: ${theme.color.neutral.gray.d};
              }
            }
          }

          @from-width desktop {
            .header {
              align-items: center;
              background-color: ${theme.color.neutral.white};
              display: flex;
              position: absolute;
              top: 0;
              width: 100%;
              justify-content: space-between;
              transition: padding 0.5s;
              border-bottom: 2px solid ${theme.color.menu.border};

              &.fixed {
                height: ${theme.header.height.fixed};
                background-color: ${theme.color.neutral.white};
                left: 0;
                padding: 0 ${theme.space.m};
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1;

                h1 {
                  margin: ${theme.space.stack.xxs};
                }

                h2 {
                  display: none;
                }
              }

              &.homepage:not(.fixed) {
                :global(a.logoType),
                h1 {
                  color: ${theme.color.neutral.white};
                }
                h2 {
                  color: ${theme.color.neutral.gray.d};
                }
              }
            }

            .header :global(a.logoType) {
              text-align: left;
              flex-direction: row;
              flex-shrink: 0;
              width: auto;
            }

            .logo {
              margin: ${theme.space.inline.default};

              .fixed & {
                height: 36px;
                width: 36px;
              }

              .header.homepage:not(.fixed) & {
                border: none;
              }
            }

            h2 {
              animation-duration: ${theme.time.duration.default};
              animation-name: h2Entry;
            }

            @keyframes h2Entry {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Header;
