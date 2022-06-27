import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

import {
  MyBuilds,
  CreateBuilds,
  ListBuilds,
  Signup,
  Login,
  Logout,
} from "./links/NavLinks";

const Footer = ({ token }) => {
  return (
    <footer className='footer mt-auto py-3 bg-dark h-23'>
      <div className='container align-content-center m-5'>
        <div className='row'>
          <div className='col-sm-8 text-start'>
            <span className='text-muted'>
              <h2>Case N' Parts</h2>
              <p>Create beautiful PC builds with the latest parts</p>
              <FontAwesomeIcon icon={faCopyright} /> 2022
            </span>
          </div>
          <div className='col-sm text-start'>
            <div className='text-muted'>
              <h4>Builds</h4>
              <div className='pb-2'>
                <MyBuilds placement='footer' />
              </div>
              <div className='pb-2'>
                <CreateBuilds placement='footer' />
              </div>
              <div className='pb-2'>
                <ListBuilds placement='footer' />
              </div>
            </div>
          </div>
          <div className='col-sm text-start'>
            <div className='text-muted'>
              <h4>Account</h4>
              <div className='pb-2'>
                {token && (
                  <div className='pb-2'>
                    <Logout placement='footer' />
                  </div>
                )}
                {!token && (
                  <>
                    <div>
                      <Signup placement='footer' />
                    </div>
                    <div className='pb-2'>
                      <Login placement='footer' />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
