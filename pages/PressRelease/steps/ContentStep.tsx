import React, { useState, useRef } from 'react';
import { ReleaseFormData } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useThemeClasses } from '../../../hooks/useThemeClasses';
import { useTheme } from '../../../contexts/ThemeContext';
import { Upload, AlertTriangle, X, File, Eye, Edit, ArrowRight } from 'lucide-react';
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
  const classes = useThemeClasses();
  const { theme, colorMode } = useTheme();
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
          class: 'underline',
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
    <Card variant="default" className="space-y-6 sm:space-y-8 animate-fade-in p-4 sm:p-6 lg:p-8">
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b pb-4 ${classes.border.default}`}>
        <h2 className={`text-lg sm:text-xl font-semibold ${classes.text.black}`}>2. Content</h2>
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto ${classes.border.default} ${classes.text.primary} hover:${classes.bg.secondary}`}
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
          <Card variant="default" className="border-2 p-4 sm:p-6 lg:p-8">
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
            <h1 className={`text-2xl sm:text-3xl font-bold mb-3 ${classes.text.black}`}>
              {data.headline || 'No Headline Provided'}
            </h1>

            {/* Sub-headline */}
            {data.subHeadline && (
              <h2 className={`text-lg sm:text-xl font-medium mb-4 ${classes.text.primary}`}>
                {data.subHeadline}
              </h2>
            )}

            {/* Location and Date */}
            <div className={`flex items-center gap-2 text-sm mb-6 pb-4 border-b ${classes.text.secondary} ${classes.border.default}`}>
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
              className={`prose prose-slate max-w-none text-base leading-relaxed ${classes.text.primary}`}
              dangerouslySetInnerHTML={{
                __html: data.content || `<p class="italic ${classes.text.secondary}">No content provided...</p>`,
              }}
            />

            {/* Attachment */}
            {data.attachment && (
              <div className={`mt-8 pt-6 border-t ${classes.border.default}`}>
                <div className={`flex items-center gap-3 text-sm ${classes.text.primary}`}>
                  <File className={theme === 'cs' ? 'text-cs-accent' : 'text-primary'} size={20} />
                  <div>
                    <p className={`font-medium ${classes.text.black}`}>{data.attachment.name}</p>
                    <p className={`text-xs ${classes.text.secondary}`}>
                      {formatFileSize(data.attachment.size)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className={`mt-8 pt-6 border-t ${classes.border.default}`}>
              <h3 className={`font-bold mb-3 ${classes.text.black}`}>Contact Information</h3>
              {data.contact.displayPreference === 'full' && (
                <div className={`space-y-1 text-sm ${classes.text.primary}`}>
                  <p className="font-medium">
                    {data.contact.firstName} {data.contact.lastName}
                  </p>
                  <p>{data.contact.jobTitle}, {data.contact.company}</p>
                  <p className={theme === 'cs' ? 'text-cs-accent' : 'text-primary'}>{data.contact.email}</p>
                  {data.contact.phone && <p>{data.contact.phone}</p>}
                  {data.contact.additional && <p>{data.contact.additional}</p>}
                  {data.contact.website && (
                    <p>
                      <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} hover:underline`}>
                        {data.contact.website}
                      </a>
                    </p>
                  )}
                </div>
              )}
              {data.contact.displayPreference === 'hide_email' && (
                <div className={`space-y-1 text-sm ${classes.text.primary}`}>
                  <p className="font-medium">
                    {data.contact.firstName} {data.contact.lastName}
                  </p>
                  <p>{data.contact.jobTitle}, {data.contact.company}</p>
                  {data.contact.phone && <p>{data.contact.phone}</p>}
                  {data.contact.additional && <p>{data.contact.additional}</p>}
                  {data.contact.website && (
                    <p>
                      <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} hover:underline`}>
                        {data.contact.website}
                      </a>
                    </p>
                  )}
                  <p className={`${classes.text.secondary} italic`}>Use contact form to reach this contact</p>
                </div>
              )}
              {data.contact.displayPreference === 'hide_all' && (
                <p className={`text-sm ${classes.text.secondary} italic`}>Contact information is hidden</p>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Headline:*</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className={`flex-1 border rounded-md p-2 sm:p-2.5 text-sm sm:text-base focus:ring-2 focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:ring-cs-accent focus:border-cs-accent' : 'focus:ring-primary focus:border-primary'}`}
              placeholder="Enter headline"
              value={data.headline}
              maxLength={400}
              onChange={(e) => handleChange('headline', e.target.value)}
            />
          </div>
          <div className={`text-right text-xs mt-1 ${classes.text.secondary}`}>{data.headline.length}/400</div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Sub-Headline:</label>
          <input 
            type="text" 
            className={`w-full border rounded-md p-2 focus:ring-2 focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:ring-cs-accent focus:border-cs-accent' : 'focus:ring-primary focus:border-primary'}`}
            placeholder="Enter sub-headline"
            value={data.subHeadline}
            maxLength={900}
            onChange={(e) => handleChange('subHeadline', e.target.value)}
          />
          <div className={`text-right text-xs mt-1 ${classes.text.secondary}`}>{data.subHeadline.length}/900</div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Location:*</label>
          <p className={`text-xs mb-2 ${classes.text.secondary}`}>Location is the city and state (or country/province) from where the press release is originating.</p>
          <input 
            type="text" 
            className={`w-full border rounded-md p-2 focus:ring-2 focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:ring-cs-accent focus:border-cs-accent' : 'focus:ring-primary focus:border-primary'}`}
            placeholder="City, State"
            value={data.location}
            maxLength={225}
            onChange={(e) => handleChange('location', e.target.value)}
          />
          <div className={`text-right text-xs mt-1 ${classes.text.secondary}`}>{data.location.length}/225</div>
        </div>
      </div>

      <div className={`rounded-md overflow-hidden border ${classes.border.default} ${classes.bg.card}`}>
        {editor && (
          <div className={`border-b p-1.5 sm:p-2 flex flex-wrap gap-1 ${classes.border.default} ${classes.bg.tertiary}`}>
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className={`px-2 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${classes.text.primary} hover:${classes.bg.secondary}`}
              title="Undo"
            >
              Undo
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className={`px-2 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${classes.text.primary} hover:${classes.bg.secondary}`}
              title="Redo"
            >
              Redo
            </button>
            <div className={`w-px h-6 mx-1 ${classes.border.default}`} />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`px-2 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors ${
                editor.isActive('bold') ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`px-2 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed italic transition-colors ${
                editor.isActive('italic') ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-2 py-1 text-sm rounded underline transition-colors ${
                editor.isActive('underline') ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Underline"
            >
              U
            </button>
            <div className={`w-px h-6 mx-1 ${classes.border.default}`} />
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive({ textAlign: 'left' }) ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Align Left"
            >
              ⬅
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive({ textAlign: 'center' }) ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Align Center"
            >
              ⬌
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive({ textAlign: 'right' }) ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Align Right"
            >
              ➡
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive({ textAlign: 'justify' }) ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Justify"
            >
              ⬌⬌
            </button>
            <div className={`w-px h-6 mx-1 ${classes.border.default}`} />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive('bulletList') ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive('orderedList') ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
              title="Numbered List"
            >
              1.
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().liftListItem('listItem').run()}
              disabled={!editor.can().liftListItem('listItem')}
              className={`px-2 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${classes.text.primary} hover:${classes.bg.secondary}`}
              title="Outdent"
            >
              ⬅
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
              disabled={!editor.can().sinkListItem('listItem')}
              className={`px-2 py-1 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${classes.text.primary} hover:${classes.bg.secondary}`}
              title="Indent"
            >
              ➡
            </button>
            <div className={`w-px h-6 mx-1 ${classes.border.default}`} />
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Enter URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                editor.isActive('link') ? `${classes.icon.container} ${theme === 'cs' ? 'text-cs-accent' : 'text-primary'}` : classes.text.primary
              } hover:${classes.bg.secondary}`}
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
              className={`px-2 py-1 text-sm rounded transition-colors ${classes.text.primary} hover:${classes.bg.secondary}`}
              title="Insert Image"
            >
              🖼
            </button>
            <div className={`w-px h-6 mx-1 ${classes.border.default}`} />
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className={`w-8 h-8 rounded border cursor-pointer ${classes.border.default}`}
              title="Text Color"
            />
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              className={`px-2 py-1 text-sm rounded transition-colors ${classes.text.primary} hover:${classes.bg.secondary}`}
              title="Remove Formatting"
            >
              Clear
            </button>
          </div>
        )}
        <EditorContent editor={editor} className="min-h-[400px]" />
      </div>

      <div className={`space-y-4 border-t pt-6 ${classes.border.default}`}>
        <h3 className={`font-medium ${classes.text.black}`}>Contact Information Preferences</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="contactPref" 
              checked={data.contact.displayPreference === 'full'} 
              onChange={() => handleContactChange('displayPreference', 'full')}
              className={`${theme === 'cs' ? 'text-cs-accent focus:ring-cs-accent accent-cs-accent' : 'text-primary focus:ring-primary accent-primary'}`}
            />
            <span className={`text-sm ${classes.text.primary}`}>Display Full Contact Information</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="contactPref" 
              checked={data.contact.displayPreference === 'hide_email'} 
              onChange={() => handleContactChange('displayPreference', 'hide_email')}
              className={`${theme === 'cs' ? 'text-cs-accent focus:ring-cs-accent accent-cs-accent' : 'text-primary focus:ring-primary accent-primary'}`}
            />
            <span className={`text-sm ${classes.text.primary}`}>Hide Email Address (Readers use a contact form)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="contactPref" 
              checked={data.contact.displayPreference === 'hide_all'} 
              onChange={() => handleContactChange('displayPreference', 'hide_all')}
              className={`${theme === 'cs' ? 'text-cs-accent focus:ring-cs-accent accent-cs-accent' : 'text-primary focus:ring-primary accent-primary'}`}
            />
            <span className={`text-sm ${classes.text.primary}`}>Hide All Contact Information</span>
          </label>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 rounded-md border ${classes.bg.tertiary} ${classes.border.default}`}>
        <h3 className={`md:col-span-2 font-medium mb-2 ${classes.text.black}`}>Contact Information</h3>
        
        <input 
          placeholder="First Name" 
          className={`border p-2 sm:p-2.5 rounded text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.firstName}
          onChange={(e) => handleContactChange('firstName', e.target.value)}
        />
        <input 
          placeholder="Last Name" 
          className={`border p-2 sm:p-2.5 rounded text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.lastName}
          onChange={(e) => handleContactChange('lastName', e.target.value)}
        />
        <input 
          placeholder="Job Title" 
          className={`border p-2 sm:p-2.5 rounded text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.jobTitle}
          onChange={(e) => handleContactChange('jobTitle', e.target.value)}
        />
        <input 
          placeholder="Company" 
          className={`border p-2 sm:p-2.5 rounded text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.company}
          onChange={(e) => handleContactChange('company', e.target.value)}
        />
        <input 
          placeholder="Phone" 
          className={`border p-2 sm:p-2.5 rounded text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.phone}
          onChange={(e) => handleContactChange('phone', e.target.value)}
        />
        <input 
          placeholder="Email*" 
          className={`border p-2 sm:p-2.5 rounded text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.email}
          onChange={(e) => handleContactChange('email', e.target.value)}
        />
        <input 
          placeholder="Additional Contact" 
          className={`border p-2 sm:p-2.5 rounded md:col-span-2 text-sm sm:text-base focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
          value={data.contact.additional}
          onChange={(e) => handleContactChange('additional', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h3 className={`font-medium ${classes.text.black}`}>
          Upload Attachment ({getRemainingSize()} Left)
        </h3>
        {data.attachment ? (
          <Card variant="compact" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className={theme === 'cs' ? 'text-cs-accent' : 'text-primary'} size={24} />
                <div>
                  <p className={`text-sm font-medium ${classes.text.black}`}>{data.attachment.name}</p>
                  <p className={`text-xs ${classes.text.secondary}`}>{formatFileSize(data.attachment.size)}</p>
                </div>
              </div>
              <button
                onClick={removeAttachment}
                className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove attachment"
              >
                <X size={20} />
              </button>
            </div>
          </Card>
        ) : (
          <div
            onDragOver={(e) => handleDragOver(e, 'attachment')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'attachment')}
            onClick={() => attachmentInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${classes.bg.tertiary} ${
              isDragging 
                ? theme === 'cs' ? 'border-cs-accent bg-cs-accent/10' : 'border-primary bg-primary-light/10'
                : classes.border.default
            }`}
          >
            <Upload className={`mb-2 ${isDragging ? (theme === 'cs' ? 'text-cs-accent' : 'text-primary') : classes.text.secondary}`} size={32} />
            <p className={`text-sm ${classes.text.secondary}`}>
              Drag and drop or <span className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} font-medium`}>browse</span>
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
        <p className={`text-xs ${classes.text.secondary}`}>Attachments will be displayed at the bottom of your press release...</p>
      </div>

      <div className="space-y-4">
        <h3 className={`font-medium ${classes.text.black}`}>Upload Logo</h3>
        {data.logo?.preview ? (
          <Card variant="compact" className="p-4">
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
            <p className={`text-xs mt-2 ${classes.text.secondary}`}>{data.logo.name}</p>
            <p className={`text-xs ${classes.text.secondary}`}>Make sure your logo file name includes your keywords.</p>
          </Card>
        ) : (
          <div
            onDragOver={(e) => handleDragOver(e, 'logo')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'logo')}
            onClick={() => logoInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${classes.bg.tertiary} ${
              isDragging 
                ? theme === 'cs' ? 'border-cs-accent bg-cs-accent/10' : 'border-primary bg-primary-light/10'
                : classes.border.default
            }`}
          >
            <Upload className={`mb-2 ${isDragging ? (theme === 'cs' ? 'text-cs-accent' : 'text-primary') : classes.text.secondary}`} size={32} />
            <p className={`text-sm mb-2 ${classes.text.secondary}`}>
              Drag and drop or <span className={`${theme === 'cs' ? 'text-cs-accent' : 'text-primary'} font-medium`}>browse</span>
            </p>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={(e) => handleFileInputChange(e, 'logo')}
              className="hidden"
            />
            <p className={`text-xs mt-2 ${classes.text.secondary}`}>JPG and PNG files only, max 256KB</p>
          </div>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${classes.text.primary}`}>Your Website URL</label>
        <input 
           type="url"
           className={`w-full border p-2 rounded focus:outline-none transition-all ${classes.border.default} ${classes.bg.card} ${classes.text.black} ${theme === 'cs' ? 'focus:border-cs-accent' : 'focus:border-primary'}`}
           placeholder="https://www.example.com"
           value={data.contact.website}
           onChange={(e) => handleContactChange('website', e.target.value)}
        />
      </div>
        </>
      )}

      {/* Navigation Buttons */}
      <div className={`flex justify-between mt-8 pt-6 border-t ${classes.border.default}`}>
        <Button variant="outline" onClick={onBack} size="lg">
          Previous
        </Button>
        <Button 
          onClick={onNext}
          size="lg"
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight size={20} />
        </Button>
      </div>
    </Card>
  );
};

export default ContentStep;