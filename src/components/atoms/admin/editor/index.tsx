"use client"

import React, { useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';

const Editor = ({content, onChange}: {content: string; onChange: (html, delta) => void}) => {
  const editorRef = useRef<any>();

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  // handleChange expects a function with these 4 arguments
  function handleChange(content, delta, source, editor) {
    onChange(content, editor.getContents());
  }

  return <ReactQuill
  ref={editorRef}
  id='htmlContent'
  value={content}
  onChange={handleChange}
  modules={quillModules}
  formats={quillFormats}
  placeholder='Enter text here...'
  className="w-full h-[70%] mt-10 bg-white"
  />
};

export default Editor;