/**
 * Import the necessary type "IconType" from the "react-icons/lib" library.
 * @type {import("react-icons/lib").IconType}
 */
import { IconType } from "react-icons/lib";

/**
 * Define an interface "IconObject" to represent a mapping of string keys to "IconType" values.
 * @interface IconObject
 */
export interface IconObject {
    [key: string]: IconType;
}

/**
 * Define an interface "INAV_INFO" to represent the structure of navigation information.
 * @interface INAV_INFO
 */
export interface INAV_INFO {
    /**
     * The title of a navigation item.
     * @type {string}
     */
    title: string;

    /**
     * The URL or destination of a navigation item.
     * @type {string}
     */
    href: string;
    src: any;
}
