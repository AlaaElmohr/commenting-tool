import React from 'react';
/*
local files
*/
import { CommentsList } from 'components';
import { useComment } from 'hooks';

function App() {
  const { data, addComment } = useComment();

  return (
    <>
      <CommentsList />
    </>
  );
}

export default App;
