import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
/*
 local files
 */
import { CommentInputProps } from './types';

const CommentInput = ({
  onSubmitReply,
  forReply,
  onCancel,
}: CommentInputProps) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = () => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const comment = blocks
      .map(block => (!block.text.trim() && '\n') || block.text)
      .join('\n');

    onSubmitReply(comment);
  };

  return (
    <Editor
      toolbar={{
        options: ['inline', 'fontSize', 'fontFamily', 'emoji'],
        inline: {
          options: ['bold', 'italic', 'underline'],
        },
      }}
      editorState={editorState}
      toolbarClassName="mb-0 bg-grey"
      wrapperClassName="flex flex-col-reverse relative mt-3 w-full"
      editorClassName="p-2 border-2 border-b-0  border-lightGrey text-black text-sm w-full"
      onEditorStateChange={onEditorStateChange}
      toolbarCustomButtons={
        !forReply
          ? [
              <button
                onClick={handleSubmit}
                className="absolute right-2 mb-1 py-1 px-3 bg-grey300 rounded-full text-white"
              >
                Comment
              </button>,
            ]
          : [
              <button
                onClick={onCancel}
                className="absolute right-20 mb-1 mr-3  py-1 px-3"
              >
                Cancel
              </button>,
              <button
                onClick={handleSubmit}
                className="absolute right-2 mb-1 py-1 px-3 bg-grey300 rounded-full text-white"
              >
                Reply
              </button>,
            ]
      }
      placeholder={'Write your thoughts...'}
    />
  );
};

export default CommentInput;
