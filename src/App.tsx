import React, { useState } from 'react';
/*
local files
*/
import { CommentInput, CommentsList } from 'components';
import { useComment } from 'hooks';
import { Comment } from 'types';

function App() {
  const [isInputVisible, setVisible] = useState(false);
  const { data, addComment } = useComment();

  const onReply = () => {
    setVisible(prevState => !prevState);
  };

  const onSubmitReply = () => {
    onReply();
  };

  return (
    <div className="w-1/3">
      <CommentInput onSubmitReply={onSubmitReply} />
      <CommentsList
        data={data}
        onReply={onReply}
        onSubmitReply={onSubmitReply}
        isInputVisible={isInputVisible}
      />
    </div>
  );
}

export default App;
