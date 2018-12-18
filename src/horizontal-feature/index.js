/**
 * BLOCK: Horizontal Feature
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { Fragment } = wp.element;

const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/horizontal-feature', {
	title: __( 'Horizontal Feature (EB)', 'editor-blocks' ),
	description: __( 'Highlight a key feature of your product or service using this horizontal display.', 'editor-blocks' ),
	category: 'editor-blocks',
	icon: 'arrow-right-alt',
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
			selector: 'img',
		},
		heading: {
			source: 'children',
			selector: '.horizontal-feature__heading',
		},
		subHeading: {
			source: 'children',
			selector: '.horizontal-feature__subheading',
		},
		text: {
			source: 'children',
			selector: '.horizontal-feature__text',
		},
		alignment: {
			type: 'string',
			default: 'left',
		},
		contentWidth: {
			type: 'number',
			default: 50,
		},
		contentPaddingTop: {
			type: 'number',
			default: 0,
		},
		imageWidth: {
			type: 'number',
			default: 50,
		},
		imagePosition: {
			type: 'string',
			default: 'right',
		},
		imagePaddingTop: {
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
			default: __( 'Click Here', 'editor-blocks' ),
		},
		buttonURL: {
			type: 'string',
			default: '',
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		const contentStyle = {
			width: attributes.contentWidth + '%',
			paddingTop: attributes.contentPaddingTop !== 0 ? attributes.contentPaddingTop + 'px' : null,
			textAlign: attributes.alignment,
		};

		const imageStyle = {
			width: attributes.imageWidth + '%',
			paddingTop: attributes.imagePaddingTop !== 0 ? attributes.imagePaddingTop + 'px' : null,
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
				<div className={ className + ' image-position-' + attributes.imagePosition }>
					<div className="horizontal-feature-content-wrapper" style={ contentStyle }>
						<RichText
							value={ attributes.heading }
							onChange={ ( heading ) => setAttributes( { heading } ) }
							tagName="h2"
							placeholder={ __( 'Heading', 'editor-blocks' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.headingColor } }
							className="horizontal-feature__heading"
						/>
						<RichText
							value={ attributes.subHeading }
							onChange={ ( subHeading ) => setAttributes( { subHeading } ) }
							tagName="p"
							placeholder={ __( 'Sub Heading', 'editor-blocks' ) }
							formattingControls={ [] }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.subHeadingColor } }
							className="horizontal-feature__subheading"
						/>
						<RichText
							value={ attributes.text }
							onChange={ ( text ) => setAttributes( { text } ) }
							tagName="p"
							placeholder={ __( 'Description', 'editor-blocks' ) }
							keepPlaceholderOnFocus={ true }
							style={ { color: attributes.textColor } }
							className="horizontal-feature__text"
						/>
						{ attributes.showButton &&
							<div className="button-container">
								{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
								<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="horizontal-feature__button" href="#">{ attributes.buttonText }</a>
							</div>
						}
					</div>
					<div className="horizontal-feature-image-wrapper" style={ imageStyle }>
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
											alt={ __( 'Feature', 'editor-blocks' ) }
										/>
									}
								</Button>
							) }
						>
						</MediaUpload>
					</div>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;

		const contentStyle = {
			width: attributes.contentWidth + '%',
			paddingTop: attributes.contentPaddingTop !== 0 ? attributes.contentPaddingTop + 'px' : null,
			textAlign: attributes.alignment,
		};

		const imageStyle = {
			width: attributes.imageWidth + '%',
			paddingTop: attributes.imagePaddingTop !== 0 ? attributes.imagePaddingTop + 'px' : null,
		};

		return (
			<div className={ 'image-position-' + attributes.imagePosition }>
				<div className="horizontal-feature-content-wrapper" style={ contentStyle }>
					<RichText.Content
						tagName="h2"
						className="horizontal-feature__heading"
						style={ { color: attributes.headingColor } }
						value={ attributes.heading }
					/>
					<RichText.Content
						tagName="p"
						className="horizontal-feature__subheading"
						style={ { color: attributes.subHeadingColor } }
						value={ attributes.subHeading }
					/>
					<RichText.Content
						tagName="p"
						className="horizontal-feature__text"
						style={ { color: attributes.textColor } }
						value={ attributes.text }
					/>
					{ attributes.showButton &&
						<div className="button-container">
							<a style={ { backgroundColor: attributes.buttonBackgroundColor, color: attributes.buttonColor } } className="horizontal-feature__button" href={ attributes.buttonURL }>{ attributes.buttonText }</a>
						</div>
					}
				</div>
				<div className="horizontal-feature-image-wrapper" style={ imageStyle }>
					<img className="horizontal-feature__image" src={ attributes.image } />
				</div>
			</div>
		);
	},

} );
