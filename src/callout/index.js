/**
 * BLOCK: Callout
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar } = wp.editor;

registerBlockType( 'editor-blocks/callout', {
	title: __( 'Callout (EB)' ),
	category: 'editor-blocks',
	icon: 'megaphone',
	keywords: [
		__( 'Callout' ),
		__( 'Button' ),
		__( 'Subheading' ),
	],
	attributes: {
		heading: {
			source: 'children',
			selector: 'h2'
		},
		headingColor: {
			type: 'string',
		},
		headingSize: {
			type: 'number',
		},
		buttonText: {
			type: 'string',
			default: 'Click Here',
		},
		buttonURL: {
			type: 'string',
			default: '',
		},
		buttonColor: {
			type: 'string',
			default: '#ffffff',
		},
		buttonBackgroundColor: {
			type: 'string',
			default: '#bc0d0d',
		},
	},

	edit: function( props ) {

			const { heading, headingSize, headingColor, buttonText, buttonURL, buttonColor, buttonBackgroundColor } = props.attributes;
			const { className, setAttributes } = props;

			return [
				<Inspector { ...props } />,
				<div className={ className } >
					<div className="button-container">
						<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="callout__button" href="#">{ buttonText }</a>
					</div>
					<RichText
						value={ heading }
						onChange={ ( heading ) => setAttributes( { heading } ) }
						tagName='h2'
						placeholder={ __( 'Callout Text' ) }
						keepPlaceholderOnFocus={ true }
						style={ { color: headingColor, fontSize: headingSize && headingSize + 'px' } }
						className="callout__text"
					/>
				</div>
			];

		},

	save: function( props ) {

		const { heading, headingSize, headingColor, buttonText, buttonURL, buttonColor, buttonBackgroundColor } = props.attributes;
		const { className } = props;

		return (
			<div className={className}>
				<div className="button-container">
					<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="callout__button" href="#">{ buttonText }</a>
				</div>
				<RichText.Content
					tagName="h2"
					style={ { color: headingColor, fontSize: headingSize && headingSize + 'px' } }
					value={ heading }
					className="callout__text"
				/>
			</div>
		);

	},
} );
