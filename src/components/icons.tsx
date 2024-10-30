import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { IconObject } from "../@types";
import { GiHamburgerMenu } from "react-icons/gi";

/**
 * Icon types for the Icons object.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * @property {IconType} google - Google icon from react-icons.
 * @property {IconType} arrowback - Arrowback icon from react-icons.
 * @property {IconType} close - Close icon from react-icons.
 * @property {IconType} Hamburger - Hamburger icon from react-icons.
 * @property {IconType} logo - Custom SVG logo function with SVGProps.
 */
export const Icons: IconObject = {
  google: FcGoogle,
  arrowback: IoArrowBackSharp,
  close: AiOutlineClose,
  Hamburger: GiHamburgerMenu,
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    /**
     * Custom SVG logo function.
     *
     * @param {React.SVGProps<SVGSVGElement>} props - SVG props for the logo.
     * @returns {JSX.Element} - Returns a JSX element representing the custom logo.
     */
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      {...props}
      viewBox="0 0 256 256"
      enableBackground="new 0 0 256 256"
    >
      <metadata>
        Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
      </metadata>
      <g>
        <g>
          <g>
            <path
              fill="#000000"
              d="M167.4,10.4c-15.3,2.6-26.5,17.7-24.3,33.1c0.7,5.1,3.4,11.2,6.2,14.4l1.8,2.1l-6.2,12.4l-6.2,12.4l-3.2-0.5c-5.1-0.7-13.5-0.4-17.8,0.7c-4.5,1.1-10,3.5-13.9,6l-2.7,1.7L84.4,78.8c-9.2-7.6-16.8-13.9-16.9-14c-0.1-0.1,0.3-1.9,0.8-4c1.7-7.4,0.1-16.8-4.2-22.9c-6.5-9.4-18.4-14.7-29.2-12.8c-10.3,1.8-19.3,9.2-23,18.9c-6.1,16.4,3.5,34.4,20.7,38.8c5.1,1.3,12.5,0.8,17.3-1.1c2-0.8,3.9-1.6,4.3-1.6c0.3-0.1,8.3,6.2,17.5,13.9l16.9,14l-1.3,2.9c-3.6,8.1-4.5,19.6-2.1,28.4c0.7,2.6,1.2,4.8,1.1,4.8c-0.1,0.1-6.7,4.4-14.6,9.8l-14.5,9.6l-2.6-1.7c-6.3-4-16.2-5.2-23.8-2.9c-11.9,3.7-20.7,15.6-20.7,27.9c-0.1,12.7,8.7,24.6,20.7,28.3c4.9,1.5,12.8,1.5,17.7,0c13.7-4.2,23.3-20,20.2-33.3l-0.5-2l14.7-9.8l14.7-9.8l3,2.5c5.6,4.4,16.9,9.2,22.3,9.2c0.9,0,1.9,0.2,2.2,0.5c0.3,0.2,1.2,4,1.9,8.5c0.7,4.5,1.3,8.5,1.5,9c0.1,0.5-0.7,1.5-2.3,2.4c-7.4,4.7-12.6,14.6-12.6,24c0,17.3,14.2,30.8,31.3,29.6c25.5-1.7,36.9-33.1,18.3-50.5c-3.9-3.7-8.1-6.1-12.6-7.3l-2.5-0.7l-1.2-7.6c-0.7-4.2-1.4-8.3-1.6-9.1c-0.3-1.4,0.1-1.7,3.6-3.5c7.8-4.1,14.4-10.7,18.5-18.5c1.9-3.5,2.1-3.9,3.5-3.6c0.8,0.2,4.9,0.8,9.1,1.6l7.6,1.2l0.7,2.5c1.2,4.5,3.7,8.7,7.3,12.6c11.1,11.9,29.4,12.4,41.1,1.2c6-5.7,8.8-11.6,9.4-19.6c1.1-16.9-12.4-31.2-29.3-31.2c-9.6,0-19.6,5.2-24.3,12.6c-1,1.6-1.9,2.4-2.4,2.2c-0.5-0.1-4.5-0.8-9-1.5c-4.5-0.7-8.3-1.5-8.5-1.9c-0.2-0.3-0.5-1.3-0.5-2.2c-0.1-7.5-6.7-20.8-13.5-27l-2.2-2l6.2-12.4l6.2-12.4h3.5c16.4-0.1,29.6-13.2,29.6-29.5c0-13.5-9.4-25.6-22.5-28.7C175.8,10,170.6,9.8,167.4,10.4z"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
};
