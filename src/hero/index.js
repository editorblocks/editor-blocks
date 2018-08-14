/**
 * BLOCK: Hero
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText, BlockControls, AlignmentToolbar } = wp.editor;

registerBlockType( 'editor-blocks/hero', {
	title: __( 'Hero (EB)' ),
	category: 'editor-blocks',
	icon: 'format-image',
	keywords: [
		__( 'Hero' ),
		__( 'Editor Blocks' ),
		__( 'EB' ),
	],
	attributes: {
		heading: {
			source: 'children',
			selector: '.hero__heading'
		},
		text: {
			source: 'children',
			selector: '.hero__text'
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
			default: 'Click Here',
		},
		buttonURL: {
			type: 'string',
			default: '',
		},
	},

	edit: function( props ) {

			const { heading, text, alignment, width, position } = props.attributes;
			const { className, setAttributes, setBackgroundColor } = props;
			const { headingColor, textColor, showButton, buttonColor, buttonBackgroundColor, buttonText, buttonURL } = props.attributes;

			const heroStyle = {
				textAlign: alignment,
				maxWidth: width + 'px',
			};

			return [
			<Inspector { ...props } />,
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( alignment ) => setAttributes( { alignment } ) }
				/>
			</BlockControls>,
				<div className={ className + ' ' + position }>
					<div className="inner" style={ heroStyle }>
						<RichText
							value={ heading }
							onChange={ ( heading ) => setAttributes( { heading } ) }
							tagName='h2'
							placeholder={ __( 'Hero Heading' ) }
							formattingControls={[]}
							keepPlaceholderOnFocus={ true }
							style={ { color: headingColor } }
							className="hero__heading"
						/>
						<RichText
							value={ text }
							onChange={ ( text ) => setAttributes( { text } ) }
							tagName='p'
							placeholder={ __( 'Hero Text' ) }
							formattingControls={[]}
							keepPlaceholderOnFocus={ true }
							style={ { color: textColor } }
							className="hero__text"
						/>
						{ showButton &&
							<div className="button-container">
								<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="hero__button" href="#">{ buttonText }</a>
							</div>
						}
					</div>
				</div>
			];

		},

	save: function( props ) {

		const { heading, text, alignment, position, width } = props.attributes;
		const { className, setAttributes, setBackgroundColor } = props;
		const { headingColor, textColor, showButton, buttonColor, buttonBackgroundColor, buttonText, buttonURL } = props.attributes;

		const heroStyle = {
			textAlign: alignment,
			maxWidth: width + 'px',
		};

		return (
			<div className={ position }>
				<div className="inner" style={ heroStyle }>
					<RichText.Content
						tagName="h2"
						style={ { color: headingColor } }
						value={ heading }
						className="hero__heading"
					/>
					<RichText.Content
						tagName="p"
						style={ { color: textColor } }
						value={ text }
						className="hero__text"
					/>
					{ showButton &&
						<div className="button-container">
							<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="hero__button" href={ buttonURL }>{ buttonText }</a>
						</div>
					}
				</div>
			</div>
		);

	},
} );
