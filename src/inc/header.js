import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";
import "./modal.css";

import Modal from "./modal";

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onEmailHandler = e => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div class="header_grid">
      <div> </div>
      <div className="acenter">
        <Link classname="link_tit" to="/">
          <h3>관리자 페이지</h3>
        </Link>
      </div>

      <div className="acenter">
        <h5 onClick={openModal}> 관리자 로그인</h5>

        <Modal open={modalOpen} close={closeModal} header="로그인">
          {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. */}
          <div>
            <h4 className="acenter login_tit"> 관리자 로그인 </h4>
            <form>
              <div className="login_div">
                <div className="login_input_div">
                  <p> 관리자 ID </p>
                  <input
                    className="mt-10"
                    type={"text"}
                    placeholder=" ID"
                    onChange={onEmailHandler}
                  />
                </div>

                <div className="login_input_div" style={{ marginTop: "40px" }}>
                  <p> 관리자 Password </p>
                  <input
                    className="mt-10"
                    type={"password"}
                    placeholder=" Password"
                    onChange={onPasswordHandler}
                  />
                </div>

                <div className="submit_div">
                  <div>
                    <input type="button" value="로그인" />{" "}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
