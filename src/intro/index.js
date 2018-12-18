/**
 * BLOCK: Intro
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, BlockControls, AlignmentToolbar } = wp.editor;

registerBlockType( 'editor-blocks/intro', {
	title: __( 'Intro (EB)', 'editor-blocks' ),
	description: __( 'Introduce your content with a heading and subheading.', 'editor-blocks' ),
	category: 'editor-blocks',
	icon: 'editor-textcolor',
	keywords: [
		__( 'Intro', 'editor-blocks' ),
		__( 'Heading', 'editor-blocks' ),
		__( 'Subheading', 'editor-blocks' ),
	],
	attributes: {
		maxWidth: {
			type: 'number',
			default: 600,
		},
		heading: {
			source: 'children',
			selector: '.intro__heading',
		},
		subheading: {
			source: 'children',
			selector: '.intro__subheading',
		},
		alignment: {
			type: 'string',
		},
		headingColor: {
			type: 'string',
		},
		headingSize: {
			type: 'number',
		},
		subheadingColor: {
			type: 'string',
		},
		subheadingSize: {
			type: 'number',
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div className={ className } style={ { textAlign: attributes.alignment } } >
					<div className="inner" style={ { maxWidth: attributes.maxWidth + 'px' } } >
						<RichText
							value={ attributes.heading }
							onChange={ ( heading ) => setAttributes( { heading } ) }
							tagName="h2"
							placeholder={ __( 'Intro Heading', 'editor-blocks' ) }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.headingColor, fontSize: attributes.headingSize && attributes.headingSize + 'px' } }
							className="intro__heading"
						/>
						<RichText
							value={ attributes.subheading }
							onChange={ ( subheading ) => setAttributes( { subheading } ) }
							tagName="p"
							placeholder={ __( 'Subheading', 'editor-blocks' ) }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.subheadingColor, fontSize: attributes.subheadingSize && attributes.subheadingSize + 'px' } }
							className="intro__subheading"
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;

		return (
			<div style={ { textAlign: attributes.alignment } } >
				<div className="inner" style={ { maxWidth: attributes.maxWidth + 'px' } } >
					<RichText.Content
						tagName="h2"
						style={ { color: attributes.headingColor, fontSize: attributes.headingSize && attributes.headingSize + 'px' } }
						value={ attributes.heading }
						className="intro__heading"
					/>
					<RichText.Content
						tagName="p"
						style={ { color: attributes.subheadingColor, fontSize: attributes.subheadingSize && attributes.subheadingSize + 'px' } }
						value={ attributes.subheading }
						className="intro__subheading"
					/>
				</div>
			</div>
		);
	},

} );
