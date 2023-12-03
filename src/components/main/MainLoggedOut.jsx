import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import "../../pages/home/Home";

const MainLoggedOut = () => {
  return (
    <main className="main-loggedOut">
      <h1>HOLIDAZE</h1>

      <div className="buttons_container">
        <LoginModal />
        <RegisterModal />
      </div>
    </main>
  );
};

export default MainLoggedOut;
