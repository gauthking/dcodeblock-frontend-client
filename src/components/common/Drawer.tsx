import { cn } from "../../utils/utils";
import React, { forwardRef, HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import CustomButton from "../common/custom-btn";
import { Icons } from "../../components/icons";

/**
 * @interface DrawerProps - Props for the CompleteDrawer component.
 * @property {boolean} isOpen - Indicates whether the drawer is open.
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClose - Handler for closing the drawer.
 * @property {string} position - Position of the drawer.
 * @extends {HTMLAttributes<HTMLDivElement>} - Extends standard HTML div element attributes.
 */
interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  position: string;
}

/**
 * Creates a portal root element to attach the CompleteDrawer.
 * @returns {HTMLDivElement} - Returns a new portal root element.
 */
function createPortalRoot(): HTMLDivElement {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");
  return drawerRoot;
}

/**
 * CompleteDrawer component displays a drawer as a portal.
 * @param {DrawerProps} props - Props for the CompleteDrawer component.
 * @param {Ref<HTMLDivElement>} ref - Reference to the CompleteDrawer component.
 * @returns {JSX.Element} - Returns the CompleteDrawer component as a JSX element.
 */
const CompleteDrawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, isOpen, onClose, ...props }, ref) => {
    // Reference to the body element.
    const bodyRef = React.useRef(
      document.querySelector("body")
    ) as React.MutableRefObject<HTMLBodyElement>;

    // Reference to the portal root element, or create a new one.
    const portalRootRef = React.useRef(
      document.getElementById("drawer-root") || createPortalRoot()
    );

    // Append portal root to the body on mount and clean up on unmount.
    React.useEffect(() => {
      bodyRef.current.appendChild(portalRootRef.current);
      const portal = portalRootRef.current;
      const bodyEl = bodyRef.current;

      return () => {
        // Clean up the portal when the drawer component unmounts.
        portal.remove();
        // Ensure scroll overflow is removed.
        bodyEl.style.overflow = "";
      };
    }, []);

    return createPortal(
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 transition-all duration-150  bg-white w-full",
          isOpen ? "" : "-translate-x-full",
          className
        )}
        {...props}
      >
        <div className="p-4 cursor-pointer float-right border-white">
          <CustomButton onClick={onClose}>
            <Icons.close />
          </CustomButton>
        </div>
        <div role="dialog">{props.children}</div>
      </div>,
      portalRootRef.current
    );
  }
);

export default CompleteDrawer;
