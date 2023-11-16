import React, { SVGProps } from "react";

interface ILikeIconProps extends SVGProps<SVGSVGElement> {
  fillColor?: string;
  strokeColor?: string;
}

const LikeIcon = ({
  fillColor = "none",
  strokeColor = "black",
  ...props
}: ILikeIconProps) => {
  return (
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 6.5C19.5 -1.99999 12 0.5 10.5 3.5C8.49998 0.500007 1.5 -1.49999 1 6.50001C1 8.00001 2.09998 11.1 10.5 17.5C18.1 11.5 20 8.50002 20 6.5Z"
        stroke={strokeColor}
      />
    </svg>
  );
};

export default LikeIcon;
