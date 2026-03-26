import { useState } from "react";

function FollowButton() {
  const [follow, setFollow] = useState(false);

  return (
    <button
      className={`btn btn-sm ${follow ? "btn-secondary" : "btn-primary"}`}
      onClick={() => setFollow(!follow)}
    >
      {follow ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;