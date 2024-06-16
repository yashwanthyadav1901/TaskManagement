import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <div className="welcome-title">
        <h1>Welcome</h1>
        <Link to="/login">Log in to continue</Link>
      </div>
    </section>
  );
  return content;
};
export default Public;
