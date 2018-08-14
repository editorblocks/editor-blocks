/**
 * BLOCK: Vertical Feature
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText, BlockControls, AlignmentToolbar, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/vertical-feature', {
	title: __( 'Vertical Feature (EB)' ),
	category: 'editor-blocks',
	icon: 'arrow-down-alt',
	keywords: [
		__( 'Feature' ),
		__( 'Editor Blocks' ),
		__( 'Feature' ),
	],
	attributes: {
		image: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: '.vertical-feature__image'
		},
		heading: {
			source: 'children',
			selector: '.vertical-feature__heading'
		},
		subHeading: {
			source: 'children',
			selector: '.vertical-feature__subheading'
		},
		text: {
			source: 'children',
			selector: '.vertical-feature__text'
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

			const { heading, subHeading, text, alignment, contentWidth, contentPaddingTop, contentPaddingBottom, image, imageWidth, imagePosition, imagePaddingTop, imagePaddingBottom } = props.attributes;
			const { className, setAttributes } = props;
			const { headingColor, subHeadingColor, textColor, showButton, buttonColor, buttonBackgroundColor, buttonText, buttonURL } = props.attributes;

			const contentStyle = {
				paddingTop: contentPaddingTop !== 0 ? contentPaddingTop + 'px' : null,
				paddingBottom: contentPaddingBottom !== 0 ? contentPaddingBottom + 'px' : null,
				textAlign: alignment,
			};

			const imageStyle = {
				paddingTop: imagePaddingTop !== 0 ? imagePaddingTop + 'px' : null,
				paddingBottom: imagePaddingBottom !== 0 ? imagePaddingBottom + 'px' : null,
				width: imageWidth + 'px',
			};

			const imageOutput = (
				<div className="vertical-feature-image-wrapper" style={ imageStyle }>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { image: media.url } ) }
							type="image"
							value={ image }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! image ? <div className="no-image"><Dashicon icon="format-image" /></div> :
										<img
											className={ `${ className }-image` }
											src={ image }
											alt="Feature Image"
										/>
									}
								</Button>
							) }
						>
					</MediaUpload>
				</div>
			);

			return [
				<Inspector { ...props } />,
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>,
				<div className={ className + ' image-position-' + imagePosition }>
					{ imagePosition === 'above' && imageOutput }
					<div className="vertical-feature-content-wrapper" style={ contentStyle }>
						<div className="vertical-feature-content__inner" style={ { width: contentWidth + 'px' } }>
							<RichText
								value={ heading }
								onChange={ ( heading ) => setAttributes( { heading } ) }
								tagName='h2'
								placeholder={ __( 'Heading' ) }
								formattingControls={[]}
								keepPlaceholderOnFocus={ true }
								style={ { color: headingColor } }
								className="vertical-feature__heading"
							/>
							<RichText
								value={ subHeading }
								onChange={ ( subHeading ) => setAttributes( { subHeading } ) }
								tagName='p'
								placeholder={ __( 'Sub Heading' ) }
								formattingControls={[]}
								keepPlaceholderOnFocus={ true }
								style={ { color: subHeadingColor } }
								className="vertical-feature__subheading"
							/>
							<RichText
								value={ text }
								onChange={ ( text ) => setAttributes( { text } ) }
								tagName='p'
								placeholder={ __( 'Description' ) }
								keepPlaceholderOnFocus={ true }
								style={ { color: textColor } }
								className="vertical-feature__text"
							/>
							{ showButton &&
								<div className="button-container">
									<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="vertical-feature__button" href="#">{ buttonText }</a>
								</div>
							}
						</div>
					</div>
					{ imagePosition === 'below' && imageOutput }
				</div>
			];

		},

	save: function( props ) {

		const { image, heading, subHeading, text, alignment, contentWidth, contentPaddingTop, contentPaddingBottom, imageWidth, imagePosition, imagePaddingTop, imagePaddingBottom } = props.attributes;
		const { headingColor, subHeadingColor, textColor, showButton, buttonColor, buttonBackgroundColor, buttonText, buttonURL } = props.attributes;

		const contentStyle = {
			paddingTop: contentPaddingTop !== 0 ? contentPaddingTop + 'px' : null,
			paddingBottom: contentPaddingBottom !== 0 ? contentPaddingBottom + 'px' : null,
			textAlign: alignment,
		};

		const imageStyle = {
			paddingTop: imagePaddingTop !== 0 ? imagePaddingTop + 'px' : null,
			paddingBottom: imagePaddingBottom !== 0 ? imagePaddingBottom + 'px' : null,
			width: imageWidth + 'px',
		};

		const imageOutput = (
			<div className="vertical-feature-image-wrapper" style={ imageStyle }>
				<img className="vertical-feature__image" src={ image } />
			</div>
		);

		return (
			<div className={ 'image-position-' + imagePosition }>
				{ imagePosition === 'above' && imageOutput }
				<div className="vertical-feature-content-wrapper" style={ contentStyle }>
					<div className="vertical-feature-content__inner" style={ { width: contentWidth + 'px' } }>
						<RichText.Content
							tagName="h2"
							className="vertical-feature__heading"
							style={ { color: headingColor } }
							value={ heading }
						/>
						<RichText.Content
							tagName="p"
							className="vertical-feature__subheading"
							style={ { color: subHeadingColor } }
							value={ subHeading }
						/>
						<RichText.Content
							tagName="p"
							className="vertical-feature__text"
							style={ { color: textColor } }
							value={ text }
						/>
						{ showButton &&
							<div className="button-container">
								<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="vertical-feature__button" href={ buttonURL }>{ buttonText }</a>
							</div>
						}
					</div>
				</div>
				{ imagePosition === 'below' && imageOutput }
			</div>
		);

	},
} );
