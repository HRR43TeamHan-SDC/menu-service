import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const [restaurantName, setRestaurantName] = useState('Loading....');

  useEffect(() => {
    const { id } = props;
    console.log(`requesting ${id}`);
    fetch(`/gettitle/${id}`)
      .then((response) => response.json())
      .then((myJson) => {
        setRestaurantName(myJson);
        console.log(`title = ${myJson}`);
      });
  }, []);

  return (
    <div className="restaurant-title">
      {restaurantName}
    </div>
  );
}

Title.defaultProps = {
  id: '1',
};

Title.propTypes = {
  id: PropTypes.string,
};

export default Title;
