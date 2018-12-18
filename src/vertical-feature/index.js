/**
 * BLOCK: Vertical Feature
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/vertical-feature', {
	title: __( 'Vertical Feature (EB)', 'editor-blocks' ),
	description: __( 'Highlight a key feature of your product or service using this vertical display.', 'editor-blocks' ),
	category: 'editor-blocks',
	icon: 'arrow-down-alt',
	keywords: [
		__( 'Feature', 'editor-blocks' ),
		__( 'Editor Blocks', 'editor-blocks' ),
		__( 'Feature', 'editor-blocks' ),
	],
	attributes: {
		image: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.vertical-feature__image',
		},
		heading: {
			source: 'children',
			selector: '.vertical-feature__heading',
		},
		subHeading: {
			source: 'children',
			selector: '.vertical-feature__subheading',
		},
		text: {
			source: 'children',
			selector: '.vertical-feature__text',
		},
		alignment: {
			type: 'string',
			default: 'center',
		},
		contentWidth: {
			type: 'number',
			default: '600',
		},
		contentPaddingTop: {
			type: 'number',
			default: 0,
		},
		contentPaddingBottom: {
			type: 'number',
			default: 0,
		},
		imageWidth: {
			type: 'number',
		},
		imagePosition: {
			type: 'string',
			default: 'below',
		},
		imagePaddingTop: {
			type: 'number',
			default: 50,
		},
		imagePaddingBottom: {
			type: 'number',
			default: 0,
		},
		headingColor: {
			type: 'string',
		},
		subHeadingColor: {
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
		const { attributes, setAttributes, className } = props;

		const contentStyle = {
			paddingTop: attributes.contentPaddingTop !== 0 ? attributes.contentPaddingTop + 'px' : null,
			paddingBottom: attributes.contentPaddingBottom !== 0 ? attributes.contentPaddingBottom + 'px' : null,
			textAlign: attributes.alignment,
		};

		const imageStyle = {
			paddingTop: attributes.imagePaddingTop !== 0 ? attributes.imagePaddingTop + 'px' : null,
			paddingBottom: attributes.imagePaddingBottom !== 0 ? attributes.imagePaddingBottom + 'px' : null,
			width: attributes.imageWidth + 'px',
		};

		const imageOutput = (
			<div className="vertical-feature-image-wrapper" style={ imageStyle }>
				<MediaUpload
					onSelect={ ( media ) => setAttributes( { image: media.url } ) }
					type="image"
					value={ attributes.image }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ ! attributes.image ?
								<div className="no-image"><Dashicon icon="format-image" /></div> :
								<img
									className={ `${ className }-image` }
									src={ attributes.image }
									alt="Feature Visual"
								/>
							}
						</Button>
					) }
				>
				</MediaUpload>
			</div>
		);

		return (
			<Fragment>
				<Inspector { ...props } />
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>
				<div className={ className + ' image-position-' + attributes.imagePosition }>
					{ attributes.imagePosition === 'above' && imageOutput }
					<div className="vertical-feature-content-wrapper" style={ contentStyle }>
						<div className="vertical-feature-content__inner" style={ { width: attributes.contentWidth + 'px' } }>
							<RichText
								value={ attributes.heading }
								onChange={ ( heading ) => setAttributes( { heading } ) }
								tagName="h2"
								placeholder={ __( 'Heading', 'editor-blocks' ) }
								formattingControls={ [] }
								keepPlaceholderOnFocus={ true }
								style={ { color: attributes.headingColor } }
								className="vertical-feature__heading"
							/>
							<RichText
								value={ attributes.subHeading }
								onChange={ ( subHeading ) => setAttributes( { subHeading } ) }
								tagName="p"
								placeholder={ __( 'Sub Heading', 'editor-blocks' ) }
								formattingControls={ [] }
								keepPlaceholderOnFocus={ true }
								style={ { color: attributes.subHeadingColor } }
								className="vertical-feature__subheading"
							/>
							<RichText
								value={ attributes.text }
								onChange={ ( text ) => setAttributes( { text } ) }
								tagName="p"
								placeholder={ __( 'Description', 'editor-blocks' ) }
								keepPlaceholderOnFocus={ true }
								style={ { color: attributes.textColor } }
								className="vertical-feature__text"
							/>
							{ attributes.showButton &&
								<div className="button-container">
									{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
									<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="vertical-feature__button" href="#">{ attributes.buttonText }</a>
								</div>
							}
						</div>
					</div>
					{ attributes.imagePosition === 'below' && imageOutput }
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;

		const contentStyle = {
			paddingTop: attributes.contentPaddingTop !== 0 ? attributes.contentPaddingTop + 'px' : null,
			paddingBottom: attributes.contentPaddingBottom !== 0 ? attributes.contentPaddingBottom + 'px' : null,
			textAlign: attributes.alignment,
		};

		const imageStyle = {
			paddingTop: attributes.imagePaddingTop !== 0 ? attributes.imagePaddingTop + 'px' : null,
			paddingBottom: attributes.imagePaddingBottom !== 0 ? attributes.imagePaddingBottom + 'px' : null,
			width: attributes.imageWidth + 'px',
		};

		const imageOutput = (
			<div className="vertical-feature-image-wrapper" style={ imageStyle }>
				<img className="vertical-feature__image" src={ attributes.image } />
			</div>
		);

		return (
			<div className={ 'image-position-' + attributes.imagePosition }>
				{ attributes.imagePosition === 'above' && imageOutput }
				<div className="vertical-feature-content-wrapper" style={ contentStyle }>
					<div className="vertical-feature-content__inner" style={ { width: attributes.contentWidth + 'px' } }>
						<RichText.Content
							tagName="h2"
							className="vertical-feature__heading"
							style={ { color: attributes.headingColor } }
							value={ attributes.heading }
						/>
						<RichText.Content
							tagName="p"
							className="vertical-feature__subheading"
							style={ { color: attributes.subHeadingColor } }
							value={ attributes.subHeading }
						/>
						<RichText.Content
							tagName="p"
							className="vertical-feature__text"
							style={ { color: attributes.textColor } }
							value={ attributes.text }
						/>
						{ attributes.showButton &&
							<div className="button-container">
								<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="vertical-feature__button" href={ attributes.buttonURL }>{ attributes.buttonText }</a>
							</div>
						}
					</div>
				</div>
				{ attributes.imagePosition === 'below' && imageOutput }
			</div>
		);
	},

} );
