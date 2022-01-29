import React, { useState } from 'react';
/*
local files
*/
import { CommentInput, CommentsList } from 'components';
import { useComment } from 'hooks';
import { OnReplyParams, SubmitReplyParams } from 'types';

const Home = () => {
  const [visibleInputs, setVisibleInputs] = useState({});
  const { data, addComment } = useComment();

  const onReply: OnReplyParams = id => {
    if (id !== null) {
      const isInputExist = visibleInputs.hasOwnProperty(id);

      setVisibleInputs(prevState => ({ ...prevState, [id]: !isInputExist }));
    }
  };

  const onSubmitReply: SubmitReplyParams = (id, parentId, comment) => {
    onReply(id);
    addComment(id, parentId, comment);
  };

  return (
    <div className="w-1/3">
      <CommentInput
        onSubmitReply={comment => onSubmitReply(null, null, comment)}
      />
      <CommentsList
        data={data}
        onReply={onReply}
        onSubmitReply={onSubmitReply}
        visibleInputs={visibleInputs}
      />
    </div>
  );
};

export default Home;
