import React, { useState, useRef } from 'react';
import { ReleaseFormData } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Upload, AlertTriangle, X, File, Eye, Edit } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';

interface Props {
  data: ReleaseFormData;
  onChange: (updates: Partial<ReleaseFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ContentStep: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (field: keyof ReleaseFormData, value: any) => {
    onChange({ [field]: value });
  };

  const handleContactChange = (field: string, value: any) => {
    onChange({ contact: { ...data.contact, [field]: value } });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleAttachmentUpload = (file: File) => {
    const maxSize = 40 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size must be less than 40MB. Your file is ${formatFileSize(file.size)}`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({
        attachment: {
          file,
          preview: reader.result as string,
          name: file.name,
          size: file.size,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file: File) => {
    const maxSize = 256 * 1024;
    if (file.size > maxSize) {
      alert(`File size must be less than 256KB. Your file is ${formatFileSize(file.size)}`);
      return;
    }

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      alert('Only JPG and PNG files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({
        logo: {
          file,
          preview: reader.result as string,
          name: file.name,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'attachment' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'attachment') {
        handleAttachmentUpload(file);
      } else {
        handleLogoUpload(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, type: 'attachment' | 'logo') => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'attachment' | 'logo') => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'attachment') {
        handleAttachmentUpload(file);
      } else {
        handleLogoUpload(file);
      }
    }
  };

  const removeAttachment = () => {
    onChange({ attachment: undefined });
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = '';
    }
  };

  const removeLogo = () => {
    onChange({ logo: undefined });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const getRemainingSize = () => {
    const maxSize = 40 * 1024 * 1024;
    const usedSize = data.attachment?.size || 0;
    const remaining = maxSize - usedSize;
    return formatFileSize(remaining);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Underline,
    ],
    content: data.content,
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none min-h-[400px] p-4',
        style: 'font-family: IBM Plex Sans, sans-serif; font-size: 14px; line-height: 1.6;',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange('content', editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && data.content !== editor.getHTML()) {
      editor.commands.setContent(data.content);
    }
  }, [data.content, editor]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm border border-secondary-light">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-secondary-light pb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-secondary-black">2. Content</h2>
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-secondary-light hover:bg-secondary-light/50 transition-colors text-xs sm:text-sm font-medium text-secondary-dark w-full sm:w-auto"
        >
          {previewMode ? (
            <>
              <Edit size={16} />
              Edit Mode
            </>
          ) : (
            <>
              <Eye size={16} />
              Preview Mode
            </>
          )}
        </button>
      </div>

      {previewMode ? (
        <div className="space-y-6">
          {/* Preview Mode */}
          <div className="bg-white border-2 border-secondary-light rounded-lg p-4 sm:p-6 lg:p-8">
            {/* Logo */}
            {data.logo?.preview && (
              <div className="mb-6">
                <img
                  src={data.logo.preview}
                  alt="Company logo"
                  className="max-h-20 object-contain"
                />
              </div>
            )}

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-black mb-3">
              {data.headline || 'No Headline Provided'}
            </h1>

            {/* Sub-headline */}
            {data.subHeadline && (
              <h2 className="text-lg sm:text-xl font-medium text-secondary-dark mb-4">
                {data.subHeadline}
              </h2>
            )}

            {/* Location and Date */}
            <div className="flex items-center gap-2 text-sm text-secondary-medium mb-6 pb-4 border-b border-secondary-light">
              {data.location && <span>{data.location}</span>}
              {data.location && data.schedule.date && <span>•</span>}
              {data.schedule.date && (
                <span>
                  {new Date(data.schedule.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>

            {/* Content */}
            <div
              className="prose prose-slate max-w-none text-base text-secondary-dark leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: data.content || '<p class="italic text-secondary-medium">No content provided...</p>',
              }}
            />

            {/* Attachment */}
            {data.attachment && (
              <div className="mt-8 pt-6 border-t border-secondary-light">
                <div className="flex items-center gap-3 text-sm text-secondary-dark">
                  <File className="text-primary" size={20} />
                  <div>
                    <p className="font-medium text-secondary-black">{data.attachment.name}</p>
                    <p className="text-xs text-secondary-medium">
                      {formatFileSize(data.attachment.size)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-secondary-light">
              <h3 className="font-bold text-secondary-black mb-3">Contact Information</h3>
              {data.contact.displayPreference === 'full' && (
                <div className="space-y-1 text-sm text-secondary-dark">
                  <p className="font-medium">
                    {data.contact.firstName} {data.contact.lastName}
                  </p>
                  <p>{data.contact.jobTitle}, {data.contact.company}</p>
                  <p className="text-primary">{data.contact.email}</p>
                  {data.contact.phone && <p>{data.contact.phone}</p>}
                  {data.contact.additional && <p>{data.contact.additional}</p>}
                  {data.contact.website && (
                    <p>
                      <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {data.contact.website}
                      </a>
                    </p>
                  )}
                </div>
              )}
              {data.contact.displayPreference === 'hide_email' && (
                <div className="space-y-1 text-sm text-secondary-dark">
                  <p className="font-medium">
                    {data.contact.firstName} {data.contact.lastName}
                  </p>
                  <p>{data.contact.jobTitle}, {data.contact.company}</p>
                  {data.contact.phone && <p>{data.contact.phone}</p>}
                  {data.contact.additional && <p>{data.contact.additional}</p>}
                  {data.contact.website && (
                    <p>
                      <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {data.contact.website}
                      </a>
                    </p>
                  )}
                  <p className="text-secondary-medium italic">Use contact form to reach this contact</p>
                </div>
              )}
              {data.contact.displayPreference === 'hide_all' && (
                <p className="text-sm text-secondary-medium italic">Contact information is hidden</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-dark mb-1">Headline:*</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 border border-secondary-medium/50 rounded-md p-2 sm:p-2.5 bg-white text-secondary-black placeholder-secondary-medium focus:ring-2 focus:ring-primary focus:outline-none focus:border-primary text-sm sm:text-base"
              placeholder="Enter headline"
              value={data.headline}
              maxLength={400}
              onChange={(e) => handleChange('headline', e.target.value)}
            />
          </div>
          <div className="text-right text-xs text-secondary-medium mt-1">{data.headline.length}/400</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-dark mb-1">Sub-Headline:</label>
          <input 
            type="text" 
            className="w-full border border-secondary-medium/50 rounded-md p-2 bg-white text-secondary-black placeholder-secondary-medium focus:ring-2 focus:ring-primary focus:outline-none focus:border-primary"
            placeholder="Enter sub-headline"
            value={data.subHeadline}
            maxLength={900}
            onChange={(e) => handleChange('subHeadline', e.target.value)}
          />
          <div className="text-right text-xs text-secondary-medium mt-1">{data.subHeadline.length}/900</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-dark mb-1">Location:*</label>
          <p className="text-xs text-secondary-medium mb-2">Location is the city and state (or country/province) from where the press release is originating.</p>
          <input 
            type="text" 
            className="w-full border border-secondary-medium/50 rounded-md p-2 bg-white text-secondary-black placeholder-secondary-medium focus:ring-2 focus:ring-primary focus:outline-none focus:border-primary"
            placeholder="City, State"
            value={data.location}
            maxLength={225}
            onChange={(e) => handleChange('location', e.target.value)}
          />
          <div className="text-right text-xs text-secondary-medium mt-1">{data.location.length}/225</div>
        </div>
      </div>

      <div className="rounded-md overflow-hidden border border-secondary-medium/50 bg-white">
        {editor && (
          <div className="border-b border-secondary-light p-1.5 sm:p-2 flex flex-wrap gap-1 bg-secondary-light/30">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className="px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed text-secondary-dark"
              title="Undo"
            >
              Undo
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className="px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed text-secondary-dark"
              title="Redo"
            >
              Redo
            </button>
            <div className="w-px h-6 bg-secondary-medium/50 mx-1" />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed font-bold ${
                editor.isActive('bold') ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed italic ${
                editor.isActive('italic') ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed underline ${
                editor.isActive('underline') ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Underline"
            >
              U
            </button>
            <div className="w-px h-6 bg-secondary-medium/50 mx-1" />
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Align Left"
            >
              ⬅
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Align Center"
            >
              ⬌
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Align Right"
            >
              ➡
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive({ textAlign: 'justify' }) ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Justify"
            >
              ⬌⬌
            </button>
            <div className="w-px h-6 bg-secondary-medium/50 mx-1" />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive('bulletList') ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive('orderedList') ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Numbered List"
            >
              1.
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().liftListItem('listItem').run()}
              disabled={!editor.can().liftListItem('listItem')}
              className="px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed text-secondary-dark"
              title="Outdent"
            >
              ⬅
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
              disabled={!editor.can().sinkListItem('listItem')}
              className="px-2 py-1 text-sm rounded hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed text-secondary-dark"
              title="Indent"
            >
              ➡
            </button>
            <div className="w-px h-6 bg-secondary-medium/50 mx-1" />
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Enter URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`px-2 py-1 text-sm rounded hover:bg-secondary-light ${
                editor.isActive('link') ? 'bg-primary-light text-primary' : 'text-secondary-dark'
              }`}
              title="Insert Link"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Enter image URL:');
                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }}
              className="px-2 py-1 text-sm rounded hover:bg-secondary-light text-secondary-dark"
              title="Insert Image"
            >
              🖼
            </button>
            <div className="w-px h-6 bg-secondary-medium/50 mx-1" />
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="w-8 h-8 rounded border border-secondary-medium/50 cursor-pointer"
              title="Text Color"
            />
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              className="px-2 py-1 text-sm rounded hover:bg-secondary-light text-secondary-dark"
              title="Remove Formatting"
            >
              Clear
            </button>
          </div>
        )}
        <EditorContent editor={editor} className="min-h-[400px]" />
      </div>

      <div className="space-y-4 border-t border-secondary-light pt-6">
        <h3 className="font-medium text-secondary-black">Contact Information Preferences</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="contactPref" 
              checked={data.contact.displayPreference === 'full'} 
              onChange={() => handleContactChange('displayPreference', 'full')}
              className="text-primary focus:ring-primary accent-primary"
            />
            <span className="text-sm text-secondary-dark">Display Full Contact Information</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="contactPref" 
              checked={data.contact.displayPreference === 'hide_email'} 
              onChange={() => handleContactChange('displayPreference', 'hide_email')}
              className="text-primary focus:ring-primary accent-primary"
            />
            <span className="text-sm text-secondary-dark">Hide Email Address (Readers use a contact form)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="contactPref" 
              checked={data.contact.displayPreference === 'hide_all'} 
              onChange={() => handleContactChange('displayPreference', 'hide_all')}
              className="text-primary focus:ring-primary accent-primary"
            />
            <span className="text-sm text-secondary-dark">Hide All Contact Information</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-secondary-light/20 p-4 sm:p-6 rounded-md border border-secondary-light">
        <h3 className="md:col-span-2 font-medium text-secondary-black mb-2">Contact Information</h3>
        
        <input 
          placeholder="First Name" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.firstName}
          onChange={(e) => handleContactChange('firstName', e.target.value)}
        />
        <input 
          placeholder="Last Name" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.lastName}
          onChange={(e) => handleContactChange('lastName', e.target.value)}
        />
        <input 
          placeholder="Job Title" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.jobTitle}
          onChange={(e) => handleContactChange('jobTitle', e.target.value)}
        />
        <input 
          placeholder="Company" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.company}
          onChange={(e) => handleContactChange('company', e.target.value)}
        />
        <input 
          placeholder="Phone" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.phone}
          onChange={(e) => handleContactChange('phone', e.target.value)}
        />
        <input 
          placeholder="Email*" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.email}
          onChange={(e) => handleContactChange('email', e.target.value)}
        />
        <input 
          placeholder="Additional Contact" 
          className="border border-secondary-medium/50 p-2 sm:p-2.5 rounded md:col-span-2 bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary text-sm sm:text-base"
          value={data.contact.additional}
          onChange={(e) => handleContactChange('additional', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-secondary-black">
          Upload Attachment ({getRemainingSize()} Left)
        </h3>
        {data.attachment ? (
          <div className="border border-secondary-medium/50 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="text-primary" size={24} />
                <div>
                  <p className="text-sm font-medium text-secondary-black">{data.attachment.name}</p>
                  <p className="text-xs text-secondary-medium">{formatFileSize(data.attachment.size)}</p>
                </div>
              </div>
              <button
                onClick={removeAttachment}
                className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove attachment"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => handleDragOver(e, 'attachment')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'attachment')}
            onClick={() => attachmentInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-secondary-light/10 cursor-pointer transition-colors ${
              isDragging ? 'border-primary bg-primary-light/10' : 'border-secondary-medium/50'
            }`}
          >
            <Upload className={`mb-2 ${isDragging ? 'text-primary' : 'text-secondary-medium'}`} size={32} />
            <p className="text-sm text-secondary-medium">
              Drag and drop or <span className="text-primary font-medium">browse</span>
            </p>
            <input
              ref={attachmentInputRef}
              type="file"
              onChange={(e) => handleFileInputChange(e, 'attachment')}
              className="hidden"
              accept="*/*"
            />
          </div>
        )}
        <p className="text-xs text-secondary-medium">Attachments will be displayed at the bottom of your press release...</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-secondary-black">Upload Logo</h3>
        {data.logo?.preview ? (
          <div className="border border-secondary-medium/50 rounded p-4 bg-white">
            <div className="relative inline-block">
              <img
                src={data.logo.preview}
                alt="Uploaded logo"
                className="max-w-[200px] max-h-20 object-contain rounded"
              />
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                aria-label="Remove logo"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-secondary-medium mt-2">{data.logo.name}</p>
            <p className="text-xs text-secondary-medium">Make sure your logo file name includes your keywords.</p>
          </div>
        ) : (
          <div
            onDragOver={(e) => handleDragOver(e, 'logo')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'logo')}
            onClick={() => logoInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-secondary-light/10 cursor-pointer transition-colors ${
              isDragging ? 'border-primary bg-primary-light/10' : 'border-secondary-medium/50'
            }`}
          >
            <Upload className={`mb-2 ${isDragging ? 'text-primary' : 'text-secondary-medium'}`} size={32} />
            <p className="text-sm text-secondary-medium mb-2">
              Drag and drop or <span className="text-primary font-medium">browse</span>
            </p>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={(e) => handleFileInputChange(e, 'logo')}
              className="hidden"
            />
            <p className="text-xs text-secondary-medium mt-2">JPG and PNG files only, max 256KB</p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-dark mb-1">Your Website URL</label>
        <input 
           type="url"
           className="w-full border border-secondary-medium/50 p-2 rounded bg-white text-secondary-black placeholder-secondary-medium focus:outline-none focus:border-primary"
           placeholder="https://www.example.com"
           value={data.contact.website}
           onChange={(e) => handleContactChange('website', e.target.value)}
        />
      </div>
        </>
      )}

    </div>
  );
};

export default ContentStep;