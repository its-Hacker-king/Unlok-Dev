import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const Design = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
  return (
    <div>
        <JoditEditor 
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}            
        />
    </div>
  )
}

export default Design