import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment, deleteComment, updateComment } from "slices/card";
import Button from "components/ui/button/Button";
import EditableTitle from "components/ui/editable-title/EditableTitle";
import Textarea from "components/ui/textarea/Textarea";
import styles from "./Comments.module.scss";

export default function Comments({ comments }) {
  const dispatch = useDispatch();
  const { boardId, cardId } = useParams();
  const [commentState, setComment] = useState(null);
  const [newCommentState, setNewComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={styles.comments}>
      <span className={`md-text ${styles.commentsTitle}`}>Коментарі</span>
      <Textarea
        state={newCommentState}
        placeholder={"Напишіть коментар..."}
        onChange={(e) => setNewComment(e.target.value)}
        style={{ marginTop: "12px" }}
      />
      {newCommentState.length > 0 ? (
        <Button
          text={"Зберегти"}
          style={{ marginTop: "12px", padding: "6px 10px" }}
          event={() =>
            dispatch(createComment({ boardId, cardId, body: newCommentState }))
          }
        />
      ) : null}

      <div className={styles.commentsContent}>
        {comments &&
          comments?.map((comment) => (
            <div key={comment.id} className={styles.currentComment}>
              <div className={styles.commentUser}>{comment.user.username}</div>

              {comment.user.id === user.user.id ? (
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
                      submitHandle={() =>
                        dispatch(
                          updateComment({
                            boardId,
                            cardId,
                            commentId: comment.id,
                            body: commentState,
                          })
                        )
                      }
                    />
                  </div>
                  <span
                    className={styles.toolTip}
                    onClick={() =>
                      dispatch(
                        deleteComment({
                          boardId,
                          cardId,
                          commentId: comment.id,
                        })
                      )
                    }
                  >
                    видалити
                  </span>
                </>
              ) : (
                <div className={styles.commentBody}>{comment.body}</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
