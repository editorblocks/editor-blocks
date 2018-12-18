/**
 * BLOCK: Hero
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar } = wp.editor;

registerBlockType( 'editor-blocks/hero', {
	title: __( 'Hero (EB)', 'editor-blocks' ),
	description: __( 'Pair this block with the wrapper block to create stunning hero areas.', 'editor-blocks' ),
	category: 'editor-blocks',
	icon: 'format-image',
	keywords: [
		__( 'Hero', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'EB', 'editor-blocks' ),
	],
	attributes: {
		heading: {
			source: 'children',
			selector: '.hero__heading',
		},
		text: {
			source: 'children',
			selector: '.hero__text',
		},
		alignment: {
			type: 'string',
		},
		position: {
			type: 'string',
			default: 'left',
		},
		width: {
			type: 'number',
			default: 500,
		},
		headingColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		buttonColor: {
			type: 'string',
			default: '#ffffff',
		},
		showButton: {
			type: 'bool',
			default: true,
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#bc0d0d',
		},
		buttonText: {
			type: 'string',
			default: __( 'Click Here', 'editor-blocks' ),
		},
		buttonURL: {
			type: 'string',
			default: '',
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		const heroStyle = {
			textAlign: attributes.alignment,
			maxWidth: attributes.width + 'px',
		};

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div className={ className + ' ' + attributes.position }>
					<div className="inner" style={ heroStyle }>
						<RichText
							value={ attributes.heading }
							onChange={ ( heading ) => setAttributes( { heading } ) }
							tagName="h2"
							placeholder={ __( 'Hero Heading', 'editor-blocks' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.headingColor } }
							className="hero__heading"
						/>
						<RichText
							value={ attributes.text }
							onChange={ ( text ) => setAttributes( { text } ) }
							tagName="p"
							placeholder={ __( 'Hero Text', 'editor-blocks' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.textColor } }
							className="hero__text"
						/>
						{ attributes.showButton &&
							<div className="button-container">
								{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
								<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="hero__button" href="#">{ attributes.buttonText }</a>
							</div>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;

		const heroStyle = {
			textAlign: attributes.alignment,
			maxWidth: attributes.width + 'px',
		};

		return (
			<div className={ attributes.position }>
				<div className="inner" style={ heroStyle }>
					<RichText.Content
						tagName="h2"
						style={ { color: attributes.headingColor } }
						value={ attributes.heading }
						className="hero__heading"
					/>
					<RichText.Content
						tagName="p"
						style={ { color: attributes.textColor } }
						value={ attributes.text }
						className="hero__text"
					/>
					{ attributes.showButton &&
						<div className="button-container">
							<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="hero__button" href={ attributes.buttonURL }>{ attributes.buttonText }</a>
						</div>
					}
				</div>
			</div>
		);
	},

} );
