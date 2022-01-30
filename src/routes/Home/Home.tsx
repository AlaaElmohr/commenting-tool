import React, { useState } from 'react';
/*
local files
*/
import { CommentInput, CommentsList } from 'components';
import { useComment, useScroll } from 'hooks';
import { OnReplyParams, SubmitReplyParams } from 'types';

const Home = () => {
  const [visibleInputs, setVisibleInputs] = useState({});
  const { data, thread, removeThread, addComment, onLoadMore, getThread } =
    useComment();
  //listen to scroll event
  useScroll(onLoadMore);

  const onReply: OnReplyParams = id => {
    if (id !== null) {
      //when user apt to reply to comment, push the commentId into visibleInputs with true as value to indicate that this input is visible
      //after cancel comment or submitting, change the value to false to hide this input
      const isInputExist = visibleInputs.hasOwnProperty(id);

      setVisibleInputs(prevState => ({ ...prevState, [id]: !isInputExist }));
    }
  };

  const onSubmitReply: SubmitReplyParams = (id, parentId, comment) => {
    onReply(id);
    addComment(id, parentId, comment);
  };

  const renderCommentsList = (isThread = false) => {
    return (
      <CommentsList
        data={isThread ? thread : data}
        onReply={onReply}
        onSubmitReply={onSubmitReply}
        visibleInputs={visibleInputs}
        getThread={getThread}
      />
    );
  };

  return (
    <section className="bg-primaryBg grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
      <main>
        <CommentInput
          forReply={false}
          onSubmitReply={comment => onSubmitReply(null, null, comment)}
        />
        {renderCommentsList(false)}
      </main>
      {thread.length > 0 && (
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold mt-4 underline">Threads</h1>
            <button onClick={removeThread}>X</button>
          </div>
          {renderCommentsList(true)}
        </div>
      )}
    </section>
  );
};

export default Home;
