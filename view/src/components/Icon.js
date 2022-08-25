import React from 'react';
import classnames from 'classnames';

function Icon(props) {
  const {
    className, type, width, height, fill, radius, style = {},
  } = props;
  return (
    <svg
      className={classnames('icon-svg', className)}
      style={({
        width,
        height: height || width,
        minWidth: width,
        fill,
        borderRadius: radius,
        ...style,
      })}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

export default Icon;
