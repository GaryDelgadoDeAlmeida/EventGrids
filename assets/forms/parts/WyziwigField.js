import React from "react";
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  Context,
  ContextWatchdog,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

export default function WyziwigField({fieldName, fieldValue, updateCredentials}) {

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarget.value)
    }

    return (
        <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        'undo', 'redo', '|',
                        'heading', '|', 'bold', 'italic', '|',
                        'link', 'insertTable', 'mediaEmbed', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent'
                    ],
                    plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo
                    ],
                    initialData: fieldValue,
                    placeholder: "The description of the service"
                }}
                onChange={(e) => handleChange(e)}
            />
        </CKEditorContext>
    )
}