import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import logo from "../public/assets/logo.svg";
import { unstable_getServerSession } from "next-auth/next";
import {useSession} from 'next-auth/react'

const Header = async () => {
  const session = await unstable_getServerSession();

  return (
    <>
      <header className="sticky top-0 z-50 bg-secondary flex justify-center items-center p-10 shadow-md w-full">
        {session ? (
          <div className="flex  items-center justify-between w-full just ">
            <div className="flex space-x-2 items-center ">
              <div className="flex items-center w-16 mr-4">
                <Image
                  src={session?.user?.image!}
                  height={10}
                    width={50}
                  alt="logo"
                  className="rounded-full mx-2 object-contain"
                />
              </div>
              <div>
                <p className="font-random text-primary"> Logged in as:</p>
                <p className=" font-random font-semibold text-lg text-primary">
                  {" "}
                    {session?.user?.name}{" "}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex  items-center justify-between w-full">
            <div className="flex space-x-2 items-center w-16">
              <Image src={logo} alt="logo" />
            </div>
            <Link
              href="/auth/signin"
              className={`bg-primary text-white py-2 px-4 rounded-lg font-random font-normal text-2xl hover:bg-secondary hover:text-primary transition-all `}
            >
              {" "}
              Sign In{" "}
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
