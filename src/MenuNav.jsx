/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

const MenuNav = ({
  menus, menuSelected, viewFull, action, actionView,
}) => {
  function handleClick(index) {
    action(index);
  }

  function handleKeyPress(index, e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action(index);
    }
  }

  function handleView() {
    actionView();
  }

  function handleKeyPress2(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      actionView();
    }
  }

  const viewClass = viewFull ? ' full-view' : '';

  return (
    <div className={`menu-and-nav${viewClass}`}>
      <div className="menu-nav">
        {menus.map((menu, index) => (
          <div
            className={`menu-nav-item${index === menuSelected ? ' menu-nav-item-selected' : ''}`}
            key={index}
            role="button"
            tabIndex="0"
            onClick={handleClick.bind(this, index)}
            onKeyPress={handleKeyPress.bind(this, index)}
          >
            {menu.title}
          </div>
        ))}
      </div>
      <div className="menu-menu-description">
        {menus[menuSelected].description}
      </div>

      {menus[menuSelected].sections.map((section, index) => (
        <div className="menu-section" key={index}>
          <div className="menu-section-title">
            {section.title}
          </div>
          <div className="menu-items">
            {section.items.map((item, index2) => (
              <div className="menu-item" key={index2}>
                <div className="menu-item-title">
                  <div className="menu-item-title-name">
                    {item.title}
                  </div>
                  <div className="menu-item-title-price">
                    {item.price}
                  </div>
                </div>
                <div className="menu-item-description">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="menu-collapse">
        {viewFull ? null : <div className="menu-collapse1" />}
        <div className="menu-collapse2">
          <div className="container1">
            <div
              key="mykey"
              className="menu-view"
              role="button"
              tabIndex="0"
              onClick={handleView}
              onKeyPress={handleKeyPress2}
            >
              {viewFull ? 'Collapse menu' : 'View full menu'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuNav.defaultProps = {
  menus: null,
  menuSelected: 0,
  viewFull: false,
  action: () => {},
  actionView: () => {},
};

MenuNav.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object),
  menuSelected: PropTypes.number,
  viewFull: PropTypes.bool,
  action: PropTypes.func,
  actionView: PropTypes.func,
};

export default MenuNav;
