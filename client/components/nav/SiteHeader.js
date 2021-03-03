import { useState, Fragment, useEffect } from "react";
import {
  Visibility,
  Menu,
  Label,
  Header as sUiHeader,
  Button,
  Icon,
  Divider,
} from "semantic-ui-react";
import Router, { useRouter } from "next/router";
import { itemTotal } from "../../hooks/cart-helpers";
import { useMediaQuery } from "../../hooks/use-media-query";

const menuStyle = {
  border: "0px",
  borderRadius: 0,
  boxShadow: "none",
  marginTop: "0",
};

const fixedMenuStyle = {
  border: "0px",
  borderRadius: 0,
  backgroundColor: "#fff",
  borderBottom: "1px",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};

const Header = ({ user, authUserIsAdmin }) => {
  const [menuFixed, setMenuFixed] = useState(false);

  const { site } = useRouter().query;

  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);

  const [mobile, setMobile] = useState(false);

  const navigate = (url) => {
    setMobile(false);

    Router.push(url);
  };

  const showMenuButtons = () => (
    <Fragment>
      <Menu.Item
        onClick={() => navigate(`/user/${site}`)}
        active={useRouter().pathname === "/user/[site]"}
      >
        Home
      </Menu.Item>

      <Menu.Item
        onClick={() => navigate(`/user/${site}/services`)}
        active={useRouter().pathname === "/user/[site]/services"}
      >
        Services
      </Menu.Item>

      <Menu.Item
        onClick={() => navigate(`/user/${site}/services`)}
        active={useRouter().pathname === "/user/[site]/services"}
      >
        'custom-portfolio'
      </Menu.Item>

      {authUserIsAdmin ? null : (
        <Menu.Item
          onClick={() => navigate(`/user/${site}/cart`)}
          active={useRouter().pathname === "/user/[site]/cart"}
        >
          Cart
          {itemTotal() > 0 ? (
            <Label
              color="green"
              style={
                !mobile ? { right: "-14px" } : { right: "10px", bottom: "9px" }
              }
              circular
              attached="bottom right"
            >
              {itemTotal()}
            </Label>
          ) : (
            ""
          )}
        </Menu.Item>
      )}
      <Menu.Menu position="right">
        {!user ? (
          <Fragment>
            <Menu.Item
              onClick={() => navigate(`/user/${site}/auth/signin`)}
              as="a"
              active={useRouter().pathname === "/user/[site]/auth/signin"}
            >
              Sign In
            </Menu.Item>

            <Menu.Item
              onClick={() => navigate(`/user/${site}/auth/signup`)}
              as="a"
              active={useRouter().pathname === "/user/[site]/auth/signup"}
            >
              Sign Up
            </Menu.Item>
          </Fragment>
        ) : (
          <Menu.Item
            onClick={() =>
              navigate(
                user.userOfSite === "rfp"
                  ? `/user/${site}/admin`
                  : `/user/${site}/user`
              )
            }
            active={
              useRouter().pathname ===
              (user.userOfSite === "rfp"
                ? `/user/${site}/admin`
                : `/user/${site}/user`)
            }
          >
            Account
          </Menu.Item>
        )}
      </Menu.Menu>
    </Fragment>
  );

  return (
    <div>
      click
      <Visibility
        onPassing={stickTopMenu}
        onBottomVisible={unStickTopMenu}
        once={false}
      >
        <Menu
          stackable={useMediaQuery(600)}
          fluid={useMediaQuery(600)}
          secondary={!useMediaQuery(600) || !mobile}
          fixed={"top"}
          style={fixedMenuStyle}
          style={{
            margin: "0",
            backgroundColor: "white",
          }}
        >
          {!useMediaQuery(600)
            ? showMenuButtons()
            : mobile
            ? showMenuButtons()
            : null}
          {useMediaQuery(600) ? (
            <Menu.Item
              style={{ height: "36px " }}
              onClick={() => setMobile(!mobile)}
              fluid={mobile}
              icon
            >
              <Icon name={!mobile ? "angle double down" : "angle double up"} />
            </Menu.Item>
          ) : null}
        </Menu>
      </Visibility>
    </div>
  );
};

export { Header as SiteHeader };
