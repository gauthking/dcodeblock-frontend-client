import React, { ButtonHTMLAttributes } from "react";

/**
 * @param {ICustomButtonProps} props - The props for the CustomButton component.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to the underlying button element.
 */
const CustomButton = React.forwardRef<HTMLButtonElement, ICustomButtonProps>(
  /**
   * @props {...ICustomButtonProps} - Destructure the props object.
   * @props {React.Ref<HTMLButtonElement>} - 'ref' is a special prop used for forwarding refs to the underlying button element.
   * @returns {JSX.Element} - Return the button element with the forwarded ref and all the props.
   */
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

// Export the CustomButton component as the default export.
export default CustomButton;

/**
 * @interface ICustomButtonProps - The props interface for CustomButton, extending the base button attributes.
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface ICustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
