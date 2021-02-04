import { useState, Fragment, useEffect } from "react";
import { Visibility, Menu, Label } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { itemTotal } from "../../hooks/cart-helpers";

const menuStyle = {
  border: "0px",
  borderRadius: 0,
  boxShadow: "none",
  marginTop: "0",
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "0px",
  borderBottom: "1px",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};

const Header = ({ user, authUserIsAdmin }) => {
  const [menuFixed, setMenuFixed] = useState(false);
  const [active, setActive] = useState("");

  const { site } = useRouter().query;

  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);

  if (user === null) {
    <div>
      <Visibility
        onPassing={stickTopMenu}
        onBottomVisible={unStickTopMenu}
        once={false}
      >
        <Menu
          secondary
          fixed={menuFixed ? "top" : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
          style={{
            margin: "0",
            backgroundColor: "white",
          }}
        >
          <Link href={`/user/${site}`}>
            <Menu.Item active={active === "/user/[site]"}>Home</Menu.Item>
          </Link>
          <Link href={`/user/${site}/services`}>
            <Menu.Item active={active === "/user/[site]/services"}>
              Services
            </Menu.Item>
          </Link>
          {authUserIsAdmin ? null : (
            <Link href={`/user/${site}/cart`}>
              <Menu.Item active={active === "/user/[site]/cart"}>
                Cart
                {itemTotal() > 0 ? (
                  <Label
                    color="green"
                    style={{ right: "-10px" }}
                    circular
                    attached="bottom right"
                  >
                    {itemTotal()}
                  </Label>
                ) : (
                  ""
                )}
              </Menu.Item>
            </Link>
          )}
          <Menu.Menu position="right">
            <Link href={`/user/${site}/user`}>
              <Menu.Item>Account</Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
      </Visibility>
    </div>;
  }

  return (
    <div>
      <Visibility
        onPassing={stickTopMenu}
        onBottomVisible={unStickTopMenu}
        once={false}
      >
        <Menu
          secondary
          fixed={menuFixed ? "top" : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
          style={{
            margin: "0",
            backgroundColor: "white",
          }}
        >
          <Link href={`/user/${site}`}>
            <Menu.Item active={active === "/user/[site]"}>Home</Menu.Item>
          </Link>
          <Link href={`/user/${site}/services`}>
            <Menu.Item active={active === "/user/[site]/services"}>
              Services
            </Menu.Item>
          </Link>
          {authUserIsAdmin ? null : (
            <Link href={`/user/${site}/cart`}>
              <Menu.Item active={active === "/user/[site]/cart"}>
                Cart
                {itemTotal() > 0 ? (
                  <Label
                    color="green"
                    style={{ right: "-10px" }}
                    circular
                    attached="bottom right"
                  >
                    {itemTotal()}
                  </Label>
                ) : (
                  ""
                )}
              </Menu.Item>
            </Link>
          )}

          <Menu.Menu position="right">
            {!user ? (
              <Fragment>
                <Link href={`/user/${site}/auth/signin`}>
                  <Menu.Item as="a" active={active === "/user/[site]/signin"}>
                    Sign In
                  </Menu.Item>
                </Link>
                <Link href={`/user/${site}/auth/signup`}>
                  <Menu.Item as="a" active={active === "/user/[site]/signup"}>
                    Sign Up
                  </Menu.Item>
                </Link>
              </Fragment>
            ) : (
              <Link
                href={
                  user.userOfSite === "rfp"
                    ? `/user/${site}/admin`
                    : `/user/${site}/user`
                }
              >
                <Menu.Item>Account</Menu.Item>
              </Link>
            )}
          </Menu.Menu>
        </Menu>
      </Visibility>
    </div>
  );
};

export { Header as SiteHeader };
