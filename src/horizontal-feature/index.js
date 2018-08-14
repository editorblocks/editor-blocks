/**
 * BLOCK: Horizontal Feature
 */

import './style.scss';
import './editor.scss';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, AlignmentToolbar, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'editor-blocks/horizontal-feature', {
	title: __( 'Horizontal Feature (EB)' ),
	category: 'editor-blocks',
	icon: 'arrow-right-alt',
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
			selector: 'img',
		},
		heading: {
			source: 'children',
			selector: '.horizontal-feature__heading'
		},
		subHeading: {
			source: 'children',
			selector: '.horizontal-feature__subheading'
		},
		text: {
			source: 'children',
			selector: '.horizontal-feature__text'
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
			default: 'Click Here',
		},
		buttonURL: {
			type: 'string',
			default: '',
		},
	},

	edit: function( props ) {

			const { heading, subHeading, text, alignment, contentWidth, contentPaddingTop, image, imageWidth, imagePosition, imagePaddingTop } = props.attributes;
			const { className, setAttributes } = props;
			const { headingColor, subHeadingColor, textColor, showButton, buttonColor, buttonBackgroundColor, buttonText, buttonURL } = props.attributes;

			const contentStyle = {
				width: contentWidth + '%',
				paddingTop: contentPaddingTop !== 0 ? contentPaddingTop + 'px' : null,
				textAlign: alignment,
			};

			const imageStyle = {
				width: imageWidth + '%',
				paddingTop: imagePaddingTop !== 0 ? imagePaddingTop + 'px' : null,
			};

			return [
				<Inspector { ...props } />,
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>
				</BlockControls>,
				<div className={ className + ' image-position-' + imagePosition }>
					<div className="horizontal-feature-content-wrapper" style={ contentStyle }>
						<RichText
							value={ heading }
							onChange={ ( heading ) => setAttributes( { heading } ) }
							tagName='h2'
							placeholder={ __( 'Heading' ) }
							formattingControls={[]}
							keepPlaceholderOnFocus={ true }
							style={ { color: headingColor } }
							className="horizontal-feature__heading"
						/>
						<RichText
							value={ subHeading }
							onChange={ ( subHeading ) => setAttributes( { subHeading } ) }
							tagName='p'
							placeholder={ __( 'Sub Heading' ) }
							formattingControls={[]}
							keepPlaceholderOnFocus={ true }
							style={ { color: subHeadingColor } }
							className="horizontal-feature__subheading"
						/>
						<RichText
							value={ text }
							onChange={ ( text ) => setAttributes( { text } ) }
							tagName='p'
							placeholder={ __( 'Description' ) }
							keepPlaceholderOnFocus={ true }
							style={ { color: textColor } }
							className="horizontal-feature__text"
						/>
						{ showButton &&
							<div className="button-container">
								<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="horizontal-feature__button" href="#">{ buttonText }</a>
							</div>
						}
					</div>
					<div className="horizontal-feature-image-wrapper" style={ imageStyle }>
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
				</div>
			];

		},

	save: function( props ) {

		const { image, heading, subHeading, text, alignment, contentWidth, contentPaddingTop, imageWidth, imagePosition, imagePaddingTop } = props.attributes;
		const { headingColor, subHeadingColor, textColor, showButton, buttonColor, buttonBackgroundColor, buttonText, buttonURL } = props.attributes;

		const contentStyle = {
			width: contentWidth + '%',
			paddingTop: contentPaddingTop !== 0 ? contentPaddingTop + 'px' : null,
			textAlign: alignment,
		};

		const imageStyle = {
			width: imageWidth + '%',
			paddingTop: imagePaddingTop !== 0 ? imagePaddingTop + 'px' : null,
		};

		return (
			<div className={ 'image-position-' + imagePosition }>
				<div className="horizontal-feature-content-wrapper" style={ contentStyle }>
					<RichText.Content
						tagName="h2"
						className="horizontal-feature__heading"
						style={ { color: headingColor } }
						value={ heading }
					/>
					<RichText.Content
						tagName="p"
						className="horizontal-feature__subheading"
						style={ { color: subHeadingColor } }
						value={ subHeading }
					/>
					<RichText.Content
						tagName="p"
						className="horizontal-feature__text"
						style={ { color: textColor } }
						value={ text }
					/>
					{ showButton &&
						<div className="button-container">
							<a style={ { backgroundColor: buttonBackgroundColor, color: buttonColor } } className="horizontal-feature__button" href={ buttonURL }>{ buttonText }</a>
						</div>
					}
				</div>
				<div className="horizontal-feature-image-wrapper" style={ imageStyle }>
					<img className="horizontal-feature__image" src={ image } />
				</div>
			</div>
		);

	},
} );
