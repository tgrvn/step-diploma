import React, { useState, useRef } from "react";
import Button from "components/ui/button/Button";
import EditableTitle from "components/ui/editable-title/EditableTitle";
import Textarea from "components/ui/textarea/Textarea";
import styles from "./Comments.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createComment,
  deleteComment,
  updateComment,
} from "redux/slices/boardSlice";
import { useClickOutside } from "hooks/useClickOutside";

const user = { id: 1 };

export default function Comments({ comments }) {
  const commRef = useRef();
  const dispatch = useDispatch();
  const { cardId, columnId } = useParams();
  const [commentState, setComment] = useState("");
  const [newCommentState, setNewComment] = useState("");

  useClickOutside(commRef, () => {
    setNewComment("");
    commRef.current.childNodes[0].value = "";
  });

  function handleCreateComment() {
    dispatch(createComment({ cardId, columnId, body: newCommentState }));
  }

  function handleUpdateComment(commentId) {
    dispatch(
      updateComment({ cardId, columnId, commentId, body: commentState })
    );
  }

  function handleDropComment(commentId) {
    dispatch(deleteComment({ cardId, columnId, commentId }));
  }

  return (
    <div className={styles.comments}>
      <span className={`md-text ${styles.commentsTitle}`}>Коментарі</span>
      <div ref={commRef}>
        <Textarea
          state={newCommentState}
          placeholder={"Напишіть коментар..."}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ marginTop: "12px" }}
        />
      </div>

      {newCommentState.length > 0 ? (
        <Button
          text={"Зберегти"}
          style={{ marginTop: "12px", padding: "6px 10px" }}
          event={handleCreateComment}
        />
      ) : null}

      <div className={styles.commentsContent}>
        {comments
          ? comments?.map((comment) => (
              <div key={comment.id} className={styles.currentComment}>
                <div className={styles.commentUser}>
                  {comment.user.username}
                </div>

                {comment.user.id === user.id ? (
                  <>
                    <div className={styles.commentBody}>
                      <EditableTitle
                        textAreaStyle={{ outline: "none" }}
                        defaultValue={comment.body}
                        state={commentState}
                        onChange={(e) => setComment(e.target.value)}
                        withButton={true}
                        btnText={"Зберегти"}
                        btnStyle={{
                          padding: "4px 6px",
                          fontSize: "15px",
                          marginTop: "10px",
                        }}
                        submitHandle={() => handleUpdateComment(comment.id)}
                      />
                    </div>
                    <span
                      className={styles.toolTip}
                      onClick={() => handleDropComment(comment.id)}
                    >
                      видалити
                    </span>
                  </>
                ) : (
                  <div className={styles.commentBody}>{comment.body}</div>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
