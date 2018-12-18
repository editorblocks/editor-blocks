/**
 * BLOCK: Callout
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'editor-blocks/callout', {
	title: __( 'Callout (EB)', 'editor-blocks' ),
	description: __( 'Draw your visitors attention to your high-value pages or newsletter using an inline callout.', 'editor-blocks' ),
	category: 'editor-blocks',
	icon: 'megaphone',
	keywords: [
		__( 'Callout', 'editor-blocks' ),
		__( 'Button', 'editor-blocks' ),
		__( 'Subheading', 'editor-blocks' ),
	],
	attributes: {
		heading: {
			source: 'children',
			selector: 'h2',
		},
		headingColor: {
			type: 'string',
		},
		headingSize: {
			type: 'number',
		},
		buttonText: {
			type: 'string',
			default: __( 'Click Here', 'editor-blocks' ),
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
		const { attributes, setAttributes, className } = props;

		return (
			<Fragment>
				<Inspector { ...props } />
				<div className={ className } >
					<div className="button-container">
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="callout__button" href="#">{ attributes.buttonText } </a>
					</div>
					<RichText
						value={ attributes.heading }
						onChange={ ( heading ) => setAttributes( { heading } ) }
						tagName="h2"
						placeholder={ __( 'Callout Text', 'editor-blocks' ) }
						keepPlaceholderOnFocus={ true }
						style={ { color: attributes.headingColor, fontSize: attributes.headingSize && attributes.headingSize + 'px' } }
						className="callout__text"
					/>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes, className } = props;
		// TODO check className is needed.

		return (
			<div className={ className }>
				<div className="button-container">
					<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="callout__button" href={ attributes.buttonURL }>{ attributes.buttonText }</a>
				</div>
				<RichText.Content
					tagName="h2"
					style={ { color: attributes.headingColor, fontSize: attributes.headingSize && attributes.headingSize + 'px' } }
					value={ attributes.heading }
					className="callout__text"
				/>
			</div>
		);
	},
} );
