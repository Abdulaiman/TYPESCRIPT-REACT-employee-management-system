import "./not-verified.css";

const NotVerified: React.FC = (): JSX.Element => {
  return (
    <div className="waiting-parent">
      <div className="text-waiting-container">
        <h2 className="waiting-text">NOT VERIFIED!!!</h2>
        <p>
          you are not verified and therefore can't access the application,
          contact the admin to get verified...
        </p>
      </div>
    </div>
  );
};

export default NotVerified;
