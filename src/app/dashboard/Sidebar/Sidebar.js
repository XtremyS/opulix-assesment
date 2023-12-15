"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [SideBarOpen, setSideBarOpen] = useState(true);
  const [ScreenWidth, setScreenWidth] = useState(window.innerWidth);
  const UrlPath = usePathname();
  const drawerRef = useRef(null);
  const RouterRef = useRouter();

  const Links = [
    {
      title: "Overview",
      link: "/dashboard",
      src: "/icons/Dashboard navbar icons/overview_icon.svg",
    },
    {
      title: "All Users",
      link: "/dashboard/users/all-users",
      src: "/icons/Dashboard navbar icons/calendar_icon.svg",
    },
  ];

  useEffect(() => {
    function OnWindowResize() {
      setScreenWidth(window.innerWidth);

      if (window.innerWidth >= 992) {
        setSideBarOpen(true);
      } else {
        setSideBarOpen(false);
      }
    }

    window.addEventListener("resize", OnWindowResize);

    return () => {
      window.removeEventListener("resize", OnWindowResize);
    };
  }, []);

  const OnClickOutSide = (event) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      ScreenWidth <= 992
    ) {
      setSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (SideBarOpen) {
      document.addEventListener("mousedown", OnClickOutSide);
    } else {
      document.removeEventListener("mousedown", OnClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", OnClickOutSide);
    };
  }, [SideBarOpen, ScreenWidth]);

  const OnClickLogout = async () => {
    localStorage.removeItem("te3m3u5uyn");
    setTimeout(async () => {
      RouterRef.push("/auth/login");
    }, 400);
  };

  return (
    <>
      <div
        ref={drawerRef}
        className={`max-[992px]:absolute inset-y-0 left-0  w-[370px] max-[992px]:w-[45vw] h-screen bg-[#E5F6FF]  transform transition-transform ease-in-out duration-300 ${
          SideBarOpen ? "translate-x-0 " : "-translate-x-full fixed"
        }`}
      >
        {/* CLOSE DRAWER BUTTON */}

        <div className="flex justify-end m-4">
          <div
            className="bg-primary  cursor-pointer top-7 right-4  text-white rounded-full text-center flex justify-center items-center w-8 h-8 z-[50] min-[992px]:hidden "
            onClick={() => setSideBarOpen(false)}
          >
            X
          </div>
        </div>

        {/* LOGO div */}
        <div className="flex justify-center items-center  px-4">
          <Link href="/" className="p-4">
            <Image
              src={"/opulix_logo.jpg"}
              height={45}
              width={170}
              alt="Opulix logo"
            ></Image>
          </Link>
        </div>

        {/* SIDE NAV LINKS */}
        <ul className="p-3">
          {Links.map((data, index) => {
            const ActivePath = UrlPath === data.link ? true : false;
            return (
              <li
                ref={drawerRef}
                key={index}
                className={`group ${
                  ActivePath ? "bg-primaryHover text-white" : ""
                } max-[992px]:p-2 md:p-3 text-xs md:text-base rounded-lg my-3 font-medium text-[#333333] hover:text-white hover:bg-[#1E7BAE] transition-all duration-[0.3] cursor-pointer`}
              >
                <Link
                  href={data.link}
                  className="flex items-center min-[992px]:px-3"
                >
                  <div
                    className={`mr-4 group-hover:bg-white group-hover:p-[6px] rounded-full transition-all duration-[0.3s] ${
                      ActivePath ? "bg-white p-[6px] rounded-full" : ""
                    } `}
                  >
                    <Image
                      width={16}
                      height={16}
                      src={data.src}
                      alt={data.title + "icon"}
                      className="min-w-[16px] min-h-[16px]"
                    ></Image>
                  </div>

                  <p className="break-all">{data.title}</p>
                </Link>
              </li>
            );
          })}
          {/* LOGOUT BUTTON */}
          <li
            onClick={OnClickLogout}
            className={`group max-[992px]:p-2 md:p-3 text-xs md:text-base rounded-lg my-3 font-medium text-[#333333] hover:text-white hover:bg-[#1E7BAE] transition-all duration-[0.3] cursor-pointer`}
          >
            <div className="flex items-center min-[992px]:px-3">
              <div
                className={`mr-4 group-hover:bg-white group-hover:p-[6px] rounded-full transition-all duration-[0.3s]`}
              >
                <Image
                  width={16}
                  height={16}
                  src="/icons/Dashboard navbar icons/logout_icon.svg"
                  alt="logout icon"
                  className="min-w-[16px] min-h-[16px]"
                ></Image>
              </div>

              <p className="break-all">Logout</p>
            </div>
          </li>
        </ul>
      </div>

      {!SideBarOpen && (
        <div
          className="bg-primary cursor-pointer top-4  text-white rounded-full text-center flex justify-center items-center w-8 h-8 z-[50] min-[992px]:hidden max-[992px]:absolute"
          onClick={() => setSideBarOpen(!SideBarOpen)}
        >
          ☰
        </div>
      )}
    </>
  );
};

export default Sidebar;
