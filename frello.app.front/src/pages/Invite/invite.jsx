import React, { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uzeInviteUrl } from "../../slices/invite";

export default function Invite() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useSelector((state) => state.url);

  useEffect(() => {
    dispatch(uzeInviteUrl(token));

    if (boardId) {
      navigate(`/board/${boardId}`);
    }
  }, [dispatch, token, boardId, navigate]);

  return (
    <div className="load-wrapper">
      <ColorRing
        visible={true}
        height="200px"
        width="200px"
        colors={["#0747a6", "#f47e60", "#0065ff", "#fff", "#5e6c84"]}
      />
    </div>
  );
}
