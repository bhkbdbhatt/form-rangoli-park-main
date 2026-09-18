import React, { useRef } from 'react';

export default function RichTextEditor({ notesHtml, setNotesHtml, styles }) {
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setNotesHtml(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setNotesHtml(editorRef.current.innerHTML);
    }
  };

  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>કેસ અને પેમેન્ટ નોંધો (Rich Text Block Editor)</label>
      <div style={styles.editorToolbar}>
        <button type="button" onClick={() => execCommand('bold')} style={styles.toolbarBtn}><b>B</b></button>
        <button type="button" onClick={() => execCommand('underline')} style={styles.toolbarBtn}><u>U</u></button>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} style={styles.toolbarBtn}>• List</button>
        <button type="button" onClick={() => execCommand('formatBlock', 'p')} style={styles.toolbarBtn}>Reset Paragraph</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleEditorInput}
        dangerouslySetInnerHTML={{ __html: notesHtml }}
        style={styles.richEditor}
      />
    </div>
  );
}
