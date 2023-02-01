/* eslint-disable */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import {
	Code,
	ListBullets,
	ListNumbers,
	Quotes,
	Square,
	TextBolder,
	TextItalic,
	TextUnderline,
} from 'phosphor-react';
import { stateFromHTML } from 'draft-js-import-html';

const { useState, useRef, useCallback } = React;

function TextEditor({ value, contentRef }) {
	const contentState = stateFromHTML(value);
	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(contentState)
	);

	const focus = () => {
		if (contentRef.current) contentRef.current.focus();
	};

	const handleKeyCommand = useCallback(
		(command, editorState) => {
			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				setEditorState(newState);
				return 'handled';
			}
			return 'not-handled';
		},
		[editorState, setEditorState]
	);

	const mapKeyToEditorCommand = useCallback(
		(e) => {
			switch (e.keyCode) {
				case 9: // TAB
					const newEditorState = RichUtils.onTab(
						e,
						editorState,
						4 /* maxDepth */
					);
					if (newEditorState !== editorState) {
						setEditorState(newEditorState);
					}
					return null;
			}
			return getDefaultKeyBinding(e);
		},
		[editorState, setEditorState]
	);

	// If the user changes block type before entering any text, we can
	// either style the placeholder or hide it. Let's just hide it now.
	let className = 'RichEditor-editor';
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== 'unstyled') {
			className += ' RichEditor-hidePlaceholder';
		}
	}

	return (
		<div className="RichEditor-root">
			<div className="RichEditor-controls-area">
				<BlockStyleControls
					editorState={editorState}
					onToggle={(blockType) => {
						const newState = RichUtils.toggleBlockType(
							editorState,
							blockType
						);
						setEditorState(newState);
					}}
				/>
				<InlineStyleControls
					editorState={editorState}
					onToggle={(inlineStyle) => {
						const newState = RichUtils.toggleInlineStyle(
							editorState,
							inlineStyle
						);
						setEditorState(newState);
					}}
				/>
			</div>
			<div className={className} onClick={focus}>
				<Editor
					blockStyleFn={getBlockStyle}
					customStyleMap={styleMap}
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					keyBindingFn={mapKeyToEditorCommand}
					onChange={setEditorState}
					placeholder=""
					ref={contentRef}
					spellCheck={false}
				/>
			</div>
		</div>
	);
}

// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};

function getBlockStyle(block: any) {
	switch (block.getType()) {
		case 'blockquote':
			return 'RichEditor-blockquote';
		default:
			return null;
	}
}

function StyleButton({ onToggle, active, label, style }: any) {
	let className = 'RichEditor-styleButton';
	if (active) {
		className += ' RichEditor-activeButton';
	}

	return (
		<span
			className={className}
			onMouseDown={(e) => {
				e.preventDefault();
				onToggle(style);
			}}
		>
			{label}
		</span>
	);
}

const BLOCK_TYPES = [
	{ label: <Quotes />, style: 'blockquote' },
	{ label: <ListBullets />, style: 'unordered-list-item' },
	{ label: <ListNumbers />, style: 'ordered-list-item' },
	{ label: <Code />, style: 'code-block' },
];

function BlockStyleControls({ editorState, onToggle }: any) {
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
}

const INLINE_STYLES = [
	{ label: <TextBolder />, style: 'BOLD' },
	{ label: <TextItalic />, style: 'ITALIC' },
	{ label: <TextUnderline />, style: 'UNDERLINE' },
	{ label: <Square />, style: 'CODE' },
];

function InlineStyleControls({ editorState, onToggle }: any) {
	const currentStyle = editorState.getCurrentInlineStyle();
	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
}

export default TextEditor;
