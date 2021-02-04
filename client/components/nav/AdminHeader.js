import { useState, Fragment, useEffect } from "react";
import { Visibility, Menu, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

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

const Header = ({ user }) => {
  const [menuFixed, setMenuFixed] = useState(false);
  const [active, setActive] = useState("");

  const { site } = useRouter().query;

  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);

  if (user === null) {
    return (
      <div style={{ marginBottom: "20px" }}>
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
            <Link href={`/admin/${site}`}>
              <Menu.Item active={active === "/[site]"}>Home</Menu.Item>
            </Link>
            <Link href={`/admin/${site}/pricing`}>
              <Menu.Item active={active === "/[site]/pricing"}>
                Pricing
              </Menu.Item>
            </Link>

            <Menu.Menu position="right">
              {!user ? (
                <Fragment>
                  <Link href={`/admin/${site}/signin`}>
                    <Menu.Item as="a" active={active === "/[site]/signin"}>
                      Sign In
                    </Menu.Item>
                  </Link>
                  <Link href={`/admin/${site}/signup`}>
                    <Menu.Item as="a" active={active === "/[site]/signup"}>
                      Sign Up
                    </Menu.Item>
                  </Link>
                </Fragment>
              ) : (
                <Link
                  href={
                    user.userOfSite === "rfp"
                      ? `/admin/${site}/account`
                      : `/admin/${site}/user`
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
  }

  return (
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
        <Link href={`/admin/${site}/account/sites`}>
          <Menu.Item active={active === "/admin/${site}/account/sites"}>
            Sites
          </Menu.Item>
        </Link>

        <Menu.Menu position="right">
          <Link href={`/admin/${site}/account`}>
            <Menu.Item active={active === "/admin/${site}/account"}>
              Account
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    </Visibility>
  );
};

export { Header as AdminHeader };
