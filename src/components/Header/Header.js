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
              <g fill={fill} transform="matrix(4.181184557840047,0,0,4.181184557840047,105.02439053656727,8.268293159693066)">
              <path d="M2.65 2.94L4.06 2.94L4.06 1.61L1.19 1.61L1.19 15.61L4.06 15.61L4.06 14.42L2.65 14.42ZM12.25 9.38C12.25 8.32 11.94 7.49 11.31 6.90C10.69 6.31 9.91 6.02 8.99 6.02C7.99 6.02 7.23 6.45 6.72 7.31L6.72 1.68L5.25 1.68L5.25 12.60L6.72 12.60L6.72 11.45C7.23 12.31 7.99 12.74 8.99 12.74C9.91 12.74 10.69 12.45 11.31 11.86C11.94 11.27 12.25 10.44 12.25 9.38ZM10.77 9.38C10.77 10.03 10.58 10.54 10.20 10.88C9.82 11.23 9.32 11.41 8.71 11.41C8.16 11.41 7.69 11.24 7.30 10.91C6.91 10.58 6.72 10.07 6.72 9.38C6.72 8.69 6.91 8.18 7.30 7.85C7.69 7.52 8.16 7.35 8.71 7.35C9.32 7.35 9.82 7.52 10.20 7.87C10.58 8.22 10.77 8.73 10.77 9.38ZM13.30 3.64C13.30 3.89 13.39 4.11 13.58 4.28C13.77 4.46 13.99 4.55 14.25 4.55C14.51 4.55 14.74 4.46 14.92 4.28C15.11 4.11 15.20 3.89 15.20 3.64C15.20 3.39 15.11 3.17 14.92 3.00C14.74 2.82 14.51 2.73 14.25 2.73C13.99 2.73 13.77 2.82 13.58 3.00C13.39 3.17 13.30 3.39 13.30 3.64ZM13.51 6.16L13.51 12.60L14.99 12.60L14.99 6.16ZM17.39 14.28L15.97 14.28L15.97 15.61L18.84 15.61L18.84 1.61L15.97 1.61L15.97 2.80L17.39 2.80ZM22.41 8.68C22.41 8.28 22.54 7.96 22.81 7.71C23.07 7.47 23.44 7.35 23.91 7.35C24.29 7.35 24.57 7.45 24.74 7.66C24.92 7.87 25.00 8.21 25.00 8.68L25.00 12.60L26.47 12.60L26.47 8.68C26.47 8.28 26.60 7.96 26.87 7.71C27.13 7.47 27.50 7.35 27.97 7.35C28.35 7.35 28.63 7.45 28.80 7.66C28.98 7.87 29.06 8.21 29.06 8.68L29.06 12.60L30.53 12.60L30.53 8.40C30.53 6.81 29.82 6.02 28.39 6.02C27.45 6.02 26.73 6.41 26.24 7.20C25.90 6.41 25.27 6.02 24.33 6.02C23.53 6.02 22.89 6.36 22.41 7.03L22.41 6.16L20.94 6.16L20.94 12.60L22.41 12.60ZM32.93 8.01C33.57 7.54 34.23 7.31 34.92 7.31C35.82 7.31 36.27 7.56 36.27 8.05L36.27 8.90C35.81 8.65 35.25 8.53 34.61 8.53C33.79 8.53 33.10 8.72 32.55 9.11C32.00 9.51 31.72 10.06 31.72 10.78C31.72 11.43 31.95 11.92 32.41 12.25C32.87 12.58 33.42 12.74 34.08 12.74C34.57 12.74 35.01 12.65 35.40 12.46C35.79 12.27 36.08 12.01 36.27 11.68L36.27 12.60L37.74 12.60L37.74 7.98C37.74 7.32 37.49 6.82 36.97 6.50C36.46 6.18 35.77 6.02 34.92 6.02C34.00 6.02 33.16 6.30 32.38 6.87ZM33.14 10.64C33.14 10.36 33.29 10.12 33.60 9.90C33.91 9.70 34.31 9.59 34.80 9.59C35.34 9.59 35.83 9.67 36.27 9.84L36.27 10.08C36.27 10.65 36.13 11.05 35.83 11.27C35.54 11.49 35.09 11.61 34.50 11.61C33.59 11.61 33.14 11.28 33.14 10.64ZM42.45 7.49L38.72 12.60L44.60 12.60L44.60 11.27L41.30 11.27L45.02 6.16L39.14 6.16L39.14 7.49ZM45.72 3.64C45.72 3.89 45.82 4.11 46.00 4.28C46.19 4.46 46.41 4.55 46.68 4.55C46.94 4.55 47.16 4.46 47.35 4.28C47.53 4.11 47.63 3.89 47.63 3.64C47.63 3.39 47.53 3.17 47.35 3.00C47.16 2.82 46.94 2.73 46.68 2.73C46.41 2.73 46.19 2.82 46.00 3.00C45.82 3.17 45.72 3.39 45.72 3.64ZM45.93 6.16L45.93 12.60L47.42 12.60L47.42 6.16ZM50.64 7.15L50.64 6.16L49.17 6.16L49.17 12.60L50.64 12.60L50.64 8.96C50.64 8.51 50.80 8.13 51.13 7.82C51.47 7.51 51.85 7.35 52.28 7.35C52.69 7.35 52.99 7.45 53.20 7.64C53.41 7.83 53.51 8.18 53.51 8.68L53.51 12.60L54.98 12.60L54.98 8.54C54.98 7.63 54.78 6.98 54.38 6.59C53.99 6.21 53.42 6.02 52.70 6.02C51.81 6.02 51.12 6.40 50.64 7.15ZM57.72 9.38C57.72 8.73 57.91 8.22 58.29 7.87C58.67 7.52 59.16 7.35 59.78 7.35C60.33 7.35 60.80 7.52 61.19 7.85C61.57 8.18 61.77 8.69 61.77 9.38C61.77 10.07 61.57 10.58 61.19 10.91C60.80 11.24 60.33 11.41 59.78 11.41C59.16 11.41 58.67 11.23 58.29 10.88C57.91 10.54 57.72 10.03 57.72 9.38ZM56.29 13.02C56.29 13.92 56.60 14.63 57.22 15.16C57.85 15.69 58.67 15.96 59.70 15.96C60.65 15.96 61.48 15.65 62.18 15.04C62.89 14.43 63.24 13.57 63.24 12.46L63.24 6.16L61.77 6.16L61.77 7.31C61.25 6.45 60.50 6.02 59.50 6.02C58.58 6.02 57.80 6.31 57.18 6.90C56.55 7.49 56.24 8.32 56.24 9.38C56.24 10.44 56.55 11.27 57.18 11.86C57.80 12.45 58.58 12.74 59.50 12.74C60.50 12.74 61.25 12.31 61.77 11.45L61.77 12.46C61.77 13.15 61.56 13.67 61.14 14.03C60.73 14.38 60.25 14.56 59.70 14.56C59.10 14.56 58.63 14.41 58.29 14.11C57.95 13.80 57.78 13.44 57.78 13.02Z"/>
              </g>
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
